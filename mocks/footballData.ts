
export const countries = [
  {
    id: 'england',
    name: 'Angliya',
    flag: 'https://readdy.ai/api/search-image?query=England%20flag%20simple%20clean%20design%20with%20white%20background&width=40&height=30&seq=eng1&orientation=landscape',
    leagues: [
      { id: 'premier-league', name: 'Premier League' },
      { id: 'championship', name: 'Championship' },
      { id: 'league-one', name: 'League One' }
    ]
  },
  {
    id: 'spain',
    name: 'Ispaniya',
    flag: 'https://readdy.ai/api/search-image?query=Spain%20flag%20simple%20clean%20design%20with%20white%20background&width=40&height=30&seq=esp1&orientation=landscape',
    leagues: [
      { id: 'la-liga', name: 'La Liga' },
      { id: 'segunda', name: 'Segunda División' }
    ]
  },
  {
    id: 'germany',
    name: 'Germaniya',
    flag: 'https://readdy.ai/api/search-image?query=Germany%20flag%20simple%20clean%20design%20with%20white%20background&width=40&height=30&seq=ger1&orientation=landscape',
    leagues: [
      { id: 'bundesliga', name: 'Bundesliga' },
      { id: 'bundesliga2', name: '2. Bundesliga' }
    ]
  },
  {
    id: 'italy',
    name: 'Italiya',
    flag: 'https://readdy.ai/api/search-image?query=Italy%20flag%20simple%20clean%20design%20with%20white%20background&width=40&height=30&seq=ita1&orientation=landscape',
    leagues: [
      { id: 'serie-a', name: 'Serie A' },
      { id: 'serie-b', name: 'Serie B' }
    ]
  },
  {
    id: 'france',
    name: 'Fransiya',
    flag: 'https://readdy.ai/api/search-image?query=France%20flag%20simple%20clean%20design%20with%20white%20background&width=40&height=30&seq=fra1&orientation=landscape',
    leagues: [
      { id: 'ligue1', name: 'Ligue 1' },
      { id: 'ligue2', name: 'Ligue 2' }
    ]
  }
];

