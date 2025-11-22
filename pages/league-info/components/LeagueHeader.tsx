import React from 'react';
import { leagueInfo } from '../../../mocks/leagueData';

const LeagueHeader: React.FC = () => {
  return (
    <div className="league-header">
      <div className="league-header__content">
        <div className="league-header__main">
          <h1 className="league-header__title">{leagueInfo.name} {leagueInfo.season} SEASON</h1>
          <div className="league-header__info">
            <div className="league-header__logo">
              <img src={leagueInfo.logo} alt={leagueInfo.name} />
            </div>
            <div className="league-header__details">
              <div className="league-header__country">
                <img src={leagueInfo.flag} alt={leagueInfo.country} className="flag" />
                <span>{leagueInfo.country}</span>
              </div>
              <div className="league-header__founded">Tashkil topgan: {leagueInfo.founded}</div>
              <div className="league-header__season">Joriy mavsum: {leagueInfo.season}</div>
              <div className="league-header__matchday">
                {leagueInfo.matchday}-tur / {leagueInfo.totalMatchdays} turdan
              </div>
            </div>
          </div>
        </div>
        
        <div className="league-header__links">
          <a href="#top-scorers" className="league-header__link">
            <i className="ri-trophy-line"></i>
            Eng ko'p gol urganlar
          </a>
          <a href="#fixtures" className="league-header__link">
            <i className="ri-calendar-line"></i>
            Keyingi o'yinlar
          </a>
          <a href="#results" className="league-header__link">
            <i className="ri-history-line"></i>
            So'nggi natijalar
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeagueHeader;