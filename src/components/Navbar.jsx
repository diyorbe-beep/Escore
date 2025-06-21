import React from 'react';
import UserProfile from './UserProfile';
import imgs from '../assets/index'

const Navbar = ({ onNavigate, isAdmin, isJournalist, user, onLogout }) => (
  <header>
    <div className="wrapper">
      <div className='nav_top'>
        <div className="nav_logo">
          <h2>Escore</h2>
          <div className="nav_inputs">
            <>
              {/* From Uiverse.io by satyamchaudharydev */}
              <form className="form">
                <button>
                  <svg
                    width={17}
                    height={16}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                  >
                    <path
                      d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <input
                  className="input"
                  placeholder="Type your text"
                  required=""
                  type="text"
                />
                <button className="reset" type="reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            </>

          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {user ? (
            <UserProfile user={user} onLogout={onLogout} onNavigate={onNavigate} />
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                style={{
                  background: 'none',
                  border: '1px solid #007bff',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#007bff',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#007bff';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#007bff';
                }}
              >
                Tizimga kirish
              </button>
              <button
                onClick={() => onNavigate('register')}
                style={{
                  background: '#007bff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
              >
                Ro'yxatdan o'tish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: '#f7f3ec',
      borderBottom: '1px solid #e0e0e0',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.1em',
      marginBottom: '24px',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '32px', textAlign: 'center', justifyContent: 'center' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Asosiy</button>
        <button onClick={() => onNavigate('newslist')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Yangiliklar</button>
        <button onClick={() => onNavigate('newsdetail')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Yangilik Haqida</button>
        <button onClick={() => onNavigate('livescore')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Jonli Natijalar</button>
        <button onClick={() => onNavigate('poll')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>So'rovnoma</button>
        {isAdmin && (
          <button onClick={() => onNavigate('admin')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Admin Boshqaruvi</button>
        )}
        {isJournalist && (
          <button onClick={() => onNavigate('journalist')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Jurnalist Paneli</button>
        )}
      </div>
    </nav>
  </header>
);

export default Navbar; 