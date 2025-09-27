import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthStore, RegisterData } from '../types';
import { STORAGE_KEYS } from '../config/constants';

// Mock authentication service
const mockAuthService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@moderncart.com' && password === 'demo123') {
      return {
        id: '1',
        email: 'demo@moderncart.com',
        firstName: 'Demo',
        lastName: 'User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        addresses: [{
          id: '1',
          label: 'Home',
          firstName: 'Demo',
          lastName: 'User',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA',
          isDefault: true
        }],
        preferences: {
          currency: 'USD',
          language: 'en',
          emailNotifications: true,
          pushNotifications: false
        },
        createdAt: '2024-01-01'
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(userData: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      addresses: [],
      preferences: {
        currency: 'USD',
        language: 'en',
        emailNotifications: true,
        pushNotifications: false
      },
      createdAt: new Date().toISOString()
    };
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const user = await mockAuthService.login(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          const user = await mockAuthService.register(userData);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...data };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
