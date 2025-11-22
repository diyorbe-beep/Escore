import { useNavigate } from 'react-router-dom';
import { refereeInfo } from '../../../mocks/refereeData';

interface MatchHeaderProps {
  homeTeam: {
    name: string;
    shortName: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo: string;
  };
  score: { home: number; away: number };
  status: string;
  time: string;
  date: string;
  league: string;
  stadium: string;
  referee?: string;
}

const MatchHeader = ({ homeTeam, awayTeam, score, status, time, date, league, stadium, referee }: MatchHeaderProps) => {
  const navigate = useNavigate();

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const handleRefereeClick = () => {
    // Hakam pagega o'tish - mock datadagi referee ID ishlatamiz
    navigate(`/referee-info/${refereeInfo.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRefereeClick();
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'JONLI';
      case 'finished': return 'TUGALLANDI';
      case 'upcoming': return 'REJALASHTIRILGAN';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'live': return 'match-header__status--live';
      case 'finished': return 'match-header__status--finished';
      case 'upcoming': return 'match-header__status--upcoming';
      default: return '';
    }
  };

  return (
    <div className="match-header">
      <div className="match-header__info">
        <h1 className="match-header__title">
          {homeTeam.name} vs {awayTeam.name}
        </h1>
        <div className="match-header__meta">
          <span className="match-header__date">{date}</span>
          <span className="match-header__league">{league}</span>
          <span className="match-header__stadium">{stadium}</span>
          {referee && (
            <span 
              className="match-header__referee"
              onClick={handleRefereeClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Hakam: {referee}
            </span>
          )}
        </div>
      </div>
      
      <div className="match-header__score-section">
        <div className="match-header__team match-header__team--home">
          <img src={homeTeam.logo} alt={homeTeam.name} className="match-header__team-logo" />
          <span className="match-header__team-name">{homeTeam.shortName}</span>
        </div>
        
        <div className="match-header__score">
          <div className="match-header__score-display">
            <span className="match-header__score-home">{score.home}</span>
            <span className="match-header__score-separator">-</span>
            <span className="match-header__score-away">{score.away}</span>
          </div>
          <div className={`match-header__status ${getStatusClass(status)}`}>
            {getStatusText(status)} {status === 'finished' && time}
          </div>
        </div>
        
        <div className="match-header__team match-header__team--away">
          <span className="match-header__team-name">{awayTeam.shortName}</span>
          <img src={awayTeam.logo} alt={awayTeam.name} className="match-header__team-logo" />
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;