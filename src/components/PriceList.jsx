import React, { useState } from 'react';
import { Check, ArrowRight, Eye, X, MessageSquare } from 'lucide-react';
import './PriceList.css';

export default function PriceList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'tugas', label: 'Tugas & PR' },
    { id: 'makalah', label: 'Makalah & Esai' },
    { id: 'ppt', label: 'Slide PPT' },
    { id: 'skripsi', label: 'Skripsi & Olah Data' }
  ];

  const packages = [
    {
      id: 1,
      title: 'Tugas Harian & PR Express',
      category: 'tugas',
      badge: 'Best Seller',
      price: 'Mulai Rp 25.000',
      originalPrice: 'Rp 50.000',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      description: 'Pengerjaan tugas harian, rangkuman materi, kuis online, dan PR sekolah/kuliah tepat waktu.',
      features: [
        'Bisa Deadline Kilat (1-3 Jam Selesai)',
        'Hasil Pengerjaan Rapi & Teliti',
        'Free Revisi Sesuai Soal Tugas',
        'Privasi 100% Terjaga Aman'
      ],
      adminTarget: '6281234567890'
    },
    {
      id: 2,
      title: 'Makalah, Esai & Jurnal Ilmiah',
      category: 'makalah',
      badge: 'Populer',
      price: 'Mulai Rp 75.000',
      originalPrice: 'Rp 150.000',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
      description: 'Penyusunan karya tulis, resume jurnal internasional/nasional, dan makalah akademik berstandar tinggi.',
      features: [
        'Format Sesuai Pedoman Kampus/Sekolah',
        'Daftar Pustaka Resmi (APA / IEEE / Harvard)',
        'Lolos Uji Turnitin (Bebas Plagiarisme)',
        'File Word DOCX & PDF Siap Kumpul'
      ],
      adminTarget: '6281234567890'
    },
    {
      id: 3,
      title: 'Desain PPT & Slide Presentasi',
      category: 'ppt',
      badge: 'Favorit',
      price: 'Mulai Rp 45.000',
      originalPrice: 'Rp 90.000',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
      description: 'Desain presentasi PowerPoint estetik, modern, dan interaktif yang siap dipresentasikan di depan kelas.',
      features: [
        'Desain Menarik, Visual & Modern',
        'Penyusunan Poin Materi Padat & Jelas',
        'Animasi & Transisi Slide Profesional',
        'Format Lengkap (.pptx dan .pdf)'
      ],
      adminTarget: '6281234567890'
    },
    {
      id: 4,
      title: 'Bimbingan Skripsi & Olah Data',
      category: 'skripsi',
      badge: 'Spesial',
      price: 'Mulai Rp 350.000',
      originalPrice: 'Rp 650.000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      description: 'Bimbingan penyusunan Bab 1-5, olah data statistik (SPSS, SmartPLS, Excel), hingga persiapan sidang skripsi.',
      features: [
        'Pengerjaan Bertahap Bab demi Bab',
        'Olah Data Valid Lengkap Pembahasan',
        'Free Konsultasi & Revisi Pasca Dosen',
        'Didampingi Penuh Sampai ACC Sidang'
      ],
      adminTarget: '6289876543210'
    }
  ];

  const filtered = activeCategory === 'all'
    ? packages
    : packages.filter(p => p.category === activeCategory);

  const handleOrder = (pkg) => {
    const text = `Halo Admin @jokitugasaja_id, saya ingin order paket *${pkg.title}* (${pkg.price}). Mohon bantuan estimasi pengerjaannya ya!`;
    window.open(`https://wa.me/${pkg.adminTarget}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="linktree-block">
      <p className="section-label">Pricelist & Paket Joki Tugas</p>

      {/* Filter Tabs in Pure Glass */}
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

      {/* Package Cards List */}
      <div className="pricelist-vertical-stack">
        {filtered.map((pkg) => (
          <div key={pkg.id} className="pure-glass-card glass-panel">
            {/* Thumbnail */}
            <div className="card-thumb-wrap" onClick={() => setSelectedProduct(pkg)}>
              <img src={pkg.image} alt={pkg.title} className="card-thumb-img" />
              <div className="thumb-glass-overlay">
                <span className="glass-chip">
                  <Eye size={13} /> Detail Paket
                </span>
              </div>
              <span className="glass-badge-tag">{pkg.badge}</span>
            </div>

            {/* Info Body */}
            <div className="card-info-box">
              <div className="card-heading-row">
                <h3 className="card-pkg-name">{pkg.title}</h3>
                <div className="price-tag-group">
                  <span className="old-price">{pkg.originalPrice}</span>
                  <span className="main-price">{pkg.price}</span>
                </div>
              </div>

              <p className="card-pkg-desc">{pkg.description}</p>

              {/* Minimal Checkmarks */}
              <ul className="pure-feature-list">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="pure-feature-item">
                    <Check size={14} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Direct Order Button as Glass Pill */}
              <button
                type="button"
                className="glass-pill-btn order-glass-btn"
                onClick={() => handleOrder(pkg)}
              >
                <span>Pesan Layanan Ini</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Quick View */}
      {selectedProduct && (
        <div className="pure-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="pure-modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-x-btn"
              onClick={() => setSelectedProduct(null)}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="pure-modal-cover"
            />

            <div className="pure-modal-content">
              <div className="modal-top-meta">
                <span className="glass-badge-tag">{selectedProduct.badge}</span>
                <h3 className="modal-item-title">{selectedProduct.title}</h3>
                <span className="modal-item-price">{selectedProduct.price}</span>
              </div>

              <p className="modal-item-desc">{selectedProduct.description}</p>

              <div className="modal-bullet-box">
                <span className="bullet-title">Keunggulan & Fasilitas:</span>
                <ul className="pure-feature-list">
                  {selectedProduct.features.map((f, idx) => (
                    <li key={idx} className="pure-feature-item">
                      <Check size={14} className="feature-check-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="glass-pill-btn order-glass-btn"
                onClick={() => {
                  handleOrder(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <MessageSquare size={16} />
                <span>Order via WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
