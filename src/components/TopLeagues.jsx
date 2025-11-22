import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopLeagues.scss';

const topLeagues = [
  {
    id: 'champions-league',
    name: 'UEFA Champions League',
    region: 'Yevropa',
    badge: 'UEFA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Europe.svg',
    highlights: [
      'Amaldagi chempion: Real Madrid',
      'Top klublar: Man City, Bayern, PSG',
      'Final: Wembley 2025'
    ]
  },
  {
    id: 'premier-league',
    name: 'Premier League',
    region: 'Angliya',
    badge: 'ENG',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    highlights: [
      'Lider: Manchester City',
      'Kuchli toʻrtlik: City, Liverpool, Arsenal, Spurs',
      'Bosh murabbiylar dueli: Guardiola vs Klopp'
    ]
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    region: 'Ispaniya',
    badge: 'ESP',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
    highlights: [
      'El Clásico avgust 18',
      'Pichichi poygasi: Bellingham vs Lewandowski',
      'Toʻpurar Vinisius 17 gol'
    ]
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    region: 'Italiya',
    badge: 'ITA',
    flag: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
    highlights: [
      'Skudetto poygasi: Inter vs Milan',
      'Top darvozabon: Maignan',
      'Yangi yulduz: Lautaro'
    ]
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    region: 'Germaniya',
    badge: 'GER',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    highlights: [
      'Musobaqa: Bayern vs Leverkusen',
      'Toʻpurar: Kane 24 gol',
      'Derbi: Revierderby 24-noyabr'
    ]
  },
  {
    id: 'ligue1',
    name: 'Ligue 1',
    region: 'Fransiya',
    badge: 'FRA',
    flag: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    highlights: [
      'PSG lider, Nice taʼqibda',
      'Mbappé 18 gol',
      'Yangi yulduz: Zaire-Emery'
    ]
  },
];

const TopLeagues = () => {
  const navigate = useNavigate();
  const [openLeague, setOpenLeague] = useState(topLeagues[0]?.name);

  const toggleLeague = (name, event) => {
    event.stopPropagation();
    setOpenLeague((prev) => (prev === name ? null : name));
  };

  const handleLeagueClick = (leagueId) => {
    navigate(`/league-info/${leagueId}`);
  };

  return (
    <div className="top-leagues-panel">
      <h3 className="top-leagues-panel__title">Top leagues</h3>
      <div className="top-leagues-panel__list">
        {topLeagues.map((league) => {
          const isOpen = openLeague === league.name;
          return (
            <div
              key={league.id}
              className={`top-leagues-panel__item ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                className="top-leagues-panel__item-header"
                onClick={(e) => {
                  toggleLeague(league.name, e);
                  handleLeagueClick(league.id);
                }}
                aria-expanded={isOpen}
              >
                <div className="top-leagues-panel__flag">
                  <img src={league.flag} alt={league.name} />
                </div>
                <div className="top-leagues-panel__info">
                  <span className="name">{league.name}</span>
                  <span className="meta">{league.region}</span>
                </div>
                <span className="top-leagues-panel__badge">{league.badge}</span>
                <span className={`top-leagues-panel__chevron ${isOpen ? 'open' : ''}`} aria-hidden>
                  ▾
                </span>
              </button>

              {isOpen && (
                <ul className="top-leagues-panel__details">
                  {league.highlights.map((info) => (
                    <li key={info}>{info}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopLeagues;
