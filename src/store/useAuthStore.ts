import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserResponse } from '@api/types';

import { queryClient } from '../../App';

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setAuth: (user: UserResponse, auth: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: UserResponse) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (user, auth) => set({ 
        user, 
        accessToken: auth.accessToken, 
        refreshToken: auth.refreshToken, 
        isAuthenticated: true 
      }),
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        queryClient.clear();
      },
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
