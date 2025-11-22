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
  rightAdContent,
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

  const isRefereeLayout = rightAdContent && leftSidebarContent;

  return (
    <>
      <Navbar user={user} onLogout={onLogout} search={search} setSearch={setSearch} />
      <div className={`layout ${hideSidebars ? 'layout--full' : ''} ${isRefereeLayout ? 'layout--referee' : ''}`}>
        {!hideSidebars && leftSidebarContent && (
          <aside className="sidebar left">
            {leftSidebarContent}
          </aside>
        )}
        {!hideSidebars && !leftSidebarContent && (
          <aside className="sidebar left">
            {defaultLeft}
          </aside>
        )}
        <main className={`content ${hideSidebars ? 'content--full' : ''} ${contentWide ? 'content--wide' : ''}`}>
          {children}
        </main>
        {!hideSidebars && rightSidebarContent && (
          <aside className="sidebar right">
            {rightSidebarContent}
          </aside>
        )}
        {!hideSidebars && !rightSidebarContent && !rightAdContent && (
          <aside className="sidebar right">
            {defaultRight}
          </aside>
        )}
        {!hideSidebars && rightAdContent && (
          <aside className="sidebar right-ad">
            {rightAdContent}
          </aside>
        )}
      </div>
    </>
  );
};

export default Layout;