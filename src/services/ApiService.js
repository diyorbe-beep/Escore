import { secureRequest, getAuthHeaders } from './AuthService';

const API_URL = 'http://localhost:5000/api'; // Lokal backendga yo'naltirildi

// Yangiliklar bilan ishlash
export const newsApi = {
  // Barcha yangiliklar ro'yxatini olish
  getAll: async () => {
    const response = await fetch(`${API_URL}/news`);
    return response.json();
  },

  // Bitta yangilikni ID bo'yicha olish
  getById: async (id) => {
    const response = await fetch(`${API_URL}/news/${id}`);
    return response.json();
  },

  // Yangi yangilik qo'shish
  create: async (newsData) => {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });
    return response.json();
  },

  // Yangilikni tahrirlash
  update: async (id, newsData) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });
    return response.json();
  },

  // Yangilikni o'chirish
  delete: async (id) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Izohlar bilan ishlash
  getComments: async (newsId) => {
    const response = await fetch(`${API_URL}/news/${newsId}/comments`);
    return response.json();
  },
  addComment: async (newsId, commentData) => {
    const response = await fetch(`${API_URL}/news/${newsId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    return response.json();
  },
  deleteComment: async (newsId, commentId) => {
    const response = await fetch(`${API_URL}/news/${newsId}/comments/${commentId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Jonli natijalar bilan ishlash
export const liveScoreApi = {
  // Barcha o'yinlar ro'yxatini olish
  getAll: async () => {
    const response = await fetch(`${API_URL}/live-scores`);
    return response.json();
  },

  // Bitta o'yin natijasini olish
  getById: async (id) => {
    const response = await fetch(`${API_URL}/live-scores/${id}`);
    return response.json();
  },

  // Yangi o'yin qo'shish (faqat admin uchun)
  create: async (matchData) => {
    return secureRequest(`${API_URL}/live-scores`, {
      method: 'POST',
      body: JSON.stringify(matchData)
    });
  },

  // O'yin natijasini yangilash
  update: async (id, matchData) => {
    return secureRequest(`${API_URL}/live-scores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(matchData)
    });
  }
};

// So'rovnomalar bilan ishlash
export const pollApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/polls`);
    return response.json();
  },
  create: async (pollData) => {
    const response = await fetch(`${API_URL}/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pollData)
    });
    return response.json();
  },
  vote: async (pollId, option) => {
    const response = await fetch(`${API_URL}/polls/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pollId, option })
    });
    return response.json();
  },
  delete: async (id, query) => {
    // query: { role: 'admin' } yoki { superadminToken: 'admin123' }
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`${API_URL}/polls/${id}?${params}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Kategoriyalar bilan ishlash
export const categoryApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
  },
  create: async (data) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  delete: async (id, superadminToken) => {
    const response = await fetch(`${API_URL}/categories/${id}?superadminToken=${superadminToken}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Rasm yuklash
export const uploadApi = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};

// Foydalanuvchi bilan ishlash
export const userApi = {
  getProfile: async (id) => {
    const response = await fetch(`${API_URL}/user/${id}`);
    return response.json();
  },
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  login: async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }
};

// Admin paneli uchun statistika
export const statsApi = {
  // Umumiy statistikani olish
  getOverview: async () => {
    return secureRequest(`${API_URL}/stats/overview`);
  },

  // Foydalanuvchilar statistikasi
  getUserStats: async () => {
    return secureRequest(`${API_URL}/stats/users`);
  },

  // Yangiliklar statistikasi
  getNewsStats: async () => {
    return secureRequest(`${API_URL}/stats/news`);
  }
};

// Xabarlar tizimi
export const notificationApi = {
  // Barcha xabarlarni olish
  getAll: async () => {
    return secureRequest(`${API_URL}/notifications`);
  },

  // O'qilmagan xabarlar sonini olish
  getUnreadCount: async () => {
    return secureRequest(`${API_URL}/notifications/unread/count`);
  },

  // Xabarni o'qilgan deb belgilash
  markAsRead: async (notificationId) => {
    return secureRequest(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  },

  // Barcha xabarlarni o'qilgan deb belgilash
  markAllAsRead: async () => {
    return secureRequest(`${API_URL}/notifications/read-all`, {
      method: 'PUT'
    });
  }
};

// O'yinlar bilan ishlash
export const matchApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/matches`);
    return response.json();
  },
  getFeatured: async () => {
    const response = await fetch(`${API_URL}/featured-match`);
    return response.json();
  },
  addFeatured: async (data) => {
    const response = await fetch(`${API_URL}/featured-match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  updateFeatured: async (id, data) => {
    const response = await fetch(`${API_URL}/featured-match/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  deleteFeatured: async (id) => {
    const response = await fetch(`${API_URL}/featured-match/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Adminlar bilan ishlash
export const adminApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/admins`);
    return response.json();
  },
  create: async (adminData) => {
    const response = await fetch(`${API_URL}/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
}; 