import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Music Learning App
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/courses" className="hover:text-blue-200">
              Cours
            </Link>
            <Link to="/dashboard" className="hover:text-blue-200">
              Tableau de bord
            </Link>
            <Link to="/support" className="hover:text-blue-200">
              Support
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-blue-200">
              Connexion
            </Link>
            <Link to="/register" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded">
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 