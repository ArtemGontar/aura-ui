import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { API_CONFIG } from '../config/api';
import { MOCK_AUTH_TOKEN } from '../utils/debug';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

api.interceptors.request.use((config) => {
  let tmaToken: string;
  let languageCode: string = 'en';
  
  if (typeof WebApp !== 'undefined' && WebApp.initData) {
    tmaToken = WebApp.initData;
    
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user && WebApp.initDataUnsafe.user.language_code) {
      languageCode = WebApp.initDataUnsafe.user.language_code;
    }
  } else if (import.meta.env.DEV) {
    tmaToken = MOCK_AUTH_TOKEN;
  } else {
    throw new Error('No TMA token available and not in development mode');
  }

  config.headers.Authorization = `${tmaToken}`;
  config.headers['Accept-Language'] = languageCode;
  return config;
});

export default api;