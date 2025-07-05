import React from 'react';
import '../scss/main.scss';
import UpcomingMatches from './UpcomingMatches';
import FeaturedMatch from './FeaturedMatch';
import TopLeagues from './TopLeagues'
import Advertisement from './advertisement'
import Advertisement2 from './advertisement2'
import Calendar from './Calendar'

const Layout = ({ children }) => (
  <div className="layout">
    <aside className="sidebar left">
      <UpcomingMatches />
      <Calendar />
      <Advertisement />
      <TopLeagues />
    </aside>
    <main className="content">{children}</main>
    <aside className="sidebar right">
      <FeaturedMatch />

      <Advertisement2 />
    </aside>
  </div>
);

export default Layout; 