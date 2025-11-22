import React from 'react';
import { leagueStats } from '../../../mocks/leagueData';

const StatsCharts: React.FC = () => {
  return (
    <div className="stats-charts">
      <h2 className="stats-charts__title">Liga Statistikalari</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__header">
            <h3 className="stat-card__title">O'yin uchun gollar</h3>
            <div className="stat-card__value">{leagueStats.goalsPerMatch}</div>
          </div>
          <div className="stat-card__chart">
            <div className="bar-chart">
              <div className="bar" style={{ height: `${(leagueStats.goalsPerMatch / 5) * 100}%` }}>
                <span className="bar-label">{leagueStats.goalsPerMatch}</span>
              </div>
            </div>
          </div>
          <div className="stat-card__description">
            Har bir o'yinda o'rtacha urilgan gollar soni
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__header">
            <h3 className="stat-card__title">To'p egaligi o'rtachasi</h3>
            <div className="stat-card__value">{leagueStats.possessionAvg}%</div>
          </div>
          <div className="stat-card__chart">
            <div className="progress-circle">
              <svg className="progress-ring" width="120" height="120">
                <circle
                  className="progress-ring__circle"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="transparent"
                  r="52"
                  cx="60"
                  cy="60"
                />
                <circle
                  className="progress-ring__progress"
                  stroke="#153E75"
                  strokeWidth="8"
                  fill="transparent"
                  r="52"
                  cx="60"
                  cy="60"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - leagueStats.possessionAvg / 100)}`}
                />
              </svg>
              <div className="progress-text">{leagueStats.possessionAvg}%</div>
            </div>
          </div>
          <div className="stat-card__description">
            Jamoalar o'rtasida to'p egaligi foizi
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__header">
            <h3 className="stat-card__title">Kartochkalar o'rtachasi</h3>
            <div className="stat-card__value">{leagueStats.cardsAvg}</div>
          </div>
          <div className="stat-card__chart">
            <div className="line-chart">
              <div className="chart-line">
                <div className="chart-point" style={{ left: '20%', bottom: '30%' }}></div>
                <div className="chart-point" style={{ left: '40%', bottom: '50%' }}></div>
                <div className="chart-point" style={{ left: '60%', bottom: '40%' }}></div>
                <div className="chart-point" style={{ left: '80%', bottom: '60%' }}></div>
              </div>
            </div>
          </div>
          <div className="stat-card__description">
            Har bir o'yinda ko'rsatilgan kartochkalar soni
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__header">
            <h3 className="stat-card__title">Tomoshabinlar o'rtachasi</h3>
            <div className="stat-card__value">{leagueStats.attendanceAvg.toLocaleString()}</div>
          </div>
          <div className="stat-card__chart">
            <div className="stadium-chart">
              <i className="ri-community-line stadium-icon"></i>
              <div className="attendance-bar">
                <div 
                  className="attendance-fill" 
                  style={{ width: `${(leagueStats.attendanceAvg / 80000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="stat-card__description">
            Har bir o'yinda o'rtacha tomoshabinlar soni
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-item">
          <div className="summary-label">Jami gollar</div>
          <div className="summary-value">{leagueStats.totalGoals}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Jami o'yinlar</div>
          <div className="summary-value">{leagueStats.totalMatches}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Jamoalar soni</div>
          <div className="summary-value">20</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCharts;