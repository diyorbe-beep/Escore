import React, { useState } from 'react';
import { coachInfo } from '../../../mocks/coachData';

const CareerHistory: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedHistory = showAll ? coachInfo.careerHistory : coachInfo.careerHistory.slice(0, 5);

  return (
    <div className="career-history">
      <h2 className="section-title">Karyera Tarixi</h2>
      
      <div className="career-timeline">
        <div className="timeline-header">
          <h3 className="subsection-title">Murabbiylik Faoliyati</h3>
          <p className="timeline-description">
            {coachInfo.careerStart} yildan beri professional murabbiy sifatida faoliyat yuritmoqda
          </p>
        </div>
        
        <div className="career-chart">
          <div className="chart-container">
            <div className="chart-header">
              <span className="chart-title">Yillar bo'yicha natijalar</span>
            </div>
            <div className="chart-grid">
              <div className="y-axis">
                <div className="y-label">100%</div>
                <div className="y-label">75%</div>
                <div className="y-label">50%</div>
                <div className="y-label">25%</div>
                <div className="y-label">0%</div>
              </div>
              <div className="chart-area">
                <div className="chart-bars">
                  {coachInfo.careerHistory.slice(0, 8).map((period, index) => {
                    const winPercentage = Math.round((period.wins / period.matches) * 100);
                    return (
                      <div key={index} className="chart-bar">
                        <div 
                          className="bar-fill" 
                          style={{ height: `${winPercentage}%` }}
                          title={`${period.club} (${period.period}): ${winPercentage}%`}
                        ></div>
                        <div className="bar-label">
                          <span className="year">{period.period.split('-')[0]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="career-list">
          <div className="career-table">
            <div className="table-header">
              <div className="header-cell">Klub</div>
              <div className="header-cell">Davr</div>
              <div className="header-cell">O'yinlar</div>
              <div className="header-cell">G'alaba</div>
              <div className="header-cell">Durang</div>
              <div className="header-cell">Mag'lubiyat</div>
              <div className="header-cell">G'alaba %</div>
              <div className="header-cell">Mukofotlar</div>
            </div>
            
            <div className="table-body">
              {displayedHistory.map((period, index) => {
                const winPercentage = Math.round((period.wins / period.matches) * 100);
                const isCurrentClub = period.club === coachInfo.currentClub.name;
                
                return (
                  <div key={index} className={`table-row ${isCurrentClub ? 'current-club' : ''}`}>
                    <div className="table-cell club-cell">
                      <img src={period.logo} alt={period.club} className="club-logo" />
                      <span className="club-name">{period.club}</span>
                    </div>
                    <div className="table-cell">{period.period}</div>
                    <div className="table-cell">{period.matches}</div>
                    <div className="table-cell wins">{period.wins}</div>
                    <div className="table-cell draws">{period.draws}</div>
                    <div className="table-cell losses">{period.losses}</div>
                    <div className="table-cell">
                      <span className={`percentage ${winPercentage >= 60 ? 'good' : winPercentage >= 40 ? 'average' : 'poor'}`}>
                        {winPercentage}%
                      </span>
                    </div>
                    <div className="table-cell trophies">
                      {period.trophies > 0 ? (
                        <span className="trophy-count">
                          <i className="ri-trophy-line"></i>
                          {period.trophies}
                        </span>
                      ) : (
                        <span className="no-trophies">-</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {coachInfo.careerHistory.length > 5 && (
            <div className="career-actions">
              <button 
                className="show-more-btn"
                onClick={() => setShowAll(!showAll)}
              >
                <i className={`ri-${showAll ? 'arrow-up' : 'arrow-down'}-line`}></i>
                {showAll ? 'Kamroq ko\'rsatish' : 'Barchasini ko\'rsatish'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="career-highlights">
        <h3 className="subsection-title">Karyera Yutuqlari</h3>
        <div className="highlights-grid">
          <div className="highlight-item">
            <div className="highlight-icon">
              <i className="ri-trophy-line"></i>
            </div>
            <div className="highlight-content">
              <span className="highlight-number">{coachInfo.careerStats.trophies}</span>
              <span className="highlight-label">Jami Mukofotlar</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">
              <i className="ri-team-line"></i>
            </div>
            <div className="highlight-content">
              <span className="highlight-number">{coachInfo.careerHistory.length}</span>
              <span className="highlight-label">Boshqargan Klublar</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">
              <i className="ri-time-line"></i>
            </div>
            <div className="highlight-content">
              <span className="highlight-number">{new Date().getFullYear() - coachInfo.careerStart}</span>
              <span className="highlight-label">Yillik Tajriba</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">
              <i className="ri-percent-line"></i>
            </div>
            <div className="highlight-content">
              <span className="highlight-number">{Math.round((coachInfo.careerStats.totalWins / coachInfo.careerStats.totalMatches) * 100)}%</span>
              <span className="highlight-label">G'alaba Foizi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHistory;