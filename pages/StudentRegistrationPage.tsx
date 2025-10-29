
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../App';

interface StudentRegistrationPageProps {
    setPage: (page: Page) => void;
}

const StudentRegistrationPage: React.FC<StudentRegistrationPageProps> = ({ setPage }) => {
    const { addStudent } = useAuth();
    const [fullName, setFullName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [department, setDepartment] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!fullName || !regNumber || !collegeName || !department || !contact || !password) {
            setError('All fields are required.');
            return;
        }
        addStudent({
            id: Date.now(),
            name: fullName,
            email: `${regNumber.toLowerCase()}@test.com`, // dummy email
            role: 'student',
            registerNumber: regNumber,
            collegeName,
            department,
            contactNumber: contact,
            password
        });
        alert('Registration successful! Please login.');
        setPage('login');
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-lg bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Registration</h2>
                {error && <p className="bg-red-500/20 text-red-600 p-3 rounded-md mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700">Register Number</label>
                            <input type="text" id="regNumber" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
                        <input type="text" id="collegeName" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                            <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistrationPage;
