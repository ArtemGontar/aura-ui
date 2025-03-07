import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTelegramInit } from './useTelegramInit';

// Mock the Telegram WebApp SDK
vi.mock('@twa-dev/sdk', () => ({
  default: {
    ready: vi.fn(),
    initData: null,
    initDataUnsafe: {
      user: null
    },
    expand: vi.fn(),
    enableClosingConfirmation: vi.fn()
  }
}));

describe('useTelegramInit', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset all mocks
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useTelegramInit());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should use mock data in development environment', async () => {
    process.env.NODE_ENV = 'development';
    
    const { result } = renderHook(() => useTelegramInit());
    
    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should throw error in production when no init data is available', async () => {
    process.env.NODE_ENV = 'production';
    
    const { result } = renderHook(() => useTelegramInit());
    
    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('No initialization data available');
  });

  it('should use saved user data from localStorage', async () => {
    const mockUserData = {
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      languageCode: 'en',
      isPremium: false,
      photoUrl: ''
    };
    
    localStorage.setItem('telegramUserData', JSON.stringify(mockUserData));
    
    const { result } = renderHook(() => useTelegramInit());
    
    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
}); 