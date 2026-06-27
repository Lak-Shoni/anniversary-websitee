# Dokumen Desain: Anniversary Website

## Overview

Website anniversary satu halaman (one-page scroll) sebagai hadiah digital. Dibangun dengan React + Vite + TypeScript + Tailwind CSS + Framer Motion. Tidak ada routing — seluruh konten berada dalam satu halaman yang discroll dari atas ke bawah.

Alur utama:
1. App dibuka → `AuthGate` tampil
2. Kode benar dimasukkan → confetti muncul, `MainContent` tampil
3. Pengunjung scroll ke bawah melewati section satu per satu

---

## Arsitektur

```
App
├── AuthGate          (tampil jika belum auth)
└── MainContent       (tampil setelah auth)
    ├── LoveLetter
    ├── Timeline
    ├── Gallery
    │   └── Lightbox  (conditional)
    ├── Countdown
    └── MusicPlayer   (fixed bottom)
```

State autentikasi disimpan di `appStore` (Zustand). State music player disimpan di `musicStore` (Zustand). Semua konten personal diambil dari `src/config/index.ts`.

---

## Struktur Folder

```
src/
├── assets/
│   ├── audio/        # file audio lokal
│   └── images/       # foto galeri lokal
├── components/
│   ├── AuthGate.tsx
│   ├── LoveLetter.tsx
│   ├── Timeline.tsx
│   ├── Gallery.tsx
│   ├── Lightbox.tsx
│   ├── Countdown.tsx
│   ├── MusicPlayer.tsx
│   └── SectionWrapper.tsx   # wrapper animasi fade-in
├── config/
│   └── index.ts      # satu-satunya sumber konten personal
├── hooks/
│   ├── useAuth.ts
│   └── useCountdown.ts
├── store/
│   ├── appStore.ts
│   └── musicStore.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## Komponen Utama

### `AuthGate`
- Menampilkan input password + tombol submit
- Membaca `config.secretCode` untuk validasi
- Jika benar: set `appStore.isAuthenticated = true`, trigger confetti
- Jika salah/kosong: tampilkan pesan error inline

### `MainContent`
- Wrapper semua section setelah auth
- Merender `LoveLetter`, `Timeline`, `Gallery`, `Countdown` secara berurutan
- `MusicPlayer` dirender di luar flow scroll (fixed bottom)

### `SectionWrapper`
- Komponen umum yang membungkus setiap section
- Menggunakan `useInView` dari Framer Motion untuk fade-in saat scroll masuk viewport
- Animasi hanya terpicu satu kali (`once: true`)
- Durasi 300–600ms, konfigurasi via prop

### `LoveLetter`
- Membaca `config.loveLetter` (string teks)
- Menampilkan teks dengan font elegan, font-size ≥ 16px, line-height ≥ 1.7

### `Timeline`
- Membaca `config.milestones` (array)
- Merender setiap milestone dalam urutan array (kronologis)
- Setiap item dibungkus `SectionWrapper` untuk animasi per-item

### `Gallery`
- Membaca `config.photos` (array path/URL)
- Layout grid responsif (Tailwind grid)
- Klik foto → set `appStore.lightboxPhoto`, tampilkan `Lightbox`
- Foto gagal load → placeholder (div dengan bg-gray atau icon)

### `Lightbox`
- Muncul bila `appStore.lightboxPhoto !== null`
- Menampilkan foto besar + tombol close
- Tutup via tombol close atau tekan Escape (event listener)

### `Countdown`
- Membaca `config.anniversaryDate`
- Menggunakan `useCountdown` hook yang update setiap detik
- Jika tanggal sudah lewat: tampilkan pesan selamat
- Tampilkan format: Hari / Jam / Menit / Detik

### `MusicPlayer`
- Fixed bottom, selalu tampil setelah auth
- Membaca `config.playlist`
- State (currentIndex, isPlaying) di `musicStore`
- Tombol: play/pause, prev, next
- Auto-next saat lagu selesai via `onEnded` event di `<audio>`
- Tidak autoplay — tunggu interaksi user

---

## Data Model Config (`src/config/index.ts`)

```typescript
export interface Milestone {
  date: string;        // contoh: "2022-03-14"
  description: string;
}

export interface Song {
  title: string;
  src: string;         // path relatif ke file audio
}

export interface AppConfig {
  secretCode: string;
  loveLetter: string;
  milestones: Milestone[];
  photos: string[];    // path relatif atau URL foto
  playlist: Song[];
  anniversaryDate: string; // format ISO: "YYYY-MM-DD"
}

const config: AppConfig = {
  secretCode: "kode-rahasia",
  loveLetter: "Isi surat cinta di sini...",
  milestones: [
    { date: "2022-03-14", description: "Pertama kali ketemu" },
  ],
  photos: [
    "/src/assets/images/foto1.jpg",
  ],
  playlist: [
    { title: "Nama Lagu", src: "/src/assets/audio/lagu.mp3" },
  ],
  anniversaryDate: "2025-03-14",
};

export default config;
```

---

## State Management

### `appStore` (Zustand)

```typescript
interface AppState {
  isAuthenticated: boolean;
  lightboxPhoto: string | null;   // null = lightbox tertutup
  setAuthenticated: () => void;
  openLightbox: (src: string) => void;
  closeLightbox: () => void;
}
```

### `musicStore` (Zustand)

```typescript
interface MusicState {
  currentIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: (totalTracks: number) => void;
  prev: (totalTracks: number) => void;
  setIndex: (index: number) => void;
}
```

---

## Animasi

| Fitur | Implementasi |
|---|---|
| Fade-in section saat scroll | Framer Motion `useInView` + `motion.div`, `once: true` |
| Confetti saat auth berhasil | Library `canvas-confetti`, durasi 3–8 detik |
| Transisi Auth → Main | Framer Motion `animate` opacity/y sederhana |

Semua animasi menggunakan `SectionWrapper` agar konsisten. Tidak ada `AnimatePresence` untuk page transitions.

---

## Error Handling

- **Foto gagal load**: `onError` handler di `<img>` → render placeholder div
- **Audio gagal load**: `onError` handler di `<audio>` → tampilkan teks "Audio tidak tersedia"
- **Countdown tanggal lewat**: logika di `useCountdown` — kembalikan pesan selamat jika `timeLeft <= 0`
- **Kode salah**: pesan error inline di `AuthGate`, tidak ada redirect atau alert

---

## Testing

Pengujian sederhana dengan **Vitest** + **@testing-library/react**.

Fokus test:
- `useCountdown`: hitung mundur benar, handle tanggal lewat
- `useAuth` / validasi kode: benar vs salah vs kosong
- `musicStore`: next/prev wrapping (lagu terakhir → kembali ke pertama)
- `config/validators.ts`: validasi tipe/field config tidak kosong
