<<<<<<< HEAD
=======
import React from 'react';
import imgs from '../assets/index'
import { BsPinAngleFill } from "react-icons/bs";
import './LiveScore.scss'
import { GiNetworkBars } from "react-icons/gi";
import { RiNotification2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';

>>>>>>> 6de8cf7d00364ea6985e890f0c5e25459cb89466

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
<<<<<<< HEAD
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
=======
    <div>
      <div className="wrapper">
        <div className="live-score-container">
          <div className="live-score-header">
            <div className="live-score-header-top">
              <div className="live-score-header-top-katigoriya">
                <div>
                  <button>ALL</button>
                  <button>LIVE</button>
                  <button>FINISHED</button>
                  <button>SCHEDULED</button>
                </div>
                <form style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label htmlFor="show-odds">Show odds</label>
                  <input type="checkbox" className="switch" id="show-odds" />
                  <span className="slider"></span>
                </form>
              </div>
              <div className="live-score-header-pinned-leagues">
                <h1>Belgilangan ligalar bu yerda tadbir sanalarida paydo bo'ladi.</h1>
              </div>
            </div>
            <div className="liva_score_bottom">
              <div className="live_score_bottom1">
                <div className="live_score_bottom1_top">
                  <div className='live_score_bottom1_top_logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png" alt="" />
                  </div>
                  <section>
                    <div className="live_score_bottom1_league_name">
                      <h5>England <span>Premier League</span></h5>
                    </div>
                    <div className="live_score_bottom1_leagueName_icon">
                      <h4>eScore ratings</h4>
                      <div>
                        <BsPinAngleFill />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="live_score_bottom_menu">
                  <div className="live_score_bottom_match_time">
                    <h3>12:30 <span>FT</span></h3>
                  </div>
                  <Link to='/AvsB' className="live_score_bottom1_teamName">
                    <div className="teams">
                      <div className="team1">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" alt="" />
                        <h2>Newcastle</h2>
                      </div>
                      <div className="team2 team1">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/1200px-Nottingham_Forest_F.C._logo.svg.png" alt="" />
                        <h2>Forest</h2>
                      </div>
                    </div>
                    <div className="live_score_bottom1_teamsleft">
                      <GiNetworkBars className='NetworkBars' />
                      <h2>1 <span>3</span></h2>
                      <div className='live_score_bottom1_teams_notification'>
                        <RiNotification2Fill className='Notification' />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="liva_score_bottom">
              <div className="live_score_bottom1">
                <div className="live_score_bottom1_top">
                  <div className='live_score_bottom1_top_logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/250px-Flag_of_Belgium.svg.png" alt="" />
                  </div>
                  <section className='section2'>
                    <div className="live_score_bottom1_league_name">
                      <h5>Belgium <span>Pro League</span></h5>
                    </div>
                    <div className="live_score_bottom1_leagueName_icon">
                      <h4>eScore ratings</h4>
                      <div>
                        <BsPinAngleFill />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="live_score_bottom_menu">
                  <div className="live_score_bottom_match_time">
                    <h3>12:30 <span>FT</span></h3>
                  </div>
                  <Link to='/AvsB' className="live_score_bottom1_teamName">
                    <div className="teams">
                      <div className="team1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/KRC_Genk_Logo_2016.svg/1200px-KRC_Genk_Logo_2016.svg.png" alt="" />
                        <h2>Genk</h2>
                      </div>
                      <div className="team2 team1 belgiumtema2">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Royal_Antwerp_Football_Club_logo.svg/1200px-Royal_Antwerp_Football_Club_logo.svg.png" alt="" />
                        <h2>Royal Antwerp</h2>
                      </div>
                    </div>
                    <div className="live_score_bottom1_teamsleft">
                      <GiNetworkBars className='NetworkBars' />
                      <h2>1 <span>3</span></h2>
                      <div className='live_score_bottom1_teams_notification'>
                        <RiNotification2Fill className='Notification' />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
>>>>>>> 6de8cf7d00364ea6985e890f0c5e25459cb89466
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
