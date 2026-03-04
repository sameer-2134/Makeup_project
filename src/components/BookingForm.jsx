import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onAddBooking }) => {
  const [formData, setFormData] = useState({
    client: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    service: '',
    amount: '',
    location: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(formData.phone.length < 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount) || 0,
        status: 'pending',
        createdAt: new Date()
      };

      onAddBooking(newBooking);
      
      setShowSuccess(true);
      setIsSubmitting(false);
      
      setFormData({ 
        client: '', 
        phone: '',
        date: new Date().toISOString().split('T')[0], 
        service: '', 
        amount: '', 
        location: '',
        notes: ''
      });

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="aura-form-wrapper">
      <div className={`aura-glass-form ${showSuccess ? 'aura-success-glow' : ''}`}>
        <div className="aura-form-header">
          <div className="aura-symbol">✨</div>
          <h2>New Aura Creation</h2>
          <p>Document the next masterpiece for Bhumi Aura Craft</p>
        </div>

        <form onSubmit={handleSubmit} className="aura-main-form">
          <div className="aura-input-grid">
            <div className="aura-field">
              <label>Client Identity</label>
              <input 
                type="text" 
                name="client" 
                placeholder="Name of the Muse"
                value={formData.client} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="aura-field">
              <label>Contact Number</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="WhatsApp Number"
                value={formData.phone} 
                onChange={handleChange} 
                maxLength="10"
                required 
              />
            </div>

            <div className="aura-field">
              <label>Session Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="aura-field">
              <label>Service Type</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="" disabled>Select the Art</option>
                <option value="Bridal Couture">Bridal Couture Glam</option>
                <option value="Celebrity Stylist">Celebrity Stylist Look</option>
                <option value="Aura Glow Treatment">Aura Glow Treatment</option>
                <option value="High-Fashion Editorial">High-Fashion Editorial</option>
                <option value="Consultation">Private Consultation</option>
              </select>
            </div>

            <div className="aura-field">
              <label>Aura Fee (₹)</label>
              <input 
                type="number" 
                name="amount" 
                placeholder="E.g. 5000"
                value={formData.amount} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="aura-field">
              <label>Venue / Destination</label>
              <input 
                type="text" 
                name="location" 
                placeholder="Studio or Address"
                value={formData.location} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="aura-field full-row">
              <label>Special Notes & Requests</label>
              <textarea 
                name="notes" 
                placeholder="Any specific requests..."
                value={formData.notes} 
                onChange={handleChange} 
                rows="2"
              ></textarea>
            </div>
          </div>

          <button type="submit" className={`aura-submit-btn ${isSubmitting ? 'aura-busy' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Syncing with Ledger...' : 'Confirm Aura Session'}
          </button>
        </form>

        {showSuccess && (
          <div className="aura-success-popup">
            ✅ Art Successfully Scheduled!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;