import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'bhumi90@gmail.com' && pass === 'aura2026') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="aura-login-page">
      <div className="aura-bg-blur"></div>
      
      <div className={`login-glass-card ${error ? 'aura-shake' : ''}`}>
        <div className="login-header">
          <div className="studio-logo-ring">
            <span className="studio-icon">💄</span>
          </div>
          <h2> Aura Craft</h2>
          <p>Artist Administration Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              placeholder="Auracraft@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Secret Key</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required 
            />
          </div>

          {error && <p className="error-text">❌ Invalid Credentials. Access Denied.</p>}
          
          <button type="submit" className="unlock-btn">
            Unlock Studio Ledger
          </button>
        </form>
        
        <div className="login-footer">
          EST. 2024 • Powered by Aura Craft
        </div>
      </div>
    </div>
  );
};

export default Login;