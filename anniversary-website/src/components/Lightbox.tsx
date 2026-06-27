import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function Lightbox() {
  const lightboxPhoto = useAppStore((s) => s.lightboxPhoto);
  const closeLightbox = useAppStore((s) => s.closeLightbox);

  useEffect(() => {
    if (!lightboxPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, closeLightbox]);

  return (
    <AnimatePresence>
      {lightboxPhoto !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeLightbox}
        >
          {/* Tombol close */}
          <button
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors text-xl leading-none"
            onClick={closeLightbox}
            aria-label="Tutup lightbox"
          >
            ✕
          </button>

          {/* Foto — klik di sini tidak menutup overlay */}
          <motion.img
            src={lightboxPhoto}
            alt="Foto besar"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