export const leagues = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'Angliya',
    logo: 'https://readdy.ai/api/search-image?query=Premier%20League%20official%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=pl1&orientation=squarish',
    matchday: 'Matchday 20',
    matches: [
      {
        id: 1,
        homeTeam: {
          name: 'Manchester City',
          logo: 'https://readdy.ai/api/search-image?query=Manchester%20City%20football%20club%20logo%20clean%20design&width=48&height=48&seq=mci1&orientation=squarish'
        },
        awayTeam: {
          name: 'Arsenal',
          logo: 'https://readdy.ai/api/search-image?query=Arsenal%20football%20club%20logo%20clean%20design&width=48&height=48&seq=ars1&orientation=squarish'
        },
        score: { home: 2, away: 1 },
        status: 'finished',
        time: '90+3\''
      },
      {
        id: 2,
        homeTeam: {
          name: 'Liverpool',
          logo: 'https://readdy.ai/api/search-image?query=Liverpool%20football%20club%20logo%20clean%20design&width=48&height=48&seq=liv1&orientation=squarish'
        },
        awayTeam: {
          name: 'Chelsea',
          logo: 'https://readdy.ai/api/search-image?query=Chelsea%20football%20club%20logo%20clean%20design&width=48&height=48&seq=che1&orientation=squarish'
        },
        score: { home: 1, away: 1 },
        status: 'live',
        time: '67\''
      },
      {
        id: 3,
        homeTeam: {
          name: 'Manchester United',
          logo: 'https://readdy.ai/api/search-image?query=Manchester%20United%20football%20club%20logo%20clean%20design&width=48&height=48&seq=mun1&orientation=squarish'
        },
        awayTeam: {
          name: 'Tottenham',
          logo: 'https://readdy.ai/api/search-image?query=Tottenham%20football%20club%20logo%20clean%20design&width=48&height=48&seq=tot1&orientation=squarish'
        },
        score: { home: null, away: null },
        status: 'upcoming',
        time: '16:30'
      }
    ]
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Ispaniya',
    logo: 'https://readdy.ai/api/search-image?query=La%20Liga%20official%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=ll1&orientation=squarish',
    matchday: 'Jornada 18',
    matches: [
      {
        id: 4,
        homeTeam: {
          name: 'Real Madrid',
          logo: 'https://readdy.ai/api/search-image?query=Real%20Madrid%20football%20club%20logo%20clean%20design&width=48&height=48&seq=rm1&orientation=squarish'
        },
        awayTeam: {
          name: 'Barcelona',
          logo: 'https://readdy.ai/api/search-image?query=Barcelona%20football%20club%20logo%20clean%20design&width=48&height=48&seq=bar1&orientation=squarish'
        },
        score: { home: 3, away: 2 },
        status: 'finished',
        time: '90+5\''
      },
      {
        id: 5,
        homeTeam: {
          name: 'Atletico Madrid',
          logo: 'https://readdy.ai/api/search-image?query=Atletico%20Madrid%20football%20club%20logo%20clean%20design&width=48&height=48&seq=atm1&orientation=squarish'
        },
        awayTeam: {
          name: 'Sevilla',
          logo: 'https://readdy.ai/api/search-image?query=Sevilla%20football%20club%20logo%20clean%20design&width=48&height=48&seq=sev1&orientation=squarish'
        },
        score: { home: 0, away: 1 },
        status: 'live',
        time: '45+2\''
      }
    ]
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germaniya',
    logo: 'https://readdy.ai/api/search-image?query=Bundesliga%20official%20logo%20clean%20design%20with%20white%20background&width=80&height=80&seq=bl1&orientation=squarish',
    matchday: 'Spieltag 16',
    matches: [
      {
        id: 6,
        homeTeam: {
          name: 'Bayern Munich',
          logo: 'https://readdy.ai/api/search-image?query=Bayern%20Munich%20football%20club%20logo%20clean%20design&width=48&height=48&seq=bay1&orientation=squarish'
        },
        awayTeam: {
          name: 'Borussia Dortmund',
          logo: 'https://readdy.ai/api/search-image?query=Borussia%20Dortmund%20football%20club%20logo%20clean%20design&width=48&height=48&seq=bvb1&orientation=squarish'
        },
        score: { home: 2, away: 0 },
        status: 'finished',
        time: '90\''
      },
      {
        id: 7,
        homeTeam: {
          name: 'RB Leipzig',
          logo: 'https://readdy.ai/api/search-image?query=RB%20Leipzig%20football%20club%20logo%20clean%20design&width=48&height=48&seq=rbl1&orientation=squarish'
        },
        awayTeam: {
          name: 'Bayer Leverkusen',
          logo: 'https://readdy.ai/api/search-image?query=Bayer%20Leverkusen%20football%20club%20logo%20clean%20design&width=48&height=48&seq=b041&orientation=squarish'
        },
        score: { home: 1, away: 2 },
        status: 'live',
        time: '78\''
      }
    ]
  }
];

export const topMatches = [
  {
    id: 'tm1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    time: '21:00',
    competition: 'La Liga'
  },
  {
    id: 'tm2',
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester City',
    time: '17:30',
    competition: 'Premier League'
  },
  {
    id: 'tm3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    time: '18:30',
    competition: 'Bundesliga'
  }
];

export const standings = [
  { pos: 1, team: 'Arsenal', pts: 45 },
  { pos: 2, team: 'Liverpool', pts: 42 },
  { pos: 3, team: 'Man City', pts: 40 },
  { pos: 4, team: 'Chelsea', pts: 35 },
  { pos: 5, team: 'Newcastle', pts: 32 }
];

export const nextFixtures = [
  {
    id: 'nf1',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    time: 'Ertaga 16:00'
  },
  {
    id: 'nf2',
    homeTeam: 'Man United',
    awayTeam: 'Liverpool',
    time: 'Yakshanba 14:30'
  },
  {
    id: 'nf3',
    homeTeam: 'Tottenham',
    awayTeam: 'Man City',
    time: 'Dushanba 20:00'
  }
];
