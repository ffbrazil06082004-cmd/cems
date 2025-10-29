
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const StudentManagementPage = () => {
  const { students, events, registrations, deleteStudent } = useAuth();

  const getEventsForStudent = (studentId: number) => {
    const eventIds = registrations
      .filter(reg => reg.studentId === studentId)
      .map(reg => reg.eventId);
    return events
      .filter(event => eventIds.includes(event.id))
      .map(event => event.name)
      .join(', ');
  };
  
  const handleDeleteStudent = (studentId: number, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete student ${studentName}? This action cannot be undone.`)) {
      deleteStudent(studentId);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Student Management</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full table-fixed">
            <thead className="bg-gray-50">
                <tr>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No</th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                    <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Events</th>
                    <th className="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 break-words text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-600">{student.registerNumber}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-600">{student.collegeName}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-600">{student.department}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-600">{student.contactNumber}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-600">
                      {getEventsForStudent(student.id) || 'None'}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <button onClick={() => handleDeleteStudent(student.id, student.name)} className="text-red-600 hover:text-red-800"><TrashIcon className="h-5 w-5 inline" title="Delete Student" /></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagementPage;