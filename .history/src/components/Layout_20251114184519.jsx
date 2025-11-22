import React from 'react';
import '../scss/main.scss';
import UpcomingMatches from './UpcomingMatches';
import FeaturedMatch from './FeaturedMatch';
import TopLeagues from './TopLeagues'
import Advertisement from './advertisement'
import Advertisement2 from './advertisement2'
import Calendar from './Calendar'
import Navbar from './Navbar';

const Layout = ({ children, user, onLogout, search, setSearch, hideSidebars = false }) => (
  <>
    <Navbar user={user} onLogout={onLogout} search={search} setSearch={setSearch} />
    <div className={`layout ${hideSidebars ? 'layout--full' : ''}`}>
      {!hideSidebars && (
        <aside className="sidebar left">
          <UpcomingMatches />
          <Calendar />
          <Advertisement />
          <TopLeagues />
        </aside>
      )}
      <main className={`content ${hideSidebars ? 'content--full' : ''}`}>{children}</main>
      {!hideSidebars && (
        <aside className="sidebar right">
          <FeaturedMatch />
          <Advertisement2 />
        </aside>
      )}
    </div>
  </>
);

export default Layout;