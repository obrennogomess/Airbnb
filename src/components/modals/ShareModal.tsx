import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail, Facebook, Twitter } from 'lucide-react';
import { ListingData } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  listing,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Confira esta acomodação na Vila Olímpia no Airbnb: ${listing.title} - ${currentUrl}`
      )}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
          <h3 className="font-bold text-base text-neutral-900">
            Compartilhar esta acomodação
          </h3>
          <div className="w-9" />
        </div>

        {/* Listing preview */}
        <div className="flex items-center gap-4 p-3 border border-neutral-200 rounded-2xl bg-neutral-50/50">
          <img
            src={listing.photos[0].url}
            alt={listing.title}
            className="w-16 h-16 rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-bold text-sm text-neutral-900 line-clamp-1">
              {listing.title}
            </h4>
            <p className="text-xs text-neutral-500">
              {listing.neighborhood}, {listing.city} · ★ {listing.rating}
            </p>
          </div>
        </div>

        {/* Share grid */}
        <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 p-3.5 border border-neutral-200 rounded-2xl hover:border-neutral-800 hover:bg-neutral-50 transition text-left"
          >
            {copied ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <Copy className="w-5 h-5 text-neutral-700" />
            )}
            <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-3 p-3.5 border border-neutral-200 rounded-2xl hover:border-neutral-800 hover:bg-neutral-50 transition text-left"
          >
            <MessageCircle className="w-5 h-5 text-emerald-500" />
            <span>WhatsApp</span>
          </button>

          <a
            href={`mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(currentUrl)}`}
            className="flex items-center gap-3 p-3.5 border border-neutral-200 rounded-2xl hover:border-neutral-800 hover:bg-neutral-50 transition text-left"
          >
            <Mail className="w-5 h-5 text-neutral-700" />
            <span>Email</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(listing.title)}&url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 border border-neutral-200 rounded-2xl hover:border-neutral-800 hover:bg-neutral-50 transition text-left"
          >
            <Twitter className="w-5 h-5 text-sky-500" />
            <span>X (Twitter)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
