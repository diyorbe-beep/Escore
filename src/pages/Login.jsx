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
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <form className="block" style={{minWidth: 340, background: '#fff', border: '1.5px solid #1a3a6b', borderRadius: 8, padding: 32, boxShadow: '0 2px 12px #e0e0e0'}} onSubmit={handleSubmit}>
        <h1 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b', fontSize: '2rem', marginBottom: 18, textAlign: 'center'}}>Tizimga kirish</h1>
        <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Emailingizni kiriting"
          style={{width: '100%', padding: 10, margin: '8px 0 18px 0', borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em'}} 
        />
        
        {(email === 'admin@escorenews.com') && (
          <>
            <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Parol</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Admin parolini kiriting"
              style={{width: '100%', padding: 10, margin: '8px 0 18px 0', borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em'}} 
            />
          </>
        )}

        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <button type="submit" style={{width: '100%', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 0', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.1em', letterSpacing: 1}}>Kirish</button>
        <div style={{marginTop: 18, textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.98em'}}>
          Akkountingiz yo'qmi? <span style={{color: '#1a3a6b', cursor: 'pointer', fontWeight: 600}} onClick={() => onLogin && onLogin('register')}>Ro'yxatdan o'tish</span>
        </div>
        <div style={{marginTop: 12, textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.85em', color: '#666'}}>
          Admin: admin@escorenews.com<br/>
          Jurnalist: ismingiz@journalist.escorenews.com
        </div>
      </form>
    </div>
  );
};

export default Login; 