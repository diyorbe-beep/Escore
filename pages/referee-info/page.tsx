import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import RefereeHeader from './components/RefereeHeader';
import PerformanceOverview from './components/PerformanceOverview';
import MatchesSection from './components/MatchesSection';
import CareerStatistics from './components/CareerStatistics';
import RightSidebar from './components/RightSidebar';
import '../../styles/referee-info.scss';

interface RefereePageProps {
  embedded?: boolean;
}

export default function RefereePage({ embedded = false }: RefereePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const mainContent = (
    <main className="referee-main-content">
      <RefereeHeader />

      <div className="referee-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Umumiy Ma'lumot
        </button>
        <button 
          className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistika
        </button>
        <button 
          className={`tab-button ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          O'yinlar
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <PerformanceOverview />
        </>
      )}

      {activeTab === 'statistics' && (
        <>
          <CareerStatistics />
        </>
      )}

      {activeTab === 'matches' && (
        <>
          <MatchesSection />
        </>
      )}
    </main>
  );

  if (embedded) {
    return (
      <div className="referee-page embedded">
        {mainContent}
      </div>
    );
  }

  return (
    <div className="referee-page">
      <Header />
      
      <div className="referee-container">
        <div className="referee-left-ad">
          <div className="ad-placeholder">
            <p>Reklama</p>
          </div>
        </div>

        {mainContent}

        <aside className="referee-right-sidebar">
          <RightSidebar />
        </aside>

        <div className="referee-right-ad">
          <div className="ad-placeholder">
            <p>Reklama</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}