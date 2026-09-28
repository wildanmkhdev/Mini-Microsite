import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './TestimonialsSlider.css';

export default function TestimonialsSlider() {
  const testimonials = [
    {
      id: 1,
      name: 'Andi Pratama',
      role: 'Mahasiswa S1 Ekonomi',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      rating: '★★★★★',
      comment: 'Penyelamat banget waktu deadline mepet jam 12 malam! Makalah 15 lembar selesai rapi, referensi jurnal lengkap dan Turnitin aman. Nilai dapet A!',
      project: 'Paket Makalah & Esai'
    },
    {
      id: 2,
      name: 'Siti Rahma',
      role: 'Mahasiswi Tingkat Akhir',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: '★★★★★',
      comment: 'Bimbingan olah data SPSS & Bab 4-5 detail banget. Adminnya sabar ngejelasin sampai paham, akhirnya sidang skripsi langsung ACC tanpa revisi berat.',
      project: 'Skripsi & Olah Data'
    },
    {
      id: 3,
      name: 'Dimas Kurniawan',
      role: 'Siswa SMA Kelas 12',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: '★★★★★',
      comment: 'PR matematika dan fisika dikerjain lengkap beserta langkah-langkah rumusnya. Harganya murah meriah cocok buat kantong pelajar, responnya super cepet!',
      project: 'Tugas Harian & PR'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

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

  return (
    <section className="linktree-block">
      <div className="slider-header-row">
        <p className="section-label" style={{ margin: 0 }}>Testimoni Pelanggan</p>
        <div className="nav-arrow-group">
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
          {testimonials.map((t) => (
            <div key={t.id} className="testi-slide-item">
              <div className="testi-card-box glass-panel">
                <div className="testi-user-header">
                  <img src={t.avatar} alt={t.name} className="testi-user-avatar" />
                  <div className="testi-user-detail">
                    <div className="testi-name-line">
                      <span className="testi-name-txt">{t.name}</span>
                      <CheckCircle2 size={13} className="testi-verified" />
                    </div>
                    <span className="testi-role-txt">{t.role}</span>
                  </div>
                  <span className="testi-stars-mono">{t.rating}</span>
                </div>

                <p className="testi-text-body">“{t.comment}”</p>

                <div className="testi-bottom-tag">
                  <span>{t.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots-row">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot-pill ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
