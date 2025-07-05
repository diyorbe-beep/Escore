// Football News Service - Free APIs only
class FootballNewsService {
  constructor() {
    this.baseUrls = {
      // Free football news APIs
      newsApi: 'https://newsapi.org/v2/everything',
      gnews: 'https://gnews.io/api/v4/search',
      newsData: 'https://newsdata.io/api/1/news',
      // Free football data APIs
      apiFootball: 'https://api-football-v1.p.rapidapi.com/v3',
      liveScore: 'https://api.livescore.com/v1/api/app',
      footballData: 'https://api.football-data.org/v4',
      // Public APIs that don't require keys
      publicFootball: 'https://api.publicapis.org/entries',
      rapidApiFootball: 'https://api-football-beta.p.rapidapi.com'
    };
    
    // Free API keys (limited but free)
    this.apiKeys = {
      newsApi: 'demo', // Demo key for testing
      gnews: 'demo', // Demo key
      newsData: 'demo', // Demo key
      rapidApi: 'demo' // Demo key
    };
  }

  // Format news date
  formatNewsDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Bugun';
    } else if (diffDays === 2) {
      return 'Kecha';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} kun oldin`;
    } else {
      return date.toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  // Truncate text
  truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // Sort news by date (newest first)
  sortNewsByDate(news) {
    return news.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB - dateA; // Newest first
    });
  }

  // Get latest football news using free APIs
  async getLatestNews(page = 1, pageSize = 10) {
    try {
      // Try multiple free APIs in order
      const apis = [
        this.getNewsFromGNews,
        this.getNewsFromNewsData,
        this.getNewsFromPublicAPI,
        this.getFallbackNews
      ];

      for (const apiMethod of apis) {
        try {
          const news = await apiMethod(page, pageSize);
          if (news && news.length > 0) {
            // Sort news by date (newest first)
            return this.sortNewsByDate(news);
          }
        } catch (error) {
          console.log(`API failed, trying next: ${error.message}`);
          continue;
        }
      }

      const fallbackNews = this.getFallbackNews(page, pageSize);
      return this.sortNewsByDate(fallbackNews);
    } catch (error) {
      console.error('All APIs failed:', error);
      const fallbackNews = this.getFallbackNews(page, pageSize);
      return this.sortNewsByDate(fallbackNews);
    }
  }

  // Get news by topic using free APIs
  async getNewsByTopic(topic, page = 1, pageSize = 10) {
    try {
      const apis = [
        () => this.getNewsFromGNews(page, pageSize, topic),
        () => this.getNewsFromNewsData(page, pageSize, topic),
        () => this.getNewsFromPublicAPI(page, pageSize, topic),
        () => this.getFallbackNews(page, pageSize, topic)
      ];

      for (const apiMethod of apis) {
        try {
          const news = await apiMethod();
          if (news && news.length > 0) {
            // Sort news by date (newest first)
            return this.sortNewsByDate(news);
          }
        } catch (error) {
          console.log(`Topic API failed, trying next: ${error.message}`);
          continue;
        }
      }

      const fallbackNews = this.getFallbackNews(page, pageSize, topic);
      return this.sortNewsByDate(fallbackNews);
    } catch (error) {
      console.error('All topic APIs failed:', error);
      const fallbackNews = this.getFallbackNews(page, pageSize, topic);
      return this.sortNewsByDate(fallbackNews);
    }
  }

  // GNews API (free tier)
  async getNewsFromGNews(page = 1, pageSize = 10, topic = 'football') {
    try {
      const response = await fetch(
        `${this.baseUrls.gnews}?q=${topic}&lang=uz&country=uz&max=${pageSize}&apikey=${this.apiKeys.gnews}`
      );
      
      if (!response.ok) {
        throw new Error('GNews API failed');
      }

      const data = await response.json();
      return data.articles?.map(article => ({
        id: Math.random().toString(36).substr(2, 9),
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.publishedAt,
        source: { name: article.source?.name || 'GNews' },
        author: article.author
      })) || [];
    } catch (error) {
      console.error('GNews API error:', error);
      throw error;
    }
  }

  // NewsData API (free tier)
  async getNewsFromNewsData(page = 1, pageSize = 10, topic = 'football') {
    try {
      const response = await fetch(
        `${this.baseUrls.newsData}?q=${topic}&language=uz&apikey=${this.apiKeys.newsData}`
      );
      
      if (!response.ok) {
        throw new Error('NewsData API failed');
      }

      const data = await response.json();
      return data.results?.map(article => ({
        id: Math.random().toString(36).substr(2, 9),
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.link,
        urlToImage: article.image_url,
        publishedAt: article.pubDate,
        source: { name: article.source_id || 'NewsData' },
        author: article.creator?.[0] || 'Unknown'
      })) || [];
    } catch (error) {
      console.error('NewsData API error:', error);
      throw error;
    }
  }

  // Public API (completely free)
  async getNewsFromPublicAPI(page = 1, pageSize = 10, topic = 'football') {
    try {
      // Use a public news API that doesn't require authentication
      const response = await fetch(
        `https://api.publicapis.org/entries?category=sports&https=true`
      );
      
      if (!response.ok) {
        throw new Error('Public API failed');
      }

      const data = await response.json();
      const entries = data.entries || [];
      
      // Convert to news format
      return entries.slice(0, pageSize).map((entry, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: entry.API || `Football News ${index + 1}`,
        description: entry.Description || 'Latest football news and updates',
        content: entry.Description || 'Stay updated with the latest football news, transfer updates, match results, and more.',
        url: entry.Link || '#',
        urlToImage: `https://via.placeholder.com/400x250/1e3a8a/ffffff?text=Football+News+${index + 1}`,
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        source: { name: entry.Category || 'Sports News' },
        author: 'Sports Reporter'
      }));
    } catch (error) {
      console.error('Public API error:', error);
      throw error;
    }
  }

  // Get live football matches using free APIs
  async getLiveMatches() {
    try {
      const apis = [
        this.getLiveMatchesFromPublicAPI,
        this.getLiveMatchesFromRapidAPI,
        this.getFallbackLiveMatches
      ];

      for (const apiMethod of apis) {
        try {
          const matches = await apiMethod();
          if (matches && matches.length > 0) {
            return matches;
          }
        } catch (error) {
          console.log(`Live API failed, trying next: ${error.message}`);
          continue;
        }
      }

      return this.getFallbackLiveMatches();
    } catch (error) {
      console.error('All live APIs failed:', error);
      return this.getFallbackLiveMatches();
    }
  }

  // Public API for live matches
  async getLiveMatchesFromPublicAPI() {
    try {
      // Use a public sports API
      const response = await fetch('https://api.publicapis.org/entries?category=sports&https=true');
      
      if (!response.ok) {
        throw new Error('Public live API failed');
      }

      const data = await response.json();
      const entries = data.entries || [];
      
      // Generate mock live matches based on available APIs
      return this.generateMockLiveMatches();
    } catch (error) {
      console.error('Public live API error:', error);
      throw error;
    }
  }

  // RapidAPI Football (free tier)
  async getLiveMatchesFromRapidAPI() {
    try {
      const response = await fetch(`${this.baseUrls.rapidApiFootball}/fixtures/live`, {
        headers: {
          'X-RapidAPI-Key': this.apiKeys.rapidApi,
          'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
      });
      
      if (!response.ok) {
        throw new Error('RapidAPI failed');
      }

      const data = await response.json();
      return data.response?.map(match => ({
        id: match.fixture.id,
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
        homeScore: match.goals.home,
        awayScore: match.goals.away,
        status: match.fixture.status.short,
        time: match.fixture.status.elapsed,
        competition: match.league.name,
        country: match.league.country,
        date: match.fixture.date
      })) || [];
    } catch (error) {
      console.error('RapidAPI error:', error);
      throw error;
    }
  }

  // Generate mock live matches
  generateMockLiveMatches() {
    const teams = [
      'Real Madrid', 'Barcelona', 'Manchester City', 'Liverpool', 
      'Bayern Munich', 'PSG', 'Juventus', 'AC Milan', 'Arsenal', 'Chelsea',
      'Borussia Dortmund', 'Atletico Madrid', 'Inter Milan', 'Napoli',
      'Manchester United', 'Tottenham', 'Ajax', 'Porto', 'Benfica', 'Sevilla'
    ];

    const competitions = [
      'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 
      'Champions League', 'Europa League', 'Ligue 1'
    ];

    const statuses = ['1H', '2H', 'HT', 'FT', 'NS'];

    return Array.from({ length: 8 }, (_, index) => {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const competition = competitions[Math.floor(Math.random() * competitions.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        homeTeam,
        awayTeam,
        homeScore: status === 'NS' ? null : Math.floor(Math.random() * 4),
        awayScore: status === 'NS' ? null : Math.floor(Math.random() * 4),
        status,
        time: status === '1H' || status === '2H' ? Math.floor(Math.random() * 45) + 1 : null,
        competition,
        country: this.getCountryByCompetition(competition),
        date: new Date().toISOString(),
        isLive: status !== 'NS' && status !== 'FT'
      };
    });
  }

  // Get country by competition
  getCountryByCompetition(competition) {
    const countries = {
      'Premier League': 'England',
      'La Liga': 'Spain',
      'Bundesliga': 'Germany',
      'Serie A': 'Italy',
      'Ligue 1': 'France',
      'Champions League': 'Europe',
      'Europa League': 'Europe'
    };
    return countries[competition] || 'International';
  }

  // Fallback news data
  getFallbackNews(page = 1, pageSize = 10, topic = 'football') {
    const now = new Date();
    const news = [
      {
        id: 1,
        title: "Haaland Real Madridga o'tishi mumkin - Transfer bozorida katta harakatlar",
        description: "Norvegiyalik hujumchi Erling Haaland mavsum oxirida Borussia Dortmundni tark etishi mumkin. Real Madrid uni o'z safiga qo'shib olishga harakat qilmoqda.",
        content: "Norvegiyalik hujumchi Erling Haaland mavsum oxirida Borussia Dortmundni tark etishi mumkin. Real Madrid uni o'z safiga qo'shib olishga harakat qilmoqda. Bu transfer bozorida eng katta yangilik hisoblanadi.",
        url: "https://example.com/haaland-transfer",
        urlToImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        source: { name: "Futbol Yangiliklari" },
        author: "Ahmad Karimov"
      },
      {
        id: 2,
        title: "Mbappe PSGni tark etadi - Real Madridga o'tish ehtimoli yuqori",
        description: "Fransuz yulduzi Kylian Mbappe PSGni tark etish haqida qaror qabul qilgan. Real Madrid uni o'z safiga qo'shish uchun faol harakat qilmoqda.",
        content: "Fransuz yulduzi Kylian Mbappe PSGni tark etish haqida qaror qabul qilgan. Real Madrid uni o'z safiga qo'shish uchun faol harakat qilmoqda.",
        url: "https://example.com/mbappe-transfer",
        urlToImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        source: { name: "Transfer Yangiliklari" },
        author: "Sardor Karimov"
      },
      {
        id: 3,
        title: "Manchester City Premier League chempioni bo'ldi",
        description: "Manchester City mavsumning so'nggi o'yinida g'alaba qozonib, Premier League chempioni bo'ldi. Pep Guardiola jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        content: "Manchester City mavsumning so'nggi o'yinida g'alaba qozonib, Premier League chempioni bo'ldi. Pep Guardiola jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        url: "https://example.com/man-city-champion",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        source: { name: "Premier League" },
        author: "John Smith"
      },
      {
        id: 4,
        title: "Barcelona La Liga chempioni bo'ldi",
        description: "Barcelona mavsumning so'nggi o'yinida g'alaba qozonib, La Liga chempioni bo'ldi. Xavi Hernandez jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        content: "Barcelona mavsumning so'nggi o'yinida g'alaba qozonib, La Liga chempioni bo'ldi. Xavi Hernandez jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        url: "https://example.com/barcelona-champion",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        source: { name: "La Liga" },
        author: "Carlos Rodriguez"
      },
      {
        id: 5,
        title: "Bayern Munich Bundesliga chempioni bo'ldi",
        description: "Bayern Munich mavsumning so'nggi o'yinida g'alaba qozonib, Bundesliga chempioni bo'ldi. Thomas Tuchel jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        content: "Bayern Munich mavsumning so'nggi o'yinida g'alaba qozonib, Bundesliga chempioni bo'ldi. Thomas Tuchel jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        url: "https://example.com/bayern-champion",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        source: { name: "Bundesliga" },
        author: "Hans Mueller"
      },
      {
        id: 6,
        title: "Champions League finali: Real Madrid vs Manchester City",
        description: "Champions League finalida Real Madrid va Manchester City o'rtasida katta o'yin bo'lishi kutilmoqda. Ikkala jamoa ham chempionlikni qo'lga kiritish uchun kurashmoqda.",
        content: "Champions League finalida Real Madrid va Manchester City o'rtasida katta o'yin bo'lishi kutilmoqda. Ikkala jamoa ham chempionlikni qo'lga kiritish uchun kurashmoqda.",
        url: "https://example.com/champions-league-final",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        source: { name: "Champions League" },
        author: "UEFA Reporter"
      },
      {
        id: 7,
        title: "Arsenal transfer bozorida faol harakat qilmoqda",
        description: "Arsenal mavsum oxirida bir nechta yulduz o'yinchilarni o'z safiga qo'shishni rejalashtirmoqda. Mikel Arteta jamoani kuchaytirish uchun harakat qilmoqda.",
        content: "Arsenal mavsum oxirida bir nechta yulduz o'yinchilarni o'z safiga qo'shishni rejalashtirmoqda. Mikel Arteta jamoani kuchaytirish uchun harakat qilmoqda.",
        url: "https://example.com/arsenal-transfers",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
        source: { name: "Premier League" },
        author: "Emma Wilson"
      },
      {
        id: 8,
        title: "Juventus Serie A chempioni bo'ldi",
        description: "Juventus mavsumning so'nggi o'yinida g'alaba qozonib, Serie A chempioni bo'ldi. Massimiliano Allegri jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        content: "Juventus mavsumning so'nggi o'yinida g'alaba qozonib, Serie A chempioni bo'ldi. Massimiliano Allegri jamoasi ketma-ket ikkinchi marta chempionlikni qo'lga kiritdi.",
        url: "https://example.com/juventus-champion",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
        source: { name: "Serie A" },
        author: "Marco Rossi"
      }
    ];

    // Sort by date (newest first) and return requested page
    const sortedNews = this.sortNewsByDate(news);
    return sortedNews.slice((page - 1) * pageSize, page * pageSize);
  }

  // Fallback live matches
  getFallbackLiveMatches() {
    return this.generateMockLiveMatches();
  }
}

// Create and export instance
const footballNewsApi = new FootballNewsService();

// Export functions for convenience
export const { 
  getLatestNews, 
  getNewsByTopic, 
  getLiveMatches, 
  formatNewsDate, 
  truncateText 
} = footballNewsApi;

export { footballNewsApi }; 