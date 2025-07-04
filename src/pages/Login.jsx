import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) {
      setError('Iltimos, emailni kiriting');
      return;
    }

    // Check if it's admin login
    const isAdminLogin = email === 'admin@escorenews.com';
    if (isAdminLogin && !password) {
      setError('Admin uchun parol kiritish majburiy');
      return;
    }

    setError('');
    
    // Determine user role
    let role = 'user';
    if (isAdminLogin) {
      role = 'admin';
    } else if (email.endsWith('@journalist.escorenews.com')) {
      role = 'journalist';
    }
    
    // Dummy login, real login uchun backendga so'rov yuboriladi
    onLogin && onLogin({ 
      email, 
      role,
      name: email.split('@')[0], // Dummy name from email
    });
  };

  return (
    <div className="auth-page-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Tizimga kirish</h1>
        <label className="auth-label">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Emailingizni kiriting"
          className="auth-input"
        />
        
        {(email === 'admin@escorenews.com') && (
          <>
            <label className="auth-label">Parol</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Admin parolini kiriting"
              className="auth-input"
            />
          </>
        )}

        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-btn">Kirish</button>
        <div className="auth-link-block">
          Akkountingiz yo'qmi? <span className="auth-link" onClick={() => onLogin && onLogin('register')}>Ro'yxatdan o'tish</span>
        </div>
        <div className="auth-info">
          Admin: admin@escorenews.com<br/>
          Jurnalist: ismingiz@journalist.escorenews.com
        </div>
      </form>
    </div>
  );
};

export default Login; 