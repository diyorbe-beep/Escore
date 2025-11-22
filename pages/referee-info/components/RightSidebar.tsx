import { refereeNews, refereeAwards, nextMatch } from '../../../mocks/refereeData';

export default function RightSidebar() {
  return (
    <div className="right-sidebar-content">
      <div className="sidebar-section next-match">
        <h3>Keyingi O'yin</h3>
        <div className="next-match-card">
          <div className="match-competition">{nextMatch.competition}</div>
          <div className="match-teams-vertical">
            <div className="team-item">
              <img src={nextMatch.homeLogo} alt={nextMatch.homeTeam} />
              <span>{nextMatch.homeTeam}</span>
            </div>
            <div className="vs">VS</div>
            <div className="team-item">
              <img src={nextMatch.awayLogo} alt={nextMatch.awayTeam} />
              <span>{nextMatch.awayTeam}</span>
            </div>
          </div>
          <div className="match-info">
            <div className="info-item">
              <i className="ri-calendar-line"></i>
              {nextMatch.date}
            </div>
            <div className="info-item">
              <i className="ri-time-line"></i>
              {nextMatch.time}
            </div>
            <div className="info-item">
              <i className="ri-map-pin-line"></i>
              {nextMatch.venue}
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-section awards">
        <h3>Mukofotlar</h3>
        <div className="awards-list">
          {refereeAwards.map((award) => (
            <div key={award.id} className="award-item">
              <div className="award-icon">
                <i className="ri-trophy-line"></i>
              </div>
              <div className="award-content">
                <div className="award-title">{award.title}</div>
                <div className="award-year">{award.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section news">
        <h3>So'nggi Yangiliklar</h3>
        <div className="news-list">
          {refereeNews.slice(0, 3).map((news) => (
            <div key={news.id} className="news-item">
              <div className="news-image">
                <img src={news.image} alt={news.title} />
              </div>
              <div className="news-content">
                <div className="news-date">{news.date}</div>
                <h4>{news.title}</h4>
                <p>{news.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}