import { useState } from 'react';
import { recentMatches, upcomingMatches } from '../../../mocks/teamData';

interface MatchesSectionProps {
  showAll?: boolean;
}

const MatchesSection = ({ showAll = false }: MatchesSectionProps) => {
  const [activeMatchTab, setActiveMatchTab] = useState('upcoming');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getResultClass = (result: string) => {
    switch (result) {
      case 'W': return 'match-win';
      case 'D': return 'match-draw';
      case 'L': return 'match-loss';
      default: return '';
    }
  };

  return (
    <div className="matches-section" id="matches">
      <h2 className="section-title">O'yinlar Jadvali</h2>
      
      <div className="matches-tabs">
        <button 
          className={`tab-button ${activeMatchTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveMatchTab('upcoming')}
        >
          <i className="ri-calendar-line"></i>
          Keyingi o'yinlar
        </button>
        <button 
          className={`tab-button ${activeMatchTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveMatchTab('results')}
        >
          <i className="ri-history-line"></i>
          Natijalar
        </button>
      </div>

      <div className="matches-content">
        {activeMatchTab === 'upcoming' && (
          <div className="upcoming-matches">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="match-card upcoming">
                <div className="match-date">
                  <div className="date">{formatDate(match.date)}</div>
                  <div className="time">{match.time}</div>
                </div>
                
                <div className="match-teams">
                  <div className="team home">
                    <img src="https://readdy.ai/api/search-image?query=Real%20Madrid%20football%20club%20official%20logo%20white%20background%20simple%20clean%20design&width=40&height=40&seq=real-madrid-logo-2&orientation=squarish" alt="Real Madrid" className="team-logo" />
                    <span className="team-name">Real Madrid</span>
                  </div>
                  
                  <div className="match-vs">VS</div>
                  
                  <div className="team away">
                    <img src={match.opponentLogo} alt={match.opponent} className="team-logo" />
                    <span className="team-name">{match.opponent}</span>
                  </div>
                </div>
                
                <div className="match-info">
                  <div className="competition">{match.competition}</div>
                  <div className="venue">{match.venue}</div>
                </div>
                
                <button className="match-details-btn">
                  Tafsilotlar
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeMatchTab === 'results' && (
          <div className="recent-matches">
            {recentMatches.map((match) => (
              <div key={match.id} className={`match-card result ${getResultClass(match.result)}`}>
                <div className="match-date">
                  <div className="date">{formatDate(match.date)}</div>
                  <div className="result-badge">{match.result}</div>
                </div>
                
                <div className="match-teams">
                  <div className="team home">
                    <img src="https://readdy.ai/api/search-image?query=Real%20Madrid%20football%20club%20official%20logo%20white%20background%20simple%20clean%20design&width=40&height=40&seq=real-madrid-logo-3&orientation=squarish" alt="Real Madrid" className="team-logo" />
                    <span className="team-name">Real Madrid</span>
                  </div>
                  
                  <div className="match-score">{match.score}</div>
                  
                  <div className="team away">
                    <img src={match.opponentLogo} alt={match.opponent} className="team-logo" />
                    <span className="team-name">{match.opponent}</span>
                  </div>
                </div>
                
                <div className="match-info">
                  <div className="competition">{match.competition}</div>
                  <div className="home-away">{match.homeAway === 'home' ? 'Uy' : 'Mehmon'}</div>
                </div>
                
                <button className="match-details-btn">
                  Tafsilotlar
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesSection;