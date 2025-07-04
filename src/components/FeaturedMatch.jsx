import React, { useEffect, useState } from 'react';
import imgs  from '../assets';
import axios from 'axios';
import logoDefault from '../assets/logo.png';
import Advertisement2 from './advertisement2';
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
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('/api/featured-match').then(res => {
      setMatches(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  if (!matches.length) return null;

  return (
    <>
      <div className="featured-match-list">
        {matches.map((match, idx) => {
          const timer = match.time ? getTimeUntilMatch(match.time) : '';
          return (
            <div className="featured-match-card" key={match.id || idx}>
              <div className="featured-match-title">Featured Match</div>
              <div className="featured-league">{match.league}</div>
              <div className="featured-match-main">
                <div className="team-block">
                  <img src={match.home.logo || logoDefault} alt={match.home.name} className="team-logo" />
                  <div className="team-name">{match.home.name}</div>
                </div>
                <div className="match-info-block">
                  <div className="match-time">{match.time}</div>
                  <div className="match-date">{match.date}</div>
                  <div className="match-timer">{timer}</div>
                </div>
                <div className="team-block">
                  <img src={match.away.logo || logoDefault} alt={match.away.name} className="team-logo" />
                  <div className="team-name">{match.away.name}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Advertisement2 />
    </>
  );
};

export default FeaturedMatch; 