import React, { useState, useEffect } from 'react';
import { newsApi, adminApi, pollApi } from '../services/ApiService';
import axios from 'axios';
import logoDefault from '../assets/logo.png';

const AdminPanel = ({ userRole = 'admin' }) => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Draft');
  const [error, setError] = useState('');
  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminError, setAdminError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminRole, setAdminRole] = useState('admin');
  const [superadminToken, setSuperadminToken] = useState('');
  const [polls, setPolls] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollError, setPollError] = useState('');
  const [pollLoading, setPollLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [newsCategory, setNewsCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [featuredMsg, setFeaturedMsg] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const teamList = [
    'Real Madrid', 'Barcelona', 'Manchester United', 'Liverpool', 'Bayern Munich', 'Juventus', 'Chelsea', 'Arsenal', 'PSG', 'Inter', 'Milan', 'Atletico Madrid', 'Dortmund', 'Tottenham', 'Roma', 'Napoli', 'Ajax', 'Porto', 'Benfica', 'Sevilla', 'Leipzig', 'Leicester City', 'Shakhtar Donetsk', 'Galatasaray', 'Fenerbahce', 'Besiktas'
  ];
  const teamLogos = {
    'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_München_logo_%282017%29.svg',
    'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg',
    'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    'PSG': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    'Inter': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    'Milan': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    'Atletico Madrid': 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
    'Dortmund': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    'Tottenham': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
    'Roma': 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg',
    'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli.svg',
    'Ajax': 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
    'Porto': 'https://upload.wikimedia.org/wikipedia/en/3/3f/FC_Porto.svg',
    'Benfica': 'https://upload.wikimedia.org/wikipedia/en/8/89/SL_Benfica_logo.svg',
    'Sevilla': 'https://upload.wikimedia.org/wikipedia/en/3/3c/Sevilla_FC_logo.svg',
    'Leipzig': 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
    'Leicester City': 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg',
    'Shakhtar Donetsk': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/FC_Shakhtar_Donetsk.svg',
    'Galatasaray': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Galatasaray_Sports_Club_Logo.png',
    'Fenerbahce': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Fenerbahçe_SK.svg',
    'Besiktas': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Besiktas_JK.svg',
  };
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [editFeatured, setEditFeatured] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const leagueList = [
    'La Liga',
    'UEFA Champions League',
    'Premier League',
    'Serie A',
    'Bundesliga',
    'Ligue 1',
    'Europa League',
    'Super Lig',
    'Eredivisie',
    'Primeira Liga',
    'UCL',
    'Jahon chempionati',
    'Boshqa'
  ];
  const [matchLeague, setMatchLeague] = useState('');

  // Load news and admins from backend
  useEffect(() => {
    loadNews();
    adminApi.getAll().then(setAdmins);
    pollApi.getAll().then(setPolls);
    loadCategories();
    loadFeaturedMatches();
  }, []);

  const loadFeaturedMatches = () => {
    axios.get('/api/featured-match').then(res => {
      setFeaturedMatches(Array.isArray(res.data) ? res.data : []);
    }).catch(err => {
      console.error('Featured matches yuklashda xatolik:', err);
      setFeaturedMatches([]);
    });
  };

  const loadNews = () => {
    newsApi.getAll().then(data => {
      setNews((data || []).filter(n => !n.deleted));
    });
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (e) {
      setCategories([]);
    }
  };

  const handleAdd = async e => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title va to\'liq matn majburiy');
      return;
    }
    setLoading(true);
    let imageUrl = null;
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const res = await fetch('https://football-new-backend-end.onrender.com/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        imageUrl = data.url;
      } catch (err) {
        setError('Rasm yuklashda xatolik');
        setLoading(false);
        return;
      }
    }
    const newNews = {
      title,
      content,
      image: imageUrl,
      status,
      category: newsCategory,
      isFeatured,
    };
    await newsApi.create(newNews);
    setTitle('');
    setContent('');
    setImage(null);
    setStatus('Draft');
    setError('');
    setLoading(false);
    loadNews();
  };

  const handleDelete = async id => {
    await newsApi.delete(id);
    loadNews();
  };

  const handleAddAdmin = async e => {
    e.preventDefault();
    if (!adminName || !adminEmail) {
      setAdminError('Ism va email majburiy');
      return;
    }
    if (!superadminToken) {
      setAdminError('Superadmin paroli majburiy');
      return;
    }
    const created = await adminApi.create({ name: adminName, email: adminEmail, role: adminRole, superadminToken });
    if (created.error) {
      setAdminError(created.error);
      return;
    }
    setAdmins([...admins, created]);
    setAdminName('');
    setAdminEmail('');
    setAdminRole('admin');
    setSuperadminToken('');
    setAdminError('');
  };

  const handleRemoveAdmin = async id => {
    await adminApi.delete(id);
    setAdmins(admins.filter(a => a.id !== id || a.role === 'superadmin'));
  };

  const loadPolls = () => {
    pollApi.getAll().then(setPolls);
  };

  const handleRemovePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newOpts = pollOptions.filter((_, idx) => idx !== index);
      setPollOptions(newOpts);
    }
  };

  const handleAddPoll = async e => {
    e.preventDefault();
    if (!pollQuestion || pollOptions.filter(opt => opt.trim()).length < 2) {
      setPollError('Savol va kamida 2 ta variant majburiy');
      return;
    }
    setPollLoading(true);
    try {
      const options = pollOptions.map(opt => opt.trim()).filter(Boolean);
      const created = await pollApi.create({ question: pollQuestion, options, role: userRole });
      if (created.error) {
        setPollError(created.error);
        return;
      }
      setPolls([created, ...polls]);
      setPollQuestion('');
      setPollOptions(['', '']);
      setPollError('');
    } catch (err) {
      setPollError('So\'rovnoma qo\'shishda xatolik yuz berdi');
    } finally {
      setPollLoading(false);
    }
  };

  const handleDeletePoll = async (id) => {
    try {
      await axios.delete(`/api/polls/${id}?role=${userRole}&superadminToken=${superadminToken}`);
      setPolls(polls.filter(p => p.id !== id));
    } catch (err) {
      setPollError("O'chirishda xatolik");
    }
  };

  const handleAddCategory = async e => {
    e.preventDefault();
    if (!categoryName || !superadminToken) {
      setCategoryError('Kategoriya nomi va superadmin paroli majburiy');
      return;
    }
    try {
      const res = await axios.post('/api/categories', { name: categoryName, superadminToken });
      setCategories([...categories, res.data]);
      setCategoryName('');
      setSuperadminToken('');
      setCategoryError('');
    } catch (err) {
      setCategoryError(err.response?.data?.error || 'Xatolik');
    }
  };

  const handleDeleteCategory = async (id, token) => {
    try {
      await axios.delete(`/api/categories/${id}?superadminToken=${token}`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      setCategoryError("O'chirishda xatolik");
    }
  };

  const handleEdit = (news) => {
    setEditId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setImage(null); // eski rasmni o'zgartirmaslik uchun
    setStatus(news.status);
    setNewsCategory(news.category || '');
    setIsFeatured(!!news.isFeatured);
  };

  const handleSave = async e => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = null;
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const res = await fetch('https://football-new-backend-end.onrender.com/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        imageUrl = data.url;
      } catch (err) {
        setError('Rasm yuklashda xatolik');
        setLoading(false);
        return;
      }
    }
    const updatedNews = {
      title,
      content,
      image: imageUrl || undefined,
      status,
      category: newsCategory,
      isFeatured,
    };
    await newsApi.update(editId, updatedNews);
    setEditId(null);
    setTitle('');
    setContent('');
    setImage(null);
    setStatus('Draft');
    setNewsCategory('');
    setError('');
    setLoading(false);
    loadNews();
  };

  // Helper to format date
  const formatNewsDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddFeaturedMatch = async e => {
    e.preventDefault();
    if (!homeTeam || !awayTeam || !matchTime || !matchDate || !matchLeague) {
      setFeaturedMsg('Barcha maydonlar majburiy');
      return;
    }
    if (homeTeam === awayTeam) {
      setFeaturedMsg('Uy va mehmon jamoalari bir xil bo\'lishi mumkin emas');
      return;
    }
    setFeaturedLoading(true);
    try {
      await axios.post('/api/featured-match', {
        home: homeTeam,
        away: awayTeam,
        time: matchTime,
        date: matchDate,
        league: matchLeague
      });
      setFeaturedMsg("Featured match qo'shildi!");
      setHomeTeam('');
      setAwayTeam('');
      setMatchTime('');
      setMatchDate('');
      setMatchLeague('');
      // Featured matches ro'yxatini yangilash
      loadFeaturedMatches();
    } catch (err) {
      setFeaturedMsg('Xatolik: ' + (err.response?.data?.error || ''));
    } finally {
      setFeaturedLoading(false);
    }
  };

  const handleEditFeatured = (m) => {
    setHomeTeam(m.home.name);
    setAwayTeam(m.away.name);
    setMatchTime(m.time);
    setMatchDate(m.date);
    setMatchLeague(m.league);
    setEditFeatured(m.id);
  };

  const handleSaveFeatured = async e => {
    e.preventDefault();
    if (homeTeam === awayTeam) {
      setFeaturedMsg('Uy va mehmon jamoalari bir xil bo\'lishi mumkin emas');
      return;
    }
    setFeaturedLoading(true);
    try {
      await axios.put(`/api/featured-match/${editFeatured}`, {
        home: homeTeam,
        away: awayTeam,
        time: matchTime,
        date: matchDate,
        league: matchLeague
      });
      setFeaturedMsg('Featured match yangilandi!');
      setEditFeatured(false);
      setHomeTeam(''); setAwayTeam(''); setMatchTime(''); setMatchDate(''); setMatchLeague('');
      // Featured matches ro'yxatini yangilash
      loadFeaturedMatches();
    } catch (err) {
      setFeaturedMsg('Xatolik: ' + (err.response?.data?.error || ''));
    } finally {
      setFeaturedLoading(false);
    }
  };

  const handleDeleteFeatured = async (id) => {
    setFeaturedLoading(true);
    try {
      await axios.delete(`/api/featured-match/${id}`);
      setFeaturedMsg("Featured match o'chirildi!");
      setEditFeatured(false);
      setHomeTeam(''); setAwayTeam(''); setMatchTime(''); setMatchDate(''); setMatchLeague('');
      // Featured matches ro'yxatini yangilash
      loadFeaturedMatches();
    } catch (err) {
      setFeaturedMsg('O\'chirishda xatolik: ' + (err.response?.data?.error || ''));
    } finally {
      setFeaturedLoading(false);
    }
  };

  function truncateText(text, maxLength = 200) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  return (
    <div className="block" style={{padding: '32px', background: '#fff', maxWidth: 700, margin: '0 auto'}}>
      <h1 style={{marginBottom: '0.5em'}}>Admin Panel</h1>
      {userRole === 'superadmin' && (
        <section style={{margin: '24px 0', border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Admin/Jurnalist qo'shish</h2>
          <form onSubmit={handleAddAdmin} style={{marginBottom: 16, display:'flex', flexWrap:'wrap', gap:8, alignItems:'center'}}>
            <input type="text" placeholder="Ism" value={adminName} onChange={e => setAdminName(e.target.value)} style={{padding: 8, flex:1, minWidth:120}} />
            <input type="email" placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} style={{padding: 8, flex:1, minWidth:180}} />
            <select value={adminRole} onChange={e => setAdminRole(e.target.value)} style={{padding:8, minWidth:120}}>
              <option value="admin">Admin</option>
              <option value="journalist">Jurnalist</option>
            </select>
            <input type="password" placeholder="Superadmin paroli" value={superadminToken} onChange={e => setSuperadminToken(e.target.value)} style={{padding:8, minWidth:160}} />
            <button type="submit" style={{padding: '8px 16px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4}}>Qo'shish</button>
          </form>
          {adminError && <div style={{color: 'red', marginBottom: 8}}>{adminError}</div>}
          <ul style={{listStyle: 'none', padding: 0}}>
            {admins.map(a => (
              <li key={a.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0'}}>
                <span><b>{a.name}</b> ({a.email}) <span style={{color:'#888'}}>{a.role === 'superadmin' ? 'Asosiy admin' : 'Kichik admin'}</span></span>
                {a.role !== 'superadmin' && <button onClick={() => handleRemoveAdmin(a.id)} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '4px 10px', cursor: 'pointer'}}>O'chirish</button>}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section style={{margin: '24px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Yangilik qo'shish</h2>
        <form onSubmit={editId ? handleSave : handleAdd} style={{
          marginBottom: 24,
          background: '#f7f9fc',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(26,58,107,0.06)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          border: '1.5px solid #e0e0e0'
        }}>
          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <input className='admin-form-input' type="text" placeholder="Sarlavha" value={title} onChange={e => setTitle(e.target.value)} style={{flex:2, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontSize: '1.1em', fontFamily: 'Poppins, Arial, sans-serif'}} />
            <select value={status} onChange={e => setStatus(e.target.value)} style={{flex:1, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1.1em'}}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
            <select value={newsCategory} onChange={e => setNewsCategory(e.target.value)} style={{flex:1, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1.1em'}}>
              <option value="">Kategoriya tanlang</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <label style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#eaf0fa', color:'#1a3a6b', borderRadius:6, border:'1.5px solid #b5c7e6', padding:'10px 0', fontWeight:600, fontFamily:'Poppins, Arial, sans-serif', cursor:'pointer', transition:'background 0.2s'}}>
              <span style={{pointerEvents:'none'}}>Rasm tanlash</span>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{display:'none'}} />
            </label>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
              <label htmlFor="isFeatured" style={{fontSize:'1em', color:'#1a3a6b', fontWeight:600, cursor:'pointer'}}>Kun yangiligi</label>
            </div>
          </div>
          <textarea placeholder="To'liq matn" value={content} onChange={e => setContent(e.target.value)} style={{width: '100%', minHeight: 100, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontSize: '1.08em', fontFamily: 'Poppins, Arial, sans-serif', resize:'vertical'}} />
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 28px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.08em', boxShadow:'0 2px 8px rgba(26,58,107,0.08)', marginTop: 0}} disabled={loading}>{editId ? 'Saqlash' : 'Qo\'shish'}</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setTitle(''); setContent(''); setImage(null); setStatus('Draft'); setNewsCategory(''); setError(''); }} style={{background:'#fff', color:'#1a3a6b', border:'1.5px solid #1a3a6b', borderRadius:6, padding:'12px 18px', marginLeft:8}}>Bekor qilish</button>}
          </div>
        </form>
        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Yangiliklar ro'yxati</h2>
        <ul style={{fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', padding: 0, listStyle: 'none'}}>
          {news.map(n => (
            <li key={n.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', padding: '10px 0'}}>
              <span>
                <b>{n.title}</b> <span style={{color: '#888', fontSize: '0.95em'}}>({n.status})</span>
                <br />
                <span className="news-content-preview" style={{display:'block', maxWidth:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'pre-line', wordBreak:'break-word'}}>{truncateText(n.content, 200)}</span>
                {n.image && <div><img src={n.image} alt="news" style={{maxWidth: 120, marginTop: 6}} /></div>}
                <div style={{fontSize: '0.92em', color: '#888', marginTop: 2}}>
                  {n.publishedAt && <>Qo'yilgan vaqti: {formatNewsDate(n.publishedAt)}</>}
                </div>
              </span>
              <div style={{display:'flex', gap:8}}>
                <button onClick={() => handleEdit(n)} style={{background: '#fff', color: '#1a3a6b', border: '1.5px solid #1a3a6b', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Tahrirlash</button>
                <button onClick={() => handleDelete(n.id)} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>O'chirish</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section style={{margin: '24px 0', border: '1px solid #eee', borderRadius: 8, padding: 16}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>So'rovnomalar</h2>
        <form onSubmit={handleAddPoll} style={{marginBottom: 16, display:'flex', flexDirection:'column', gap:12}}>
          <input type="text" placeholder="Savol" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} style={{padding:8, minWidth:180}} />
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div style={{fontSize:'0.9em', color:'#666', marginBottom:'4px'}}>Variantlar:</div>
            {pollOptions.map((opt, idx) => (
              <div key={idx} style={{display:'flex', gap:8, alignItems:'center'}}>
                <input 
                  type="text" 
                  placeholder={`Variant ${idx+1}`} 
                  value={opt} 
                  onChange={e => {
                    const newOpts = [...pollOptions];
                    newOpts[idx] = e.target.value;
                    setPollOptions(newOpts);
                  }} 
                  style={{padding:8, minWidth:200, flex:1}} 
                />
                {pollOptions.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemovePollOption(idx)}
                    style={{
                      padding:'6px 10px',
                      background:'#dc3545',
                      color:'#fff',
                      border:'none',
                      borderRadius:4,
                      cursor:'pointer',
                      fontSize:'0.8em'
                    }}
                  >
                    O'chirish
                  </button>
                )}
              </div>
            ))}
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button 
              type="button" 
              onClick={() => setPollOptions([...pollOptions, ''])} 
              style={{
                padding:'8px 12px',
                background:'#28a745',
                color:'#fff',
                border:'none',
                borderRadius:4,
                cursor:'pointer'
              }}
            >
              + Variant qo'shish
            </button>
            <button 
              type="submit" 
              disabled={pollLoading}
              style={{
                padding:'8px 16px', 
                background: pollLoading ? '#ccc' : '#1a3a6b', 
                color:'#fff', 
                border:'none', 
                borderRadius:4,
                cursor: pollLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {pollLoading ? 'Qo\'shilmoqda...' : 'So\'rovnoma qo\'shish'}
            </button>
          </div>
        </form>
        {pollError && (
          <div style={{
            padding: '8px 12px',
            marginBottom: 8,
            borderRadius: 4,
            fontSize: '0.9em',
            fontWeight: '500',
            background: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb'
          }}>
            {pollError}
            <button 
              onClick={() => setPollError('')}
              style={{
                float: 'right',
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
        <div style={{marginTop: '16px'}}>
          <h3 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b', fontSize: '1.1em', marginBottom: '12px'}}>Mavjud so'rovnomalar:</h3>
          {polls.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px', color: '#888', fontStyle: 'italic'}}>
              Hali so'rovnoma qo'shilmagan
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {polls.map(poll => (
                <div key={poll.id} style={{
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: 8,
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <h4 style={{margin: 0, fontSize: '1em', color: '#1a3a6b'}}>{poll.question}</h4>
                    <button 
                      onClick={() => handleDeletePoll(poll.id)} 
                      style={{
                        background: '#fff', 
                        color: '#dc3545', 
                        border: '1px solid #dc3545', 
                        borderRadius: 4, 
                        padding: '6px 12px', 
                        cursor: 'pointer',
                        fontSize: '0.8em'
                      }}
                    >
                      O'chirish
                    </button>
                  </div>
                  <div style={{fontSize: '0.9em', color: '#666'}}>
                    <strong>Variantlar:</strong>
                    <ul style={{margin: '4px 0', paddingLeft: '20px'}}>
                      {Object.keys(poll.votes || {}).map((option, idx) => (
                        <li key={idx} style={{marginBottom: '2px'}}>
                          {option} - {poll.votes[option] || 0} ovoz
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {userRole === 'superadmin' && (
        <section style={{margin: '24px 0', border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Kategoriya qo'shish</h2>
          <form onSubmit={handleAddCategory} style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
            <input type="text" placeholder="Kategoriya nomi" value={categoryName} onChange={e => setCategoryName(e.target.value)} style={{padding:8, minWidth:160}} />
            <input type="password" placeholder="Superadmin paroli" value={superadminToken} onChange={e => setSuperadminToken(e.target.value)} style={{padding:8, minWidth:160}} />
            <button type="submit" style={{padding:'8px 16px', background:'#1a3a6b', color:'#fff', border:'none', borderRadius:4}}>Qo'shish</button>
          </form>
          {categoryError && <div style={{color:'red', marginBottom:8}}>{categoryError}</div>}
          <ul style={{listStyle:'none', padding:0}}>
            {(Array.isArray(categories) ? categories : []).map(cat => (
              <li key={cat.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #eee', padding:'8px 0'}}>
                <span>{cat.name}</span>
                <button
                  onClick={() => {
                    const token = prompt("Superadmin parolini kiriting:");
                    if (token) handleDeleteCategory(cat.id, token);
                  }}
                  style={{background:'#fff', color:'#c00', border:'1px solid #c00', borderRadius:4, padding:'4px 10px', cursor:'pointer'}}
                >
                  O'chirish
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {(userRole === 'superadmin' || userRole === 'admin' || userRole === 'journalist') && (
        <section style={{margin: '24px 0', border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b', margin: 0}}>Featured Match boshqaruvi</h2>
            <button 
              onClick={loadFeaturedMatches}
              style={{
                padding: '6px 12px',
                background: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                fontSize: '0.8em',
                cursor: 'pointer'
              }}
            >
              Yangilash
            </button>
          </div>
          {featuredMatches.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px', color: '#888', fontStyle: 'italic'}}>
              Hali featured match qo'shilmagan
            </div>
          ) : (
            <div style={{marginBottom: '20px'}}>
              {featuredMatches.map(m => (
                <div key={m.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: 8,
                  border: '1px solid #e9ecef'
                }}>
                  <img src={m.home.logo || logoDefault} alt={m.home.name} style={{width: 32, height: 32, objectFit: 'contain'}} />
                  <b style={{minWidth: 120, fontSize: '0.9em'}}>{m.home.name}</b>
                  <span style={{color: '#666', fontWeight: 'bold'}}>vs</span>
                  <img src={m.away.logo || logoDefault} alt={m.away.name} style={{width: 32, height: 32, objectFit: 'contain'}} />
                  <b style={{minWidth: 120, fontSize: '0.9em'}}>{m.away.name}</b>
                  <span style={{color: '#1a3a6b', fontSize: '0.85em', fontWeight: '600'}}>{m.league}</span>
                  <span style={{color: '#666', fontSize: '0.85em'}}>{m.date} {m.time}</span>
                  {m.createdAt && (
                    <span style={{color: '#999', fontSize: '0.75em'}}>
                      Qo'shilgan: {new Date(m.createdAt).toLocaleDateString('uz-UZ')}
                    </span>
                  )}
                  <div style={{marginLeft: 'auto', display: 'flex', gap: 8}}>
                    <button 
                      onClick={() => handleEditFeatured(m)} 
                      style={{
                        padding: '6px 12px',
                        background: '#1a3a6b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: '0.8em',
                        cursor: 'pointer'
                      }}
                    >
                      Tahrirlash
                    </button>
                    <button 
                      onClick={() => handleDeleteFeatured(m.id)} 
                      style={{
                        padding: '6px 12px',
                        background: '#fff',
                        color: '#dc3545',
                        border: '1px solid #dc3545',
                        borderRadius: 4,
                        fontSize: '0.8em',
                        cursor: 'pointer'
                      }}
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={editFeatured ? handleSaveFeatured : handleAddFeaturedMatch} style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: 8,
            border: '1px solid #e9ecef',
            marginBottom: 8
          }}>
            <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                <input 
                  list="teams" 
                  type="text" 
                  placeholder="Uy jamoasi" 
                  value={homeTeam} 
                  onChange={e => setHomeTeam(e.target.value)} 
                  style={{padding: 8, minWidth: 160, borderRadius: 4, border: '1px solid #ddd'}} 
                />
                {homeTeam && <img src={teamLogos[homeTeam] || logoDefault} alt={homeTeam} style={{width: 24, height: 24, objectFit: 'contain'}} />}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                <input 
                  list="teams" 
                  type="text" 
                  placeholder="Mehmon jamoasi" 
                  value={awayTeam} 
                  onChange={e => setAwayTeam(e.target.value)} 
                  style={{padding: 8, minWidth: 160, borderRadius: 4, border: '1px solid #ddd'}} 
                />
                {awayTeam && <img src={teamLogos[awayTeam] || logoDefault} alt={awayTeam} style={{width: 24, height: 24, objectFit: 'contain'}} />}
              </div>
              <datalist id="teams">
                {teamList.map(t => <option key={t} value={t} />)}
              </datalist>
              <div style={{fontSize: '0.8em', color: '#666', marginTop: '4px'}}>
                Mashhur jamoalar: Real Madrid, Barcelona, Manchester United, Liverpool, Bayern Munich, Juventus, Chelsea, Arsenal, PSG
              </div>
            </div>
            <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap'}}>
              <input 
                type="date" 
                placeholder="Sana" 
                value={matchDate} 
                onChange={e => setMatchDate(e.target.value)} 
                style={{padding: 8, minWidth: 120, borderRadius: 4, border: '1px solid #ddd'}} 
              />
              <input 
                type="time" 
                placeholder="Vaqt" 
                value={matchTime} 
                onChange={e => setMatchTime(e.target.value)} 
                style={{padding: 8, minWidth: 100, borderRadius: 4, border: '1px solid #ddd'}} 
              />
              <select 
                value={matchLeague} 
                onChange={e => setMatchLeague(e.target.value)} 
                style={{padding: 8, minWidth: 140, borderRadius: 4, border: '1px solid #ddd'}}
              >
                <option value="">Turnir tanlang</option>
                {leagueList.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
              <button 
                type="submit" 
                disabled={featuredLoading}
                style={{
                  padding: '8px 16px', 
                  background: featuredLoading ? '#ccc' : '#1a3a6b', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 4,
                  cursor: featuredLoading ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {featuredLoading ? 'Yuklanmoqda...' : (editFeatured ? 'Saqlash' : 'Qo\'shish')}
              </button>
              {editFeatured && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditFeatured(false); 
                    setHomeTeam(''); 
                    setAwayTeam(''); 
                    setMatchTime(''); 
                    setMatchDate(''); 
                    setMatchLeague('');
                    setFeaturedMsg('');
                  }}
                  style={{
                    padding: '8px 16px', 
                    background: '#fff', 
                    color: '#666', 
                    border: '1px solid #ddd', 
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Bekor qilish
                </button>
              )}
            </div>
          </form>
          {featuredMsg && (
            <div style={{
              padding: '8px 12px',
              marginBottom: 8,
              borderRadius: 4,
              fontSize: '0.9em',
              fontWeight: '500',
              ...(featuredMsg.includes('Xatolik') || featuredMsg.includes('O\'chirishda xatolik') ? {
                background: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
              } : {
                background: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb'
              })
            }}>
              {featuredMsg}
              <button 
                onClick={() => setFeaturedMsg('')}
                style={{
                  float: 'right',
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
        </section>
      )}
    </div>
  );
};

export default AdminPanel; 