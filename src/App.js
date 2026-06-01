import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ── Import FOTO PROFIL & PROJECT (taruh di src/image/) ──
import foto1 from './image/1.jpeg';  // foto profil (hero + about)
import foto7 from './image/pa.png';  // screenshot project 1
import foto2 from './image/sister.png';  // screenshot project 2
import foto3 from './image/sister.png';  // screenshot project 3
import foto4 from './image/monitoring.png';  // screenshot project 4
import foto5 from './image/forto.png';  // screenshot project 5
import foto6 from './image/dika.png';  // screenshot project 6

// ── CV File — taruh file CV kamu di src/ dengan nama cv.pdf ──
// Jika belum ada, biarkan dulu dan tambahkan nanti
let cvFile = null;
try { cvFile = require('./CV-Handika-Pratama-Nainggolan.pdf'); } catch(e) {}

// ── Import PDF SERTIFIKAT (taruh di src/certs/) ──
// Ganti nama file sesuai nama PDF sertifikat kamu
import cert1 from './certs/sertifikat1.pdf';
import cert4 from './certs/sertifikat4.pdf';
import cert5 from './certs/sertifikat5.pdf';
import cert7 from './certs/sertifikat7.pdf';


/* ── TYPEWRITER ── */
function useTypewriter(words, spd=75, del=42, pause=2000) {
  const [txt, setTxt] = useState('');
  const [wi, setWi] = useState(0);
  const [ph, setPh] = useState('type');
  useEffect(() => {
    const w = words[wi]; let t;
    if (ph==='type') {
      if (txt.length < w.length) t = setTimeout(()=>setTxt(w.slice(0,txt.length+1)),spd);
      else t = setTimeout(()=>setPh('pause'),pause);
    } else if (ph==='pause') {
      t = setTimeout(()=>setPh('del'),100);
    } else {
      if (txt.length > 0) t = setTimeout(()=>setTxt(txt.slice(0,-1)),del);
      else { setWi((wi+1)%words.length); setPh('type'); }
    }
    return ()=>clearTimeout(t);
  },[txt,ph,wi,words,spd,del,pause]);
  return txt;
}

