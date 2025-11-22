import React, { useState } from 'react';
import { upcomingMatches, recentResults } from '../../../mocks/leagueData';

const LeagueFixtures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long',
      weekday: 'long'
    };
    return date.toLocaleDateString('uz-UZ', options);
  };

  return (
    <div className="league-fixtures" id="fixtures">
      <div className="fixtures-header">
        <h2 className="fixtures-title">O'yinlar Jadvali</h2>
        <div className="fixtures-tabs">
          <button 
            className={`fixtures-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Keyingi o'yinlar
          </button>
          <button 
            className={`fixtures-tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Natijalar
          </button>
        </div>
      </div>

      <div className="fixtures-content">
        {activeTab === 'upcoming' && (
          <div className="fixtures-list">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="fixture-card upcoming">
                <div className="fixture-date">{formatDate(match.date)}</div>
                <div className="fixture-match">
                  <div className="fixture-team home">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                    <span className="team-name">{match.homeTeam.name}</span>
                  </div>
                  <div className="fixture-time">
                    <span className="time">{match.time}</span>
                    <span className="venue">{match.venue}</span>
                  </div>
                  <div className="fixture-team away">
                    <span className="team-name">{match.awayTeam.name}</span>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="fixtures-list">
            {recentResults.map((match) => (
              <div key={match.id} className="fixture-card finished">
                <div className="fixture-date">{formatDate(match.date)}</div>
                <div className="fixture-match">
                  <div className="fixture-team home">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                    <span className="team-name">{match.homeTeam.name}</span>
                  </div>
                  <div className="fixture-score">
                    <span className="score">{match.score.home} - {match.score.away}</span>
                    <span className="status">Tugallandi</span>
                  </div>
                  <div className="fixture-team away">
                    <span className="team-name">{match.awayTeam.name}</span>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueFixtures;