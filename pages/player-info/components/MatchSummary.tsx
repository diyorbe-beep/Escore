import React from 'react';
import { recentMatches } from '../../../mocks/playerData';

const MatchSummary: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return 'excellent';
    if (rating >= 7.5) return 'good';
    if (rating >= 6.5) return 'average';
    return 'poor';
  };

  return (
    <div className="match-summary">
      <h2 className="section-title">So'nggi O'yinlar</h2>
      
      <div className="matches-table">
        <div className="table-header">
          <div className="header-cell">Sana</div>
          <div className="header-cell">Raqib</div>
          <div className="header-cell">Natija</div>
          <div className="header-cell">Gollar</div>
          <div className="header-cell">Paslar</div>
          <div className="header-cell">Reyting</div>
          <div className="header-cell">Daqiqalar</div>
          <div className="header-cell">Liga</div>
        </div>
        
        <div className="table-body">
          {recentMatches.map((match) => (
            <div key={match.id} className="table-row">
              <div className="table-cell date-cell">
                {formatDate(match.date)}
              </div>
              <div className="table-cell opponent-cell">
                <img src={match.opponentLogo} alt={match.opponent} className="opponent-logo" />
                <span className="opponent-name">{match.opponent}</span>
              </div>
              <div className="table-cell result-cell">
                <span className="match-result">{match.result}</span>
              </div>
              <div className="table-cell goals-cell">
                <span className="stat-number">{match.goals}</span>
              </div>
              <div className="table-cell assists-cell">
                <span className="stat-number">{match.assists}</span>
              </div>
              <div className="table-cell rating-cell">
                <span className={`rating-badge ${getRatingColor(match.rating)}`}>
                  {match.rating}
                </span>
              </div>
              <div className="table-cell minutes-cell">
                <span className="minutes">{match.minutesPlayed}'</span>
              </div>
              <div className="table-cell competition-cell">
                <span className="competition">{match.competition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="match-actions">
        <button className="view-all-btn">
          <i className="ri-eye-line"></i>
          Barcha O'yinlarni Ko'rish
        </button>
      </div>
    </div>
  );
};

export default MatchSummary;