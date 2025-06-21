import React, { useState, useEffect } from 'react';
import FootballMatchesService from '../services/FootballMatchesService';

const UpcomingMatches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      setLoading(true);
      try {
        const matches = await FootballMatchesService.getUpcomingMatches(5); // Next 5 days
        const matchesArray = Object.entries(matches).map(([date, match]) => ({
          date,
          ...match
        }));
        setUpcomingMatches(matchesArray);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMatches();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugun';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Ertaga';
    } else {
      return date.toLocaleDateString('uz-UZ', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  if (loading) {
    return <div className="upcoming-matches-loading">Yuklanmoqda...</div>;
  }

  if (upcomingMatches.length === 0) {
    return null;
  }

  return (
    <div className="upcoming-matches">
      <h5 className="upcoming-matches-title">Yaqin O'yinlar</h5>
      <div className="upcoming-matches-list">
        {upcomingMatches.slice(0, 3).map((match, index) => (
          <div key={index} className="upcoming-match-item">
            <div className="match-date">{formatDate(match.date)}</div>
            <div className="match-teams-compact">
              <span className="team-name">{match.home}</span>
              <span className="vs-compact">vs</span>
              <span className="team-name">{match.away}</span>
            </div>
            <div className="match-time-compact">
              {match.isLive ? (
                <span className="live-indicator">LIVE</span>
              ) : (
                match.time
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches; 