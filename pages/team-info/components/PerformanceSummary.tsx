import { teamInfo, recentMatches } from '../../../mocks/teamData';

const PerformanceSummary = () => {
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'W': return <i className="ri-check-line win-icon"></i>;
      case 'D': return <i className="ri-subtract-line draw-icon"></i>;
      case 'L': return <i className="ri-close-line loss-icon"></i>;
      default: return null;
    }
  };

  const getResultClass = (result: string) => {
    switch (result) {
      case 'W': return 'result-win';
      case 'D': return 'result-draw';
      case 'L': return 'result-loss';
      default: return '';
    }
  };

  return (
    <div className="performance-summary">
      <h2 className="section-title">Mavsum Ko'rsatkichlari</h2>
      
      <div className="performance-grid">
        <div className="performance-stats">
          <div className="stat-item">
            <div className="stat-value">{teamInfo.position}</div>
            <div className="stat-label">Liga pozitsiyasi</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.points}</div>
            <div className="stat-label">Ochkolar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.matchesPlayed}</div>
            <div className="stat-label">O'yinlar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.wins}</div>
            <div className="stat-label">G'alabalar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.draws}</div>
            <div className="stat-label">Duranglar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.losses}</div>
            <div className="stat-label">Mag'lubiyatlar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.goalsFor}</div>
            <div className="stat-label">Urilgan gollar</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{teamInfo.goalsAgainst}</div>
            <div className="stat-label">O'tkazilgan gollar</div>
          </div>
        </div>

        <div className="recent-form">
          <h3 className="form-title">So'nggi 5 o'yin</h3>
          <div className="form-results">
            {recentMatches.slice(0, 5).map((match) => (
              <div key={match.id} className={`form-result ${getResultClass(match.result)}`}>
                <div className="result-icon">
                  {getResultIcon(match.result)}
                </div>
                <div className="match-info">
                  <div className="opponent">{match.opponent}</div>
                  <div className="score">{match.score}</div>
                  <div className="competition">{match.competition}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="form-summary">
            <div className="form-stats">
              <span className="wins">{recentMatches.slice(0, 5).filter(m => m.result === 'W').length}G</span>
              <span className="draws">{recentMatches.slice(0, 5).filter(m => m.result === 'D').length}D</span>
              <span className="losses">{recentMatches.slice(0, 5).filter(m => m.result === 'L').length}M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="season-averages">
        <h3 className="averages-title">Mavsum O'rtacha Ko'rsatkichlari</h3>
        <div className="averages-grid">
          <div className="average-item">
            <div className="average-value">{(teamInfo.goalsFor / teamInfo.matchesPlayed).toFixed(1)}</div>
            <div className="average-label">O'yin uchun gollar</div>
          </div>
          <div className="average-item">
            <div className="average-value">{(teamInfo.goalsAgainst / teamInfo.matchesPlayed).toFixed(1)}</div>
            <div className="average-label">O'yin uchun o'tkazilgan</div>
          </div>
          <div className="average-item">
            <div className="average-value">{((teamInfo.wins / teamInfo.matchesPlayed) * 100).toFixed(0)}%</div>
            <div className="average-label">G'alaba foizi</div>
          </div>
          <div className="average-item">
            <div className="average-value">68%</div>
            <div className="average-label">To'p egaligi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;