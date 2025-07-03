import React, { useEffect, useState } from 'react';
import imgs  from '../assets';
// Mock data for demonstration
const featuredMatch = {
  home: {
    name: 'Real Madrid',
    logo: imgs.realMadrid,
  },
  away: {
    name: 'Barcelona',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/800px-FC_Barcelona_%28crest%29.svg.png',
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
  return `${h}:${m}`;
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
          <div className="match-date">5.10.2025</div>
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