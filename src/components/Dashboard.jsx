import React, { useMemo, useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ bookings = [] }) => {
  const [filter, setFilter] = useState('all');

  // Stats Logic: Efficiency ke liye reduce ka use kiya hai
  const stats = useMemo(() => {
    const filtered = filter === 'all' 
      ? bookings 
      : bookings.filter(b => b.status === filter);

    return filtered.reduce((acc, booking) => {
      if (booking.status === 'paid') acc.paid += Number(booking.amount);
      if (booking.status === 'pending') acc.pending += Number(booking.amount);
      return acc;
    }, { paid: 0, pending: 0, count: filtered.length });
  }, [bookings, filter]);

  // Upcoming Logic: Today aur Future ki bookings
  const upcomingBookings = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return bookings
      .filter(b => {
        const bookingDate = new Date(b.date).getTime();
        return bookingDate >= today && b.status === 'pending';
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, [bookings]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(num);
  };

  return (
    <div className="aura-dashboard">
      {/* Brand Hero - Bhumi's Identity */}
      <div className="aura-hero">
        <div className="brand-badge">EST. 2024</div>
        <h1 className="brand-name">Bhumi Aura Craft</h1>
        <p className="brand-tagline">Crafting Elegance, One Stroke at a Time ✨</p>
      </div>

      {/* Analytics Section */}
      <div className="stats-header-row">
        <h3>Revenue Insights</h3>
        <select className="aura-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Full Timeline</option>
          <option value="paid">Settled</option>
          <option value="pending">In-Process</option>
        </select>
      </div>

      <div className="aura-grid">
        <div className="aura-card gold-gradient">
          <span className="card-label">Total Earning</span>
          <h2 className="card-value">{formatCurrency(stats.paid)}</h2>
          <div className="card-footer">Settled via Studio Ledger</div>
        </div>

        <div className="aura-card dark-gradient">
          <span className="card-label">Pending Dues</span>
          <h2 className="card-value">{formatCurrency(stats.pending)}</h2>
          <div className="card-footer">Awaiting client payment</div>
        </div>

        <div className="aura-card rose-gradient">
          <span className="card-label">Aura Glimpses</span>
          <h2 className="card-value">{stats.count}</h2>
          <div className="card-footer">Total Sessions Booked</div>
        </div>
      </div>

      <div className="aura-layout-split">
        {/* Left: Upcoming (Focus) */}
        <div className="aura-column">
          <div className="column-header">
            <h3>Upcoming Focus</h3>
            <span className="tag-next">Next 4 Sessions</span>
          </div>
          <div className="aura-list scrollable">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(b => (
                <div key={b.id} className="upcoming-mini-card">
                  <div className="mini-date-badge">
                    <span className="m-day">{new Date(b.date).getDate()}</span>
                    <span className="m-mon">{new Date(b.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="mini-info">
                    <h4>{b.client}</h4>
                    <p>{b.service}</p>
                    <span className="mini-loc">📍 {b.location?.split(',')[0]}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-msg">No sessions found. Relax! 🍵</p>
            )}
          </div>
        </div>

        {/* Right: History (Recent) */}
        <div className="aura-column">
          <div className="column-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="aura-list scrollable">
            {bookings.length > 0 ? (
              bookings.slice(0, 5).map(b => (
                <div key={b.id} className="aura-item">
                  <div className="aura-avatar">{b.client?.charAt(0)}</div>
                  <div className="aura-info">
                    <span className="aura-client-name">{b.client}</span>
                    <span className="aura-service-name">{b.service}</span>
                  </div>
                  <div className="aura-price-tag">
                    {formatCurrency(b.amount)}
                    <span className={`aura-status-dot ${b.status}`}></span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-msg">History is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;