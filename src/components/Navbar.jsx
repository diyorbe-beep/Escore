import React from 'react';
import UserProfile from './UserProfile';
import imgs from '../assets/index'

const Navbar = ({ onNavigate, isAdmin, isJournalist, user, onLogout, currentPage }) => (
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
                className="nav-auth-btn"
              >
                Tizimga kirish
              </button>
              <button
                onClick={() => onNavigate('register')}
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
        <button onClick={() => onNavigate('home')} className={`nav-btn${currentPage === 'home' ? ' active' : ''}`}>Asosiy</button>
        <button onClick={() => onNavigate('newslist')} className={`nav-btn${currentPage === 'newslist' ? ' active' : ''}`}>Yangiliklar</button>
        <button onClick={() => onNavigate('livescore')} className={`nav-btn${currentPage === 'livescore' ? ' active' : ''}`}>Jonli Natijalar</button>
        <button onClick={() => onNavigate('poll')} className={`nav-btn${currentPage === 'poll' ? ' active' : ''}`}>So'rovnoma</button>
        {isAdmin && (
          <button onClick={() => onNavigate('admin')} className={`nav-btn${currentPage === 'admin' ? ' active' : ''}`}>Admin Boshqaruvi</button>
        )}
        {isJournalist && (
          <button onClick={() => onNavigate('journalist')} className={`nav-btn${currentPage === 'journalist' ? ' active' : ''}`}>Jurnalist Paneli</button>
        )}
      </div>
    </nav>
  </header>
);

export default Navbar; 