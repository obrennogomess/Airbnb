import React, { useState } from 'react';
import { X, Search, Star, Sparkles, CheckCircle2, MessageSquare, MapPin, Key, DollarSign } from 'lucide-react';
import { ListingData } from '../../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  listing,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const { reviews, ratingsBreakdown } = listing;

  const filteredReviews = reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { label: 'Limpeza', score: ratingsBreakdown.cleanliness, icon: Sparkles },
    { label: 'Exatidão', score: ratingsBreakdown.accuracy, icon: CheckCircle2 },
    { label: 'Check-in', score: ratingsBreakdown.checkIn, icon: Key },
    { label: 'Comunicação', score: ratingsBreakdown.communication, icon: MessageSquare },
    { label: 'Localização', score: ratingsBreakdown.location, icon: MapPin },
    { label: 'Custo-benefício', score: ratingsBreakdown.value, icon: DollarSign },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
          <div className="flex items-center gap-2 text-base font-bold text-neutral-900">
            <Star className="w-5 h-5 fill-neutral-900 text-neutral-900" />
            <span>{listing.rating.toFixed(2).replace('.', ',')} · {listing.reviewCount} avaliações</span>
          </div>
          <div className="w-9" />
        </div>

        {/* Modal content: 2 columns on desktop */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Stats & Breakdown */}
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <cat.icon className="w-4 h-4 text-neutral-500" />
                    <span>{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900"
                        style={{ width: `${(cat.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-neutral-900 w-5 text-right">
                      {cat.score.toFixed(1).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="text-xs text-neutral-500 leading-relaxed">
                As avaliações são enviadas apenas por hóspedes verificados que concluíram uma estadia nesta acomodação.
              </div>
            </div>
          </div>

          {/* Right Column: Search and review cards */}
          <div className="md:col-span-2 flex flex-col space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar nos comentários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* List */}
            <div className="space-y-6 flex-1">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-sm">
                  Nenhum comentário encontrado com "{searchTerm}".
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className="pb-6 border-b border-neutral-100 last:border-none">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-sm text-neutral-900">{rev.author}</div>
                        <div className="text-xs text-neutral-500">
                          {rev.location} {rev.yearsOnAirbnb && `· ${rev.yearsOnAirbnb}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <div className="flex text-neutral-900">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-neutral-900" />
                        ))}
                      </div>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-600 font-medium">{rev.date}</span>
                    </div>

                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
