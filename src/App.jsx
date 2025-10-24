import React, { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="font-sans bg-white">
      <Navbar setView={setView} />
      <main className="pt-16">
        {view === 'home' && <HomePage />}
        {view === 'about' && <AboutPage />}
      </main>
      <Footer />
    </div>
  );
}

