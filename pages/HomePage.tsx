import React, { useRef, useEffect } from 'react';
import type { Page } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
    setPage: (page: Page) => void;
}

const upcomingEvents = [
    {
        id: 1,
        name: 'National Tech Symposium 2025',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        description: 'AI, IoT, Robotics workshops by industry experts.',
        details: '📅 18 Nov 2025 | 📍 Main Auditorium',
    },
    {
        id: 4,
        name: 'Cyber Security Awareness Bootcamp',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        description: 'Ethical Hacking live demos + Capture the Flag contest.',
        details: '📅 25 Nov 2025 | 📍 IT Block Seminar Hall',
    },
    {
        id: 2,
        name: 'Innovation Hackathon – Campus Edition',
        image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
        description: '24-hour coding marathon with startup mentors.',
        details: '📅 05 Dec 2025 | 📍 Innovation Lab',
    },
];

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
    const heroImageRef = useRef<HTMLImageElement>(null);
    const { user, role } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (heroImageRef.current) {
                const scrollY = window.scrollY;
                heroImageRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div
                className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center text-center shadow-2xl"
            >
                <img
                    ref={heroImageRef}
                    src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop"
                    alt="Students at a college music festival"
                    className="absolute w-full h-full object-cover"
                />
                <div className="relative z-10 bg-black/50 p-8 rounded-lg">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        Experience Campus Life
                    </h1>
                    <p className="text-lg text-red-100 mt-2">Discover, join, and manage events all in one place.</p>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-gray-50 text-gray-800 p-6 md:p-10 rounded-lg shadow-2xl relative z-10 -mt-24">
                <h2 className="text-3xl font-bold text-center mb-10 text-red-900 uppercase tracking-wider">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
                            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" loading="lazy" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-grow">{event.description}</p>
                                <p className="text-sm text-gray-700 font-semibold mb-4">{event.details}</p>
                                {role !== 'admin' && (
                                    <button
                                        onClick={() => user ? setPage('events') : setPage('login')}
                                        className="mt-auto w-full bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 transition-colors"
                                    >
                                        Register Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;