/* ── SKILL ICONS ── */
const ICONS = {
  Linux:        <svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#333" cx="64" cy="64" r="56"/><ellipse fill="#eee" cx="47" cy="60" rx="7" ry="10"/><ellipse fill="#eee" cx="81" cy="60" rx="7" ry="10"/><ellipse fill="#333" cx="47" cy="61" rx="4" ry="5"/><ellipse fill="#333" cx="81" cy="61" rx="4" ry="5"/><path stroke="#eee" strokeWidth="2.5" fill="none" d="M50 76 Q64 88 78 76"/><path fill="#eee" d="M40 44 Q48 34 56 42 Q48 36 40 44z"/><path fill="#eee" d="M88 44 Q80 34 72 42 Q80 36 88 44z"/></svg>,
  Docker:       <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#2396ED" width="128" height="128" rx="14"/><rect fill="#fff" x="18" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="40" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="40" y="28" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="28" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="10" width="18" height="14" rx="2"/></svg>,
  Kubernetes:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#326CE5" width="128" height="128" rx="14"/><path fill="none" stroke="#fff" strokeWidth="2.5" d="M64 22L18 48v32l46 26 46-26V48z"/><circle fill="#fff" cx="64" cy="64" r="9"/><circle fill="#fff" cx="64" cy="28" r="5"/><circle fill="#fff" cx="64" cy="100" r="5"/><circle fill="#fff" cx="34" cy="46" r="5"/><circle fill="#fff" cx="94" cy="46" r="5"/><circle fill="#fff" cx="34" cy="82" r="5"/><circle fill="#fff" cx="94" cy="82" r="5"/></svg>,
  'Git & GitHub':<svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#24292e" cx="64" cy="64" r="56"/><path fill="#fff" d="M64 14C37.5 14 16 35.5 16 62c0 21.2 13.7 39.2 32.8 45.6 2.4.4 3.2-1 3.2-2.3v-8.3c-13.3 2.9-16-6.4-16-6.4-2.2-5.5-5.3-6.9-5.3-6.9-4.3-2.9.3-2.9.3-2.9 4.8.3 7.3 4.9 7.3 4.9 4.2 7.2 11.1 5.1 13.8 3.9.4-3 1.6-5.1 3-6.3-10.6-1.2-21.7-5.3-21.7-23.5 0-5.2 1.9-9.5 4.9-12.8-.5-1.2-2.1-6.1.5-12.6 0 0 4-.1 13 5 3.8-1 7.8-1.5 11.8-1.5 4 0 8.1.5 11.8 1.5 8.9-5.1 12.9-5 12.9-5 2.6 6.6 1 11.5.5 12.7 3 3.3 4.8 7.6 4.8 12.8 0 18.3-11.1 22.3-21.7 23.5 1.7 1.5 3.2 4.4 3.2 8.8v13.1c0 1.3.8 2.7 3.2 2.3C98.3 101.2 112 83.2 112 62c0-26.5-21.5-48-48-48z"/></svg>,
  'CI/CD':      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0d1117" width="128" height="128" rx="14"/><circle fill="none" stroke="#58a6ff" strokeWidth="4" cx="64" cy="64" r="30"/><path fill="none" stroke="#58a6ff" strokeWidth="4" d="M64 34 A30 30 0 0 1 94 64"/><polygon fill="#58a6ff" points="94,52 100,66 108,56"/><circle fill="#3fb950" cx="64" cy="64" r="10"/></svg>,
  Terraform:    <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#5C4EE5" width="128" height="128" rx="14"/><path fill="#fff" d="M48 22l26 15v30L48 52zM78 38l26 15v30L78 68zM18 52l26 15v30L18 82zM48 72l26 15v18L48 90z"/></svg>,
  Ansible:      <svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#1A1918" cx="64" cy="64" r="56"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="64" cy="64" r="40"/><path fill="#fff" d="M64 24c-3 0-5 2-5 5l18 60-22-36-8 2 26 44c1 2 3 3 5 3 4 0 7-3 7-7V29c0-3-2-5-5-5z"/></svg>,
  Prometheus:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#E6522C" width="128" height="128" rx="14"/><circle fill="none" stroke="#fff" strokeWidth="4" cx="64" cy="64" r="36"/><circle fill="#fff" cx="64" cy="64" r="10"/><path fill="#fff" d="M64 30v10M64 88v10M28 64h10M90 64h10"/></svg>,
  Grafana:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><polyline points="16,96 36,62 52,74 72,40 90,58 112,32" fill="none" stroke="#F46800" strokeWidth="4" strokeLinejoin="round"/><circle fill="#F46800" cx="72" cy="40" r="5"/><circle fill="#F46800" cx="112" cy="32" r="5"/></svg>,
  Networking:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0078D7" width="128" height="128" rx="14"/><circle fill="#fff" cx="64" cy="28" r="10"/><circle fill="#fff" cx="24" cy="90" r="10"/><circle fill="#fff" cx="104" cy="90" r="10"/><circle fill="#fff" cx="64" cy="90" r="10"/><line x1="64" y1="38" x2="24" y2="80" stroke="#fff" strokeWidth="3"/><line x1="64" y1="38" x2="104" y2="80" stroke="#fff" strokeWidth="3"/><line x1="64" y1="38" x2="64" y2="80" stroke="#fff" strokeWidth="3"/></svg>,
  Python:       <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><path fill="#3572A5" d="M63.5 14C44 14 45 22.5 45 22.5V33h19v4H28.5S10 34.7 10 54s17 20.5 17 20.5H36V65s-.5-17 17.5-17H71s17 .3 17-16.3V21.2S90.4 14 63.5 14z"/><path fill="#FFD845" d="M64.5 114c19.5 0 18.5-8.5 18.5-8.5V95H64v-4h35.5S118 93.3 118 74s-17-20.5-17-20.5H92v9.5s.5 17-17.5 17H56.5s-17-.3-17 16.3v15.5S37.6 114 64.5 114z"/></svg>,
  JavaScript:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#F7DF1E" width="128" height="128" rx="14"/><path fill="#323330" d="M26 108l9.5-5.7c1.8 3.3 3.5 6 7.5 6 3.8 0 6.2-1.5 6.2-7.4V63h11.7v38.1c0 12.2-7.2 17.7-17.6 17.7-9.5 0-14.9-4.9-17.3-10.8zm43.5-1.7l9.5-5.5c2.5 4.1 5.7 7.1 11.4 7.1 4.8 0 7.8-2.4 7.8-5.7 0-3.9-3.1-5.3-8.4-7.6l-2.9-1.2c-8.3-3.5-13.8-7.9-13.8-17.2 0-8.6 6.5-15.1 16.6-15.1 7.2 0 12.4 2.5 16.1 9.1l-8.8 5.7c-1.9-3.5-4-4.9-7.3-4.9-3.3 0-5.4 2.1-5.4 4.9 0 3.4 2.1 4.8 7 6.9l2.9 1.2c9.8 4.1 15.3 8.4 15.3 18 0 10.3-8.1 16-18.9 16-10.6 0-17.4-5-20.9-11.6z"/></svg>,
  Arduino:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#00979D" width="128" height="128" rx="14"/><rect fill="#fff" x="10" y="50" width="108" height="28" rx="14"/><rect fill="#00979D" x="18" y="58" width="92" height="12" rx="6"/><line x1="36" y1="64" x2="28" y2="64" stroke="#fff" strokeWidth="3"/><line x1="28" y1="58" x2="28" y2="70" stroke="#fff" strokeWidth="3"/><line x1="44" y1="64" x2="52" y2="64" stroke="#fff" strokeWidth="3"/><line x1="76" y1="64" x2="84" y2="64" stroke="#fff" strokeWidth="3"/><line x1="84" y1="58" x2="84" y2="70" stroke="#fff" strokeWidth="3"/><line x1="72" y1="64" x2="64" y2="64" stroke="#fff" strokeWidth="3"/></svg>,
  MQTT:         <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#660066" width="128" height="128" rx="14"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M18 100 Q64 14 110 100"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M30 100 Q64 30 98 100"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M44 100 Q64 50 84 100"/><rect fill="#fff" x="56" y="94" width="16" height="20" rx="3"/></svg>,
  'Raspberry Pi':<svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#C51A4A" width="128" height="128" rx="14"/><path fill="#fff" d="M64 20c-7 0-12 5-12 10 0 2.5 1 4.5 2.5 6-7 2.5-11.5 8-11.5 15 0 9.5 8.5 17 21 17s21-7.5 21-17c0-7-4.5-12.5-11.5-15 1.5-1.5 2.5-3.5 2.5-6 0-5-5-10-12-10z"/><rect fill="#fff" x="38" y="76" width="52" height="7" rx="3"/><rect fill="#fff" x="38" y="89" width="52" height="7" rx="3"/></svg>,
  'Embedded Sys':<svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#111" width="128" height="128" rx="14"/><rect fill="#2d5a27" x="22" y="22" width="84" height="84" rx="6"/><rect fill="#111" x="46" y="46" width="36" height="36" rx="3"/><text x="64" y="69" textAnchor="middle" fill="#4ade80" fontSize="13" fontFamily="monospace" fontWeight="bold">CPU</text><rect fill="#4ade80" x="8" y="46" width="14" height="5" rx="2"/><rect fill="#4ade80" x="8" y="60" width="14" height="5" rx="2"/><rect fill="#4ade80" x="106" y="46" width="14" height="5" rx="2"/><rect fill="#4ade80" x="106" y="60" width="14" height="5" rx="2"/></svg>,
  Sensors:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0f0f2a" width="128" height="128" rx="14"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="44" opacity="0.25"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="30" opacity="0.55"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="16" opacity="0.85"/><circle fill="#63b3ff" cx="64" cy="64" r="7"/></svg>,
  'VS Code':    <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1e1e1e" width="128" height="128" rx="14"/><path fill="#007ACC" d="M94.8 8.8L52 49.6 29.5 32 10 42v44l19.5 10L52 78.5l42.8 40.7L118 108V20z"/><path fill="#1BA1E2" d="M118 20L94.8 8.8 52 49.6v28.8l42.8 40.7L118 108z"/><path fill="#fff" d="M29.5 75.5L52 58V70l-22.5 16v-10.5z"/></svg>,
  Postman:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#FF6C37" width="128" height="128" rx="14"/><circle fill="#fff" cx="66" cy="64" r="28"/><circle fill="#FF6C37" cx="66" cy="64" r="20"/><path fill="#fff" d="M50 58l28-8-16 26z"/></svg>,
  MongoDB:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><path fill="#439934" d="M88 32C80 20 68 14 64 14s-16 6-24 18C30 47 26 56 26 66c0 22 18 42 38 48V86c-8-4-12-16-12-20 0-8 6-12 12-12s12 4 12 12c0 4-4 16-12 20v28c20-6 38-26 38-48 0-10-4-19-14-34z"/></svg>,
  Kafka:        <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#231F20" width="128" height="128" rx="14"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="64" cy="28" r="12"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="30" cy="90" r="12"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="98" cy="90" r="12"/><line x1="64" y1="40" x2="36" y2="78" stroke="#fff" strokeWidth="2.5"/><line x1="64" y1="40" x2="92" y2="78" stroke="#fff" strokeWidth="2.5"/><circle fill="#fff" cx="64" cy="28" r="5"/><circle fill="#fff" cx="30" cy="90" r="5"/><circle fill="#fff" cx="98" cy="90" r="5"/></svg>,
  'Node.js':    <svg viewBox="0 0 128 128" width="36" height="36"><path fill="#404137" d="M64 16L16 46v36l48 28 48-28V46z"/><path fill="#83CD29" d="M64 22L22 46v36l42 24 42-24V46z"/><text x="64" y="74" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" fontFamily="monospace">JS</text></svg>,
};
const SkillIcon = ({name}) => ICONS[name] || (
  <svg viewBox="0 0 36 36" width="36" height="36">
    <rect width="36" height="36" rx="8" fill="rgba(108,99,255,0.15)"/>
    <text x="18" y="24" textAnchor="middle" fill="#6c63ff" fontSize="12" fontWeight="bold" fontFamily="monospace">{name.slice(0,2).toUpperCase()}</text>
  </svg>
);

