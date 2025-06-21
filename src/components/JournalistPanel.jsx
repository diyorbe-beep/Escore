import React, { useState } from 'react';

const initialArticles = [
  { id: 1, title: "My First Article", status: 'Draft' },
  { id: 2, title: "Matchday Review", status: 'Pending' },
];

const JournalistPanel = ({ journalistName = 'John Doe' }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Draft');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleAddOrEdit = e => {
    e.preventDefault();
    if (!title) {
      setError('Title is required');
      return;
    }
    if (editId) {
      setArticles(articles.map(a => a.id === editId ? { ...a, title, status } : a));
      setEditId(null);
    } else {
      setArticles([{ id: Date.now(), title, status }, ...articles]);
    }
    setTitle('');
    setStatus('Draft');
    setError('');
  };

  const handleEdit = article => {
    setEditId(article.id);
    setTitle(article.title);
    setStatus(article.status);
  };

  const handleDelete = id => {
    setArticles(articles.filter(a => a.id !== id));
    if (editId === id) {
      setEditId(null);
      setTitle('');
      setStatus('Draft');
    }
  };

  return (
    <div className="block" style={{padding: '32px', background: '#fff', maxWidth: 600, margin: '0 auto'}}>
      <h1 style={{marginBottom: '0.5em'}}>Journalist Panel</h1>
      <div style={{marginBottom: 18, fontFamily: 'Inter, Arial, sans-serif', color: '#1a3a6b'}}>Welcome, <b>{journalistName}</b></div>
      <section style={{margin: '24px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>{editId ? 'Edit Article' : 'Add Article'}</h2>
        <form onSubmit={handleAddOrEdit} style={{marginBottom: 24}}>
          <input type="text" placeholder="Article title" value={title} onChange={e => setTitle(e.target.value)} style={{width: '60%', padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em', fontFamily: 'Poppins, Arial, sans-serif', marginRight: 12}} />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1em', marginRight: 12}}>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Published">Published</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 18px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>{editId ? 'Save' : 'Add'}</button>
        </form>
        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>My Articles</h2>
        <ul style={{fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', padding: 0, listStyle: 'none'}}>
          {articles.map(a => (
            <li key={a.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', padding: '10px 0'}}>
              <span><b>{a.title}</b> <span style={{color: '#888', fontSize: '0.95em'}}>({a.status})</span></span>
              <span>
                <button onClick={() => handleEdit(a)} style={{background: '#fff', color: '#1a3a6b', border: '1px solid #1a3a6b', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer', marginRight: 8}}>Edit</button>
                <button onClick={() => handleDelete(a.id)} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default JournalistPanel; 