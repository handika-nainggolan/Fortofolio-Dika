# 🚀 Handika Pratama Nainggolan — Personal Portfolio

> Personal portfolio website built with **React.js** and **Pure CSS** — showcasing my journey as an Aspiring DevOps & IoT Engineer.

---

## 🌐 Live Demo

**[→ View Portfolio](https://your-portfolio-url.vercel.app)**

> Ganti link di atas dengan URL Vercel kamu setelah deploy

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌙☀️ **Dark / Light Theme** | Toggle antara dark dan light mode |
| 📜 **Smooth Scroll Navigation** | Navbar auto-highlight section yang sedang dilihat |
| ⌨️ **Typewriter Animation** | Role text mengetik dan menghapus otomatis |
| 🎞️ **Entrance Animations** | Setiap section animasi masuk saat di-scroll |
| 📊 **Skills Showcase** | Semua tools DevOps & IoT dalam satu grid |
| 🗂️ **Project Gallery** | Cards dengan detail modal, tombol View Repository & Preview |
| 📄 **PDF Certificate Viewer** | Klik kartu sertifikat → buka PDF di tab baru |
| 🎓 **Education & Awards** | Layout dua kolom untuk pendidikan dan pencapaian |
| ⏳ **Experience** | Kartu pengalaman kerja dan organisasi |
| ↓ **CV Download** | Satu klik untuk download resume |
| ✉️ **Contact Form** | Membuka email client dengan pesan terisi otomatis |
| ✨ **Particle Background** | Animasi partikel di background |
| 📱 **Fully Responsive** | Optimal di mobile, tablet, dan desktop |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React.js 18 |
| **Styling** | Pure CSS3 (no Tailwind / Bootstrap) |
| **Language** | JavaScript ES6+ |
| **Animations** | CSS Keyframes + IntersectionObserver API |
| **Build Tool** | Create React App |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
portfolio-v3/
├── public/
│   └── index.html
├── src/
│   ├── image/                 ← foto profil & project
│   │   ├── 1.jpeg             (foto profil — hero & about)
│   │   ├── 2.jpeg             (screenshot project 2)
│   │   ├── 3.jpeg             (screenshot project 3)
│   │   └── 4.jpeg             (screenshot project 4)
│   ├── certs/                 ← file PDF sertifikat
│   │   ├── sertifikat1.pdf
│   │   ├── sertifikat2.pdf
│   │   ├── sertifikat3.pdf
│   │   ├── sertifikat4.pdf
│   │   ├── sertifikat5.pdf
│   │   └── sertifikat6.pdf
│   ├── cv.pdf                 ← file CV untuk download
│   ├── App.js                 ← semua komponen React & data
│   ├── index.css              ← semua styling + dark/light theme
│   └── index.js               ← entry point
├── package.json
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node --version    # v16 atau lebih baru
npm --version     # v8 atau lebih baru
```

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/handika-nainggolan/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Jalankan di localhost
npm start
# buka http://localhost:3000
```

### Build Production

```bash
npm run build
# hasil build ada di folder /build
```

---

## 📸 Menambahkan Foto & File

### Foto Profil & Project
Copy file ke `src/image/`:
```
1.jpeg  →  foto profil kamu (dipakai di hero & about)
2.jpeg  →  screenshot project ke-2
3.jpeg  →  screenshot project ke-3
4.jpeg  →  screenshot project ke-4
```

### PDF Sertifikat
Copy file ke `src/certs/`:
```
sertifikat1.pdf  →  Kubernetes & Container Orchestration
sertifikat2.pdf  →  Cloud Computing Fundamentals
sertifikat3.pdf  →  Linux System Administration
sertifikat4.pdf  →  IoT with Arduino & Embedded Systems
sertifikat5.pdf  →  Del Cyber Security Club
sertifikat6.pdf  →  DevOps Monitoring & Observability
```

### CV
Taruh file di `src/`:
```
cv.pdf  →  file CV kamu (otomatis terdownload saat tombol diklik)
```

---

## ✏️ Edit Konten

Semua data ada di `src/App.js` pada bagian `/* ── DATA ── */`:

```javascript
const EXPERIENCES    = [ ... ]  // pengalaman kerja & organisasi
const PROJECTS       = [ ... ]  // project portfolio
const CERTS          = [ ... ]  // sertifikat
const AWARDS_LIST    = [ ... ]  // penghargaan & achievement
const EDUCATION_LIST = [ ... ]  // pendidikan
```

---

## 🌐 Deploy ke Vercel

### Via GitHub (Recommended)

```
1. Push repo ini ke GitHub
2. Buka vercel.com → Login dengan GitHub
3. New Project → Import repo portfolio
4. Framework: Create React App (auto-detect)
5. Deploy ✅
```

Setiap `git push` → Vercel **otomatis rebuild & deploy** 🔄

### Via Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 📋 Halaman & Sections

| Section | Konten |
|---------|--------|
| **Home** | Hero, foto profil, typewriter, tombol CTA, social links |
| **About** | Foto, bio, stats (4+ projects, 10+ tech, 2+ years), terminal |
| **Education** | Pendidikan formal + awards & achievements |
| **Skills** | Grid semua tools & technologies (DevOps + IoT) |
| **Experience** | Magang, organisasi, dan proyek akademik |
| **Certificates** | Kartu sertifikat dengan PDF viewer |
| **Projects** | Gallery project dengan modal detail lengkap |
| **Contact** | Form kontak + info kontak langsung |

---

## 📞 Contact

**Handika Pratama Nainggolan**

- 🎓 Institut Teknologi Del (IT Del) — Teknologi Komputer
- 💼 Aspiring DevOps & IoT Engineer
- 🐙 GitHub: [@handika-nainggolan](https://github.com/handika-nainggolan)
- 💼 LinkedIn: [handika-pratama](https://www.linkedin.com/in/handika-pratama-52178332b/)
- 📧 Email: handikanainggolan24@gmail.com
- 💬 WhatsApp: +62 822-7631-0317

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **Jika portfolio ini bermanfaat, berikan star ya!**

Made with ❤️ by **Handika Pratama Nainggolan**

</div>
