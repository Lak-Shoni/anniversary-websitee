# Rencana Implementasi: Anniversary Website

## Overview

Membangun ulang arsitektur anniversary website dari multi-page routing menjadi one-page scroll tanpa router. Codebase lama memiliki struktur berbasis `react-router-dom` dengan banyak halaman terpisah — semua ini perlu dihapus dan diganti dengan arsitektur baru yang lebih sederhana.

## Tasks

- [x] 1. Bersihkan file lama yang tidak dipakai
  - Hapus semua file di `src/pages/` (AuthGate.tsx, Countdown.tsx, Gallery.tsx, LoveLetter.tsx, MemoryCards.tsx, ReasonsPage.tsx, SurprisePage.tsx, Timeline.tsx, WelcomePage.tsx)
  - Hapus `src/router.tsx`
  - Hapus `src/hooks/useKeyboardNav.ts` dan `src/hooks/useReducedMotion.ts`
  - Hapus `src/config/validators.ts`
  - _Requirements: 9.1_

- [x] 2. Update `src/types/index.ts`
  - Ganti isi file dengan interface baru: `Milestone`, `Song`, `AppConfig`
  - `Milestone` punya field `date: string` dan `description: string`
  - `Song` punya field `title: string` dan `src: string`
  - `AppConfig` punya field: `secretCode`, `loveLetter`, `milestones`, `photos`, `playlist`, `anniversaryDate`
  - Hapus semua interface lama (`SiteConfig`, `Track`, `Photo`, `Reason`, `MemoryCard`)
  - _Requirements: 9.1, 9.2_

- [x] 3. Update `src/config/index.ts`
  - Import types baru dari `@/types`
  - Buat satu objek `config` yang mengimplementasi `AppConfig`
  - Isi semua field dengan nilai placeholder yang masuk akal
  - Export default `config`
  - Hapus semua export lama (`siteConfig`, `milestones`, `photos`, `playlist`, `reasons`, `cards`)
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 4. Update `src/store/appStore.ts`
  - Ganti interface menjadi `AppState` dengan field: `isAuthenticated: boolean`, `lightboxPhoto: string | null`
  - Tambahkan actions: `setAuthenticated()`, `openLightbox(src: string)`, `closeLightbox()`
  - Hapus state dan action lama (`isTransitioning`, `setTransitioning`)
  - _Requirements: 1.3, 4.3, 4.5_

- [x] 5. Update `src/store/musicStore.ts`
  - Sesuaikan import agar membaca dari `config` default baru (bukan `playlist` named export)
  - Ganti type `Track` dengan `Song` dari types baru
  - Ganti nama method `previous()` menjadi `prev()` agar konsisten dengan design
  - Hapus field dan method yang tidak dipakai di design baru: `volume`, `currentTime`, `seek`, `setVolume`, `_setCurrentTime`, serta audio event listener yang terkait
  - _Requirements: 5.3, 5.6, 5.7, 5.8_

- [x] 6. Update `src/hooks/useCountdown.ts`
  - Ubah signature hook dari `(targetDate: Date, timezone: string)` menjadi `(anniversaryDate: string)` — parse string ISO di dalam hook
  - Hapus parameter `timezone` (tidak ada di design baru); gunakan waktu lokal
  - Return tetap `{ days, hours, minutes, seconds, isPast }` — hapus `isReached` jika tidak dipakai
  - _Requirements: 6.1, 6.2, 6.4_

- [x] 7. Update `src/hooks/useAuth.ts`
  - Hapus logika sessionStorage — hook ini tidak lagi dibutuhkan sebagai standalone
  - Ganti isi dengan re-export atau penghapusan; autentikasi kini sepenuhnya di `appStore`
  - _Requirements: 1.3_

- [x] 8. Buat `src/components/SectionWrapper.tsx`
  - Komponen wrapper yang menerima `children` dan optional prop `duration` (default 0.5)
  - Gunakan `useInView` dari Framer Motion dan `motion.div`
  - Animasi fade-in + slide-up ringan, `once: true`
  - Durasi animasi 300–600ms sesuai prop
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 9. Buat `src/components/AuthGate.tsx`
  - Input type `password` + tombol submit
  - Baca `config.secretCode` untuk validasi
  - Jika benar: panggil `appStore.setAuthenticated()` dan trigger `canvas-confetti` (durasi 3–8 detik)
  - Jika salah/kosong: tampilkan pesan error inline, tidak berpindah halaman
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 7.1, 7.2, 7.3_

