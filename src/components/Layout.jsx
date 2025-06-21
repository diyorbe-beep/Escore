import React from 'react';
import '../scss/main.scss';

const Layout = ({ children }) => (
  <div className="layout">
    <aside className="sidebar left">[REKLAMA]</aside>
    <main className="content">{children}</main>
    <aside className="sidebar right">[REKLAMA]</aside>
  </div>
);

export default Layout; 