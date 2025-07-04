import React, { useState } from 'react';
import { userApi } from '../services/ApiService';

const ADMIN_EMAILS = ['admin@mail.com', 'superadmin@mail.com'];

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email majburiy');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Email formati noto\'g\'ri');
      return;
    }
    setError('');
    setLoading(true);
    const res = await userApi.login({ email, password });
    setLoading(false);
    if (res.error) setError(res.error);
    else {
      setSuccess('Muvaffaqiyatli tizimga kirdingiz!');
      onLogin && onLogin(res.user);
    }
  };

  // Email to'g'ri formatda bo'lsa va to'ldirilgan bo'lsa, parol inputini ko'rsatamiz
  const showPassword = email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

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
        {showPassword && (
          <>
            <label className="auth-label">Parol</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Parolingizni kiriting"
              className="auth-input"
            />
          </>
        )}
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <button type="submit" className="auth-btn" disabled={loading}>Kirish</button>
        {loading && <span style={{marginLeft: 12, color: '#1a3a6b'}}>Yuklanmoqda...</span>}
        <div className="auth-link-block">
          Akkountingiz yo'qmi? <span className="auth-link" onClick={() => onLogin && onLogin('register')}>Ro'yxatdan o'tish</span>
        </div>
      </form>
    </div>
  );
};

export default Login; 