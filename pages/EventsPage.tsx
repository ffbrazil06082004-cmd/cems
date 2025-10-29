
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { useAuth } from '../contexts/AuthContext';
import { Event } from '../types';
import Modal from '../components/Modal';

const EventsPage = () => {
  const { user, role, events, registrations, addRegistration } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [eventToRegister, setEventToRegister] = useState<Event | null>(null);
  const [registrationResult, setRegistrationResult] = useState<{ message: string } | null>(null);

  const handleRegisterClick = (event: Event) => {
    if (!user) {
        setRegistrationResult({ message: 'You must be logged in to register.'});
        return;
    }
    setEventToRegister(event);
  };

  const handleConfirmRegistration = () => {
    if (!eventToRegister) return;
    const result = addRegistration(eventToRegister.id);
    setRegistrationResult({ message: result.message });
    setEventToRegister(null);
  };

  const closeConfirmationModal = () => {
    setEventToRegister(null);
  };

  const closeResultModal = () => {
    setRegistrationResult(null);
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Events</h1>
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegisterClick}
              showRegisterButton={role === 'student'}
              isRegistered={user ? registrations.some(r => r.studentId === user.id && r.eventId === event.id) : false}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No events found matching your search.</p>
        )}
      </div>

      {eventToRegister && (
        <Modal title="Confirm Registration" onClose={closeConfirmationModal}>
          <p className="text-gray-700 mb-6">
            Are you sure you want to register for the event: <strong>"{eventToRegister.name}"</strong>?
          </p>
          <div className="flex justify-end space-x-3">
            <button onClick={closeConfirmationModal} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Cancel
            </button>
            <button onClick={handleConfirmRegistration} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors">
              Confirm Registration
            </button>
          </div>
        </Modal>
      )}

      {registrationResult && (
        <Modal title="Registration Status" onClose={closeResultModal}>
          <p className="text-gray-700 mb-6">
            {registrationResult.message}
          </p>
          <div className="flex justify-end">
            <button onClick={closeResultModal} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors">
              OK
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default EventsPage;
