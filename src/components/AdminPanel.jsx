import React, { useState, useEffect } from 'react';

const initialNews = [
  { id: 1, title: "Haaland to Real Madrid?", content: "Transfer news...", image: null, status: 'Published', deleted: false, publishedAt: new Date().toISOString() },
  { id: 2, title: "Napoli's Scudetto Push", content: "Napoli are pushing...", image: null, status: 'Draft', deleted: false, publishedAt: new Date().toISOString() },
];

const initialAdmins = [
  { id: 1, name: 'Asosiy Admin', email: 'superadmin@mail.com', role: 'superadmin' },
  { id: 2, name: 'Kichik Admin', email: 'admin@mail.com', role: 'admin' },
];

const AdminPanel = ({ userRole = 'admin' }) => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Draft');
  const [error, setError] = useState('');
  const [admins, setAdmins] = useState(initialAdmins);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminError, setAdminError] = useState('');

  // Load news from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('news');
    if (stored) {
      setNews(JSON.parse(stored));
    } else {
      setNews(initialNews);
    }
  }, []);

  // Save news to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleAdd = e => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title va to\'liq matn majburiy');
      return;
    }
    const newNews = {
      id: Date.now(),
      title,
      content,
      image: image ? URL.createObjectURL(image) : null,
      status,
      deleted: false,
      publishedAt: new Date().toISOString()
    };
    setNews([newNews, ...news]);
    setTitle('');
    setContent('');
    setImage(null);
    setStatus('Draft');
    setError('');
  };

  const handleDelete = id => {
    setNews(news.map(n => n.id === id ? { ...n, deleted: true } : n));
  };

  const handleAddAdmin = e => {
    e.preventDefault();
    if (!adminName || !adminEmail) {
      setAdminError('Ism va email majburiy');
      return;
    }
    setAdmins([
      ...admins,
      { id: Date.now(), name: adminName, email: adminEmail, role: 'admin' }
    ]);
    setAdminName('');
    setAdminEmail('');
    setAdminError('');
  };

  const handleRemoveAdmin = id => {
    setAdmins(admins.filter(a => a.id !== id || a.role === 'superadmin'));
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
          <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Adminlar boshqaruvi</h2>
          <form onSubmit={handleAddAdmin} style={{marginBottom: 16}}>
            <input type="text" placeholder="Admin ismi" value={adminName} onChange={e => setAdminName(e.target.value)} style={{marginRight: 8, padding: 8}} />
            <input type="email" placeholder="Admin email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} style={{marginRight: 8, padding: 8}} />
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
        <form onSubmit={handleAdd} style={{marginBottom: 24}}>
          <input type="text" placeholder="News title" value={title} onChange={e => setTitle(e.target.value)} style={{width: '60%', padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em', fontFamily: 'Poppins, Arial, sans-serif', marginRight: 12}} />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1em', marginRight: 12}}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{marginRight: 12}} />
          <br />
          <textarea placeholder="To'liq matn" value={content} onChange={e => setContent(e.target.value)} style={{width: '80%', marginTop: 10, padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em', fontFamily: 'Poppins, Arial, sans-serif', minHeight: 60}} />
          <br />
          <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 18px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em', marginTop: 10}}>Qo'shish</button>
        </form>
        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Yangiliklar ro'yxati</h2>
        <ul style={{fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', padding: 0, listStyle: 'none'}}>
          {news.filter(n => !n.deleted).map(n => (
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
    </div>
  );
};

export default AdminPanel; 