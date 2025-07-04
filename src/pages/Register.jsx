import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user'); // 'user', 'journalist'
  const [journalistInfo, setJournalistInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }
    if (role === 'user' && !password) {
      setError('Iltimos, parolni kiriting');
      return;
    }
    if (role === 'journalist' && !journalistInfo) {
      setError('Iltimos, jurnalist ma\'lumotlarini kiriting');
      return;
    }
    setError('');
    // Dummy register, real register uchun backendga so'rov yuboriladi
    onRegister && onRegister({ email, name, role, journalistInfo, password });
  };

  return (
    <div className="auth-page-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Ro'yxatdan o'tish</h1>
        <label className="auth-label">Ismingiz</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="auth-input" />
        <label className="auth-label">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="auth-input" />
        <label className="auth-label">Kim sifatida ro'yxatdan o'tmoqchisiz?</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="auth-input">
          <option value="user">Foydalanuvchi</option>
          <option value="journalist">Jurnalist</option>
        </select>
        {role === 'user' && (
          <>
            <label className="auth-label">Parol</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="auth-input" />
          </>
        )}
        {role === 'journalist' && (
          <>
            <label className="auth-label">Jurnalist ma'lumotlari</label>
            <textarea
              value={journalistInfo}
              onChange={e => setJournalistInfo(e.target.value)}
              placeholder="Iltimos, tajribangiz va malakangiz haqida ma'lumot bering"
              className="auth-input"
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </>
        )}
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-btn">Ro'yxatdan o'tish</button>
        <div className="auth-link-block">
          Akkountingiz bormi? <span className="auth-link" onClick={() => onRegister && onRegister('login')}>Tizimga kirish</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 