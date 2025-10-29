
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields.');
            return;
        }
        // Simulate form submission
        console.log({ name, email, subject, message });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            // Clear form
            if (!user) {
                setName('');
                setEmail('');
            }
            setSubject('');
            setMessage('');
        }, 5000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Have questions or feedback? Fill out the form below to get in touch with our team.
                </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                {submitted ? (
                    <div className="text-center p-6 bg-green-100 text-green-800 rounded-md">
                        <h3 className="font-bold text-xl">Thank You!</h3>
                        <p>Your message has been sent successfully. We will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    readOnly={!!user}
                                    required 
                                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm read-only:bg-gray-100 read-only:cursor-not-allowed" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={!!user}
                                    required 
                                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm read-only:bg-gray-100 read-only:cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input 
                                type="text" 
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} 
                                required 
                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea 
                                id="message" 
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)} 
                                required
                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            ></textarea>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                <PaperAirplaneIcon className="h-5 w-5 mr-2 -ml-1" />
                                Send Message
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
