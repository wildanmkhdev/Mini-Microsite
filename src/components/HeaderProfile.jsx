import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './HeaderProfile.css';

export default function HeaderProfile() {
  return (
    <header className="profile-center">
      <div className="avatar-container">
        <img
          src="/logo.png"
          alt="Logo JokiTugasAja_ID"
          className="profile-img"
        />
        <span className="online-badge" title="Admin Aktif & Siap Melayani"></span>
      </div>

      <div className="profile-titles">
        <div className="profile-handle-row">
          <h1 className="profile-handle">@jokitugasaja_id</h1>
          <CheckCircle2 size={16} className="verified-icon" />
        </div>
        <p className="profile-tagline">
          Jasa Joki Tugas Sekolah, Kuliah & Skripsi • <strong>Cepat, Murah, Terpercaya</strong>
        </p>
      </div>

      <div className="profile-stats-bar glass-panel">
        <div className="stat-item">
          <span className="stat-number">4.9 ★</span>
          <span className="stat-label">Rating</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">2,500+</span>
          <span className="stat-label">Tugas Beres</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Privasi Aman</span>
        </div>
      </div>
    </header>
  );
}
