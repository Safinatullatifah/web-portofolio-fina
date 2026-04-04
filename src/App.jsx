import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [theme, setTheme] = useState('summer');

  // --- STATE MOBILE MENU ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- STATE CUSTOM CURSOR ---
  const cursorRef = useRef(null); 
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // --- STATE GAME VISUAL ---
  const [sparkles, setSparkles] = useState([]); 
  const [gameItems, setGameItems] = useState([]); 

  // --- AUDIO CONTEXT UNTUK NADA PIANO/MUSIC BOX ---
  const audioCtxRef = useRef(null);
  const [noteIndex, setNoteIndex] = useState(0);

  // Frekuensi nada lagu "Twinkle Twinkle Little Star"
  const melody = [
    261.63, // C4 (Do)
    261.63, // C4 (Do)
    392.00, // G4 (Sol)
    392.00, // G4 (Sol)
    440.00, // A4 (La)
    440.00, // A4 (La)
    392.00, // G4 (Sol)
    349.23, // F4 (Fa)
    349.23, // F4 (Fa)
    329.63, // E4 (Mi)
    329.63, // E4 (Mi)
    293.66, // D4 (Re)
    293.66, // D4 (Re)
    261.63  // C4 (Do)
  ];

  // Fungsi untuk memainkan nada
  const playNote = (frequency) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'triangle'; 
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05); 
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5); 

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5); 
  };

  // Konfigurasi dinamis untuk 5 Tema 
  const themeConfig = {
    summer: {
      bg: "bg-[#FFF6EC]", text: "text-slate-800", nav: "bg-white/90 border-rose-100", accent: "text-[#FF85A1]",
      cardBg: "bg-[#FAF5F0] border-rose-100 shadow-sm", gradText: "from-[#FF85A1] to-orange-400 drop-shadow-[0_4px_15px_rgba(255,150,150,0.3)]",
      badge: "bg-rose-100 text-[#FF85A1]", btn: "bg-[#FF85A1] hover:bg-[#FFB5C5] text-white", blob1: "bg-pink-300/30", blob2: "bg-orange-300/30",
      gameImage: "/bunga.png", 
      cursorImage: "/cbunga.png", 
      sparkleColors: ['#FBBF24', '#FFF', '#FF85A1']
    },
    ghibli: {
      bg: "bg-[#F4F9F4]", text: "text-[#2C3E2D]", nav: "bg-[#E9F2E9]/90 border-[#A3C4A3]", accent: "text-[#5B8A5B]",
      cardBg: "bg-[#FFFFFF] border-[#D1E2D1] shadow-sm", gradText: "from-[#4E7A4E] to-[#80A880] drop-shadow-[0_4px_10px_rgba(91,138,91,0.3)]",
      badge: "bg-[#D1E2D1] text-[#4E7A4E]", btn: "bg-[#5B8A5B] hover:bg-[#4E7A4E] text-white", blob1: "bg-green-300/30", blob2: "bg-emerald-200/30",
      gameImage: "/ghibli.png",
      cursorImage: "/cghibli.png",
      sparkleColors: ['#A3C4A3', '#FFF', '#FBBF24']
    },
    cinnamoroll: {
      bg: "bg-[#F0F8FF]", text: "text-[#4A6984]", nav: "bg-white/90 border-[#B9D8F2]", accent: "text-[#8CB8E6]",
      cardBg: "bg-white border-[#D6EAF8] shadow-sm", gradText: "from-[#8CB8E6] to-[#FFB6C1] drop-shadow-[0_4px_12px_rgba(140,184,230,0.3)]",
      badge: "bg-[#E6F2FF] text-[#8CB8E6]", btn: "bg-[#8CB8E6] hover:bg-[#72A6D9] text-white", blob1: "bg-blue-300/30", blob2: "bg-pink-200/30",
      gameImage: "/morol.png",
      cursorImage: "/cmorol.png",
      sparkleColors: ['#8CB8E6', '#FFF', '#FFB6C1']
    },
    dark: {
      bg: "bg-slate-900", text: "text-slate-200", nav: "bg-slate-950/90 border-slate-800", accent: "text-rose-400",
      cardBg: "bg-slate-800 border-slate-700 shadow-black shadow-sm", gradText: "from-rose-400 to-orange-300 drop-shadow-[0_4px_15px_rgba(251,113,133,0.2)]",
      badge: "bg-slate-900 text-rose-400 border border-rose-900", btn: "bg-rose-400 hover:bg-rose-500 text-slate-900", blob1: "bg-rose-900/20", blob2: "bg-slate-800/50",
      gameImage: "/bintang.png",
      cursorImage: "/cdark.png",
      sparkleColors: ['#FB7185', '#FDBA74', '#FFF']
    },
    neon: {
      bg: "bg-black", text: "text-cyan-100", nav: "bg-black/90 border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.2)]", accent: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      cardBg: "bg-gray-900 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]", gradText: "from-cyan-400 via-fuchsia-500 to-lime-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",
      badge: "bg-gray-800 text-lime-400 border border-lime-400/50", btn: "bg-transparent border border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)] hover:bg-cyan-400 hover:text-black", blob1: "bg-fuchsia-600/20", blob2: "bg-cyan-600/20",
      gameImage: "/neon.png",
      cursorImage: "/cneon.png",
      sparkleColors: ['#22D3EE', '#D946EF', '#A3E635']
    }
  };

  const t = themeConfig[theme];
  const navLinks = ['Profil', 'Tentang', 'Pengalaman', 'Pendidikan', 'Keahlian', 'Portofolio'];

  // --- EFFECT: CUSTOM CURSOR TRACKING ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- EFFECT: INTERACTIVE HOVER TRACKING ---
  useEffect(() => {
    const interactiveElements = document.querySelectorAll('button, a, select, input, .cursor-hover-effect, svg');
    
    const handleMouseEnter = () => setIsHoveringInteractive(true);
    const handleMouseLeave = () => setIsHoveringInteractive(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [theme, isMobileMenuOpen]); 

  // --- GAME VISUAL 1: Global Click & Catch ---
  const handleGlobalClick = (e) => {
    if (e.target.closest('button, a, select, input, svg')) return;

    const newItem = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setGameItems((prev) => [...prev, newItem]);

    playNote(melody[noteIndex]);
    setNoteIndex((prev) => (prev + 1) % melody.length);

    setTimeout(() => {
      setGameItems((prev) => prev.filter(item => item.id !== newItem.id));
    }, 2500);
  };

  const catchItem = (e, id) => {
    e.stopPropagation();
    setGameItems(prev => prev.filter(item => item.id !== id));
  };

  // --- GAME VISUAL 2: Sparkle Hover ---
  const handlePortoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.random() < 0.2) {
      const newSparkle = {
        id: Date.now(),
        x: x,
        y: y,
        color: t.sparkleColors[Math.floor(Math.random() * 3)],
        size: Math.random() * 6 + 4
      };
      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter(s => s.id !== newSparkle.id));
      }, 1500);
    }
  };

  // --- DATA EXPERIENCE, SKILLS, PORTOFOLIO, SERTIFIKAT ---
  const experiences = [
    { id: 1, role: "Junior UI/UX Designer", company: "PT Encrypt Digital Solution", date: "Jan 2026 - Saat ini", desc: "Merancang antarmuka yang intuitif dan berpusat pada pengguna (user-centered) untuk produk digital guna meningkatkan pengalaman pengguna secara keseluruhan." },
    { id: 2, role: "Front Crew (Kasir & Barista)", company: "Suweger! Indonesia", date: "Apr 2025 - Saat ini", desc: "Bertanggung jawab dalam pelayanan pelanggan, meracik minuman sebagai barista, serta menangani transaksi kasir." },
    { id: 3, role: "Staf KOMINFO (Demisioner)", company: "BEM FT UNESA", date: "Mar 2025 - Jan 2026", desc: "Mengelola arus komunikasi, informasi, dan kebutuhan desain grafis di lingkungan Badan Eksekutif Mahasiswa Fakultas Teknik." },
    { id: 4, role: "Kasir", company: "KPRI Setia Karya Sekaran", date: "Jun 2023 - Apr 2025", desc: "Bertanggung jawab atas transaksi keuangan dan memastikan keakuratan data penjualan harian." }
  ];
  const education = [
    { id: 1, level: "Sekolah Dasar", school: "SD Negeri Datinawong", date: "2011 - 2017" },
    { id: 2, level: "Sekolah Menengah Pertama", school: "MTs Negeri 1 Lamongan", date: "2017 - 2020" },
    { id: 3, level: "Sekolah Menengah Atas", school: "MA Negeri 2 Lamongan", date: "2020 - 2023" },
    { id: 4, level: "S1 Pendidikan Teknologi Informasi", school: "Universitas Negeri Surabaya (UNESA)", date: "2024 - Sekarang" }
  ];
  const techSkills = ["HTML/CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Flutter", "Dart", "Java", "C++", "Python", "Go", "PHP", "VB.NET", "MySQL", "Data Structures"];
  const designSkills = ["UI/UX Design", "Figma", "Canva", "Adobe Photoshop", "CorelDRAW", "Wireframing", "Prototyping", "Typography", "Graphic Design", "Layouting"];
  const codeProjects = [
    { id: 1, title: "Vizada", desc: "Website platform untuk bisnis percetakan dengan antarmuka yang modern dan responsif.", tech: ["Next.js", "Prisma", "Tailwind"], image: "/vizada.png" },
    { id: 2, title: "My-Telemedicine", desc: "Aplikasi web layanan kesehatan jarak jauh (telemedicine) yang modern dan intuitif.", tech: ["Next.js", "React", "Web App"], image: "/telemedicine.png" },
    { id: 3, title: "MoCinema", desc: "Sistem informasi manajemen bioskop berbasis desktop menggunakan antarmuka NetBeans.", tech: ["Java", "MySQL"], image: "/mocinema.png" },
    { id: 4, title: "Sistem Pendaftaran", desc: "Aplikasi desktop multi-form dengan fungsionalitas CRUD untuk pendataan registrasi sekolah.", tech: ["VB.NET", "MySQL"], image: "/sipenmin.png" },
    { id: 5, title: "TASCA Mobile", desc: "Aplikasi mobile cross-platform dengan antarmuka dinamis yang dibangun menggunakan Flutter.", tech: ["Flutter", "Dart", "Mobile App"], image: "/tasca.png" }
  ];
  const designProjects = [
    { id: 1, title: "Twibbon", category: "Twibbon & Media Sosial", cover: "/twibbon.png", images: ["/twibbon-1.png"] },
    { id: 2, title: "Pamflet", category: "Pamflet & Poster", cover: "/pamflet.png", images: ["/pamflet-1.png", "/pamflet-2.jpg", "/pamflet-3.jpg"] },
    { id: 3, title: "Ucapan Hari Raya (IG Story)", category: "Cerita Instagram", cover: "/sg.png", images: ["/sg-1.jpg", "/sg-2.jpg", "/sg-3.jpg", "/sg-4.jpg", "/sg-5.jpg", "/sg-6.jpg", "/sg-7.jpg", "/sg-8.jpg", "/sg-9.jpg"] },
    { id: 4, title: "Eksplorasi Tipografi", category: "Tipografi", cover: "/typography.png", images: ["/typo-1.png", "/typo-2.png", "/typo-3.png"] },
    { id: 5, title: "Desain UI/UX", category: "Desain Antarmuka", cover: "/uiux.png", images: ["/figma-1.png", "/figma-2.png", "/figma-3.png", "/figma-4.png", "/figma-5.jpeg"] },
    { id: 6, title: "Desain Lainnya", category: "Lain-lain", cover: "/dll.png", images: ["/dll-1.jpg", "/dll-2.png", "/dll-3.png"] }
  ];
  const certificates = [
    { id: 1, title: "Pencatatan Ciptaan (HKI) - Nesa Sport", issuer: "Direktorat Jenderal Kekayaan Intelektual", category: "Kekayaan Intelektual", icon: "🏆", date: "Nov 2025" },
    { id: 2, title: "Publikasi Jurnal Ilmiah SIPENMIN", issuer: "Jurnal Teknologi Pendidikan dan Pembelajaran (JTPP)", category: "Publikasi Ilmiah", icon: "📝", date: "Des 2025" },
    { id: 3, title: "Kerja Praktik UI/UX Designer", issuer: "PT Encrypt Digital Solution", category: "Pengalaman Profesional", icon: "💼", date: "Feb 2026" }
  ];

  const openGallery = (project) => { setSelectedProject(project); setCurrentImageIndex(0); };
  const closeGallery = () => { setSelectedProject(null); };
  const nextImage = () => { if (selectedProject) setCurrentImageIndex((prev) => prev === selectedProject.images.length - 1 ? 0 : prev + 1); };
  const prevImage = () => { if (selectedProject) setCurrentImageIndex((prev) => prev === 0 ? selectedProject.images.length - 1 : prev - 1); };

  return (
    <>
      <style>{`
        body { cursor: none !important; }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes float-slow { 0% { transform: translateY(0px) translateX(0px); opacity: 0.6; } 50% { transform: translateY(-20px) translateX(10px); opacity: 1; } 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; } }
        @keyframes floatFlower { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-40px) translateX(20px); } }
        @keyframes float-up { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-120px) scale(0.5); opacity: 0; } }
        @keyframes sparkle-flicker { 0%, 100% { transform: scale(0); opacity: 0; } 50% { transform: scale(1); opacity: 1; } }
        @keyframes subtle-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        @keyframes click-pop { 0% { transform: scale(1); } 50% { transform: scale(0.97); } 100% { transform: scale(1); } }
        @keyframes slide-down { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle-flicker 1.5s forwards ease-in-out; pointer-events: none; position: absolute; z-index: 50; }
        .floating { position: absolute; border-radius: 50%; filter: blur(40px); animation: float-slow 8s ease-in-out infinite; }
        .animate-float-up { animation: float-up 2.5s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
        
        .flower { position: absolute; z-index: 1; width: 120px; height: 120px; background: radial-gradient(circle, rgba(255,133,161,0.4) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); opacity: 0.5; animation: floatFlower 12s ease-in-out infinite; }
        .flower.small { width: 80px; height: 80px; opacity: 0.3; }
        .flower.delay { animation-delay: 4s; }
        .flower.delay2 { animation-delay: 7s; }

        .cursor-hover-effect { transition: transform 0.2s ease, filter 0.2s ease; }
        button:active, a:active { animation: click-pop 0.2s ease forwards; }
        
        * { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }

        /* Khusus HP: Tampilkan kursor bawaan karena HP pakai sentuhan (touch), bukan mouse */
        @media (max-width: 768px) {
            body { cursor: auto !important; }
            .custom-cursor-container { display: none !important; }
        }
      `}</style>
      
      {/* WRAPPER UTAMA */}
      <div onClick={handleGlobalClick} className={`min-h-screen font-sans selection:bg-rose-200 scroll-smooth transition-colors duration-500 relative overflow-hidden ${t.bg} ${t.text}`}>
        
        {/* CUSTOM CURSOR CONTAINER */}
        <div 
          ref={cursorRef} 
          className="custom-cursor-container fixed pointer-events-none z-[100] drop-shadow-md"
          style={{ 
            transform: `translate(-50%, -50%) scale(${isHoveringInteractive ? 1.5 : 1})`,
            transition: 'transform 0.15s ease-out' 
          }}
        >
          <img 
            src={t.cursorImage} 
            alt="Custom Cursor" 
            className="w-8 h-8 object-contain" 
          />
        </div>

        {/* RENDER ITEM GAME (Tangkap Ikon) */}
        {gameItems.map(item => (
            <div 
              key={item.id} 
              className="fixed animate-float-up z-[60] cursor-pointer cursor-hover-effect drop-shadow-lg"
              style={{ left: item.x - 24, top: item.y - 24 }} 
              onMouseEnter={(e) => catchItem(e, item.id)}
            >
              <img src={t.gameImage} alt="Effect Visual" className="w-12 h-12 object-contain pointer-events-none" />
            </div>
        ))}

        {/* Floating Background Shapes */}
        <div className={`floating w-40 h-40 top-20 left-10 ${t.blob1} transition-colors duration-500`}></div>
        <div className={`floating w-52 h-52 bottom-20 right-10 ${t.blob2} transition-colors duration-500`}></div>
        <div className={`floating w-32 h-32 top-1/2 left-1/3 ${t.blob1} transition-colors duration-500`}></div>
        
        {/* NAVBAR SUPER RESPONSIVE */}
        <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b shadow-sm transition-colors duration-500 ${t.nav}`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
            <h1 className="text-2xl font-black tracking-tighter cursor-hover-effect hover:scale-105 transition-transform z-20">
              Fina<span className={t.accent}>.</span>
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 font-semibold text-sm tracking-wide opacity-80 z-20">
              {navLinks.map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className={`hover:${t.accent} hover:opacity-100 transition-all cursor-hover-effect`}>{link}</a>
              ))}
            </div>
            
            {/* Tema & Kontak */}
            <div className="flex items-center gap-3 z-20">
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`text-sm font-bold p-2 rounded-xl outline-none cursor-pointer transition-all border shadow-sm cursor-hover-effect ${t.cardBg} ${t.text} hover:shadow-md appearance-none text-center`}
              >
                <option value="summer">☀️</option>
                <option value="ghibli">🍃</option>
                <option value="cinnamoroll">☁️</option>
                <option value="dark">🌙</option>
                <option value="neon">⚡</option>
              </select>

              <a href="#kontak" className={`hidden sm:inline-block px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-hover-effect ${t.btn}`}>Kontak</a>

              {/* Hamburger Button untuk HP */}
              <button 
                className="md:hidden p-2 ml-2 focus:outline-none cursor-hover-effect transition-transform active:scale-90"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className={`md:hidden absolute top-full left-0 w-full border-b shadow-xl backdrop-blur-xl animate-slide-down ${t.nav}`}>
              <div className="px-6 py-4 flex flex-col gap-4 font-bold text-center">
                {navLinks.map(link => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 hover:${t.accent} transition-colors border-b border-opacity-10 border-current last:border-0`}
                  >
                    {link}
                  </a>
                ))}
                <a 
                  href="#kontak" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mt-2 py-3 rounded-full text-sm font-bold transition-all active:scale-95 ${t.btn}`}
                >
                  Hubungi Fina
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* 1. PROFIL */}
        <section id="profil" className="relative max-w-6xl mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-12 gap-12 items-center z-10 mt-16 md:mt-24">
          {(theme === 'summer' || theme === 'cinnamoroll') && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="flower top-[10%] left-[5%]"></div>
              <div className="flower small bottom-[15%] left-[20%] delay"></div>
              <div className="flower right-[10%] top-[20%] delay2"></div>
              <div className="flower small right-[5%] bottom-[10%]"></div>
            </div>
          )}

          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 relative z-10 text-center lg:text-left">
            <div className={`inline-block px-4 py-1.5 font-bold rounded-full text-xs tracking-widest uppercase shadow-sm ${t.badge}`}>
              S1 Pendidikan Teknologi Informasi
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Safinatul <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-colors duration-500 ${t.gradText}`}>Latifah</span>
            </h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              UI/UX Designer & Penggiat Teknologi. Memadukan estetika desain visual dengan logika pemrograman untuk menciptakan produk digital yang fungsional. 
              <br/><span className="text-sm italic opacity-70 mt-2 block hidden md:block">(Coba klik klik terus di layar buat dengerin lagu!)</span>
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="https://www.linkedin.com/in/safinatul-latifah-180415265" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#004182] transition-colors shadow-md hover:scale-105 active:scale-95 cursor-hover-effect">
                LinkedIn
              </a>
              <a href="https://github.com/Safinatullatifah" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-700 transition-colors shadow-md hover:scale-105 active:scale-95 cursor-hover-effect">
                GitHub
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end z-10">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 animate-float">
              <div className={`absolute inset-0 bg-gradient-to-tr ${t.gradText} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
              <img src="/profilku.jpeg" alt="Foto Fina" className={`relative w-full h-full object-cover rounded-full border-8 shadow-2xl z-10 transition-colors cursor-hover-effect hover:scale-105 ${theme === 'dark' || theme === 'neon' ? 'border-slate-800' : 'border-white'}`}/>
              <div className={`absolute -bottom-6 -left-4 sm:-left-8 md:-left-12 p-3 sm:p-4 rounded-2xl shadow-xl border z-20 transition-all cursor-hover-effect hover:-translate-y-1 ${t.cardBg}`}>
                <p className="text-[8px] sm:text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">Peran Saat Ini</p>
                <p className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">UI/UX Designer</p>
                <p className={`font-semibold text-[10px] sm:text-xs mt-0.5 whitespace-nowrap ${t.accent}`}>PT Encrypt Digital Solution</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TENTANG SAYA (DIPERBARUI) */}
        <section id="tentang" className={`py-24 border-t relative z-10 transition-colors duration-500 ${theme === 'neon' ? 'border-cyan-500/30 bg-black/40' : 'border-rose-100 bg-white/20'}`}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${t.gradText}`}>Tentang Saya</h3>
            </div>
            
            <div className={`p-8 md:p-12 rounded-3xl border shadow-lg transition-all duration-300 hover:shadow-xl ${t.cardBg}`}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4 text-base md:text-lg leading-relaxed opacity-90">
                  <p>
                    Halo! Aku <span className={`font-bold ${t.accent}`}>Fina</span>. Saat ini aku adalah mahasiswi semester 4 di program studi Pendidikan Teknologi Informasi, Universitas Negeri Surabaya.
                  </p>
                  <p>
                    Sebelumnya, aku sempat aktif berkontribusi di BEM FT UNESA pada departemen Kominfo. Kini, setelah menyelesaikan tugasku (demisioner), aku memfokuskan energi dan waktuku untuk memperdalam ilmu kuliah serta mengeksplorasi dunia karir.
                  </p>
                  <p>
                    Sekarang aku aktif menjalani peran ganda yang menantang sekaligus seru: bekerja melayani pelanggan sebagai Front Crew di <span className="font-bold italic">Suweger! Indonesia</span>, dan merintis jalan di industri digital sebagai Junior UI/UX Designer di <span className="font-bold italic">PT Encrypt Digital Solution</span>. Bagiku, memadukan pelayanan yang baik dan menciptakan desain yang <span className="italic">eye-catching</span> sekaligus solutif adalah sebuah seni!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PENGALAMAN */}
        <section id="pengalaman" className={`py-24 border-t transition-colors duration-500 ${theme === 'neon' ? 'border-cyan-500/30' : 'border-rose-100'} ${theme === 'dark' || theme === 'neon' ? 'bg-black/20' : 'bg-white/50'}`}>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${t.gradText}`}>Pengalaman</h3>
              <p className="opacity-70 text-lg">Jejak perjalanan profesional dan organisasi.</p>
            </div>
            <div className={`pl-4 border-l-2 space-y-10 transition-colors ${theme === 'neon' ? 'border-cyan-500/50' : 'border-rose-200'}`}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                  <div className={`absolute w-4 h-4 rounded-full -left-[9px] top-1.5 border-4 group-hover:scale-125 transition-transform duration-300 ${t.btn.split(' ')[0]} ${theme === 'dark' || theme === 'neon' ? 'border-slate-900' : 'border-white'}`}></div>
                  <div className={`p-6 rounded-2xl border cursor-hover-effect transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg ${t.cardBg}`}>
                    <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${t.accent}`}>{exp.date}</span>
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <p className="text-sm font-semibold opacity-60 mb-4">{exp.company}</p>
                    <p className="text-sm leading-relaxed opacity-80">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PENDIDIKAN */}
        <section id="pendidikan" className={`py-24 border-t transition-colors duration-500 ${theme === 'neon' ? 'border-cyan-500/30' : 'border-rose-100'} ${t.bg}`}>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${t.gradText}`}>Pendidikan</h3>
              <p className="opacity-70 text-lg">Perjalanan pendidikan dari awal hingga sekarang</p>
            </div>
            <div className={`relative border-l-2 space-y-12 transition-colors ${theme === 'neon' ? 'border-cyan-500/50' : 'border-rose-200'}`}>
              {education.map((edu) => {
                const isActive = edu.level.includes("S1");
                return (
                  <div key={edu.id} className="relative pl-6 md:pl-10 group">
                    <div className={`absolute -left-[11px] top-2 w-5 h-5 rounded-full border-4 transition-all duration-300 ${isActive ? `scale-125 shadow-lg bg-gradient-to-r ${t.gradText}` : t.btn.split(' ')[0]} ${theme === 'dark' || theme === 'neon' ? 'border-slate-900' : 'border-white'}`}></div>
                    <div className={`p-6 rounded-2xl border cursor-hover-effect transition-all duration-300 ${isActive ? `shadow-xl scale-[1.02] ${t.cardBg} border-l-4` : `${t.cardBg} group-hover:-translate-y-1.5`}`} style={isActive ? {borderColor: t.accent.replace('text-','')} : {}}>
                      <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${t.accent}`}>{edu.date}</span>
                      <h4 className="text-lg md:text-xl font-bold flex flex-wrap items-center gap-2">
                        {edu.level}
                        {isActive && (<span className={`text-[10px] px-2 py-0.5 rounded-full animate-pulse mt-1 md:mt-0 ${t.btn}`}>ON GOING</span>)}
                      </h4>
                      <p className="text-sm font-semibold opacity-60 mt-1">{edu.school}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. KEAHLIAN */}
        <section id="keahlian" className={`py-24 border-y relative z-10 transition-colors duration-500 ${theme === 'neon' ? 'border-cyan-500/30 bg-black/40' : 'border-rose-100 bg-white/20'}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${t.gradText}`}>Keahlian Teknologi & Desain</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className={`p-8 rounded-3xl border hover:-translate-y-1 transition-all ${t.cardBg}`}>
                <h4 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">💻 Pemrograman</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {techSkills.map(skill => <span key={skill} className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-xs md:text-sm border opacity-90 transition-all hover:scale-110 active:scale-95 cursor-hover-effect ${t.badge}`}>{skill}</span>)}
                </div>
              </div>
              <div className={`p-8 rounded-3xl border hover:-translate-y-1 transition-all ${t.cardBg}`}>
                <h4 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">🎨 Desain</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {designSkills.map(skill => <span key={skill} className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-xs md:text-sm border opacity-90 transition-all hover:scale-110 active:scale-95 cursor-hover-effect ${t.badge}`}>{skill}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PORTOFOLIO */}
        <section id="portofolio" className={`py-24 border-b relative z-10 transition-colors duration-500 ${theme === 'neon' ? 'border-cyan-500/30 bg-black' : 'border-rose-100 bg-white/50'}`}>
          <div className="max-w-6xl mx-auto px-6">
            
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-10">
                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r whitespace-nowrap ${t.gradText}`}>Proyek Pemrograman</h3>
                <div className={`h-1 flex-1 rounded-full opacity-20 ${t.btn.split(' ')[0]}`}></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {codeProjects.map(item => (
                  <div key={item.id} className={`rounded-3xl overflow-hidden border transition-all flex flex-col h-full cursor-hover-effect hover:-translate-y-1.5 hover:shadow-lg ${t.cardBg}`}>
                    <div className="w-full h-48 overflow-hidden relative border-b border-opacity-10 border-black">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="opacity-70 mb-6 text-sm flex-grow leading-relaxed">{item.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tech.map(tech => <span key={tech} className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wide transition-all hover:scale-110 ${t.badge}`}>{tech}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-10">
                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r whitespace-nowrap ${t.gradText}`}>Galeri Desain</h3>
                <div className={`h-1 flex-1 rounded-full opacity-20 ${t.btn.split(' ')[0]}`}></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designProjects.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => openGallery(item)} 
                    onMouseMove={handlePortoMouseMove} 
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group flex flex-col h-full hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl ${t.cardBg}`}
                  >
                    {sparkles.map(sparkle => (
                        <div key={sparkle.id} className="animate-sparkle" style={{ left: sparkle.x, top: sparkle.y, color: sparkle.color, width: sparkle.size, height: sparkle.size }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2L14.41,8.41L21,10.82L16.18,15.64L17.59,22.23L12,18.66L6.41,22.23L7.82,15.64L3,10.82L9.59,8.41L12,2M12,15.5L14.2,16.9L13.6,14.3L15.6,12.5L13,12.2L12,9.8L11,12.2L8.4,12.5L10.4,14.3L9.8,16.9L12,15.5Z" />
                            </svg>
                        </div>
                    ))}

                    <div className="w-full h-56 overflow-hidden relative">
                      <img src={item.cover} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center z-10 hover:animate-subtle-pulse">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300">
                          Lihat {item.images.length} Gambar
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow relative z-10">
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${t.accent}`}>{item.category}</span>
                      <h4 className="text-lg font-bold mt-1 mb-2 leading-tight">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. PENGHARGAAN */}
        <section id="sertifikat" className={`py-24 relative z-10 ${t.bg}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${t.gradText}`}>Penghargaan & Sertifikasi</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className={`p-6 rounded-2xl border transition-all flex items-start gap-4 hover:-translate-y-1.5 hover:shadow-lg cursor-hover-effect group ${t.cardBg}`}>
                  <div className="text-4xl p-3 rounded-xl border border-opacity-20 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 transition-transform group-hover:scale-110 group-hover:rotate-3">{cert.icon}</div>
                  <div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${t.accent}`}>{cert.category}</span>
                    <h4 className="text-base font-bold mt-1 mb-1 leading-snug">{cert.title}</h4>
                    <p className="opacity-60 text-xs">{cert.issuer}</p>
                    <span className={`inline-block text-[10px] px-2 py-1 rounded font-bold mt-2 tracking-wide uppercase transition-all hover:scale-105 ${t.badge}`}>{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer id="kontak" className="bg-slate-950 py-16 md:py-20 border-t border-slate-800 text-slate-300 relative z-20 mt-10 md:mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center md:text-left relative">
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tighter animate-subtle-pulse">Mari Berkolaborasi!</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed text-sm md:text-base">Punya ide proyek UI/UX atau tawaran pekerjaan menarik? Jangan ragu untuk menyapa Safinatul.</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                  <a href="mailto:finalatifah4@gmail.com" className={`w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 hover:animate-subtle-pulse active:scale-95 cursor-hover-effect text-center ${t.btn}`}>Kirim Email</a>
                  <span className="bg-slate-800/80 border border-slate-700 px-5 py-3.5 rounded-full text-xs md:text-sm font-medium tracking-wide">finalatifah4@gmail.com</span>
                </div>
              </div>
              <div className="md:text-right">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Social Media:</h3>
                
                <div className="flex gap-4 justify-center md:justify-end">
                  <a href="https://www.linkedin.com/in/safinatul-latifah-180415265" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg hover:-translate-y-1.5 hover:shadow-cyan-500/20 text-white font-bold cursor-hover-effect bg-[#0A66C2] hover:bg-[#004182]">In</a>
                  <a href="https://github.com/Safinatullatifah" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg hover:-translate-y-1.5 hover:shadow-cyan-500/20 text-white font-bold cursor-hover-effect bg-slate-800 hover:bg-slate-700">Git</a>
                </div>

              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-12 md:mt-16 pt-8 text-center text-slate-500 text-xs md:text-sm font-medium relative z-10">
              <p>© 2026 Safinatul Latifah. Crafted with React & ❤️.</p>
            </div>
          </div>
        </footer>

      </div>

      {/* MODAL GALERI */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center text-white">
            <div>
              <h3 className="text-lg md:text-xl font-bold">{selectedProject.title}</h3>
              <p className="text-slate-400 text-xs md:text-sm">{currentImageIndex + 1} / {selectedProject.images.length}</p>
            </div>
            <button onClick={closeGallery} className="bg-white/10 p-2.5 md:p-3 rounded-full hover:bg-red-500 transition-all hover:scale-110 active:scale-95 cursor-hover-effect">✕</button>
          </div>
          <div className="relative w-full max-w-5xl flex items-center justify-center h-[70vh] md:h-[80vh]">
            {selectedProject.images.length > 1 && <button onClick={prevImage} className="absolute left-2 md:left-0 bg-black/50 p-3 md:p-4 rounded-full text-white text-xl md:text-2xl font-bold z-50 transition-all hover:scale-110 active:scale-95 cursor-hover-effect">❮</button>}
            <img src={selectedProject.images[currentImageIndex]} alt="Gallery" className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all px-12 md:px-0" />
            {selectedProject.images.length > 1 && <button onClick={nextImage} className="absolute right-2 md:right-0 bg-black/50 p-3 md:p-4 rounded-full text-white text-xl md:text-2xl font-bold z-50 transition-all hover:scale-110 active:scale-95 cursor-hover-effect">❯</button>}
          </div>
        </div>
      )}
    </>
  );
}

export default App;