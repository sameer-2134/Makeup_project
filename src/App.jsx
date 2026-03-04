import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import Login from './components/Login';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('aura_logged_in') === 'true';
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const q = query(collection(db, "bookings"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBookings(data);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    localStorage.setItem('aura_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('aura_logged_in');
    setIsLoggedIn(false);
  };

  const handleAddBooking = async (newBooking) => {
    await addDoc(collection(db, "bookings"), newBooking);
    setActiveTab('list');
  };

  const handleUpdateStatus = async (updatedBooking) => {
    const bookingRef = doc(db, "bookings", updatedBooking.id);
    await updateDoc(bookingRef, { status: updatedBooking.status });
  };

  const handleDeleteBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="aura-app-container">
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

          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon">🚪</span> 
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </nav>

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