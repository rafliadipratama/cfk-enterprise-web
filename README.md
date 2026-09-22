# CFK Web Explorer — Core Fundamental Knowledge for Enterprise Web Application

> **"Frameworks are perishable tools. Fundamental engineering is evergreen leverage."**

Platform edukasi web interaktif berbasis *First-Principles Software Engineering* untuk memahami **Core Fundamental Knowledge (CFK)** pada sistem web enterprise.

---

## 🚀 Cara Menjalankan

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

1. **The Core Loop & Quality Attributes Inspector**:
   - Diagram visual interaktif alur: `Client -> HTTP Request -> Web Application -> State/Persistence -> HTTP Response`.
   - Filter 6 Dimensi Kualitas (ISO/IEC 25010): *Correct? Secure? Reliable? Performant? Maintainable? Observable?*
   - Deep-dive panel untuk menginspeksi tantangan teknis di setiap komponen.

2. **7 Lapisan Core Fundamental Knowledge (CFK)**:
   - Layer 1: **Web & Network** (DNS, TCP 3-way handshake, TLS 1.3, Keep-Alive)
   - Layer 2: **Browser & Runtime** (Render tree, Event Loop, Microtask vs Macrotask, Storage)
   - Layer 3: **Server-side Computing** (Routing, Middleware Onion, Stateless JWT, Concurrency)
   - Layer 4: **Data & Persistence** (Relasional, ACID, Isolation Levels, B-Tree Index, Pool limit)
   - Layer 5: **Architecture & Modularity** (Layering, Clean Architecture, Decoupling)
   - Layer 6: **Quality & Security** (Trust boundaries, OWASP Top 10, Zero-Trust, Observability)
   - Layer 7: **Delivery & Operation** (Git, CI/CD gates, 12-Factor, Containerization, Healthchecks)
   - Dilengkapi *Fenomena Nyata*, *Jebakan Fatal (Gotcha)*, dan *Pertanyaan Wawancara Senior*.

3. **10 Pilar Inti yang Diperas (Distilled CFK)**:
   - Kartu prinsip fundamental dilengkapi dengan kartu analitik *"Fakta di Balik Framework"*.

4. **🧪 Interactive Chaos Labs (Simulasi Kerusakan Nyata)**:
   - **Lab 1: Kasus Upload Video >40s & Speech-to-Text (STT)**:
     - Membandingkan *Mode Sinkron Naif* (Blocking HTTP connection -> Nginx 504 Gateway Timeout) vs *Mode Asinkron Enterprise* (Presigned URL MinIO -> Redis Queue -> 202 Accepted -> Worker -> WebSocket).
   - **Lab 2: Kasus Concurrency & Double-Spend**:
     - Membandingkan *Tanpa Lock* (Race condition saldo negatif) vs *Pessimistic Lock (`SELECT ... FOR UPDATE`)*.
   - **Lab 3: Database Indexing & Query Latency**:
     - Membandingkan *Sequential Scan* (Membaca 1.000.000 baris, 462ms) vs *B-Tree Index Scan* (1.14ms).

5. **Evaluasi Kesiapan (Readiness Assessment)**:
   - Kuis interaktif berbasis skenario arsitektur nyata untuk menguji insting engineering Anda.

6. **Docker Compose Companion**:
   - Template satu klik berisi PostgreSQL, Redis, dan MinIO untuk praktika nyata di komputer lokal.

---

## 📂 Struktur File
```
cfk-enterprise-web/
├── index.html       # Struktur HTML semantik & tata letak platform
├── style.css        # Desain modern, tema gelap/terang, animasi glassmorphism
├── app.js           # Mesin interaktif simulator, kuis, dan visualizer
└── README.md        # Dokumentasi panduan penggunaan
```
