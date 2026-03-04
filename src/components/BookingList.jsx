import React, { useState, useMemo } from 'react';
import './BookingList.css';

const BookingList = ({ bookings = [], onUpdateStatus, onDeleteBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: '2-digit', month: 'short', year: 'numeric' 
    });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(num);
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => 
      (b.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
       b.service.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || b.status === statusFilter)
    );
  }, [bookings, searchTerm, statusFilter]);

  const sendWhatsApp = (booking) => {
    const phone = booking.phone || "";
    const msg = `Hi ${booking.client}, this is Bhumi Aura Craft. Just confirming your ${booking.service} session for ${formatDate(booking.date)}. ✨`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="aura-list-container">
      <div className="aura-list-header">
        <div className="header-title">
          <h2>The Aura Ledger</h2>
          <p>{filteredBookings.length} Professional Sessions Found</p>
        </div>

        <div className="aura-controls">
          <div className="aura-search-bar">
            <span className="icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search Client or Art..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="aura-filter-tabs">
            {['all', 'paid', 'pending'].map(s => (
              <button 
                key={s}
                className={statusFilter === s ? 'active' : ''}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? 'All Art' : s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="aura-cards-grid">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} className={`aura-booking-card ${booking.status}`}>
              <div className="card-top">
                <div className="client-avatar-ring">
                  <div className="client-initials">{booking.client.charAt(0)}</div>
                </div>
                <div className="status-label">{booking.status}</div>
              </div>

              <div className="card-middle">
                <h3 className="client-name">{booking.client}</h3>
                <p className="service-name">✨ {booking.service}</p>
                <div className="details-row">
                    <p className="location-info">📍 {booking.location || 'Studio'}</p>
                    <button className="btn-wa" onClick={() => sendWhatsApp(booking)}>📱 WhatsApp</button>
                </div>
                {booking.notes && <p className="notes-info">“{booking.notes}”</p>}
              </div>

              <div className="card-bottom">
                <div className="price-date">
                  <span className="price">{formatCurrency(booking.amount)}</span>
                  <span className="date">{formatDate(booking.date)}</span>
                </div>
                
                <div className="aura-actions">
                  <button 
                    className={`btn-toggle ${booking.status}`}
                    onClick={() => onUpdateStatus({ ...booking, status: booking.status === 'paid' ? 'pending' : 'paid' })}
                  >
                    {booking.status === 'paid' ? 'Mark Pending' : 'Mark Paid'}
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => { if(window.confirm('Remove from Ledger?')) onDeleteBooking(booking.id) }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>✨ No art matches your search. Time to book a new session!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;