import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamPlayers } from '../../../mocks/teamData';

const PlayersSection = () => {
  const [selectedPosition, setSelectedPosition] = useState('all');
  const navigate = useNavigate();

  const positions = [
    { key: 'all', label: 'Barcha o\'yinchilar' },
    { key: 'GK', label: 'Darvozabonlar' },
    { key: 'CB', label: 'Himoyachilar' },
    { key: 'RB', label: 'Himoyachilar' },
    { key: 'LB', label: 'Himoyachilar' },
    { key: 'CM', label: 'Yarim himoyachilar' },
    { key: 'AM', label: 'Yarim himoyachilar' },
    { key: 'ST', label: 'Hujumchilar' },
    { key: 'LW', label: 'Hujumchilar' },
    { key: 'RW', label: 'Hujumchilar' }
  ];

  const positionGroups = [
    { key: 'all', label: 'Barchasi' },
    { key: 'goalkeepers', label: 'Darvozabonlar', positions: ['GK'] },
    { key: 'defenders', label: 'Himoyachilar', positions: ['CB', 'RB', 'LB'] },
    { key: 'midfielders', label: 'Yarim himoyachilar', positions: ['CM', 'AM'] },
    { key: 'forwards', label: 'Hujumchilar', positions: ['ST', 'LW', 'RW'] }
  ];

  const filteredPlayers = selectedPosition === 'all' 
    ? teamPlayers 
    : teamPlayers.filter(player => {
        const group = positionGroups.find(g => g.key === selectedPosition);
        return group ? group.positions.includes(player.position) : false;
      });

  const getPositionName = (position: string) => {
    const positionNames: { [key: string]: string } = {
      'GK': 'Darvozabon',
      'CB': 'Markaziy himoyachi',
      'RB': 'O\'ng himoyachi',
      'LB': 'Chap himoyachi',
      'CM': 'Markaziy yarim himoyachi',
      'AM': 'Hujumchi yarim himoyachi',
      'ST': 'Markaziy hujumchi',
      'LW': 'Chap qanot hujumchi',
      'RW': 'O\'ng qanot hujumchi'
    };
    return positionNames[position] || position;
  };

  return (
    <div className="players-section">
      <h2 className="section-title">Tarkib 2025</h2>
      
      <div className="position-filters">
        {positionGroups.map((group) => (
          <button
            key={group.key}
            className={`filter-btn ${selectedPosition === group.key ? 'active' : ''}`}
            onClick={() => setSelectedPosition(group.key)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <div 
            key={player.id} 
            className="player-card"
            onClick={() => navigate(`/player-info/${player.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/player-info/${player.id}`);
              }
            }}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div className="player-photo">
              <img src={player.photo} alt={player.name} />
              <div className="player-number">{player.number}</div>
            </div>
            
            <div className="player-info">
              <h3 className="player-name">{player.name}</h3>
              <div className="player-position">{getPositionName(player.position)}</div>
              
              <div className="player-details">
                <div className="detail-item">
                  <span className="flag">{player.flag}</span>
                  <span className="nationality">{player.nationality}</span>
                </div>
                <div className="detail-item">
                  <i className="ri-calendar-line"></i>
                  <span className="age">{player.age} yosh</span>
                </div>
              </div>
              
              <div className="player-stats">
                <div className="stat">
                  <div className="stat-value">{player.appearances}</div>
                  <div className="stat-label">O'yinlar</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{player.goals}</div>
                  <div className="stat-label">Gollar</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{player.assists}</div>
                  <div className="stat-label">Paslar</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="no-players">
          <i className="ri-user-line"></i>
          <p>Tanlangan pozitsiyada o'yinchilar topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default PlayersSection;