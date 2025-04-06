import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { API_CONFIG } from '../config/api';
import { MOCK_AUTH_TOKEN } from '../utils/debug';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add request interceptor to inject TMA token
api.interceptors.request.use((config) => {
  let tmaToken: string;
  
  if (typeof WebApp !== 'undefined' && WebApp.initData) {
    tmaToken = WebApp.initData;
  } else if (import.meta.env.DEV) {
    tmaToken = MOCK_AUTH_TOKEN;
  } else {
    throw new Error('No TMA token available and not in development mode');
  }

  // Add Authorization header
  config.headers.Authorization = `${tmaToken}`;
  return config;
});

export default api; 