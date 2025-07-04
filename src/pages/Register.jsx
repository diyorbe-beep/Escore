import React, { useState } from 'react';
import { userApi } from '../services/ApiService';

const Register = ({ onRegister, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Ism majburiy');
      return;
    }
    if (!email.trim()) {
      setError('Email majburiy');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Email formati noto‘g‘ri');
      return;
    }
    if (!password || password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
      return;
    }
    setError('');
    const res = await userApi.register({ email, name, password });
    if (res.error) setError(res.error);
    else {
      setEmail(''); setPassword(''); setName('');
      setSuccess('Muvaffaqiyatli ro‘yxatdan o‘tdingiz!');
    }
  };

  return (
    <div className="auth-page-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Ro'yxatdan o'tish</h1>
        <label className="auth-label">Ismingiz</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="auth-input" />
        <label className="auth-label">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="auth-input" />
        <label className="auth-label">Parol</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="auth-input" />
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <button type="submit" className="auth-btn">Ro'yxatdan o'tish</button>
        <div className="auth-link-block">
          Akkountingiz bormi? <span className="auth-link" onClick={() => onRegister && onRegister('login')}>Tizimga kirish</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 