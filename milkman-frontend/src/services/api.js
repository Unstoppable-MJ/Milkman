import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config.url.includes('/api/token/')) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (username, password) => {
    const res = await api.post('/api/token/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);

    // Get user info immediately
    const userRes = await api.get('/accounts/me/');
    localStorage.setItem('user_role', userRes.data.role);
    localStorage.setItem('user_name', userRes.data.username);

    return { ...res.data, role: userRes.data.role };
  },
  logout: () => {
    localStorage.clear();
    window.location.href = '/login';
  },
  getRole: () => localStorage.getItem('user_role'),
  isAdmin: () => localStorage.getItem('user_role') === 'admin',
  isAuthenticated: () => !!localStorage.getItem('access_token'),
};

export default api;