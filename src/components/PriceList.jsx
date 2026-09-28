import React, { useState, useMemo } from 'react';
import {
  FileText,
  GraduationCap,
  BookOpen,
  Presentation,
  FileCode,
  FileSpreadsheet,
  Newspaper,
  Briefcase,
  Languages,
  Search,
  CheckCircle2,
  ArrowRight,
  Eye,
  X,
  Clock,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  BadgePercent
} from 'lucide-react';
import { openRotatedWhatsApp } from '../utils/waRotator';
import './PriceList.css';

export default function PriceList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // 17 Layanan Resmi Sesuai Poster Jasa Joki Tugas Indonesia
  const priceItems = [
    {
      id: 1,
      title: 'Laporan PKL SMK',
      category: 'laporan',
      price: 'Rp 4.000',
      unit: 'per lembar',
      icon: FileText,
      desc: 'Penyusunan laporan Praktik Kerja Lapangan tingkat SMK/SMA rapi sesuai format sekolah.'
    },
    {
      id: 2,
      title: 'Laporan PKL Anak Kuliah',
      category: 'laporan',
      price: 'Rp 6.000',
      unit: 'per halaman',
      icon: GraduationCap,
      desc: 'Laporan PKL/Magang mahasiswa terstruktur lengkap dengan bab pembahasan & lampiran.'
    },
    {
      id: 3,
      title: 'Makalah Anak SMA',
      category: 'makalah',
      price: 'Rp 4.000',
      unit: 'per lembar',
      icon: BookOpen,
      desc: 'Penyusunan karya tulis makalah SMA beserta cover, kata pengantar, dan daftar pustaka.'
    },
    {
      id: 4,
      title: 'Makalah Anak Kuliah',
      category: 'makalah',
      price: 'Rp 6.000',
      unit: 'per lembar',
      icon: BookOpen,
      desc: 'Makalah akademik mahasiswa bersumber jurnal ilmiah terakreditasi dan lolos Turnitin.'
    },
    {
      id: 5,
      title: 'Proposal Bab 1 – Bab 3',
      category: 'skripsi',
      price: 'Rp 1.000.000',
      unit: '1 Juta',
      icon: GraduationCap,
      desc: 'Penyusunan proposal skripsi/karya ilmiah (Latar Belakang, Tinjauan Pustaka, Metode Penelitian).'
    },
    {
      id: 6,
      title: 'Proposal Bab 4 – Bab 5',
      category: 'skripsi',
      price: 'Rp 700.000',
      unit: 'Tujuh Ratus Ribu',
      icon: GraduationCap,
      desc: 'Hasil pembahasan, analisis temuan penelitian, kesimpulan, dan saran siap sidang.'
    },
    {
      id: 7,
      title: 'PPT SMK / Anak Kuliah',
      category: 'ppt',
      price: 'Rp 3.500',
      unit: 'per slide',
      icon: Presentation,
      desc: 'Slide presentasi modern, estetik, ringkas, dan visual menarik untuk tugas sekolah & kuliah.'
    },
    {
      id: 8,
      title: 'PPT Sidang Skripsi',
      category: 'ppt',
      price: 'Rp 5.000',
      unit: 'per slide',
      icon: Presentation,
      desc: 'Slide presentasi sidang komprehensif, animasi elegan, dan fokus poin penilaian dosen penguji.'
    },
    {
      id: 9,
      title: 'CV Lamaran Pekerjaan DLL',
      category: 'karir',
      price: 'Rp 15.000',
      unit: 'per berkas',
      icon: Briefcase,
      desc: 'Desain CV ATS-friendly atau kreatif profesional siap apply lowongan BUMN & swasta.'
    },
    {
      id: 10,
      title: 'Surat Lamaran Pekerjaan',
      category: 'karir',
      price: 'Rp 15.000',
      unit: 'per surat',
      icon: Briefcase,
      desc: 'Cover letter tertarget dengan tata bahasa profesional yang memikat HRD.'
    },
    {
      id: 11,
      title: 'Kliping',
      category: 'tugas',
      price: 'Rp 6.000',
      unit: 'per halaman',
      icon: FileText,
      desc: 'Penyusunan kliping artikel/berita tematik lengkap dengan ulasan ringkas.'
    },
    {
      id: 12,
      title: 'Tugas Coding',
      subtitle: '(Web, App, Script, dll)',
      category: 'tugas',
      price: 'Mulai Rp 30.000',
      unit: '',
      icon: FileCode,
      desc: 'Pengerjaan tugas pemrograman HTML, CSS, JS, Python, PHP, C++, database MySQL, dll.'
    },
    {
      id: 13,
      title: 'Tugas Umum Lainnya',
      subtitle: '(Ringkasan, Resume, Review Jurnal, dll)',
      category: 'tugas',
      price: 'Mulai Rp 10.000',
      unit: '',
      icon: FileText,
      desc: 'Rangkuman materi, resume kuliah, review jurnal nasional/internasional, dan kuis tugas.'
    },
    {
      id: 14,
      title: 'Terjemahan',
      subtitle: '(Indonesia - Inggris / Sebaliknya)',
      category: 'tugas',
      price: 'Rp 7.000',
      unit: 'per halaman',
      icon: Languages,
      desc: 'Penerjemahan akurat dengan susunan kalimat natural (bukan Google Translate mentah).'
    },
    {
      id: 15,
      title: 'Analisis Data',
      subtitle: '(SPSS, Excel, dll)',
      category: 'skripsi',
      price: 'Mulai Rp 25.000',
      unit: '',
      icon: FileSpreadsheet,
      desc: 'Olah data statistik valid: Uji Validitas, Reliabilitas, Regresi, Hipotesis, dan interpretasi.'
    },
    {
      id: 16,
      title: 'Artikel',
      subtitle: '(Draft Artikel Ilmiah / Populer)',
      category: 'makalah',
      price: 'Rp 30.000',
      unit: 'per naskah',
      icon: Newspaper,
      desc: 'Penulisan naskah artikel ilmiah, opini publik, atau konten blog akademik berkualitas.'
    },
    {
      id: 17,
      title: 'Artikel Sampai Publish',
      subtitle: '(Terbit di Jurnal / Media)',
      category: 'skripsi',
      price: 'Rp 1.200.000',
      unit: '1,2 Juta',
      icon: Newspaper,
      desc: 'Pendampingan penuh sampai artikel resmi terbit (publish) di jurnal terindeks/media nasional.'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua (17)' },
    { id: 'laporan', label: 'Laporan PKL' },
    { id: 'makalah', label: 'Makalah & Artikel' },
    { id: 'skripsi', label: 'Skripsi & Olah Data' },
    { id: 'ppt', label: 'Slide PPT' },
    { id: 'tugas', label: 'Tugas & Coding' },
    { id: 'karir', label: 'CV & Lamaran' }
  ];

  const filteredItems = useMemo(() => {
    return priceItems.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOrder = (item) => {
    const text = `Halo Admin @jokitugasaja_id, saya ingin order layanan *${item.title}* (${item.price} ${item.unit || ''}). Mohon bantuan estimasi pengerjaan dan infonya ya kak!`;
    openRotatedWhatsApp(text, 'random-no-repeat');
  };

  return (
    <section className="linktree-block">
      <div className="pricelist-header-box">
        <p className="section-label" style={{ margin: 0, textAlign: 'left' }}>
          Pricelist & Katalog Layanan
        </p>
      </div>

      {/* Hero Guarantee & Poster Quick Link Banner (Solid Clean Colors) */}
      <div className="promo-guarantee-banner glass-panel">
        <div className="promo-badge-circle">
          <span className="promo-badge-top">FREE REVISI</span>
          <span className="promo-badge-bold">3X</span>
          <span className="promo-badge-bot">SAMPAI PUAS!</span>
        </div>
        <div className="promo-banner-text">
          <h3 className="promo-title">Garansi Revisi Sampai Kamu Puas!</h3>
          <p className="promo-desc">
            Sistem pembayaran di akhir ketika tugas beres. Privasi aman & pengerjaan cepat.
          </p>
          <button
            type="button"
            className="view-poster-pill"
            onClick={() => setIsPosterModalOpen(true)}
          >
            <Eye size={13} />
            <span>Lihat Poster Brosur Resmi</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="price-search-bar glass-panel">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Cari tugas (cth: PKL, Makalah, SPSS, Coding)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Hapus pencarian"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="pure-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Pricing Cards List (No Pill Badges) */}
      <div className="pricelist-items-container">
        {filteredItems.length === 0 ? (
          <div className="no-result-card glass-panel">
            <p>Tidak ada layanan yang sesuai dengan pencarian "<strong>{searchQuery}</strong>".</p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Tampilkan Semua Layanan
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="price-item-card glass-panel">
                <div className="price-item-top">
                  <div className="price-item-icon-wrap">
                    <IconComponent size={18} />
                  </div>
                  <div className="price-item-info">
                    <div className="price-item-title-row">
                      <h4 className="price-item-name">{item.title}</h4>
                    </div>
                    {item.subtitle && <span className="price-item-sub">{item.subtitle}</span>}
                  </div>
                </div>

                <p className="price-item-desc">{item.desc}</p>

                <div className="price-item-bottom">
                  <div className="price-amount-box">
                    <span className="price-main-val">{item.price}</span>
                    {item.unit && <span className="price-unit-val">/{item.unit}</span>}
                  </div>
                  <button
                    type="button"
                    className="order-btn-mini"
                    onClick={() => handleOrder(item)}
                    aria-label={`Pesan ${item.title}`}
                  >
                    <span>Order WA</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Section: Kenapa Pilih Kami? (6 Keunggulan Resmi) */}
      <div className="why-choose-us-block glass-panel">
        <div className="why-header-row">
          <h4 className="why-title">Kenapa Pilih Kami?</h4>
        </div>
        <div className="why-grid">
          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <Clock size={16} />
            </div>
            <div>
              <strong>Pengerjaan Cepat</strong>
              <span>Tepat waktu & siap kilat</span>
            </div>
          </div>

          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <RefreshCw size={16} />
            </div>
            <div>
              <strong>Revisi Gratis 3x</strong>
              <span>Revisi sampai kamu puas</span>
            </div>
          </div>

          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <strong>Hasil Rapi</strong>
              <span>Berkualitas & berstandar</span>
            </div>
          </div>

          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <MessageCircle size={16} />
            </div>
            <div>
              <strong>Responsif</strong>
              <span>Komunikasi ramah 24 jam</span>
            </div>
          </div>

          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <ShieldCheck size={16} />
            </div>
            <div>
              <strong>Privasi Terjamin</strong>
              <span>100% aman & terlindungi</span>
            </div>
          </div>

          <div className="why-grid-item">
            <div className="why-icon-bubble">
              <BadgePercent size={16} />
            </div>
            <div>
              <strong>Harga Bersahabat</strong>
              <span>Cocok untuk pelajar & mhs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Alur Pemesanan & Catatan Transparan */}
      <div className="order-flow-box glass-panel">
        <h4 className="flow-title">Alur Pemesanan Transparan</h4>
        <div className="flow-steps-list">
          <div className="flow-step-item">
            <span className="step-num">1</span>
            <div className="step-text">
              <strong>Pembayaran Dilakukan di Akhir</strong>
              <p>Anda hanya membayar setelah tugas dinyatakan selesai dikerjakan.</p>
            </div>
          </div>

          <div className="flow-step-item">
            <span className="step-num">2</span>
            <div className="step-text">
              <strong>Kirim Bukti Screenshot</strong>
              <p>Kami akan mengirimkan bukti berupa tangkapan layar pengerjaan tugas Anda.</p>
            </div>
          </div>

          <div className="flow-step-item">
            <span className="step-num">3</span>
            <div className="step-text">
              <strong>Transfer Pembayaran</strong>
              <p>Setelah bukti diterima dan sesuai, silakan melakukan transfer pembayaran.</p>
            </div>
          </div>

          <div className="flow-step-item">
            <span className="step-num">4</span>
            <div className="step-text">
              <strong>File Master Segera Dikirim</strong>
              <p>Setelah konfirmasi pembayaran, seluruh file tugas lengkap (.docx / .pdf / .pptx) langsung kami kirimkan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal: Poster Pricelist Asli */}
      {isPosterModalOpen && (
        <div
          className="poster-modal-backdrop"
          onClick={() => setIsPosterModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Poster Price List Resmi"
        >
          <div
            className="poster-modal-dialog glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poster-modal-header">
              <span className="poster-title-text">Price List Joki Tugas Indonesia</span>
              <button
                type="button"
                className="poster-close-btn"
                onClick={() => setIsPosterModalOpen(false)}
                aria-label="Tutup poster"
              >
                <X size={18} />
              </button>
            </div>

            <div className="poster-scroll-stage">
              <img
                src="/pricelist.png"
                alt="Poster Resmi Pricelist Joki Tugas Indonesia"
                className="poster-full-img"
              />
            </div>

            <div className="poster-modal-footer">
              <button
                type="button"
                className="poster-order-wa-btn"
                onClick={() => {
                  openRotatedWhatsApp('Halo Admin @jokitugasaja_id, saya melihat poster Pricelist dan ingin konsultasi/order tugas.');
                  setIsPosterModalOpen(false);
                }}
              >
                <MessageCircle size={16} />
                <span>Konsultasi / Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
