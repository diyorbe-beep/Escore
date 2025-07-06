import React, { useState } from 'react';
import UserProfile from './UserProfile';
import imgs from '../assets/index';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAdmin, isJournalist, user, onLogout, search, setSearch, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const goLogin = () => {
    if (onNavigate) onNavigate('login');
    else navigate('/login');
  };
  const goRegister = () => {
    if (onNavigate) onNavigate('register');
    else navigate('/register');
  };
  return (
    <header>
      <div className="wrapper">
        <div className='nav_top'>
          <div className="nav_logo">
            <h2 style={{cursor:'pointer', margin:0, padding:0}} onClick={() => navigate('/')}>Escore</h2>
            <div className="nav_inputs hide-on-mobile">
              <form className="form" onSubmit={e => e.preventDefault()}>
                <button type="submit">
                  {/* ...search icon svg... */}
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
                  placeholder="Yangilik qidirish..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="text"
                />
                <button className="reset" type="reset" onClick={() => setSearch('')}>
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
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Hamburger icon for mobile */}
            {(!user) && (
              <button
                className="show-on-mobile-login"
                onClick={goLogin}
                style={{
                  display: 'none',
                  background: 'none',
                  border: '1px solid #1a3a6b',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  color: '#1a3a6b',
                  fontWeight: 600,
                  fontSize: '1em',
                  marginRight: '8px',
                  cursor: 'pointer',
                }}
              >
                Tizimga kirish
              </button>
            )}
            <button
              className="hamburger-menu-btn"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                marginLeft: '8px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            {user ? (
              <UserProfile user={user} onLogout={onLogout} onNavigate={onNavigate} />
            ) : (
              <>
                <button
                  onClick={goLogin}
                  className="nav-auth-btn hide-on-mobile"
                >
                  Tizimga kirish
                </button>
                <button
                  onClick={goRegister}
                  className="nav-auth-btn primary hide-on-mobile"
                >
                  Ro'yxatdan o'tish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Desktop nav */}
      <nav className="main-navbar">
        <div className="main-navbar-btns">
          <Link to="/" className="nav-btn">Asosiy</Link>
          <Link to="/news" className="nav-btn">Yangiliklar</Link>
          <Link to="/livescore" className="nav-btn">Jonli Natijalar</Link>
          <Link to="/poll" className="nav-btn">So'rovnoma</Link>
          {(user && (user.role === 'admin' || user.role === 'superadmin')) && (
            <Link to="/admin" className="nav-btn">Admin Boshqaruvi</Link>
          )}
          {isJournalist && (
            <Link to="/journalist" className="nav-btn">Jurnalist Paneli</Link>
          )}
        </div>
      </nav>
      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="mobile-navbar-menu" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-navbar-content" onClick={e => e.stopPropagation()}>
            <button
              className="close-mobile-menu"
              aria-label="Yopish"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: 28,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <div className="mobile-navbar-btns">
              <Link to="/" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Asosiy</Link>
              <Link to="/news" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Yangiliklar</Link>
              <Link to="/livescore" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Jonli Natijalar</Link>
              <Link to="/poll" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>So'rovnoma</Link>
              {(user && (user.role === 'admin' || user.role === 'superadmin')) && (
                <Link to="/admin" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Admin Boshqaruvi</Link>
              )}
              {isJournalist && (
                <Link to="/journalist" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Jurnalist Paneli</Link>
              )}
              <div style={{ marginTop: 24 }}>
                {user ? (
                  <UserProfile user={user} onLogout={onLogout} onNavigate={onNavigate} />
                ) : (
                  <>
                    <button
                      onClick={() => { goLogin(); setMobileMenuOpen(false); }}
                      className="nav-auth-btn hide-on-mobile"
                    >
                      Tizimga kirish
                    </button>
                    <button
                      onClick={() => { goRegister(); setMobileMenuOpen(false); }}
                      className="nav-auth-btn primary hide-on-mobile"
                    >
                      Ro'yxatdan o'tish
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;