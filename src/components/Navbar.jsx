import React from 'react';
import logo from "../assets/logo.png";

const Navbar = ({ setView }) => (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-gray-800">
              
              <span>FitFlex</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-4">
              <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="text-gray-600 hover:bg-rose-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('exercises-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:bg-rose-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Exercises</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }} className="text-gray-600 hover:bg-rose-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
);

export default Navbar;
