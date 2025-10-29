import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../App';

interface NavbarProps {
  page: Page;
  setPage: (page: Page) => void;
}

const NavLink: React.FC<{
  label: string;
  target: Page;
  setPage: (page: Page) => void;
}> = ({ label, target, setPage }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(target);
  };
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-white hover:bg-[#c1121f]/50 transition-colors duration-200 rounded-sm"
    >
      {label}
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ page, setPage }) => {
  const { user, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setPage('home');
  };

  return (
    <header className="shadow-lg">
      <div className="bg-[#4d0202] text-center p-4" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-denim-3.png')"}}>
        <h1 className="text-4xl text-white font-serif">College Event Management System</h1>
      </div>
      <nav className="bg-[#a4161a]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center space-x-4">
              {!user && (
                <>
                  <NavLink label="Home" target="home" setPage={setPage} />
                  <NavLink label="About" target="about" setPage={setPage} />
                  <NavLink label="Events" target="events" setPage={setPage} />
                  <NavLink label="Student Registration" target="student-registration" setPage={setPage} />
                  <NavLink label="Contact Us" target="contact" setPage={setPage} />
                </>
              )}
              {user && role === 'student' && (
                <>
                  <NavLink label="Home" target="home" setPage={setPage} />
                  <NavLink label="Events" target="events" setPage={setPage} />
                  <NavLink label="My Events" target="my-events" setPage={setPage} />
                  <NavLink label="About" target="about" setPage={setPage} />
                  <NavLink label="Contact Us" target="contact" setPage={setPage} />
                </>
              )}
              {user && role === 'admin' && (
                <>
                  <NavLink label="Home" target="home" setPage={setPage} />
                  <NavLink label="Event Management" target="event-management" setPage={setPage} />
                  <NavLink label="Student Management" target="student-management" setPage={setPage} />
                  <NavLink label="About" target="about" setPage={setPage} />
                </>
              )}
            </div>
            <div className="flex items-center">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 rounded-sm"
                >
                  Logout
                </button>
              ) : (
                 <button
                  onClick={() => setPage('login')}
                  className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 rounded-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;