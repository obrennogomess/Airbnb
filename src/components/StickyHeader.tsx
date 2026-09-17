import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface StickyHeaderProps {
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  onReserveClick: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  pricePerNight,
  rating,
  reviewCount,
  onReserveClick,
}) => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show sticky header when scrolled past 560px
      if (scrollY > 560) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Track active section
      const amenitiesEl = document.getElementById('amenities-section');
      const reviewsEl = document.getElementById('reviews-section');
      const locationEl = document.getElementById('location-section');

      if (locationEl && locationEl.getBoundingClientRect().top <= 140) {
        setActiveTab('location');
      } else if (reviewsEl && reviewsEl.getBoundingClientRect().top <= 140) {
        setActiveTab('reviews');
      } else if (amenitiesEl && amenitiesEl.getBoundingClientRect().top <= 140) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-200 shadow-xs transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 h-18 flex items-center justify-between">
        {/* Navigation tabs */}
        <nav className="flex items-center gap-6 text-sm font-semibold h-full">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveTab('photos');
            }}
            className={`h-full flex items-center border-b-2 transition ${
              activeTab === 'photos'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Fotos
          </button>
          <button
            onClick={() => scrollToSection('amenities-section')}
            className={`h-full flex items-center border-b-2 transition ${
              activeTab === 'amenities'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Comodidades
          </button>
          <button
            onClick={() => scrollToSection('reviews-section')}
            className={`h-full flex items-center border-b-2 transition ${
              activeTab === 'reviews'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Avaliações
          </button>
          <button
            onClick={() => scrollToSection('location-section')}
            className={`h-full flex items-center border-b-2 transition ${
              activeTab === 'location'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Localização
          </button>
        </nav>

        {/* Right price and reserve CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-base font-bold text-neutral-900">R$ {pricePerNight}</span>
              <span className="text-xs text-neutral-500">noite</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs">
              <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
              <span className="font-semibold text-neutral-900">{rating.toFixed(2).replace('.', ',')}</span>
              <span className="text-neutral-500">({reviewCount})</span>
            </div>
          </div>

          <button
            onClick={onReserveClick}
            className="bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] text-white text-sm font-semibold py-3 px-6 rounded-lg transition shadow-sm"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};
