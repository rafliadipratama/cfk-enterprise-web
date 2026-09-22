/**
 * CFK Web Explorer — Core Application Logic
 * Interactive Engine for Enterprise Web Fundamental Knowledge
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileDrawer();
  initStudyTracks();
  initThreeQuestionsWidget();
  initQualityFilters();
  initNodeInspector();
  initConceptSearch();
  initLayersAccordion();
  initTop10Cards();
  initChaosLabs();
  initIncidentRoom();
  initStudyTracker();
  initReadinessQuiz();
  initCertificateGenerator();
  initDockerCopier();
});

/* ==========================================================================
   1. Theme Toggle & Mobile Navigation
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('cfk-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('cfk-theme', newTheme);
    showToast(`Tema diubah ke mode ${newTheme}`);
  });
}

function initMobileDrawer() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('close-drawer-btn');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, #mobile-start-sim-btn');

  if (!mobileMenuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   1.5. How to Study: Tracks & 3 Magic Questions
   ========================================================================== */
const studyTracksData = {
  beginner: {
    title: '🐣 Jalur Pemula (Spiral Track)',
    target: 'Mahasiswa / Junior Developer yang ingin menguasai web engineering dari nol.',
    duration: '3 - 5 Hari (Santai & Menyeluruh)',
    focus: 'Membangun intuisi sistem end-to-end tanpa tersesat di detail RFC.',
    steps: [
      'Buka diagram "The Core Loop" di bawah: Pahami peran Client, Server, dan Database.',
      'Coba Chaos Lab 01 (Upload Video Timeout): Rasakan langsung mengapa proses lambat tidak boleh dijalankan secara sinkron di web.',
      'Pelajari Layer 1 (Web & Network) dan Layer 2 (Browser Runtime) untuk mengerti apa yang terjadi di kawat dan browser.',
      'Pelajari Layer 3 (Server) dan Layer 4 (Data) untuk memahami arsitektur stateless dan transaksi ACID.',
      'Uji pemahaman Anda dengan Kuis Evaluasi Mandiri di akhir halaman.'
    ]
  },
  fasttrack: {
    title: '🚀 Jalur Fast-Track (Interview / Senior Prep)',
    target: 'Mid-Level Engineer yang sedang mempersiapkan System Design Interview.',
    duration: '2 - 3 Jam (Intensif & Terfokus)',
    focus: 'Concurrency Locking, Asynchronous Queues, Trust Boundaries, dan Observability.',
    steps: [
      'Gunakan tombol "Quality Attributes Filter" di Core Loop: Filter ke "Reliable", "Secure", dan "Observable".',
      'Jalankan Chaos Lab 02 (Concurrency Double-Spend): Pahami perbedaan Read Committed vs Pessimistic Lock (`FOR UPDATE`).',
      'Pelajari 10 Pilar Inti (Top 10 CFK): Baca bagian "💡 Fakta di Balik Framework" untuk menyadari apa yang disembunyikan ORM dan framework.',
      'Buka Layer 5 (Arsitektur & Decoupling) dan Layer 6 (Security Trust Boundaries): Pelajari pertanyaan wawancara di masing-masing layer.',
      'Kerjakan Uji Kesiapan Mandiri (Targetkan skor 100% / Enterprise Systems Architect).'
    ]
  },
  practitioner: {
    title: '🛠️ Jalur Praktisi (Hands-on Local Docker)',
    target: 'Developer yang belajar paling cepat lewat eksperimen langsung di terminal.',
    duration: '1 Hari Eksperimen Teknis',
    focus: 'Menghubungkan error di console/terminal lokal dengan prinsip arsitektur.',
    steps: [
      'Gulir ke bawah dan klik "Salin docker-compose.yml" untuk menyalin konfigurasi PostgreSQL (connection pool limited), Redis, dan MinIO.',
      'Jalankan `docker compose up` di mesin lokal Anda.',
      'Tembak endpoint database Anda dengan 50 concurrent request untuk mereproduksi connection pool exhaustion.',
      'Tulis script worker antrean sederhana dengan Redis untuk memproses background jobs.',
      'Gunakan platform ini sebagai kamus teori saat Anda mengamati perilaku sistem di Docker.'
    ]
  }
};

function initStudyTracks() {
  const container = document.getElementById('track-detail-box');
  const tabs = document.querySelectorAll('.track-tab-btn');
  if (!container || !tabs.length) return;

  function renderTrack(trackKey) {
    const data = studyTracksData[trackKey];
    if (!data) return;

    container.innerHTML = `
      <div class="track-meta-row">
        <div class="track-meta-item">
          <span>Target Pembelajar:</span>
          <span>${data.target}</span>
        </div>
        <div class="track-meta-item">
          <span>Estimasi Waktu:</span>
          <span>${data.duration}</span>
        </div>
        <div class="track-meta-item">
          <span>Fokus Utama:</span>
          <span>${data.focus}</span>
        </div>
      </div>
      <div class="track-steps-list">
        ${data.steps.map((step, idx) => `
          <div class="track-step-item">
            <span class="track-step-num">${idx + 1}</span>
            <span>${step}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const trackKey = tab.getAttribute('data-track');
      renderTrack(trackKey);
    });
  });

  renderTrack('beginner');
}

const threeQuestionsData = {
  redis: {
    title: 'Redis In-Memory Cache & Key-Value',
    q1: 'Akses data berulang ke harddisk/SSD database sangat lambat, serta kebutuhan session bersama yang harus bisa diakses oleh 5 instance server web yang berbeda secara instan.',
    q2: 'Database relasional overload karena dibanjiri query yang sama berulang kali, dan saat server di-scale ke 3 instance di balik load balancer, user mendadak logout saat request kedua mendarat di server berbeda.',
    q3: 'Berada di <strong>Persistence & State Tier (Layer 4)</strong> sebagai penyangga di depan database utama, atau di <strong>Compute Tier (Layer 3)</strong> sebagai distributed session store.'
  },
  rabbitmq: {
    title: 'RabbitMQ / Redis Message Queue',
    q1: 'Menghindari blocking HTTP connection pada tugas komputasi berat (misal: proses video, kirim 10.000 email, PDF generation, AI speech-to-text).',
    q2: 'Server menahan koneksi HTTP puluhan detik, thread pool server habis, Nginx reverse proxy melempar HTTP 504 Gateway Timeout, dan seluruh aplikasi macet.',
    q3: 'Berada di antara <strong>Web App Tier (Layer 3)</strong> dan <strong>Background Worker Tier (Layer 5)</strong> untuk melakukan decoupling tugas secara asinkron.'
  },
  jwt: {
    title: 'Stateless JWT (JSON Web Token)',
    q1: 'Autentikasi tanpa state (stateless) agar server web tidak perlu menyimpan session di RAM atau memanggil database autentikasi di setiap request HTTP.',
    q2: 'Server harus mengalokasikan RAM besar untuk menyimpan jutaan sesi login (rentan OOM) atau query database auth ribuan kali per detik yang membebani disk I/O.',
    q3: 'Dikirim di <strong>Header HTTP Authorization (Layer 1)</strong>, lalu diverifikasi secara matematis menggunakan cryptographic signature di <strong>Middleware (Layer 3)</strong>.'
  },
  btree: {
    title: 'B-Tree Database Index',
    q1: 'Menemukan 1 baris data spesifik di antara jutaan baris data dalam waktu logaritmik O(log N) tanpa harus membaca seluruh tabel dari awal sampai akhir.',
    q2: 'Database terpaksa melakukan Sequential Scan (membaca jutaan baris dari disk ke RAM satu per satu). CPU server DB langsung 100% dan query memakan ratusan milidetik.',
    q3: 'Tersimpan di dalam <strong>Storage Engine Database (Layer 4)</strong> sebagai struktur data pohon seimbang di samping tabel data utama.'
  },
  nginx: {
    title: 'Nginx Reverse Proxy & Load Balancer',
    q1: 'Menangani TLS termination (enkripsi HTTPS), kompresi Gzip/Brotli, rate limiting, dan mendistribusikan beban ke banyak instance server aplikasi di belakangnya.',
    q2: 'Setiap instance server (Node.js/Python) harus memproses komputasi kriptografi TLS sendiri (boros CPU), dan sistem tidak bisa di-scale horizontal tanpa IP publik untuk setiap instance.',
    q3: 'Berdiri di <strong>Batas Jaringan Paling Depan (Layer 1 & Layer 6)</strong> sebelum request menyentuh Web Application Tier.'
  },
  minio: {
    title: 'MinIO / S3 Object Storage',
    q1: 'Menyimpan file biner ukuran besar (video, gambar, audio, backup) yang tidak efisien jika disimpan di dalam kolom database relasional (BLOB) atau harddisk web server.',
    q2: 'Harddisk server web cepat penuh, database relasional mengalami pembengkakan (bloat) parah, dan server web crash saat user mengunggah file 2GB.',
    q3: 'Tersimpan di <strong>Object Storage Tier (Layer 4)</strong>, di mana client bisa mengunggah langsung via Presigned URL tanpa membebani bandwidth web server.'
  }
};

