import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('makeup_bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('makeup_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleAddBooking = (newBooking) => {
    setBookings(prevBookings => [newBooking, ...prevBookings]);
    setActiveTab('list'); 
  };

  const handleUpdateStatus = (updatedBooking) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
  };

  const handleDeleteBooking = (id) => {
    setBookings(prevBookings =>
      prevBookings.filter(booking => booking.id !== id)
    );
  };

  return (
    <div className="aura-app-container">
      {/* Desktop Sidebar & Mobile Bottom Nav */}
      <nav className="aura-navigation">
        <div className="aura-logo-container">
          <span className="aura-logo-icon">💄</span>
          <h1 className="aura-brand-name">Aura Craft</h1>
        </div>
        
        <div className="aura-nav-items">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon">📊</span> 
            <span className="nav-label">Dashboard</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'form' ? 'active' : ''}`} onClick={() => setActiveTab('form')}>
            <span className="nav-icon">✨</span> 
            <span className="nav-label">New Art</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
            <span className="nav-icon">📋</span> 
            <span className="nav-label">Ledger</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="aura-content-area">
        <header className="aura-header">
          <div className="aura-status">
            <span className="live-indicator"></span> Studio is Live
          </div>
          <div className="aura-artist-name">Bhumi <span>• Artist</span></div>
        </header>

        <div className="aura-body">
          {activeTab === 'dashboard' && <Dashboard bookings={bookings} />}
          {activeTab === 'form' && <BookingForm onAddBooking={handleAddBooking} />}
          {activeTab === 'list' && (
            <BookingList 
              bookings={bookings} 
              onUpdateStatus={handleUpdateStatus}
              onDeleteBooking={handleDeleteBooking}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;




// Toh humein ismein Firebase ya Supabase (Database) connect karna padega.