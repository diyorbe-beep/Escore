import React from 'react';
import { teamOfTheWeek } from '../../../mocks/leagueData';

const TeamOfTheWeek: React.FC = () => {
  const getPositionStyle = (position: string) => {
    const positions: { [key: string]: { top: string; left: string } } = {
      'GK': { top: '85%', left: '50%' },
      'RB': { top: '65%', left: '80%' },
      'CB': { top: '65%', left: '35%' },
      'LB': { top: '65%', left: '20%' },
      'CM': { top: '45%', left: '50%' },
      'RW': { top: '25%', left: '75%' },
      'ST': { top: '15%', left: '50%' },
      'LW': { top: '25%', left: '25%' }
    };
    return positions[position] || { top: '50%', left: '50%' };
  };

  const getPlayersByPosition = () => {
    const gk = teamOfTheWeek.filter(p => p.position === 'GK');
    const defenders = teamOfTheWeek.filter(p => ['RB', 'CB', 'LB'].includes(p.position));
    const midfielders = teamOfTheWeek.filter(p => p.position === 'CM');
    const forwards = teamOfTheWeek.filter(p => ['RW', 'ST', 'LW'].includes(p.position));
    
    return { gk, defenders, midfielders, forwards };
  };

  const { gk, defenders, midfielders, forwards } = getPlayersByPosition();

  return (
    <div className="team-of-week">
      <h2 className="team-of-week__title">Haftaning Eng Yaxshi Jamoasi</h2>
      
      <div className="team-of-week__field">
        <div className="field-background">
          <div className="field-lines">
            <div className="center-circle"></div>
            <div className="penalty-area penalty-area--top"></div>
            <div className="penalty-area penalty-area--bottom"></div>
            <div className="goal-area goal-area--top"></div>
            <div className="goal-area goal-area--bottom"></div>
          </div>
        </div>
        
        <div className="formation-display">
          {/* Darvozabon */}
          <div className="position-line goalkeeper">
            {gk.map((player, index) => (
              <div key={index} className="player-card goalkeeper">
                <div className="player-rating">{player.rating}</div>
                <div className="player-info">
                  <div className="player-name">{player.player.split(' ').pop()}</div>
                  <div className="player-team">{player.team}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Himoyachilar */}
          <div className="position-line defense">
            {defenders.map((player, index) => (
              <div key={index} className="player-card defender">
                <div className="player-rating">{player.rating}</div>
                <div className="player-info">
                  <div className="player-name">{player.player.split(' ').pop()}</div>
                  <div className="player-team">{player.team}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Yarim himoyachilar */}
          <div className="position-line midfield">
            {midfielders.map((player, index) => (
              <div key={index} className="player-card midfielder">
                <div className="player-rating">{player.rating}</div>
                <div className="player-info">
                  <div className="player-name">{player.player.split(' ').pop()}</div>
                  <div className="player-team">{player.team}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hujumchilar */}
          <div className="position-line attack">
            {forwards.map((player, index) => (
              <div key={index} className="player-card forward">
                <div className="player-rating">{player.rating}</div>
                <div className="player-info">
                  <div className="player-name">{player.player.split(' ').pop()}</div>
                  <div className="player-team">{player.team}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOfTheWeek;