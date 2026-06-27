# Dokumen Requirements

## Pendahuluan

Website anniversary sederhana sebagai hadiah digital untuk pacar. Dibuat sebagai single-page scroll (satu halaman, tanpa routing), menggunakan stack React + Vite + TypeScript + Tailwind CSS. Semua konten personal (teks, tanggal, foto, lagu, kode) dikonfigurasi di satu file config terpusat.

---

## Glosarium

- **App**: Aplikasi website anniversary secara keseluruhan.
- **Config**: File konfigurasi terpusat tempat semua konten personal disimpan.
- **Auth_Gate**: Komponen input kode rahasia yang mengamankan konten utama.
- **Main_Content**: Seluruh konten website yang tampil setelah autentikasi berhasil (semua section).
- **Music_Player**: Komponen pemutar musik yang menampilkan dan mengontrol playlist.
- **Lightbox**: Tampilan foto ukuran besar saat foto di galeri diklik.
- **Countdown**: Komponen hitung mundur ke tanggal anniversary berikutnya.

---

## Requirements

### Requirement 1: Password Gate

**User Story:** Sebagai pembuat, saya ingin konten website dilindungi kode rahasia, agar hanya pacar saya yang bisa mengaksesnya.

#### Acceptance Criteria

1. THE App SHALL menampilkan Auth_Gate sebagai tampilan pertama saat website dibuka.
2. THE Auth_Gate SHALL menampilkan satu input field dan tombol submit untuk memasukkan kode.
3. WHEN pengunjung memasukkan kode yang benar dan menekan submit, THE App SHALL menyembunyikan Auth_Gate dan menampilkan Main_Content.
4. IF pengunjung memasukkan kode yang salah atau input kosong, THEN THE Auth_Gate SHALL menampilkan pesan error singkat tanpa berpindah tampilan.
5. THE Auth_Gate SHALL menyembunyikan karakter yang diketik (input type password).
6. THE Config SHALL menyimpan kode rahasia sebagai satu-satunya sumber kebenaran untuk validasi.

---

### Requirement 2: Love Letter Section

**User Story:** Sebagai pengunjung, saya ingin membaca pesan personal dari pembuat, agar saya merasakan inti emosional dari hadiah ini.

#### Acceptance Criteria

1. WHEN Main_Content tampil, THE Love_Letter section SHALL ditampilkan sebagai section pertama setelah header.
2. THE Love_Letter section SHALL menampilkan teks surat yang diambil dari Config.
3. THE Love_Letter section SHALL merender teks dengan font yang elegan dan ukuran minimal 16px dengan line-height minimal 1.7.
4. THE Config SHALL menyimpan seluruh isi teks surat sebagai satu-satunya sumber konten.

---

### Requirement 3: Timeline Section

**User Story:** Sebagai pengunjung, saya ingin melihat daftar momen penting hubungan kami secara kronologis, agar saya bisa mengenang perjalanan bersama.

#### Acceptance Criteria

1. THE Timeline section SHALL menampilkan semua milestone dalam urutan kronologis menaik.
2. EACH milestone SHALL menampilkan tanggal dan deskripsi singkat yang diambil dari Config.
3. THE Config SHALL menyimpan daftar milestone sebagai array dengan field tanggal dan deskripsi.
4. WHEN milestone ter-scroll masuk ke viewport, THE App SHALL menampilkan animasi fade-in pada milestone tersebut.

---

### Requirement 4: Galeri Foto

**User Story:** Sebagai pengunjung, saya ingin melihat foto-foto kenangan kami, agar saya bisa mengenang momen spesial secara visual.

#### Acceptance Criteria

1. THE Gallery section SHALL menampilkan foto-foto dalam layout grid responsif.
2. THE Config SHALL menyimpan daftar path atau URL foto sebagai satu-satunya sumber data galeri.
3. WHEN pengunjung mengklik sebuah foto, THE App SHALL membuka Lightbox yang menampilkan foto tersebut dalam ukuran besar.
4. WHILE Lightbox terbuka, THE Lightbox SHALL menampilkan tombol tutup yang terlihat jelas.
5. WHEN pengunjung menekan tombol tutup atau menekan tombol Escape, THE App SHALL menutup Lightbox.
6. IF sebuah foto gagal dimuat, THEN THE Gallery SHALL menampilkan placeholder pada posisi foto tersebut.

