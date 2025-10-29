
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import MyEventsPage from './pages/MyEventsPage';
import EventManagementPage from './pages/EventManagementPage';
import StudentManagementPage from './pages/StudentManagementPage';
import AboutPage from './pages/AboutPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import RegistrationsPage from './pages/RegistrationsPage';
import ContactPage from './pages/ContactPage';

export type Page = 'home' | 'about' | 'events' | 'login' | 'my-events' | 'event-management' | 'student-management' | 'student-registration' | 'registrations' | 'contact';

export default function App() {
  const { user, role } = useAuth();
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    // When user logs out, redirect to home
    if (!user) {
      const currentPage = page;
      if (currentPage === 'my-events' || currentPage === 'event-management' || currentPage === 'student-management' || currentPage === 'registrations') {
         setPage('home');
      }
    }
  }, [user, page]);

  const renderPage = () => {
    const pageProps = { setPage };
    
    // Wrap all pages except home in the white content box
    const wrapInContentBox = (content: React.ReactNode) => (
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        {content}
      </div>
    );

    switch (page) {
      case 'home':
        return <HomePage {...pageProps} />;
      case 'about':
        return wrapInContentBox(<AboutPage />);
      case 'contact':
        return wrapInContentBox(<ContactPage />);
      case 'events':
        return wrapInContentBox(<EventsPage />);
      case 'login':
        return wrapInContentBox(<LoginPage {...pageProps} />);
      case 'student-registration':
        return wrapInContentBox(<StudentRegistrationPage {...pageProps} />);
      case 'my-events':
        return user && role === 'student' ? wrapInContentBox(<MyEventsPage />) : <HomePage {...pageProps} />;
      case 'event-management':
        return user && role === 'admin' ? wrapInContentBox(<EventManagementPage {...pageProps} />) : <HomePage {...pageProps} />;
      case 'student-management':
        return user && role === 'admin' ? wrapInContentBox(<StudentManagementPage />) : <HomePage {...pageProps} />;
      case 'registrations':
        return user && role === 'admin' ? wrapInContentBox(<RegistrationsPage {...pageProps} />) : <HomePage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar page={page} setPage={setPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
