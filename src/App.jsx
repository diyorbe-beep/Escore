import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import NewsDetailPage from './pages/NewsDetailPage'
import LiveScore from './components/LiveScore'
import Poll from './components/Poll'
import AdminPanel from './components/AdminPanel'
import Login from './pages/Login'
import Register from './pages/Register'
import JournalistPanel from './components/JournalistPanel'
import ProfileSettings from './components/ProfileSettings'
import Calendar from './components/Calendar';
import UpcomingMatches from './components/UpcomingMatches';
import FeaturedMatch from './components/FeaturedMatch';
import TopLeagues from './components/TopLeagues'
import Advertisement from './components/advertisement'

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [page, setPage] = useState('home')
  const [showAuth, setShowAuth] = useState(false)
  const [authPage, setAuthPage] = useState('login')
  const [currentNewsId, setCurrentNewsId] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  // Back stack for navigation
  const [pageStack, setPageStack] = useState([]);
  const [search, setSearch] = useState('');

  // Page titles
  const pageTitles = {
    home: 'Bosh sahifa',
    newslist: 'Yangiliklar',
    newsdetail: 'Yangilik tafsiloti',
    livescore: 'Live Score',
    poll: "So'rovnoma",
    admin: 'Admin Panel',
    journalist: 'Jurnalist Paneli',
    settings: 'Profil sozlamalari',
    login: 'Kirish',
    register: "Ro'yxatdan o'tish"
  };

  const handleNavigate = (newPage, newsData = null) => {
    if (newPage === 'login' || newPage === 'register') {
      setShowAuth(true)
      setAuthPage(newPage)
    } else if (newPage === 'newsdetail' && newsData) {
      setPageStack(stack => [...stack, page]);
      setPage(newPage)
      setSelectedNews(newsData)
      setShowAuth(false)
    } else {
      setPageStack(stack => [...stack, page]);
      setPage(newPage)
      setShowAuth(false)
    }
  }

  const handleBack = () => {
    setPageStack(stack => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setPage(prev);
      return stack.slice(0, -1);
    });
  };

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setPage('home')
    setShowAuth(false)
  }

  const handleProfileUpdate = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  }

  useEffect(() => {
    // Har bir user o'zgarganda localStorage ga yozamiz
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    setSearch('');
  }, [page]);

  // Agar auth sahifasi ochiq bo'lsa
  if (showAuth) {
    return (
      <>
        <div className='pages_name' style={{maxWidth:900,margin:'20px auto',padding:'12px 0 12px 0',display:'flex',alignItems:'center',gap:16}}>
          {pageStack.length > 0 && (
            <button onClick={() => {
              setShowAuth(false);
              setPageStack(stack => {
                if (stack.length === 0) return stack;
                const prev = stack[stack.length - 1];
                setPage(prev);
                return stack.slice(0, -1);
              });
            }} style={{
              padding:'8px 24px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(90deg, #1a3a6b 0%, #3a7bd5 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1em',
              boxShadow: '0 2px 8px rgba(26,58,107,0.08)',
              cursor:'pointer',
              transition: 'background 0.2s',
              outline: 'none',
              marginBottom: 8
            }}>&larr; Orqaga</button>
          )}
        </div>
        {authPage === 'login' && (
          <Login onLogin={u => {
            if (u === 'register') {
              setAuthPage('register')
            } else if (u) {
              setUser(u)
              localStorage.setItem('user', JSON.stringify(u));
              setShowAuth(false)
            }
          }} />
        )}
        {authPage === 'register' && (
          <Register 
            onRegister={u => {
              if (u === 'login') {
                setAuthPage('login')
              } else if (u) {
                setUser(u)
                localStorage.setItem('user', JSON.stringify(u));
                setShowAuth(false)
              }
            }}
            onLogin={u => {
              if (u) {
                setUser(u);
                localStorage.setItem('user', JSON.stringify(u));
                setShowAuth(false);
              }
            }}
          />
        )}
      </>
    );
  }

  let content
  switch (page) {
    case 'home':
      content = <Layout><Home search={search} /></Layout>
      break
    case 'newslist':
      content = <Layout><NewsList onNavigate={handleNavigate} search={search} /></Layout>
      break
    case 'newsdetail':
      content = (
        <Layout><NewsDetail news={selectedNews} /></Layout>
      )
      break
    case 'livescore':
      content = <Layout><LiveScore /></Layout>
      break
    case 'poll':
      content = <Layout><Poll /></Layout>
      break
    case 'admin':
      content = (user?.role === 'admin' || user?.role === 'superadmin') ? <Layout><AdminPanel userRole={user?.role} /> </Layout> : <Layout><h2>Ruxsat berilmagan</h2></Layout>
      break
    case 'journalist':
      content = user?.role === 'journalist' ? <Layout><JournalistPanel journalistName={user?.name || 'Jurnalist'} /></Layout> : <Layout><h2>Ruxsat berilmagan</h2></Layout>
      break
    case 'settings':
      content = user ? (
        <Layout>
          <ProfileSettings user={user} onSave={handleProfileUpdate} />
        </Layout>
      ) : (
        <Layout><h2>Ruxsat berilmagan</h2></Layout>
      )
      break
    default:
      content = <Layout><Home /></Layout>
  }

  return (
    <>
      <Navbar
        onNavigate={handleNavigate}
        isAdmin={user?.role === 'admin'}
        isJournalist={user?.role === 'journalist'}
        user={user}
        onLogout={handleLogout}
        currentPage={page}
        search={search}
        setSearch={setSearch}
      />
      {search.trim() ? (
        <Layout>
          <NewsList search={search} />
        </Layout>
      ) : (
        <>
          <FeaturedMatch />
          <UpcomingMatches />
          <Calendar />
          <Advertisement />
          <TopLeagues />
          {content}
        </>
      )}
    </>
  )
}

export default App
