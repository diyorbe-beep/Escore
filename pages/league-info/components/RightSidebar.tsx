import React from 'react';
import { topScorers, topAssists, cleanSheets } from '../../../mocks/leagueData';

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-section" id="top-scorers">
        <h3 className="sidebar-section__title">Eng ko'p gol urganlar</h3>
        <div className="sidebar-section__content">
          {topScorers.map((scorer) => (
            <div key={scorer.pos} className="player-stat">
              <div className="player-stat__position">{scorer.pos}</div>
              <div className="player-stat__info">
                <div className="player-stat__name">{scorer.player}</div>
                <div className="player-stat__team">
                  <img src={scorer.logo} alt={scorer.team} className="team-logo-small" />
                  {scorer.team}
                </div>
              </div>
              <div className="player-stat__value">{scorer.goals}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section__title">Eng ko'p pas berganlar</h3>
        <div className="sidebar-section__content">
          {topAssists.map((assist) => (
            <div key={assist.pos} className="player-stat">
              <div className="player-stat__position">{assist.pos}</div>
              <div className="player-stat__info">
                <div className="player-stat__name">{assist.player}</div>
                <div className="player-stat__team">
                  <img src={assist.logo} alt={assist.team} className="team-logo-small" />
                  {assist.team}
                </div>
              </div>
              <div className="player-stat__value">{assist.assists}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section__title">Eng ko'p "nol" darvozabonlar</h3>
        <div className="sidebar-section__content">
          {cleanSheets.map((keeper) => (
            <div key={keeper.pos} className="player-stat">
              <div className="player-stat__position">{keeper.pos}</div>
              <div className="player-stat__info">
                <div className="player-stat__name">{keeper.player}</div>
                <div className="player-stat__team">
                  <img src={keeper.logo} alt={keeper.team} className="team-logo-small" />
                  {keeper.team}
                </div>
              </div>
              <div className="player-stat__value">{keeper.cleanSheets}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section advertisement">
        <h3 className="sidebar-section__title">Reklama</h3>
        <div className="ad-banner">
          <div className="ad-content">
            <h4>eScore Premium</h4>
            <p>Barcha statistikalar va jonli natijalar</p>
            <button className="ad-button">Hoziroq obuna bo'ling</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;