import React from 'react';
import HeaderProfile from './components/HeaderProfile';
import WhatsAppAdmin from './components/WhatsAppAdmin';
import PriceList from './components/PriceList';
import TestimonialsSlider from './components/TestimonialsSlider';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-root">
      {/* Main Container */}
      <main className="app-container">
        {/* Profile Header */}
        <HeaderProfile />

        {/* WhatsApp Admin Contact Button */}
        <WhatsAppAdmin />

        {/* Price List Catalog */}
        <PriceList />

        {/* Client Testimonials Slider Carousel */}
        <TestimonialsSlider />

        {/* Footer & Socials */}
        <Footer />
      </main>
    </div>
  );
}
