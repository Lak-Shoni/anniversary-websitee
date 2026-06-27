import { useMusicStore } from '@/store/musicStore';
import config from '@/config';

export default function MusicPlayer() {
  const { currentIndex, isPlaying, play, pause, next, prev } = useMusicStore();

  // Tidak tampil jika playlist kosong
  if (config.playlist.length === 0) return null;

  const activeTitle = config.playlist[currentIndex]?.title || '-';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-rose-100 shadow-lg px-4 py-3 flex items-center justify-between"
      role="region"
      aria-label="Music Player"
    >
      {/* Judul lagu aktif */}
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-rose-700 truncate">{activeTitle}</p>
        <p className="text-xs text-rose-400">
          {currentIndex + 1} / {config.playlist.length}
        </p>
      </div>

      {/* Kontrol */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Lagu sebelumnya"
          className="w-11 h-11 flex items-center justify-center rounded-full text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-colors"
        >
          <span className="text-lg" aria-hidden="true">⏮</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={isPlaying ? pause : play}
          aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow transition-colors"
        >
          <span className="text-lg" aria-hidden="true">
            {isPlaying ? '⏸' : '▶'}
          </span>
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Lagu berikutnya"
          className="w-11 h-11 flex items-center justify-center rounded-full text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-colors"
        >
          <span className="text-lg" aria-hidden="true">⏭</span>
        </button>
      </div>
    </div>
  );
}
