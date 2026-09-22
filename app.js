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
  initStudyTracker();
  initReadinessQuiz();
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
  { id: 'm2', text: 'Mencoba Simulasi Chaos Lab 01: Upload Video Timeout vs Async Queue', tag: 'Simulasi' },
  { id: 'm3', text: 'Mencoba Simulasi Chaos Lab 02: Race Condition & Pessimistic Lock', tag: 'Simulasi' },
  { id: 'm4', text: 'Mencoba Simulasi Chaos Lab 03: Database B-Tree Indexing vs Full Scan', tag: 'Simulasi' },
  { id: 'm5', text: 'Membaca Konsep Kunci Layer 1 (Web/Network) & Layer 2 (Browser Runtime)', tag: '7 Layers' },
  { id: 'm6', text: 'Membaca Konsep Kunci Layer 3 (Server-side) & Layer 4 (Data & ACID)', tag: '7 Layers' },
  { id: 'm7', text: 'Memahami 10 "Fakta di Balik Framework" pada modul Top 10 CFK', tag: '10 Pilar' },
  { id: 'm8', text: 'Mengerjakan Uji Kesiapan Mandiri dan mencapai skor minimal 60%', tag: 'Evaluasi' }
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
    title: 'HTTP Semantics',
    desc: 'Metode (Idempotent vs Safe), status code ranges (2xx, 3xx, 4xx, 5xx), headers, content negotiation, dan persistent TCP connections.',
    frameworkTruth: 'Framework seperti Next.js atau Laravel menyamarkan header & status code lewat fungsi helper; jika tak paham semantik, Anda akan merespon error 500 dengan status 200 OK "Success".'
  },
  {
    num: 'CFK 02',
    title: 'Network & DNS Fundamentals',
    desc: 'Bagaimana hostname diterjemahkan jadi IP, TLS handshake 1.3, TCP Congestion Control, dan latency Round-Trip Time (RTT).',
    frameworkTruth: 'Banyak engineer menyalahkan backend lambat, padahal latensi 80% berasal dari DNS cold-lookup dan tidak adanya TLS termination di edge/CDN.'
  },
  {
    num: 'CFK 03',
    title: 'Browser & Runtime Model',
    desc: 'Event loop, single-threaded execution, Call Stack, Microtasks (Promises), Macrotasks, dan mekanisme rendering DOM/CSSOM.',
    frameworkTruth: 'React Virtual DOM hanyalah abstraksi JavaScript; pemahaman sesungguhnya adalah kapan browser melakukan Reflow dan Repaint.'
  },
  {
    num: 'CFK 04',
    title: 'Asynchronous & Concurrency',
    desc: 'Perbedaan mendasar antara I/O-bound (menunggu socket/disk) vs CPU-bound (komputasi intensif), worker threads, dan non-blocking queues.',
    frameworkTruth: 'Menulis `async/await` bukan berarti kode Anda paralel! Jika Anda memanggil loop synchronous berat, seluruh server non-blocking tetap membeku.'
  },
  {
    num: 'CFK 05',
    title: 'State Management',
    desc: 'Ephemeral state di memory vs durable state di database. Mengapa stateless web tier adalah syarat mutlak horizontal scaling.',
    frameworkTruth: 'State bukan cuma Redux/Zustand di browser. Di sistem enterprise, state adalah konsistensi data antara Redis cache dan PostgreSQL.'
  },
  {
    num: 'CFK 06',
    title: 'Data & Transaction',
    desc: 'Model relasional, transaksi ACID, isolation levels (Read Committed vs Serializable), B-Tree Indexing, dan Connection Pooling.',
    frameworkTruth: 'ORM (Hibernate/Prisma/TypeORM) menyembunyikan query SQL mentah; tanpa paham transaksi dan index, ORM akan memicu masalah query N+1 dan deadlock.'
  },
  {
    num: 'CFK 07',
    title: 'API & Contract',
    desc: 'REST vs gRPC, skema validasi (JSON Schema/Protobuf), backward compatibility, versioning, dan semantik error payload.',
    frameworkTruth: 'API bukan sekadar endpoint URL sembarangan. Ini adalah kontrak hukum antara client dan server yang tidak boleh rusak saat deployment.'
  },
  {
    num: 'CFK 08',
    title: 'Software Architecture & Modularity',
    desc: 'Separation of Concerns (SoC), Layering (Controller-Service-Repo), Dependency Inversion, dan isolasi domain boundaries.',
    frameworkTruth: 'Framework sering menyodorkan struktur folder default; arsitek sejati mengatur boundary domain agar sistem mudah dites tanpa database aktif.'
  },
  {
    num: 'CFK 09',
    title: 'Security & Trust Boundaries',
    desc: 'Zero-Trust, Sanitasi input di server, OWASP Top 10, AuthN vs AuthZ, Token lifecycle (Access/Refresh), dan CSRF/CORS.',
    frameworkTruth: 'Validasi form di frontend (HTML5/React) semata-mata untuk UX. Batas keamanan sesungguhnya ada di server middleware.'
  },
  {
    num: 'CFK 10',
    title: 'Software Quality & Observability',
    desc: 'Tiga pilar observabilitas: Metrics, Structured Logs, Distributed Tracing (TraceID & SpanID), serta penanganan failure (Timeout & Retry).',
    frameworkTruth: 'Membaca log di production bukan mencari `console.log("here")`, melainkan melacak Trace ID yang menembus 5 service berbeda secara real-time.'
  }
];

function initTop10Cards() {
  const container = document.getElementById('top-10-grid');
  if (!container) return;

  container.innerHTML = top10Data.map(c => `
    <div class="cfk-card">
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
    </div>
  `).join('');
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
            Dengan struktur B-Tree, database tidak perlu membaca 1 juta data. Cukup menavigasi cabang pohon setinggi 3-4 lompatan $\\mathcal{O}(\\log N)$.<br>
            Latensi turun dari hampir setengah detik menjadi 1 milidetik!
          `);
        }, 1400);
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
      <button class="btn btn-primary" onclick="location.reload()">
        Ulangi Evaluasi
      </button>
    </div>
  `;
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
