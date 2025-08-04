import { create } from 'zustand';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in production this would be a real API call
      const mockCredentials = [
        { email: 'admin@aetc.mil', password: 'executive123', userId: 'exec-001' },
        { email: 'manager@aetc.mil', password: 'manager123', userId: 'mgr-001' },
        { email: 'analyst@aetc.mil', password: 'analyst123', userId: 'analyst-001' },
        { email: 'viewer@aetc.mil', password: 'viewer123', userId: 'viewer-001' }
      ];

      const credential = mockCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (!credential) {
        set({ error: 'Invalid email or password', isLoading: false });
        return false;
      }

      const user = mockUsers.find(u => u.id === credential.userId);
      
      if (!user) {
        set({ error: 'User not found', isLoading: false });
        return false;
      }

      // Update last login time
      user.lastLogin = new Date();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return true;
    } catch (error) {
      set({
        error: 'Login failed. Please try again.',
        isLoading: false
      });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  clearError: () => {
    set({ error: null });
  }
}));