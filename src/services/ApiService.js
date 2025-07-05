import { secureRequest, getAuthHeaders } from './AuthService';

const API_URL = 'http://localhost:5000/api'; // Local backendga yo'naltirildi

// Yangiliklar bilan ishlash
export const newsApi = {
  // Barcha yangiliklar ro'yxatini olish
  getAll: async () => {
    const response = await fetch(`${API_URL}/news`);
    return response.json();
  },

  // Bitta yangilikni ID bo'yicha olish
  getById: async (id) => {
    const response = await fetch(`${API_URL}/news`); // id bo'yicha olish backendda yo'q
    const all = await response.json();
    return all.find(n => n.id === id);
  },

  // Yangi yangilik qo'shish (faqat admin va jurnalistlar uchun)
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
    return secureRequest(`${API_URL}/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData)
    });
  },

  // Yangilikni o'chirish
  delete: async (id) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
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
    const response = await fetch(`${API_URL}/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pollData)
    });
    return response.json();
  },

  // So'rovnomada ovoz berish
  vote: async (pollId, option) => {
    const response = await fetch(`${API_URL}/polls/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pollId, option })
    });
    return response.json();
  }
};

// Foydalanuvchi profili bilan ishlash
export const userApi = {
  // Profil ma'lumotlarini olish
  getProfile: async (id) => {
    const response = await fetch(`${API_URL}/user/${id}`);
    return response.json();
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