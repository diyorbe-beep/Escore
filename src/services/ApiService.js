import { secureRequest, getAuthHeaders } from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

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

  // Yangi yangilik qo'shish (faqat admin va jurnalistlar uchun)
  create: async (newsData) => {
    return secureRequest(`${API_URL}/news`, {
      method: 'POST',
      body: JSON.stringify(newsData)
    });
  },

  // Yangilikni tahrirlash
  update: async (id, newsData) => {
    return secureRequest(`${API_URL}/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData)
    });
  },

  // Yangilikni o'chirish
  delete: async (id) => {
    return secureRequest(`${API_URL}/news/${id}`, {
      method: 'DELETE'
    });
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
  // Barcha so'rovnomalarni olish
  getAll: async () => {
    const response = await fetch(`${API_URL}/polls`);
    return response.json();
  },

  // Bitta so'rovnomani olish
  getById: async (id) => {
    const response = await fetch(`${API_URL}/polls/${id}`);
    return response.json();
  },

  // Yangi so'rovnoma yaratish
  create: async (pollData) => {
    return secureRequest(`${API_URL}/polls`, {
      method: 'POST',
      body: JSON.stringify(pollData)
    });
  },

  // So'rovnomada ovoz berish
  vote: async (pollId, optionId) => {
    return secureRequest(`${API_URL}/polls/${pollId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ optionId })
    });
  }
};

// Foydalanuvchi profili bilan ishlash
export const userApi = {
  // Profil ma'lumotlarini olish
  getProfile: async () => {
    return secureRequest(`${API_URL}/users/profile`);
  },

  // Profil ma'lumotlarini yangilash
  updateProfile: async (userData) => {
    return secureRequest(`${API_URL}/users/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },

  // Profil rasmini yuklash
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return secureRequest(`${API_URL}/users/avatar`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        // FormData uchun Content-Type o'chiriladi
        'Content-Type': undefined
      },
      body: formData
    });
  },

  // Parolni o'zgartirish
  changePassword: async (passwordData) => {
    return secureRequest(`${API_URL}/users/change-password`, {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
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