import { useState } from 'react';
import { refereeMatches } from '../../../mocks/refereeData';

export default function MatchesSection() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const handleMatchClick = (matchId: number) => {
    setSelectedMatch(selectedMatch === matchId ? null : matchId);
  };

  return (
    <div className="matches-section">
      <div className="section-header">
        <h2>Hakamlik Qilgan O'yinlar</h2>
      </div>

      <div className="matches-list">
        {refereeMatches.map((match) => (
          <div key={match.id} className="match-item">
            <div className="match-main" onClick={() => handleMatchClick(match.id)}>
              <div className="match-date">
                <i className="ri-calendar-line"></i>
                {match.date}
              </div>
              <div className="match-competition">
                <img src={match.competitionLogo} alt={match.competition} />
                <span>{match.competition}</span>
              </div>
              <div className="match-teams">
                <div className="team home">
                  <img src={match.homeLogo} alt={match.homeTeam} />
                  <span>{match.homeTeam}</span>
                </div>
                <div className="match-score">{match.score}</div>
                <div className="team away">
                  <span>{match.awayTeam}</span>
                  <img src={match.awayLogo} alt={match.awayTeam} />
                </div>
              </div>
              <div className="match-cards">
                {match.yellowCards > 0 && (
                  <span className="card-count yellow">
                    <i className="ri-file-list-3-line"></i>
                    {match.yellowCards}
                  </span>
                )}
                {match.redCards > 0 && (
                  <span className="card-count red">
                    <i className="ri-file-forbid-line"></i>
                    {match.redCards}
                  </span>
                )}
              </div>
              <button className="details-toggle">
                <i className={`ri-arrow-${selectedMatch === match.id ? 'up' : 'down'}-s-line`}></i>
              </button>
            </div>

            {selectedMatch === match.id && (
              <div className="match-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <i className="ri-file-list-3-line"></i>
                    <span>Sariq Kartochkalar:</span>
                    <strong>{match.yellowCards}</strong>
                  </div>
                  <div className="detail-item">
                    <i className="ri-file-forbid-line"></i>
                    <span>Qizil Kartochkalar:</span>
                    <strong>{match.redCards}</strong>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <i className="ri-focus-3-line"></i>
                    <span>Penaltilar:</span>
                    <strong>{match.penalties}</strong>
                  </div>
                  <div className="detail-item">
                    <i className="ri-tv-line"></i>
                    <span>VAR Qarorlari:</span>
                    <strong>{match.varDecisions}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}