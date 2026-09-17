import React from 'react';
import { Share2, Heart, Grid, Star } from 'lucide-react';
import { PhotoItem } from '../types';

interface GallerySectionProps {
  title: string;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  city: string;
  country: string;
  photos: PhotoItem[];
  isSaved: boolean;
  onToggleSave: () => void;
  onOpenShare: () => void;
  onOpenGallery: (index?: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  rating,
  reviewCount,
  neighborhood,
  city,
  country,
  photos,
  isSaved,
  onToggleSave,
  onOpenShare,
  onOpenGallery,
}) => {
  const displayPhotos = photos.slice(0, 5);

  return (
    <section className="pt-6 pb-6">
      {/* Title Header */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl sm:text-[26px] font-bold text-[#222222] tracking-tight">
          {title}
        </h1>

        {/* Sub-bar */}
        <div className="flex flex-wrap items-center justify-between text-sm gap-y-2 text-[#222222]">
          <div className="flex flex-wrap items-center gap-1.5 font-semibold">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
              {rating.toFixed(2).replace('.', ',')}
            </span>
            <span>·</span>
            <button
              onClick={() => {
                const el = document.getElementById('reviews-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="underline font-semibold hover:text-neutral-600 transition"
            >
              {reviewCount} avaliações
            </button>
            <span>·</span>
            <span className="text-neutral-500 font-normal">Superhost</span>
            <span>·</span>
            <button
              onClick={() => {
                const el = document.getElementById('location-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="underline font-semibold hover:text-neutral-600 transition"
            >
              {neighborhood}, {city}, {country}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            <button
              onClick={onOpenShare}
              className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-neutral-100 transition underline"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>

            <button
              onClick={onToggleSave}
              className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-neutral-100 transition underline"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isSaved ? 'fill-[#FF385C] text-[#FF385C] scale-110' : 'text-[#222222]'
                }`}
              />
              <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Photo Grid */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-100 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] md:h-[480px]">
          {/* Main Large Photo (Left half - 2 cols on md) */}
          <div
            onClick={() => onOpenGallery(0)}
            className="md:col-span-2 relative group cursor-pointer overflow-hidden bg-neutral-200 h-full"
          >
            <img
              src={displayPhotos[0]?.url}
              alt={displayPhotos[0]?.caption}
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-90 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
          </div>

          {/* 4 smaller photos on Right (2 cols, 2 rows) */}
          <div className="hidden md:grid col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
            {displayPhotos.slice(1, 5).map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => onOpenGallery(idx + 1)}
                className="relative group cursor-pointer overflow-hidden bg-neutral-200 h-full"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition duration-300 group-hover:brightness-90 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating "Mostrar todas as fotos" pill button */}
        <button
          onClick={() => onOpenGallery(0)}
          className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/95 hover:bg-white text-[#222222] font-semibold text-sm py-2 px-4 rounded-lg border border-neutral-900 shadow-md hover:scale-102 active:scale-95 transition"
        >
          <Grid className="w-4 h-4" />
          <span>Mostrar todas as {photos.length} fotos</span>
        </button>
      </div>
    </section>
  );
};
