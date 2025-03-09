import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { API_CONFIG } from '../config/api';

const MOCK_AUTH_TOKEN = 'mock_tma_token_for_development';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add request interceptor to inject TMA token
api.interceptors.request.use((config) => {
  let tmaToken: string;
  
  if (typeof WebApp !== 'undefined' && WebApp.initData) {
    // We're in Telegram - use real initData as token
    tmaToken = WebApp.initData;
  } else if (import.meta.env.DEV) {
    // We're in development - use mock token
    console.log('Using mock TMA token for development');
    tmaToken = MOCK_AUTH_TOKEN;
  } else {
    throw new Error('No TMA token available and not in development mode');
  }

  // Add Authorization header
  console.log('TMA token ', tmaToken);
  config.headers.Authorization = `tma ${tmaToken}`;
  return config;
});

export default api; 