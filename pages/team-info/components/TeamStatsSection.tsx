import { teamStats } from '../../../mocks/teamData';

const TeamStatsSection = () => {
  const statsData = [
    {
      title: 'O\'yin uchun gollar',
      value: '2.3',
      comparison: '+0.4',
      trend: 'up',
      description: 'Liga o\'rtachasidan yuqori'
    },
    {
      title: 'To\'p egaligi',
      value: '68%',
      comparison: '+5%',
      trend: 'up',
      description: 'Liga o\'rtachasidan yuqori'
    },
    {
      title: 'Kartochkalar',
      value: '1.8',
      comparison: '-0.2',
      trend: 'down',
      description: 'Liga o\'rtachasidan past'
    },
    {
      title: 'Aniqlik',
      value: '85%',
      comparison: '+3%',
      trend: 'up',
      description: 'Uzatmalar aniqligi'
    }
  ];

  const disciplineStats = [
    { type: 'Sariq kartochkalar', count: 28, average: '1.6 o\'yin uchun' },
    { type: 'Qizil kartochkalar', count: 2, average: '0.1 o\'yin uchun' },
    { type: 'Faollar', count: 245, average: '13.6 o\'yin uchun' }
  ];

  return (
    <div className="team-stats-section">
      <h2 className="section-title">Jamoa Statistikalari</h2>
      
      {/* Top Performers */}
      <div className="top-performers">
        <h3 className="subsection-title">Eng Yaxshi O'yinchilar</h3>
        
        <div className="performers-grid">
          <div className="performer-card">
            <div className="performer-header">
              <i className="ri-football-line"></i>
              <h4>Eng ko'p gol urgan</h4>
            </div>
            <div className="performer-content">
              <img src={teamStats.topScorer.photo} alt={teamStats.topScorer.name} className="performer-photo" />
              <div className="performer-info">
                <div className="performer-name">{teamStats.topScorer.name}</div>
                <div className="performer-stat">{teamStats.topScorer.goals} gol</div>
              </div>
            </div>
          </div>

          <div className="performer-card">
            <div className="performer-header">
              <i className="ri-hand-heart-line"></i>
              <h4>Eng ko'p pas bergan</h4>
            </div>
            <div className="performer-content">
              <img src={teamStats.topAssist.photo} alt={teamStats.topAssist.name} className="performer-photo" />
              <div className="performer-info">
                <div className="performer-name">{teamStats.topAssist.name}</div>
                <div className="performer-stat">{teamStats.topAssist.assists} pas</div>
              </div>
            </div>
          </div>

          <div className="performer-card">
            <div className="performer-header">
              <i className="ri-shield-check-line"></i>
              <h4>Eng ko'p "nol"</h4>
            </div>
            <div className="performer-content">
              <img src={teamStats.cleanSheets.photo} alt={teamStats.cleanSheets.name} className="performer-photo" />
              <div className="performer-info">
                <div className="performer-name">{teamStats.cleanSheets.name}</div>
                <div className="performer-stat">{teamStats.cleanSheets.cleanSheets} "nol"</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="team-statistics">
        <h3 className="subsection-title">Jamoa Ko'rsatkichlari</h3>
        
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <h4 className="stat-title">{stat.title}</h4>
                <div className={`stat-trend ${stat.trend}`}>
                  <i className={`ri-arrow-${stat.trend === 'up' ? 'up' : 'down'}-line`}></i>
                  {stat.comparison}
                </div>
              </div>
              
              <div className="stat-value">{stat.value}</div>
              <div className="stat-description">{stat.description}</div>
              
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${parseInt(stat.value)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discipline Statistics */}
      <div className="discipline-stats">
        <h3 className="subsection-title">Intizom Statistikalari</h3>
        
        <div className="discipline-grid">
          {disciplineStats.map((item, index) => (
            <div key={index} className="discipline-item">
              <div className="discipline-icon">
                {item.type.includes('Sariq') && <i className="ri-bookmark-line" style={{ color: '#FFC107' }}></i>}
                {item.type.includes('Qizil') && <i className="ri-bookmark-fill" style={{ color: '#DC3545' }}></i>}
                {item.type.includes('Faol') && <i className="ri-alert-line" style={{ color: '#6C757D' }}></i>}
              </div>
              
              <div className="discipline-info">
                <div className="discipline-type">{item.type}</div>
                <div className="discipline-count">{item.count}</div>
                <div className="discipline-average">{item.average}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="performance-charts">
        <h3 className="subsection-title">Grafik Ko'rsatkichlar</h3>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4 className="chart-title">O'yin uchun gollar (so'nggi 10 o'yin)</h4>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[2, 1, 3, 0, 2, 4, 1, 2, 3, 1].map((goals, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${(goals / 4) * 100}%` }}
                    ></div>
                    <div className="bar-label">{goals}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h4 className="chart-title">To'p egaligi (so'nggi 10 o'yin)</h4>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 72, 68, 70, 75, 63, 69, 71, 66, 73].map((possession, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar-fill possession" 
                      style={{ height: `${possession}%` }}
                    ></div>
                    <div className="bar-label">{possession}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSection;