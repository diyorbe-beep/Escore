import React from 'react';
import { playerPerformance } from '../../../mocks/playerData';

const PlayerForm: React.FC = () => {
  const formData = playerPerformance.formTrend;
  
  const getFormColor = (rating: number) => {
    if (rating >= 8.5) return '#10B981'; // Green
    if (rating >= 7.5) return '#F59E0B'; // Yellow
    if (rating >= 6.5) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  const maxRating = Math.max(...formData.map(match => match.rating));
  const minRating = Math.min(...formData.map(match => match.rating));

  return (
    <div className="player-form">
      <h2 className="section-title">So'nggi 5 O'yin Formasi</h2>
      
      <div className="form-chart">
        <div className="chart-container">
          <div className="chart-grid">
            {/* Y-axis labels */}
            <div className="y-axis">
              <span className="y-label">10.0</span>
              <span className="y-label">8.0</span>
              <span className="y-label">6.0</span>
              <span className="y-label">4.0</span>
            </div>
            
            {/* Chart area */}
            <div className="chart-area">
              <svg className="form-graph" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="80" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 50" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Form line */}
                <polyline
                  fill="none"
                  stroke="#153E75"
                  strokeWidth="3"
                  points={formData.map((match, index) => {
                    const x = (index * 80) + 40;
                    const y = 200 - ((match.rating - 4) / 6) * 200;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Data points */}
                {formData.map((match, index) => {
                  const x = (index * 80) + 40;
                  const y = 200 - ((match.rating - 4) / 6) * 200;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="6"
                      fill={getFormColor(match.rating)}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="x-axis">
                {formData.map((match, index) => (
                  <div key={index} className="x-label">
                    <span className="opponent-name">{match.opponent}</span>
                    <span className="match-rating">{match.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-summary">
          <div className="form-stats">
            <div className="form-stat">
              <span className="stat-label">O'rtacha Reyting</span>
              <span className="stat-value">
                {(formData.reduce((sum, match) => sum + match.rating, 0) / formData.length).toFixed(1)}
              </span>
            </div>
            <div className="form-stat">
              <span className="stat-label">Eng Yuqori</span>
              <span className="stat-value">{maxRating}</span>
            </div>
            <div className="form-stat">
              <span className="stat-label">Eng Past</span>
              <span className="stat-value">{minRating}</span>
            </div>
          </div>
          
          <div className="form-trend">
            <h4>Forma Tendensiyasi</h4>
            <p>
              So'nggi 5 o'yinda o'yinchi barqaror yuqori ko'rsatkichlarni namoyish etmoqda. 
              O'rtacha reyting {(formData.reduce((sum, match) => sum + match.rating, 0) / formData.length).toFixed(1)} 
              ni tashkil etadi, bu juda yaxshi natija hisoblanadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;