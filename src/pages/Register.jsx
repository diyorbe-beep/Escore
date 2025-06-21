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
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <form className="block" style={{minWidth: 340, background: '#fff', border: '1.5px solid #1a3a6b', borderRadius: 8, padding: 32, boxShadow: '0 2px 12px #e0e0e0'}} onSubmit={handleSubmit}>
        <h1 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b', fontSize: '2rem', marginBottom: 18, textAlign: 'center'}}>Ro'yxatdan o'tish</h1>
        
        <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Ismingiz</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={{width: '100%', padding: 10, margin: '8px 0 18px 0', borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em'}} />
        
        <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%', padding: 10, margin: '8px 0 18px 0', borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em'}} />
        
        <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Kim sifatida ro'yxatdan o'tmoqchisiz?</label>
        <select 
          value={role} 
          onChange={e => setRole(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            margin: '8px 0 18px 0',
            borderRadius: 4,
            border: '1.5px solid #d6d3c7',
            fontSize: '1em',
            background: 'white'
          }}
        >
          <option value="user">Foydalanuvchi</option>
          <option value="journalist">Jurnalist</option>
        </select>

        {role === 'user' && (
          <>
            <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Parol</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{width: '100%', padding: 10, margin: '8px 0 18px 0', borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em'}} 
            />
          </>
        )}

        {role === 'journalist' && (
          <>
            <label style={{fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Jurnalist ma'lumotlari</label>
            <textarea
              value={journalistInfo}
              onChange={e => setJournalistInfo(e.target.value)}
              placeholder="Iltimos, tajribangiz va malakangiz haqida ma'lumot bering"
              style={{
                width: '100%',
                padding: 10,
                margin: '8px 0 18px 0',
                borderRadius: 4,
                border: '1.5px solid #d6d3c7',
                fontSize: '1em',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </>
        )}

        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <button type="submit" style={{width: '100%', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 0', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.1em', letterSpacing: 1}}>Ro'yxatdan o'tish</button>
        <div style={{marginTop: 18, textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.98em'}}>
          Akkountingiz bormi? <span style={{color: '#1a3a6b', cursor: 'pointer', fontWeight: 600}} onClick={() => onRegister && onRegister('login')}>Tizimga kirish</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 