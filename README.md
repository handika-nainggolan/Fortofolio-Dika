# Handika Pratama Nainggolan — Portfolio V3

Portfolio website modern dengan scroll navigation, dark/light theme, dan semua fitur lengkap.

## ✨ Fitur
- 🌙☀️ **Dark / Light Theme** — tombol toggle di navbar kanan atas
- 📜 **Scroll Navigation** — navbar highlight otomatis saat scroll, TIDAK perlu klik per halaman
- ⌨️ **Typewriter Animation** — role berganti-ganti otomatis di hero
- 🎨 **Skill Icons SVG** — logo realistis untuk semua teknologi
- 📊 **Skill Tabs** — DevOps, Programming, IoT, Tools (bug fixed!)
- 🖼️ **Project Image Support** — tinggal taruh foto project
- 🏆 **Halaman Baru**: Experience, Education, Certificates
- 📱 **Responsive** — mobile/tablet/desktop
- ✨ **Scroll Reveal** — animasi saat scroll ke bawah
- 🚀 **Siap deploy ke Vercel**

## 🗂️ Struktur Folder

```
portfolio-v3/
├── public/
│   ├── index.html
│   ├── photo.jpg          ← ⭐ FOTO KAMU (ganti ini!)
│   ├── projects/
│   │   ├── kubernetes.jpg
│   │   ├── ecommerce.jpg
│   │   ├── iot-fire.jpg
│   │   └── monitoring.jpg
│   └── certs/
│       ├── kubernetes.jpg
│       ├── cloud.jpg
│       ├── linux.jpg
│       ├── iot.jpg
│       ├── cybersec.jpg
│       └── devops.jpg
├── src/
│   ├── App.js             ← Semua komponen & data
│   ├── index.css          ← Semua styling + dark/light theme
│   └── index.js           ← Entry point
├── package.json
├── vercel.json
└── README.md
```

## 🚀 Cara Install & Jalankan

```bash
# 1. Masuk ke folder
cd portfolio-v3

# 2. Install dependencies
npm install

# 3. Jalankan di localhost
npm start
# → buka http://localhost:3000
```

## 📸 Cara Tambah Foto

### Foto Profil (di hero & about)
Taruh foto kamu di `public/photo.jpg`
- Ukuran ideal: **400×400px** (persegi)
- Format: .jpg atau .png

### Foto Project
Taruh screenshot project di `public/projects/`:
- `kubernetes.jpg` → Kubernetes Blog Platform
- `ecommerce.jpg`  → Distributed E-Commerce
- `iot-fire.jpg`   → IoT Fire & Gas Detection
- `monitoring.jpg` → DevOps Monitoring Platform
- Ukuran ideal: **800×450px** (landscape)

### Foto Sertifikat
Taruh foto sertifikat di `public/certs/`:
- `kubernetes.jpg`, `cloud.jpg`, `linux.jpg`
- `iot.jpg`, `cybersec.jpg`, `devops.jpg`
- Ukuran ideal: **600×420px**

## 🌐 Deploy ke Vercel

```bash
# Opsi 1: Via GitHub (recommended)
# 1. Push ke GitHub
# 2. Buka vercel.com → New Project → Import repo
# 3. Framework: Create React App (auto-detect)
# 4. Klik Deploy ✓

# Opsi 2: Via Vercel CLI
npm i -g vercel
vercel
```

## ✏️ Cara Edit Data

Semua data ada di `src/App.js`, bagian `/* ── DATA ── */`:

- **PROJECTS** → tambah/edit project
- **EXPERIENCES** → tambah pengalaman
- **EDUCATION_LIST** → pendidikan
- **AWARDS_LIST** → penghargaan
- **CERTS** → sertifikat
- **SKILL_GROUPS** → skill per kategori

## 🎨 Navigasi

Navbar auto-highlight section yang sedang dilihat saat scroll.
Klik nama section di navbar → smooth scroll ke section tersebut.
