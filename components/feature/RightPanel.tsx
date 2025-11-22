
import { topMatches, standings, nextFixtures } from '../../mocks/footballData';

interface RightPanelProps {
  showAds?: boolean;
  showDownload?: boolean;
}

const RightPanel = ({ showAds = true, showDownload = true }: RightPanelProps) => {
  return (
    <div className="right-panel">
      {/* Bugungi eng yaxshi o'yinlar */}
      <div className="panel-block">
        <h4 className="panel-block__title">Bugungi TOP o'yinlar</h4>
        <div className="panel-block__content">
          {topMatches.map(match => (
            <div key={match.id} className="fixture-item">
              <div className="teams">
                <strong>{match.homeTeam}</strong> vs <strong>{match.awayTeam}</strong>
                <br />
                <small>{match.competition}</small>
              </div>
              <div className="time">{match.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Liga jadvali */}
      <div className="panel-block">
        <h4 className="panel-block__title">Premier League jadvali</h4>
        <div className="panel-block__content">
          <table className="standings-table">
            <thead>
              <tr>
                <th className="pos">#</th>
                <th>Jamoa</th>
                <th className="pts">Ochko</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(team => (
                <tr key={team.pos}>
                  <td className="pos">{team.pos}</td>
                  <td>{team.team}</td>
                  <td className="pts">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kelgusi o'yinlar */}
      <div className="panel-block">
        <h4 className="panel-block__title">Kelgusi o'yinlar</h4>
        <div className="panel-block__content">
          {nextFixtures.map(fixture => (
            <div key={fixture.id} className="fixture-item">
              <div className="teams">
                <strong>{fixture.homeTeam}</strong> vs <strong>{fixture.awayTeam}</strong>
              </div>
              <div className="time">{fixture.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reklama bloki */}
      {showAds && (
        <div className="ad-block">
          <div className="ad-text">
            <i className="ri-advertisement-line" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
            Reklama maydoni
            <br />
            <small>Bu yerda reklama joylashadi</small>
          </div>
        </div>
      )}

      {/* Ilova reklama */}
      {showDownload && (
        <div className="panel-block">
          <h4 className="panel-block__title">eScore ilovasini yuklab oling</h4>
          <div className="panel-block__content">
            <p>Barcha sport yangiliklar va jonli natijalarni telefoningizda kuzating!</p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <button style={{ 
                padding: '8px 16px', 
                background: 'var(--accent-color)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <i className="ri-apple-line"></i> App Store
              </button>
              <button style={{ 
                padding: '8px 16px', 
                background: '#34A853', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <i className="ri-google-play-line"></i> Google Play
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
