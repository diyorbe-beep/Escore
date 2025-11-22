
interface Team {
  name: string;
  logo: string;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: { home: number | null; away: number | null };
  status: 'live' | 'finished' | 'upcoming';
  time: string;
}

import { useNavigate } from 'react-router-dom';

interface MatchCardProps {
  match: Match;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate();

  const getStatusClass = () => {
    switch (match.status) {
      case 'live':
        return 'match-card--live';
      case 'finished':
        return 'match-card--finished';
      default:
        return '';
    }
  };
  const renderStatus = () => {
    if (match.status === 'live') {
      return (
        <div className="live-indicator">
          JONLI
        </div>
      );
    }
    return (
      <div className="time">
        {match.time}
      </div>
    );
  };

  const renderScore = () => {
    if (match.score.home !== null && match.score.away !== null) {
      return `${match.score.home} - ${match.score.away}`;
    }
    return 'vs';
  };

  const handleMatchClick = () => {
    navigate(`/match-details/${slugify(`${match.homeTeam.name}-vs-${match.awayTeam.name}`)}`);
  };

  const handleTeamClick = (teamName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/team-info/${slugify(teamName)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMatchClick();
    }
  };

  return (
    <div
      className={`match-card ${getStatusClass()}`}
      onClick={handleMatchClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        className="match-card__team match-card__team--home"
        onClick={(e) => handleTeamClick(match.homeTeam.name, e)}
      >
        <span className="team-name">{match.homeTeam.name}</span>
        <img
          src={match.homeTeam.logo}
          alt={`${match.homeTeam.name} logo`}
          className="team-logo"
        />
      </div>

      <div className="match-card__score">
        {renderScore()}
      </div>

      <div
        className="match-card__team match-card__team--away"
        onClick={(e) => handleTeamClick(match.awayTeam.name, e)}
      >
        <img
          src={match.awayTeam.logo}
          alt={`${match.awayTeam.name} logo`}
          className="team-logo"
        />
        <span className="team-name">{match.awayTeam.name}</span>
      </div>

      <div className="match-card__status">
        {renderStatus()}
      </div>
    </div>
  );
};

export default MatchCard;
