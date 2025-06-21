import React, { useState } from 'react';

const Poll = () => {
  const [selected, setSelected] = useState('');
  const options = ['Man City', 'Real Madrid', 'PSG', 'Bayern'];

  return (
    <div className="block" style={{background: '#fff', border: '1px solid #e0e0e0', marginBottom: '24px'}}>
      <h3>Who will win the Champions League?</h3>
      <form onSubmit={e => { e.preventDefault(); alert('Voted for: ' + selected); }}>
        {options.map(opt => (
          <label key={opt} style={{display: 'block', marginBottom: '6px', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600}}>
            <input type="radio" name="vote" value={opt} checked={selected === opt} onChange={() => setSelected(opt)} /> {opt}
          </label>
        ))}
        <button type="submit" style={{marginTop: '12px', background: '#1a3a6b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px'}} disabled={!selected}>VOTE</button>
      </form>
    </div>
  );
};

export default Poll; 