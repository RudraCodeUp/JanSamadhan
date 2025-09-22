import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USER_ROLES } from '../types';

// Mock authentication - in production, this would call actual API endpoints
const mockLogin = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock user data
  if (email === 'admin@city.gov' && password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'John Administrator',
        email: 'admin@city.gov',
        role: USER_ROLES.ADMIN,
        department: 'IT',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=face',
        createdAt: new Date('2023-01-15')
      },
      token: 'mock-jwt-token-admin'
    };
  } else if (email === 'staff@city.gov' && password === 'staff123') {
    return {
      user: {
        id: '2',
        name: 'Sarah Manager',
        email: 'staff@city.gov',
        role: USER_ROLES.STAFF,
        department: 'roads',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?w=100&h=100&fit=crop&crop=face',
        createdAt: new Date('2023-02-01')
      },
      token: 'mock-jwt-token-staff'
    };
  }
  
  return null;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const result = await mockLogin(email, password);
          if (result) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);