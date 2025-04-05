import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add request interceptor to inject TMA token
api.interceptors.request.use((config) => {
  let tmaToken: string;
  
  if (typeof WebApp !== 'undefined' && WebApp.initData) {
    // We're in Telegram - use real initData as token
    tmaToken = WebApp.initData;
  } else {
    throw new Error('No TMA token available and not in development mode');
  }

  // Add Authorization header
  config.headers.Authorization = `tma ${tmaToken}`;
  return config;
});

export default api; 