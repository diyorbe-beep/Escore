
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import MatchHeader from './components/MatchHeader';
import MatchTabs from './components/MatchTabs';
import MatchTimeline from './components/MatchTimeline';
import MatchStatistics from './components/MatchStatistics';
import MatchLineups from './components/MatchLineups';
import LeagueStandings from './components/LeagueStandings';
import RelatedMatches from './components/RelatedMatches';
import Advertisement from './components/Advertisement';
import MatchCommentary from './components/MatchCommentary';
import PlayerRatings from './components/PlayerRatings';
import VideoHighlights from './components/VideoHighlights';
import { matchDetails, relatedMatches, leagueStandings } from '../../mocks/matchData';

interface MatchDetailsPageProps {
  embedded?: boolean;
}

const MatchDetailsPage = ({ embedded = false }: MatchDetailsPageProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="match-content__overview">
            <div className="overview-grid">
              <div className="overview-main">
                <MatchTimeline events={matchDetails.events} />
                <MatchCommentary />
              </div>
              <div className="overview-sidebar">
                <PlayerRatings />
                <VideoHighlights />
              </div>
            </div>
          </div>
        );
      case 'lineups':
        return (
          <MatchLineups 
            homeLineup={matchDetails.lineups.home}
            awayLineup={matchDetails.lineups.away}
            homeTeam={matchDetails.homeTeam.name}
            awayTeam={matchDetails.awayTeam.name}
          />
        );
      case 'statistics':
        return (
          <MatchStatistics 
            statistics={matchDetails.statistics}
            homeTeam={matchDetails.homeTeam.shortName}
            awayTeam={matchDetails.awayTeam.shortName}
          />
        );
      case 'standings':
        return <LeagueStandings standings={leagueStandings} />;
      case 'h2h':
        return (
          <div className="match-content__h2h">
            <h3>O'zaro o'yinlar tarixi</h3>
            <p>Bu bo'lim tez orada qo'shiladi...</p>
          </div>
        );
      case 'highlights':
        return (
          <div className="match-content__highlights">
            <VideoHighlights fullView={true} />
          </div>
        );
      default:
        return null;
    }
  };

  const mainContent = (
    <div className="match-details__content">
            <MatchHeader 
              homeTeam={matchDetails.homeTeam}
              awayTeam={matchDetails.awayTeam}
              score={matchDetails.score}
              status={matchDetails.status}
              time={matchDetails.time}
              date={matchDetails.date}
              league={matchDetails.league}
              stadium={matchDetails.stadium}
              referee={matchDetails.referee}
            />
      
      <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="match-content">
        {renderTabContent()}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="match-details-page embedded">
        <div className="match-details-main">
          {mainContent}
        </div>
      </div>
    );
  }

  return (
    <div className="match-details-page">
      <Header />
      
      <main className="match-details-main">
        <div className="match-details-container">
          {/* Left Sidebar - Advertisement */}
          <aside className="match-details__sidebar match-details__sidebar--left">
            <div className="sidebar-ad">
              <div className="sidebar-ad__banner">
                <img 
                  src="https://readdy.ai/api/search-image?query=vertical%20sports%20betting%20advertisement%20banner%20with%20clean%20modern%20design%2C%20football%20theme%2C%20blue%20and%20white%20colors%2C%20newspaper%20style%20layout&width=200&height=600&seq=ad1&orientation=portrait" 
                  alt="Reklama" 
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          {mainContent}

          {/* Right Sidebar */}
          <aside className="match-details__sidebar match-details__sidebar--right">
            <RelatedMatches matches={relatedMatches} />
            <Advertisement />
            
            <div className="sidebar-ad">
              <div className="sidebar-ad__banner">
                <img 
                  src="https://readdy.ai/api/search-image?query=vertical%20sports%20news%20advertisement%20banner%20with%20newspaper%20style%20design%2C%20football%20theme%2C%20beige%20and%20dark%20blue%20colors%2C%20classic%20typography&width=200&height=400&seq=ad2&orientation=portrait" 
                  alt="Reklama" 
                />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchDetailsPage;
