import React from 'react';
import { playerInfo } from '../../../mocks/playerData';

const PlayerHeader: React.FC = () => {
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

  return (
    <div className="player-header">
      <div className="player-main-info">
        <div className="player-photo">
          <img src={playerInfo.photo} alt={playerInfo.name} />
        </div>
        
        <div className="player-details">
          <h1 className="player-name">{playerInfo.name}</h1>
          <div className="player-meta">
            <div className="club-info">
              <img src={playerInfo.clubLogo} alt={playerInfo.club} className="club-logo" />
              <span className="club-name">{playerInfo.club}</span>
            </div>
            <div className="player-number">#{playerInfo.number}</div>
          </div>
          
          <div className="player-stats-grid">
            <div className="stat-item">
              <span className="stat-label">Pozitsiya</span>
              <span className="stat-value">{playerInfo.position}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Yoshi</span>
              <span className="stat-value">{calculateAge(playerInfo.dateOfBirth)} yosh</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Millati</span>
              <span className="stat-value">{playerInfo.flag} {playerInfo.nationality}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bo'yi</span>
              <span className="stat-value">{playerInfo.height}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Vazni</span>
              <span className="stat-value">{playerInfo.weight}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bozor qiymati</span>
              <span className="stat-value">{playerInfo.marketValue}</span>
            </div>
          </div>
          
          <div className="player-actions">
            <button className="follow-btn">
              <i className="ri-heart-line"></i>
              Kuzatish
            </button>
            <button className="compare-btn">
              <i className="ri-scales-line"></i>
              Taqqoslash
            </button>
            <div className="social-links">
              <a href={`https://instagram.com/${playerInfo.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href={`https://twitter.com/${playerInfo.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;