function initThreeQuestionsWidget() {
  const container = document.getElementById('three-questions-answers');
  const buttons = document.querySelectorAll('.btn-tech');
  if (!container || !buttons.length) return;

  function renderTech(techKey) {
    const data = threeQuestionsData[techKey];
    if (!data) return;

    container.innerHTML = `
      <div class="answer-card q1">
        <span class="answer-badge">Pertanyaan 1</span>
        <h4>🎯 Masalah Nyata Apa yang Diselesaikan?</h4>
        <p>${data.q1}</p>
      </div>
      <div class="answer-card q2">
        <span class="answer-badge">Pertanyaan 2</span>
        <h4>💥 Apa yang Rusak Jika Tidak Ada?</h4>
        <p>${data.q2}</p>
      </div>
      <div class="answer-card q3">
        <span class="answer-badge">Pertanyaan 3</span>
        <h4>📍 Di Mana Posisinya di The Core Loop?</h4>
        <p>${data.q3}</p>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const techKey = btn.getAttribute('data-tech');
      renderTech(techKey);
    });
  });

  renderTech('redis');
}

/* ==========================================================================
   1.6. Personal Study Progress Tracker (Saved in LocalStorage)
   ========================================================================== */
const milestonesData = [
  { id: 'm1', text: 'Memahami siklus The Core Loop & 6 Atribut Kualitas (ISO 25010)', tag: 'Model Mental' },
  { id: 'm2', text: 'Mencoba Chaos Lab 01: Upload Video Timeout vs Async Queue', tag: 'Simulasi' },
  { id: 'm3', text: 'Mencoba Chaos Lab 02: Concurrency Race Condition & Pessimistic Lock', tag: 'Simulasi' },
  { id: 'm4', text: 'Mencoba Chaos Lab 03: Database B-Tree Indexing vs Sequential Scan', tag: 'Simulasi' },
  { id: 'm4b', text: 'Mencoba Chaos Lab 04: Cache Stampede (Thundering Herd) & Singleflight', tag: 'Simulasi' },
  { id: 'm4c', text: 'Menyelesaikan Simulasi War Room Penanganan Insiden P1 & Terbitkan RCA', tag: 'War Room' },
  { id: 'm5', text: 'Membaca Konsep Kunci Layer 1 (Web/Network) & Layer 2 (Browser Runtime)', tag: '7 Layers' },
  { id: 'm6', text: 'Membaca Konsep Kunci Layer 3 (Server-side) & Layer 4 (Data & ACID)', tag: '7 Layers' },
  { id: 'm7', text: 'Mempelajari 10 Contoh Kode Produksi Riil (TypeScript, Go, Python)', tag: '10 Pilar' },
  { id: 'm8', text: 'Mengerjakan Uji Kesiapan Mandiri dan Mengklaim Sertifikat Kelulusan', tag: 'Evaluasi' }
];

function initStudyTracker() {
  const listContainer = document.getElementById('milestone-list');
  const percentEl = document.getElementById('tracker-percent');
  const barFill = document.getElementById('tracker-bar-fill');
  const summaryEl = document.getElementById('tracker-summary');
  const btnReset = document.getElementById('btn-reset-tracker');
  const btnCheckAll = document.getElementById('btn-check-all-tracker');

  if (!listContainer) return;

  const STORAGE_KEY = 'cfk-study-milestones';
  let completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function updateUI() {
    listContainer.innerHTML = milestonesData.map(m => {
      const isDone = completed.includes(m.id);
      return `
        <div class="milestone-item ${isDone ? 'done' : ''}" data-id="${m.id}">
          <div class="milestone-checkbox">
            ${isDone ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
          </div>
          <span class="milestone-text">${m.text}</span>
          <span class="milestone-tag">${m.tag}</span>
        </div>
      `;
    }).join('');

    const total = milestonesData.length;
    const count = completed.length;
    const percent = Math.round((count / total) * 100);

    if (percentEl) percentEl.textContent = `${percent}% Selesai`;
    if (barFill) barFill.style.width = `${percent}%`;
    if (summaryEl) summaryEl.textContent = `${count} dari ${total} milestone tercapai. ${percent === 100 ? '🎉 Selamat! Anda telah menguasai seluruh fondasi CFK!' : ''}`;

    // Attach click listeners to each item
    const items = listContainer.querySelectorAll('.milestone-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (completed.includes(id)) {
          completed = completed.filter(x => x !== id);
        } else {
          completed.push(id);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
        updateUI();
      });
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      completed = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      updateUI();
      showToast('Checklist belajar berhasil di-reset.');
    });
  }

  if (btnCheckAll) {
    btnCheckAll.addEventListener('click', () => {
      completed = milestonesData.map(m => m.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      updateUI();
      showToast('Luar biasa! Semua milestone ditandai selesai! 🎯');
    });
  }

  updateUI();
}

/* ==========================================================================
   1.7. Live Concept Search Engine
   ========================================================================== */
function initConceptSearch() {
  const searchInput = document.getElementById('concept-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const hintEl = document.getElementById('search-result-hint');

  if (!searchInput) return;

  function performSearch(query) {
    const q = query.trim().toLowerCase();

    if (!q) {
      if (clearBtn) clearBtn.style.display = 'none';
      if (hintEl) hintEl.textContent = '';
      // Reset all cards
      const layerCards = document.querySelectorAll('.layer-card');
      layerCards.forEach((card, idx) => {
        card.style.display = 'block';
        card.classList.toggle('open', idx === 0);
      });
      const topCards = document.querySelectorAll('.cfk-card');
      topCards.forEach(c => c.style.display = 'flex');
      return;
    }

    if (clearBtn) clearBtn.style.display = 'block';

    let layerMatchCount = 0;
    const layerCards = document.querySelectorAll('.layer-card');
    layerCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(q)) {
        card.style.display = 'block';
        card.classList.add('open');
        layerMatchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    let top10MatchCount = 0;
    const topCards = document.querySelectorAll('.cfk-card');
    topCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(q)) {
        card.style.display = 'flex';
        top10MatchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const totalMatches = layerMatchCount + top10MatchCount;
    if (hintEl) {
      if (totalMatches > 0) {
        hintEl.innerHTML = `🔍 Ditemukan <strong>${totalMatches} konsep</strong> yang cocok (${layerMatchCount} di 7 Layer, ${top10MatchCount} di 10 Pilar Inti).`;
      } else {
        hintEl.innerHTML = `❌ Tidak ditemukan kecocokan untuk kata kunci "<strong>${query}</strong>". Coba kata kunci umum seperti <em>timeout, lock, dns, acid, index, jwt, session</em>.`;
      }
    }
  }

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   2. The Core Loop & Quality Attribute Visualizer
   ========================================================================== */
const nodeQualityData = {
  client: [
    { type: 'correct', label: 'Client Validation' },
    { type: 'secure', label: 'XSS & Cookie Flags' },
    { type: 'performant', label: 'DOM Repaint & LCP' },
    { type: 'reliable', label: 'Offline / Retry' },
    { type: 'observable', label: 'RUM & Telemetry' }
  ],
  server: [
    { type: 'correct', label: 'Schema & Invariants' },
    { type: 'secure', label: 'Auth, RBAC & CSRF' },
    { type: 'reliable', label: 'Circuit Breaker' },
    { type: 'performant', label: 'Non-blocking I/O' },
    { type: 'maintainable', label: 'Layered Architecture' },
    { type: 'observable', label: 'Traces & Metrics' }
  ],
  state: [
    { type: 'correct', label: 'ACID Transactions' },
    { type: 'secure', label: 'Encrypted at Rest' },
    { type: 'reliable', label: 'Replication & Failover' },
    { type: 'performant', label: 'Indexes & Cache' },
    { type: 'maintainable', label: 'Data Migrations' },
    { type: 'observable', label: 'Slow Query Logs' }
  ]
};

const nodeDetailContent = {
  client: {
    title: '1. Client & Browser Runtime',
    badge: 'Layer 1 & 2 Focus',
    description: `Di sinilah interaksi manusia bermula. Browser bukan sekadar kanvas tampilan, melainkan runtime komputasi terdistribusi yang memiliki mesin JS (V8), render tree, dan event loop sendiri.`,
    cards: [
      {
        title: '🛡️ Keamanan & Batas Kepercayaan (Security)',
        items: [
          'Browser adalah lingkungan "Untrusted": Jangan pernah percaya input atau token yang bisa dimanipulasi di client.',
          'Penyimpanan token: Hindari `localStorage` untuk session sensitif (rentan XSS); gunakan `HttpOnly, Secure, SameSite` cookies.',
          'CORS (Cross-Origin Resource Sharing): Bukan firewall server, melainkan mekanisme perlindungan browser.'
        ]
      },
      {
        title: '⚡ Kinerja & Rendering (Performance)',
        items: [
          'Menghindari Layout Thrashing: Memahami siklus parse HTML → CSSOM → Render Tree → Layout → Paint.',
          'Manajemen bundle: Dynamic imports, tree-shaking, dan caching aset via HTTP headers (`ETag`, `Cache-Control: immutable`).'
        ]
      }
    ]
  },
  server: {
    title: '2. Web Application Server (Compute Tier)',
    badge: 'Layer 3 & 5 Focus',
    description: `Pusat kendali logika bisnis. Server bertugas mengorkestrasi request masuk, memvalidasi kontrak data, menegakkan otorisasi, dan mengisolasi kompleksitas sistem.`,
    cards: [
      {
        title: '🛡️ Validasi & Trust Boundary (Security)',
        items: [
          'Batas Validasi: Validasi di client untuk kenyamanan UX, validasi di server untuk keamanan hukum & bisnis.',
          'IAM Enterprise: Autentikasi (siapa Anda?) vs Otorisasi (apa hak Anda?) dengan RBAC/ABAC dan OAuth2/OIDC.'
        ]
      },
      {
        title: '🔄 Skalabilitas & Concurrency (Reliability)',
        items: [
          'Stateless Tier: Jangan simpan session di memori server. Izinkan load balancer mendistribusikan request ke instance mana pun.',
          'Asynchronous Decoupling: Jika proses memakan waktu >500ms, segera alihkan ke worker antrean (Queue/Job).'
        ]
      }
    ]
  },
  state: {
    title: '3. State & Persistence Tier',
    badge: 'Layer 4 Focus',
    description: `Tempat kebenaran data (*source of truth*) berada. Ini adalah lapisan paling krusial dan paling sulit di-scale karena harus menjaga konsistensi di hadapan kegagalan sistem.`,
    cards: [
      {
        title: '✅ Integritas & Transaksi (Correctness)',
        items: [
          'ACID: Atomicity (semua atau tidak sama sekali), Consistency, Isolation (mencegah race condition), Durability.',
          'Isolation Level: Mengetahui bedanya Read Committed vs Repeatable Read vs Serializable.'
        ]
      },
      {
        title: '⚡ Optimasi Akses Data (Performance)',
        items: [
          'Indexing B-Tree: Menghindari Sequential Scan pada jutaan baris data.',
          'Connection Pooling: Menghindari database crash akibat kehabisan koneksi (Pool Exhaustion).'
        ]
      }
    ]
  }
};

function renderQualityFlags(activeFilter = 'all') {
  ['client', 'server', 'state'].forEach(nodeKey => {
    const container = document.getElementById(`flags-${nodeKey}`);
    if (!container) return;
    container.innerHTML = '';

    const flags = nodeQualityData[nodeKey];
    flags.forEach(flag => {
      if (activeFilter === 'all' || activeFilter === flag.type) {
        const badge = document.createElement('span');
        badge.className = `quality-badge ${flag.type}`;
        badge.textContent = flag.label;
        container.appendChild(badge);
      }
    });
  });
}

function initQualityFilters() {
  renderQualityFlags('all');
  const buttons = document.querySelectorAll('.btn-quality');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const quality = btn.getAttribute('data-quality');
      renderQualityFlags(quality);

      const count = document.querySelectorAll('.quality-badge').length;
      showToast(`Menampilkan aspek: ${btn.textContent.trim()} (${count} titik perhatian)`);
    });
  });
}

function initNodeInspector() {
  const nodes = document.querySelectorAll('.pipe-node');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorBadge = document.getElementById('inspector-badge');
  const inspectorContent = document.getElementById('inspector-content');

  // Select server by default
  selectNode('server');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const nodeKey = node.getAttribute('data-node');
      selectNode(nodeKey);
    });
  });

  function selectNode(nodeKey) {
    nodes.forEach(n => n.classList.remove('selected'));
    const targetNode = document.querySelector(`.pipe-node[data-node="${nodeKey}"]`);
    if (targetNode) targetNode.classList.add('selected');

    const data = nodeDetailContent[nodeKey];
    if (!data) return;

    inspectorTitle.textContent = data.title;
    inspectorBadge.textContent = data.badge;

    let cardsHtml = data.cards.map(card => `
      <div class="inspector-card">
        <div class="inspector-card-title">${card.title}</div>
        <ul>
          ${card.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    inspectorContent.innerHTML = `
      <p style="margin-bottom: 1rem;">${data.description}</p>
      <div class="inspector-grid">${cardsHtml}</div>
    `;
  }
}

/* ==========================================================================
   3. The 7 Layers of Enterprise Web (Accordion Data & Render)
   ========================================================================== */
const layersData = [
  {
    num: '01',
    name: 'Web & Network',
    tagline: 'Bagaimana request berubah menjadi response di atas kawat',
    coreConcepts: 'HTTP/1.1 vs HTTP/2 & 3, URI/URL structure, DNS resolution, TCP 3-Way Handshake, TLS Handshake & Termination, Client-Server model, Keep-Alive connection.',
    realWorld: 'Mengapa CDN mempercepat akses web? Karena DNS mengarahkan user ke edge server terdekat, memotong latency Round Trip Time (RTT) pada TCP/TLS handshake.',
    gotcha: 'Mengabaikan HTTP Keep-Alive dan DNS caching. Setiap request baru membuka socket TCP baru dari nol yang membuang waktu 100-300ms untuk handshake berulang.',
    interview: 'Apa yang terjadi secara presisi dari saat user menekan Enter pada URL di address bar hingga byte pertama HTML diterima browser?'
  },
  {
    num: '02',
    name: 'Browser & Runtime',
    tagline: 'Bagaimana aplikasi dan kode berjalan di sisi client',
    coreConcepts: 'HTML Parsing, CSSOM, Render Tree, Critical Rendering Path, V8 JS Engine, Event Loop (Microtask vs Macrotask), DOM mutation, Cookie lifecycle, Web Storage API.',
    realWorld: 'Tombol UI macet atau "unresponsive" saat dipencet padahal jaringan kencang. Penyebabnya adalah synchronous JavaScript kalkulasi berat yang memblokir Thread Utama Event Loop browser.',
    gotcha: 'Menganggap `setTimeout(fn, 0)` berjalan instan. Padahal ia masuk ke Macrotask Queue dan menunggu seluruh Call Stack dan Microtask (Promises) selesai dieksekusi.',
    interview: 'Jelaskan perbedaan Microtask queue (Promise, queueMicrotask) vs Macrotask queue (setTimeout, setInterval, I/O) pada JavaScript runtime.'
  },
  {
    num: '03',
    name: 'Server-side Computing',
    tagline: 'Bagaimana server memproses request secara efisien & scalable',
    coreConcepts: 'HTTP Request dispatcher/Routing, Middleware Pipeline (Onion Pattern), Session vs Stateless JWT, Thread-per-request vs Event-driven Non-blocking I/O, CPU-bound vs I/O-bound.',
    realWorld: 'Aplikasi berbasis Node.js atau Python FastAPI bisa melayani 20.000 concurrent user saat query DB (I/O non-blocking), tapi langsung lumpuh total saat menghitung enkripsi password massal di thread utama (CPU-bound).',
    gotcha: 'Menyimpan state/session login di memori RAM instance server. Saat sistem di-scale ke 3 instance di balik Load Balancer, user mendadak logout saat request kedua mendarat di instance berbeda.',
    interview: 'Mengapa enterprise architecture lebih menyukai "Stateless Application Tier" dan di mana Anda menyimpan session jika tidak di memori lokal server?'
  },
  {
    num: '04',
    name: 'Data & Persistence',
    tagline: 'Bagaimana kebenaran data disimpan, dikonsistensikan, dan diakses',
    coreConcepts: 'Relational Model, Normalisasi, SQL vs NoSQL, Transaksi ACID, Transaction Isolation Levels (Dirty Read, Non-repeatable Read, Phantom Read), B-Tree Indexing, Connection Pooling.',
    realWorld: 'Kasus "Flash Sale" atau transfer saldo: dua orang transfer bersamaan dan saldo menjadi negatif karena developer tidak menggunakan locking (`SELECT FOR UPDATE`) atau isolation level yang tepat.',
    gotcha: 'Mengabaikan Connection Pool limit. Developer menambah instance aplikasi dari 2 menjadi 20, lalu database PostgreSQL langsung crash dengan pesan "FATAL: sorry, too many clients already".',
    interview: 'Jelaskan perbedaan isolation level Read Committed vs Serializable, dan apa implikasi performa dari masing-masing level tersebut?'
  },
  {
    num: '05',
    name: 'Architecture & Modularity',
    tagline: 'Bagaimana kompleksitas sistem dikendalikan seiring membesarnya tim',
    coreConcepts: 'Separation of Concerns (SoC), Layered Architecture (Controller-Service-Repository), Hexagonal/Clean Architecture, Dependency Inversion, Distributed Systems Fallacies, Decoupling via Queues.',
    realWorld: 'Mengubah struktur tabel database mengharuskan developer menulis ulang kode di controller dan tampilan HTML. Ini tanda arsitektur "Spaghetti" yang melanggar batas abstraksi.',
    gotcha: 'Langsung membuat Microservices di awal proyek padahal domain bisnis belum matang. Menghasilkan *Distributed Monolith* dengan semua kerumitan jaringan tanpa manfaat fleksibilitas.',
    interview: 'Kapan Anda memilih arsitektur Modular Monolith dibanding Microservices, dan bagaimana Anda mengisolasi modul agar tidak saling mengunci ketergantungan?'
  },
  {
    num: '06',
    name: 'Quality & Security',
    tagline: 'Bagaimana kualitas sistem direkayasa dan dibuktikan secara terukur',
    coreConcepts: 'Trust Boundaries, Zero-Trust Principle, OWASP Top 10 (Injection, Broken Auth, IDOR, SSRF), Rate Limiting, Idempotency, Observability Pillar (Structured Logs, Metrics, Distributed Traces).',
    realWorld: 'User bisa melihat invoice milik pelanggan lain hanya dengan mengubah angka `id` di URL `api/invoices/105` menjadi `api/invoices/106` (IDOR / Insecure Direct Object Reference).',
    gotcha: 'Hanya mencatat log berupa string acak `console.log("error occurred")` tanpa request ID / correlation ID, sehingga tim investigasi tidak bisa melacak urutan request spesifik saat production insiden.',
    interview: 'Bagaimana Anda merancang endpoint pembayaran agar sepenuhnya "Idempotent" (aman ditekan 3 kali berturut-turut oleh user yang panik)?'
  },
  {
    num: '07',
    name: 'Delivery & Operation',
    tagline: 'Bagaimana software menjadi sistem produksi yang operasional & resilient',
    coreConcepts: 'Git branching strategy, CI/CD Pipeline gates, 12-Factor App methodology, Containerization (Docker), Environment variables vs Secrets, Health Checks (Liveness/Readiness), Zero-Downtime Deployment.',
    realWorld: 'Deploy versi baru membuat web mati selama 3 menit karena container lama dimatikan sebelum container baru selesai warming up dan terhubung ke database.',
    gotcha: 'Menyimpan kredensial database di dalam image Docker atau commit file `.env` ke Git repository publik.',
    interview: 'Jelaskan perbedaan Liveness Probe vs Readiness Probe pada container orchestrator (seperti Kubernetes), dan apa yang terjadi jika Anda salah mengonfigurasinya?'
  }
];

function initLayersAccordion() {
  const container = document.getElementById('layers-accordion');
  if (!container) return;

  container.innerHTML = layersData.map((l, index) => `
    <div class="layer-card ${index === 0 ? 'open' : ''}" data-layer="${l.num}">
      <button class="layer-trigger">
        <div class="layer-meta">
          <div class="layer-num-badge">L${l.num}</div>
          <div class="layer-title-box">
            <h3>${l.name}</h3>
            <p>${l.tagline}</p>
          </div>
        </div>
        <div class="layer-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </button>
      <div class="layer-content">
        <div class="layer-detail-grid">
          <div class="detail-pane">
            <div class="pane-label primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Konsep Inti Yang Harus Dipahami
            </div>
            <p>${l.coreConcepts}</p>
          </div>
          <div class="detail-pane">
            <div class="pane-label primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Fenomena Dunia Nyata
            </div>
            <p>${l.realWorld}</p>
          </div>
          <div class="detail-pane gotcha">
            <div class="pane-label warning">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Jebakan Fatal (Gotcha)
            </div>
            <p>${l.gotcha}</p>
          </div>
          <div class="detail-pane interview">
            <div class="pane-label gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Uji Wawancara Senior
            </div>
            <p>${l.interview}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Accordion toggle behavior
  const triggers = container.querySelectorAll('.layer-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.layer-card');
      const isOpen = card.classList.contains('open');

      // Optional single-open or multi-open (let's do single-toggle for clean UX)
      card.classList.toggle('open', !isOpen);
    });
  });
}

/* ==========================================================================
   4. The 10 Essential Distilled CFK Cards
   ========================================================================== */
const top10Data = [
  {
    num: 'CFK 01',
    title: 'HTTP Semantics & Idempotency',
    desc: 'Metode (Idempotent vs Safe), status code ranges (2xx, 3xx, 4xx, 5xx), headers, content negotiation, dan persistent TCP connections.',
    frameworkTruth: 'Framework seperti Next.js atau Laravel menyamarkan header & status code lewat fungsi helper; jika tak paham semantik, Anda akan merespon error 500 dengan status 200 OK "Success".',
    snippets: {
      ts: `// Express/TS: Idempotency Key Lock via Redis
app.post('/api/pay', async (req, res) => {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ error: 'Missing Idempotency-Key' });
  const acquired = await redis.set(\`idem:\${key}\`, '1', 'NX', 'EX', 120);
  if (!acquired) return res.status(409).json({ error: 'Duplicate request in flight' });
  const tx = await processPayment(req.body);
  return res.status(201).json(tx);
});`,
      go: `// Go: Idempotency Lock via Redis SET NX
func PayHandler(w http.ResponseWriter, r *http.Request) {
    key := r.Header.Get("Idempotency-Key")
    if key == "" { http.Error(w, "Missing Idempotency-Key", 400); return }
    ok, _ := rdb.SetNX(ctx, "idem:"+key, "1", 120*time.Second).Result()
    if !ok {
        http.Error(w, "Conflict: duplicate request", http.StatusConflict)
        return
    }
    w.WriteHeader(http.StatusCreated)
}`,
      py: `# FastAPI: Idempotency Header Dependency
@app.post("/api/pay", status_code=201)
async def pay(req: PayRequest, idem_key: str = Header(...)):
    if not await redis.set(f"idem:{idem_key}", "1", nx=True, ex=120):
        raise HTTPException(status_code=409, detail="Duplicate request in flight")
    return {"status": "charge_created"}`
    }
  },
  {
    num: 'CFK 02',
    title: 'Network & DNS Fundamentals',
    desc: 'Bagaimana hostname diterjemahkan jadi IP, TLS handshake 1.3, TCP Congestion Control, dan latency Round-Trip Time (RTT).',
    frameworkTruth: 'Banyak engineer menyalahkan backend lambat, padahal latensi 80% berasal dari DNS cold-lookup dan tidak adanya TLS termination di edge/CDN.',
    snippets: {
      ts: `// Node.js: Persistent HTTP Agent (Connection Pooling)
import http from 'http';
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
  timeout: 5000
});
const res = await fetch('https://api.internal/data', { agent });`,
      go: `// Go: Reusable http.Transport with Connection Pool
var httpClient = &http.Client{
    Timeout: 5 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        IdleConnTimeout:     90 * time.Second,
        TLSHandshakeTimeout: 3 * time.Second,
    },
}`,
      py: `# Python httpx: Persistent Connection Pool
import httpx
client = httpx.AsyncClient(
    limits=httpx.Limits(max_keepalive_connections=50, max_connections=100),
    timeout=5.0
)`
    }
  },
  {
    num: 'CFK 03',
    title: 'Browser & Runtime Model',
    desc: 'Event loop, single-threaded execution, Call Stack, Microtasks (Promises), Macrotasks, dan mekanisme rendering DOM/CSSOM.',
    frameworkTruth: 'React Virtual DOM hanyalah abstraksi JavaScript; pemahaman sesungguhnya adalah kapan browser melakukan Reflow dan Repaint.',
    snippets: {
      ts: `// Node.js: Worker Thread to prevent event-loop starvation
import { Worker } from 'worker_threads';
function hashPasswordAsync(pwd: string): Promise<string> {
  return new Promise((resolve) => {
    const worker = new Worker('./hasher.js', { workerData: pwd });
    worker.on('message', resolve);
  });
}`,
      go: `// Go: Goroutine Worker non-blocking runtime
go func(pwd string) {
    hash := computeBcrypt(pwd)
    hashChan <- hash
}(password)`,
      py: `# Python asyncio: Offload heavy compute to executor
import asyncio
loop = asyncio.get_running_loop()
hashed = await loop.run_in_executor(None, compute_heavy_hash, pwd)`
    }
  },
  {
    num: 'CFK 04',
    title: 'Asynchronous & Concurrency',
    desc: 'Perbedaan mendasar antara I/O-bound (menunggu socket/disk) vs CPU-bound (komputasi intensif), worker threads, dan non-blocking queues.',
    frameworkTruth: 'Menulis async/await bukan berarti kode Anda paralel! Jika Anda memanggil loop synchronous berat, seluruh server non-blocking tetap membeku.',
    snippets: {
      ts: `// Node.js BullMQ: Decoupled Job Producer
import { Queue } from 'bullmq';
const sttQueue = new Queue('stt_tasks', { connection: redisConn });
app.post('/transcribe', async (req, res) => {
  const job = await sttQueue.add('stt_job', { fileUrl: req.body.url });
  res.status(202).json({ jobId: job.id, status: 'QUEUED' });
});`,
      go: `// Go: Buffered Job Channel & Worker Pool
type Job struct { URL string }
var jobQueue = make(chan Job, 5000)

func Worker() {
    for j := range jobQueue {
        processSTT(j.URL) // Decoupled from HTTP router
    }
}`,
      py: `# FastAPI: Celery Decoupled Task
@celery_app.task
def run_stt_task(url: str):
    return whisper.transcribe(url)

@app.post("/transcribe", status_code=202)
def transcribe(url: str):
    task = run_stt_task.delay(url)
    return {"job_id": task.id, "status": "QUEUED"}`
    }
  },
  {
    num: 'CFK 05',
    title: 'State Management & Caching',
    desc: 'Ephemeral state di memory vs durable state di database. Mengapa stateless web tier adalah syarat mutlak horizontal scaling.',
    frameworkTruth: 'State bukan cuma Redux/Zustand di browser. Di sistem enterprise, state adalah konsistensi data antara Redis cache dan PostgreSQL.',
    snippets: {
      ts: `// TypeScript: Cache-Aside with Redis TTL
async function getProduct(id: string) {
  const cached = await redis.get(\`prod:\${id}\`);
  if (cached) return JSON.parse(cached);
  const data = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  await redis.set(\`prod:\${id}\`, JSON.stringify(data), 'EX', 300);
  return data;
}`,
      go: `// Go: Cache-Aside Pattern
func GetProduct(ctx context.Context, id string) (*Product, error) {
    val, err := rdb.Get(ctx, "prod:"+id).Result()
    if err == nil { return parseProduct(val), nil }
    prod, _ := dbQueryProduct(id)
    rdb.Set(ctx, "prod:"+id, prod.JSON(), 300*time.Second)
    return prod, nil
}`,
      py: `# Python: Cache-Aside Pattern
async def get_product(id: str):
    cached = await redis.get(f"prod:{id}")
    if cached: return json.loads(cached)
    data = await db.fetch_one("SELECT * FROM products WHERE id = :id", {"id": id})
    await redis.set(f"prod:{id}", json.dumps(data), ex=300)
    return data`
    }
  },
  {
    num: 'CFK 06',
    title: 'Data & Transactions (ACID)',
    desc: 'Model relasional, transaksi ACID, isolation levels (Read Committed vs Serializable), B-Tree Indexing, dan Connection Pooling.',
    frameworkTruth: 'ORM (Hibernate/Prisma/TypeORM) menyembunyikan query SQL mentah; tanpa paham transaksi dan index, ORM akan memicu masalah query N+1 dan deadlock.',
    snippets: {
      ts: `// Knex/Postgres: SELECT ... FOR UPDATE (Row Lock)
await knex.transaction(async (trx) => {
  const acc = await trx('accounts').where('id', accountId).forUpdate().first();
  if (acc.balance < amount) throw new Error('Insufficient balance');
  await trx('accounts').where('id', accountId).decrement('balance', amount);
});`,
      go: `// Go: sql.Tx Pessimistic Row Lock
tx, _ := db.BeginTx(ctx, nil)
defer tx.Rollback()
var bal int64
tx.QueryRowContext(ctx, "SELECT balance FROM accounts WHERE id=$1 FOR UPDATE", id).Scan(&bal)
if bal < amt { return ErrInsufficient }
tx.ExecContext(ctx, "UPDATE accounts SET balance = balance - $1 WHERE id=$2", amt, id)
tx.Commit()`,
      py: `# SQLAlchemy: with_for_update() Row Lock
with Session.begin() as session:
    acc = session.query(Account).with_for_update().filter_by(id=acc_id).one()
    if acc.balance < amount:
        raise ValueError("Insufficient balance")
    acc.balance -= amount`
    }
  },
  {
    num: 'CFK 07',
    title: 'API & Contract (Boundary)',
    desc: 'REST vs gRPC, skema validasi (JSON Schema/Protobuf), backward compatibility, versioning, dan semantik error payload.',
    frameworkTruth: 'API bukan sekadar endpoint URL sembarangan. Ini adalah kontrak hukum antara client dan server yang tidak boleh rusak saat deployment.',
    snippets: {
      ts: `// Zod Schema Validation (Fail fast at boundary)
import { z } from 'zod';
const CreateUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN'])
});
const validated = CreateUserSchema.parse(req.body);`,
      go: `// Go: Struct Validation with go-playground/validator
type UserPayload struct {
    Email string \`json:"email" validate:"required,email"\`
    Role  string \`json:"role" validate:"required,oneof=USER ADMIN"\`
}
if err := validate.Struct(payload); err != nil {
    return http.StatusBadRequest
}`,
      py: `# FastAPI / Pydantic Boundary Schema
from pydantic import BaseModel, EmailStr
from typing import Literal

class UserSchema(BaseModel):
    email: EmailStr
    role: Literal['USER', 'ADMIN']`
    }
  },
  {
    num: 'CFK 08',
    title: 'Architecture & Modularity',
    desc: 'Separation of Concerns (SoC), Layering (Controller-Service-Repo), Dependency Inversion, dan isolasi domain boundaries.',
    frameworkTruth: 'Framework sering menyodorkan struktur folder default; arsitek sejati mengatur boundary domain agar sistem mudah dites tanpa database aktif.',
    snippets: {
      ts: `// TS: Interface-based Repository (Decoupled from ORM)
interface OrderRepository {
  save(order: Order): Promise<void>;
}
class OrderService {
  constructor(private repo: OrderRepository) {}
  async checkout(order: Order) { await this.repo.save(order); }
}`,
      go: `// Go: Interface defined at consumption site
type OrderRepository interface {
    Save(ctx context.Context, order *Order) error
}
type OrderService struct {
    repo OrderRepository
}
func (s *OrderService) Checkout(ctx context.Context, o *Order) error {
    return s.repo.Save(ctx, o)
}`,
      py: `# Python Protocol / Abstract Dependency Inversion
from typing import Protocol

class OrderRepository(Protocol):
    async def save(self, order: Order) -> None: ...

class OrderService:
    def __init__(self, repo: OrderRepository):
        self.repo = repo`
    }
  },
  {
    num: 'CFK 09',
    title: 'Security & Trust Boundaries',
    desc: 'Zero-Trust, Sanitasi input di server, OWASP Top 10, AuthN vs AuthZ, Token lifecycle (Access/Refresh), dan CSRF/CORS.',
    frameworkTruth: 'Validasi form di frontend (HTML5/React) semata-mata untuk UX. Batas keamanan sesungguhnya ada di server middleware.',
    snippets: {
      ts: `// Parameterized Query (Never concatenate raw strings!)
// BAD:  db.raw(\`SELECT * FROM users WHERE id = '\${req.query.id}'\`)
// GOOD:
const user = await db.query(
  'SELECT id, name FROM users WHERE id = $1',
  [req.query.id]
);`,
      go: `// Go: Parameterized Query Placeholder
// BAD:  db.Query("SELECT * FROM users WHERE id = '" + id + "'")
// GOOD:
row := db.QueryRowContext(ctx, "SELECT id, name FROM users WHERE id = $1", id)`,
      py: `# Python asyncpg: Parameterized query placeholder
# BAD:  await db.execute(f"SELECT * FROM users WHERE id = '{id}'")
# GOOD:
row = await db.fetch_row("SELECT id, name FROM users WHERE id = $1", id)`
    }
  },
  {
    num: 'CFK 10',
    title: 'Software Quality & Observability',
    desc: 'Tiga pilar observabilitas: Metrics, Structured Logs, Distributed Tracing (TraceID & SpanID), serta penanganan failure (Timeout & Retry).',
    frameworkTruth: 'Membaca log di production bukan mencari console.log("here"), melainkan melacak Trace ID yang menembus 5 service berbeda secara real-time.',
    snippets: {
      ts: `// Winston/Pino: Structured JSON Log with TraceID
logger.info({
  event: 'payment_processed',
  traceId: req.headers['x-trace-id'] || generateTraceId(),
  userId: user.id,
  durationMs: 42.5
});`,
      go: `// Go: slog Structured Logger with Trace Context
slog.InfoContext(ctx, "payment_processed",
    "trace_id", ctx.Value("trace_id"),
    "user_id", user.ID,
    "duration_ms", 42.5,
)`,
      py: `# Python structlog / JSON Logging with Context
structlog.get_logger().info(
    "payment_processed",
    trace_id=request.headers.get("x-trace-id"),
    user_id=user.id,
    duration_ms=42.5
)`
    }
  }
];

function initTop10Cards() {
  const container = document.getElementById('top-10-grid');
  if (!container) return;

  function escapeCode(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  container.innerHTML = top10Data.map((c, idx) => `
    <div class="cfk-card" data-card-index="${idx}">
      <div>
        <div class="cfk-top">
          <span class="cfk-badge">${c.num}</span>
          <span style="font-size: 1.1rem;">⚡</span>
        </div>
        <h3 class="cfk-title">${c.title}</h3>
        <p class="cfk-desc">${c.desc}</p>
      </div>
      <div class="cfk-framework-truth">
        <span class="truth-label">💡 Fakta di Balik Framework</span>
        ${c.frameworkTruth}
      </div>
      <div class="cfk-code-section">
        <div class="code-tabs-header">
          <span class="code-title">Kode Produksi:</span>
          <div class="code-lang-pills">
            <button class="lang-pill active" data-lang="ts">TS / Node</button>
            <button class="lang-pill" data-lang="go">Go</button>
            <button class="lang-pill" data-lang="py">Python</button>
          </div>
        </div>
        <div class="code-block-wrapper">
          <pre><code class="code-pane lang-ts">${escapeCode(c.snippets.ts)}</code><code class="code-pane lang-go" style="display:none;">${escapeCode(c.snippets.go)}</code><code class="code-pane lang-py" style="display:none;">${escapeCode(c.snippets.py)}</code></pre>
          <button class="btn-copy-code" title="Salin Kode">Salin</button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners for language tabs
  container.querySelectorAll('.cfk-card').forEach(card => {
    const pills = card.querySelectorAll('.lang-pill');
    const panes = card.querySelectorAll('.code-pane');
    const copyBtn = card.querySelector('.btn-copy-code');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const lang = pill.getAttribute('data-lang');
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        panes.forEach(pane => {
          if (pane.classList.contains(`lang-${lang}`)) {
            pane.style.display = 'block';
          } else {
            pane.style.display = 'none';
          }
        });
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const activePane = Array.from(panes).find(p => p.style.display !== 'none');
        if (activePane) {
          try {
            await navigator.clipboard.writeText(activePane.textContent);
            showToast('Kode contoh berhasil disalin! 📋');
          } catch (e) {
            showToast('Kode contoh disalin! 📋');
          }
        }
      });
    }
  });
}

/* ==========================================================================
   5. Interactive Chaos Labs (The Real-World Simulator)
   ========================================================================== */
const labDefinitions = {
  'video-stt': {
    title: 'Kasus Nyata: Upload Video >40s & Speech-to-Text (STT)',
    desc: 'Pengguna mengunggah video rapat 85MB berdurasi 45 detik untuk ditranskripsikan ke teks. Saksikan perbedaan arsitektur sinkron naif vs asinkron enterprise.',
    modes: [
      { id: 'sync', label: '❌ Mode A: Sinkron Naif (Monolith)', isDanger: true },
      { id: 'async', label: '✅ Mode B: Asinkron Enterprise (Queue + MinIO)', isDanger: false }
    ],
    renderParams: (mode) => `
      <div class="param-row">
        <span>Ukuran File:</span>
        <span class="param-value">85.4 MB (MP4 Video)</span>
      </div>
      <div class="param-row">
        <span>Waktu Proses Model STT:</span>
        <span class="param-value">~18.5 Detik</span>
      </div>
      <div class="param-row">
        <span>Batas Timeout Gateway (Nginx):</span>
        <span class="param-value">${mode === 'sync' ? '15.0 Detik' : 'Tidak berpengaruh (Async)'}</span>
      </div>
      <div class="param-row">
        <span>Arsitektur Pemrosesan:</span>
        <span class="param-value">${mode === 'sync' ? 'Main HTTP Thread Blocking' : 'Decoupled Worker (Redis + MinIO)'}</span>
      </div>
    `,
    runSimulation: (mode, logger, setProgress, setStatus, setInsight) => {
      logger.clear();
      setStatus('running', 'Menjalankan...');
      setProgress(0);

      if (mode === 'sync') {
        logger.info('[00:00.00] 📤 Client: Mengirim POST /api/v1/transcribe (85MB Multipart Body)...');
        setProgress(20);

        setTimeout(() => {
          logger.info('[00:03.20] 📥 Server: Menerima seluruh buffer video ke disk lokal server.');
          logger.warn('[00:03.50] ⏳ Server: Memanggil Whisper STT engine secara SINKRON pada HTTP Worker Thread #12.');
          logger.warn('[00:07.00] ⚠️ Server: Thread #12 TERBLOKIR menunggu komputasi audio selesai.');
          logger.warn('[00:11.00] ⚠️ Connection: Browser/Reverse-Proxy terus menahan TCP Socket terbuka...');
          setProgress(65);
        }, 1200);

        setTimeout(() => {
          logger.error('[00:15.00] 💥 Gateway: Nginx proxy_read_timeout (15s) TERLAMPAUI!');
          logger.error('[00:15.01] 🔴 Response: HTTP/1.1 504 Gateway Timeout');
          logger.error('[00:15.05] ❌ Client UI: Layar blank / pesan "Network Error", user mengunggah ulang (beban ganda)!');
          setProgress(100, true);
          setStatus('fail', 'HTTP 504 Gateway Timeout');
          setInsight(`
            <strong>Mengapa Ini Terjadi?</strong><br>
            1. <em>Blocking I/O</em>: Server menahan koneksi HTTP untuk tugas komputasi berat.<br>
            2. <em>Reverse-Proxy Timeout</em>: Gateway (Nginx/Cloudflare) memutuskan koneksi yang idle >15 detik.<br>
            3. <em>Thread Starvation</em>: Jika 10 user upload bersamaan, seluruh pool thread server habis dan aplikasi crash total (HTTP 500/503).
          `);
        }, 2800);

      } else {
        logger.info('[00:00.01] 🔑 Client: Meminta Presigned URL upload ke server...');
        logger.info('[00:00.04] 🌐 Server: Mengembalikan URL upload langsung ke MinIO Object Storage (50ms).');
        setProgress(25);

        setTimeout(() => {
          logger.info('[00:01.20] ☁️ Client: Mengunggah video langsung ke MinIO (Bypass Web Server!).');
          logger.info('[00:01.50] 📩 Client: Mengirim metadata job: POST /api/jobs { fileId: "vid_9882" }');
          logger.info('[00:01.55] 📬 Server: Push job ke Redis/RabbitMQ Queue "stt_tasks".');
          logger.success('[00:01.60] ⚡ Server: HTTP/1.1 202 Accepted { jobId: "job_xyz", eta: "20s" } (Latensi 50ms!)');
          setProgress(60);
          setStatus('running', 'HTTP 202 Accepted (Background Processing)');
        }, 1100);

        setTimeout(() => {
          logger.info('[00:02.80] 🤖 Worker Pod #4: Mengambil "job_xyz" dari Redis queue.');
          logger.info('[00:03.50] 🎯 Worker Pod #4: Download file dari MinIO dan jalankan STT GPU inference...');
          logger.success('[00:05.20] ✅ Worker: Transkrip selesai! Simpan hasil ke PostgreSQL.');
          logger.success('[00:05.30] 🔔 WebSocket / SSE: Notifikasi ke browser client: "Transkrip Selesai!"');
          setProgress(100);
          setStatus('success', 'Berhasil: Decoupled & Resilient');
          setInsight(`
            <strong>Kemenangan Arsitektur Enterprise:</strong><br>
            1. <em>Direct-to-Storage Upload</em>: Server aplikasi tidak terbebani bandwidth file 85MB.<br>
            2. <em>Fast Response (202 Accepted)</em>: HTTP response kembali dalam <100ms, terhindar dari timeout Nginx.<br>
            3. <em>Decoupling via Queue</em>: Beban komputasi ditangani worker pod terpisah secara elastis.
          `);
        }, 3000);
      }
    }
  },

  'race-condition': {
    title: 'Kasus Concurrency: Race Condition & Double-Spend',
    desc: 'Rekening memiliki saldo Rp 100.000. Dua transaksi penarikan @ Rp 100.000 masuk di milidetik yang sama. Saksikan bagaimana saldo bisa menjadi minus jika transaksi database tidak dikunci!',
    modes: [
      { id: 'naive', label: '❌ Tanpa Locking / Read Committed Naif', isDanger: true },
      { id: 'locked', label: '✅ Dengan Pessimistic Lock (FOR UPDATE)', isDanger: false }
    ],
    renderParams: (mode) => `
      <div class="param-row">
        <span>Saldo Awal Rekening:</span>
        <span class="param-value">Rp 100.000</span>
      </div>
      <div class="param-row">
        <span>Jumlah Penarikan (Req 1 & Req 2):</span>
        <span class="param-value">2 x Rp 100.000 (Paralel)</span>
      </div>
      <div class="param-row">
        <span>Mekanisme Database:</span>
        <span class="param-value">${mode === 'naive' ? 'Standard SELECT -> UPDATE' : 'SELECT ... FOR UPDATE (Row Lock)'}</span>
      </div>
    `,
    runSimulation: (mode, logger, setProgress, setStatus, setInsight) => {
      logger.clear();
      setStatus('running', 'Menjalankan 2 thread paralel...');
      setProgress(0);

      logger.info('[T0.00ms] 🚀 Transaksi A (ATM) & Transaksi B (Mobile App) masuk bersamaan!');

      if (mode === 'naive') {
        setTimeout(() => {
          logger.info('[T1.10ms] 🔍 Thread A: SELECT balance FROM accounts WHERE id = 1 -> (Hasil: 100.000)');
          logger.info('[T1.12ms] 🔍 Thread B: SELECT balance FROM accounts WHERE id = 1 -> (Hasil: 100.000)');
          logger.warn('[T2.00ms] ⚠️ Keduanya menganggap saldo Rp 100.000 cukup untuk penarikan Rp 100.000!');
          setProgress(50);
        }, 800);

        setTimeout(() => {
          logger.warn('[T3.10ms] 💾 Thread A: UPDATE accounts SET balance = 100000 - 100000 (Saldo: 0) -> COMMIT');
          logger.error('[T3.25ms] 💥 Thread B: UPDATE accounts SET balance = 0 - 100000 (Saldo: -100.000) -> COMMIT');
          logger.error('[T4.00ms] 🔴 HASIL FATAL: Saldo akhir = -Rp 100.000! Nasabah berhasil menarik Rp 200.000!');
          setProgress(100, true);
          setStatus('fail', 'Bug Finansial: Saldo Negatif');
          setInsight(`
            <strong>Penyebab Race Condition:</strong><br>
            Kedua thread membaca nilai saldo yang sama (100.000) sebelum salah satu sempat mengubahnya (*Lost Update anomaly*).<br>
            Validasi di level kode aplikasi (misal: <code>if (saldo >= tarikan)</code>) <strong>TIDAK BERGUNA</strong> jika database tidak mengunci baris data secara atomik!
          `);
        }, 2200);

      } else {
        setTimeout(() => {
          logger.info('[T1.10ms] 🔒 Thread A: SELECT balance FROM accounts WHERE id = 1 FOR UPDATE');
          logger.info('[T1.15ms] 🛡️ Database: Row ID 1 DIKUNCI oleh Transaksi A (Exclusive Lock).');
          logger.info('[T1.20ms] ⏳ Thread B: SELECT ... FOR UPDATE terblokir! Menunggu Transaksi A selesai...');
          setProgress(50);
        }, 800);

        setTimeout(() => {
          logger.info('[T2.50ms] 💾 Thread A: Potong saldo Rp 100.000 (Sisa: 0) -> COMMIT & Release Lock.');
          logger.info('[T2.55ms] 🔓 Database: Kunci dilepas. Thread B melanjutkan eksekusi...');
          logger.info('[T2.60ms] 🔍 Thread B: Membaca saldo terbaru -> Rp 0!');
          logger.success('[T2.70ms] 🚫 Thread B: Ditolak dengan anggun: "Saldo tidak mencukupi." (HTTP 422)');
          setProgress(100);
          setStatus('success', 'Kebenaran Data Terjaga (ACID)');
          setInsight(`
            <strong>Keunggulan Pessimistic Locking:</strong><br>
            Dengan <code>SELECT ... FOR UPDATE</code>, database menjamin hanya 1 transaksi yang boleh memproses baris tersebut dalam satu waktu.<br>
            Integritas data bisnis terlindungi 100% dari kegagalan sistem konkuren.
          `);
        }, 2400);
      }
    }
  },

  'db-index': {
    title: 'Kasus Akses Data: Database Indexing & Query Latency',
    desc: 'Tabel pengguna berisi 1.000.000 baris data. Jalankan query pencarian email pengguna dan perhatikan perbedaan drastis antara Full Table Scan vs B-Tree Index Scan.',
    modes: [
      { id: 'seq', label: '❌ Tanpa Index (Sequential Scan)', isDanger: true },
      { id: 'index', label: '✅ Dengan B-Tree Index (Index Scan)', isDanger: false }
    ],
    renderParams: (mode) => `
      <div class="param-row">
        <span>Jumlah Record Data:</span>
        <span class="param-value">1.000.000 Baris</span>
      </div>
      <div class="param-row">
        <span>Target Query:</span>
        <span class="param-value">SELECT * FROM users WHERE email = 'ceo@corp.com'</span>
      </div>
      <div class="param-row">
        <span>Metode Scan Disk:</span>
        <span class="param-value">${mode === 'seq' ? 'Sequential Scan (Membaca 1jt blok)' : 'B-Tree Index Scan (Tree Traversal O(log N))'}</span>
      </div>
    `,
    runSimulation: (mode, logger, setProgress, setStatus, setInsight) => {
      logger.clear();
      setStatus('running', 'Mengeksekusi EXPLAIN ANALYZE...');
      setProgress(0);

      logger.info(`[Query] EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ceo@corp.com';`);

      if (mode === 'seq') {
        setTimeout(() => {
          logger.warn('[I/O] ⚠️ Database engine: Membaca seluruh block tabel dari disk storage...');
          logger.warn('[I/O] ⚠️ 250.000 baris dipindai... (CPU 98%)');
          setProgress(40);
        }, 700);

        setTimeout(() => {
          logger.warn('[I/O] ⚠️ 750.000 baris dipindai... Menghabiskan I/O buffer pool.');
          logger.error('[Result] -> Seq Scan on users (cost=0.00..18450.00 rows=1 width=84)');
          logger.error('[Result] -> Filter: (email = \'ceo@corp.com\')');
          logger.error('[Result] -> Rows Removed by Filter: 999999');
          logger.error('[Metric] ⏱️ Execution Time: 462.85 ms (SANGAT LAMBAT)');
          setProgress(100, true);
          setStatus('fail', '462.85 ms (High I/O Load)');
          setInsight(`
            <strong>Dampak Buruk Tanpa Index:</strong><br>
            Database harus membaca 1 juta baris satu per satu dari disk storage ke RAM.<br>
            Jika ada 50 query serupa bersamaan, CPU server database langsung 100% dan seluruh aplikasi berhenti merespons.
          `);
        }, 2200);

      } else {
        setTimeout(() => {
          logger.info('[I/O] 🌲 Database engine: Menemukan B-Tree Index "idx_users_email".');
          logger.info('[I/O] ⚡ Membaca Root node -> Branch node -> Leaf node (Hanya 3 block disk!).');
          setProgress(70);
        }, 600);

        setTimeout(() => {
          logger.success('[Result] -> Index Scan using idx_users_email on users (cost=0.42..8.44 rows=1)');
          logger.success('[Result] -> Index Cond: (email = \'ceo@corp.com\')');
          logger.success('[Metric] ⏱️ Execution Time: 1.14 ms (350x Lebih Cepat!)');
          setProgress(100);
          setStatus('success', '1.14 ms (Optimal O(log N))');
          setInsight(`
            <strong>Keajaiban B-Tree Index:</strong><br>
            Dengan struktur B-Tree, database tidak perlu membaca 1 juta data. Cukup menavigasi cabang pohon setinggi 3-4 lompatan O(log N).<br>
            Latensi turun dari hampir setengah detik menjadi 1 milidetik!
          `);
        }, 1400);
      }
    }
  },

  'cache-stampede': {
    title: 'Kasus Cache: Cache Stampede (Thundering Herd) & Connection Exhaustion',
    desc: 'Key cache "flash_sale_items" baru saja expired (TTL habis). Tiba-tiba 5.000 user merequest data tersebut di detik yang sama. Saksikan bagaimana database connection pool ambruk jika tidak ada Singleflight Mutex!',
    modes: [
      { id: 'stampede', label: '❌ Mode A: Naive Cache Miss (Thundering Herd)', isDanger: true },
      { id: 'singleflight', label: '✅ Mode B: Singleflight Mutex / Lock', isDanger: false }
    ],
    renderParams: (mode) => `
      <div class="param-row">
        <span>Beban Request Masuk:</span>
        <span class="param-value">5.000 Concurrent Requests / dtk</span>
      </div>
      <div class="param-row">
        <span>Status Cache Redis:</span>
        <span class="param-value" style="color: var(--accent-rose); font-weight:700;">TTL EXPIRED (Cache Miss 100%)</span>
      </div>
      <div class="param-row">
        <span>Batas Connection Pool DB:</span>
        <span class="param-value">50 Max Connections</span>
      </div>
      <div class="param-row">
        <span>Strategi Handler:</span>
        <span class="param-value">${mode === 'stampede' ? 'Semua request langsung query PostgreSQL' : 'Singleflight Group (Hanya 1 in-flight DB query)'}</span>
      </div>
    `,
    runSimulation: (mode, logger, setProgress, setStatus, setInsight) => {
      logger.clear();
      setStatus('running', 'Memproses lonjakan 5.000 request...');
      setProgress(0);

      logger.info('[T0.00ms] ⚡ 5.000 concurrent request masuk ke GET /api/v1/flash-sale...');
      logger.warn('[T0.02ms] ⚠️ Redis: Key "flash_sale_items" NOT FOUND (Expired TTL)!');

      if (mode === 'stampede') {
        setTimeout(() => {
          logger.error('[T0.10ms] 💥 Thundering Herd: 5.000 thread aplikasi serentak memanggil DB: SELECT * FROM items WHERE is_promo = true');
          logger.error('[T0.25ms] 🚨 PostgreSQL Connection Pool: 50/50 koneksi langsung TERPAKAI PENUH!');
          logger.error('[T0.40ms] ⚠️ 4.950 request lainnya terjebak dalam antrean tunggu socket pool...');
          setProgress(50);
        }, 800);

        setTimeout(() => {
          logger.warn('[T1.20s] ⏳ CPU Database Server melonjak ke 100%!');
          logger.error('[T3.50s] 💥 Database Driver Timeout: "FATAL: connection pool exhausted (timeout after 3000ms)"');
          logger.error('[T3.80s] 🔴 Nginx Gateway: 504 Gateway Timeout dikirimkan ke ribuan user!');
          logger.error('[T4.00s] ❌ HASIL FATAL: 96% request GAGAL total. Kerugian omset flash sale!');
          setProgress(100, true);
          setStatus('fail', 'Pool Exhaustion: 504 Gateway Timeout');
          setInsight(`
            <strong>Akar Masalah Cache Stampede (Thundering Herd):</strong><br>
            1. Ketika key populer expired, ribuan thread aplikasi serentak mengalami <em>cache miss</em>.<br>
            2. Seluruh thread tersebut berebut menembak database untuk mengkalkulasi ulang data yang sama persis.<br>
            3. Akibatnya, connection pool database langsung jenuh (<em>exhausted</em>), CPU 100%, dan server web tumbang berjamaah.
          `);
        }, 2200);

      } else {
        setTimeout(() => {
          logger.info('[T0.05ms] 🔒 Singleflight Mutex: Request #1 mengambil hak eksklusif mengisi cache.');
          logger.info('[T0.08ms] 🛡️ 4.999 request lainnya menahan panggilan dan mendaftar ke listener channel yang sama.');
          logger.info('[T0.12ms] 💾 PostgreSQL: Menerima TEPAT 1 QUERY SAJA dari Request #1 (Pool 1/50).');
          setProgress(50);
        }, 800);

        setTimeout(() => {
          logger.info('[T0.28ms] ⚡ Database mengembalikan hasil promo items (Latency: 8.2ms).');
          logger.info('[T0.30ms] 🔑 Singleflight: Hasil disimpan kembali ke Redis (SETEX flash_sale_items 300).');
          logger.success('[T0.32ms] 📢 Singleflight: Hasil di-broadcast ke 4.999 request yang menunggu di memory.');
          logger.success('[T0.35ms] ✅ 5.000 / 5.000 Request SUKSES! HTTP/2 200 OK (Avg latency: 12ms, DB CPU: 3%).');
          setProgress(100);
          setStatus('success', '100% Sukses: 1 Query ke DB (Zero Pool Starvation)');
          setInsight(`
            <strong>Kemenangan Singleflight / Mutex Pattern:</strong><br>
            1. <em>Request Collapsing</em>: Berapa pun jumlah request paralel yang datang saat cache miss, hanya <strong>1 query nyata</strong> yang dikirim ke database.<br>
            2. Request lainnya menunggu promise/channel dari request pertama dan menerima data hasil cache secara simultan.<br>
            3. Database tetap santai (1 koneksi terpakai dari 50), dan seluruh 5.000 user mendapatkan respon dalam belasan milidetik!
          `);
        }, 2200);
      }
    }
  }
};

let currentLabKey = 'video-stt';
let currentLabMode = 'sync';

function initChaosLabs() {
  const tabButtons = document.querySelectorAll('.lab-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLabKey = btn.getAttribute('data-lab');
      currentLabMode = labDefinitions[currentLabKey].modes[0].id;
      renderLab();
    });
  });

  renderLab();
}

