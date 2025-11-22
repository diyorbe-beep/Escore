import { teamInfo } from '../../../mocks/teamData';

const TeamHeader = () => {
  return (
    <div className="team-header">
      <div className="team-header__main">
        <div className="team-header__logo">
          <img src={teamInfo.logo} alt={teamInfo.name} />
        </div>
        
        <div className="team-header__info">
          <h1 className="team-name">{teamInfo.name}</h1>
          <div className="team-details">
            <span className="founded">Tashkil topgan: {teamInfo.founded}</span>
            <span className="city">{teamInfo.city}, {teamInfo.country}</span>
            <span className="stadium">{teamInfo.stadium} ({teamInfo.capacity.toLocaleString()} o'rin)</span>
          </div>
        </div>

        <div className="team-header__actions">
          <button className="follow-btn">
            <i className="ri-heart-line"></i>
            Kuzatish
          </button>
          
          <div className="social-links">
            <a href={`https://twitter.com/${teamInfo.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href={`https://instagram.com/${teamInfo.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href={`https://facebook.com/${teamInfo.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
              <i className="ri-facebook-fill"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="team-header__nav">
        <div className="quick-nav">
          <a href="#upcoming" className="nav-link">
            <i className="ri-calendar-line"></i>
            Keyingi o'yinlar
          </a>
          <a href="#recent" className="nav-link">
            <i className="ri-history-line"></i>
            So'nggi o'yinlar
          </a>
          <a href="#squad" className="nav-link">
            <i className="ri-team-line"></i>
            Tarkib
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;