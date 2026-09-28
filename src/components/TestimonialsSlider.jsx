import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Eye, 
  X, 
  User
} from 'lucide-react';
import './TestimonialsSlider.css';

export default function TestimonialsSlider() {
  const testimonials = [
    {
      id: 1,
      name: 'Klien Laporan Akhir',
      role: 'Siswa / Mahasiswa',
      rating: '★★★★★',
      highlight: 'Free Revisi & Pelayanan Ramah Sampai Puas',
      comment: 'Saya sangattt puass dngg hasil nya ka 🥰',
      project: 'Pengerjaan Laporan',
      screenshot: '/testimonials/testi-1.png'
    },
    {
      id: 2,
      name: 'Klien PKL (Alumni Sukses)',
      role: 'Alumni Praktik Kerja Lapangan',
      rating: '★★★★★',
      highlight: 'Dibimbing Tuntas Bikin Laporan Sampai Lulus',
      comment: 'kaaa sedikit riview dari aku yak, jujurr jasa kaka ini ngebantuu bangett bikin laporan pkl ku dulu bener benerr di bimbing sampe tuntasss 😍 sekarang aku udaa luluss, makasii ya kaa bantuan nya 🫡 sukses selalu ya ka',
      project: 'Laporan PKL Tuntas',
      screenshot: '/testimonials/testi-2.png'
    },
    {
      id: 3,
      name: 'Klien Laporan PKL',
      role: 'Siswa SMK / Mahasiswa',
      rating: '★★★★★',
      highlight: 'Laporan PKL Tanpa Revisi Langsung ACC',
      comment: 'Ka aku laporan PKL tnpa revisi langsung ACC bangettt timakaaacciiiii yaaa kaa🤍🤍🤍🤍💗💗💗💗',
      project: 'Laporan PKL Kilat',
      screenshot: '/testimonials/testi-3.png'
    },
    {
      id: 4,
      name: 'Alumni PKL Lulus',
      role: 'Siswa Tingkat Akhir',
      rating: '★★★★★',
      highlight: 'Lulus Ujian Berkat Bantuan Laporan PKL',
      comment: 'BTW KAK,AKU SKRG UDAH LULUSSS TERIMAKASIH YAAA DULU UDAHH BIKININ AKU LAPORAN PKL, LOVE U KAK🥺🥺🫶🏻',
      project: 'Laporan PKL & Sidang',
      screenshot: '/testimonials/testi-4.png'
    },
    {
      id: 5,
      name: 'Klien Langganan Setia',
      role: 'Kini Sudah Jadi Mahasiswa',
      rating: '★★★★★',
      highlight: 'Dari Siswa PKL Sampai Sukses Kuliah',
      comment: 'terimah kasih banyak kak,atas kerja samanya 🫰🏿🫰🏿sekarang aku udah jadi mahasiswa, kakak ingat nggak dulu aku mundar mandir chat kaka mau revisi eh tau taunya udah lulus aja🤣😭',
      project: 'Laporan & Tugas Akademik',
      screenshot: '/testimonials/testi-5.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlay || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, lightboxIndex, handleNext]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, testimonials.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="linktree-block">
      <div className="slider-header-row">
        <div>
          <p className="section-label" style={{ margin: 0, textAlign: 'left' }}>
            Testimoni & Bukti Chat
          </p>
        </div>

        <div className="nav-arrow-group">
          <span className="slide-counter-txt">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            className="glass-arrow-btn"
            onClick={handlePrev}
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="glass-arrow-btn"
            onClick={handleNext}
            aria-label="Berikutnya"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Testimonial Viewport */}
      <div
        className="testi-viewport"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="testi-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t, index) => (
            <div key={t.id} className="testi-slide-item">
              <div className="testi-card-box glass-panel">
                {/* Header User Row dengan Avatar Icon Orang */}
                <div className="testi-user-header">
                  <div className="testi-user-avatar-icon">
                    <User size={20} />
                  </div>
                  <div className="testi-user-detail">
                    <div className="testi-name-line">
                      <span className="testi-name-txt">{t.name}</span>
                      <CheckCircle2 size={13} className="testi-verified" />
                    </div>
                    <span className="testi-role-txt">{t.role}</span>
                  </div>
                  <div className="testi-stars-wrap">
                    <span className="testi-stars-mono">{t.rating}</span>
                  </div>
                </div>

                {/* Highlight Title */}
                <div className="testi-highlight-row">
                  <span className="testi-highlight-txt">{t.highlight}</span>
                </div>

                {/* Chat Comment Body */}
                <blockquote className="testi-text-body">
                  “{t.comment}”
                </blockquote>

                {/* Screenshot Card */}
                <div 
                  className="testi-screenshot-preview"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`Lihat bukti chat asli untuk ${t.name}`}
                >
                  <img
                    src={t.screenshot}
                    alt={`Screenshot testimoni chat WhatsApp dari ${t.name}`}
                    className="testi-screenshot-img"
                    loading="lazy"
                  />
                  <div className="testi-screenshot-glass-overlay">
                    <span className="testi-expand-chip">
                      <Eye size={13} />
                      <span>Ketuk untuk Perbesar Bukti Chat</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="testi-bottom-row">
                  <span className="testi-project-txt">{t.project}</span>
                  <button
                    type="button"
                    className="testi-zoom-btn"
                    onClick={() => openLightbox(index)}
                  >
                    <span>Zoom Bukti</span>
                    <Eye size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="dots-row">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot-pill ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Lihat testimoni ke-${i + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="testi-lightbox-backdrop" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Bukti Chat Asli WhatsApp"
        >
          <div 
            className="testi-lightbox-dialog glass-panel" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="lightbox-header">
              <div className="lightbox-meta">
                <span className="lightbox-meta-title">Bukti Chat WhatsApp Asli</span>
                <span className="lightbox-counter">
                  ({lightboxIndex + 1} dari {testimonials.length})
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Tutup pratinjau"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lightbox Image Stage */}
            <div className="lightbox-image-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={prevLightbox}
                aria-label="Testimoni sebelumnya"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="lightbox-img-scroll">
                <img
                  src={testimonials[lightboxIndex].screenshot}
                  alt={`Tangkapan layar chat testimoni WhatsApp ${testimonials[lightboxIndex].name}`}
                  className="lightbox-full-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={nextLightbox}
                aria-label="Testimoni berikutnya"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div className="lightbox-footer">
              <div className="lightbox-footer-client">
                <strong>{testimonials[lightboxIndex].name}</strong> • 
                <span> {testimonials[lightboxIndex].project}</span>
              </div>
              <p className="lightbox-quote-txt">
                “{testimonials[lightboxIndex].comment}”
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
