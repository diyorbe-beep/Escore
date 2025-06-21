import React, { useState } from 'react'
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

const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('home')
  const [showAuth, setShowAuth] = useState(false)
  const [authPage, setAuthPage] = useState('login')
  const [currentNewsId, setCurrentNewsId] = useState(null)

  const handleNavigate = (newPage, newsId = null) => {
    if (newPage === 'login' || newPage === 'register') {
      setShowAuth(true)
      setAuthPage(newPage)
    } else if (newPage === 'newsdetail' && newsId) {
      setPage(newPage)
      setCurrentNewsId(newsId)
      setShowAuth(false)
    } else {
      setPage(newPage)
      setShowAuth(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setPage('home')
    setShowAuth(false)
  }

  const handleProfileUpdate = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  }

  // Agar auth sahifasi ochiq bo'lsa
  if (showAuth) {
    if (authPage === 'login') {
      return <Login onLogin={u => {
        if (u === 'register') {
          setAuthPage('register')
        } else {
          setUser(u)
          setShowAuth(false)
        }
      }} />
    }
    if (authPage === 'register') {
      return <Register onRegister={u => {
        if (u === 'login') {
          setAuthPage('login')
        } else {
          setUser(u)
          setShowAuth(false)
        }
      }} />
    }
  }

  let content
  switch (page) {
    case 'home':
      content = <Layout><Home /></Layout>
      break
    case 'newslist':
      content = <Layout><NewsList onNavigate={handleNavigate} /></Layout>
      break
    case 'newsdetail':
      content = currentNewsId ? (
        <Layout><NewsDetailPage newsId={currentNewsId} /></Layout>
      ) : (
        <Layout><NewsDetail /></Layout>
      )
      break
    case 'livescore':
      content = <Layout><LiveScore /></Layout>
      break
    case 'poll':
      content = <Layout><Poll /></Layout>
      break
    case 'admin':
      content = user?.role === 'admin' ? <Layout><AdminPanel /></Layout> : <Layout><h2>Ruxsat berilmagan</h2></Layout>
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
      />
      {content}
    </>
  )
}

export default App