---

### Requirement 5: Music Player

**User Story:** Sebagai pengunjung, saya ingin mendengarkan lagu-lagu favorit kami saat menjelajahi website, agar musik menambah suasana emosional.

#### Acceptance Criteria

1. THE Music_Player SHALL ditampilkan secara fixed di bagian bawah layar setelah autentikasi berhasil.
2. THE Music_Player SHALL menampilkan judul lagu yang sedang diputar.
3. THE Music_Player SHALL menyediakan tombol play/pause, next, dan previous.
4. WHEN pengunjung menekan play, THE Music_Player SHALL mulai memutar lagu saat ini.
5. WHEN pengunjung menekan pause, THE Music_Player SHALL menghentikan pemutaran tanpa mereset posisi.
6. WHEN pengunjung menekan next, THE Music_Player SHALL beralih ke lagu berikutnya; IF lagu terakhir, THEN SHALL kembali ke lagu pertama.
7. WHEN pengunjung menekan previous, THE Music_Player SHALL kembali ke lagu sebelumnya; IF lagu pertama, THEN SHALL pindah ke lagu terakhir.
8. WHEN sebuah lagu selesai diputar, THE Music_Player SHALL otomatis memutar lagu berikutnya.
9. THE Config SHALL menyimpan daftar playlist (judul lagu dan path audio) sebagai satu-satunya sumber data.
10. THE Music_Player SHALL tidak memulai pemutaran otomatis tanpa interaksi pengguna.

---

### Requirement 6: Countdown Anniversary

**User Story:** Sebagai pengunjung, saya ingin melihat hitung mundur ke anniversary berikutnya, agar saya merasa antusias menantikan momen itu.

#### Acceptance Criteria

1. THE Countdown section SHALL menampilkan sisa waktu ke tanggal anniversary berikutnya dalam format hari, jam, menit, dan detik.
2. THE Countdown SHALL memperbarui tampilan setiap detik tanpa reload halaman.
3. THE Config SHALL menyimpan tanggal anniversary sebagai satu-satunya sumber data untuk Countdown.
4. IF tanggal anniversary sudah terlewat saat halaman dibuka, THEN THE Countdown SHALL menampilkan pesan selamat yang sesuai, bukan nilai waktu negatif.

---

### Requirement 7: Confetti saat Konten Terbuka

**User Story:** Sebagai pengunjung, saya ingin disambut animasi confetti saat konten pertama kali terbuka, agar momen pembukaan terasa meriah.

#### Acceptance Criteria

1. WHEN autentikasi berhasil dan Main_Content pertama kali ditampilkan, THE App SHALL memicu animasi confetti.
2. THE confetti SHALL berjalan selama 3 hingga 8 detik lalu berhenti secara otomatis.
3. THE confetti SHALL hanya dipicu satu kali per sesi, tidak berulang saat pengguna scroll.

---

### Requirement 8: Animasi Scroll Ringan

**User Story:** Sebagai pengunjung, saya ingin setiap section muncul dengan animasi halus saat saya scroll, agar pengalaman menjelajahi website terasa menyenangkan.

#### Acceptance Criteria

1. WHEN sebuah section ter-scroll masuk ke viewport, THE App SHALL menampilkan animasi fade-in pada section tersebut.
2. THE animasi fade-in SHALL memiliki durasi antara 300ms hingga 600ms.
3. THE animasi SHALL hanya terpicu satu kali per section, tidak berulang saat di-scroll kembali.

---

### Requirement 9: Konfigurasi Terpusat

**User Story:** Sebagai pembuat, saya ingin semua konten personal tersimpan di satu file config, agar saya bisa mengubah teks, foto, lagu, dan tanggal tanpa menyentuh kode komponen.

#### Acceptance Criteria

1. THE Config SHALL menyimpan semua konten personal dalam satu file di direktori `config/`.
2. THE Config SHALL mencakup: kode rahasia, teks surat, daftar milestone, daftar foto, daftar playlist, dan tanggal anniversary.
3. THE App SHALL membaca semua konten yang ditampilkan kepada pengunjung dari Config, bukan dari nilai hardcoded di dalam komponen.
