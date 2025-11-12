export interface TeamInfo {
  name: string;
  logo: string;
}

export interface MatchInfo {
  id: number;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  score: {
    home: number;
    away: number;
  };
  status: 'live' | 'finished' | 'upcoming';
  time: string;
}

export interface LeagueInfo {
  id: string;
  name: string;
  logo: string;
  matchday: string;
  matches: MatchInfo[];
}

export interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  leagues: Array<Pick<LeagueInfo, 'id' | 'name'>>;
}

const badgeBase = 'https://escore-news-assets.vercel.app/badges';

export const leagues: LeagueInfo[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    logo: `${badgeBase}/premier-league.png`,
    matchday: 'Matchday 21',
    matches: [
      {
        id: 1,
        homeTeam: {
          name: 'Arsenal',
          logo: `${badgeBase}/arsenal.png`,
        },
        awayTeam: {
          name: 'Liverpool',
          logo: `${badgeBase}/liverpool.png`,
        },
        score: { home: 2, away: 1 },
        status: 'live',
        time: "67'",
      },
      {
        id: 2,
        homeTeam: {
          name: 'Chelsea',
          logo: `${badgeBase}/chelsea.png`,
        },
        awayTeam: {
          name: 'Manchester City',
          logo: `${badgeBase}/man-city.png`,
        },
        score: { home: 0, away: 0 },
        status: 'upcoming',
        time: '18:30',
      },
    ],
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    logo: `${badgeBase}/la-liga.png`,
    matchday: 'Jornada 20',
    matches: [
      {
        id: 3,
        homeTeam: {
          name: 'Real Madrid',
          logo: `${badgeBase}/real-madrid.png`,
        },
        awayTeam: {
          name: 'Barcelona',
          logo: `${badgeBase}/barcelona.png`,
        },
        score: { home: 3, away: 2 },
        status: 'finished',
        time: "FT",
      },
      {
        id: 4,
        homeTeam: {
          name: 'Atletico Madrid',
          logo: `${badgeBase}/atletico.png`,
        },
        awayTeam: {
          name: 'Sevilla',
          logo: `${badgeBase}/sevilla.png`,
        },
        score: { home: 1, away: 0 },
        status: 'live',
        time: "74'",
      },
    ],
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    logo: `${badgeBase}/bundesliga.png`,
    matchday: 'Spieltag 19',
    matches: [
      {
        id: 5,
        homeTeam: {
          name: 'Bayern Munich',
          logo: `${badgeBase}/bayern.png`,
        },
        awayTeam: {
          name: 'RB Leipzig',
          logo: `${badgeBase}/rb-leipzig.png`,
        },
        score: { home: 1, away: 1 },
        status: 'live',
        time: "59'",
      },
      {
        id: 6,
        homeTeam: {
          name: 'Borussia Dortmund',
          logo: `${badgeBase}/dortmund.png`,
        },
        awayTeam: {
          name: 'Bayer Leverkusen',
          logo: `${badgeBase}/leverkusen.png`,
        },
        score: { home: 4, away: 2 },
        status: 'finished',
        time: 'FT',
      },
    ],
  },
];

export const countries: CountryInfo[] = [
  {
    id: 'england',
    name: 'Angliya',
    flag: `${badgeBase}/uk-flag.png`,
    leagues: [
      { id: 'premier-league', name: 'Premier League' },
    ],
  },
  {
    id: 'spain',
    name: 'Ispaniya',
    flag: `${badgeBase}/spain-flag.png`,
    leagues: [
      { id: 'la-liga', name: 'La Liga' },
    ],
  },
  {
    id: 'germany',
    name: 'Germaniya',
    flag: `${badgeBase}/germany-flag.png`,
    leagues: [
      { id: 'bundesliga', name: 'Bundesliga' },
    ],
  },
];
