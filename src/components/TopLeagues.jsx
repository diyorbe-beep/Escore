import React from 'react';
import './TopLeagues.scss';

const leagues = [
  {
    name: 'UEFA Champions League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg',
  },
  {
    name: 'UEFA Europa League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/03/UEFA_Europa_League_logo.svg',
  },
  {
    name: 'Premier League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
  {
    name: 'LaLiga',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/LaLiga_Santander.svg',
  },
  {
    name: 'Bundesliga',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Bundesliga_logo_%282017%29.svg',
  },
  {
    name: 'Serie A',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg',
  },
  {
    name: 'Ligue 1',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Ligue1.svg',
  },
  {
    name: 'Eredivisie',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Eredivisie_logo.svg',
  },
  {
    name: 'Brasileirão Série A',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg',
  },
  {
    name: 'CONMEBOL Libertadores',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Copa_Libertadores_logo.svg',
  },
  {
    name: 'CAF Champions League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/CAF_Champions_League_logo.svg',
  },
  {
    name: 'MLS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Major_League_Soccer_logo.svg',
  },
  {
    name: 'World Championship',
    logo: 'https://cdn-icons-png.flaticon.com/512/1822/1822899.png',
  },
];

const TopLeagues = () => (
  <div className="top-leagues-card">
    <div className="top-leagues-title">Top leagues</div>
    <ul className="top-leagues-list">
      {leagues.map((league, idx) => (
        <li key={idx} className="top-league-item">
          <img src={league.logo} alt={league.name} className="top-league-logo" />
          <span className="top-league-name">{league.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TopLeagues;
