import React, { useState, useEffect } from 'react';
import { userApi } from '../services/ApiService';

const Register = ({ onRegister, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [autoLoginTimer, setAutoLoginTimer] = useState(null);
  const [countdownInterval, setCountdownInterval] = useState(null);

  // Component unmount bo'lganda timer'larni tozalash
  useEffect(() => {
    return () => {
      if (autoLoginTimer) {
        clearTimeout(autoLoginTimer);
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [autoLoginTimer, countdownInterval]);

  const handleCancelAutoLogin = () => {
    if (autoLoginTimer) {
      clearTimeout(autoLoginTimer);
      setAutoLoginTimer(null);
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setCountdownInterval(null);
    }
    setCountdown(0);
    setSuccess('Avtomatik kirish bekor qilindi. Qo\'lda kirishingiz mumkin.');
  };

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
      setError('Email formati noto\'g\'ri');
      return;
    }
    if (!password || password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Ro'yxatdan o'tish
      const registerRes = await userApi.register({ email, name, password });
      if (registerRes.error) {
        setError(registerRes.error);
        return;
      }
      
      setSuccess('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Avtomatik tizimga kirilmoqda...');
      
      // Avtomatik tizimga kirish
      let countdownValue = 3;
      setCountdown(countdownValue);
      
      const interval = setInterval(() => {
        countdownValue--;
        setCountdown(countdownValue);
        if (countdownValue <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      setCountdownInterval(interval);
      
      const timer = setTimeout(async () => {
        try {
          const loginRes = await userApi.login({ email, password });
          if (loginRes.error) {
            setError('Avtomatik kirishda xatolik: ' + loginRes.error);
            clearInterval(interval);
            setCountdown(0);
            setAutoLoginTimer(null);
            setCountdownInterval(null);
            return;
          }
          
          // Foydalanuvchi ma'lumotlarini saqlash va tizimga kirish
          if (onLogin && loginRes.user) {
            // Token ham saqlash
            if (loginRes.token) {
              localStorage.setItem('token', loginRes.token);
            }
            onLogin(loginRes.user);
          }
        } catch (loginErr) {
          setError('Avtomatik kirishda xatolik yuz berdi');
          clearInterval(interval);
          setCountdown(0);
          setAutoLoginTimer(null);
          setCountdownInterval(null);
        }
      }, 3000); // 3 soniya kutib, keyin kirish
      
      setAutoLoginTimer(timer);
      
    } catch (err) {
      setError('Ro\'yxatdan o\'tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Ro'yxatdan o'tish</h1>
        <label className="auth-label">Ismingiz</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          className="auth-input"
          disabled={loading}
        />
        <label className="auth-label">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="auth-input"
          disabled={loading}
        />
        <label className="auth-label">Parol</label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="auth-input"
          disabled={loading}
        />
        {error && (
          <div className="auth-error" style={{position: 'relative'}}>
            {error}
            <button 
              onClick={() => setError('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '1.2em',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="auth-success" style={{position: 'relative'}}>
            {success}
            {countdown > 0 && (
              <span style={{marginLeft: '8px', fontWeight: 'bold'}}>
                ({countdown} soniya)
              </span>
            )}
            {countdown > 0 && (
              <button 
                onClick={handleCancelAutoLogin}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '0.8em',
                  fontWeight: 'bold'
                }}
              >
                Bekor qilish
              </button>
            )}
            {countdown === 0 && (
              <button 
                onClick={() => setSuccess('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '1.2em',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
          style={{
            background: loading ? '#ccc' : undefined,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
        </button>
        <div className="auth-link-block">
          Akkountingiz bormi? <span className="auth-link" onClick={() => !loading && onRegister && onRegister('login')}>Tizimga kirish</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 