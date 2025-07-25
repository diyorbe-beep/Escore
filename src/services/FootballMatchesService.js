class FootballMatchesService {
  constructor() {
    this.baseUrl = 'https://escorebackend.onrender.com/api';
  }

  // Barcha o'yinlar ro'yxatini olish
  async getAllMatches() {
    const response = await fetch(`${this.baseUrl}/matches`);
    return response.json();
  }

  // Barcha featured o'yinlar
  async getFeaturedMatches() {
    const response = await fetch(`${this.baseUrl}/featured-match`);
    return response.json();
  }

  // Yangi featured o'yin qo'shish
  async addFeaturedMatch(data) {
    const response = await fetch(`${this.baseUrl}/featured-match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Featured o'yinni tahrirlash
  async updateFeaturedMatch(id, data) {
    const response = await fetch(`${this.baseUrl}/featured-match/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Featured o'yinni o'chirish
  async deleteFeaturedMatch(id) {
    const response = await fetch(`${this.baseUrl}/featured-match/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Yaqin kunlardagi o'yinlar (frontendda filtr)
  async getUpcomingMatches(days = 5) {
    const allMatches = await this.getAllMatches();
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + days);
    return allMatches.filter(match => {
      const matchDate = new Date(match.date);
      return matchDate >= now && matchDate <= end;
    });
  }

  // Berilgan yil va oy uchun o'yinlar (frontendda filtr)
  async getMatchesForMonth(year, month) {
    const allMatches = await this.getAllMatches();
    return allMatches.filter(match => {
      const matchDate = new Date(match.date);
      return (
        matchDate.getFullYear() === year &&
        matchDate.getMonth() + 1 === month
      );
    });
  }
}

export default new FootballMatchesService(); 