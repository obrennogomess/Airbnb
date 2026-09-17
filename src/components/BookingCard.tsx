import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Flag, Plus, Minus } from 'lucide-react';
import { ListingData, ReservationParams } from '../types';

interface BookingCardProps {
  listing: ListingData;
  reservation: ReservationParams;
  onUpdateReservation: (params: Partial<ReservationParams>) => void;
  onOpenCheckout: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  listing,
  reservation,
  onUpdateReservation,
  onOpenCheckout,
}) => {
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGuestsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate nights
  const calculateNights = (): number => {
    if (!reservation.checkIn || !reservation.checkOut) return 7;
    const start = new Date(reservation.checkIn);
    const end = new Date(reservation.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 7;
  };

  const nights = calculateNights();
  const basePrice = listing.pricePerNight * nights;
  const cleaningFee = listing.cleaningFee;
  const serviceFee = Math.round(basePrice * listing.serviceFeePercent);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const totalGuests = reservation.adults + reservation.children;

  const handleAdultsChange = (delta: number) => {
    const newAdults = reservation.adults + delta;
    if (newAdults >= 1 && newAdults + reservation.children <= listing.maxGuests) {
      onUpdateReservation({ adults: newAdults });
    }
  };

  const handleChildrenChange = (delta: number) => {
    const newChildren = reservation.children + delta;
    if (newChildren >= 0 && reservation.adults + newChildren <= listing.maxGuests) {
      onUpdateReservation({ children: newChildren });
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Selecionar data';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[400px] shrink-0 sticky top-28 self-start">
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xl relative">
        {/* Header: Price and reviews */}
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#222222]">
              R$ {listing.pricePerNight}
            </span>
            <span className="text-neutral-500 text-base">noite</span>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-[#222222]">
            <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
            <span>{listing.rating.toFixed(2).replace('.', ',')}</span>
            <span className="text-neutral-400">·</span>
            <button
              onClick={() => {
                const el = document.getElementById('reviews-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-neutral-500 underline font-normal hover:text-black"
            >
              {listing.reviewCount} avaliações
            </button>
          </div>
        </div>

        {/* Date & Guests Box */}
        <div className="border border-neutral-300 rounded-2xl overflow-hidden mb-4 relative" ref={dropdownRef}>
          <div className="grid grid-cols-2 border-b border-neutral-300">
            <div className="p-3 border-r border-neutral-300 hover:bg-neutral-50 cursor-pointer">
              <label className="block text-[10px] font-extrabold uppercase text-neutral-800 tracking-wider">
                CHECK-IN
              </label>
              <div className="text-xs sm:text-sm text-neutral-800 font-medium">
                {formatDateDisplay(reservation.checkIn)}
              </div>
            </div>

            <div className="p-3 hover:bg-neutral-50 cursor-pointer">
              <label className="block text-[10px] font-extrabold uppercase text-neutral-800 tracking-wider">
                CHECKOUT
              </label>
              <div className="text-xs sm:text-sm text-neutral-800 font-medium">
                {formatDateDisplay(reservation.checkOut)}
              </div>
            </div>
          </div>

          {/* Guests selector button */}
          <div
            onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
            className="p-3 hover:bg-neutral-50 cursor-pointer flex items-center justify-between"
          >
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-neutral-800 tracking-wider">
                HÓSPEDES
              </label>
              <div className="text-xs sm:text-sm text-neutral-800 font-medium">
                {totalGuests} {totalGuests === 1 ? 'hóspede' : 'hóspedes'}
                {reservation.infants > 0 && `, ${reservation.infants} bebê`}
              </div>
            </div>
            {guestsDropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-neutral-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neutral-600" />
            )}
          </div>

          {/* Guests Dropdown Popover */}
          {guestsDropdownOpen && (
            <div className="absolute top-full left-0 right-0 z-20 bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xl mt-1 space-y-4 animate-in fade-in zoom-in-95 duration-100">
              {/* Adultos */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-[#222222]">Adultos</div>
                  <div className="text-xs text-neutral-500">13 anos ou mais</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAdultsChange(-1)}
                    disabled={reservation.adults <= 1}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-300 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {reservation.adults}
                  </span>
                  <button
                    onClick={() => handleAdultsChange(1)}
                    disabled={totalGuests >= listing.maxGuests}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-300 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Crianças */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-[#222222]">Crianças</div>
                  <div className="text-xs text-neutral-500">Idade 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleChildrenChange(-1)}
                    disabled={reservation.children <= 0}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-300 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {reservation.children}
                  </span>
                  <button
                    onClick={() => handleChildrenChange(1)}
                    disabled={totalGuests >= listing.maxGuests}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-neutral-300 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-lg">
                Esta acomodação permite no máximo {listing.maxGuests} hóspedes (1 cama de casal e 1 cama de solteiro).
              </div>

              <button
                onClick={() => setGuestsDropdownOpen(false)}
                className="w-full text-right text-xs font-bold underline text-neutral-800 hover:text-black pt-1"
              >
                Fechar
              </button>
            </div>
          )}
        </div>

        {/* Reserve CTA Button */}
        <button
          onClick={onOpenCheckout}
          className="w-full bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] text-white font-bold text-base py-3.5 px-6 rounded-xl transition shadow-md duration-200"
        >
          Reservar
        </button>

        <p className="text-center text-xs text-neutral-500 mt-3">
          Você ainda não será cobrado
        </p>

        {/* Pricing Breakdown */}
        <div className="space-y-3 pt-6 text-sm text-neutral-700">
          <div className="flex justify-between">
            <span className="underline cursor-pointer">
              R$ {listing.pricePerNight} x {nights} noites
            </span>
            <span>R$ {basePrice.toLocaleString('pt-BR')}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline cursor-pointer">Taxa de limpeza</span>
            <span>R$ {cleaningFee.toLocaleString('pt-BR')}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline cursor-pointer">Taxa de serviço do Airbnb</span>
            <span>R$ {serviceFee.toLocaleString('pt-BR')}</span>
          </div>

          <div className="h-[1px] bg-neutral-200 my-4" />

          <div className="flex justify-between font-bold text-base text-[#222222]">
            <span>Total sem impostos</span>
            <span>R$ {totalPrice.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Report listing */}
      <div className="flex items-center justify-center gap-2 mt-6 text-neutral-500 text-xs">
        <Flag className="w-3.5 h-3.5" />
        <button className="underline hover:text-neutral-800 transition">
          Denunciar este anúncio
        </button>
      </div>
    </div>
  );
};
