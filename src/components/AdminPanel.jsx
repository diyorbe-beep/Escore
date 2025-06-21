import React, { useState } from 'react';

const initialNews = [
  { id: 1, title: "Haaland to Real Madrid?", status: 'Published' },
  { id: 2, title: "Napoli's Scudetto Push", status: 'Draft' },
];

const initialJournalists = [
  { id: 1, name: 'Ali', email: 'ali@mail.com', status: 'Pending' },
  { id: 2, name: 'Bekzod', email: 'bekzod@mail.com', status: 'Approved' },
  { id: 3, name: 'Sardor', email: 'sardor@mail.com', status: 'Rejected' },
];

const initialUsers = [
  { id: 1, name: 'User1', email: 'user1@mail.com', status: 'Active' },
  { id: 2, name: 'User2', email: 'user2@mail.com', status: 'Blocked' },
  { id: 3, name: 'User3', email: 'user3@mail.com', status: 'Active' },
];

const AdminPanel = () => {
  const [news, setNews] = useState(initialNews);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Draft');
  const [error, setError] = useState('');
  const [journalists, setJournalists] = useState(initialJournalists);
  const [users, setUsers] = useState(initialUsers);

  const handleAdd = e => {
    e.preventDefault();
    if (!title) {
      setError('Title is required');
      return;
    }
    setNews([{ id: Date.now(), title, status }, ...news]);
    setTitle('');
    setStatus('Draft');
    setError('');
  };

  const handleDelete = id => {
    setNews(news.filter(n => n.id !== id));
  };

  const handleJournalistStatus = (id, newStatus) => {
    setJournalists(journalists.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const handleUserBlock = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="block" style={{padding: '32px', background: '#fff', maxWidth: 700, margin: '0 auto'}}>
      <h1 style={{marginBottom: '0.5em'}}>Admin Panel</h1>
      <section style={{margin: '24px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Add News</h2>
        <form onSubmit={handleAdd} style={{marginBottom: 24}}>
          <input type="text" placeholder="News title" value={title} onChange={e => setTitle(e.target.value)} style={{width: '60%', padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontSize: '1em', fontFamily: 'Poppins, Arial, sans-serif', marginRight: 12}} />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{padding: 10, borderRadius: 4, border: '1.5px solid #d6d3c7', fontFamily: 'Poppins, Arial, sans-serif', fontSize: '1em', marginRight: 12}}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          <button type="submit" style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 18px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1em'}}>Add</button>
        </form>
        {error && <div style={{color: 'red', marginBottom: 12, fontFamily: 'Inter, Arial, sans-serif'}}>{error}</div>}
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>News List</h2>
        <ul style={{fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', padding: 0, listStyle: 'none'}}>
          {news.map(n => (
            <li key={n.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', padding: '10px 0'}}>
              <span><b>{n.title}</b> <span style={{color: '#888', fontSize: '0.95em'}}>({n.status})</span></span>
              <button onClick={() => handleDelete(n.id)} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      <section style={{margin: '32px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Journalists</h2>
        <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', background: '#fff'}}>
          <thead>
            <tr style={{background: '#f7f3ec'}}>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Name</th>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Email</th>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Status</th>
              <th style={{padding: '10px 6px'}}></th>
            </tr>
          </thead>
          <tbody>
            {journalists.map(j => (
              <tr key={j.id} style={{borderBottom: '1px solid #e0e0e0'}}>
                <td style={{padding: '10px 6px'}}>{j.name}</td>
                <td style={{padding: '10px 6px'}}>{j.email}</td>
                <td style={{padding: '10px 6px'}}>{j.status}</td>
                <td style={{padding: '10px 6px'}}>
                  {j.status === 'Pending' && (
                    <>
                      <button onClick={() => handleJournalistStatus(j.id, 'Approved')} style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer', marginRight: 8}}>Approve</button>
                      <button onClick={() => handleJournalistStatus(j.id, 'Rejected')} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section style={{margin: '24px 0'}}>
        <h2 style={{fontFamily: 'Playfair Display, serif', color: '#1a3a6b'}}>Users</h2>
        <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.05em', background: '#fff'}}>
          <thead>
            <tr style={{background: '#f7f3ec'}}>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Name</th>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Email</th>
              <th style={{padding: '10px 6px', textAlign: 'left', color: '#1a3a6b', fontFamily: 'Poppins, Arial, sans-serif'}}>Status</th>
              <th style={{padding: '10px 6px'}}></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{borderBottom: '1px solid #e0e0e0'}}>
                <td style={{padding: '10px 6px'}}>{u.name}</td>
                <td style={{padding: '10px 6px'}}>{u.email}</td>
                <td style={{padding: '10px 6px'}}>{u.status}</td>
                <td style={{padding: '10px 6px'}}>
                  {u.status === 'Active' ? (
                    <button onClick={() => handleUserBlock(u.id, 'Blocked')} style={{background: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Block</button>
                  ) : (
                    <button onClick={() => handleUserBlock(u.id, 'Active')} style={{background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer'}}>Unblock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section style={{margin: '24px 0'}}>
        <h2>Advertisement Zones</h2>
        <div>[REKLAMA ZONASI 1]</div>
        <div>[REKLAMA ZONASI 2]</div>
      </section>
    </div>
  );
};

export default AdminPanel; 