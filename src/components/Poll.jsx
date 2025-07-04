import React, { useState, useEffect } from 'react';
import { pollApi } from '../services/ApiService';

const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    pollApi.getAll().then(setPolls);
  }, []);

  const handleVote = async (e, pollId) => {
    e.preventDefault();
    if (!selected) return;
    await pollApi.vote(pollId, selected);
    setMessage('Ovoz berildi!');
  };

  if (!polls.length) return <div>So‘rovnomalar yo‘q</div>;

  // Faqat birinchi so‘rovnomani ko‘rsatamiz (demo uchun)
  const poll = polls[0];
  const options = poll ? Object.keys(poll.votes || {}) : [];

  return poll ? (
    <div className="block" style={{background: '#fff', border: '1px solid #e0e0e0', marginBottom: '24px'}}>
      <h3>{poll.question || 'So‘rovnoma'}</h3>
      <form onSubmit={e => handleVote(e, poll.id)}>
        {options.map(opt => (
          <label key={opt} style={{display: 'block', marginBottom: '6px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600}}>
            <input type="radio" name="vote" value={opt} checked={selected === opt} onChange={() => setSelected(opt)} /> {opt}
          </label>
        ))}
        <button type="submit" style={{marginTop: '12px', background: '#1a3a6b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px'}} disabled={!selected}>VOTE</button>
      </form>
      {message && <div style={{color: 'green', marginTop: 8}}>{message}</div>}
    </div>
  ) : null;
};

export default Poll; 