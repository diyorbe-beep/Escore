export const teamInfo = {
  id: 'real-madrid',
  name: 'Real Madrid CF',
  fullName: 'Club de Fútbol Real Madrid',
  founded: 1902,
  city: 'Madrid',
  country: 'Spain',
  stadium: 'Santiago Bernabéu',
  capacity: 81044,
  logo: 'https://readdy.ai/api/search-image?query=Real%20Madrid%20football%20club%20official%20logo%20white%20background%20simple%20clean%20design&width=120&height=120&seq=team-logo-1&orientation=squarish',
  colors: {
    primary: '#FFFFFF',
    secondary: '#153E75'
  },
  socialMedia: {
    twitter: '@realmadrid',
    instagram: '@realmadrid',
    facebook: 'RealMadrid'
  },
  currentSeason: '2024-25',
  league: 'La Liga',
  position: 2,
  points: 45,
  matchesPlayed: 18,
  wins: 14,
  draws: 3,
  losses: 1,
  goalsFor: 42,
  goalsAgainst: 15,
  goalDifference: 27
};

export const recentMatches = [
  {
    id: 1,
    date: '2024-12-15',
    opponent: 'Barcelona',
    opponentLogo: 'https://readdy.ai/api/search-image?query=FC%20Barcelona%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=barca-logo-1&orientation=squarish',
    homeAway: 'away',
    score: '2-1',
    result: 'W',
    competition: 'La Liga'
  },
  {
    id: 2,
    date: '2024-12-10',
    opponent: 'Atletico Madrid',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Atletico%20Madrid%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=atletico-logo-1&orientation=squarish',
    homeAway: 'home',
    score: '3-0',
    result: 'W',
    competition: 'La Liga'
  },
  {
    id: 3,
    date: '2024-12-05',
    opponent: 'Liverpool',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Liverpool%20FC%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=liverpool-logo-1&orientation=squarish',
    homeAway: 'away',
    score: '1-1',
    result: 'D',
    competition: 'Champions League'
  },
  {
    id: 4,
    date: '2024-11-30',
    opponent: 'Sevilla',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Sevilla%20FC%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=sevilla-logo-1&orientation=squarish',
    homeAway: 'home',
    score: '4-1',
    result: 'W',
    competition: 'La Liga'
  },
  {
    id: 5,
    date: '2024-11-25',
    opponent: 'Valencia',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Valencia%20CF%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=valencia-logo-1&orientation=squarish',
    homeAway: 'away',
    score: '2-0',
    result: 'W',
    competition: 'La Liga'
  }
];

export const upcomingMatches = [
  {
    id: 6,
    date: '2024-12-20',
    time: '21:00',
    opponent: 'Villarreal',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Villarreal%20CF%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=villarreal-logo-1&orientation=squarish',
    homeAway: 'home',
    competition: 'La Liga',
    venue: 'Santiago Bernabéu'
  },
  {
    id: 7,
    date: '2024-12-25',
    time: '18:30',
    opponent: 'Real Sociedad',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Real%20Sociedad%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=sociedad-logo-1&orientation=squarish',
    homeAway: 'away',
    competition: 'La Liga',
    venue: 'Anoeta Stadium'
  },
  {
    id: 8,
    date: '2025-01-05',
    time: '20:00',
    opponent: 'Manchester City',
    opponentLogo: 'https://readdy.ai/api/search-image?query=Manchester%20City%20football%20club%20logo%20simple%20clean%20design&width=40&height=40&seq=city-logo-1&orientation=squarish',
    homeAway: 'home',
    competition: 'Champions League',
    venue: 'Santiago Bernabéu'
  }
];

