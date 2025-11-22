import { leagueStandings } from '../../../mocks/teamData';

const TeamStandings = () => {
  return (
    <div className="team-standings">
      <h2 className="section-title">Liga Jadvali</h2>
      
      <div className="standings-table-container">
        <table className="standings-table">
          <thead>
            <tr>
              <th className="pos">O'rin</th>
              <th className="team">Jamoa</th>
              <th className="mp">O'yin</th>
              <th className="w">G'alaba</th>
              <th className="d">Durang</th>
              <th className="l">Mag'lubiyat</th>
              <th className="gf">Urilgan</th>
              <th className="ga">O'tkazilgan</th>
              <th className="pts">Ochko</th>
            </tr>
          </thead>
          <tbody>
            {leagueStandings.map((team) => (
              <tr 
                key={team.pos} 
                className={team.team === 'Real Madrid' ? 'current-team' : ''}
              >
                <td className="pos">{team.pos}</td>
                <td className="team">
                  <div className="team-cell">
                    <div className="team-name">{team.team}</div>
                  </div>
                </td>
                <td className="mp">{team.mp}</td>
                <td className="w">{team.w}</td>
                <td className="d">{team.d}</td>
                <td className="l">{team.l}</td>
                <td className="gf">{team.gf}</td>
                <td className="ga">{team.ga}</td>
                <td className="pts">{team.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="standings-legend">
        <div className="legend-item">
          <div className="legend-color champions-league"></div>
          <span>Chempionlar Ligasi</span>
        </div>
        <div className="legend-item">
          <div className="legend-color europa-league"></div>
          <span>Yevropa Ligasi</span>
        </div>
        <div className="legend-item">
          <div className="legend-color relegation"></div>
          <span>Quyi ligaga tushish</span>
        </div>
      </div>

      <button className="view-full-table">
        To'liq jadvalni ko'rish
        <i className="ri-arrow-right-line"></i>
      </button>
    </div>
  );
};

export default TeamStandings;