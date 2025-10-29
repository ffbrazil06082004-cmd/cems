import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Event } from '../types';

const MyEventsPage = () => {
  const { user, events, registrations } = useAuth();

  if (!user) {
    return <p>Please log in to see your events.</p>;
  }

  const registeredEventIds = registrations
    .filter(reg => reg.studentId === user.id)
    .map(reg => reg.eventId);
  
  const myEvents = events.filter(event => registeredEventIds.includes(event.id));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">My Registered Events</h1>
      {myEvents.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(event.date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={new Date(event.date) > new Date() ? 'text-green-600' : 'text-gray-500'}>
                        {new Date(event.date) > new Date() ? 'Upcoming' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">You haven't registered for any events yet.</p>
      )}
    </div>
  );
};

export default MyEventsPage;