import React from 'react';
import '../scss/main.scss';
import UpcomingMatches from './UpcomingMatches';
import FeaturedMatch from './FeaturedMatch';
import TopLeagues from './TopLeagues';
import Advertisement from './advertisement';
import Advertisement2 from './advertisement2';
import Calendar from './Calendar';
import Navbar from './Navbar';

const Layout = ({
  children,
  user,
  onLogout,
  search,
  setSearch,
  hideSidebars = false,
  leftSidebarContent,
  rightSidebarContent,
  contentWide = false
}) => {
  const defaultLeft = (
    <>
      <UpcomingMatches />
      <Calendar />
      <Advertisement />
      <TopLeagues />
    </>
  );

  const defaultRight = (
    <>
      <FeaturedMatch />
      <Advertisement2 />
    </>
  );

  return (
    <>
      <Navbar user={user} onLogout={onLogout} search={search} setSearch={setSearch} />
      <div className={`layout ${hideSidebars ? 'layout--full' : ''}`}>
        {!hideSidebars && (
          <aside className="sidebar left">
            {leftSidebarContent || defaultLeft}
          </aside>
        )}
        <main className={`content ${hideSidebars ? 'content--full' : ''} ${contentWide ? 'content--wide' : ''}`}>
          {children}
        </main>
        {!hideSidebars && (
          <aside className="sidebar right">
            {rightSidebarContent || defaultRight}
          </aside>
        )}
      </div>
    </>
  );
};

export default Layout;