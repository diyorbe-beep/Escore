import React, { useEffect, useState } from 'react';

// Mock data for demonstration
const featuredMatch = {
  home: {
    name: 'Kortrijk',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/KV_Kortrijk_logo.png',
  },
  away: {
    name: 'KAA Gent',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5d/KAA_Gent_logo.png',
  },
  time: '17:00',
  date: new Date(), // today
};

function getTimeUntilMatch(matchTime) {
  const now = new Date();
  const [hours, minutes] = matchTime.split(':').map(Number);
  const matchDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  let diff = matchDate - now;
  if (diff < 0) diff = 0;
  const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0');
  const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
  const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const FeaturedMatch = () => {
  const [timer, setTimer] = useState(getTimeUntilMatch(featuredMatch.time));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTimeUntilMatch(featuredMatch.time));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="featured-match-card">
      <div className="featured-match-title">Featured Match</div>
      <div className="featured-match-main">
        <div className="team-block">
          <img src={featuredMatch.home.logo} alt={featuredMatch.home.name} className="team-logo" />
          <div className="team-name">{featuredMatch.home.name}</div>
        </div>
        <div className="match-info-block">
          <div className="match-time">{featuredMatch.time}</div>
          <div className="match-date">Today</div>
          <div className="match-timer">{timer}</div>
        </div>
        <div className="team-block">
          <img src={featuredMatch.away.logo} alt={featuredMatch.away.name} className="team-logo" />
          <div className="team-name">{featuredMatch.away.name}</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatch; 