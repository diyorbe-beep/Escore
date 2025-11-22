import React from 'react';
import { coachInfo } from '../../../mocks/coachData';

const CoachHeader: React.FC = () => {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateExperience = (startYear: number) => {
    return new Date().getFullYear() - startYear;
  };

  return (
    <div className="coach-header">
      <div className="coach-main-info">
        <div className="coach-photo">
          <img src={coachInfo.photo} alt={coachInfo.name} />
        </div>
        
        <div className="coach-details">
          <h1 className="coach-name">{coachInfo.name}</h1>
          <div className="coach-meta">
            <div className="club-info">
              <img src={coachInfo.currentClub.logo} alt={coachInfo.currentClub.name} className="club-logo" />
              <span className="club-name">{coachInfo.currentClub.name}</span>
            </div>
            <div className="coach-position">{coachInfo.position}</div>
          </div>
          
          <div className="coach-stats-grid">
            <div className="stat-item">
              <span className="stat-label">Yoshi</span>
              <span className="stat-value">{calculateAge(coachInfo.dateOfBirth)} yosh</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Millati</span>
              <span className="stat-value">{coachInfo.flag} {coachInfo.nationality}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tajriba</span>
              <span className="stat-value">{calculateExperience(coachInfo.careerStart)} yil</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Joriy Klub</span>
              <span className="stat-value">{coachInfo.currentClub.joinedYear} yildan</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Shartnoma</span>
              <span className="stat-value">{coachInfo.contractUntil} gacha</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Asosiy Taktika</span>
              <span className="stat-value">{coachInfo.preferredFormation}</span>
            </div>
          </div>
          
          <div className="coach-actions">
            <button className="follow-btn">
              <i className="ri-heart-line"></i>
              Kuzatish
            </button>
            <button className="compare-btn">
              <i className="ri-scales-line"></i>
              Taqqoslash
            </button>
            <div className="social-links">
              <a href={`https://instagram.com/${coachInfo.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href={`https://twitter.com/${coachInfo.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHeader;