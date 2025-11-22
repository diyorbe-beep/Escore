
import React, { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import LeagueNavigator from '../../components/feature/LeagueNavigator';
import MatchCard from '../../components/feature/MatchCard';
import RightPanel from '../../components/feature/RightPanel';
import Footer from '../../components/feature/Footer';
import { leagues } from '../../mocks/footballData';
import { teamInfo } from '../../mocks/teamData';
import { playerInfo } from '../../mocks/playerData';
import { coachInfo } from '../../mocks/coachData';
import { refereeInfo } from '../../mocks/refereeData';
import { matchDetails } from '../../mocks/matchData';
import '../../styles/main.scss';

interface LiveScoresPageProps {
  embedded?: boolean;
}

const LiveScoresPage = ({ embedded = false }: LiveScoresPageProps) => {
  const navigate = useNavigate();

  const finishedMatches = [matchDetails];

  const spotlightCards = [
    {
      title: 'Klub maʼlumoti',
      name: teamInfo.name,
      meta: `${teamInfo.city}, ${teamInfo.country}`,
      image: teamInfo.logo,
      action: () => navigate(`/team-info/${teamInfo.id}`)
    },
    {
      title: 'Oʻyinchi maʼlumoti',
      name: playerInfo.name,
      meta: `${playerInfo.club} • ${playerInfo.position}`,
      image: playerInfo.photo,
      action: () => navigate(`/player-info/${playerInfo.id}`)
    },
    {
      title: 'Murabbiy maʼlumoti',
      name: coachInfo.name,
      meta: `${coachInfo.currentClub.name} • ${coachInfo.position}`,
      image: coachInfo.currentClub.logo,
      action: () => navigate(`/coach-info/${coachInfo.id}`)
    },
    {
      title: 'Hakam maʼlumoti',
      name: refereeInfo.name,
      meta: `${refereeInfo.nationality} • ${refereeInfo.currentLevel}`,
      image: refereeInfo.photo,
      action: () => navigate(`/referee-info/${refereeInfo.id}`)
    }
  ];

  const handleLeagueSelect = (leagueId: string) => {
    navigate(`/league-info/${leagueId}`);
  };

  const handleFinishedMatchClick = () => {
    navigate(`/match-details/${matchDetails.id}`);
  };

  const handleSpotlightKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    action: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div>
      {!embedded && <Header />}
      
      <div className="page-title">
        <h1>LIVE SCORES</h1>
      </div>
      
      <div className={`newspaper-layout ${embedded ? 'embedded' : ''}`}>
        {!embedded && (
          <aside className="sidebar sidebar--left">
            <LeagueNavigator onLeagueSelect={handleLeagueSelect} />
            
            <div className="ad-block" style={{ marginTop: '20px' }}>
              <div className="ad-text">
                <i className="ri-advertisement-line" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                Reklama maydoni
                <br />
                <small>200x600 banner</small>
              </div>
            </div>
          </aside>
        )}

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
                  <MatchCard key={match.id} match={match as any} />
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
                time: '55\''
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
                time: '90+4\''
              }} />
            </div>
          </section>

          <section className="finished-matches">
            <h2>O‘ynalib bo‘lgan o‘yinlar</h2>
            <div className="finished-matches__list">
              {finishedMatches.map(match => (
                <button
                  key={match.id}
                  className="finished-match-card"
                  type="button"
                  onClick={handleFinishedMatchClick}
                >
                  <div className="teams">
                    <div className="team">
                      <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                      <span>{match.homeTeam.name}</span>
                    </div>
                    <strong className="score">
                      {match.score.home} - {match.score.away}
                    </strong>
                    <div className="team">
                      <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                      <span>{match.awayTeam.name}</span>
                    </div>
                  </div>
                  <div className="meta">
                    <span>{match.league}</span>
                    <span>{match.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="spotlight-grid">
            <h2>Bugungi Spotlight</h2>
            <div className="spotlight-grid__content">
              {spotlightCards.map(card => (
                <article
                  key={card.title}
                  className="spotlight-card"
                  onClick={card.action}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleSpotlightKeyDown(e, card.action)}
                >
                  <div className="spotlight-card__badge">{card.title}</div>
                  <div className="spotlight-card__body">
                    <div className="spotlight-card__image">
                      <img src={card.image} alt={card.name} />
                    </div>
                    <div className="spotlight-card__info">
                      <h3>{card.name}</h3>
                      <p>{card.meta}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {!embedded && (
          <aside className="sidebar sidebar--right">
            <RightPanel />
          </aside>
        )}
      </div>
      
      {!embedded && <Footer />}
    </div>
  );
};

export default LiveScoresPage;