function renderLab() {
  const lab = labDefinitions[currentLabKey];
  const container = document.getElementById('lab-container');
  if (!container || !lab) return;

  container.innerHTML = `
    <div class="lab-split">
      <!-- Left Controls -->
      <div class="lab-controls">
        <div class="lab-title-area">
          <h3>${lab.title}</h3>
          <p>${lab.desc}</p>
        </div>

        <div class="mode-selector">
          ${lab.modes.map(m => `
            <button class="mode-btn ${m.id === currentLabMode ? 'active' : ''} ${m.isDanger ? 'danger' : ''}" data-mode="${m.id}">
              ${m.label}
            </button>
          `).join('')}
        </div>

        <div class="lab-param-box">
          <div class="param-title">Parameter Simulasi</div>
          <div id="param-rows">
            ${lab.renderParams(currentLabMode)}
          </div>
        </div>

        <button id="btn-run-sim" class="btn btn-primary" style="width: 100%; padding: 0.85rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Jalankan Simulasi Alur
        </button>
      </div>

      <!-- Right Visualizer -->
      <div class="lab-visualizer">
        <div class="terminal-box">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot dot-red"></span>
              <span class="terminal-dot dot-yellow"></span>
              <span class="terminal-dot dot-green"></span>
            </div>
            <div class="terminal-title">system-events.log — bash stdout</div>
          </div>
          <div class="terminal-body" id="sim-terminal">
            <div class="terminal-line" style="color: #6b7280;">// Siap menjalankan simulasi. Tekan tombol "Jalankan Simulasi Alur" di sebelah kiri.</div>
          </div>
        </div>

        <div class="exec-status-card">
          <div class="status-row">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Status Eksekusi:</span>
            <span class="status-badge waiting" id="sim-status-badge">Menunggu Trigger</span>
          </div>
          <div class="sim-progress">
            <div class="sim-progress-fill" id="sim-progress-bar"></div>
          </div>
          <div class="sim-insight" id="sim-insight-box">
            Pilih mode arsitektur dan jalankan simulasi untuk melihat analisis kegagalan atau keberhasilan sistem di sini.
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach mode buttons
  const modeBtns = container.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLabMode = btn.getAttribute('data-mode');
      document.getElementById('param-rows').innerHTML = lab.renderParams(currentLabMode);
      document.getElementById('sim-status-badge').className = 'status-badge waiting';
      document.getElementById('sim-status-badge').textContent = 'Mode Diubah (Siap)';
      document.getElementById('sim-progress-bar').style.width = '0%';
      document.getElementById('sim-progress-bar').classList.remove('error');
    });
  });

  // Attach run button
  const runBtn = document.getElementById('btn-run-sim');
  runBtn.addEventListener('click', () => {
    const terminal = document.getElementById('sim-terminal');
    const progressBar = document.getElementById('sim-progress-bar');
    const statusBadge = document.getElementById('sim-status-badge');
    const insightBox = document.getElementById('sim-insight-box');

    const logger = {
      clear: () => { terminal.innerHTML = ''; },
      info: (msg) => appendLine(msg, 'info'),
      warn: (msg) => appendLine(msg, 'warn'),
      error: (msg) => appendLine(msg, 'error'),
      success: (msg) => appendLine(msg, 'success')
    };

    function appendLine(msg, type) {
      const line = document.createElement('div');
      line.className = `terminal-line ${type}`;
      line.textContent = msg;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }

    const setProgress = (percent, isError = false) => {
      progressBar.style.width = `${percent}%`;
      progressBar.classList.toggle('error', isError);
    };

    const setStatus = (type, text) => {
      statusBadge.className = `status-badge ${type}`;
      statusBadge.textContent = text;
    };

    const setInsight = (html) => {
      insightBox.innerHTML = html;
    };

    lab.runSimulation(currentLabMode, logger, setProgress, setStatus, setInsight);
  });
}

/* ==========================================================================
   5.5. Incident War Room Simulator (Root Cause Analysis Game)
   ========================================================================== */
const incidentState = {
  currentStep: 1,
  cpu: 96,
  pool: 100,
  latency: 8450,
  errorRate: 52.8,
  status: 'critical',
  triageSelected: null,
  fixSelected: null
};

function initIncidentRoom() {
  const contentContainer = document.getElementById('war-step-content');
  if (!contentContainer) return;

  renderIncidentStep(1);
}

function updateIncidentTelemetry(cpu, pool, latency, errorRate, isHealthy = false) {
  incidentState.cpu = cpu;
  incidentState.pool = pool;
  incidentState.latency = latency;
  incidentState.errorRate = errorRate;

  const cpuVal = document.getElementById('telem-cpu-val');
  const cpuBar = document.getElementById('telem-cpu-bar');
  const cpuCard = document.getElementById('telem-cpu-card');
  const poolVal = document.getElementById('telem-pool-val');
  const poolBar = document.getElementById('telem-pool-bar');
  const poolCard = document.getElementById('telem-pool-card');
  const latVal = document.getElementById('telem-latency-val');
  const latBar = document.getElementById('telem-latency-bar');
  const latCard = document.getElementById('telem-latency-card');
  const errVal = document.getElementById('telem-error-val');
  const errBar = document.getElementById('telem-error-bar');
  const errCard = document.getElementById('telem-error-card');
  const banner = document.getElementById('incident-banner');
  const bannerTitle = document.getElementById('incident-status-title');
  const bannerDesc = document.getElementById('incident-status-desc');
  const badge = document.getElementById('incident-severity-badge');

  if (cpuVal) {
    cpuVal.textContent = `${cpu}%`;
    cpuBar.style.width = `${cpu}%`;
    cpuVal.className = `telem-val ${isHealthy ? 'healthy' : 'critical'}`;
    cpuBar.className = `telem-bar-fill ${isHealthy ? 'healthy' : 'critical'}`;
    if (cpuCard) cpuCard.className = `telemetry-card ${isHealthy ? 'healthy' : 'critical'}`;
  }

  if (poolVal) {
    poolVal.textContent = `${pool} / 100`;
    poolBar.style.width = `${pool}%`;
    poolVal.className = `telem-val ${isHealthy ? 'healthy' : 'critical'}`;
    poolBar.className = `telem-bar-fill ${isHealthy ? 'healthy' : 'critical'}`;
    if (poolCard) poolCard.className = `telemetry-card ${isHealthy ? 'healthy' : 'critical'}`;
  }

  if (latVal) {
    latVal.textContent = `${latency} ms`;
    latBar.style.width = `${Math.min(100, Math.round((latency / 9000) * 100))}%`;
    latVal.className = `telem-val ${isHealthy ? 'healthy' : 'critical'}`;
    latBar.className = `telem-bar-fill ${isHealthy ? 'healthy' : 'critical'}`;
    if (latCard) latCard.className = `telemetry-card ${isHealthy ? 'healthy' : 'critical'}`;
  }

  if (errVal) {
    errVal.textContent = `${errorRate}%`;
    errBar.style.width = `${Math.min(100, Math.round(errorRate * 2))}%`;
    errVal.className = `telem-val ${isHealthy ? 'healthy' : 'critical'}`;
    errBar.className = `telem-bar-fill ${isHealthy ? 'healthy' : 'critical'}`;
    if (errCard) errCard.className = `telemetry-card ${isHealthy ? 'healthy' : 'critical'}`;
  }

  if (banner) {
    if (isHealthy) {
      banner.classList.add('recovered');
      bannerTitle.textContent = 'STATUS: OPERATIONAL — Sistem Normal & Terlindungi';
      bannerDesc.textContent = 'Semua metrik kembali hijau. Latensi p99 < 35ms, Database Pool aman.';
      badge.textContent = 'RECOVERED';
      badge.className = 'banner-badge recovered';
    } else {
      banner.classList.remove('recovered');
      bannerTitle.textContent = 'STATUS: P1 CRITICAL OUTAGE — Flash Sale Checkout Stalled';
      bannerDesc.textContent = 'Active Alert: HTTP 504 Spiking, Database Connection Pool Saturated (100/100)';
      badge.textContent = 'SEVERITY 1';
      badge.className = 'banner-badge critical';
    }
  }
}

function updateWarStepIndicators(activeStep) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`war-step-indicator-${i}`);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i === activeStep) {
      el.classList.add('active');
    } else if (i < activeStep) {
      el.classList.add('done');
    }
  }
}

function renderIncidentStep(step) {
  incidentState.currentStep = step;
  updateWarStepIndicators(step);
  const container = document.getElementById('war-step-content');
  if (!container) return;

  if (step === 1) {
    // Phase 1: Triage
    container.innerHTML = `
      <div class="triage-intro">
        <h4>Fase 1: Triase Darurat (Stop the Bleeding)</h4>
        <p>Traffic promo flash sale mencapai 15.000 req/detik. Database Connection Pool PostgreSQL telah jenuh 100/100, p99 latency 8,45s, dan 52% request user gagal dengan status HTTP 504. Apa aksi triase darurat pertama Anda?</p>
      </div>

      <div class="triage-options-grid">
        <div class="triage-card" data-triage="restart-db">
          <div class="triage-card-header">
            <h5>Aksi A: Restart Server PostgreSQL</h5>
            <span class="triage-badge">Infrastruktur</span>
          </div>
          <p>Lakukan restart paksa instance database agar semua koneksi lama terputus dan memori RAM bersih seketika.</p>
        </div>

        <div class="triage-card" data-triage="scale-pods">
          <div class="triage-card-header">
            <h5>Aksi B: Auto-Scale Web Pods (+10 Instance)</h5>
            <span class="triage-badge">Komputasi</span>
          </div>
          <p>Tingkatkan kapasitas server aplikasi web dari 4 pod menjadi 14 pod untuk menampung traffic request yang membludak.</p>
        </div>

        <div class="triage-card" data-triage="rate-limit">
          <div class="triage-card-header">
            <h5>Aksi C: Edge Rate Limiter & Degrade Non-Critical</h5>
            <span class="triage-badge">Batas Jaringan</span>
          </div>
          <p>Aktifkan shedding load di Nginx/Cloudflare (rate limit 5 req/user), dan matikan sementara fitur rekomendasi & search non-esensial.</p>
        </div>
      </div>

      <div class="triage-feedback-box" id="triage-feedback"></div>

      <div style="display: flex; justify-content: flex-end;">
        <button id="btn-next-war-step" class="btn btn-primary" style="display: none;">
          Lanjut ke Fase 2: Investigasi Root Cause &rarr;
        </button>
      </div>
    `;

    const cards = container.querySelectorAll('.triage-card');
    const feedback = document.getElementById('triage-feedback');
    const nextBtn = document.getElementById('btn-next-war-step');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected-correct', 'selected-wrong'));
        const choice = card.getAttribute('data-triage');

        if (choice === 'restart-db') {
          card.classList.add('selected-wrong');
          feedback.className = 'triage-feedback-box error show';
          feedback.innerHTML = `
            <strong>❌ Keputusan Fatal!</strong><br>
            Merestart database di tengah lonjakan traffic memutus transaksi aktif di tengah jalan (data in-flight korup). Detik pertama database hidup kembali, ribuan koneksi dari Nginx langsung menyerbu kembali dan database crash seketika dalam loop kegagalan!
          `;
          updateIncidentTelemetry(98, 100, 9200, 78.4, false);
          nextBtn.style.display = 'none';
        } else if (choice === 'scale-pods') {
          card.classList.add('selected-wrong');
          feedback.className = 'triage-feedback-box error show';
          feedback.innerHTML = `
            <strong>❌ Kondisi Makin Memburuk!</strong><br>
            Akar masalah ada di database connection pool. Menambah 10 pod web baru berarti membuka 10 x 20 = 200 koneksi baru ke database yang sudah sekarat. Database langsung mengalami OOM (Out Of Memory) Crash!
          `;
          updateIncidentTelemetry(99, 100, 11000, 89.2, false);
          nextBtn.style.display = 'none';
        } else if (choice === 'rate-limit') {
          card.classList.add('selected-correct');
          feedback.className = 'triage-feedback-box success show';
          feedback.innerHTML = `
            <strong>✅ Tepat Sekali! (First-Principles Triage)</strong><br>
            Saat sistem saturasi, tindakan pertama adalah <em>shed load</em> (menghentikan pendarahan). Dengan menahan request liar di edge gateway dan mematikan rute non-kritis, traffic yang menembus ke database berkurang 60%. Database kembali punya ruang bernapas.
          `;
          updateIncidentTelemetry(64, 68, 1850, 12.0, false);
          nextBtn.style.display = 'inline-flex';
          nextBtn.addEventListener('click', () => renderIncidentStep(2));
        }
      });
    });

  } else if (step === 2) {
    // Phase 2: Root Cause Investigation
    container.innerHTML = `
      <div class="triage-intro">
        <h4>Fase 2: Investigasi Root Cause (Slow Query & Profiler)</h4>
        <p>Sistem sudah stabil sementara berkat rate limiter. Sekarang mari kita cari tahu mengapa 1 database pool bisa habis total padahal server baru menerima 15.000 req/detik. Buka log profil query:</p>
      </div>

      <div class="slow-query-box">
        <span class="comment">-- LOG TELEMETRI DATABASE: pg_stat_activity & slow_query.log</span><br>
        <span class="keyword">LOG:</span> duration: <span class="highlight-val">7.842 ms</span> execute &lt;unnamed&gt;:<br>
        <span class="keyword">SELECT</span> * <span class="keyword">FROM</span> orders<br>
        <span class="keyword">WHERE</span> user_id = <span class="highlight-val">'usr_8892'</span> <span class="keyword">AND</span> status = <span class="highlight-val">'PENDING'</span><br>
        <span class="keyword">ORDER BY</span> created_at <span class="keyword">DESC</span>;<br><br>
        <span class="comment">-- EXPLAIN ANALYZE OUTPUT:</span><br>
        -&gt; <span class="keyword" style="color:#fb7185;">Seq Scan on orders</span> (cost=0.00..89240.12 rows=1 width=248) (actual time=7840.12..7842.30 rows=1 loops=1)<br>
        &nbsp;&nbsp;&nbsp;Filter: ((status = 'PENDING') AND (user_id = 'usr_8892'))<br>
        &nbsp;&nbsp;&nbsp;<span style="color:#fb7185; font-weight:700;">Rows Removed by Filter: 4.182.930 baris dipindai tanpa INDEX!</span><br>
        Total Runtime: <span class="highlight-val">7.842 ms</span><br><br>
        <span class="comment">-- APPLICATION CONNECTION POOL LEAK TRACE:</span><br>
        <span class="keyword">WARN:</span> Connection #34 acquired at CheckoutController.ts:48 was <span style="color:#fb7185; font-weight:700;">NEVER RELEASED</span> back to pool because payment error bypassed try/finally block!
      </div>

      <div class="triage-feedback-box success show">
        <strong>Temuan Investigasi:</strong><br>
        1. <strong>Missing Composite Index</strong>: Query checkout memindai 4,1 juta baris tabel <code>orders</code> secara berurutan (Sequential Scan) setiap kali user mengecek status.<br>
        2. <strong>Connection Pool Leak</strong>: Blok kode exception handler di controller tidak membungkus <code>conn.release()</code> di dalam <code>finally</code>, sehingga koneksi menggantung selamanya.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button id="btn-back-step-1" class="btn btn-outline">&larr; Kembali</button>
        <button id="btn-step-3" class="btn btn-primary">Lanjut ke Fase 3: Resolusi Permanen &rarr;</button>
      </div>
    `;

    document.getElementById('btn-back-step-1').addEventListener('click', () => renderIncidentStep(1));
    document.getElementById('btn-step-3').addEventListener('click', () => renderIncidentStep(3));

  } else if (step === 3) {
    // Phase 3: Permanent Resolution
    container.innerHTML = `
      <div class="triage-intro">
        <h4>Fase 3: Eksekusi Perbaikan Permanen (Permanent Fix)</h4>
        <p>Anda telah mengidentifikasi 2 akar masalah fatal. Pilih paket hotfix yang harus segera di-deploy ke production:</p>
      </div>

      <div class="triage-options-grid">
        <div class="triage-card" data-fix="nosql">
          <div class="triage-card-header">
            <h5>Solusi A: Migrasi Database ke NoSQL / MongoDB</h5>
            <span class="triage-badge">Arsitektur Radikal</span>
          </div>
          <p>Ganti database relasional ke dokumen NoSQL karena dipercaya lebih cepat menangani traffic besar.</p>
        </div>

        <div class="triage-card" data-fix="index-pool">
          <div class="triage-card-header">
            <h5>Solusi B: Index Concurrently + Connection Pool Guard</h5>
            <span class="triage-badge">First-Principles Fix</span>
          </div>
          <p>Jalankan <code>CREATE INDEX CONCURRENTLY idx_orders_user_status ON orders(user_id, status);</code> dan perbaiki connection release dengan block <code>try/finally</code> & timeout 2 detik.</p>
        </div>
      </div>

      <div class="triage-feedback-box" id="fix-feedback"></div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button id="btn-back-step-2" class="btn btn-outline">&larr; Kembali</button>
        <button id="btn-step-4" class="btn btn-primary" style="display: none;">Lihat Laporan Post-Mortem RCA &rarr;</button>
      </div>
    `;

    const cards = container.querySelectorAll('.triage-card');
    const feedback = document.getElementById('fix-feedback');
    const nextBtn = document.getElementById('btn-step-4');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected-correct', 'selected-wrong'));
        const fix = card.getAttribute('data-fix');

        if (fix === 'nosql') {
          card.classList.add('selected-wrong');
          feedback.className = 'triage-feedback-box error show';
          feedback.innerHTML = `
            <strong>❌ Keputusan Tidak Tepat!</strong><br>
            Migrasi ke NoSQL tidak menyelesaikan masalah indexing buruk dan transaksi atomik checkout. Selain memakan waktu berminggu-minggu, Anda akan kehilangan garansi ACID untuk transaksi keuangan!
          `;
          nextBtn.style.display = 'none';
        } else if (fix === 'index-pool') {
          card.classList.add('selected-correct');
          feedback.className = 'triage-feedback-box success show';
          feedback.innerHTML = `
            <strong>🎉 Kemenangan Sempurna! Sistem Pulih 100%!</strong><br>
            Index <code>CONCURRENTLY</code> dibuat tanpa mengunci tabel. Latensi query langsung turun dari 7.840ms ke 1,2ms! Koneksi yang bocor tertutup rapi oleh blok <code>try/finally</code>.
          `;
          // Animate recovery
          updateIncidentTelemetry(16, 12, 26, 0.0, true);
          nextBtn.style.display = 'inline-flex';
          nextBtn.addEventListener('click', () => renderIncidentStep(4));
        }
      });
    });

    document.getElementById('btn-back-step-2').addEventListener('click', () => renderIncidentStep(2));

  } else if (step === 4) {
    // Phase 4: Post-Mortem Report
    const rcaMarkdown = generatePostMortemMarkdown();
    container.innerHTML = `
      <div class="triage-intro">
        <h4>Fase 4: Laporan Resmi Post-Mortem (Root Cause Analysis)</h4>
        <p>Insiden berhasil dimitigasi dan diatasi sepenuhnya dalam 22 menit. Di perusahaan teknologi kelas dunia, setiap insiden besar wajib diakhiri dengan <em>Blameless Post-Mortem</em> untuk pembelajaran tim engineering:</p>
      </div>

      <div class="postmortem-container" id="postmortem-text">${escapeHtml(rcaMarkdown)}</div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; flex-wrap: wrap;">
        <button id="btn-copy-rca" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Salin Dokumen RCA (Markdown)
        </button>
        <button id="btn-restart-war-room" class="btn btn-outline">
          🔄 Ulangi Simulasi War Room
        </button>
      </div>
    `;

    document.getElementById('btn-copy-rca').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(rcaMarkdown);
        showToast('Laporan RCA berhasil disalin ke clipboard! 📋');
      } catch (e) {
        showToast('Laporan RCA disalin! 📋');
      }
    });

    document.getElementById('btn-restart-war-room').addEventListener('click', () => {
      updateIncidentTelemetry(96, 100, 8450, 52.8, false);
      renderIncidentStep(1);
    });
  }
}

function generatePostMortemMarkdown() {
  return `# INCIDENT POST-MORTEM REPORT (RCA)
## Insiden P1: Flash Sale Checkout Outage & Database Pool Saturated

- **Status**: RESOLVED (Blameless RCA)
- **Tanggal Insiden**: 22 September 2026, 02:15 WIB - 02:37 WIB (Durasi: 22 Menit)
- **Incident Commander**: On-Call Principal Systems Engineer
- **Impact**: ~14.200 transaksi tertunda, p99 latensi melonjak ke 8.450ms, 52.8% request gagal dengan HTTP 504.

### 1. Root Cause Summary (Akar Masalah)
Insiden disebabkan oleh kombinasi dua faktor fundamental:
1. **Missing Composite Index**: Endpoint pengecekan status pesanan melakukan Sequential Scan terhadap 4,18 juta baris tabel 'orders', menghabiskan CPU database dan menahan koneksi selama 7.840ms per query.
2. **Connection Pool Leak**: Error handling di controller tidak mengeksekusi 'conn.release()' di dalam blok 'finally', sehingga koneksi database tidak pernah dikembalikan ke pool.

### 2. Timeline Kejadian
- **02:15 WIB**: Promo flash sale aktif, traffic melonjak ke 15.000 req/detik.
- **02:17 WIB**: Alert Prometheus menembak P1 Alert: Database Pool 100% Saturated.
- **02:19 WIB**: On-Call mengaktifkan Edge Rate Limiter di Nginx & mematikan fitur non-kritis (Load Shedding).
- **02:24 WIB**: Slow query log mengidentifikasi query 'SELECT ... FROM orders' tanpa index composite.
- **02:29 WIB**: Eksekusi 'CREATE INDEX CONCURRENTLY idx_orders_user_status ON orders(user_id, status)'.
- **02:33 WIB**: Hotfix deployment try/finally connection release & pool acquire timeout (2000ms).
- **02:37 WIB**: Semua metrik kembali normal (CPU 16%, Latensi 26ms, Error 0.0%). Insiden ditutup.

### 3. Tindakan Pencegahan Jangka Panjang (Action Items)
1. Pasang CI Lint check untuk melarang perolehan DB connection tanpa 'try/finally' atau 'using' scope.
2. Pasang automated slow query alert untuk query dengan execution time > 200ms di staging.
3. Terapkan Singleflight / Request Collapsing pada query read-heavy yang sering diakses bersamaan.
`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ==========================================================================
   6. Readiness Assessment Quiz (Root Cause Scenarios)
   ========================================================================== */
const quizQuestions = [
  {
    scenario: 'SKENARIO ARSITEKTUR 1 / 5',
    question: 'Aplikasi Anda menerima lonjakan traffic saat gajian. Server web (Node.js/Spring Boot) langsung crash dengan error "FATAL: remaining connection slots are reserved for non-replication superuser connections". Apa akar masalahnya?',
    options: [
      { text: 'A. RAM server web habis karena memproses terlalu banyak JSON response.', correct: false },
      { text: 'B. Connection Pool database tidak dibatasi, sehingga penambahan instance web menghabiskan batas max_connections PostgreSQL.', correct: true },
      { text: 'C. DNS server mengalami cache poisoning sehingga request diarahkan ke IP yang salah.', correct: false },
      { text: 'D. Nginx reverse proxy kehabisan file descriptors.', correct: false }
    ],
    explanation: 'Benar! Di arsitektur enterprise, setiap instance server web membuka kolam koneksi (Connection Pool) ke DB. Jika 10 instance masing-masing membuka pool 50 koneksi, itu berarti 500 koneksi aktif. Jika batas PostgreSQL adalah 100, database akan menolak koneksi dan aplikasi crash.'
  },
  {
    scenario: 'SKENARIO ARSITEKTUR 2 / 5',
    question: 'Frontend Single Page Application (SPA) mengirim request PUT /api/user/profile. Di tab Network DevTools, Anda melihat browser mengirim request OPTIONS terlebih dahulu sebelum PUT. Mengapa browser melakukan ini?',
    options: [
      { text: 'A. Bug pada browser Google Chrome yang menduplikasi request.', correct: false },
      { text: 'B. Mekanisme CORS Preflight: Browser memastikan apakah server mengizinkan method PUT dan header custom dari origin tersebut.', correct: true },
      { text: 'C. Server web meminta otorisasi ulang via OAuth2 handshake.', correct: false },
      { text: 'D. Browser memverifikasi apakah sertifikat TLS sudah kadaluarsa.', correct: false }
    ],
    explanation: 'Tepat! Request selain GET/POST sederhana (atau yang memiliki custom headers) dianggap non-simple request oleh spesifikasi W3C. Browser otomatis mengirim request HTTP OPTIONS preflight untuk memverifikasi kebijakan Access-Control-Allow-Origin sebelum mengirim payload utama.'
  },
  {
    scenario: 'SKENARIO ARSITEKTUR 3 / 5',
    question: 'User mengunggah file laporan PDF 150MB. Tim developer menggunakan endpoint synchronous POST /reports/generate yang membutuhkan waktu 45 detik. Di server production di balik Nginx, user selalu melihat error HTTP 504. Solusi terbaik sesuai CFK adalah:',
    options: [
      { text: 'A. Menaikkan timeout Nginx menjadi 10 menit agar koneksi tidak terputus.', correct: false },
      { text: 'B. Mengubah arsitektur menjadi asynchronous: Upload file ke S3/MinIO, push job ke Message Queue (RabbitMQ/Redis), return HTTP 202 Accepted segera.', correct: true },
      { text: 'C. Meminta user mengompres file PDF sebelum mengunggah.', correct: false },
      { text: 'D. Mengganti database relational menjadi NoSQL MongoDB.', correct: false }
    ],
    explanation: 'Luar biasa! Menaikkan timeout adalah solusi sementara yang berbahaya karena menahan thread server (thread starvation). Pola enterprise sejati adalah mendecouple tugas komputasi berat lewat Job Queue dan segera merespon 202 Accepted ke client.'
  },
  {
    scenario: 'SKENARIO ARSITEKTUR 4 / 5',
    question: 'Dua orang pengguna bersamaan menekan tombol "Beli Tiket Terakhir". Tiket berhasil terjual ke KEDUA orang tersebut padahal stok hanya 1. Di layer manakah pertahanan yang WAJIB dipasang untuk mencegah insiden ini?',
    options: [
      { text: 'A. Browser Layer: Disable tombol "Beli" via JavaScript setelah klik pertama.', correct: false },
      { text: 'B. Web Server Layer: Buat variabel global in-memory `let isSold = false;`.', correct: false },
      { text: 'C. Data & Persistence Layer: Gunakan Transaksi ACID dengan Pessimistic Locking (`FOR UPDATE`) atau Unique Constraint atomik.', correct: true },
      { text: 'D. Network Layer: Pasang Cloudflare Rate Limiter.', correct: false }
    ],
    explanation: 'Akurat! Disable tombol di browser bisa di-bypass dengan cURL. Variabel memory server gagal saat server di-scale >1 instance. Satu-satunya sumber kebenaran yang dapat menegakkan integritas konkurensi adalah Database Lock (Pessimistic atau Optimistic Versioning).'
  },
  {
    scenario: 'SKENARIO ARSITEKTUR 5 / 5',
    question: 'Mengapa arsitek sistem enterprise sangat menekankan prinsip "Stateless Application Tier" (tidak menyimpan session user di RAM server)?',
    options: [
      { text: 'A. Agar RAM server bisa dipakai untuk mining cryptocurrency.', correct: false },
      { text: 'B. Agar server bisa di-restart, di-scale up/down secara horizontal di balik Load Balancer tanpa membuat user logout tiba-tiba.', correct: true },
      { text: 'C. Karena protokol HTTP tidak mendukung pengiriman cookie.', correct: false },
      { text: 'D. Agar aplikasi bisa berjalan lebih cepat tanpa perlu database.', correct: false }
    ],
    explanation: 'Sempurna! Jika session disimpan di RAM instance A, saat instance A crash atau Load Balancer mengarahkan request ke instance B, user akan mendadak kehilangan sesi login. Dengan menyimpan session di distributed cache (Redis) atau JWT terverifikasi, aplikasi menjadi elastis.'
  }
];

let currentQuizIndex = 0;
let userQuizScore = 0;
let answered = false;

function initReadinessQuiz() {
  renderQuestion();

  const nextBtn = document.getElementById('btn-next-quiz');
  nextBtn.addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex < quizQuestions.length) {
      answered = false;
      renderQuestion();
      nextBtn.disabled = true;
    } else {
      renderQuizResult();
    }
  });
}

function renderQuestion() {
  const q = quizQuestions[currentQuizIndex];
  document.getElementById('quiz-current').textContent = currentQuizIndex + 1;
  document.getElementById('quiz-total').textContent = quizQuestions.length;

  const progressPercent = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

  const quizBody = document.getElementById('quiz-body');
  quizBody.innerHTML = `
    <div class="question-scenario">${q.scenario}</div>
    <div class="question-text">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, idx) => `
        <div class="quiz-option" data-index="${idx}">
          <span>${opt.text}</span>
        </div>
      `).join('')}
    </div>
    <div class="quiz-explanation" id="quiz-expl">
      ${q.explanation}
    </div>
  `;

  const optionEls = quizBody.querySelectorAll('.quiz-option');
  optionEls.forEach(el => {
    el.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const selectedIdx = parseInt(el.getAttribute('data-index'));
      const isCorrect = q.options[selectedIdx].correct;

      if (isCorrect) {
        el.classList.add('correct');
        userQuizScore++;
      } else {
        el.classList.add('incorrect');
        // Highlight correct one
        q.options.forEach((opt, idx) => {
          if (opt.correct) optionEls[idx].classList.add('correct');
        });
      }

      document.getElementById('quiz-expl').classList.add('show');
      document.getElementById('btn-next-quiz').disabled = false;
    });
  });
}

function renderQuizResult() {
  const card = document.getElementById('quiz-card');
  const percent = Math.round((userQuizScore / quizQuestions.length) * 100);

  let title = '';
  let badgeClass = '';
  let advice = '';

  if (percent >= 80) {
    title = '🏆 Enterprise Systems Architect';
    badgeClass = 'color: var(--accent-emerald);';
    advice = 'Pemahaman fundamental Anda luar biasa! Anda tidak terkecoh oleh ilusi framework dan mampu mendiagnosis masalah sistem dari first-principles.';
  } else if (percent >= 60) {
    title = '⭐ Solid Mid-Level Engineer';
    badgeClass = 'color: var(--accent-cyan);';
    advice = 'Fondasi Anda sudah kuat. Perdalam lagi aspek Concurrency Locking dan Asynchronous Decoupling untuk mencapai level arsitek.';
  } else {
    title = '🌱 Framework-Centric Developer';
    badgeClass = 'color: var(--accent-amber);';
    advice = 'Anda mungkin sudah mahir mengetik kode React atau Express, namun sering bingung saat bertemu insiden production. Gunakan modul 7 Layer dan Chaos Lab di platform ini untuk memperdalam fondasi Anda!';
  }

  card.innerHTML = `
    <div style="text-align: center; padding: 1.5rem 0;">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">${percent >= 80 ? '🎯' : '📊'}</div>
      <h3 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; ${badgeClass}">${title}</h3>
      <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        Skor Anda: <strong>${userQuizScore} / ${quizQuestions.length} (${percent}%)</strong>
      </p>
      <div style="max-width: 580px; margin: 0 auto 2rem; background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--accent-cyan); text-align: left; font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
        ${advice}
      </div>
      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" id="btn-claim-cert-quiz">
          🎓 Terbitkan Sertifikat Kelulusan
        </button>
        <button class="btn btn-outline" onclick="location.reload()">
          Ulangi Evaluasi
        </button>
      </div>
    </div>
  `;

  const certBtn = document.getElementById('btn-claim-cert-quiz');
  if (certBtn) {
    certBtn.addEventListener('click', () => {
      if (typeof window.openCertificateModal === 'function') {
        window.openCertificateModal();
      }
    });
  }
}

/* ==========================================================================
   7. Docker Compose Companion Copier
   ========================================================================== */
const dockerComposeYaml = `version: '3.8'

