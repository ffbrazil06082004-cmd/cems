
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, Role, Event, Registration } from '../types';
import { DUMMY_STUDENTS, DUMMY_ADMINS, DUMMY_EVENTS, DUMMY_REGISTRATIONS } from '../constants';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  students: User[];
  events: Event[];
  registrations: Registration[];
  viewingEvent: Event | null;
  setViewingEvent: (event: Event | null) => void;
  login: (identifier: string, password: string, role: Role) => boolean;
  logout: () => void;
  addStudent: (student: User) => void;
  deleteStudent: (studentId: number) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: number) => void;
  addRegistration: (eventId: number) => { success: boolean, message: string };
  deleteRegistration: (eventId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  
  const [students, setStudents] = useState<User[]>(DUMMY_STUDENTS);
  const [admins, setAdmins] = useState<User[]>(DUMMY_ADMINS);
  const [events, setEvents] = useState<Event[]>(DUMMY_EVENTS);
  const [registrations, setRegistrations] = useState<Registration[]>(DUMMY_REGISTRATIONS);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);


  const login = (identifier: string, password: string, selectedRole: Role): boolean => {
    let foundUser: User | undefined;
    if (selectedRole === 'student') {
      foundUser = students.find(u => u.registerNumber === identifier && u.password === password);
    } else {
      foundUser = admins.find(u => u.email === identifier && u.password === password);
    }

    if (foundUser) {
      setUser(foundUser);
      setRole(selectedRole);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };
  
  const addStudent = (student: User) => {
    setStudents(prev => [...prev, student]);
  };

  const deleteStudent = useCallback((studentId: number) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setRegistrations(prev => prev.filter(r => r.studentId !== studentId));
  }, []);

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (event: Event) => {
    setEvents(prev => prev.map(e => e.id === event.id ? event : e));
  };
  
  const deleteEvent = useCallback((eventId: number) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setRegistrations(prev => prev.filter(r => r.eventId !== eventId));
  }, []);

  const addRegistration = (eventId: number): { success: boolean, message: string } => {
    if (!user) return { success: false, message: "You must be logged in to register." };
    const isRegistered = registrations.some(
      reg => reg.studentId === user.id && reg.eventId === eventId
    );
    if (isRegistered) {
      return { success: false, message: "You are already registered for this event." };
    }
    const newRegistration = {
      id: Date.now(),
      studentId: user.id,
      eventId: eventId,
    };
    setRegistrations(prevRegistrations => [...prevRegistrations, newRegistration]);
    return { success: true, message: "Successfully registered!" };
  };

  const deleteRegistration = (eventId: number) => {
    if (!user) return;
    setRegistrations(prev => prev.filter(reg => !(reg.studentId === user.id && reg.eventId === eventId)));
  };


  return (
    <AuthContext.Provider value={{ 
        user, role, login, logout, 
        students, addStudent, deleteStudent,
        events, addEvent, updateEvent, deleteEvent,
        registrations, addRegistration, deleteRegistration,
        viewingEvent, setViewingEvent
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};