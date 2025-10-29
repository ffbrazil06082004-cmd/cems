import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#4d0202] text-red-100 py-8 mt-12" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-denim-3.png')"}}>
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 College Event Management System. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
        <p className="mt-4 text-sm">Contact us: contact@collegeevents.edu</p>
      </div>
    </footer>
  );
};

export default Footer;