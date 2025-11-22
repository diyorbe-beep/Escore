import { useNavigate } from 'react-router-dom';

interface Player {
  number: number;
  name: string;
  position: string;
}

interface TeamLineup {
  formation: string;
  coach: string;
  players: Player[];
  substitutes: Player[];
}

interface MatchLineupsProps {
  homeLineup: TeamLineup;
  awayLineup: TeamLineup;
  homeTeam: string;
  awayTeam: string;
}

const MatchLineups = ({ homeLineup, awayLineup, homeTeam, awayTeam }: MatchLineupsProps) => {
  const navigate = useNavigate();
  
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const handleCoachClick = (coachName?: string) => {
    if (!coachName) return;
    navigate(`/coach-info/${slugify(coachName)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, coachName?: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCoachClick(coachName);
    }
  };
  const TeamLineup = ({ lineup, teamName, isHome }: { 
    lineup: TeamLineup; 
    teamName: string; 
    isHome: boolean; 
  }) => (
    <div className={`lineup ${isHome ? 'lineup--home' : 'lineup--away'}`}>
      <div className="lineup__header">
        <h4 className="lineup__team-name">{teamName}</h4>
        <div className="lineup__formation">{lineup.formation}</div>
        <div 
          className="lineup__coach"
          onClick={() => handleCoachClick(lineup.coach)}
          onKeyDown={(e) => handleKeyDown(e, lineup.coach)}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Murabbiy: {lineup.coach}
        </div>
      </div>
      
      <div className="lineup__players">
        <h5 className="lineup__section-title">Asosiy tarkib</h5>
        {lineup.players.map((player) => (
          <div key={player.number} className="lineup__player">
            <span className="lineup__player-number">{player.number}</span>
            <span className="lineup__player-name">{player.name}</span>
            <span className="lineup__player-position">{player.position}</span>
          </div>
        ))}
      </div>
      
      <div className="lineup__substitutes">
        <h5 className="lineup__section-title">Zaxira o'yinchilar</h5>
        {lineup.substitutes.map((player) => (
          <div key={player.number} className="lineup__player lineup__player--substitute">
            <span className="lineup__player-number">{player.number}</span>
            <span className="lineup__player-name">{player.name}</span>
            <span className="lineup__player-position">{player.position}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="match-lineups">
      <h3 className="match-lineups__title">Jamoalar tarkibi</h3>
      <div className="match-lineups__container">
        <TeamLineup lineup={homeLineup} teamName={homeTeam} isHome={true} />
        <TeamLineup lineup={awayLineup} teamName={awayTeam} isHome={false} />
      </div>
    </div>
  );
};

export default MatchLineups;