services:
  # 1. State: PostgreSQL dengan batas koneksi untuk testing connection pooling
  postgres:
    image: postgres:16-alpine
    container_name: cfk-postgres
    environment:
      POSTGRES_USER: cfk_user
      POSTGRES_PASSWORD: cfk_password
      POSTGRES_DB: cfk_enterprise
    ports:
      - "5432:5432"
    command: ["postgres", "-c", "max_connections=30", "-c", "log_statement=all"]
    volumes:
      - pgdata:/var/lib/postgresql/data

  # 2. State & Queue: Redis untuk distributed session & background task queue
  redis:
    image: redis:7-alpine
    container_name: cfk-redis
    ports:
      - "6379:6379"

  # 3. Object Store: MinIO (S3-compatible) untuk upload video & presigned URL
  minio:
    image: minio/minio:latest
    container_name: cfk-minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadminpassword
    command: server /data --console-address ":9001"

volumes:
  pgdata:
`;

function initDockerCopier() {
  const btn = document.getElementById('btn-copy-docker');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(dockerComposeYaml);
      showToast('docker-compose.yml berhasil disalin ke clipboard! 📋');
    } catch (e) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = dockerComposeYaml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('docker-compose.yml disalin ke clipboard! 📋');
    }
  });
}

/* ==========================================================================
   7.5. Digital Certificate Generator (Canvas Engine)
   ========================================================================== */
function initCertificateGenerator() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('close-cert-modal');
  const closeSecondaryBtn = document.getElementById('btn-close-cert-secondary');
  const updateBtn = document.getElementById('btn-update-cert');
  const downloadBtn = document.getElementById('btn-download-cert');
  const nameInput = document.getElementById('cert-user-name');
  const claimTrackerBtn = document.getElementById('btn-claim-certificate-tracker');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const name = nameInput ? nameInput.value.trim() || 'Software Engineer' : 'Software Engineer';
    drawCertificate(name);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (claimTrackerBtn) claimTrackerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeSecondaryBtn) closeSecondaryBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (updateBtn && nameInput) {
    updateBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || 'Software Engineer';
      drawCertificate(name);
      showToast('Preview sertifikat diperbarui! 🎓');
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const name = nameInput.value.trim() || 'Software Engineer';
        drawCertificate(name);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.getElementById('cert-canvas');
      if (!canvas) return;
      const rawName = nameInput ? nameInput.value.trim() || 'Engineer' : 'Engineer';
      const cleanName = rawName.replace(/[^a-zA-Z0-9]/g, '_');
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `CFK-Mastery-Certificate-${cleanName}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Sertifikat berhasil diunduh! 🎓✨');
    });
  }

  // Global window opener for quiz result button
  window.openCertificateModal = openModal;
}

