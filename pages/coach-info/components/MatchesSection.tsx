import React, { useState } from 'react';
import { coachInfo } from '../../../mocks/coachData';

const MatchesSection: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const getResultClass = (result: string) => {
    switch (result) {
      case 'W': return 'win';
      case 'D': return 'draw';
      case 'L': return 'loss';
      default: return '';
    }
  };

  const getResultText = (result: string) => {
    switch (result) {
      case 'W': return 'G\'alaba';
      case 'D': return 'Durang';
      case 'L': return 'Mag\'lubiyat';
      default: return '';
    }
  };

  return (
    <div className="matches-section">
      <h2 className="section-title">So'nggi O'yinlar</h2>
      
      <div className="recent-form">
        <h3 className="subsection-title">So'nggi 10 O'yin Natijasi</h3>
        <div className="form-display">
          <div className="form-results">
            {coachInfo.recentMatches.slice(0, 10).map((match, index) => (
              <div key={index} className={`form-result ${getResultClass(match.result)}`}>
                {match.result}
              </div>
            ))}
          </div>
          <div className="form-summary">
            <span className="form-text">
              So'nggi 10 o'yinda: {coachInfo.recentMatches.slice(0, 10).filter(m => m.result === 'W').length} g'alaba, 
              {' '}{coachInfo.recentMatches.slice(0, 10).filter(m => m.result === 'D').length} durang, 
              {' '}{coachInfo.recentMatches.slice(0, 10).filter(m => m.result === 'L').length} mag'lubiyat
            </span>
          </div>
        </div>
      </div>
      
      <div className="matches-table">
        <div className="table-header">
          <div className="header-cell">Sana</div>
          <div className="header-cell">Raqib</div>
          <div className="header-cell">Natija</div>
          <div className="header-cell">Turnir</div>
          <div className="header-cell">Uy/Mehmon</div>
          <div className="header-cell">Tafsilotlar</div>
        </div>
        
        <div className="table-body">
          {coachInfo.recentMatches.map((match, index) => (
            <div key={index} className="table-row">
              <div className="table-cell date-cell">
                <span className="match-date">{match.date}</span>
              </div>
              
              <div className="table-cell opponent-cell">
                <img src={match.opponentLogo} alt={match.opponent} className="opponent-logo" />
                <span className="opponent-name">{match.opponent}</span>
              </div>
              
              <div className="table-cell result-cell">
                <span className={`match-score ${getResultClass(match.result)}`}>
                  {match.score}
                </span>
                <span className={`result-badge ${getResultClass(match.result)}`}>
                  {getResultText(match.result)}
                </span>
              </div>
              
              <div className="table-cell competition-cell">
                <span className="competition-name">{match.competition}</span>
              </div>
              
              <div className="table-cell venue-cell">
                <span className={`venue-badge ${match.venue === 'Uy' ? 'home' : 'away'}`}>
                  {match.venue}
                </span>
              </div>
              
              <div className="table-cell details-cell">
                <button 
                  className="details-btn"
                  onClick={() => setSelectedMatch(match)}
                >
                  <i className="ri-eye-line"></i>
                  Ko'rish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedMatch && (
        <div className="match-modal-overlay" onClick={() => setSelectedMatch(null)}>
          <div className="match-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>O'yin Tafsilotlari</h3>
              <button className="close-btn" onClick={() => setSelectedMatch(null)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="match-info">
                <div className="match-teams">
                  <div className="team home">
                    <img src={coachInfo.currentClub.logo} alt={coachInfo.currentClub.name} />
                    <span>{coachInfo.currentClub.name}</span>
                  </div>
                  <div className="match-score-large">
                    <span className={getResultClass(selectedMatch.result)}>
                      {selectedMatch.score}
                    </span>
                  </div>
                  <div className="team away">
                    <img src={selectedMatch.opponentLogo} alt={selectedMatch.opponent} />
                    <span>{selectedMatch.opponent}</span>
                  </div>
                </div>
                
                <div className="match-details">
                  <div className="detail-item">
                    <span className="detail-label">Sana:</span>
                    <span className="detail-value">{selectedMatch.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Turnir:</span>
                    <span className="detail-value">{selectedMatch.competition}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Uy/Mehmon:</span>
                    <span className="detail-value">{selectedMatch.venue}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Natija:</span>
                    <span className={`detail-value ${getResultClass(selectedMatch.result)}`}>
                      {getResultText(selectedMatch.result)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="matches-actions">
        <button className="view-all-btn">
          <i className="ri-calendar-line"></i>
          Barcha O'yinlarni Ko'rish
        </button>
      </div>
    </div>
  );
};

export default MatchesSection;