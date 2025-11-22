import { refereeCareerStats, refereeSeasonStats } from '../../../mocks/refereeData';

export default function PerformanceOverview() {
  return (
    <div className="performance-overview">
      <div className="section-header">
        <h2>Ko'rsatkichlar Tahlili</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="ri-football-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{refereeCareerStats.totalMatches}</div>
            <div className="stat-label">Jami O'yinlar</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <i className="ri-file-list-3-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{refereeCareerStats.yellowCardsPerMatch}</div>
            <div className="stat-label">Sariq Kartochka / O'yin</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <i className="ri-file-forbid-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{refereeCareerStats.redCardsPerMatch}</div>
            <div className="stat-label">Qizil Kartochka / O'yin</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="ri-focus-3-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{refereeCareerStats.penaltiesPerMatch}</div>
            <div className="stat-label">Penalti / O'yin</div>
          </div>
        </div>
      </div>

      <div className="season-stats">
        <h3>Joriy Mavsum ({refereeSeasonStats.season})</h3>
        <div className="season-grid">
          <div className="season-item">
            <div className="season-label">O'yinlar</div>
            <div className="season-value">{refereeSeasonStats.matches}</div>
          </div>
          <div className="season-item">
            <div className="season-label">Sariq Kartochkalar</div>
            <div className="season-value yellow-text">{refereeSeasonStats.yellowCards}</div>
          </div>
          <div className="season-item">
            <div className="season-label">Qizil Kartochkalar</div>
            <div className="season-value red-text">{refereeSeasonStats.redCards}</div>
          </div>
          <div className="season-item">
            <div className="season-label">Penaltilar</div>
            <div className="season-value">{refereeSeasonStats.penalties}</div>
          </div>
          <div className="season-item">
            <div className="season-label">VAR Tekshiruvlar</div>
            <div className="season-value">{refereeSeasonStats.varReviews}</div>
          </div>
          <div className="season-item">
            <div className="season-label">VAR O'zgartirishlar</div>
            <div className="season-value">{refereeSeasonStats.varOverturned}</div>
          </div>
        </div>
      </div>

      <div className="var-statistics">
        <h3>VAR Statistikasi</h3>
        <div className="var-content">
          <div className="var-stat">
            <div className="var-label">Jami VAR Qarorlari</div>
            <div className="var-value">{refereeCareerStats.varDecisions}</div>
          </div>
          <div className="var-stat">
            <div className="var-label">VAR Aniqligi</div>
            <div className="var-value">{refereeCareerStats.varAccuracy}%</div>
          </div>
          <div className="var-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${refereeCareerStats.varAccuracy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="league-breakdown">
        <h3>Ligalar Bo'yicha Taqsimot</h3>
        <div className="league-stats">
          <div className="league-item">
            <div className="league-name">La Liga</div>
            <div className="league-bar">
              <div 
                className="league-fill" 
                style={{ width: `${(refereeCareerStats.laLigaMatches / refereeCareerStats.totalMatches) * 100}%` }}
              ></div>
            </div>
            <div className="league-count">{refereeCareerStats.laLigaMatches} o'yin</div>
          </div>
          <div className="league-item">
            <div className="league-name">Copa del Rey</div>
            <div className="league-bar">
              <div 
                className="league-fill" 
                style={{ width: `${(refereeCareerStats.copaDelReyMatches / refereeCareerStats.totalMatches) * 100}%` }}
              ></div>
            </div>
            <div className="league-count">{refereeCareerStats.copaDelReyMatches} o'yin</div>
          </div>
          <div className="league-item">
            <div className="league-name">UEFA Champions League</div>
            <div className="league-bar">
              <div 
                className="league-fill" 
                style={{ width: `${(refereeCareerStats.uclMatches / refereeCareerStats.totalMatches) * 100}%` }}
              ></div>
            </div>
            <div className="league-count">{refereeCareerStats.uclMatches} o'yin</div>
          </div>
          <div className="league-item">
            <div className="league-name">Xalqaro O'yinlar</div>
            <div className="league-bar">
              <div 
                className="league-fill" 
                style={{ width: `${(refereeCareerStats.internationalMatches / refereeCareerStats.totalMatches) * 100}%` }}
              ></div>
            </div>
            <div className="league-count">{refereeCareerStats.internationalMatches} o'yin</div>
          </div>
        </div>
      </div>
    </div>
  );
}