import React from 'react';
import HeaderProfile from './components/HeaderProfile';
import WhatsAppAdmin from './components/WhatsAppAdmin';
import PriceList from './components/PriceList';
import TestimonialsSlider from './components/TestimonialsSlider';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-root">
      {/* Background Animated Ambience */}
      <div className="bg-ambient">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      <div className="bg-grid"></div>

      {/* Main Container */}
      <main className="app-container">
        {/* Profile Header */}
        <HeaderProfile />

        {/* WhatsApp Admin 1 & 2 Contact Buttons */}
        <WhatsAppAdmin />

        {/* Price List Catalog with Dummy Images */}
        <PriceList />

        {/* Client Testimonials Slider Carousel */}
        <TestimonialsSlider />

        {/* Footer & Socials */}
        <Footer />
      </main>
    </div>
  );
}
