import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import config from '@/config';
import type { Song } from '@/types';

interface MusicState {
  currentIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
}

// Module-level Audio element — created once for the lifetime of the app.
const audio = new Audio();
audio.preload = 'metadata';

const playlist: Song[] = config.playlist;

export const useMusicStore = create<MusicState>()(
  subscribeWithSelector((set, get) => ({
    currentIndex: 0,
    isPlaying: false,

    play() {
      if (playlist.length === 0) return;
      const { currentIndex } = get();
      const song = playlist[currentIndex];
      if (audio.src !== song.src) {
        audio.src = song.src;
        audio.load();
      }
      audio.play().catch(() => {
        // Autoplay was blocked — stay in paused state.
        set({ isPlaying: false });
      });
      set({ isPlaying: true });
    },

    pause() {
      audio.pause();
      set({ isPlaying: false });
    },

    next() {
      const { currentIndex, isPlaying } = get();
      if (playlist.length === 0) return;
      const nextIndex = (currentIndex + 1) % playlist.length;
      audio.src = playlist[nextIndex].src;
      audio.load();
      set({ currentIndex: nextIndex });
      if (isPlaying) {
        audio.play().catch(() => set({ isPlaying: false }));
      }
    },

    prev() {
      const { currentIndex, isPlaying } = get();
      if (playlist.length === 0) return;
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      audio.src = playlist[prevIndex].src;
      audio.load();
      set({ currentIndex: prevIndex });
      if (isPlaying) {
        audio.play().catch(() => set({ isPlaying: false }));
      }
    },
  }))
);

// ─── Wire audio element events to the store ──────────────────────────────────

// Auto-advance to next track when a track ends (Req 5.7).
audio.addEventListener('ended', () => {
  useMusicStore.getState().next();
});

// Sync audio src whenever currentIndex changes externally.
useMusicStore.subscribe(
  (state) => state.currentIndex,
  (currentIndex) => {
    if (playlist.length === 0) return;
    const expectedSrc = playlist[currentIndex].src;
    if (audio.src !== expectedSrc) {
      audio.src = expectedSrc;
      audio.load();
    }
  }
);
