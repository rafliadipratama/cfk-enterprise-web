# CFK Web Explorer — Core Fundamental Knowledge for Enterprise Web Application

[![Live Demo](https://img.shields.io/badge/Live_Demo-rafliadipratama.github.io-success?style=for-the-badge&logo=github)](https://rafliadipratama.github.io/cfk-enterprise-web/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-blue?style=for-the-badge&logo=github-actions)](https://rafliadipratama.github.io/cfk-enterprise-web/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

> **"Frameworks are perishable tools. Fundamental engineering is evergreen leverage."**

Platform edukasi web interaktif berbasis *First-Principles Software Engineering* untuk memahami **Core Fundamental Knowledge (CFK)** pada sistem web enterprise.

---

## 🌐 Akses Online (Live Demo)

Aplikasi web ini telah siap online di **GitHub Pages**:
👉 **[https://rafliadipratama.github.io/cfk-enterprise-web/](https://rafliadipratama.github.io/cfk-enterprise-web/)**

---

## ⚙️ Cara Mengaktifkan GitHub Pages (github.io)

Repository ini telah dilengkapi dengan file otomatisasi **GitHub Actions** (`.github/workflows/deploy-pages.yml`). Anda dapat mengaktifkannya dengan salah satu dari dua cara berikut:

### Metode 1: Lewat GitHub Actions (Otomatis & Direkomendasikan)
1. Buka repositori Anda di GitHub: [https://github.com/rafliadipratama/cfk-enterprise-web](https://github.com/rafliadipratama/cfk-enterprise-web)
2. Klik tab **Settings** di bagian atas menu repository.
3. Di bilah navigasi kiri, pilih menu **Pages**.
4. Di bagian **Build and deployment > Source**, pilih opsi **GitHub Actions**.
5. Setiap kali Anda melakukan `git push` ke branch `main`, GitHub Actions akan otomatis mempublikasikan website ke:
   ```text
   https://rafliadipratama.github.io/cfk-enterprise-web/
   ```

### Metode 2: Deploy dari Branch `main` (Klasik)
1. Buka tab **Settings** > **Pages**.
2. Di bagian **Build and deployment > Source**, pilih **Deploy from a branch**.
3. Pada dropdown **Branch**, pilih `main` dan folder `/ (root)`.
4. Klik tombol **Save**.
5. Dalam 1–2 menit, website Anda aktif secara publik di:
   ```text
   https://rafliadipratama.github.io/cfk-enterprise-web/
   ```

---

## 🚀 Cara Menjalankan di Komputer Lokal

Website ini dirancang **100% self-contained** (tanpa perlu build step atau `npm install`).

### Opsi 1: Buka Langsung di Browser
Cukup double-click file `index.html` atau jalankan di terminal macOS:
```bash
open index.html
```

### Opsi 2: Jalankan via Local HTTP Server
```bash
# Menggunakan Python 3:
python3 -m http.server 3000

# Atau menggunakan npx serve:
npx serve .
```
Lalu buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🌟 Fitur Utama Platform

1. **🧭 Panduan Belajar (The Spiral Learning Flow)**:
   - 4 langkah metodologi belajar berbasis *first-principles*.
   - Pemilih Jalur Belajar interaktif (Jalur Pemula, Jalur Fast-Track System Design, Jalur Praktisi Docker).
   - Widget interaktif *"Metode 3 Pertanyaan Sakti"* untuk membedah teknologi (Redis, RabbitMQ, JWT, B-Tree, Nginx, MinIO).

2. **🔄 The Core Loop & Quality Attributes Inspector**:
   - Diagram visual interaktif alur: `Client -> HTTP Request -> Web Application -> State/Persistence -> HTTP Response`.
   - Filter 6 Dimensi Kualitas (ISO/IEC 25010): *Correct? Secure? Reliable? Performant? Maintainable? Observable?*
   - Deep-dive panel untuk menginspeksi tantangan teknis di setiap komponen.

3. **🏛️ 7 Lapisan Core Fundamental Knowledge (CFK)**:
   - Layer 1: **Web & Network** (DNS, TCP 3-way handshake, TLS 1.3, Keep-Alive)
   - Layer 2: **Browser & Runtime** (Render tree, Event Loop, Microtask vs Macrotask, Storage)
   - Layer 3: **Server-side Computing** (Routing, Middleware Onion, Stateless JWT, Concurrency)
   - Layer 4: **Data & Persistence** (Relasional, ACID, Isolation Levels, B-Tree Index, Pool limit)
   - Layer 5: **Architecture & Modularity** (Layering, Clean Architecture, Decoupling)
   - Layer 6: **Quality & Security** (Trust boundaries, OWASP Top 10, Zero-Trust, Observability)
   - Layer 7: **Delivery & Operation** (Git, CI/CD gates, 12-Factor, Containerization, Healthchecks)
   - Dilengkapi *Fenomena Nyata*, *Jebakan Fatal (Gotcha)*, *Pertanyaan Wawancara Senior*, dan *Live Search*.

4. **💎 10 Pilar Inti yang Diperas (Distilled CFK)**:
   - Kartu prinsip fundamental dilengkapi dengan kartu analitik *"Fakta di Balik Framework"*.
   - **Multi-Language Production Code Tabs**: Contoh kode nyata enterprise dengan toggle bahasa **TypeScript / Node.js**, **Go**, dan **Python (FastAPI)** untuk setiap pilar, lengkap dengan tombol 1-klik salin kode.

5. **🧪 Interactive Chaos Labs (Simulasi Kerusakan Nyata)**:
   - **Lab 1: Kasus Upload Video >40s & Speech-to-Text (STT)**:
     - Membandingkan *Mode Sinkron Naif* (Blocking HTTP connection -> Nginx 504 Gateway Timeout) vs *Mode Asinkron Enterprise* (Presigned URL MinIO -> Redis Queue -> 202 Accepted -> Worker -> WebSocket).
   - **Lab 2: Kasus Concurrency & Double-Spend**:
     - Membandingkan *Tanpa Lock* (Race condition saldo negatif) vs *Pessimistic Lock (`SELECT ... FOR UPDATE`)*.
   - **Lab 3: Database Indexing & Query Latency**:
     - Membandingkan *Sequential Scan* (Membaca 1.000.000 baris, 462ms) vs *B-Tree Index Scan* (1.14ms).
   - **Lab 4: Cache Stampede (Thundering Herd) & DB Pool Crash**:
     - Membandingkan *Naive Cache Miss* (5.000 request tembus langsung saat TTL expired -> 50/50 connection pool jenuh -> 504 Timeout) vs *Singleflight Mutex Lock* (Hanya 1 query ke DB, 4.999 request menunggu in-flight promise -> 100% sukses, DB CPU 3%).

6. **🚨 War Room Insiden Produksi (Root Cause Analysis Simulator)**:
   - Dashboard telemetri langsung (*Live Telemetry Dials*): App Server CPU, PostgreSQL Connection Pool, p99 Latency, dan HTTP 5xx Error Rate.
   - Skenario Insiden P1: *"Flash Sale Checkout Stalled & Database Pool Saturated"*.
   - Alur Penanganan 4 Langkah: Triase Darurat (Stop the Bleeding) $\to$ Investigasi Slow Query & Connection Leak $\to$ Resolusi Permanen $\to$ Penerbitan Laporan Post-Mortem (RCA) resmi siap salin ke Markdown.

7. **✅ Checklist Penguasaan Mandiri (Study Tracker)**:
   - 10 milestone pembelajaran terukur dengan penyimpanan otomatis di `localStorage`.

8. **📊 Evaluasi Kesiapan (Readiness Assessment)**:
   - Kuis interaktif berbasis 5 skenario insiden produksi (*Root Cause Analysis*) dengan feedback evaluasi langsung.

9. **🎓 Generator Sertifikat Digital Kesiapan Enterprise**:
   - Menghasilkan sertifikat kelulusan digital beresolusi tinggi (1200x750) via HTML5 Canvas dengan tema dark luxury, segel holografik, ID Verifikasi unik deterministik, nama kustom pembelajar, dan tombol unduh instan ke file gambar PNG.

10. **🐳 Docker Compose Companion**:
    - Template satu klik berisi PostgreSQL (connection pool limited), Redis, dan MinIO untuk praktika nyata di komputer lokal.

---

## 📂 Struktur File
```text
cfk-enterprise-web/
├── .github/workflows/
│   └── deploy-pages.yml # Otomatisasi deploy ke GitHub Pages
├── index.html           # Struktur HTML semantik & tata letak platform
├── style.css            # Desain modern, tema gelap/terang, & responsif
├── app.js               # Mesin interaktif simulator, kuis, tracker, & search
├── .gitignore           # File exclude Git
└── README.md            # Dokumentasi panduan & tautan GitHub Pages
```
