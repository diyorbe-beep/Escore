import React from 'react';
import { nextMatch, playerNews } from '../../../mocks/playerData';

const RightSidebar: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: 'long'
    });
  };

  return (
    <div className="right-sidebar">
      {/* Next Match */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Keyingi O'yin</h3>
        <div className="next-match-card">
          <div className="match-date">
            <span className="date">{formatDate(nextMatch.date)}</span>
            <span className="time">{nextMatch.time}</span>
          </div>
          <div className="match-teams">
            <div className="team home">
              <span className="team-name">Real Madrid</span>
            </div>
            <div className="vs">VS</div>
            <div className="team away">
              <img src={nextMatch.opponentLogo} alt={nextMatch.opponent} className="team-logo" />
              <span className="team-name">{nextMatch.opponent}</span>
            </div>
          </div>
          <div className="match-info">
            <span className="competition">{nextMatch.competition}</span>
            <span className="venue">{nextMatch.venue}</span>
          </div>
        </div>
      </div>

      {/* Player Status */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">O'yinchi Holati</h3>
        <div className="player-status">
          <div className="status-item">
            <div className="status-icon fit">
              <i className="ri-heart-pulse-line"></i>
            </div>
            <div className="status-info">
              <span className="status-label">Jismoniy Holat</span>
              <span className="status-value fit">Tayyor</span>
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-icon">
              <i className="ri-shield-check-line"></i>
            </div>
            <div className="status-info">
              <span className="status-label">Jarohat</span>
              <span className="status-value">Yo'q</span>
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-icon">
              <i className="ri-calendar-check-line"></i>
            </div>
            <div className="status-info">
              <span className="status-label">Mavjudlik</span>
              <span className="status-value available">Mavjud</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent News */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">So'nggi Yangiliklar</h3>
        <div className="news-list">
          {playerNews.map((news, index) => (
            <div key={index} className="news-item">
              <div className="news-date">{formatDate(news.date)}</div>
              <h4 className="news-title">{news.title}</h4>
              <p className="news-summary">{news.summary}</p>
              <button className="read-more">
                <i className="ri-arrow-right-line"></i>
                Batafsil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Player Awards */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Mukofotlar</h3>
        <div className="awards-list">
          <div className="award-item">
            <div className="award-icon">
              <i className="ri-trophy-line"></i>
            </div>
            <div className="award-info">
              <span className="award-title">La Liga Chempioni</span>
              <span className="award-year">2024</span>
            </div>
          </div>
          
          <div className="award-item">
            <div className="award-icon">
              <i className="ri-medal-line"></i>
            </div>
            <div className="award-info">
              <span className="award-title">Oyning Eng Yaxshi O'yinchisi</span>
              <span className="award-year">Dekabr 2024</span>
            </div>
          </div>
          
          <div className="award-item">
            <div className="award-icon">
              <i className="ri-star-line"></i>
            </div>
            <div className="award-info">
              <span className="award-title">Golden Boy Nomzodi</span>
              <span className="award-year">2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisement */}
      <div className="sidebar-section">
        <div className="advertisement">
          <img 
            src="https://readdy.ai/api/search-image?query=Football%20boots%20advertisement%20modern%20design%20colorful%20sports%20equipment%20banner&width=280&height=200&seq=sidebar-ad-1&orientation=landscape" 
            alt="Reklama" 
            className="ad-image"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;