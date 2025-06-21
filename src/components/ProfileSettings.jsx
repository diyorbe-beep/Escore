import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaImage, FaPhone } from 'react-icons/fa';

const ProfileSettings = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: user?.avatar || '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parolni tekshirish
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setError('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Yangi parollar bir xil emas');
        return;
      }
      if (!formData.currentPassword) {
        setError('Joriy parolni kiriting');
        return;
      }
    }

    // Telefon raqamni tekshirish
    const phoneRegex = /^\+998[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setError('Telefon raqamni to\'g\'ri formatda kiriting: +998xxxxxxxxx');
      return;
    }

    // Ma'lumotlarni saqlash
    onSave({
      ...formData,
      updatedAt: new Date().toISOString()
    });
    setSuccess('Sozlamalar muvaffaqiyatli saqlandi');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError('Rasm hajmi 5MB dan oshmasligi kerak');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#1a3a6b',
        marginBottom: '24px'
      }}>
        Profil Sozlamalari
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Avatar qismi */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginBottom: '24px' 
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            background: formData.avatar ? `url(${formData.avatar})` : '#1a3a6b',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            {!formData.avatar && <FaUser size={40} color="white" />}
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="avatar"
            style={{
              padding: '8px 16px',
              background: '#1a3a6b',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Rasm yuklash
          </label>
        </div>

        {/* Asosiy ma'lumotlar */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            <FaUser style={{ marginRight: '8px' }} />
            To'liq ism
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1em'
            }}
            placeholder="To'liq ismingizni kiriting"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            <FaEnvelope style={{ marginRight: '8px' }} />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1em'
            }}
            placeholder="Email manzilingizni kiriting"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            <FaPhone style={{ marginRight: '8px' }} />
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1em'
            }}
            placeholder="+998xxxxxxxxx"
          />
        </div>

        {/* Parol o'zgartirish */}
        <div style={{ 
          marginTop: '32px',
          marginBottom: '20px',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#1a3a6b' }}>Parolni o'zgartirish</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              <FaLock style={{ marginRight: '8px' }} />
              Joriy parol
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1em'
              }}
              placeholder="Joriy parolingizni kiriting"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              <FaLock style={{ marginRight: '8px' }} />
              Yangi parol
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1em'
              }}
              placeholder="Yangi parolni kiriting"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              <FaLock style={{ marginRight: '8px' }} />
              Yangi parolni tasdiqlash
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1em'
              }}
              placeholder="Yangi parolni qayta kiriting"
            />
          </div>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            background: '#fff3f3',
            color: '#dc3545',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '0.9em'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '12px',
            background: '#f0fff0',
            color: '#28a745',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '0.9em'
          }}>
            {success}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#1a3a6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1em',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#142d54'}
          onMouseLeave={(e) => e.target.style.background = '#1a3a6b'}
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings; 