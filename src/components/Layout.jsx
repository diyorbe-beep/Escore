import React from 'react';
import '../scss/main.scss';
import FeaturedMatch from './FeaturedMatch';

const Layout = ({ children }) => (
  <div className="layout">
    <aside className="sidebar left">[REKLAMA]</aside>
    <main className="content">{children}</main>
    <aside className="sidebar right">
      <FeaturedMatch />
    </aside>
  </div>
);

export default Layout; 