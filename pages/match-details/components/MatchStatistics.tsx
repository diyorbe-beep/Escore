interface Statistics {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  passes: { home: number; away: number };
  passAccuracy: { home: number; away: number };
}

interface MatchStatisticsProps {
  statistics: Statistics;
  homeTeam: string;
  awayTeam: string;
}

const MatchStatistics = ({ statistics, homeTeam, awayTeam }: MatchStatisticsProps) => {
  const StatRow = ({ label, homeValue, awayValue, isPercentage = false }: {
    label: string;
    homeValue: number;
    awayValue: number;
    isPercentage?: boolean;
  }) => {
    const total = homeValue + awayValue;
    const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
    const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;

    return (
      <div className="stat-row">
        <div className="stat-row__home">{homeValue}{isPercentage ? '%' : ''}</div>
        <div className="stat-row__label">
          <span>{label}</span>
          <div className="stat-row__bar">
            <div 
              className="stat-row__bar-home" 
              style={{ width: `${isPercentage ? homeValue : homePercentage}%` }}
            ></div>
            <div 
              className="stat-row__bar-away" 
              style={{ width: `${isPercentage ? awayValue : awayPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-row__away">{awayValue}{isPercentage ? '%' : ''}</div>
      </div>
    );
  };

  return (
    <div className="match-statistics">
      <h3 className="match-statistics__title">Statistika</h3>
      <div className="match-statistics__teams">
        <div className="match-statistics__team-name">{homeTeam}</div>
        <div className="match-statistics__team-name">{awayTeam}</div>
      </div>
      <div className="match-statistics__stats">
        <StatRow 
          label="To'p egaligi" 
          homeValue={statistics.possession.home} 
          awayValue={statistics.possession.away} 
          isPercentage={true}
        />
        <StatRow 
          label="Zarbalar" 
          homeValue={statistics.shots.home} 
          awayValue={statistics.shots.away} 
        />
        <StatRow 
          label="Aniq zarbalar" 
          homeValue={statistics.shotsOnTarget.home} 
          awayValue={statistics.shotsOnTarget.away} 
        />
        <StatRow 
          label="Korner zarbalar" 
          homeValue={statistics.corners.home} 
          awayValue={statistics.corners.away} 
        />
        <StatRow 
          label="Qoidabuzarliklar" 
          homeValue={statistics.fouls.home} 
          awayValue={statistics.fouls.away} 
        />
        <StatRow 
          label="Sariq kartochkalar" 
          homeValue={statistics.yellowCards.home} 
          awayValue={statistics.yellowCards.away} 
        />
        <StatRow 
          label="Qizil kartochkalar" 
          homeValue={statistics.redCards.home} 
          awayValue={statistics.redCards.away} 
        />
        <StatRow 
          label="Uzatmalar" 
          homeValue={statistics.passes.home} 
          awayValue={statistics.passes.away} 
        />
        <StatRow 
          label="Uzatma aniqligi" 
          homeValue={statistics.passAccuracy.home} 
          awayValue={statistics.passAccuracy.away} 
          isPercentage={true}
        />
      </div>
    </div>
  );
};

export default MatchStatistics;