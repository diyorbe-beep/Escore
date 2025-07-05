import React from 'react';
import UserProfile from './UserProfile';
import imgs from '../assets/index';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAdmin, isJournalist, user, onLogout, search, setSearch, onNavigate }) => {
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
            <h2>Escore</h2>
            <div className="nav_inputs">
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
            {user ? (
              <UserProfile user={user} onLogout={onLogout} />
            ) : (
              <>
                <button
                  onClick={goLogin}
                  className="nav-auth-btn"
                >
                  Tizimga kirish
                </button>
                <button
                  onClick={goRegister}
                  className="nav-auth-btn primary"
                >
                  Ro'yxatdan o'tish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
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
    </header>
  );
};

export default Navbar;