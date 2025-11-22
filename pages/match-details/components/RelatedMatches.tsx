interface RelatedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  status: string;
}

interface RelatedMatchesProps {
  matches: RelatedMatch[];
}

const RelatedMatches = ({ matches }: RelatedMatchesProps) => {
  return (
    <div className="related-matches">
      <h3 className="related-matches__title">Boshqa o'yinlar</h3>
      <div className="related-matches__list">
        {matches.map((match) => (
          <div key={match.id} className="related-match">
            <div className="related-match__teams">
              <span className="related-match__home">{match.homeTeam}</span>
              <span className="related-match__vs">vs</span>
              <span className="related-match__away">{match.awayTeam}</span>
            </div>
            <div className="related-match__info">
              <span className="related-match__date">{match.date}</span>
              <span className="related-match__time">{match.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMatches;