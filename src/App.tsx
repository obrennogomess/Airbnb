/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { listingData } from './data/listingData';
import { ReservationParams } from './types';
import { Navbar } from './components/Navbar';
import { StickyHeader } from './components/StickyHeader';
import { GallerySection } from './components/GallerySection';
import { ListingOverview } from './components/ListingOverview';
import { BookingCard } from './components/BookingCard';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { HouseRulesSection } from './components/HouseRulesSection';
import { Footer } from './components/Footer';
import { GalleryModal } from './components/GalleryModal';
import { AmenitiesModal } from './components/modals/AmenitiesModal';
import { ReviewsModal } from './components/modals/ReviewsModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { ShareModal } from './components/modals/ShareModal';
import { ContactHostModal } from './components/modals/ContactHostModal';
import { LanguageCurrencyModal } from './components/modals/LanguageCurrencyModal';
import { LoginModal } from './components/modals/LoginModal';
import { Heart, Check } from 'lucide-react';

export default function App() {
  // Initialize with exact parameters from user's URL:
  // adults=3&check_in=2026-05-10&check_out=2026-05-17
  const [reservation, setReservation] = useState<ReservationParams>({
    checkIn: '2026-05-10',
    checkOut: '2026-05-17',
    adults: 3,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast(next ? 'Adicionado à lista de favoritos!' : 'Removido dos favoritos');
      return next;
    });
  };

  const handleOpenGallery = (index: number = 0) => {
    setGalleryInitialIndex(index);
    setGalleryModalOpen(true);
  };

  const updateReservation = (params: Partial<ReservationParams>) => {
    setReservation((prev) => ({ ...prev, ...params }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#FF385C]/20">
      {/* Top Navbar */}
      <Navbar
        reservation={reservation}
        onOpenSearch={() => {
          const el = document.getElementById('amenities-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLanguage={() => setLanguageModalOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onOpenShare={() => setShareModalOpen(true)}
      />

      {/* Sticky Top Bar on scroll */}
      <StickyHeader
        pricePerNight={listingData.pricePerNight}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onReserveClick={() => setCheckoutModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 xl:px-12">
        {/* Photo Gallery & Title */}
        <GallerySection
          title={listingData.title}
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
          neighborhood={listingData.neighborhood}
          city={listingData.city}
          country={listingData.country}
          photos={listingData.photos}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onOpenShare={() => setShareModalOpen(true)}
          onOpenGallery={handleOpenGallery}
        />

        {/* Content Layout: Left details + Right sticky booking card */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 pt-4 pb-12">
          {/* Left Column: Details, overview, amenities, calendar */}
          <ListingOverview
            listing={listingData}
            reservation={reservation}
            onUpdateReservation={updateReservation}
            onOpenAmenitiesModal={() => setAmenitiesModalOpen(true)}
            onOpenHostModal={() => setHostModalOpen(true)}
          />

          {/* Right Column: Sticky Booking Widget */}
          <BookingCard
            listing={listingData}
            reservation={reservation}
            onUpdateReservation={updateReservation}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
          />
        </div>

        {/* Full-width Sections */}
        <ReviewsSection
          listing={listingData}
          onOpenReviewsModal={() => setReviewsModalOpen(true)}
        />

        <LocationSection />

        <HostSection
          host={listingData.host}
          onOpenMessageModal={() => setHostModalOpen(true)}
        />

        <HouseRulesSection houseRules={listingData.houseRules} />
      </main>

      {/* Footer */}
      <Footer onOpenLanguage={() => setLanguageModalOpen(true)} />

      {/* Modals */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        photos={listingData.photos}
        initialIndex={galleryInitialIndex}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onOpenShare={() => {
          setGalleryModalOpen(false);
          setShareModalOpen(true);
        }}
      />

      <AmenitiesModal
        isOpen={amenitiesModalOpen}
        onClose={() => setAmenitiesModalOpen(false)}
        amenities={listingData.amenities}
      />

      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        listing={listingData}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        listing={listingData}
        reservation={reservation}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        listing={listingData}
      />

      <ContactHostModal
        isOpen={hostModalOpen}
        onClose={() => setHostModalOpen(false)}
        host={listingData.host}
      />

      <LanguageCurrencyModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-sm font-medium py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Heart className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
