interface StandingTeam {
  pos: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

interface LeagueStandingsProps {
  standings: StandingTeam[];
}

const LeagueStandings = ({ standings }: LeagueStandingsProps) => {
  return (
    <div className="league-standings">
      <h3 className="league-standings__title">Liga jadvali</h3>
      <div className="league-standings__table">
        <div className="standings-table">
          <div className="standings-table__header">
            <div className="standings-table__cell standings-table__cell--pos">O'rin</div>
            <div className="standings-table__cell standings-table__cell--team">Jamoa</div>
            <div className="standings-table__cell standings-table__cell--played">O'yin</div>
            <div className="standings-table__cell standings-table__cell--won">G</div>
            <div className="standings-table__cell standings-table__cell--drawn">D</div>
            <div className="standings-table__cell standings-table__cell--lost">M</div>
            <div className="standings-table__cell standings-table__cell--points">Ochko</div>
          </div>
          
          {standings.map((team) => (
            <div key={team.pos} className="standings-table__row">
              <div className="standings-table__cell standings-table__cell--pos">{team.pos}</div>
              <div className="standings-table__cell standings-table__cell--team">{team.team}</div>
              <div className="standings-table__cell standings-table__cell--played">{team.played}</div>
              <div className="standings-table__cell standings-table__cell--won">{team.won}</div>
              <div className="standings-table__cell standings-table__cell--drawn">{team.drawn}</div>
              <div className="standings-table__cell standings-table__cell--lost">{team.lost}</div>
              <div className="standings-table__cell standings-table__cell--points">{team.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeagueStandings;