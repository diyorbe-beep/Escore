import React from 'react';
import { playerPerformance, heatmapData } from '../../../mocks/playerData';

const PerformanceOverview: React.FC = () => {
  return (
    <div className="performance-overview">
      <h2 className="section-title">Ko'rsatkichlar Tahlili</h2>
      
      <div className="performance-grid">
        {/* Radar Chart */}
        <div className="radar-section">
          <h3 className="subsection-title">O'yinchi Qobiliyatlari</h3>
          <div className="radar-chart">
            <div className="radar-stats">
              {playerPerformance.radarStats.map((stat, index) => (
                <div key={index} className="radar-stat">
                  <div className="stat-info">
                    <span className="stat-name">{stat.skill}</span>
                    <span className="stat-score">{stat.value}/100</span>
                  </div>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="heatmap-section">
          <h3 className="subsection-title">Maydon Bo'ylab Faollik</h3>
          <div className="heatmap">
            <div className="field-zones">
              {heatmapData.map((zone, index) => (
                <div key={index} className="zone-item">
                  <div className="zone-info">
                    <span className="zone-name">{zone.zone}</span>
                    <span className="zone-activity">{zone.activity}%</span>
                  </div>
                  <div className="activity-bar">
                    <div 
                      className="activity-fill" 
                      style={{ width: `${zone.activity}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="field-visual">
              <div className="football-field">
                <div className="field-section defense" style={{ opacity: 0.3 }}>
                  <span>Mudofaa</span>
                </div>
                <div className="field-section midfield" style={{ opacity: 0.9 }}>
                  <span>Markaziy maydon</span>
                </div>
                <div className="field-section attack" style={{ opacity: 0.7 }}>
                  <span>Hujum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;