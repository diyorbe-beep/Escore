import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
import AvsB from './components/AvsB'
import LeagueInfoPage from '../pages/league-info/page'
import TeamInfoPage from '../pages/team-info/page'
import PlayerInfoPage from '../pages/player-info/page'
import CoachInfoPage from '../pages/coach-info/page'
import RefereeInfoPage from '../pages/referee-info/page'
import MatchDetailsPage from '../pages/match-details/page'


const LoginWrapper = ({ setUser }) => {
  const navigate = useNavigate();
  return <Login onLogin={u => {
    if (u) {
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      // Adminni aniqlash va yo'naltirish
      if ((u.email === 'admin@mail.com' && u.password === 'admin123') || u.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }} />;
};

const RegisterWrapper = ({ setUser }) => {
  const navigate = useNavigate();
  return <Register onLogin={u => {
    if (u) {
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      navigate('/');
    }
  }} />;
};

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
          <LoginWrapper setUser={setUser} />
        )}
        {authPage === 'register' && (
          <RegisterWrapper setUser={setUser} />
        )}
      </>
    );
  }

  let content
  switch (page) {
    case 'home':
      content = <Layout><Home search={search} onNavigate={handleNavigate} /></Layout>
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

  const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const isLiveRoute = location.pathname === '/livescore' || location.pathname === '/live-scores';
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
    const hideSidebars = isAuthRoute;

    return (
      <Layout
        user={user}
        onLogout={handleLogout}
        search={search}
        setSearch={setSearch}
        hideSidebars={hideSidebars}
        leftSidebarContent={isLiveRoute ? <FeatureLeagueNavigator /> : undefined}
        rightSidebarContent={isLiveRoute ? <FeatureRightPanel /> : undefined}
        contentWide={isLiveRoute}
      >
        {children}
      </Layout>
    );
  };

  return (
    <Router>
      {page !== 'home' && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          search={search}
          setSearch={setSearch}
          onNavigate={handleNavigate}
        />
      )}
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/admin" element={<AdminPanel userRole={user?.role} />} />
          <Route path="/livescore" element={<LiveScore />} />
          <Route path="/live-scores" element={<LiveScore />} />
          <Route path="/poll" element={<Poll />} />
          <Route path="/journalist" element={<JournalistPanel />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/AvsB" element={<AvsB />} />
          <Route path="/login" element={<LoginWrapper setUser={setUser} />} />
          <Route path="/register" element={<RegisterWrapper setUser={setUser} />} />
          <Route path="/league-info/:leagueId" element={<LeagueInfoPage />} />
          <Route path="/team-info/:teamId" element={<TeamInfoPage />} />
          <Route path="/player-info/:playerId" element={<PlayerInfoPage />} />
          <Route path="/coach-info/:coachId" element={<CoachInfoPage />} />
          <Route path="/referee-info/:refereeId" element={<RefereeInfoPage />} />
          <Route path="/match-details/:matchId" element={<MatchDetailsPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  )
}

export default App
