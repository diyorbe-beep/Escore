export const matchDetails = {
  id: 'newcastle-vs-nottingham',
  homeTeam: {
    name: 'Newcastle United',
    shortName: 'NEW',
    logo: 'https://readdy.ai/api/search-image?query=Newcastle%20United%20football%20club%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=new1&orientation=squarish'
  },
  awayTeam: {
    name: 'Nottingham Forest',
    shortName: 'NOT',
    logo: 'https://readdy.ai/api/search-image?query=Nottingham%20Forest%20football%20club%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=not1&orientation=squarish'
  },
  score: { home: 2, away: 1 },
  status: 'finished',
  time: '90+3\'',
  date: '2024-01-15',
  league: 'Premier League',
  stadium: 'St. James\' Park',
  attendance: '52,305',
  referee: 'Michael Oliver',
  events: [
    {
      id: 1,
      minute: 12,
      type: 'goal',
      team: 'home',
      player: 'Alexander Isak',
      description: 'Gol'
    },
    {
      id: 2,
      minute: 23,
      type: 'yellow-card',
      team: 'away',
      player: 'Morgan Gibbs-White',
      description: 'Sariq kartochka'
    },
    {
      id: 3,
      minute: 45,
      type: 'goal',
      team: 'away',
      player: 'Taiwo Awoniyi',
      description: 'Gol'
    },
    {
      id: 4,
      minute: 67,
      type: 'substitution',
      team: 'home',
      player: 'Callum Wilson',
      playerOut: 'Alexander Isak',
      description: 'Almashtiruv'
    },
    {
      id: 5,
      minute: 78,
      type: 'goal',
      team: 'home',
      player: 'Bruno Guimarães',
      description: 'Gol'
    },
    {
      id: 6,
      minute: 85,
      type: 'red-card',
      team: 'away',
      player: 'Danilo',
      description: 'Qizil kartochka'
    }
  ],
  statistics: {
    possession: { home: 58, away: 42 },
    shots: { home: 14, away: 8 },
    shotsOnTarget: { home: 6, away: 3 },
    corners: { home: 7, away: 4 },
    fouls: { home: 12, away: 16 },
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 1 },
    passes: { home: 487, away: 352 },
    passAccuracy: { home: 84, away: 78 }
  },
  lineups: {
    home: {
      formation: '4-3-3',
      coach: 'Eddie Howe',
      players: [
        { number: 1, name: 'Nick Pope', position: 'GK' },
        { number: 2, name: 'Kieran Trippier', position: 'RB' },
        { number: 4, name: 'Sven Botman', position: 'CB' },
        { number: 5, name: 'Fabian Schär', position: 'CB' },
        { number: 33, name: 'Dan Burn', position: 'LB' },
        { number: 39, name: 'Bruno Guimarães', position: 'CM' },
        { number: 8, name: 'Sandro Tonali', position: 'CM' },
        { number: 36, name: 'Sean Longstaff', position: 'CM' },
        { number: 24, name: 'Miguel Almirón', position: 'RW' },
        { number: 14, name: 'Alexander Isak', position: 'ST' },
        { number: 10, name: 'Anthony Gordon', position: 'LW' }
      ],
      substitutes: [
        { number: 9, name: 'Callum Wilson', position: 'ST' },
        { number: 28, name: 'Joe Willock', position: 'CM' },
        { number: 15, name: 'Jamaal Lascelles', position: 'CB' }
      ]
    },
    away: {
      formation: '4-2-3-1',
      coach: 'Nuno Espírito Santo',
      players: [
        { number: 26, name: 'Matz Sels', position: 'GK' },
        { number: 7, name: 'Neco Williams', position: 'RB' },
        { number: 30, name: 'Willy Boly', position: 'CB' },
        { number: 38, name: 'Felipe', position: 'CB' },
        { number: 19, name: 'Ola Aina', position: 'LB' },
        { number: 28, name: 'Danilo', position: 'DM' },
        { number: 5, name: 'Orel Mangala', position: 'DM' },
        { number: 10, name: 'Morgan Gibbs-White', position: 'AM' },
        { number: 11, name: 'Chris Wood', position: 'RW' },
        { number: 21, name: 'Anthony Elanga', position: 'LW' },
        { number: 9, name: 'Taiwo Awoniyi', position: 'ST' }
      ],
      substitutes: [
        { number: 14, name: 'Callum Hudson-Odoi', position: 'LW' },
        { number: 22, name: 'Ryan Yates', position: 'CM' },
        { number: 15, name: 'Harry Toffolo', position: 'LB' }
      ]
    }
  }
};

export const relatedMatches = [
  {
    id: 'rm1',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    time: '16:30',
    date: 'Bugun',
    status: 'upcoming'
  },
  {
    id: 'rm2',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    time: '19:00',
    date: 'Ertaga',
    status: 'upcoming'
  },
  {
    id: 'rm3',
    homeTeam: 'Tottenham',
    awayTeam: 'Manchester United',
    time: '14:30',
    date: 'Yakshanba',
    status: 'upcoming'
  }
];

export const leagueStandings = [
  { pos: 1, team: 'Arsenal', played: 20, won: 14, drawn: 4, lost: 2, points: 46 },
  { pos: 2, team: 'Liverpool', played: 19, won: 13, drawn: 6, lost: 0, points: 45 },
  { pos: 3, team: 'Manchester City', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
  { pos: 4, team: 'Newcastle United', played: 20, won: 10, drawn: 8, lost: 2, points: 38 },
  { pos: 5, team: 'Chelsea', played: 20, won: 10, drawn: 5, lost: 5, points: 35 },
  { pos: 6, team: 'Brighton', played: 19, won: 9, drawn: 6, lost: 4, points: 33 },
  { pos: 7, team: 'Tottenham', played: 20, won: 9, drawn: 5, lost: 6, points: 32 },
  { pos: 8, team: 'Manchester United', played: 20, won: 9, drawn: 4, lost: 7, points: 31 },
  { pos: 9, team: 'West Ham', played: 20, won: 8, drawn: 6, lost: 6, points: 30 },
  { pos: 10, team: 'Nottingham Forest', played: 20, won: 7, drawn: 7, lost: 6, points: 28 }
];