import React from 'react';
import './TopLeagues.scss';

const leagues = [
  {
    name: 'UEFA Champions League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/1200px-UEFA_Champions_League.svg.png',
  },
  {
    name: 'UEFA Europa League',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UEFA_Europa_League_logo_%282024_version%29.svg/1436px-UEFA_Europa_League_logo_%282024_version%29.svg.png',
  },
  {
    name: 'Premier League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
  {
    name: 'LaLiga',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/2048px-LaLiga_logo_2023.svg.png',
  },
  {
    name: 'Bundesliga',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
  },
  {
    name: 'Serie A',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Serie_A_ENILIVE_logo.svg/1200px-Serie_A_ENILIVE_logo.svg.png',
  },
  {
    name: 'Ligue 1',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
  },
  {
    name: 'Eredivisie',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78ra_hc69VkQJmDiagH7Gz12CnISYdV_z4Q&s',
  },
  {
    name: 'Brasileirão Série A',
    logo: 'https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png',
  },
  {
    name: 'CONMEBOL Libertadores',
    logo: 'https://logowik.com/content/uploads/images/conmebol-libertadores4840.jpg',
  },
  {
    name: 'CAF Champions League',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d5/CAF_Champions_League.png',
  },
  {
    name: 'MLS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/1200px-MLS_crest_logo_RGB_gradient.svg.png',
  },
  {
    name: 'World Championship',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRaBSnSWTsOMGUSZlH8SN63M7FydyWwo_WzA&s',
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
