import React from 'react';
import { BuildingLibraryIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Fix: Refactored to use a dedicated props interface to solve 'children' prop type errors.
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

// Fix: Explicitly typed as React.FC to ensure the 'children' prop is correctly handled by TypeScript.
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => (
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-red-700">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const AboutPage = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">About the College Event Management System</h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-600">
                    Our platform is designed to connect the entire campus community, making it seamless to discover, manage, and participate in events that define the college experience.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard icon={<BuildingLibraryIcon className="h-12 w-12 text-red-600" />} title="Centralized Hub">
                    Find all official college events in one place. No more missed opportunities or searching through scattered announcements.
                </FeatureCard>
                <FeatureCard icon={<UserGroupIcon className="h-12 w-12 text-red-600" />} title="For Students & Admins">
                    A tailored experience for everyone. Students can easily register, while admins have powerful tools to manage events and attendees.
                </FeatureCard>
                <FeatureCard icon={<SparklesIcon className="h-12 w-12 text-red-600" />} title="Enhance Campus Life">
                    We believe in the power of community. Our system encourages participation, helps build connections, and enriches the vibrant culture of our campus.
                </FeatureCard>
            </div>
            
            <div className="bg-red-50 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-red-800">Our Mission</h2>
                <p className="text-center text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    To foster a more engaged and connected student body by providing an intuitive, reliable, and comprehensive platform for managing and discovering campus events. We aim to simplify the logistics of event organization so that creators can focus on delivering memorable experiences, and students can focus on making the most of their time at college.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;