import { create } from 'zustand';

interface AppState {
  isAuthenticated: boolean;
  lightboxPhoto: string | null;
  setAuthenticated: () => void;
  openLightbox: (src: string) => void;
  closeLightbox: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  lightboxPhoto: null,
  setAuthenticated: () => set({ isAuthenticated: true }),
  openLightbox: (src) => set({ lightboxPhoto: src }),
  closeLightbox: () => set({ lightboxPhoto: null }),
}));
