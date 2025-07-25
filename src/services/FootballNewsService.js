// Football News Service - Free APIs only
class FootballNewsService {
  constructor() {
    this.baseUrl = 'https://escorebackend.onrender.com/api';
  }

  // Barcha yangiliklar ro'yxatini olish
  async getAllNews() {
    const response = await fetch(`${this.baseUrl}/news`);
    return response.json();
  }

  // Bitta yangilikni ID bo'yicha olish
  async getNewsById(id) {
    const response = await fetch(`${this.baseUrl}/news/${id}`);
    return response.json();
  }

  // Yangi yangilik qo'shish
  async addNews(data) {
    const response = await fetch(`${this.baseUrl}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Yangilikni tahrirlash
  async updateNews(id, data) {
    const response = await fetch(`${this.baseUrl}/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Yangilikni o'chirish
  async deleteNews(id) {
    const response = await fetch(`${this.baseUrl}/news/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Izohlar bilan ishlash
  async getComments(newsId) {
    const response = await fetch(`${this.baseUrl}/news/${newsId}/comments`);
    return response.json();
  }
  async addComment(newsId, commentData) {
    const response = await fetch(`${this.baseUrl}/news/${newsId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    return response.json();
  }
  async deleteComment(newsId, commentId) {
    const response = await fetch(`${this.baseUrl}/news/${newsId}/comments/${commentId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
}

// Sana formatlash uchun util funksiya
export function formatNewsDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default new FootballNewsService(); 