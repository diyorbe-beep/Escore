import { injuryNews, upcomingMatches } from '../../../mocks/teamData';

const RightSidebar = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="right-sidebar">
      {/* Injury News */}
      <div className="panel-block">
        <h3 className="panel-block__title">
          <i className="ri-heart-pulse-line"></i>
          Jarohatlar Yangiliklari
        </h3>
        <div className="panel-block__content">
          {injuryNews.length > 0 ? (
            <div className="injury-list">
              {injuryNews.map((injury, index) => (
                <div key={index} className="injury-item">
                  <div className="injury-player">{injury.player}</div>
                  <div className="injury-type">{injury.injury}</div>
                  <div className="injury-status">
                    <span className="status-badge">{injury.status}</span>
                    <span className="return-date">Qaytish: {formatDate(injury.expectedReturn)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-injuries">
              <i className="ri-check-line"></i>
              <p>Hozirda jarohatli o'yinchilar yo'q</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Match */}
      <div className="panel-block">
        <h3 className="panel-block__title">
          <i className="ri-calendar-event-line"></i>
          Keyingi O'yin
        </h3>
        <div className="panel-block__content">
          {upcomingMatches.length > 0 && (
            <div className="next-match">
              <div className="match-date">
                <div className="date">{formatDate(upcomingMatches[0].date)}</div>
                <div className="time">{upcomingMatches[0].time}</div>
              </div>
              
              <div className="match-opponent">
                <img src={upcomingMatches[0].opponentLogo} alt={upcomingMatches[0].opponent} className="opponent-logo" />
                <div className="opponent-info">
                  <div className="opponent-name">{upcomingMatches[0].opponent}</div>
                  <div className="match-venue">{upcomingMatches[0].venue}</div>
                </div>
              </div>
              
              <div className="match-competition">{upcomingMatches[0].competition}</div>
              
              <button className="match-preview-btn">
                O'yin haqida
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Players of the Month */}
      <div className="panel-block">
        <h3 className="panel-block__title">
          <i className="ri-star-line"></i>
          Oy Futbolchilari
        </h3>
        <div className="panel-block__content">
          <div className="monthly-awards">
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <div className="award-info">
                <div className="award-title">Oy futbolchisi</div>
                <div className="award-winner">Jude Bellingham</div>
              </div>
            </div>
            
            <div className="award-item">
              <div className="award-icon">🥅</div>
              <div className="award-info">
                <div className="award-title">Oy darvozaboni</div>
                <div className="award-winner">Thibaut Courtois</div>
              </div>
            </div>
            
            <div className="award-item">
              <div className="award-icon">⚽</div>
              <div className="award-info">
                <div className="award-title">Oy goli</div>
                <div className="award-winner">Vinícius Jr.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer News */}
      <div className="panel-block">
        <h3 className="panel-block__title">
          <i className="ri-exchange-line"></i>
          Transfer Yangiliklari
        </h3>
        <div className="panel-block__content">
          <div className="transfer-news">
            <div className="transfer-item">
              <div className="transfer-type incoming">Keldi</div>
              <div className="transfer-info">
                <div className="player-name">Kylian Mbappé</div>
                <div className="transfer-details">PSG dan, 180M €</div>
              </div>
            </div>
            
            <div className="transfer-item">
              <div className="transfer-type rumor">Mish-mish</div>
              <div className="transfer-info">
                <div className="player-name">Erling Haaland</div>
                <div className="transfer-details">Man City dan qiziqish</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisement */}
      <div className="ad-block">
        <div className="ad-text">Reklama maydoni</div>
      </div>
    </div>
  );
};

export default RightSidebar;