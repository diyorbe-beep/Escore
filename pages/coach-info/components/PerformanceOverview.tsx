import React from 'react';
import { coachInfo } from '../../../mocks/coachData';

const PerformanceOverview: React.FC = () => {
  const currentSeasonStats = coachInfo.currentSeasonStats;
  const careerStats = coachInfo.careerStats;
  
  const winPercentage = Math.round((currentSeasonStats.wins / currentSeasonStats.matches) * 100);
  const drawPercentage = Math.round((currentSeasonStats.draws / currentSeasonStats.matches) * 100);
  const lossPercentage = Math.round((currentSeasonStats.losses / currentSeasonStats.matches) * 100);

  const careerWinPercentage = Math.round((careerStats.totalWins / careerStats.totalMatches) * 100);

  return (
    <div className="performance-overview">
      <h2 className="section-title">Mavsum Ko'rsatkichlari</h2>
      
      <div className="performance-grid">
        <div className="current-season">
          <h3 className="subsection-title">2024/25 Mavsum</h3>
          <div className="season-stats">
            <div className="stats-summary">
              <div className="stat-card wins">
                <div className="stat-icon">
                  <i className="ri-trophy-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{currentSeasonStats.wins}</span>
                  <span className="stat-label">G'alaba</span>
                </div>
              </div>
              
              <div className="stat-card draws">
                <div className="stat-icon">
                  <i className="ri-subtract-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{currentSeasonStats.draws}</span>
                  <span className="stat-label">Durang</span>
                </div>
              </div>
              
              <div className="stat-card losses">
                <div className="stat-icon">
                  <i className="ri-close-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{currentSeasonStats.losses}</span>
                  <span className="stat-label">Mag'lubiyat</span>
                </div>
              </div>
              
              <div className="stat-card total">
                <div className="stat-icon">
                  <i className="ri-football-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{currentSeasonStats.matches}</span>
                  <span className="stat-label">Jami O'yinlar</span>
                </div>
              </div>
            </div>
            
            <div className="performance-bars">
              <div className="performance-item">
                <div className="performance-info">
                  <span className="performance-label">G'alaba Foizi</span>
                  <span className="performance-value">{winPercentage}%</span>
                </div>
                <div className="performance-bar">
                  <div className="performance-fill wins" style={{ width: `${winPercentage}%` }}></div>
                </div>
              </div>
              
              <div className="performance-item">
                <div className="performance-info">
                  <span className="performance-label">Durang Foizi</span>
                  <span className="performance-value">{drawPercentage}%</span>
                </div>
                <div className="performance-bar">
                  <div className="performance-fill draws" style={{ width: `${drawPercentage}%` }}></div>
                </div>
              </div>
              
              <div className="performance-item">
                <div className="performance-info">
                  <span className="performance-label">Mag'lubiyat Foizi</span>
                  <span className="performance-value">{lossPercentage}%</span>
                </div>
                <div className="performance-bar">
                  <div className="performance-fill losses" style={{ width: `${lossPercentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="career-overview">
          <h3 className="subsection-title">Karyera Ko'rsatkichlari</h3>
          <div className="career-stats">
            <div className="career-summary">
              <div className="career-item">
                <span className="career-label">Jami O'yinlar</span>
                <span className="career-value">{careerStats.totalMatches}</span>
              </div>
              <div className="career-item">
                <span className="career-label">Jami G'alabalar</span>
                <span className="career-value">{careerStats.totalWins}</span>
              </div>
              <div className="career-item">
                <span className="career-label">G'alaba Foizi</span>
                <span className="career-value">{careerWinPercentage}%</span>
              </div>
              <div className="career-item">
                <span className="career-label">Mukofotlar</span>
                <span className="career-value">{careerStats.trophies}</span>
              </div>
            </div>
            
            <div className="achievements">
              <h4>Asosiy Yutuqlar</h4>
              <div className="achievements-list">
                {coachInfo.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div className="achievement-icon">
                      <i className="ri-medal-line"></i>
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-title">{achievement.title}</span>
                      <span className="achievement-year">{achievement.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="coaching-style">
        <h3 className="subsection-title">Murabbiylik Uslubi</h3>
        <div className="style-description">
          <p>{coachInfo.coachingStyle.description}</p>
          <div className="style-points">
            <h4>Asosiy Xususiyatlar:</h4>
            <ul>
              {coachInfo.coachingStyle.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;