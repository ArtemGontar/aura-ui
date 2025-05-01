import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { API_CONFIG } from '../config/api';
import { MOCK_AUTH_TOKEN } from '../utils/debug';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

api.interceptors.request.use((config) => {
  let tmaToken: string;
  
  if (typeof WebApp !== 'undefined' && WebApp.initData) {
    tmaToken = WebApp.initData;
  } else if (import.meta.env.DEV) {
    tmaToken = MOCK_AUTH_TOKEN;
  } else {
    throw new Error('No TMA token available and not in development mode');
  }

  config.headers.Authorization = `${tmaToken}`;
  return config;
});

/**
 * Checks if an error response has a specific status code
 */
export const isStatusError = (error: any, statusCode: number): boolean => {
  return error?.response?.status === statusCode;
};

/**
 * Helper to check if error is a 404 Not Found
 */
export const is404Error = (error: any): boolean => {
  return isStatusError(error, 404);
};

export default api;