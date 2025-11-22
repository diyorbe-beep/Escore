import React from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import LeagueHeader from './components/LeagueHeader';
import LeagueTable from './components/LeagueTable';
import RightSidebar from './components/RightSidebar';
import LeagueFixtures from './components/LeagueFixtures';
import TeamOfTheWeek from './components/TeamOfTheWeek';
import StatsCharts from './components/StatsCharts';
import '../../styles/league-info.scss';

interface LeagueInfoPageProps {
  embedded?: boolean;
}

const LeagueInfoPage: React.FC<LeagueInfoPageProps> = ({ embedded = false }) => {
  const mainContent = (
    <div className="main-content">
      <LeagueHeader />
      <LeagueTable />
      <LeagueFixtures />
      <TeamOfTheWeek />
      <StatsCharts />
    </div>
  );

  if (embedded) {
    return (
      <div className="league-info-page embedded">
        {mainContent}
      </div>
    );
  }

  return (
    <div className="league-info-page">
      <Header />
      
      <div className="page-container">
        {/* Chap reklama ustuni */}
        <div className="left-ads">
          <div className="ad-banner vertical">
            <div className="ad-content">
              <h4>Futbol Yangiliklari</h4>
              <p>Eng so'nggi transferlar va yangiliklar</p>
            </div>
          </div>
        </div>

        {/* Asosiy kontent */}
        {mainContent}

        {/* O'ng sidebar */}
        <aside className="right-content">
          <RightSidebar />
        </aside>

        {/* O'ng reklama ustuni */}
        <div className="right-ads">
          <div className="ad-banner vertical">
            <div className="ad-content">
              <h4>Tikish Platformasi</h4>
              <p>Eng yaxshi koeffitsientlar</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeagueInfoPage;