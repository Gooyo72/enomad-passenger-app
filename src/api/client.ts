import axios from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const API_URL = Platform.OS === 'android' ? Config.API_URL_ANDROID : Config.API_URL_IOS;

import { useAuthStore } from '@store';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Гэнэтийн алдаа гарлаа';

    if (error.response) {
      // Серверээс алдаа ирсэн үед
      message = error.response.data.message || message;
      
      if (error.response.status === 401) {
        // Нэвтрэх эрх дууссан үед logout хийх
        useAuthStore.getState().logout();
      }
      console.log('API Error:', error.response.data);
    } else if (error.request) {
      // Хүсэлт илгээгдсэн боловч хариу ирээгүй үед
      message = 'Интернэт холболтоо шалгана уу';
      console.log('Network Error:', error.request);
    } else {
      // Хүсэлт бэлдэх үед алдаа гарсан үед
      message = error.message;
      console.log('Error:', error.message);
    }
    
    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
