import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import PlayerHeader from './components/PlayerHeader';
import PerformanceOverview from './components/PerformanceOverview';
import MatchSummary from './components/MatchSummary';
import PlayerStatistics from './components/PlayerStatistics';
import PlayerForm from './components/PlayerForm';
import ComparisonSection from './components/ComparisonSection';
import RightSidebar from './components/RightSidebar';
import '../../styles/player-info.scss';

interface PlayerInfoPageProps {
  embedded?: boolean;
}

const PlayerInfoPage: React.FC<PlayerInfoPageProps> = ({ embedded = false }) => {
  const { playerId } = useParams<{ playerId: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const mainContent = (
    <div className="main-content">
      <PlayerHeader />
      
      <div className="content-tabs">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Umumiy Ma'lumot
          </button>
          <button 
            className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistika
          </button>
          <button 
            className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => setActiveTab('matches')}
          >
            O'yinlar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Taqqoslash
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <PerformanceOverview />
              <PlayerForm />
            </div>
          )}
          
          {activeTab === 'statistics' && (
            <PlayerStatistics />
          )}
          
          {activeTab === 'matches' && (
            <MatchSummary />
          )}
          
          {activeTab === 'comparison' && (
            <ComparisonSection />
          )}
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="player-info-page embedded">
        {mainContent}
      </div>
    );
  }

  return (
    <div className="player-info-page">
      <Header />
      
      <div className="player-content">
        {/* Left Advertisement Column */}
        <div className="left-ads">
          <div className="ad-banner">
            <img 
              src="https://readdy.ai/api/search-image?query=Sports%20betting%20advertisement%20banner%20vertical%20layout%20modern%20design%20blue%20and%20white%20colors&width=160&height=600&seq=left-ad-1&orientation=portrait" 
              alt="Reklama" 
            />
          </div>
        </div>

        {/* Main Content */}
        {mainContent}

        {/* Right Sidebar */}
        <RightSidebar />

        {/* Right Advertisement Column */}
        <div className="right-ads">
          <div className="ad-banner">
            <img 
              src="https://readdy.ai/api/search-image?query=Football%20equipment%20advertisement%20banner%20vertical%20layout%20modern%20design%20green%20and%20white%20colors&width=160&height=600&seq=right-ad-1&orientation=portrait" 
              alt="Reklama" 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlayerInfoPage;