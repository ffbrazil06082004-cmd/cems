
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Event } from '../types';
import Modal from '../components/Modal';
import { PlusIcon, PencilIcon, TrashIcon, UsersIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import type { Page } from '../App';

type EventFilter = 'all' | 'current' | 'upcoming' | 'previous';

interface EventManagementPageProps {
    setPage: (page: Page) => void;
}

const FilterButton: React.FC<{
    label: string;
    value: EventFilter;
    currentFilter: EventFilter;
    setFilter: (value: EventFilter) => void;
}> = ({ label, value, currentFilter, setFilter }) => {
    const isActive = value === currentFilter;
    return (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                    ? 'bg-red-700 text-white shadow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );
};

const EventManagementPage: React.FC<EventManagementPageProps> = ({ setPage }) => {
  const { events, students, registrations, addEvent, updateEvent, deleteEvent, setViewingEvent } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);
  const [viewingEvent, setViewingEventModal] = useState<Event | null>(null);
  const [filter, setFilter] = useState<EventFilter>('all');

  const openModal = (event: Partial<Event> | null = null) => {
    setCurrentEvent(event ? { ...event } : { name: '', date: '', description: '', venue: '', organizer: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };
  
  const openViewModal = (event: Event) => {
    setViewingEventModal(event);
    setIsViewModalOpen(true);
  };
  
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingEventModal(null);
  };

  const handleViewRegistrations = (event: Event) => {
    setViewingEvent(event);
    setPage('registrations');
  };

  const handleSave = () => {
    if (!currentEvent?.name || !currentEvent?.date || !currentEvent?.description || !currentEvent?.venue || !currentEvent.organizer) {
      alert("All fields are required.");
      return;
    }
    if (currentEvent.id) {
      updateEvent(currentEvent as Event);
    } else {
      const newEvent = { ...currentEvent, id: Date.now() } as Event;
      addEvent(newEvent);
    }
    closeModal();
  };
  
  const handleDelete = (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
        deleteEvent(eventId);
    }
  }

  const getRegisteredStudents = (eventId: number) => {
    const studentIds = registrations.filter(r => r.eventId === eventId).map(r => r.studentId);
    return students.filter(s => studentIds.includes(s.id));
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    
    const eventDate = new Date(event.date);
    const today = new Date();
    
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (filter === 'current') {
        return eventDate.getTime() === today.getTime();
    }
    if (filter === 'upcoming') {
        return eventDate > today;
    }
    if (filter === 'previous') {
        return eventDate < today;
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Event Management</h1>
        <button onClick={() => openModal()} className="flex items-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" /> Add Event
        </button>
      </div>

      <div className="flex justify-start items-center mb-4 space-x-2">
        <FilterButton label="All Events" value="all" currentFilter={filter} setFilter={setFilter} />
        <FilterButton label="Current Events" value="current" currentFilter={filter} setFilter={setFilter} />
        <FilterButton label="Upcoming Events" value="upcoming" currentFilter={filter} setFilter={setFilter} />
        <FilterButton label="Previous Events" value="previous" currentFilter={filter} setFilter={setFilter} />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="min-w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button onClick={() => handleViewRegistrations(event)} className="text-teal-600 hover:text-teal-800 mr-3" title="View Registrations (Page)"><ClipboardDocumentListIcon className="h-5 w-5 inline" /></button>
                        <button onClick={() => openModal(event)} className="text-yellow-600 hover:text-yellow-800 mr-3" title="Edit Event"><PencilIcon className="h-5 w-5 inline" /></button>
                        <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800" title="Delete Event"><TrashIcon className="h-5 w-5 inline" /></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>

      {isModalOpen && currentEvent && (
        <Modal title={currentEvent.id ? "Edit Event" : "Add Event"} onClose={closeModal}>
          <div className="space-y-4 text-gray-800">
            <input type="text" placeholder="Event Name" value={currentEvent.name} onChange={e => setCurrentEvent({...currentEvent, name: e.target.value})} className="w-full p-2 bg-gray-100 border-gray-300 border rounded"/>
            <input type="datetime-local" placeholder="Date" value={currentEvent.date ? new Date(currentEvent.date).toISOString().substring(0, 16) : ''} onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})} className="w-full p-2 bg-gray-100 border-gray-300 border rounded"/>
            <textarea placeholder="Description" value={currentEvent.description} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} className="w-full p-2 bg-gray-100 border-gray-300 border rounded h-24"/>
            <input type="text" placeholder="Venue" value={currentEvent.venue} onChange={e => setCurrentEvent({...currentEvent, venue: e.target.value})} className="w-full p-2 bg-gray-100 border-gray-300 border rounded"/>
            <input type="text" placeholder="Organizer" value={currentEvent.organizer} onChange={e => setCurrentEvent({...currentEvent, organizer: e.target.value})} className="w-full p-2 bg-gray-100 border-gray-300 border rounded"/>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
              <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </Modal>
      )}

      {isViewModalOpen && viewingEvent && (
         <Modal title={`Students Registered for ${viewingEvent.name}`} onClose={closeViewModal}>
            <ul className="text-gray-800">
                {getRegisteredStudents(viewingEvent.id).length > 0 ? (
                    getRegisteredStudents(viewingEvent.id).map(student => (
                        <li key={student.id} className="py-2 border-b border-gray-200">{student.name} ({student.registerNumber})</li>
                    ))
                ) : (
                    <li className="py-2 text-gray-500">No students have registered for this event yet.</li>
                )}
            </ul>
             <div className="mt-6 flex justify-end">
              <button onClick={closeViewModal} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
         </Modal>
      )}

    </div>
  );
};

export default EventManagementPage;