import { refereeCareerStats } from '../../../mocks/refereeData';

export default function CareerStatistics() {
  const avgYellowPerMatch = refereeCareerStats.yellowCardsPerMatch;
  const avgRedPerMatch = refereeCareerStats.redCardsPerMatch;
  const avgPenaltyPerMatch = refereeCareerStats.penaltiesPerMatch;

  return (
    <div className="career-statistics">
      <div className="section-header">
        <h2>Karyera Statistikasi</h2>
      </div>

      <div className="stats-overview">
        <div className="overview-card">
          <h3>Umumiy Ko'rsatkichlar</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <div className="overview-label">Jami O'yinlar</div>
              <div className="overview-value">{refereeCareerStats.totalMatches}</div>
            </div>
            <div className="overview-item">
              <div className="overview-label">La Liga</div>
              <div className="overview-value">{refereeCareerStats.laLigaMatches}</div>
            </div>
            <div className="overview-item">
              <div className="overview-label">Copa del Rey</div>
              <div className="overview-value">{refereeCareerStats.copaDelReyMatches}</div>
            </div>
            <div className="overview-item">
              <div className="overview-label">UEFA Champions League</div>
              <div className="overview-value">{refereeCareerStats.uclMatches}</div>
            </div>
            <div className="overview-item">
              <div className="overview-label">Super Cup</div>
              <div className="overview-value">{refereeCareerStats.superCupMatches}</div>
            </div>
            <div className="overview-item">
              <div className="overview-label">Xalqaro O'yinlar</div>
              <div className="overview-value">{refereeCareerStats.internationalMatches}</div>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <h3>Kartochkalar Statistikasi</h3>
          <div className="cards-stats">
            <div className="card-stat-item">
              <div className="card-icon yellow-card">
                <i className="ri-file-list-3-line"></i>
              </div>
              <div className="card-stat-content">
                <div className="card-stat-label">O'rtacha Sariq Kartochka</div>
                <div className="card-stat-value">{avgYellowPerMatch} / o'yin</div>
              </div>
            </div>
            <div className="card-stat-item">
              <div className="card-icon red-card">
                <i className="ri-file-forbid-line"></i>
              </div>
              <div className="card-stat-content">
                <div className="card-stat-label">O'rtacha Qizil Kartochka</div>
                <div className="card-stat-value">{avgRedPerMatch} / o'yin</div>
              </div>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <h3>Penalti va VAR</h3>
          <div className="penalty-var-stats">
            <div className="pv-stat-item">
              <div className="pv-label">O'rtacha Penalti</div>
              <div className="pv-value">{avgPenaltyPerMatch} / o'yin</div>
              <div className="pv-bar">
                <div className="pv-fill" style={{ width: `${avgPenaltyPerMatch * 100}%` }}></div>
              </div>
            </div>
            <div className="pv-stat-item">
              <div className="pv-label">VAR Qarorlari</div>
              <div className="pv-value">{refereeCareerStats.varDecisions}</div>
              <div className="pv-bar">
                <div className="pv-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="pv-stat-item">
              <div className="pv-label">VAR Aniqligi</div>
              <div className="pv-value">{refereeCareerStats.varAccuracy}%</div>
              <div className="pv-bar">
                <div className="pv-fill success" style={{ width: `${refereeCareerStats.varAccuracy}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-breakdown">
        <h3>Batafsil Tahlil</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Musobaqa</th>
              <th>O'yinlar</th>
              <th>Sariq</th>
              <th>Qizil</th>
              <th>Penalti</th>
              <th>VAR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>La Liga</td>
              <td>{refereeCareerStats.laLigaMatches}</td>
              <td className="yellow-text">{Math.round(refereeCareerStats.laLigaMatches * avgYellowPerMatch)}</td>
              <td className="red-text">{Math.round(refereeCareerStats.laLigaMatches * avgRedPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.laLigaMatches * avgPenaltyPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.varDecisions * 0.5)}</td>
            </tr>
            <tr>
              <td>Copa del Rey</td>
              <td>{refereeCareerStats.copaDelReyMatches}</td>
              <td className="yellow-text">{Math.round(refereeCareerStats.copaDelReyMatches * avgYellowPerMatch)}</td>
              <td className="red-text">{Math.round(refereeCareerStats.copaDelReyMatches * avgRedPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.copaDelReyMatches * avgPenaltyPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.varDecisions * 0.2)}</td>
            </tr>
            <tr>
              <td>UEFA Champions League</td>
              <td>{refereeCareerStats.uclMatches}</td>
              <td className="yellow-text">{Math.round(refereeCareerStats.uclMatches * avgYellowPerMatch)}</td>
              <td className="red-text">{Math.round(refereeCareerStats.uclMatches * avgRedPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.uclMatches * avgPenaltyPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.varDecisions * 0.15)}</td>
            </tr>
            <tr>
              <td>Xalqaro O'yinlar</td>
              <td>{refereeCareerStats.internationalMatches}</td>
              <td className="yellow-text">{Math.round(refereeCareerStats.internationalMatches * avgYellowPerMatch)}</td>
              <td className="red-text">{Math.round(refereeCareerStats.internationalMatches * avgRedPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.internationalMatches * avgPenaltyPerMatch)}</td>
              <td>{Math.round(refereeCareerStats.varDecisions * 0.15)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}