export const teamPlayers = [
  // Goalkeepers
  {
    id: 1,
    name: 'Thibaut Courtois',
    position: 'GK',
    number: 1,
    age: 31,
    nationality: 'Belgium',
    flag: '🇧🇪',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20goalkeeper%20in%20Real%20Madrid%20white%20jersey%20number%201%20clean%20studio%20portrait&width=80&height=80&seq=courtois-1&orientation=squarish',
    appearances: 15,
    goals: 0,
    assists: 0
  },
  {
    id: 2,
    name: 'Andriy Lunin',
    position: 'GK',
    number: 13,
    age: 25,
    nationality: 'Ukraine',
    flag: '🇺🇦',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20goalkeeper%20in%20Real%20Madrid%20white%20jersey%20number%2013%20clean%20studio%20portrait&width=80&height=80&seq=lunin-1&orientation=squarish',
    appearances: 3,
    goals: 0,
    assists: 0
  },
  // Defenders
  {
    id: 3,
    name: 'Dani Carvajal',
    position: 'RB',
    number: 2,
    age: 32,
    nationality: 'Spain',
    flag: '🇪🇸',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20defender%20in%20Real%20Madrid%20white%20jersey%20number%202%20clean%20studio%20portrait&width=80&height=80&seq=carvajal-1&orientation=squarish',
    appearances: 16,
    goals: 2,
    assists: 4
  },
  {
    id: 4,
    name: 'Éder Militão',
    position: 'CB',
    number: 3,
    age: 26,
    nationality: 'Brazil',
    flag: '🇧🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20defender%20in%20Real%20Madrid%20white%20jersey%20number%203%20clean%20studio%20portrait&width=80&height=80&seq=militao-1&orientation=squarish',
    appearances: 17,
    goals: 1,
    assists: 0
  },
  {
    id: 5,
    name: 'David Alaba',
    position: 'CB',
    number: 4,
    age: 32,
    nationality: 'Austria',
    flag: '🇦🇹',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20defender%20in%20Real%20Madrid%20white%20jersey%20number%204%20clean%20studio%20portrait&width=80&height=80&seq=alaba-1&orientation=squarish',
    appearances: 14,
    goals: 0,
    assists: 1
  },
  {
    id: 6,
    name: 'Ferland Mendy',
    position: 'LB',
    number: 23,
    age: 29,
    nationality: 'France',
    flag: '🇫🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20defender%20in%20Real%20Madrid%20white%20jersey%20number%2023%20clean%20studio%20portrait&width=80&height=80&seq=mendy-1&orientation=squarish',
    appearances: 15,
    goals: 0,
    assists: 2
  },
  // Midfielders
  {
    id: 7,
    name: 'Luka Modrić',
    position: 'CM',
    number: 10,
    age: 38,
    nationality: 'Croatia',
    flag: '🇭🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20midfielder%20in%20Real%20Madrid%20white%20jersey%20number%2010%20clean%20studio%20portrait&width=80&height=80&seq=modric-1&orientation=squarish',
    appearances: 18,
    goals: 3,
    assists: 5
  },
  {
    id: 8,
    name: 'Toni Kroos',
    position: 'CM',
    number: 8,
    age: 34,
    nationality: 'Germany',
    flag: '🇩🇪',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20midfielder%20in%20Real%20Madrid%20white%20jersey%20number%208%20clean%20studio%20portrait&width=80&height=80&seq=kroos-1&orientation=squarish',
    appearances: 17,
    goals: 1,
    assists: 8
  },
  {
    id: 9,
    name: 'Federico Valverde',
    position: 'CM',
    number: 15,
    age: 26,
    nationality: 'Uruguay',
    flag: '🇺🇾',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20midfielder%20in%20Real%20Madrid%20white%20jersey%20number%2015%20clean%20studio%20portrait&width=80&height=80&seq=valverde-1&orientation=squarish',
    appearances: 18,
    goals: 4,
    assists: 3
  },
  {
    id: 10,
    name: 'Jude Bellingham',
    position: 'AM',
    number: 5,
    age: 21,
    nationality: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20midfielder%20in%20Real%20Madrid%20white%20jersey%20number%205%20clean%20studio%20portrait&width=80&height=80&seq=bellingham-1&orientation=squarish',
    appearances: 18,
    goals: 8,
    assists: 4
  },
  // Forwards
  {
    id: 11,
    name: 'Karim Benzema',
    position: 'ST',
    number: 9,
    age: 36,
    nationality: 'France',
    flag: '🇫🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20striker%20in%20Real%20Madrid%20white%20jersey%20number%209%20clean%20studio%20portrait&width=80&height=80&seq=benzema-1&orientation=squarish',
    appearances: 16,
    goals: 12,
    assists: 6
  },
  {
    id: 12,
    name: 'Vinícius Jr.',
    position: 'LW',
    number: 7,
    age: 24,
    nationality: 'Brazil',
    flag: '🇧🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20winger%20in%20Real%20Madrid%20white%20jersey%20number%207%20clean%20studio%20portrait&width=80&height=80&seq=vinicius-1&orientation=squarish',
    appearances: 17,
    goals: 10,
    assists: 7
  },
  {
    id: 13,
    name: 'Rodrygo',
    position: 'RW',
    number: 11,
    age: 23,
    nationality: 'Brazil',
    flag: '🇧🇷',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20winger%20in%20Real%20Madrid%20white%20jersey%20number%2011%20clean%20studio%20portrait&width=80&height=80&seq=rodrygo-1&orientation=squarish',
    appearances: 15,
    goals: 6,
    assists: 4
  }
];

export const teamStats = {
  topScorer: {
    name: 'Karim Benzema',
    goals: 12,
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20striker%20in%20Real%20Madrid%20white%20jersey%20number%209%20clean%20studio%20portrait&width=60&height=60&seq=benzema-stats-1&orientation=squarish'
  },
  topAssist: {
    name: 'Toni Kroos',
    assists: 8,
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20midfielder%20in%20Real%20Madrid%20white%20jersey%20number%208%20clean%20studio%20portrait&width=60&height=60&seq=kroos-stats-1&orientation=squarish'
  },
  cleanSheets: {
    name: 'Thibaut Courtois',
    cleanSheets: 9,
    photo: 'https://readdy.ai/api/search-image?query=Professional%20football%20goalkeeper%20in%20Real%20Madrid%20white%20jersey%20number%201%20clean%20studio%20portrait&width=60&height=60&seq=courtois-stats-1&orientation=squarish'
  }
};

export const injuryNews = [
  {
    player: 'Antonio Rüdiger',
    injury: 'Yengil mushak jarohati',
    expectedReturn: '2024-12-22',
    status: 'Tuzalmoqda'
  },
  {
    player: 'Eduardo Camavinga',
    injury: 'Tizza jarohati',
    expectedReturn: '2025-01-10',
    status: 'Davolanmoqda'
  }
];

export const leagueStandings = [
  { pos: 1, team: 'Barcelona', mp: 18, w: 15, d: 2, l: 1, gf: 48, ga: 12, pts: 47 },
  { pos: 2, team: 'Real Madrid', mp: 18, w: 14, d: 3, l: 1, gf: 42, ga: 15, pts: 45 },
  { pos: 3, team: 'Atletico Madrid', mp: 18, w: 12, d: 4, l: 2, gf: 35, ga: 18, pts: 40 },
  { pos: 4, team: 'Athletic Bilbao', mp: 18, w: 10, d: 5, l: 3, gf: 28, ga: 20, pts: 35 },
  { pos: 5, team: 'Real Sociedad', mp: 18, w: 9, d: 6, l: 3, gf: 30, ga: 22, pts: 33 }
];