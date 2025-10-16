import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('umoja_token');
  console.log(`🌐 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token attached to request');
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status || 'Network Error'} ${error.config?.url}`);
    console.error('Error details:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
