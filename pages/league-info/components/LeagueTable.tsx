import React, { useState } from 'react';
import { leagueTable } from '../../../mocks/leagueData';

const LeagueTable: React.FC = () => {
  const [showFullTable, setShowFullTable] = useState(false);
  const displayedTeams = showFullTable ? leagueTable : leagueTable.slice(0, 10);

  const getPositionClass = (pos: number) => {
    if (pos <= 4) return 'champions-league';
    if (pos <= 6) return 'europa-league';
    if (pos >= 18) return 'relegation';
    return '';
  };

  return (
    <div className="league-table">
      <h2 className="league-table__title">Liga Jadvali</h2>
      <div className="league-table__wrapper">
        <table className="league-table__table">
          <thead>
            <tr>
              <th>O'rin</th>
              <th>Jamoa</th>
              <th>O'y</th>
              <th>G</th>
              <th>D</th>
              <th>M</th>
              <th>UG</th>
              <th>KG</th>
              <th>F</th>
              <th>O</th>
            </tr>
          </thead>
          <tbody>
            {displayedTeams.map((team) => (
              <tr key={team.pos} className={`league-table__row ${getPositionClass(team.pos)}`}>
                <td className="league-table__position">{team.pos}</td>
                <td className="league-table__team">
                  <img src={team.logo} alt={team.team} className="team-logo" />
                  <span className="team-name">{team.team}</span>
                </td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.gf}</td>
                <td>{team.ga}</td>
                <td className={team.gd >= 0 ? 'positive' : 'negative'}>
                  {team.gd > 0 ? '+' : ''}{team.gd}
                </td>
                <td className="league-table__points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!showFullTable && (
          <button 
            className="league-table__show-more"
            onClick={() => setShowFullTable(true)}
          >
            To'liq jadvalni ko'rish
          </button>
        )}
      </div>
      
      <div className="league-table__legend">
        <div className="legend-item champions-league">
          <span className="legend-color"></span>
          Chempionlar Ligasi
        </div>
        <div className="legend-item europa-league">
          <span className="legend-color"></span>
          Yevropa Ligasi
        </div>
        <div className="legend-item relegation">
          <span className="legend-color"></span>
          Quyi ligaga tushish
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;