function drawCertificate(recipientName) {
  const canvas = document.getElementById('cert-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;  // 1200
  const height = canvas.height; // 750

  // 1. Background Luxury Deep Dark
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#060913');
  bgGrad.addColorStop(0.5, '#0b1120');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Blueprint Subtle Grid Pattern
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 30;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 3. Double Gold & Neon Border
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Decorative Corner Accents
  const cornerSize = 25;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath(); ctx.moveTo(25, 25 + cornerSize); ctx.lineTo(25, 25); ctx.lineTo(25 + cornerSize, 25); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(width - 25 - cornerSize, 25); ctx.lineTo(width - 25, 25); ctx.lineTo(width - 25, 25 + cornerSize); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(25, height - 25 - cornerSize); ctx.lineTo(25, height - 25); ctx.lineTo(25 + cornerSize, height - 25); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(width - 25 - cornerSize, height - 25); ctx.lineTo(width - 25, height - 25); ctx.lineTo(width - 25, height - 25 - cornerSize); ctx.stroke();

  // 4. Header Badge / Issuer
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 13px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GOOGLE ANTIGRAVITY — ENTERPRISE SYSTEMS ARCHITECTURE', width / 2, 85);

  // 5. Main Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CERTIFICATE OF MASTERY', width / 2, 140);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 16px "Fira Code", monospace';
  ctx.fillText('CORE FUNDAMENTAL KNOWLEDGE (CFK) — ENTERPRISE WEB', width / 2, 175);

  // Divider Line
  const divGrad = ctx.createLinearGradient(width / 2 - 150, 0, width / 2 + 150, 0);
  divGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
  divGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.8)');
  divGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, 195);
  ctx.lineTo(width / 2 + 180, 195);
  ctx.stroke();

  // 6. Presentation text
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Sertifikat ini dengan bangga dianugerahkan kepada:', width / 2, 240);

  // 7. Recipient Name
  const nameGrad = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
  nameGrad.addColorStop(0, '#38bdf8');
  nameGrad.addColorStop(0.5, '#ffffff');
  nameGrad.addColorStop(1, '#818cf8');
  ctx.fillStyle = nameGrad;
  ctx.font = '800 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(recipientName, width / 2, 310);

  // Name Underline
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 260, 325);
  ctx.lineTo(width / 2 + 260, 325);
  ctx.stroke();

  // 8. Description Body
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Telah membuktikan penguasaan komprehensif atas prinsip fundamental rekayasa web enterprise:', width / 2, 375);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('The Core Loop Architecture • Concurrency & Pessimistic Locks • Asynchronous Queues & Decoupling', width / 2, 410);
  ctx.fillText('ACID Transaction Invariants • B-Tree Indexing Traversal • Production Incident Root Cause Analysis (RCA)', width / 2, 435);

  // 9. Verified Holographic Badge / Seal (Left bottom)
  ctx.save();
  ctx.translate(180, 560);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 11px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('★ VERIFIED ★', 0, -8);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px "Fira Code", monospace';
  ctx.fillText('ENTERPRISE', 0, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '9px "Fira Code", monospace';
  ctx.fillText('STANDARDS', 0, 22);
  ctx.restore();

  // 10. Metadata / Signatures (Right bottom)
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const hash = 'CFK-' + Math.abs((recipientName + now.getFullYear()).split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).toUpperCase().padStart(8, '0');

  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "Fira Code", monospace';
  ctx.fillText(`Tanggal Terbit : ${dateStr}`, width - 380, 545);
  ctx.fillText(`Credential ID  : ${hash}`, width - 380, 570);
  ctx.fillText(`Status         : VERIFIED PASS (Score >= 80%)`, width - 380, 595);

  // Signature line
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width - 380, 620);
  ctx.lineTo(width - 120, 620);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = 'italic 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CFK Academic & Architectural Certification Board', width - 380, 638);
}

/* ==========================================================================
   8. Global Toast Notification
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
