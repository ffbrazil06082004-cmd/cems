
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../App';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface RegistrationsPageProps {
    setPage: (page: Page) => void;
}

const RegistrationsPage: React.FC<RegistrationsPageProps> = ({ setPage }) => {
    const { viewingEvent, students, registrations } = useAuth();

    if (!viewingEvent) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
                <p className="text-gray-600 mb-6">No event selected. Please go back and select an event to view registrations.</p>
                <button 
                    onClick={() => setPage('event-management')}
                    className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Event Management
                </button>
            </div>
        );
    }

    const registeredStudentIds = registrations
        .filter(reg => reg.eventId === viewingEvent.id)
        .map(reg => reg.studentId);
    
    const registeredStudents = students.filter(student => registeredStudentIds.includes(student.id));

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-2">Registrations</h1>
            <h2 className="text-2xl font-semibold text-center text-gray-600 mb-8">For "{viewingEvent.name}"</h2>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-gray-200">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Register No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {registeredStudents.length > 0 ? (
                            registeredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.registerNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.collegeName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    No students have registered for this event yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 text-center">
                 <button 
                    onClick={() => setPage('event-management')}
                    className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Event Management
                </button>
            </div>
        </div>
    );
};

export default RegistrationsPage;
