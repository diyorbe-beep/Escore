import React from 'react';
import { coachInfo } from '../../../mocks/coachData';

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-section about-coach">
        <h3 className="sidebar-title">Murabbiy Haqida</h3>
        <div className="about-content">
          <p className="coach-bio">
            {coachInfo.biography}
          </p>
          <div className="coach-facts">
            <div className="fact-item">
              <span className="fact-label">Tug'ilgan joyi:</span>
              <span className="fact-value">{coachInfo.birthPlace}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">O'yinchi karyerasi:</span>
              <span className="fact-value">{coachInfo.playerCareer}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Murabbiylik litsenziyasi:</span>
              <span className="fact-value">{coachInfo.coachingLicense}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section next-match">
        <h3 className="sidebar-title">Keyingi O'yin</h3>
        <div className="next-match-card">
          <div className="match-date">
            <span className="date">15 Dekabr 2024</span>
            <span className="time">21:00</span>
          </div>
          <div className="match-teams">
            <div className="team home">
              <img src={coachInfo.currentClub.logo} alt={coachInfo.currentClub.name} className="team-logo" />
              <span className="team-name">{coachInfo.currentClub.name}</span>
            </div>
            <span className="vs">VS</span>
            <div className="team away">
              <img src="https://readdy.ai/api/search-image?query=Barcelona%20football%20club%20logo%20official%20emblem%20blue%20and%20red%20colors&width=40&height=40&seq=barcelona-logo-1&orientation=squarish" alt="Barcelona" className="team-logo" />
              <span className="team-name">Barcelona</span>
            </div>
          </div>
          <div className="match-info">
            <span className="competition">La Liga</span>
            <span className="venue">Santiago Bernabeu</span>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section coach-news">
        <h3 className="sidebar-title">Murabbiy Yangiliklari</h3>
        <div className="news-list">
          <div className="news-item">
            <div className="news-date">10 Dekabr 2024</div>
            <div className="news-title">Ancelotti: "Jamoa yaxshi holatda"</div>
            <div className="news-summary">
              Real Madrid bosh murabbiyi Carlo Ancelotti keyingi o'yin oldidan optimistik kayfiyatda...
            </div>
            <button className="read-more">
              Batafsil <i className="ri-arrow-right-line"></i>
            </button>
          </div>
          
          <div className="news-item">
            <div className="news-date">8 Dekabr 2024</div>
            <div className="news-title">Taktik o'zgarishlar haqida</div>
            <div className="news-summary">
              Murabbiy yangi taktik sxemani sinab ko'rish rejasida ekanligini ma'lum qildi...
            </div>
            <button className="read-more">
              Batafsil <i className="ri-arrow-right-line"></i>
            </button>
          </div>
          
          <div className="news-item">
            <div className="news-date">5 Dekabr 2024</div>
            <div className="news-title">Shartnoma uzaytirish masalasi</div>
            <div className="news-summary">
              Klub rahbariyati bilan shartnoma uzaytirish bo'yicha muzokaralar davom etmoqda...
            </div>
            <button className="read-more">
              Batafsil <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section coaching-awards">
        <h3 className="sidebar-title">Mukofotlar</h3>
        <div className="awards-list">
          {coachInfo.achievements.map((achievement, index) => (
            <div key={index} className="award-item">
              <div className="award-icon">
                <i className="ri-trophy-line"></i>
              </div>
              <div className="award-info">
                <span className="award-title">{achievement.title}</span>
                <span className="award-year">{achievement.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sidebar-section advertisement">
        <img 
          src="https://readdy.ai/api/search-image?query=Football%20coaching%20course%20advertisement%20banner%20modern%20design%20blue%20and%20white%20colors%20tactical%20training&width=280&height=200&seq=coach-ad-sidebar-1&orientation=landscape" 
          alt="Reklama" 
          className="ad-image"
        />
      </div>
    </div>
  );
};

export default RightSidebar;