/* ── DATA ── */
const SECTIONS = ['hero','about','education','skills','experience','certificates','projects','contact'];
const NAV_LABELS = ['Home','About','Education','Skills','Experience','Certificates','Projects','Contact'];

// Tools & Technologies — semua jadi satu, tanpa persen
const ALL_SKILLS = [
  // DevOps & Infrastructure
  'Linux','Docker','Kubernetes','Git & GitHub','CI/CD',
  'Terraform','Ansible','Prometheus','Grafana','Networking',
  // IoT & Embedded
  'Arduino','Raspberry Pi','MQTT','Sensors','Embedded Sys',
  // Programming
  'Python','JavaScript',
  // Tools
  'VS Code','Postman','MongoDB','Kafka','Node.js',
];

const PROJECTS = [
  {
    num:'01',title:'Smart aquarium monitoring system',
    desc:'Scalable blog platform on Kubernetes using Deployments, Services, Ingress, ConfigMaps, Secrets, PV, and HPA for high availability.',
    detail:'Built a fully containerized blog application deployed on a Kubernetes cluster. Implemented Horizontal Pod Autoscaler (HPA) for auto-scaling, Persistent Volumes for data persistence, Ingress controller for routing, ConfigMaps and Secrets for configuration management. The platform supports zero-downtime deployments with rolling update strategy.',
    tags:['Kubernetes','Docker','Ingress','HPA','ConfigMaps','Nginx'],cls:['tag-purple','tag-blue','tag-green','tag-orange','tag-blue','tag-purple'],
    gh:'https://github.com/handika-nainggolan/smart-aquarium-monitoring-system',img:foto7
  },
  {
    num:'02',title:'Distributed E-Commerce System',
    desc:'Event-driven e-commerce using Apache Kafka, MongoDB, Express.js, and microservices for scalable order processing.',
    detail:'Developed a distributed e-commerce platform using microservices architecture with Apache Kafka for event-driven communication. Built User, Product, and Order services using Express.js and MongoDB, implemented JWT authentication, utilized Redis for caching, and containerized the entire system with Docker for scalable deployment.',
    tags:['Kafka','MongoDB','Express.js','Node.js','Docker','JWT'],cls:['tag-orange','tag-green','tag-blue','tag-purple','tag-blue','tag-green'],
    gh:'https://github.com/handika-nainggolan/sistem-terdistribusi',img:foto2
  },
  {
    num:'04',title:'Monitoring Platform',
    desc:'Automated Linux monitoring platform with self-healing capabilities, logging system, and real-time dashboards powered by Grafana and Prometheus.',
    detail:'Built a Linux-based monitoring solution using Bash Script, Crontab, Prometheus, and Grafana. Implemented automated service monitoring, self-healing through automatic restarts, activity logging, and real-time infrastructure visualization for CPU, memory, disk, network, and uptime metrics.',
    tags:['Prometheus','Grafana','Docker','Linux','Node Exporter','Alerting'],cls:['tag-orange','tag-blue','tag-purple','tag-green','tag-blue','tag-red'],
    gh:'https://github.com/handika-nainggolan/monitoring-platform-sistem',img:foto4
  },
  {
    num: '05',
  title: 'Personal Portfolio Website',
  desc: 'Personal portfolio website built with React.js and pure CSS. Features dark/light theme, scroll navigation, typewriter animation, PDF certificate viewer, and responsive design.',
  detail: 'Built a fully responsive personal portfolio website from scratch using React.js and pure CSS without any UI framework. Features include dark/light theme toggle, smooth scroll navigation with active section detection, typewriter animation, skill showcase, project gallery with detail modal, PDF certificate viewer, and contact form. Deployed on Vercel.',
  tags: ['React.js', 'CSS3', 'JavaScript', 'Vercel'],
  cls: ['tag-blue', 'tag-purple', 'tag-green', 'tag-orange'],
  gh: 'https://github.com/handika-nainggolan/Fortofolio-dika',  // ganti ke repo portfolio kamu
  img: foto5,  // ganti dengan screenshot web portfolio kamu
  },
  {
   num: '06',
  title: 'DevOps Node.js Kubernetes Pipeline',
  desc: 'Full DevOps pipeline for a Node.js app — containerized with Docker, orchestrated on Kubernetes, and automated with CI/CD GitHub Actions.',
  detail: 'Built a complete end-to-end DevOps pipeline for a Node.js application. Covers containerization with Docker multi-stage builds, Kubernetes deployment using Deployments, Services, ConfigMaps and Secrets, CI/CD automation with GitHub Actions that triggers build, test, and deploy on every git push, and health check probes for production reliability.',
  tags: ['Node.js', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
  cls: ['tag-green', 'tag-blue', 'tag-purple', 'tag-orange', 'tag-red'],
  gh: 'https://github.com/handika-nainggolan/devops-nodejs-kubernetes-pipeline',
  img: foto6,
  },
];

const EXPERIENCES = [
  {title:'DevOps Engineer Intern',org:'PT Telkom Indonesia',type:'Internship',date:'february 2026 – july 2026',desc:'Assisted infrastructure team in implementing DevOps practices. Containerized applications with Docker, managed Kubernetes deployments, built CI/CD pipelines, and performed monitoring with Prometheus & Grafana across Telkoms internal platforms.'},

  {
    title:'Member – Del Cyber Security Club',
    org:'Institut Teknologi Del',
    type:'Organization',
    date:'2023 – Present',
    desc:'Participated in cybersecurity workshops, ethical hacking activities, network security learning, and security awareness programs.'
  },

  {
    title:'Huawei ICT Competition National Finalist',
    org:'Huawei ICT Competition',
    type:'Competition',
    date:'2025',
    desc:'Participated in the Computing Track National Final, focusing on cloud computing, networking, operating systems, and ICT technologies.'
  },

  {
    title:'DevOps Monitoring Platform',
    org:'Personal Project',
    type:'Project',
    date:'2026',
    desc:'Built a Linux-based monitoring platform using Bash Script, Crontab, Prometheus, Grafana, and Docker with automated monitoring, logging, and self-healing capabilities.'
  },

  {
    title: 'CTF Competition',
    org: 'Del Cyber Security Club – IT Del',
    type: 'Competition',
    date: '2024',
    desc: 'Participated in Capture The Flag competitions covering categories such as web exploitation, reverse engineering, cryptography, and forensics challenges.'
   },

  {
    title:'Smart Aquarium Monitoring System',
    org:'Academic Project',
    type:'Project',
    date:'2025',
    desc:'Designed and implemented an IoT-based aquarium monitoring system with real-time water quality monitoring, automatic feeding, and a web-based dashboard.'
  }
];

const EDUCATION_LIST = [{title:'Institut Teknologi Del (IT Del)',sub:' Diploma in Computer Engineering',date:'2023 – Present'}];
const AWARDS_LIST = [
   {title:'National Final Participant – Huawei ICT Competition 2024–2025 (Computing Track)',sub:'competition',date:'December 2024'},
   {title:'Red Team Cyberwolves Academy',sub:'Hactrace Indonesia',date:'May 2026'},
   {title:'started with AWS',sub:'Certification',date:'october 2025'},
];

// Sertifikat — pakai PDF import dari src/certs/
const CERTS = [
  {title:'Introduction to IoT and Digital Transformation',issuer:'Simplilearn',date:'2025',desc:'IoT fundamentals, connected devices, digital transformation, and smart technology concepts.',em:'📡',pdf:cert1},
  {title:'Network Fundamental',issuer:'Aguna Course',date:'2025',desc:'Networking basics, IP addressing, network protocols, routing, and connectivity concepts.',em:'🌐',pdf:cert4},
  {title:'Huawei ICT Competition 2024–2025 National Final',issuer:'Huawei',date:'2024',desc:'Cloud computing, operating systems, networking, and ICT infrastructure fundamentals.',em:'🏆',pdf:cert5},
  {title:'Introduction to Cloud Computing',issuer:'Simplilearn',date:'2025',desc:'Cloud computing fundamentals, service models, deployment models, and cloud technologies.',em:'☁️',pdf:cert7},
];


/* ── UTILS ── */
function useReveal() {
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal');
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}
function useActiveSection() {
  const [active,setActive]=useState('hero');
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{threshold:0.35});
    SECTIONS.forEach(s=>{const el=document.getElementById(s);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  return active;
}

/* ── COMPONENTS ── */
function Loader({done}) {
  const [msg,setMsg]=useState('initializing...');
  useEffect(()=>{
    const msgs=['loading modules...','starting containers...','ready ✓'];
    let i=0; const t=setInterval(()=>{setMsg(msgs[i++]);if(i>=msgs.length)clearInterval(t);},600);
    return()=>clearInterval(t);
  },[]);
  return (
    <div className={`loader${done?' done':''}`}>
      <div className="loader-logo" style={{fontFamily:'JetBrains Mono,monospace'}}>[HPN]</div>
      <div className="loader-bar"><div className="loader-fill"/></div>
      <div className="loader-txt">{msg}</div>
    </div>
  );
}

function Particles() {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');
    let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
    const pts=Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.2+.3,a:Math.random()*.25+.06}));
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(108,99,255,${p.a})`;ctx.fill();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(108,99,255,${.035*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} id="particles-canvas"/>;
}

function Navbar({active,theme,toggleTheme}) {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  const goTo=id=>{setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  return (
    <nav className={`navbar${scrolled?' scrolled':''}`}>
      <div className="nav-logo" onClick={()=>goTo('hero')}><span>&lt;</span>Dika Pratama<span>/&gt;</span></div>
      <button className="hamburger" onClick={()=>setOpen(o=>!o)}>{open?'✕':'☰'}</button>
      <ul className={`nav-links${open?' open':''}`}>
        {SECTIONS.map((s,i)=>(
          <li key={s}><a className={active===s?'active':''} onClick={()=>goTo(s)}>{NAV_LABELS[i]}</a></li>
        ))}
      </ul>
      <button className="theme-btn" onClick={toggleTheme}>{theme==='dark'?'☀️':'🌙'}</button>
    </nav>
  );
}

/* ── PDF MODAL ── */
function PdfModal({cert, onClose}) {
  if (!cert) return null;

  React.useEffect(() => {
    // ESC to close
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleOpenNewTab = () => {
    window.open(cert.pdf, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="pdf-overlay"
      onClick={onClose}
      onWheel={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
    >
      <div
        className="pdf-modal"
        onClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
      >
        <div className="pdf-modal-header">
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{fontSize:'1.3rem'}}>{cert.em}</span>
            <span className="pdf-modal-title">{cert.title}</span>
          </div>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <button
              onClick={handleOpenNewTab}
              style={{display:'flex',alignItems:'center',gap:5,padding:'6px 14px',borderRadius:8,background:'var(--accent)',color:'#fff',fontFamily:'JetBrains Mono,monospace',fontSize:'.72rem',fontWeight:600,border:'none',cursor:'pointer'}}>
              📄 Lihat Sertifikat
            </button>
            <button className="pdf-modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="pdf-modal-body" onWheel={e=>e.stopPropagation()}>
          <iframe
            src={cert.pdf + '#toolbar=1&navpanes=0&scrollbar=1&view=FitH'}
            title={cert.title}
            style={{width:'100%',height:'72vh',border:'none',borderRadius:10,background:'#fff'}}
          />
        </div>
      </div>
    </div>
  );
}

/* ── HERO ── */
function HeroSection() {
  const typed=useTypewriter(['Aspiring DevOps Engineer','IoT Systems Builder','Cloud & Linux Enthusiast','Kubernetes explorer','Infrastructure Automation leaner',]);
  const handleCV = () => {
    if (cvFile) {
      const a = document.createElement('a');
      a.href = cvFile;
      a.download = 'CV-Handika-Pratama-Nainggolan.pdf';
      a.click();
    } else {
      alert('File CV belum ditambahkan. Taruh file cv.pdf di folder src/');
    }
  };
  return (
    <section id="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-badge"><span className="dot"/>Available for Opportunities</div>
          <div className="hero-sub mono">// hi, I'm</div>
          <h1 className="hero-name"><span className="grad">Handika</span><br/>Pratama</h1>
          <div className="hero-role">
            <span style={{color:'var(--accent)'}}>&gt; </span>
            <span style={{color:'var(--accent2)'}}>{typed}</span>
            <span className="type-cur">|</span>
          </div>
          <p className="hero-desc">IT Del student interested in DevOps, Cloud Computing, Linux, Kubernetes, and IoT — enjoy building efficient systems and technology-based solutions."</p>
          <div className="hero-btns">
            <a className="btn btn-accent" href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}}>View Projects →</a>
            <a className="btn btn-outline" href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}>Contact Me</a>
            <button className="btn btn-ghost" onClick={handleCV}>↓ Download CV</button>
          </div>
          <div className="hero-socials">
            {[{href:'https://github.com/handika-nainggolan',l:'GH'},{href:'https://www.linkedin.com/in/handika-pratama-52178332b/',l:'in'},{href:'mailto:handikanainggolan24@gmail.com',l:'@'},{href:'https://wa.me/6282276310317',l:'WA'}].map(s=>(
              <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">{s.l}</a>
            ))}
          </div>
        </div>
        {/* Avatar dengan zoom on hover */}
        <div className="hero-avatar">
          <div className="avatar-ring"/>
          <div className="avatar-wrap">
            <img src={foto1} alt="Handika Pratama" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
            <div className="avatar-ph" style={{display:'none'}}>HP</div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="scroll-down" onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>
        <span className="scroll-down-text">Scroll down for more</span>
        <div className="scroll-down-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function AboutSection() {
  useReveal();
  return (
    <section id="about">
      <div className="sec-head wrap"><span className="sec-bg-title">ABOUT ME</span><h2>About Me</h2></div>
      <div className="about-inner">
        {/* Photo dengan zoom on hover */}
        <div className="about-photo reveal">
          <div className="photo-accent-bg"/>
          <div className="photo-dots">{Array.from({length:25}).map((_,i)=><span key={i}/>)}</div>
          <div className="photo-frame">
            <img src={foto1} alt="Handika Pratama" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
            <div className="photo-ph" style={{display:'none'}}>HP</div>
          </div>
        </div>
        <div className="about-content reveal d2">
          <div className="hero-badge" style={{marginBottom:'1rem'}}><span className="dot"/>Open to Work</div>
          <h2>Hi,👋 i'm <span className="grad">Handika Pratama</span></h2>
          <div className="about-role">Aspiring DevOps & IoT Engineer 🌐 — Institut Teknologi Del</div>
          <p>Passionate technology student focused on <strong>DevOps, Cloud Computing, and IoT systems</strong>. During my studies, I actively explored CI/CD pipelines, Docker, and Kubernetes — building a solid foundation that I'm continuing to grow.</p>
          <p>On the IoT side, I design <strong>embedded systems</strong> using Arduino, sensors, and MQTT protocols — bridging the physical and digital worlds.</p>
          <p>I embrace a <strong>continuous learning mindset</strong> — always exploring new tools and contributing to the DevOps ecosystem.</p>
          <div className="about-stats">
            <div className="stat-item"><div className="stat-num">4+</div><div className="stat-lbl">Projects<br/>Built</div></div>
            <div className="stat-item"><div className="stat-num">10+</div><div className="stat-lbl">Technologies<br/>Used</div></div>
            <div className="stat-item"><div className="stat-num">2+</div><div className="stat-lbl">Years<br/>Learning</div></div>
          </div>
          <div className="terminal">
            <div className="t-bar"><span className="t-dot t-r"/><span className="t-dot t-y"/><span className="t-dot t-g"/><span className="t-title mono">handika@pratama ~ $</span></div>
            <div className="t-body">
              <div><span className="tp">→ </span><span className="tc">whoami.yaml</span></div>
              <div><span className="tk">  name</span><span className="to">: </span><span className="tv">"Handika Pratama Nainggolan"</span></div>
              <div><span className="tk">  focus</span><span className="to">: </span><span className="tv">[DevOps, Cloud, IoT, Linux]</span></div>
              <div><span className="tk">  status</span><span className="to">: </span><span className="tv">"open_to_opportunities"</span></div>
              <div><span className="tp">→ </span><span className="t-cur"/></div>
            </div>
          </div>
          <div style={{display:'flex',gap:'.75rem',marginTop:'1.5rem',flexWrap:'wrap'}}>
            <a className="btn btn-accent" href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}>Contact With Me 💬</a>
            <a className="btn btn-outline" href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}}>My Projects →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SKILL ITEM (no percentage, just icon + name) ── */
function SkillItem({name, delay}) {
  const [show, setShow] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),delay);return()=>clearTimeout(t);},[delay]);
  return (
    <div className="skill-item" style={{
      opacity:show?1:0,
      transform:show?'translateY(0)':'translateY(18px)',
      transition:`opacity .4s ease,transform .4s ease`,
    }}>
      <div className="skill-icon-box"><SkillIcon name={name}/></div>
      <div className="skill-name">{name}</div>
    </div>
  );
}

/* ── SKILLS — single grid, no tabs, no percentage ── */
function SkillsSection() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-bg-title">TECH STACK</span>
          <h2>Tools & Technologies</h2>
        </div>
        <p style={{textAlign:'center',color:'var(--text2)',fontSize:'.88rem',marginBottom:'2.5rem'}}>
          Technologies I use as a DevOps & IoT Engineer
        </p>
        <div className="skills-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))'}}>
          {ALL_SKILLS.map((name,i)=>(
            <SkillItem key={name} name={name} delay={i*40}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT DETAIL MODAL ── */
function ProjectModal({project, onClose}) {
  if (!project) return null;
  useEffect(()=>{
    const h = e => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  },[onClose]);
  return (
    <div className="pdf-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div className="proj-modal-header">
          <div>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.7rem',color:'var(--accent)',letterSpacing:'.1em',marginBottom:4}}>PROJECT {project.num}</div>
            <div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--text)'}}>{project.title}</div>
          </div>
          <button className="pdf-modal-close" onClick={onClose}>✕</button>
        </div>
        {/* Image */}
        <div style={{width:'100%',height:220,overflow:'hidden',position:'relative',background:'var(--bg3)',flexShrink:0}}>
          <img src={project.img} alt={project.title}
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center center',display:'block'}}
            onError={e=>{e.target.style.display='none';}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 100%)'}}/>
        </div>
        {/* Body */}
        <div style={{padding:'1.75rem',overflowY:'auto',flex:1}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'1.25rem'}}>
            {project.tags.map((t,j)=><span key={t} className={`tag ${project.cls[j]||'tag-blue'}`}>{t}</span>)}
          </div>
          <p style={{fontSize:'.9rem',color:'var(--text2)',lineHeight:1.9,marginBottom:'1.5rem'}}>{project.detail}</p>
          {/* Buttons */}
          <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap'}}>
            <a href={project.gh} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              View Repository →
            </a>
            <button className="btn btn-ghost" onClick={onClose}>
              ✕ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROJECTS ── */
function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0,4);

  const handleShowLess = () => {
    setShowAll(false);
    // scroll back to top of projects section
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      <section id="projects" ref={sectionRef}>
        <div className="wrap">
          <div className="sec-head"><span className="sec-bg-title">PORTFOLIO</span><h2>Projects I've Built 🗂️</h2></div>
          <p style={{textAlign:'center',color:'var(--text2)',fontSize:'.88rem',marginBottom:'2.5rem'}}>Projects created while learning DevOps and IoT engineering.</p>

          <div className="projects-grid">
            {visible.map((p,i)=>(
              <div key={p.num} className="card proj-card"
                style={{animation:`fadeUp .45s ease ${(i%4)*0.08}s both`}}>
                <div className="proj-img">
                  <img src={p.img} alt={p.title} onError={e=>{e.target.style.display='none';}}/>
                  <div className="proj-img-ph">
                    <svg viewBox="0 0 80 60" width="80" height="60">
                      <path d="M10 50L10 10L70 10L70 50z" fill="none" stroke="rgba(108,99,255,0.2)" strokeWidth="2"/>
                      <circle cx="25" cy="25" r="8" fill="rgba(108,99,255,0.1)"/>
                      <path d="M10 40L28 24L45 38L58 28L70 40" fill="none" stroke="rgba(108,99,255,0.25)" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <div className="proj-body">
                  <div className="proj-num">{p.num}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tags">{p.tags.slice(0,4).map((t,j)=><span key={t} className={`tag ${p.cls[j]||'tag-blue'}`}>{t}</span>)}</div>
                  <div className="proj-links">
                    <button className="btn btn-accent" style={{padding:'8px 18px',fontSize:'.78rem'}} onClick={()=>setSelected(p)}>
                      Details ↗
                    </button>
                    <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{padding:'8px 18px',fontSize:'.78rem'}}>
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All button — hanya muncul saat belum showAll */}
          {!showAll && PROJECTS.length > 4 && (
            <div style={{textAlign:'center',marginTop:'2.5rem'}}>
              <button className="btn btn-outline" style={{padding:'12px 32px',fontSize:'.82rem'}}
                onClick={()=>setShowAll(true)}>
                View All Projects ↓
              </button>
            </div>
          )}

          {/* Show Less button — muncul saat showAll, klik scroll balik ke atas projects */}
          {showAll && (
            <div style={{textAlign:'center',marginTop:'2.5rem'}}>
              <button className="btn btn-ghost" style={{padding:'12px 32px',fontSize:'.82rem'}}
                onClick={handleShowLess}>
                ↑ Show Less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section — hanya tampil saat TIDAK showAll */}
      {!showAll && (
        <section style={{padding:'5rem 0',background:'var(--bg2)',position:'relative',zIndex:1}}>
          <div className="wrap" style={{textAlign:'center'}}>
            <div style={{
              maxWidth:650,margin:'0 auto',
              padding:'3.5rem 2.5rem',
              background:'var(--card)',
              border:'1px solid var(--border)',
              borderRadius:24,
              position:'relative',
              overflow:'hidden',
            }}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center, rgba(108,99,255,0.07) 0%, transparent 70%)',pointerEvents:'none'}}/>

              {/* Let's Work Together */}
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.72rem',color:'var(--accent)',letterSpacing:'.18em',textTransform:'uppercase',marginBottom:'1.25rem',position:'relative'}}>
                Let's Work Together
              </div>

              {/* Have a project in mind? */}
              <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.4rem)',fontWeight:900,color:'var(--text)',letterSpacing:'-0.04em',marginBottom:'1rem',lineHeight:1.15,position:'relative'}}>
                Have a project in mind?
              </h2>

              {/* Let's build it together. */}
              <p style={{fontSize:'clamp(1rem,2vw,1.3rem)',fontWeight:600,position:'relative',
                background:'linear-gradient(135deg,var(--accent),var(--accent3))',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                marginBottom:'2rem',
              }}>
                Let's build it together.
              </p>

              <div style={{position:'relative'}}>
                <a className="btn btn-accent" href="#contact" style={{padding:'12px 32px',fontSize:'.88rem'}}
                  onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}>
                  Get In Touch 📩
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {selected && <ProjectModal project={selected} onClose={()=>setSelected(null)}/>}
    </>
  );
}

/* ── EXPERIENCE ── */
function ExperienceSection() {
  useReveal();
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">EXPERIENCE</span><h2>Experiences ⏳</h2></div>
        <p className="exp-intro">Here are the experiences I have had and am currently involved in.</p>
        <div className="exp-grid">
          {EXPERIENCES.map((e,i)=>(
            <div key={e.title} className={`card exp-card reveal d${(i%4)+1}`}>
              <div className="exp-title">{e.title}</div>
              <div className="exp-org">{e.org}</div>
              <div className="exp-type">| {e.type}</div>
              <div className="exp-date">📅 {e.date}</div>
              <div className="exp-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EDUCATION ── */
function EducationSection() {
  useReveal();
  return (
    <section id="education">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">EDUCATION</span><h2>Educations 🎓 & Awards 🏆</h2></div>
        <p className="edu-intro">My formal education background and achievements I've reached.</p>
        <div className="edu-grid">
          <div className="reveal">
            <div className="edu-col-label">🎓 Educations</div>
            <div className="edu-panel">
              {EDUCATION_LIST.map(e=>(
                <div key={e.title} className="edu-item">
                  <div className="edu-item-title">{e.title}</div>
                  <div className="edu-item-sub">{e.sub}</div>
                  <div className="edu-item-date">📅 {e.date}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2">
            <div className="edu-col-label">🏆 Awards & Achievements</div>
            <div className="edu-panel">
              {AWARDS_LIST.map(a=>(
                <div key={a.title} className="edu-item">
                  <div className="edu-item-title">{a.title}</div>
                  <div className="edu-item-sub">{a.sub}</div>
                  <div className="edu-item-date">📅 {a.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CERT CARD — PDF thumbnail preview + zoom + click to open ── */
function CertCard({cert, idx, onOpen}) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(()=>{
    const t = setTimeout(()=>setShow(true), idx*120);
    return ()=>clearTimeout(t);
  },[idx]);

  return (
    <div
      className="cert-card card"
      style={{
        opacity:show?1:0,
        transform:show?'translateY(0)':'translateY(24px)',
        transition:'opacity .45s ease, transform .45s ease',
        cursor:'pointer',
        overflow:'hidden',
        borderRadius:16,
        padding:0,
      }}
      onClick={()=>onOpen(cert)}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
    >
      {/* PDF thumbnail — iframe preview, zoom on hover */}
      <div style={{
        width:'100%', height:190,
        overflow:'hidden', position:'relative',
        background:'var(--bg3)',
        borderBottom:'1px solid var(--border)',
      }}>
        <iframe
          src={cert.pdf + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH'}
          title={cert.title}
          style={{
            width:'100%', height:'100%',
            border:'none', pointerEvents:'none',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition:'transform .45s cubic-bezier(.25,.46,.45,.94)',
            transformOrigin:'center top',
          }}
        />
        {/* hover overlay */}
        <div style={{
          position:'absolute', inset:0,
          background: hovered ? 'rgba(108,99,255,0.12)' : 'transparent',
          transition:'background .3s',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {hovered && (
            <div style={{
              background:'var(--accent)', color:'#fff',
              borderRadius:10, padding:'8px 18px',
              fontFamily:'JetBrains Mono,monospace', fontSize:'.75rem',
              fontWeight:700, display:'flex', alignItems:'center', gap:6,
              boxShadow:'0 4px 16px rgba(108,99,255,0.4)',
            }}>
              📄 Buka PDF
            </div>
          )}
        </div>
      </div>
      {/* Card body */}
      <div className="cert-body">
        <div className="cert-title">{cert.title}</div>
        <div className="cert-issuer">{cert.issuer}</div>
        <div className="cert-date">📅 {cert.date}</div>
        <div className="cert-desc">{cert.desc}</div>
      </div>
    </div>
  );
}

/* ── CERTIFICATES SECTION ── */
function CertificatesSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="certificates">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">CERTIFICATES</span><h2>Certificates 🎓</h2></div>
       <p className="certs-intro">Certificates earned through unive rsity, workshops, and self-paced learning.</p>
        <div className="certs-grid">
          {CERTS.map((c,i)=>(
            <CertCard key={c.title} cert={c} idx={i} onOpen={setSelected}/>
          ))}
        </div>
      </div>
      {selected && <PdfModal cert={selected} onClose={()=>setSelected(null)}/>}
    </section>
  );
}

/* ── CONTACT ── */
function ContactSection() {
  useReveal();
  const [form,setForm]=useState({name:'',email:'',msg:''});
  const [sent,setSent]=useState(false);
  const go=e=>{
    e.preventDefault();
    window.open(`mailto:handikanainggolan24@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.msg+'\n\nFrom: '+form.name+'\nEmail: '+form.email)}`);
    setSent(true);setTimeout(()=>setSent(false),4000);
  };
  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">CONTACT</span><h2>Let's Connect 🤝</h2></div>
        <div className="contact-grid">
          <div className="reveal">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>Open to internships, collaborations, and DevOps & IoT projects. Let's build something great together.</p>
              {[
                {href:'mailto:handikanainggolan24@gmail.com',icon:'@',cls:'ci-b',l:'Email',v:'handikanainggolan24@gmail.com'},
                {href:'https://wa.me/6282276310317',icon:'✉',cls:'ci-g',l:'WhatsApp',v:'+62 822-7631-0317'},
                {href:'https://github.com/handika-nainggolan',icon:'⌘',cls:'ci-p',l:'GitHub',v:'github.com/handika-nainggolan'},
              ].map(c=>(
                <a key={c.l} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className={`c-icon ${c.cls}`}>{c.icon}</div>
                  <div><div className="c-lbl">{c.l}</div><div className="c-val">{c.v}</div></div>
                </a>
              ))}
            </div>
          </div>
          <div className="card reveal d2" style={{padding:'2rem'}}>
            {sent&&<div style={{background:'rgba(52,211,153,0.1)',border:'1px solid rgba(52,211,153,0.3)',borderRadius:10,padding:'10px 14px',marginBottom:'1rem',color:'var(--green)',fontFamily:'JetBrains Mono,monospace',fontSize:'.78rem'}}>✓ Opening email client...</div>}
            <form onSubmit={go}>
              <div className="form-field"><label>Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" required/></div>
              <div className="form-field"><label>Email</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="your@email.com" required/></div>
              <div className="form-field"><label>Message</label><textarea value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} placeholder="Tell me about your project..." required/></div>
              <button type="submit" className="btn btn-accent" style={{width:'100%',justifyContent:'center'}}>Send Message →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        {[{href:'https://github.com/handika-nainggolan',l:'GitHub'},{href:'https://wa.me/6282276310317',l:'WhatsApp'},{href:'mailto:handikanainggolan24@gmail.com',l:'Email'},{href:'https://www.linkedin.com/in/handika-pratama-52178332b/',l:'LinkedIn'}].map(x=>(
          <a key={x.l} href={x.href} target="_blank" rel="noopener noreferrer">{x.l}</a>
        ))}
      </div>
      <div className="footer-copy">Designed & built by <span>Handika Pratama Nainggolan</span> · IT Del · <span>{new Date().getFullYear()}</span></div>
    </footer>
  );
}

function BackToTop() {
  const [show,setShow]=useState(false);
  useEffect(()=>{const h=()=>setShow(window.scrollY>300);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  return <button className={`btt${show?' show':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>;
}

/* ── APP ── */
export default function App() {
  const [theme,setTheme]=useState('dark');
  const [loaded,setLoaded]=useState(false);
  const active=useActiveSection();
  useEffect(()=>{document.body.className=theme;},[theme]);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),2200);return()=>clearTimeout(t);},[]);
  return (
    <>
      <Loader done={loaded}/>
      <div style={{opacity:loaded?1:0,transition:'opacity .5s ease .1s'}}>
        <div className="grid-bg"/>
        <Particles/>
        <Navbar active={active} theme={theme} toggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')}/>
        <main>
          <HeroSection/>
          <AboutSection/>
          <EducationSection/>
          <SkillsSection/>
          <ExperienceSection/>
          <CertificatesSection/>
          <ProjectsSection/>
          <ContactSection/>
        </main>
        <Footer/>
        <BackToTop/>
      </div>
    </>
  );
}
