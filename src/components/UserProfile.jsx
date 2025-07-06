import React, { useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserProfile = ({ user, onLogout, onNavigate }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSettingsClick = () => {
    setShowDropdown(false);
    onNavigate && onNavigate('settings');
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout && onLogout();
  };

  return (
    <div className="user-profile" style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          color: '#1a3a6b',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1a3a6b'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
      >
        <div style={{
          background: '#1a3a6b',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <FaUser size={16} />
        </div>
        <span style={{ fontWeight: 500 }}>{user.name || 'Foydalanuvchi'}</span>
      </button>

      {showDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '8px 0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000,
            minWidth: '180px',
          }}
        >
          <button
            onClick={handleSettingsClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              width: '100%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#1a3a6b',
              transition: 'background 0.2s ease',
              fontSize: '0.95em',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <FaCog /> Profil sozlamalari
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              width: '100%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#dc3545',
              transition: 'background 0.2s ease',
              fontSize: '0.95em',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <FaSignOutAlt /> Tizimdan chiqish
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 