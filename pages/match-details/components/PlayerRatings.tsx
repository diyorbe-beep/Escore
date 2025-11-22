
const PlayerRatings = () => {
  const playerRatings = {
    home: [
      { name: "Nick Pope", position: "GK", rating: 7.2 },
      { name: "Kieran Trippier", position: "RB", rating: 8.1 },
      { name: "Fabian Schar", position: "CB", rating: 7.8 },
      { name: "Sven Botman", position: "CB", rating: 7.5 },
      { name: "Dan Burn", position: "LB", rating: 7.0 },
      { name: "Bruno Guimaraes", position: "CM", rating: 8.7 },
      { name: "Joelinton", position: "CM", rating: 7.9 },
      { name: "Miguel Almiron", position: "RW", rating: 7.3 },
      { name: "Anthony Gordon", position: "LW", rating: 7.6 },
      { name: "Alexander Isak", position: "ST", rating: 8.5 },
      { name: "Callum Wilson", position: "ST", rating: 7.4 }
    ],
    away: [
      { name: "Matz Sels", position: "GK", rating: 6.8 },
      { name: "Neco Williams", position: "RB", rating: 6.5 },
      { name: "Willy Boly", position: "CB", rating: 6.2 },
      { name: "Murillo", position: "CB", rating: 6.7 },
      { name: "Ola Aina", position: "LB", rating: 6.9 },
      { name: "Ryan Yates", position: "CM", rating: 6.8 },
      { name: "Danilo", position: "CM", rating: 6.4 },
      { name: "Anthony Elanga", position: "RW", rating: 7.1 },
      { name: "Morgan Gibbs-White", position: "AM", rating: 7.3 },
      { name: "Brennan Johnson", position: "LW", rating: 7.8 },
      { name: "Taiwo Awoniyi", position: "ST", rating: 6.6 }
    ]
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.0) return 'rating--excellent';
    if (rating >= 7.5) return 'rating--good';
    if (rating >= 7.0) return 'rating--average';
    if (rating >= 6.5) return 'rating--below';
    return 'rating--poor';
  };

  return (
    <div className="player-ratings">
      <h3 className="player-ratings__title">O'yinchi Baholari</h3>
      
      <div className="ratings__teams">
        <div className="ratings__team">
          <h4 className="ratings__team-name">Newcastle United</h4>
          <div className="ratings__players">
            {playerRatings.home.map((player, index) => (
              <div key={index} className="rating__player">
                <div className="rating__player-info">
                  <span className="rating__player-name">{player.name}</span>
                  <span className="rating__player-position">{player.position}</span>
                </div>
                <div className={`rating__score ${getRatingColor(player.rating)}`}>
                  {player.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ratings__team">
          <h4 className="ratings__team-name">Nottingham Forest</h4>
          <div className="ratings__players">
            {playerRatings.away.map((player, index) => (
              <div key={index} className="rating__player">
                <div className="rating__player-info">
                  <span className="rating__player-name">{player.name}</span>
                  <span className="rating__player-position">{player.position}</span>
                </div>
                <div className={`rating__score ${getRatingColor(player.rating)}`}>
                  {player.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRatings;
