import React from 'react';
import { playerStats } from '../../../mocks/playerData';

const PlayerStatistics: React.FC = () => {
  const currentStats = playerStats.currentSeason;
  const careerStats = playerStats.careerStats;

  const getPercentage = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="player-statistics">
      <h2 className="section-title">2024-25 Mavsum Statistikalari</h2>
      
      <div className="stats-grid">
        {/* Main Stats */}
        <div className="main-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="ri-football-line"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">{currentStats.goals}</span>
              <span className="stat-label">Gollar</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="ri-hand-heart-line"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">{currentStats.assists}</span>
              <span className="stat-label">Paslar</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="ri-time-line"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">{currentStats.appearances}</span>
              <span className="stat-label">O'yinlar</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="ri-star-line"></i>
            </div>
            <div className="stat-content">
              <span className="stat-number">{currentStats.averageRating}</span>
              <span className="stat-label">O'rtacha Reyting</span>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="detailed-stats">
          <h3 className="subsection-title">Batafsil Ko'rsatkichlar</h3>
          
          <div className="stat-bars">
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Pas Aniqligi</span>
                <span className="stat-value">{currentStats.passAccuracy}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${currentStats.passAccuracy}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Nishonga Urilgan Zarbalar</span>
                <span className="stat-value">{currentStats.shotsOnTarget}/{currentStats.totalShots}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getPercentage(currentStats.shotsOnTarget, currentStats.totalShots)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Muhim Paslar</span>
                <span className="stat-value">{currentStats.keyPasses}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getPercentage(currentStats.keyPasses, 50)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Tackllar</span>
                <span className="stat-value">{currentStats.tackles}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getPercentage(currentStats.tackles, 40)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Havo Duellari</span>
                <span className="stat-value">{currentStats.aerialWins}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getPercentage(currentStats.aerialWins, 60)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="stat-bar-item">
              <div className="stat-info">
                <span className="stat-name">Dribling</span>
                <span className="stat-value">{currentStats.dribbles}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getPercentage(currentStats.dribbles, 50)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Stats */}
        <div className="career-stats">
          <h3 className="subsection-title">Karyera Statistikalari</h3>
          
          <div className="career-summary">
            <div className="career-item">
              <span className="career-label">Jami O'yinlar</span>
              <span className="career-value">{careerStats.totalAppearances}</span>
            </div>
            <div className="career-item">
              <span className="career-label">Jami Gollar</span>
              <span className="career-value">{careerStats.totalGoals}</span>
            </div>
            <div className="career-item">
              <span className="career-label">Jami Paslar</span>
              <span className="career-value">{careerStats.totalAssists}</span>
            </div>
            <div className="career-item">
              <span className="career-label">Milliy Jamoa</span>
              <span className="career-value">{careerStats.internationalCaps} o'yin</span>
            </div>
            <div className="career-item">
              <span className="career-label">Milliy Jamoa Gollari</span>
              <span className="career-value">{careerStats.internationalGoals}</span>
            </div>
          </div>
          
          <div className="clubs-history">
            <h4>O'ynagan Klublar</h4>
            <div className="clubs-list">
              {careerStats.clubsPlayed.map((club, index) => (
                <span key={index} className="club-badge">{club}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Disciplinary */}
        <div className="disciplinary-stats">
          <h3 className="subsection-title">Intizom Ko'rsatkichlari</h3>
          
          <div className="cards-stats">
            <div className="card-stat yellow">
              <i className="ri-bookmark-line"></i>
              <div className="card-info">
                <span className="card-count">{currentStats.yellowCards}</span>
                <span className="card-label">Sariq Kartochka</span>
              </div>
            </div>
            
            <div className="card-stat red">
              <i className="ri-bookmark-fill"></i>
              <div className="card-info">
                <span className="card-count">{currentStats.redCards}</span>
                <span className="card-label">Qizil Kartochka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatistics;