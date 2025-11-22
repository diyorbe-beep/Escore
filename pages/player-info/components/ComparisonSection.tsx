import React, { useState } from 'react';
import { playerComparison } from '../../../mocks/playerData';

const ComparisonSection: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('pedri');
  const { currentPlayer, compareWith } = playerComparison;

  const comparisonStats = [
    { label: 'Gollar', current: currentPlayer.goals, compare: compareWith.goals },
    { label: 'Paslar', current: currentPlayer.assists, compare: compareWith.assists },
    { label: 'O\'rtacha Reyting', current: currentPlayer.rating, compare: compareWith.rating },
    { label: 'Pas Aniqligi (%)', current: currentPlayer.passAccuracy, compare: compareWith.passAccuracy },
    { label: 'Tackllar', current: currentPlayer.tackles, compare: compareWith.tackles }
  ];

  const getComparisonColor = (current: number, compare: number) => {
    if (current > compare) return 'better';
    if (current < compare) return 'worse';
    return 'equal';
  };

  const availablePlayers = [
    { id: 'pedri', name: 'Pedri', club: 'Barcelona' },
    { id: 'gavi', name: 'Gavi', club: 'Barcelona' },
    { id: 'camavinga', name: 'Camavinga', club: 'Real Madrid' },
    { id: 'rice', name: 'Declan Rice', club: 'Arsenal' }
  ];

  return (
    <div className="comparison-section">
      <h2 className="section-title">O'yinchilarni Taqqoslash</h2>
      
      <div className="player-selector">
        <label htmlFor="compare-player">Taqqoslash uchun o'yinchi tanlang:</label>
        <select 
          id="compare-player" 
          value={selectedPlayer} 
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="player-select"
        >
          {availablePlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player.name} ({player.club})
            </option>
          ))}
        </select>
      </div>

      <div className="comparison-cards">
        {/* Current Player Card */}
        <div className="player-card current">
          <div className="player-header">
            <img src={currentPlayer.photo} alt={currentPlayer.name} className="player-photo" />
            <div className="player-info">
              <h3 className="player-name">{currentPlayer.name}</h3>
              <span className="player-club">Real Madrid</span>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        {/* Compare Player Card */}
        <div className="player-card compare">
          <div className="player-header">
            <img src={compareWith.photo} alt={compareWith.name} className="player-photo" />
            <div className="player-info">
              <h3 className="player-name">{compareWith.name}</h3>
              <span className="player-club">Barcelona</span>
            </div>
          </div>
        </div>
      </div>

      <div className="comparison-stats">
        <h3 className="subsection-title">Statistik Taqqoslash</h3>
        
        <div className="stats-comparison">
          {comparisonStats.map((stat, index) => (
            <div key={index} className="stat-comparison-row">
              <div className="stat-label">{stat.label}</div>
              
              <div className="stat-values">
                <div className={`stat-value current ${getComparisonColor(stat.current, stat.compare)}`}>
                  {stat.current}
                </div>
                
                <div className="stat-bars">
                  <div className="stat-bar current">
                    <div 
                      className="stat-fill" 
                      style={{ 
                        width: `${Math.max(stat.current, stat.compare) > 0 ? (stat.current / Math.max(stat.current, stat.compare)) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <div className="stat-bar compare">
                    <div 
                      className="stat-fill" 
                      style={{ 
                        width: `${Math.max(stat.current, stat.compare) > 0 ? (stat.compare / Math.max(stat.current, stat.compare)) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className={`stat-value compare ${getComparisonColor(stat.compare, stat.current)}`}>
                  {stat.compare}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="comparison-summary">
          <h4>Taqqoslash Xulosasi</h4>
          <p>
            Jude Bellingham hujum ko'rsatkichlarida ustunlik qilsa-da, Pedri pas berish va 
            o'yin tashkil etishda kuchli tomonlarini namoyish etmoqda. Har ikkala o'yinchi 
            o'z pozitsiyalarida yuqori darajada o'ynaydi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;