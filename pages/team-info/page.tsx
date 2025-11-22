import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamHeader from './components/TeamHeader';
import PerformanceSummary from './components/PerformanceSummary';
import TeamStandings from './components/TeamStandings';
import MatchesSection from './components/MatchesSection';
import PlayersSection from './components/PlayersSection';
import TeamStatsSection from './components/TeamStatsSection';
import '../../styles/team-info.scss';

interface TeamInfoPageProps {
  embedded?: boolean;
}

const TeamInfoPage = ({ embedded = false }: TeamInfoPageProps) => {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const mainContent = (
    <div className="main-content">
      <TeamHeader />
      
      <div className="team-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Umumiy
        </button>
        <button 
          className={`tab-button ${activeTab === 'squad' ? 'active' : ''}`}
          onClick={() => setActiveTab('squad')}
        >
          Tarkib
        </button>
        <button 
          className={`tab-button ${activeTab === 'fixtures' ? 'active' : ''}`}
          onClick={() => setActiveTab('fixtures')}
        >
          O'yinlar
        </button>
        <button 
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistika
        </button>
      </div>

      <div className="team-content">
        {activeTab === 'overview' && (
          <>
            <PerformanceSummary />
            <TeamStandings />
            <MatchesSection />
          </>
        )}
        
        {activeTab === 'squad' && (
          <PlayersSection />
        )}
        
        {activeTab === 'fixtures' && (
          <MatchesSection showAll={true} />
        )}
        
        {activeTab === 'stats' && (
          <TeamStatsSection />
        )}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="team-info-page embedded">
        {mainContent}
      </div>
    );
  }

  // Return just main content - Layout component will handle headers and sidebars
  return (
    <div className="team-info-page">
      {mainContent}
    </div>
  );
};

export default TeamInfoPage;