import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { PhotoItem } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  initialIndex?: number;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onOpenShare?: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  isSaved = false,
  onToggleSave,
  onOpenShare,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen) return null;

  const categories = ['Todas', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos =
    selectedCategory === 'Todas'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const activePhoto = photos[currentIndex] || photos[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 -ml-2 rounded-full hover:bg-neutral-100 transition font-semibold text-sm text-neutral-800"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Fechar galeria</span>
        </button>

        <div className="text-sm font-semibold text-neutral-800">
          {currentIndex + 1} / {photos.length}
        </div>

        <div className="flex items-center gap-2">
          {onOpenShare && (
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full hover:bg-neutral-100 transition text-neutral-700"
              title="Compartilhar"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="p-2 rounded-full hover:bg-neutral-100 transition"
              title="Salvar"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-neutral-700'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-100 overflow-x-auto bg-neutral-50/50 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const firstInCat = photos.findIndex((p) => cat === 'Todas' || p.category === cat);
              if (firstInCat !== -1) setCurrentIndex(firstInCat);
            }}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Image Viewport */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 bg-neutral-950 overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-neutral-900 flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Image */}
        <div className="max-w-4xl max-h-[72vh] flex flex-col items-center justify-center">
          <img
            src={activePhoto.url}
            alt={activePhoto.caption}
            className="max-w-full max-h-[66vh] object-contain rounded-lg shadow-2xl transition duration-200"
            referrerPolicy="no-referrer"
          />
          <p className="mt-4 text-center text-white/90 text-sm font-medium max-w-xl">
            {activePhoto.caption}
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-neutral-900 flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="bg-neutral-900 p-3 flex items-center justify-center gap-2 overflow-x-auto">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition ${
              idx === currentIndex
                ? 'border-[#FF385C] scale-105 opacity-100'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img
              src={photo.url}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