- [x] 10. Buat `src/components/LoveLetter.tsx`
  - Baca `config.loveLetter`
  - Tampilkan teks dengan font elegan, `font-size >= 16px`, `line-height >= 1.7`
  - Bungkus konten dengan `SectionWrapper`
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 11. Buat `src/components/Timeline.tsx`
  - Baca `config.milestones`
  - Render setiap milestone dalam urutan array (kronologis)
  - Setiap item milestone dibungkus `SectionWrapper` secara individual untuk animasi per-item
  - Tampilkan field `date` dan `description` tiap milestone
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 12. Buat `src/components/Lightbox.tsx`
  - Tampil hanya jika `appStore.lightboxPhoto !== null`
  - Tampilkan foto besar dari `lightboxPhoto`
  - Tombol close yang terlihat jelas
  - Event listener `keydown` untuk menutup saat Escape ditekan
  - Panggil `appStore.closeLightbox()` saat close
  - _Requirements: 4.4, 4.5_

- [x] 13. Buat `src/components/Gallery.tsx`
  - Baca `config.photos`
  - Layout grid responsif dengan Tailwind
  - Setiap `<img>` punya `onError` handler untuk render placeholder
  - Klik foto → panggil `appStore.openLightbox(src)`
  - Render `<Lightbox />` secara kondisional di dalam komponen ini
  - _Requirements: 4.1, 4.2, 4.3, 4.6_

- [x] 14. Buat `src/components/Countdown.tsx`
  - Baca `config.anniversaryDate`
  - Panggil `useCountdown(config.anniversaryDate)`
  - Tampilkan format: Hari / Jam / Menit / Detik
  - Jika `isPast === true`, tampilkan pesan selamat, bukan angka countdown
  - Bungkus dengan `SectionWrapper`
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 15. Buat `src/components/MusicPlayer.tsx`
  - Fixed bottom, selalu tampil setelah auth
  - Baca state dari `musicStore` (`currentIndex`, `isPlaying`, `play`, `pause`, `next`, `prev`)
  - Baca judul lagu aktif dari `config.playlist[currentIndex].title`
  - Render elemen `<audio>` dengan `onEnded` → panggil `musicStore.next()`
  - Tombol play/pause, prev, next
  - Tidak autoplay — tunggu interaksi user
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10_

- [-] 16. Tulis ulang `src/App.tsx`
  - Hapus semua kode routing lama (RouterProvider, Outlet, useAppStore isTransitioning)
  - Baca `isAuthenticated` dari `appStore`
  - Jika `false`: render hanya `<AuthGate />`
  - Jika `true`: render `MainContent` (LoveLetter, Timeline, Gallery, Countdown berurutan) + `<MusicPlayer />` di luar flow
  - _Requirements: 1.3, 5.1_

- [ ] 17. Update `src/main.tsx`
  - Hapus `RouterProvider` dan import `router`
  - Render langsung `<App />` di dalam `React.StrictMode` dan `ErrorBoundary`
  - _Requirements: 1.1_

## Notes

- Task 1–7 adalah cleanup dan update file yang sudah ada — harus dikerjakan lebih dulu sebelum membuat komponen baru
- Task 8 (SectionWrapper) harus selesai sebelum komponen-komponen section (10–14)
- Task 15 (MusicPlayer) bergantung pada musicStore yang sudah diupdate (Task 5)
- Task 16–17 adalah wiring akhir yang menggabungkan semua komponen

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2", "3"] },
    { "id": 2, "tasks": ["4", "5", "6", "7"] },
    { "id": 3, "tasks": ["8"] },
    { "id": 4, "tasks": ["9", "10", "11", "12", "14"] },
    { "id": 5, "tasks": ["13", "15"] },
    { "id": 6, "tasks": ["16", "17"] }
  ]
}
```
