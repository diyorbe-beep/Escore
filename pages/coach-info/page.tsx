import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CoachHeader from './components/CoachHeader';
import PerformanceOverview from './components/PerformanceOverview';
import CareerHistory from './components/CareerHistory';
import MatchesSection from './components/MatchesSection';
import RightSidebar from './components/RightSidebar';
import '../../styles/coach-info.scss';

interface CoachInfoPageProps {
  embedded?: boolean;
}

const CoachInfoPage: React.FC<CoachInfoPageProps> = ({ embedded = false }) => {
  const { coachId } = useParams<{ coachId: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="coach-info-page">
      {!embedded && <Header />}
      
      <div className="coach-content">
        {/* Left Advertisement Column */}
        <div className="left-ads">
          <div className="ad-banner">
            <img 
              src="https://readdy.ai/api/search-image?query=Football%20coaching%20equipment%20advertisement%20banner%20vertical%20layout%20modern%20design%20blue%20and%20white%20colors%20tactical%20board%20whistle&width=160&height=600&seq=left-ad-coach-1&orientation=portrait" 
              alt="Reklama" 
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <CoachHeader />
          
          <div className="content-tabs">
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Umumiy Ma'lumot
              </button>
              <button 
                className={`tab-btn ${activeTab === 'career' ? 'active' : ''}`}
                onClick={() => setActiveTab('career')}
              >
                Karyera Tarixi
              </button>
              <button 
                className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
                onClick={() => setActiveTab('matches')}
              >
                So'nggi O'yinlar
              </button>
              <button 
                className={`tab-btn ${activeTab === 'tactics' ? 'active' : ''}`}
                onClick={() => setActiveTab('tactics')}
              >
                Taktika
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <PerformanceOverview />
                </div>
              )}
              
              {activeTab === 'career' && (
                <CareerHistory />
              )}
              
              {activeTab === 'matches' && (
                <MatchesSection />
              )}
              
              {activeTab === 'tactics' && (
                <div className="tactics-content">
                  <h2 className="section-title">Taktik Yondashuv</h2>
                  <div className="tactics-info">
                    <div className="formation-section">
                      <h3 className="subsection-title">Asosiy Taktika</h3>
                      <div className="formation-display">
                        <div className="formation-name">4-3-3</div>
                        <div className="formation-description">
                          Hujumkor futbol uslubi, qanotlarda tez o'yinchilar bilan. 
                          Markaziy yarim himoyachilarda ijodkor o'yinchilar joylashtiriladi.
                        </div>
                      </div>
                    </div>
                    <div className="playing-style">
                      <h3 className="subsection-title">O'yin Uslubi</h3>
                      <ul>
                        <li>Tez o'tishlar va kontr hujumlar</li>
                        <li>To'pni ushlab turish va pozitsion futbol</li>
                        <li>Qanotlardan faol o'yin</li>
                        <li>Yuqori pressing va to'pni qaytarib olish</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />

        {/* Right Advertisement Column */}
        <div className="right-ads">
          <div className="ad-banner">
            <img 
              src="https://readdy.ai/api/search-image?query=Sports%20management%20software%20advertisement%20banner%20vertical%20layout%20modern%20design%20green%20and%20white%20colors%20tactical%20analysis&width=160&height=600&seq=right-ad-coach-1&orientation=portrait" 
              alt="Reklama" 
            />
          </div>
        </div>
      </div>

      {!embedded && <Footer />}
    </div>
  );
};

export default CoachInfoPage;