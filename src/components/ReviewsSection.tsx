import React from 'react';
import { Star, Sparkles, CheckCircle2, MessageSquare, MapPin, Key, DollarSign } from 'lucide-react';
import { ListingData } from '../types';

interface ReviewsSectionProps {
  listing: ListingData;
  onOpenReviewsModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  listing,
  onOpenReviewsModal,
}) => {
  const { ratingsBreakdown, reviews } = listing;

  const categories = [
    { label: 'Limpeza', score: ratingsBreakdown.cleanliness, icon: Sparkles },
    { label: 'Exatidão', score: ratingsBreakdown.accuracy, icon: CheckCircle2 },
    { label: 'Check-in', score: ratingsBreakdown.checkIn, icon: Key },
    { label: 'Comunicação', score: ratingsBreakdown.communication, icon: MessageSquare },
    { label: 'Localização', score: ratingsBreakdown.location, icon: MapPin },
    { label: 'Custo-benefício', score: ratingsBreakdown.value, icon: DollarSign },
  ];

  return (
    <section id="reviews-section" className="py-10 border-t border-neutral-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-6 h-6 fill-[#222222] text-[#222222]" />
        <h2 className="text-2xl font-bold text-[#222222]">
          {listing.rating.toFixed(2).replace('.', ',')} · {listing.reviewCount} avaliações
        </h2>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 mb-10 pb-8 border-b border-neutral-200">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-800">
              <cat.icon className="w-4 h-4 text-neutral-600" />
              <span>{cat.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-28 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-neutral-900 w-6 text-right">
                {cat.score.toFixed(1).replace('.', ',')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Cards 2-Col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {reviews.slice(0, 6).map((rev) => (
          <div key={rev.id} className="flex flex-col justify-between">
            <div>
              {/* Author header */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-semibold text-base text-[#222222]">{rev.author}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{rev.location}</span>
                    {rev.yearsOnAirbnb && (
                      <>
                        <span>·</span>
                        <span>{rev.yearsOnAirbnb}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Star rating and date */}
              <div className="flex items-center gap-2 mb-2 text-xs">
                <div className="flex text-neutral-900">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-neutral-900" />
                  ))}
                </div>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-600 font-medium">{rev.date}</span>
              </div>

              {/* Comment text */}
              <p className="text-sm text-neutral-700 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show all reviews modal button */}
      <div className="mt-8">
        <button
          onClick={onOpenReviewsModal}
          className="border border-neutral-900 hover:bg-neutral-50 text-neutral-900 font-semibold text-sm py-3 px-6 rounded-xl transition"
        >
          Mostrar todas as {listing.reviewCount} avaliações
        </button>
      </div>
    </section>
  );
};
