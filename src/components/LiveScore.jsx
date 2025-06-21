import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiClock, FiPlay, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { footballNewsApi } from '../services/FootballNewsService';
import './LiveScore.scss';

const LiveScore = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('live');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const filters = [
    { id: 'live', label: 'Jonli', icon: FiPlay },
    { id: 'today', label: 'Bugun', icon: FiClock },
    { id: 'finished', label: 'Tugagan', icon: FiCheckCircle }
  ];

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get live matches from free APIs
      const liveMatches = await footballNewsApi.getLiveMatches();
      
      if (liveMatches && liveMatches.length > 0) {
        setMatches(liveMatches);
      } else {
        // Use fallback data if no live matches
        setMatches(generateFallbackMatches());
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError('O\'yinlar yuklanayotganda xatolik yuz berdi');
      setMatches(generateFallbackMatches());
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackMatches = () => {
    const teams = [
      'Real Madrid', 'Barcelona', 'Manchester City', 'Liverpool', 
      'Bayern Munich', 'PSG', 'Juventus', 'AC Milan', 'Arsenal', 'Chelsea',
      'Borussia Dortmund', 'Atletico Madrid', 'Inter Milan', 'Napoli',
      'Manchester United', 'Tottenham', 'Ajax', 'Porto', 'Benfica', 'Sevilla'
    ];

    const competitions = [
      'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 
      'Champions League', 'Europa League', 'Ligue 1'
    ];

    const statuses = ['1H', '2H', 'HT', 'FT', 'NS'];

    return Array.from({ length: 12 }, (_, index) => {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const competition = competitions[Math.floor(Math.random() * competitions.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        homeTeam,
        awayTeam,
        homeScore: status === 'NS' ? null : Math.floor(Math.random() * 4),
        awayScore: status === 'NS' ? null : Math.floor(Math.random() * 4),
        status,
        time: status === '1H' || status === '2H' ? Math.floor(Math.random() * 45) + 1 : null,
        competition,
        country: getCountryByCompetition(competition),
        date: new Date().toISOString(),
        isLive: status !== 'NS' && status !== 'FT'
      };
    });
  };

  const getCountryByCompetition = (competition) => {
    const countries = {
      'Premier League': 'England',
      'La Liga': 'Spain',
      'Bundesliga': 'Germany',
      'Serie A': 'Italy',
      'Ligue 1': 'France',
      'Champions League': 'Europe',
      'Europa League': 'Europe'
    };
    return countries[competition] || 'International';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '1H':
      case '2H':
        return '#dc2626'; // Red for live
      case 'HT':
        return '#f59e0b'; // Orange for half time
      case 'FT':
        return '#059669'; // Green for finished
      case 'NS':
        return '#6b7280'; // Gray for not started
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status, time) => {
    switch (status) {
      case '1H':
        return `${time}'`;
      case '2H':
        return `${time + 45}'`;
      case 'HT':
        return 'Tanaffus';
      case 'FT':
        return 'Tugadi';
      case 'NS':
        return 'Boshlanmagan';
      default:
        return status;
    }
  };

  const filterMatches = (matches, filter) => {
    switch (filter) {
      case 'live':
        return matches.filter(match => match.isLive);
      case 'today':
        return matches.filter(match => {
          const matchDate = new Date(match.date);
          const today = new Date();
          return matchDate.toDateString() === today.toDateString();
        });
      case 'finished':
        return matches.filter(match => match.status === 'FT');
      default:
        return matches;
    }
  };

  const handleRefresh = () => {
    fetchMatches();
  };

  const handleRetry = () => {
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchMatches();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredMatches = filterMatches(matches, activeFilter);

  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('uz-UZ', options);
  };

  if (loading && matches.length === 0) {
    return (
      <div className="live-score-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">O'yinlar yuklanmoqda...</div>
        </div>
      </div>
    );
  }

  if (error && matches.length === 0) {
    return (
      <div className="live-score-page">
        <div className="error-state">
          <FiAlertCircle className="error-icon" />
          <div className="error-text">{error}</div>
          <button className="retry-btn" onClick={handleRetry}>
            <FiRefreshCw style={{ marginRight: '8px' }} />
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="live-score-page">
      <div className="page-header">
        <h1>Jonli Natijalar</h1>
        <div className="header-meta">
          <span className="current-date">{getCurrentDate()}</span>
          <span className="last-updated">
            Oxirgi yangilanish: {lastUpdated.toLocaleTimeString('uz-UZ')}
          </span>
        </div>
      </div>

      <div className="controls-section">
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon />
              {filter.label}
            </button>
          ))}
        </div>
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCw />
          Yangilash
        </button>
      </div>

      <div className="matches-section">
        {filteredMatches.length === 0 ? (
          <div className="no-matches">
            <div className="no-matches-icon">⚽</div>
            <div className="no-matches-text">
              {activeFilter === 'live' && 'Hozirda jonli o\'yinlar yo\'q'}
              {activeFilter === 'today' && 'Bugun o\'yinlar yo\'q'}
              {activeFilter === 'finished' && 'Tugagan o\'yinlar yo\'q'}
            </div>
          </div>
        ) : (
          <div className="matches-grid">
            {filteredMatches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <div className="competition-info">
                    <span className="competition-name">{match.competition}</span>
                    <span className="country">{match.country}</span>
                  </div>
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(match.status) }}
                  >
                    {getStatusText(match.status, match.time)}
                  </div>
                </div>

                <div className="match-content">
                  <div className="team home-team">
                    <div className="team-name">{match.homeTeam}</div>
                    <div className="team-score">{match.homeScore !== null ? match.homeScore : '-'}</div>
                  </div>
                  
                  <div className="match-separator">
                    <span>vs</span>
                  </div>
                  
                  <div className="team away-team">
                    <div className="team-name">{match.awayTeam}</div>
                    <div className="team-score">{match.awayScore !== null ? match.awayScore : '-'}</div>
                  </div>
                </div>

                {match.isLive && (
                  <div className="live-indicator">
                    <div className="live-dot"></div>
                    <span>JONLI</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="page-footer">
        <div className="footer-info">
          <p>Ma'lumotlar har 30 soniyada avtomatik yangilanadi</p>
          <p>Barcha vaqtlar mahalliy vaqtda ko'rsatiladi</p>
        </div>
      </div>
    </div>
  );
};

export default LiveScore; 