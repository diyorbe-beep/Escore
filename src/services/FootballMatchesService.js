class FootballMatchesService {
  constructor() {
    this.baseUrl = 'https://api.football-data.org/v2'; // Example API
    this.apiKey = import.meta.env.VITE_FOOTBALL_API_KEY; // You'll need to add this to your .env
  }

  // Get matches for a specific month
  async getMatchesForMonth(year, month) {
    try {
      // For now, return mock data. Replace with real API call
      return this.getMockMatchesForMonth(year, month);
    } catch (error) {
      console.error('Error fetching matches:', error);
      return this.getMockMatchesForMonth(year, month);
    }
  }

  // Mock data for demonstration
  getMockMatchesForMonth(year, month) {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];
    
    const mockMatches = {
      // January 2024
      '2024-01-15': {
        home: 'Real Madrid',
        away: 'Barcelona',
        time: '21:00',
        competition: 'La Liga',
        isLive: false,
        status: 'scheduled'
      },
      '2024-01-20': {
        home: 'Manchester City',
        away: 'Liverpool',
        time: '20:30',
        competition: 'Premier League',
        isLive: false,
        status: 'scheduled'
      },
      '2024-01-25': {
        home: 'Bayern Munich',
        away: 'PSG',
        time: '22:00',
        competition: 'Champions League',
        isLive: false,
        status: 'scheduled'
      },
      '2024-01-28': {
        home: 'AC Milan',
        away: 'Inter Milan',
        time: '21:45',
        competition: 'Serie A',
        isLive: false,
        status: 'scheduled'
      },
      // February 2024
      '2024-02-03': {
        home: 'Arsenal',
        away: 'Chelsea',
        time: '18:30',
        competition: 'Premier League',
        isLive: false,
        status: 'scheduled'
      },
      '2024-02-10': {
        home: 'Juventus',
        away: 'Napoli',
        time: '21:45',
        competition: 'Serie A',
        isLive: false,
        status: 'scheduled'
      },
      '2024-02-14': {
        home: 'Manchester United',
        away: 'Bayern Munich',
        time: '22:00',
        competition: 'Champions League',
        isLive: false,
        status: 'scheduled'
      },
      '2024-02-18': {
        home: 'Atletico Madrid',
        away: 'Real Madrid',
        time: '21:00',
        competition: 'La Liga',
        isLive: false,
        status: 'scheduled'
      },
      // March 2024
      '2024-03-02': {
        home: 'Liverpool',
        away: 'Manchester City',
        time: '18:30',
        competition: 'Premier League',
        isLive: false,
        status: 'scheduled'
      },
      '2024-03-09': {
        home: 'PSG',
        away: 'Lyon',
        time: '21:00',
        competition: 'Ligue 1',
        isLive: false,
        status: 'scheduled'
      },
      '2024-03-16': {
        home: 'Barcelona',
        away: 'Atletico Madrid',
        time: '21:00',
        competition: 'La Liga',
        isLive: false,
        status: 'scheduled'
      },
      '2024-03-23': {
        home: 'Inter Milan',
        away: 'Juventus',
        time: '21:45',
        competition: 'Serie A',
        isLive: false,
        status: 'scheduled'
      }
    };

    // Add today's date as live match if it exists in mock data
    if (mockMatches[today]) {
      mockMatches[today].isLive = true;
      mockMatches[today].time = 'LIVE';
      mockMatches[today].status = 'live';
    }

    return mockMatches;
  }

  // Get live matches
  async getLiveMatches() {
    try {
      // This would be a real API call to get live matches
      const currentDate = new Date();
      const today = currentDate.toISOString().split('T')[0];
      
      // For demo, return today's match as live
      const allMatches = await this.getMatchesForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
      const liveMatches = {};
      
      Object.keys(allMatches).forEach(date => {
        if (allMatches[date].isLive) {
          liveMatches[date] = allMatches[date];
        }
      });

      return liveMatches;
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return {};
    }
  }

  // Update match status (for real-time updates)
  updateMatchStatus(matchId, status) {
    // This would update the match status in real-time
    console.log(`Updating match ${matchId} status to ${status}`);
  }

  // Get upcoming matches
  async getUpcomingMatches(days = 7) {
    try {
      const currentDate = new Date();
      const upcomingMatches = {};
      
      for (let i = 0; i < days; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        const dateKey = date.toISOString().split('T')[0];
        
        const allMatches = await this.getMatchesForMonth(date.getFullYear(), date.getMonth() + 1);
        if (allMatches[dateKey]) {
          upcomingMatches[dateKey] = allMatches[dateKey];
        }
      }
      
      return upcomingMatches;
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      return {};
    }
  }

  // Format date for API
  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Get competition name in Uzbek
  getCompetitionNameUzbek(competition) {
    const translations = {
      'Premier League': 'Premier Liga',
      'La Liga': 'La Liga',
      'Serie A': 'Serie A',
      'Bundesliga': 'Bundesliga',
      'Ligue 1': 'Ligue 1',
      'Champions League': 'Chempionlar Ligasi',
      'Europa League': 'Yevropa Ligasi',
      'UEFA Nations League': 'UEFA Millatlar Ligasi'
    };
    
    return translations[competition] || competition;
  }
}

export default new FootballMatchesService(); 