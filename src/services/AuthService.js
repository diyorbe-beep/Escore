// Token bilan ishlash uchun funksiyalar
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Token va user ma'lumotlarini saqlash
export const saveAuthData = (token, userData) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

// Token va user ma'lumotlarini o'chirish
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Saqlangan user ma'lumotlarini olish
export const getSavedUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Token mavjudligini tekshirish
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// Token olish
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Parolni tekshirish
export const validatePassword = (password) => {
  // Kamida 8 ta belgi
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak'
    };
  }

  // Katta harf tekshirish
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Parolda kamida 1 ta katta harf bo\'lishi kerak'
    };
  }

  // Raqam tekshirish
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Parolda kamida 1 ta raqam bo\'lishi kerak'
    };
  }

  // Maxsus belgi tekshirish
  if (!/[!@#$%^&*]/.test(password)) {
    return {
      isValid: false,
      message: 'Parolda kamida 1 ta maxsus belgi (!@#$%^&*) bo\'lishi kerak'
    };
  }

  return {
    isValid: true,
    message: 'Parol to\'g\'ri'
  };
};

// Email tekshirish
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Token yangilash
export const refreshToken = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      saveAuthData(data.token, data.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token yangilashda xatolik:', error);
    return false;
  }
};

// API so'rovlar uchun xavfsizlik headerlari
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Xavfsiz API so'rov yuborish
export const secureRequest = async (url, options = {}) => {
  try {
    // Headers qo'shish
    const headers = {
      ...getAuthHeaders(),
      ...options.headers
    };

    // So'rov yuborish
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Token eskirgan bo'lsa yangilash
    if (response.status === 401) {
      const isRefreshed = await refreshToken();
      if (isRefreshed) {
        // Yangi token bilan qayta so'rov yuborish
        return secureRequest(url, options);
      } else {
        // Token yangilanmasa, tizimdan chiqarish
        clearAuthData();
        window.location.href = '/login';
        return null;
      }
    }

    return response;
  } catch (error) {
    console.error('So\'rov yuborishda xatolik:', error);
    throw error;
  }
}; 