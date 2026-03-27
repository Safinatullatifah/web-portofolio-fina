import React, { useState, useEffect } from 'react';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- DATA EXPERIENCE ---
  const experiences = [
    {
      id: 1,
      role: "Junior UI/UX Designer",
      company: "PT Encrypt Digital Solution",
      date: "Jan 2026 - Saat ini",
      desc: "Merancang antarmuka yang intuitif dan berpusat pada pengguna (user-centered) untuk produk digital guna meningkatkan pengalaman pengguna secara keseluruhan."
    },
    {
      id: 2,
      role: "Front Crew (Kasir & Barista)",
      company: "Suweger! Indonesia",
      date: "Apr 2025 - Saat ini",
      desc: "Bertanggung jawab dalam pelayanan pelanggan, meracik minuman sebagai barista, serta menangani transaksi kasir."
    },
    {
      id: 3,
      role: "Staf KOMINFO",
      company: "BEM FT UNESA",
      date: "Mar 2025 - Jan 2026",
      desc: "Mengelola arus komunikasi, informasi, dan kebutuhan desain grafis di lingkungan Badan Eksekutif Mahasiswa Fakultas Teknik."
    },
    {
      id: 4,
      role: "Kasir",
      company: "KPRI Setia Karya Sekaran",
      date: "Jun 2023 - Apr 2025",
      desc: "Bertanggung jawab atas transaksi keuangan dan memastikan keakuratan data penjualan harian."
    }
  ];

  // --- DATA SKILLS (DIPERBARUI LEBIH LENGKAP) ---
  const techSkills = [
    "HTML/CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", 
    "Flutter", "Dart", "Java", "C++", "Python", "Go", "PHP", 
    "VB.NET", "MySQL", "Data Structures"
  ];
  const designSkills = [
    "UI/UX Design", "Figma", "Canva", "Adobe Photoshop", "CorelDRAW", 
    "Wireframing", "Prototyping", "Typography", "Graphic Design", "Layouting"
  ];

  // --- DATA PORTFOLIO PROGRAMMING ---
  const codeProjects = [
    {
      id: 1,
      title: "Vizada",
      desc: "Website platform untuk bisnis percetakan dengan antarmuka yang modern dan responsif.",
      tech: ["Next.js", "Prisma", "Tailwind"],
      image: "/vizada.png" 
    },
    {
      id: 2,
      title: "My-Telemedicine",
      desc: "Aplikasi web layanan kesehatan jarak jauh (telemedicine) yang modern dan intuitif.",
      tech: ["Next.js", "React", "Web App"],
      image: "/telemedicine.png" 
    },
    {
      id: 3,
      title: "MoCinema",
      desc: "Sistem informasi manajemen bioskop berbasis desktop menggunakan antarmuka NetBeans.",
      tech: ["Java", "MySQL"],
      image: "/mocinema.png" 
    },
    {
      id: 4,
      title: "Sistem Pendaftaran",
      desc: "Aplikasi desktop multi-form dengan fungsionalitas CRUD untuk pendataan registrasi sekolah.",
      tech: ["VB.NET", "MySQL"],
      image: "/sipenmin.png" 
    },
    {
      id: 5,
      title: "TASCA Mobile",
      desc: "Aplikasi mobile cross-platform dengan antarmuka dinamis yang dibangun menggunakan Flutter.",
      tech: ["Flutter", "Dart", "Mobile App"],
      image: "/tasca.png" 
    }
  ];

  // --- DATA DESAIN ---
  const designProjects = [
    {
      id: 1,
      title: "Twibbon",
      category: "Twibbon & Media Sosial",
      cover: "/twibbon.png", 
      images: ["/twibbon-1.png"], 
    },
    {
      id: 2,
      title: "Pamflet",
      category: "Pamflet & Poster",
      cover: "/pamflet.png", 
      images: ["/pamflet-1.png", "/pamflet-2.jpg", "/pamflet-3.jpg"],
    },
    {
      id: 3,
      title: "Ucapan Hari Raya (IG Story)",
      category: "Cerita Instagram",
      cover: "/sg.png", 
      images: [
        "/sg-1.jpg", "/sg-2.jpg", "/sg-3.jpg", "/sg-4.jpg",
        "/sg-5.jpg", "/sg-6.jpg", "/sg-7.jpg", "/sg-8.jpg", "/sg-9.jpg"
      ],
    },
    {
      id: 4,
      title: "Eksplorasi Tipografi",
      category: "Tipografi",
      cover: "/typography.png", 
      images: ["/typo-1.png", "/typo-2.png", "/typo-3.png"],
    },
    {
      id: 5,
      title: "Desain UI/UX",
      category: "Desain Antarmuka",
      cover: "/uiux.png", 
      images: [
        "/figma-1.png", "/figma-2.png", "/figma-3.png", 
        "/figma-4.png", "/figma-5.jpeg"
      ],
    },
    {
      id: 6,
      title: "Desain Lainnya",
      category: "Lain-lain",
      cover: "/dll.png", 
      images: ["/dll-1.jpg", "/dll-2.png", "/dll-3.png"],
    }
  ];

  // --- DATA SERTIFIKAT ---
  const certificates = [
    {
      id: 1,
      title: "Pencatatan Ciptaan (HKI) - Nesa Sport",
      issuer: "Direktorat Jenderal Kekayaan Intelektual",
      category: "Kekayaan Intelektual",
      icon: "🏆",
      date: "Nov 2025"
    },
    {
      id: 2,
      title: "Publikasi Jurnal Ilmiah SIPENMIN",
      issuer: "Jurnal Teknologi Pendidikan dan Pembelajaran (JTPP)",
      category: "Publikasi Ilmiah",
      icon: "📝",
      date: "Des 2025"
    },
    {
      id: 3,
      title: "Kerja Praktik UI/UX Designer",
      issuer: "PT Encrypt Digital Solution",
      category: "Pengalaman Profesional",
      icon: "💼",
      date: "Feb 2026"
    }
  ];

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-delay {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-delay {
          animation: float-delay 5s ease-in-out infinite 1s;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans selection:bg-blue-200 dark:selection:bg-blue-800 scroll-smooth transition-colors duration-500">
        
        {/* 1. NAVIGASI */}
        <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Fina<span className="text-blue-600 dark:text-blue-400">.</span>
            </h1>
            <div className="hidden md:flex gap-8 font-semibold text-slate-600 dark:text-slate-300 text-sm tracking-wide">
              <a href="#profil" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profil</a>
              <a href="#pengalaman" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pengalaman</a>
              <a href="#keahlian" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Keahlian</a>
              <a href="#portofolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Portofolio</a>
              <a href="#sertifikat" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Penghargaan</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Ganti Tema"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              
              <a href="#kontak" className="hidden sm:inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors">
                Kontak
              </a>
            </div>
          </div>
        </nav>

        {/* 2. BAGIAN PROFIL */}
        <section id="profil" className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold rounded-full text-xs tracking-widest uppercase shadow-sm">
              S1 Pendidikan Teknologi Informasi
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white tracking-tight">
              Safinatul <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
                Latifah
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
              UI/UX Designer & Penggiat Teknologi. Memadukan estetika desain visual dengan logika pemrograman untuk menciptakan produk digital yang fungsional.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://www.linkedin.com/in/safinatul-latifah-180415265" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#004182] transition-colors shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Safinatullatifah" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mt-10 lg:mt-0 animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img src="/profilku.png" alt="Foto Fina" className="relative w-full h-full object-cover rounded-full border-8 border-white dark:border-slate-800 shadow-2xl z-10 bg-slate-200 dark:bg-slate-700 transition-colors duration-500"/>
              
              <div className="absolute -bottom-6 -left-8 md:-left-12 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 animate-float-delay transition-colors duration-500">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Peran Saat Ini</p>
                <p className="font-bold text-sm md:text-base text-slate-900 dark:text-white">UI/UX Designer</p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs mt-0.5">PT Encrypt Digital Solution</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BAGIAN PENGALAMAN */}
        <section id="pengalaman" className="bg-white dark:bg-slate-800/40 py-24 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Pengalaman</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Jejak perjalanan profesional dan organisasi.</p>
            </div>
            
            <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1.5 border-4 border-white dark:border-slate-800 group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:-translate-y-1 transition-all duration-300 group-hover:shadow-md">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">{exp.date}</span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">{exp.company}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. BAGIAN KEAHLIAN & ALAT */}
        <section id="keahlian" className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Keahlian Teknologi & Desain</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Alat dan teknologi yang biasa aku gunakan untuk merancang antarmuka dan membangun sistem yang fungsional.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                  <span className="text-3xl animate-bounce">💻</span> Pemrograman
                </h4>
                <div className="flex flex-wrap gap-3">
                  {techSkills.map((skill) => (
                    <span key={skill} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-sm border border-slate-200 dark:border-slate-600 shadow-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                  <span className="text-3xl animate-pulse">🎨</span> Desain & Peralatan
                </h4>
                <div className="flex flex-wrap gap-3">
                  {designSkills.map((skill) => (
                    <span key={skill} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-sm border border-slate-200 dark:border-slate-600 shadow-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BAGIAN PORTOFOLIO */}
        <section id="portofolio" className="bg-white dark:bg-slate-800/40 py-24 transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-6">
            
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Proyek Pemrograman</h3>
                <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {codeProjects.map((item) => (
                  <div key={item.id} className="bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden relative border-b border-slate-100 dark:border-slate-700">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm flex-grow leading-relaxed">{item.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tech.map((tech) => (
                          <span key={tech} className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wide">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GALERI DESAIN */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Galeri Desain</h3>
                <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designProjects.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => openGallery(item)}
                    className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                  >
                    <div className="w-full h-56 bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                      <img 
                        src={item.cover} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                         <span className="text-white opacity-0 group-hover:opacity-100 font-bold tracking-wide transition-opacity duration-300 flex items-center gap-2">
                           Lihat {item.images.length} Gambar
                         </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 tracking-wider uppercase">{item.category}</span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. BAGIAN PENGHARGAAN */}
        <section id="sertifikat" className="bg-slate-50 dark:bg-slate-900 py-24 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Penghargaan & Sertifikasi</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Pencapaian dan dedikasi terbaik selama menempuh pendidikan.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                  <div className="text-4xl bg-blue-50 dark:bg-slate-700/50 p-3 rounded-xl">
                    {cert.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">{cert.category}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-1 leading-snug">{cert.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">{cert.issuer}</p>
                    <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wide">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FOOTER (DIROMBAK TOTAL MENJADI LEBIH PROFESIONAL) */}
        <footer id="kontak" className="bg-slate-900 dark:bg-black py-20 border-t border-slate-800 transition-colors duration-500 text-slate-300">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Sisi Kiri: Teks & Tombol */}
              <div className="text-left">
                <h2 className="text-4xl font-extrabold text-white mb-4">Mari Berkolaborasi!</h2>
                <p className="text-slate-400 mb-8 max-w-md leading-relaxed text-lg">
                  Punya ide proyek, tawaran pekerjaan, atau sekadar ingin berdiskusi soal UI/UX dan pemrograman? Jangan ragu untuk menyapa.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a 
                    href="mailto:finalatifah4@gmail.com" 
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Kirim Pesan via Email
                  </a>
                  {/* Teks Email langsung agar mudah di-copy pengunjung */}
                  <span className="text-sm font-medium bg-slate-800/80 border border-slate-700 px-5 py-3.5 rounded-full select-all w-full sm:w-auto text-center">
                    finalatifah4@gmail.com
                  </span>
                </div>
              </div>

              {/* Sisi Kanan: Sosial Media & Links */}
              <div className="md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-8 md:pt-0 md:pl-12 flex flex-col md:items-end justify-center">
                <h3 className="text-xl font-bold text-white mb-6">Temukan Aku di:</h3>
                <div className="flex gap-4 mb-10 justify-start md:justify-end">
                  <a href="https://www.linkedin.com/in/safinatul-latifah-180415265" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors shadow-lg hover:-translate-y-1">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://github.com/Safinatullatifah" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-600 flex items-center justify-center transition-colors shadow-lg hover:-translate-y-1">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-800 mt-16 pt-8 text-center sm:flex sm:justify-between sm:text-left text-slate-500 text-sm font-medium">
              <p>© 2026 Safinatul Latifah. Seluruh Hak Cipta Dilindungi.</p>
              
            </div>
          </div>
        </footer>

      </div>

      {/* 8. POP-UP MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
            <div className="text-white">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              <p className="text-slate-400 text-sm">{currentImageIndex + 1} / {selectedProject.images.length}</p>
            </div>
            <button 
              onClick={closeGallery}
              className="text-white hover:text-red-500 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors font-bold text-xl"
            >
              ✕
            </button>
          </div>

          <div className="relative w-full max-w-5xl px-4 flex items-center justify-center h-[80vh]">
            {selectedProject.images.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 bg-black/50 hover:bg-blue-600 text-white p-4 rounded-full transition-colors text-2xl font-bold z-50 hover:scale-110 active:scale-90"
              >
                ❮
              </button>
            )}

            <img 
              src={selectedProject.images[currentImageIndex]} 
              alt={`Galeri ${currentImageIndex}`}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            />

            {selectedProject.images.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 bg-black/50 hover:bg-blue-600 text-white p-4 rounded-full transition-colors text-2xl font-bold z-50 hover:scale-110 active:scale-90"
              >
                ❯
              </button>
            )}
          </div>
        </div>
      )}

    </>
  );
}

export default App;