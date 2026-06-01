import React, { useState, useEffect, useRef } from 'react';
import './index.css';

/* ── TYPEWRITER ──────────────────────────────────────────────────────────── */
function useTypewriter(words, spd=75, del=42, pause=2000) {
  const [txt, setTxt] = useState('');
  const [wi, setWi]   = useState(0);
  const [ph, setPh]   = useState('type');
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

/* ── SKILL ICONS SVG ─────────────────────────────────────────────────────── */
const ICONS = {
  Linux:        <svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#333" cx="64" cy="64" r="56"/><ellipse fill="#eee" cx="47" cy="60" rx="7" ry="10"/><ellipse fill="#eee" cx="81" cy="60" rx="7" ry="10"/><ellipse fill="#333" cx="47" cy="61" rx="4" ry="5"/><ellipse fill="#333" cx="81" cy="61" rx="4" ry="5"/><path stroke="#eee" strokeWidth="2.5" fill="none" d="M50 76 Q64 88 78 76"/><path fill="#eee" d="M40 44 Q48 34 56 42 Q48 36 40 44z"/><path fill="#eee" d="M88 44 Q80 34 72 42 Q80 36 88 44z"/></svg>,
  Docker:       <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#2396ED" width="128" height="128" rx="14"/><rect fill="#fff" x="18" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="40" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="46" width="18" height="14" rx="2"/><rect fill="#fff" x="40" y="28" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="28" width="18" height="14" rx="2"/><rect fill="#fff" x="62" y="10" width="18" height="14" rx="2"/><path fill="#fff" d="M108 52c-2-1.5-7-2-11-1-.4-4-3-7.5-7.5-10.5l-2.5-1.7-1.7 2.5c-2 3.2-3 7.5-2.8 12-1.5-.8-3.8-2-7-2H6l-.3 1.5C4.4 60.7 5.6 72 12.3 79.2 17.8 85.2 25.7 88 36 88c19.5 0 34-9 40.8-25.3 2.7.1 8.5.1 11.4-5.6l.5-1.2z"/></svg>,
  Kubernetes:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#326CE5" width="128" height="128" rx="14"/><path fill="none" stroke="#fff" strokeWidth="2.5" d="M64 22L18 48v32l46 26 46-26V48z"/><circle fill="#fff" cx="64" cy="64" r="9"/><circle fill="#fff" cx="64" cy="28" r="5"/><circle fill="#fff" cx="64" cy="100" r="5"/><circle fill="#fff" cx="34" cy="46" r="5"/><circle fill="#fff" cx="94" cy="46" r="5"/><circle fill="#fff" cx="34" cy="82" r="5"/><circle fill="#fff" cx="94" cy="82" r="5"/><line x1="64" y1="33" x2="64" y2="55" stroke="#fff" strokeWidth="2"/><line x1="64" y1="73" x2="64" y2="95" stroke="#fff" strokeWidth="2"/><line x1="39" y1="49" x2="57" y2="59" stroke="#fff" strokeWidth="2"/><line x1="71" y1="69" x2="89" y2="79" stroke="#fff" strokeWidth="2"/><line x1="39" y1="79" x2="57" y2="69" stroke="#fff" strokeWidth="2"/><line x1="71" y1="59" x2="89" y2="49" stroke="#fff" strokeWidth="2"/></svg>,
  'Git & GitHub':<svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#24292e" cx="64" cy="64" r="56"/><path fill="#fff" d="M64 14C37.5 14 16 35.5 16 62c0 21.2 13.7 39.2 32.8 45.6 2.4.4 3.2-1 3.2-2.3v-8.3c-13.3 2.9-16-6.4-16-6.4-2.2-5.5-5.3-6.9-5.3-6.9-4.3-2.9.3-2.9.3-2.9 4.8.3 7.3 4.9 7.3 4.9 4.2 7.2 11.1 5.1 13.8 3.9.4-3 1.6-5.1 3-6.3-10.6-1.2-21.7-5.3-21.7-23.5 0-5.2 1.9-9.5 4.9-12.8-.5-1.2-2.1-6.1.5-12.6 0 0 4-.1 13 5 3.8-1 7.8-1.5 11.8-1.5 4 0 8.1.5 11.8 1.5 8.9-5.1 12.9-5 12.9-5 2.6 6.6 1 11.5.5 12.7 3 3.3 4.8 7.6 4.8 12.8 0 18.3-11.1 22.3-21.7 23.5 1.7 1.5 3.2 4.4 3.2 8.8v13.1c0 1.3.8 2.7 3.2 2.3C98.3 101.2 112 83.2 112 62c0-26.5-21.5-48-48-48z"/></svg>,
  'CI/CD':      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0d1117" width="128" height="128" rx="14"/><circle fill="none" stroke="#58a6ff" strokeWidth="4" cx="64" cy="64" r="30"/><path fill="none" stroke="#58a6ff" strokeWidth="4" d="M64 34 A30 30 0 0 1 94 64"/><polygon fill="#58a6ff" points="94,52 100,66 108,56"/><circle fill="#3fb950" cx="64" cy="64" r="10"/><path stroke="#fff" strokeWidth="2" fill="none" d="M59 64l4 4 8-8"/></svg>,
  Prometheus:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#E6522C" width="128" height="128" rx="14"/><circle fill="none" stroke="#fff" strokeWidth="4" cx="64" cy="64" r="36"/><path fill="#fff" d="M64 30v10M64 88v10M28 64h10M90 64h10"/><circle fill="#fff" cx="64" cy="64" r="10"/></svg>,
  Grafana:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><polyline points="16,96 36,62 52,74 72,40 90,58 112,32" fill="none" stroke="#F46800" strokeWidth="4" strokeLinejoin="round"/><circle fill="#F46800" cx="36" cy="62" r="5"/><circle fill="#F46800" cx="52" cy="74" r="5"/><circle fill="#F46800" cx="72" cy="40" r="5"/><circle fill="#F46800" cx="90" cy="58" r="5"/><circle fill="#F46800" cx="112" cy="32" r="5"/></svg>,
  Networking:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0078D7" width="128" height="128" rx="14"/><circle fill="#fff" cx="64" cy="28" r="10"/><circle fill="#fff" cx="24" cy="90" r="10"/><circle fill="#fff" cx="104" cy="90" r="10"/><circle fill="#fff" cx="64" cy="90" r="10"/><line x1="64" y1="38" x2="24" y2="80" stroke="#fff" strokeWidth="3"/><line x1="64" y1="38" x2="104" y2="80" stroke="#fff" strokeWidth="3"/><line x1="64" y1="38" x2="64" y2="80" stroke="#fff" strokeWidth="3"/><line x1="34" y1="90" x2="54" y2="90" stroke="#fff" strokeWidth="3"/><line x1="74" y1="90" x2="94" y2="90" stroke="#fff" strokeWidth="3"/></svg>,
  Python:       <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><path fill="#3572A5" d="M63.5 14C44 14 45 22.5 45 22.5V33h19v4H28.5S10 34.7 10 54s17 20.5 17 20.5H36V65s-.5-17 17.5-17H71s17 .3 17-16.3V21.2S90.4 14 63.5 14z"/><path fill="#FFD845" d="M64.5 114c19.5 0 18.5-8.5 18.5-8.5V95H64v-4h35.5S118 93.3 118 74s-17-20.5-17-20.5H92v9.5s.5 17-17.5 17H56.5s-17-.3-17 16.3v15.5S37.6 114 64.5 114z"/></svg>,
  Java:         <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><path fill="#EA2D2E" d="M51.5 66.3s-3.8 2.2 2.7 3c7.8.8 11.8.7 20.4-.8 0 0 2.3 1.4 5.4 2.6C60 79 31 71.5 51.5 66.3zM49 57.5s-4.3 3.1 2.3 3.8c8.4.9 15 1 26.5-1.3 0 0 1.5 1.6 3.9 2.4C58.4 69 24.3 64 49 57.5zM73.8 44c4.8 5.5-1.3 10.4-1.3 10.4s12.3-6.4 6.6-14.2c-5.2-7.4-9.2-11 12.5-23.6 0 0-34.2 8.5-17.8 27.4zM75.7 10s10 10-9.5 25.5c-15.7 12.4-3.6 19.5-.1 27.5-9.2-8.3-16-15.6-11.4-22.4C61.3 29.3 80 24.4 75.7 10z"/></svg>,
  JavaScript:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#F7DF1E" width="128" height="128" rx="14"/><path fill="#323330" d="M26 108l9.5-5.7c1.8 3.3 3.5 6 7.5 6 3.8 0 6.2-1.5 6.2-7.4V63h11.7v38.1c0 12.2-7.2 17.7-17.6 17.7-9.5 0-14.9-4.9-17.3-10.8zm43.5-1.7l9.5-5.5c2.5 4.1 5.7 7.1 11.4 7.1 4.8 0 7.8-2.4 7.8-5.7 0-3.9-3.1-5.3-8.4-7.6l-2.9-1.2c-8.3-3.5-13.8-7.9-13.8-17.2 0-8.6 6.5-15.1 16.6-15.1 7.2 0 12.4 2.5 16.1 9.1l-8.8 5.7c-1.9-3.5-4-4.9-7.3-4.9-3.3 0-5.4 2.1-5.4 4.9 0 3.4 2.1 4.8 7 6.9l2.9 1.2c9.8 4.1 15.3 8.4 15.3 18 0 10.3-8.1 16-18.9 16-10.6 0-17.4-5-20.9-11.6z"/></svg>,
  HTML:         <svg viewBox="0 0 128 128" width="36" height="36"><path fill="#E44D26" d="M18 10l9.8 109.5L64 128l36.2-8.5L110 10z"/><path fill="#F16529" d="M64 118.8l29.2-8.1 8.3-93.7H64z"/><path fill="#fff" d="M64 52H43l1.2 13.5H64V79H28.5L24.8 38h39.2zm0 35h-16l-1 10.8 17 4.7V104.5z"/><path fill="#ebebeb" d="M64 52h19.8l-1.6 17.5H64V83.5h18l-1.5 16.5L64 104.3V52z"/></svg>,
  CSS:          <svg viewBox="0 0 128 128" width="36" height="36"><path fill="#1572B6" d="M18 10l9.8 109.5L64 128l36.2-8.5L110 10z"/><path fill="#33A9DC" d="M64 118.8l29.2-8.1 8.3-93.7H64z"/><path fill="#fff" d="M64 68H44.2l-.6-7H64V47.5H28l.3 3 3 34H64zm0 19.5l-.1.1-13.6-3.7-.9-9.6H35.5l1.8 19.8 26.6 7.4.1-.1z"/><path fill="#ebebeb" d="M63.9 68h18.6l-1.6 17.3-17 4.6V104l26.4-7.3 3.1-35.7H63.9z"/></svg>,
  Arduino:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#00979D" width="128" height="128" rx="14"/><rect fill="#fff" x="10" y="50" width="108" height="28" rx="14"/><rect fill="#00979D" x="18" y="58" width="92" height="12" rx="6"/><line x1="36" y1="64" x2="28" y2="64" stroke="#fff" strokeWidth="3"/><line x1="28" y1="58" x2="28" y2="70" stroke="#fff" strokeWidth="3"/><line x1="44" y1="64" x2="52" y2="64" stroke="#fff" strokeWidth="3"/><line x1="76" y1="64" x2="84" y2="64" stroke="#fff" strokeWidth="3"/><line x1="84" y1="58" x2="84" y2="70" stroke="#fff" strokeWidth="3"/><line x1="72" y1="64" x2="64" y2="64" stroke="#fff" strokeWidth="3"/></svg>,
  Sensors:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#0f0f2a" width="128" height="128" rx="14"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="44" opacity="0.25"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="30" opacity="0.55"/><circle fill="none" stroke="#63b3ff" strokeWidth="2.5" cx="64" cy="64" r="16" opacity="0.85"/><circle fill="#63b3ff" cx="64" cy="64" r="7"/><line x1="64" y1="12" x2="64" y2="22" stroke="#63b3ff" strokeWidth="3"/><line x1="64" y1="106" x2="64" y2="116" stroke="#63b3ff" strokeWidth="3"/><line x1="12" y1="64" x2="22" y2="64" stroke="#63b3ff" strokeWidth="3"/><line x1="106" y1="64" x2="116" y2="64" stroke="#63b3ff" strokeWidth="3"/></svg>,
  MQTT:         <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#660066" width="128" height="128" rx="14"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M18 100 Q64 14 110 100"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M30 100 Q64 30 98 100"/><path fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" d="M44 100 Q64 50 84 100"/><rect fill="#fff" x="56" y="94" width="16" height="20" rx="3"/></svg>,
  Automation:   <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1e3a5f" width="128" height="128" rx="14"/><circle fill="none" stroke="#63b3ff" strokeWidth="3.5" cx="64" cy="64" r="30"/><path fill="none" stroke="#63b3ff" strokeWidth="3.5" d="M64 34 A30 30 0 0 1 90 76"/><polygon fill="#63b3ff" points="86,85 96,74 104,84"/><path fill="none" stroke="#63b3ff" strokeWidth="2.5" d="M64 52L64 64L74 74"/><circle fill="#fff" cx="64" cy="64" r="6"/></svg>,
  'Embedded Sys':<svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#111" width="128" height="128" rx="14"/><rect fill="#2d5a27" x="22" y="22" width="84" height="84" rx="6"/><rect fill="#111" x="46" y="46" width="36" height="36" rx="3"/><text x="64" y="69" textAnchor="middle" fill="#4ade80" fontSize="13" fontFamily="monospace" fontWeight="bold">CPU</text><rect fill="#4ade80" x="8" y="46" width="14" height="5" rx="2"/><rect fill="#4ade80" x="8" y="58" width="14" height="5" rx="2"/><rect fill="#4ade80" x="8" y="70" width="14" height="5" rx="2"/><rect fill="#4ade80" x="106" y="46" width="14" height="5" rx="2"/><rect fill="#4ade80" x="106" y="58" width="14" height="5" rx="2"/><rect fill="#4ade80" x="106" y="70" width="14" height="5" rx="2"/></svg>,
  'Raspberry Pi':<svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#C51A4A" width="128" height="128" rx="14"/><path fill="#fff" d="M64 20c-7 0-12 5-12 10 0 2.5 1 4.5 2.5 6-7 2.5-11.5 8-11.5 15 0 9.5 8.5 17 21 17s21-7.5 21-17c0-7-4.5-12.5-11.5-15 1.5-1.5 2.5-3.5 2.5-6 0-5-5-10-12-10z"/><rect fill="#fff" x="38" y="76" width="52" height="7" rx="3"/><rect fill="#fff" x="38" y="89" width="52" height="7" rx="3"/><rect fill="#fff" x="38" y="102" width="52" height="7" rx="3"/></svg>,
  'VS Code':    <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1e1e1e" width="128" height="128" rx="14"/><path fill="#007ACC" d="M94.8 8.8L52 49.6 29.5 32 10 42v44l19.5 10L52 78.5l42.8 40.7L118 108V20z"/><path fill="#1BA1E2" d="M118 20L94.8 8.8 52 49.6v28.8l42.8 40.7L118 108z"/><path fill="#fff" d="M29.5 75.5L52 58V70l-22.5 16v-10.5zM52 58L29.5 40 10 50v8l19.5-10L52 66v-8z"/></svg>,
  Postman:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#FF6C37" width="128" height="128" rx="14"/><circle fill="#fff" cx="66" cy="64" r="28"/><circle fill="#FF6C37" cx="66" cy="64" r="20"/><path fill="#fff" d="M50 58l28-8-16 26z"/><line x1="26" y1="64" x2="40" y2="64" stroke="#fff" strokeWidth="5" strokeLinecap="round"/><circle fill="#fff" cx="26" cy="64" r="4"/></svg>,
  MongoDB:      <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#1a1a2e" width="128" height="128" rx="14"/><path fill="#439934" d="M88 32C80 20 68 14 64 14s-16 6-24 18C30 47 26 56 26 66c0 22 18 42 38 48V86c-8-4-12-16-12-20 0-8 6-12 12-12s12 4 12 12c0 4-4 16-12 20v28c20-6 38-26 38-48 0-10-4-19-14-34z"/></svg>,
  Kafka:        <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#231F20" width="128" height="128" rx="14"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="64" cy="28" r="12"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="30" cy="90" r="12"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="98" cy="90" r="12"/><line x1="64" y1="40" x2="36" y2="78" stroke="#fff" strokeWidth="2.5"/><line x1="64" y1="40" x2="92" y2="78" stroke="#fff" strokeWidth="2.5"/><line x1="42" y1="90" x2="86" y2="90" stroke="#fff" strokeWidth="2.5"/><circle fill="#fff" cx="64" cy="28" r="5"/><circle fill="#fff" cx="30" cy="90" r="5"/><circle fill="#fff" cx="98" cy="90" r="5"/></svg>,
  'Node.js':    <svg viewBox="0 0 128 128" width="36" height="36"><path fill="#404137" d="M64 16L16 46v36l48 28 48-28V46z"/><path fill="#83CD29" d="M64 22L22 46v36l42 24 42-24V46z"/><text x="64" y="74" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" fontFamily="monospace">JS</text></svg>,
  Terraform:    <svg viewBox="0 0 128 128" width="36" height="36"><rect fill="#5C4EE5" width="128" height="128" rx="14"/><path fill="#fff" d="M48 22l26 15v30L48 52zM78 38l26 15v30L78 68zM18 52l26 15v30L18 82zM48 72l26 15v18L48 90z"/></svg>,
  Ansible:      <svg viewBox="0 0 128 128" width="36" height="36"><circle fill="#1A1918" cx="64" cy="64" r="56"/><circle fill="none" stroke="#fff" strokeWidth="3" cx="64" cy="64" r="40"/><path fill="#fff" d="M64 24c-3 0-5 2-5 5l18 60-22-36-8 2 26 44c1 2 3 3 5 3 4 0 7-3 7-7V29c0-3-2-5-5-5z"/></svg>,
};
const SkillIcon = ({name}) => ICONS[name] || (
  <svg viewBox="0 0 36 36" width="36" height="36">
    <rect width="36" height="36" rx="8" fill="rgba(124,109,250,0.15)"/>
    <text x="18" y="24" textAnchor="middle" fill="#7c6dfa" fontSize="12" fontWeight="bold" fontFamily="monospace">{name.slice(0,2).toUpperCase()}</text>
  </svg>
);

/* ── DATA ────────────────────────────────────────────────────────────────── */
const SECTIONS = ['home','about','skills','projects','experience','education','certificates','contact'];
const NAV_LABELS = ['Home','About','Skills','Projects','Experience','Education','Certificates','Contact'];

const SKILL_GROUPS = {
  DevOps:      [{n:'Linux',l:90},{n:'Docker',l:85},{n:'Kubernetes',l:80},{n:'Git & GitHub',l:90},{n:'CI/CD',l:75},{n:'Prometheus',l:70},{n:'Grafana',l:70},{n:'Networking',l:70}],
  Programming: [{n:'Python',l:80},{n:'Java',l:70},{n:'JavaScript',l:75},{n:'HTML',l:85},{n:'CSS',l:80}],
  IoT:         [{n:'Arduino',l:85},{n:'Sensors',l:80},{n:'MQTT',l:70},{n:'Automation',l:75},{n:'Embedded Sys',l:75},{n:'Raspberry Pi',l:65}],
  Tools:       [{n:'VS Code',l:95},{n:'Postman',l:80},{n:'MongoDB',l:70},{n:'Kafka',l:65},{n:'Node.js',l:70},{n:'Terraform',l:60},{n:'Ansible',l:60}],
};
const TAB_COLOR = {DevOps:'#7c6dfa',Programming:'#a78bfa',IoT:'#38bdf8',Tools:'#4ade80'};
const TAB_ICON  = {DevOps:'⚙️',Programming:'💻',IoT:'📡',Tools:'🛠️'};

const PROJECTS = [
  {num:'01',title:'Kubernetes Blog Platform',desc:'Scalable blog platform on Kubernetes using Deployments, Services, Ingress, ConfigMaps, Secrets, PV, and HPA for high availability.',tags:['Kubernetes','Docker','Ingress','HPA'],cls:['tag-purple','tag-blue','tag-green','tag-orange'],gh:'https://github.com/handika-nainggolan',img:'/projects/kubernetes.jpg'},
  {num:'02',title:'Distributed E-Commerce System',desc:'Event-driven distributed e-commerce using Apache Kafka, MongoDB, Express.js, and microservices for scalable order processing.',tags:['Kafka','MongoDB','Express.js','Node.js'],cls:['tag-orange','tag-green','tag-blue','tag-purple'],gh:'https://github.com/handika-nainggolan/sistem-terdistribusi',img:'/projects/ecommerce.jpg'},
  {num:'03',title:'IoT Fire & Gas Detection',desc:'Arduino-based smart monitoring system detecting fire and gas leaks with buzzer alerts, LCD display, water pump automation, and mobile notifications.',tags:['Arduino','MQTT','Sensors','IoT'],cls:['tag-blue','tag-purple','tag-green','tag-orange'],gh:'https://github.com/handika-nainggolan',img:'/projects/iot-fire.jpg'},
  {num:'04',title:'DevOps Monitoring Platform',desc:'Comprehensive DevOps monitoring for infrastructure observability, service health, metrics collection, alerting, and dashboards.',tags:['Prometheus','Grafana','Docker','Linux'],cls:['tag-orange','tag-blue','tag-purple','tag-green'],gh:'https://github.com/handika-nainggolan',img:'/projects/monitoring.jpg'},
];

const EXPERIENCES = [
  {title:'Member – Del Cyber Security Club',org:'IT Del',type:'Organization',date:'2023 – Present',desc:'Active member exploring cybersecurity, ethical hacking, network security, and digital forensics.'},
  {title:'Kubernetes & Container Orchestration',org:'Online Training',type:'Workshop',date:'2024',desc:'Hands-on training: pod management, deployments, services, ingress controllers, production cluster operations.'},
  {title:'Cloud Computing Fundamentals',org:'Self-paced Certification',type:'Certification',date:'2024',desc:'Core cloud concepts: IaaS/PaaS/SaaS, virtualization, and cloud deployment strategies.'},
  {title:'Linux System Administration',org:'Self-paced',type:'Training',date:'2023',desc:'Shell scripting, user management, networking, cron jobs, and system monitoring tools.'},
  {title:'IoT Development with Arduino',org:'Project-based Learning',type:'Project',date:'2023',desc:'Multiple IoT projects using Arduino, sensors, serial communication, and real-time monitoring.'},
];

const EDUCATION_LIST = [{title:'Institut Teknologi Del (IT Del)',sub:'Informatics Engineering',date:'2022 – Present'}];
const AWARDS_LIST = [
  {title:'Finalist ON MIPA PT 2023',sub:'Bandung Institute of Technology',date:'June 2023'},
  {title:'Del Cyber Security Club Active Member',sub:'Institut Teknologi Del',date:'2023 – Present'},
  {title:'Kubernetes Practitioner Certificate',sub:'Project-based',date:'2024'},
];

const CERTS = [
  {title:'Kubernetes & Container Orchestration',issuer:'Online Training Platform',date:'2024',desc:'Deployment strategies, autoscaling, ingress, and cluster management.',img:'/certs/kubernetes.jpg',em:'☸️'},
  {title:'Cloud Computing Fundamentals',issuer:'Self-paced Certification',date:'2024',desc:'Core cloud concepts: IaaS, PaaS, SaaS and deployment strategies.',img:'/certs/cloud.jpg',em:'☁️'},
  {title:'Linux System Administration',issuer:'Self-paced Learning',date:'2023',desc:'Shell scripting, system administration, and infrastructure management.',img:'/certs/linux.jpg',em:'🐧'},
  {title:'IoT with Arduino & Embedded Systems',issuer:'Project-based',date:'2023',desc:'Hands-on IoT using Arduino microcontrollers, sensors, and MQTT.',img:'/certs/iot.jpg',em:'📡'},
  {title:'Del Cyber Security Club',issuer:'Institut Teknologi Del',date:'2023 – Present',desc:'Cybersecurity workshops, ethical hacking, and network security training.',img:'/certs/cybersec.jpg',em:'🔐'},
  {title:'DevOps Monitoring & Observability',issuer:'Self-paced',date:'2024',desc:'Prometheus, Grafana monitoring stack for production infrastructure.',img:'/certs/devops.jpg',em:'📊'},
];

/* ── COMPONENTS ──────────────────────────────────────────────────────────── */
function Loader({done}) {
  const [msg, setMsg] = useState('initializing...');
  useEffect(()=>{
    const msgs=['loading modules...','starting containers...','ready ✓'];
    let i=0; const t=setInterval(()=>{setMsg(msgs[i++]);if(i>=msgs.length)clearInterval(t);},600);
    return ()=>clearInterval(t);
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
  const ref = useRef(null);
  useEffect(()=>{
    const canvas=ref.current; const ctx=canvas.getContext('2d');
    let W=canvas.width=window.innerWidth, H=canvas.height=window.innerHeight;
    const pts=Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.2+.3,a:Math.random()*.3+.07}));
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(124,109,250,${p.a})`;ctx.fill();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(124,109,250,${.04*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} id="particles-canvas"/>;
}

function Navbar({active, theme, toggleTheme}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  };
  return (
    <nav className={`navbar${scrolled?' scrolled':''}`}>
      <div className="nav-logo" onClick={()=>goTo('hero')}>
        <span>&lt;</span>Dika Pratama<span>/&gt;</span>
      </div>
      <button className="hamburger" onClick={()=>setOpen(o=>!o)}>{open?'✕':'☰'}</button>
      <ul className={`nav-links${open?' open':''}`}>
        {SECTIONS.map((s,i)=>(
          <li key={s}>
            <a className={active===s?'active':''} onClick={()=>goTo(s)}>{NAV_LABELS[i]}</a>
          </li>
        ))}
      </ul>
      <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
        {theme==='dark'?'☀️':'🌙'}
      </button>
    </nav>
  );
}

/* Scroll reveal hook */
function useReveal() {
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal');
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

/* Active section tracker */
function useActiveSection() {
  const [active, setActive] = useState('hero');
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); });
    },{threshold:0.4});
    SECTIONS.forEach(s=>{ const el=document.getElementById(s); if(el) obs.observe(el); });
    return()=>obs.disconnect();
  },[]);
  return active;
}

/* ── HERO SECTION ── */
function HeroSection() {
  const typed = useTypewriter(['Aspiring DevOps Engineer','IoT Systems Builder','Cloud Computing Enthusiast','Linux & Infrastructure Nerd','Kubernetes Practitioner','IT Support Enthusiast']);
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
          <p className="hero-desc">IT student at IT Del focused on DevOps, Cloud Computing, Linux, Kubernetes, IoT systems — building scalable systems and smart solutions.</p>
          <div className="hero-btns">
            <a className="btn btn-accent" href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}}>View Projects →</a>
            <a className="btn btn-outline" href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}}>Contact Me</a>
            <a className="btn btn-ghost" href="mailto:handikanainggolan24@gmail.com">↓ Download CV</a>
          </div>
          <div className="hero-socials">
            {[{href:'https://github.com/handika-nainggolan',l:'GH'},{href:'https://www.linkedin.com/in/handika-pratama-52178332b/',l:'in'},{href:'mailto:handikanainggolan24@gmail.com',l:'@'},{href:'https://wa.me/6282276310317',l:'WA'}].map(s=>(
              <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">{s.l}</a>
            ))}
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-ring"/>
          <div className="avatar-wrap">
            {/* Ganti /photo.jpg dengan foto asli kamu */}
            <img src="/photo.jpg" alt="Handika Pratama" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
            <div className="avatar-ph" style={{display:'none'}}>HP</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT SECTION ── */
function AboutSection() {
  useReveal();
  return (
    <section id="about">
      <div className="sec-head wrap">
        <span className="sec-bg-title">ABOUT ME</span>
        <h2>About Me</h2>
      </div>
      <div className="about-inner">
        <div className="about-photo reveal">
          <div className="photo-accent-bg"/>
          <div className="photo-dots">{Array.from({length:25}).map((_,i)=><span key={i}/>)}</div>
          <div className="photo-frame">
            {/* Ganti /photo.jpg dengan foto asli kamu */}
            <img src="/photo.jpg" alt="Handika Pratama" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
            <div className="photo-ph" style={{display:'none'}}>HP</div>
          </div>
        </div>
        <div className="about-content reveal d2">
          <div className="hero-badge" style={{marginBottom:'1rem'}}><span className="dot"/>Open to Work</div>
          <h2>Hello 👋 i'm <span className="grad">Handika Pratama</span></h2>
          <div className="about-role">Aspiring DevOps & IoT Engineer 🌐 — Institut Teknologi Del</div>
          <p>Passionate technology student focused on <strong>DevOps, Cloud Computing, and IoT systems</strong>. I love automating infrastructure, building CI/CD pipelines, and orchestrating containers with Kubernetes and Docker.</p>
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
              <div><span className="tp">→ </span><span className="tc">cat skills.yaml</span></div>
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

/* ── SKILL CARD ── */
function SkillCard({skill, accent, delay}) {
  const [show, setShow] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),delay);return()=>clearTimeout(t);},[delay]);
  return (
    <div className="skill-item" style={{opacity:show?1:0,transform:show?'translateY(0)':'translateY(18px)',transition:`opacity .35s ease,transform .35s ease`}}>
      <div className="skill-icon-box"><SkillIcon name={skill.n}/></div>
      <div className="skill-name">{skill.n}</div>
      <div className="skill-bar">
        <div className="skill-fill" style={{width:show?`${skill.l}%`:'0%',background:`linear-gradient(90deg,${accent},${accent}88)`,transition:`width .8s ease ${delay+100}ms`}}/>
      </div>
      <div className="skill-pct" style={{color:accent}}>{skill.l}%</div>
    </div>
  );
}

/* ── SKILLS SECTION ── */
function SkillsSection() {
  const cats = Object.keys(SKILL_GROUPS);
  const [active, setActive] = useState(cats[0]);
  const [ver, setVer] = useState(0);
  const go = cat => { setActive(cat); setVer(v=>v+1); };
  const accent = TAB_COLOR[active];
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">TECH STACK</span><h2>Skills & Technologies</h2></div>
        <div className="skills-tabs">
          {cats.map(c=>(
            <button key={c} className={`tab-btn${active===c?' active':''}`} onClick={()=>go(c)}
              style={active===c?{background:`${TAB_COLOR[c]}18`,borderColor:TAB_COLOR[c],color:TAB_COLOR[c]}:{}}>
              <span>{TAB_ICON[c]}</span>{c}
            </button>
          ))}
        </div>
        <div className="skills-sublabel">{active} — {SKILL_GROUPS[active].length} technologies</div>
        <div key={`${active}-${ver}`} className="skills-grid">
          {SKILL_GROUPS[active].map((s,i)=><SkillCard key={`${active}-${s.n}`} skill={s} accent={accent} delay={i*55}/>)}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS SECTION ── */
function ProjectsSection() {
  useReveal();
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">PORTFOLIO</span><h2>Projects I've Built 🗂️</h2></div>
        <p style={{textAlign:'center',color:'var(--text2)',fontSize:'.88rem',marginBottom:'2.5rem'}}>Projects created while learning DevOps and IoT engineering.</p>
        <div className="projects-grid">
          {PROJECTS.map((p,i)=>(
            <div key={p.num} className={`card proj-card reveal d${(i%4)+1}`}>
              <div className="proj-img">
                <img src={p.img} alt={p.title} onError={e=>{e.target.style.display='none';}}/>
                <div className="proj-img-ph">
                  <svg viewBox="0 0 80 60" width="80" height="60"><path d="M10 50 L10 10 L70 10 L70 50z" fill="none" stroke="rgba(124,109,250,0.2)" strokeWidth="2"/><circle cx="25" cy="25" r="8" fill="rgba(124,109,250,0.1)"/><path d="M10 40 L28 24 L45 38 L58 28 L70 40" fill="none" stroke="rgba(124,109,250,0.25)" strokeWidth="2"/></svg>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-num">{p.num}</div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-tags">{p.tags.map((t,j)=><span key={t} className={`tag ${p.cls[j]||'tag-blue'}`}>{t}</span>)}</div>
                <div className="proj-links">
                  <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{padding:'8px 16px',fontSize:'.78rem'}}>⌘ GitHub</a>
                  <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{padding:'8px 16px',fontSize:'.78rem'}}>↗ Preview</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EXPERIENCE SECTION ── */
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

/* ── EDUCATION SECTION ── */
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

/* ── CERTIFICATES SECTION ── */
function CertificatesSection() {
  useReveal();
  return (
    <section id="certificates">
      <div className="wrap">
        <div className="sec-head"><span className="sec-bg-title">CERTIFICATES</span><h2>Certificates 🎓</h2></div>
        <p className="certs-intro">Certificates earned through university, workshops, and self-paced learning in DevOps, Cloud, and IoT.</p>
        <div className="certs-grid">
          {CERTS.map((c,i)=>(
            <div key={c.title} className={`card cert-card reveal d${(i%4)+1}`}>
              <div className="cert-img">
                <img src={c.img} alt={c.title} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                <div className="cert-img-ph" style={{display:'none'}}>{c.em}</div>
              </div>
              <div className="cert-body">
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-date">📅 {c.date}</div>
                <div className="cert-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="certs-hint">
          <p>💡 Tambahkan foto sertifikat asli di folder <code>public/certs/</code> dengan nama: <code>kubernetes.jpg</code>, <code>cloud.jpg</code>, <code>linux.jpg</code>, <code>iot.jpg</code>, <code>cybersec.jpg</code>, <code>devops.jpg</code></p>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT SECTION ── */
function ContactSection() {
  useReveal();
  const [form, setForm] = useState({name:'',email:'',msg:''});
  const [sent, setSent] = useState(false);
  const go = e => {
    e.preventDefault();
    window.open(`mailto:handikanainggolan24@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.msg+'\n\nFrom: '+form.name+'\nEmail: '+form.email)}`);
    setSent(true); setTimeout(()=>setSent(false),4000);
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
            {sent && <div style={{background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:10,padding:'10px 14px',marginBottom:'1rem',color:'var(--green)',fontFamily:'JetBrains Mono,monospace',fontSize:'.78rem'}}>✓ Opening email client...</div>}
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
  const [show, setShow] = useState(false);
  useEffect(()=>{const h=()=>setShow(window.scrollY>300);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  return <button className={`btt${show?' show':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>;
}

/* ── APP ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme]   = useState('dark');
  const [loaded, setLoaded] = useState(false);
  const active = useActiveSection();

  // Apply theme to body
  useEffect(()=>{ document.body.className = theme; },[theme]);

  // Loader timer
  useEffect(()=>{ const t=setTimeout(()=>setLoaded(true),2200); return()=>clearTimeout(t); },[]);

  const toggleTheme = () => setTheme(t=>t==='dark'?'light':'dark');

  return (
    <>
      <Loader done={loaded}/>
      <div style={{opacity:loaded?1:0,transition:'opacity .5s ease .1s'}}>
        <div className="grid-bg"/>
        <Particles/>
        <Navbar active={active} theme={theme} toggleTheme={toggleTheme}/>
        <main>
          <HeroSection/>
          <AboutSection/>
          <SkillsSection/>
          <ProjectsSection/>
          <ExperienceSection/>
          <EducationSection/>
          <CertificatesSection/>
          <ContactSection/>
        </main>
        <Footer/>
        <BackToTop/>
      </div>
    </>
  );
}
