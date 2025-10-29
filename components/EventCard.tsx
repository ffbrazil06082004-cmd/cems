
import React from 'react';
import { Event } from '../types';
import { CalendarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/solid';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  showRegisterButton: boolean;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, showRegisterButton, isRegistered }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-red-800">{event.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{new Date(event.date).toLocaleString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
            <UserCircleIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>Organized by: <strong>{event.organizer}</strong></span>
        </div>
        <p className="text-gray-700 leading-relaxed">{event.description}</p>
      </div>
      {showRegisterButton && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => onRegister(event)}
            disabled={isRegistered}
            className={`w-full font-bold py-2 px-4 rounded transition-colors text-white ${
              isRegistered
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800'
            }`}
          >
            {isRegistered ? 'Registered' : 'Register'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
