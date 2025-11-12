
// import Header from '../../components/feature/Header';
import LeagueNavigator from './LeagueNavigator';
// import MatchCard from '../../components/feature/MatchCard';
// import RightPanel from '../../components/feature/RightPanel';
// import Footer from '../../components/feature/Footer';
// import { leagues } from '../../mocks/footballData';
import '../scss/main.scss';
import { leagues } from '../data/footballData';

const MatchCard = ({ match }) => {
  const statusLabels = {
    live: 'Jonli',
    finished: 'Yakunlandi',
    upcoming: 'Tez orada',
  };

  return (
    <article className={`match-card match-card--${match.status}`}>
      <div className="match-card__teams">
        <div className="team team--home">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="team-logo" />
          <span className="team-name">{match.homeTeam.name}</span>
        </div>
        <div className="match-card__score">
          <span>{match.score.home}</span>
          <span className="match-card__divider">-</span>
          <span>{match.score.away}</span>
        </div>
        <div className="team team--away">
          <span className="team-name">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="team-logo" />
        </div>
      </div>
      <div className="match-card__meta">
        <span className={`match-status match-status--${match.status}`}>
          {statusLabels[match.status]}
        </span>
        <span className="match-time">{match.time}</span>
      </div>
    </article>
  );
};

const RightPanel = () => (
  <div className="right-panel">
    <h3 className="right-panel__title">Tezkor yangiliklar</h3>
    <ul className="right-panel__list">
      <li>Ronaldo 800-golini urdi</li>
      <li>Messi La Ligada haftaning eng yaxshisi</li>
      <li>Guardiola: "Bizda hali ham ehtiros bor"</li>
    </ul>

    <div className="ad-block ad-block--small">
      <span>Reklama joyi 300x250</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} eScore News. Barcha huquqlar himoyalangan.</p>
  </footer>
);

const LiveScoresPage = () => {
  return (
    <div>
      
      <div className="page-title">
        <h1>LIVE SCORES</h1>  
      </div>
      <div className="newspaper-layout">
        {/* Chap panel - Liga navigatori */}
        <aside className="sidebar sidebar--left">
          <LeagueNavigator />
          
          {/* Chap reklama */}
          <div className="ad-block" style={{ marginTop: '20px' }}>
            <div className="ad-text">
              <i className="ri-advertisement-line" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
              Reklama maydoni
              <br />
              <small>200x600 banner</small>
            </div>
          </div>
        </aside>

        {/* Markaziy kontent */}
        <main className="main-content">
          {leagues.map(league => (
            <section key={league.id} id={league.id} className="league-section">
              <div className="league-section__header">
                <img 
                  src={league.logo} 
                  alt={`${league.name} logo`}
                  className="league-logo"
                />
                <h2 className="league-name">{league.name}</h2>
                <span className="matchday">{league.matchday}</span>
              </div>
              
              <div className="matches-list">
                {league.matches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          ))}
          
          {/* Qo'shimcha ligalar uchun joy */}
          <section className="league-section">
            <div className="league-section__header">
              <img 
                src="https://readdy.ai/api/search-image?query=Serie%20A%20official%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=sa1&orientation=squarish"
                alt="Serie A logo"
                className="league-logo"
              />
              <h2 className="league-name">Serie A</h2>
              <span className="matchday">Giornata 17</span>
            </div>
            
            <div className="matches-list">
              <MatchCard match={{
                id: 8,
                homeTeam: {
                  name: 'Juventus',
                  logo: 'https://readdy.ai/api/search-image?query=Juventus%20football%20club%20logo%20clean%20design&width=48&height=48&seq=juv1&orientation=squarish'
                },
                awayTeam: {
                  name: 'AC Milan',
                  logo: 'https://readdy.ai/api/search-image?query=AC%20Milan%20football%20club%20logo%20clean%20design&width=48&height=48&seq=acm1&orientation=squarish'
                },
                score: { home: 1, away: 0 },
                status: 'live',
                time: "55'"
              }} />
              
              <MatchCard match={{
                id: 9,
                homeTeam: {
                  name: 'Inter Milan',
                  logo: 'https://readdy.ai/api/search-image?query=Inter%20Milan%20football%20club%20logo%20clean%20design&width=48&height=48&seq=int1&orientation=squarish'
                },
                awayTeam: {
                  name: 'Napoli',
                  logo: 'https://readdy.ai/api/search-image?query=Napoli%20football%20club%20logo%20clean%20design&width=48&height=48&seq=nap1&orientation=squarish'
                },
                score: { home: 2, away: 2 },
                status: 'finished',
                time: "90+4'"
              }} />
            </div>
          </section>
        </main>

        {/* O'ng panel */}
        <aside className="sidebar sidebar--right">
          <RightPanel />
        </aside>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveScoresPage;
