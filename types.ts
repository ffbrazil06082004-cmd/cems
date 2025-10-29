export type Role = 'student' | 'admin';
export type Department = string;

export interface User {
  id: number;
  name: string;
  email: string; // for admin, this is username
  role: Role;
  registerNumber?: string;
  collegeName?: string;
  department?: Department;
  contactNumber?: string;
  password?: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  venue: string;
  organizer: string;
}

export interface Registration {
  id: number;
  studentId: number;
  eventId: number;
}
