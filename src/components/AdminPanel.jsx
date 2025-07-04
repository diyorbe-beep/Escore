import React, { useState, useEffect } from 'react';
import { newsApi, adminApi, pollApi } from '../services/ApiService';

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

  // Load news and admins from backend
  useEffect(() => {
    loadNews();
    adminApi.getAll().then(setAdmins);
    pollApi.getAll().then(setPolls);
  }, []);

  const loadNews = () => {
    newsApi.getAll().then(data => {
      setNews((data || []).filter(n => !n.deleted));
    });
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
        const res = await fetch('http://localhost:5000/api/upload', {
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

  const handleAddPoll = async e => {
    e.preventDefault();
    if (!pollQuestion || pollOptions.filter(opt => opt.trim()).length < 2) {
      setPollError('Savol va kamida 2 ta variant majburiy');
      return;
    }
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
        <form onSubmit={handleAdd} style={{
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
            <input type="text" placeholder="Sarlavha" value={title} onChange={e => setTitle(e.target.value)} style={{flex:2, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontSize: '1.1em', fontFamily: 'Poppins, Arial, sans-serif'}} />
            <select value={status} onChange={e => setStatus(e.target.value)} style={{flex:1, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1.1em'}}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
            <label style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#eaf0fa', color:'#1a3a6b', borderRadius:6, border:'1.5px solid #b5c7e6', padding:'10px 0', fontWeight:600, fontFamily:'Poppins, Arial, sans-serif', cursor:'pointer', transition:'background 0.2s'}}>
              <span style={{pointerEvents:'none'}}>Rasm tanlash</span>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{display:'none'}} />
            </label>
          </div>
          <textarea placeholder="To'liq matn" value={content} onChange={e => setContent(e.target.value)} style={{width: '100%', minHeight: 100, padding: 12, borderRadius: 6, border: '1.5px solid #d6d3c7', fontSize: '1.08em', fontFamily: 'Poppins, Arial, sans-serif', resize:'vertical'}} />
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 28px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.08em', boxShadow:'0 2px 8px rgba(26,58,107,0.08)', marginTop: 0}} disabled={loading}>Qo'shish</button>
            {loading && <span style={{color: '#1a3a6b'}}>Yuklanmoqda...</span>}
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
                <span style={{fontSize: '0.97em'}}>{n.content}</span>
                {n.image && <div><img src={n.image} alt="news" style={{maxWidth: 120, marginTop: 6}} /></div>}
                <div style={{fontSize: '0.92em', color: '#888', marginTop: 2}}>
                  {n.publishedAt && <>Qo'yilgan vaqti: {formatNewsDate(n.publishedAt)}</>}
                </div>
              </span>
              <button onClick={() => handleDelete(n.id)} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>O'chirish</button>
            </li>
          ))}
        </ul>
      </section>
      <section style={{margin: '24px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>So'rovnoma qo'shish</h2>
        <form onSubmit={handleAddPoll} style={{marginBottom: 16, background:'#f7f9fc', borderRadius:12, boxShadow:'0 2px 8px rgba(26,58,107,0.06)', padding:24, display:'flex', flexDirection:'column', gap:12, border:'1.5px solid #e0e0e0'}}>
          <input type="text" placeholder="Savol" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} style={{padding:10, borderRadius:6, border:'1.5px solid #d6d3c7', fontSize:'1.08em', fontFamily:'Poppins, Arial, sans-serif'}} />
          {pollOptions.map((opt, idx) => (
            <div key={idx} style={{display:'flex', gap:8, alignItems:'center'}}>
              <input type="text" placeholder={`Variant ${idx+1}`} value={opt} onChange={e => {
                const arr = [...pollOptions]; arr[idx] = e.target.value; setPollOptions(arr);
              }} style={{flex:1, padding:10, borderRadius:6, border:'1.5px solid #d6d3c7', fontSize:'1.08em'}} />
              {pollOptions.length > 2 && <button type="button" onClick={() => setPollOptions(pollOptions.filter((_,i) => i!==idx))} style={{background:'#fff', color:'#c00', border:'1px solid #c00', borderRadius:4, padding:'4px 10px', cursor:'pointer'}}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => setPollOptions([...pollOptions, ''])} style={{background:'#eaf0fa', color:'#1a3a6b', border:'1px solid #b5c7e6', borderRadius:4, padding:'4px 10px', fontWeight:600, fontFamily:'Poppins, Arial, sans-serif', cursor:'pointer'}}>+ Variant</button>
          <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.08em', marginTop:8}}>Qo'shish</button>
          {pollError && <div style={{color: 'red', marginTop: 8}}>{pollError}</div>}
        </form>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>So'rovnomalar ro'yxati</h2>
        <ul style={{fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', padding: 0, listStyle: 'none'}}>
          {polls.map(p => (
            <li key={p.id} style={{borderBottom: '1px solid #e0e0e0', padding: '10px 0'}}>
              <b>{p.question}</b>
              <ul style={{marginTop:4, marginBottom:0, paddingLeft:18}}>
                {Object.keys(p.votes).map(opt => (
                  <li key={opt}>{opt} <span style={{color:'#888'}}>({p.votes[opt]} ta ovoz)</span></li>
                ))}
              </ul>
              <div style={{fontSize:'0.92em', color:'#888', marginTop:2}}>{p.createdAt && <>Qo'yilgan vaqti: {new Date(p.createdAt).toLocaleString('uz-UZ')}</>}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel; 