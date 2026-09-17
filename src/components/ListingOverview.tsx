import React, { useState } from 'react';
import {
  Key,
  Award,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Wifi,
  Wind,
  Laptop,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Bed,
  Trees,
  CheckCheck,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Info,
} from 'lucide-react';
import { ListingData, ReservationParams } from '../types';
import { GuestFavoriteBadge } from './AirbnbIcons';

interface ListingOverviewProps {
  listing: ListingData;
  reservation: ReservationParams;
  onUpdateReservation: (params: Partial<ReservationParams>) => void;
  onOpenAmenitiesModal: () => void;
  onOpenHostModal: () => void;
}

export const ListingOverview: React.FC<ListingOverviewProps> = ({
  listing,
  reservation,
  onUpdateReservation,
  onOpenAmenitiesModal,
  onOpenHostModal,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0); // 0 = May 2026

  // Days in May 2026 (May 1 = Friday, 31 days)
  // Days in June 2026 (June 1 = Monday, 30 days)
  const mayDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Selected range logic
  const checkInDay = parseInt(reservation.checkIn.split('-')[2], 10);
  const checkOutDay = parseInt(reservation.checkOut.split('-')[2], 10);

  const isDaySelected = (month: number, day: number) => {
    if (month === 5) {
      return day >= checkInDay && day <= checkOutDay;
    }
    return false;
  };

  const handleDayClick = (month: number, day: number) => {
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const clickedDate = `2026-${formattedMonth}-${formattedDay}`;

    if (!reservation.checkIn || (reservation.checkIn && reservation.checkOut)) {
      onUpdateReservation({ checkIn: clickedDate, checkOut: '' });
    } else if (reservation.checkIn && !reservation.checkOut) {
      if (clickedDate > reservation.checkIn) {
        onUpdateReservation({ checkOut: clickedDate });
      } else {
        onUpdateReservation({ checkIn: clickedDate, checkOut: '' });
      }
    }
  };

  return (
    <div className="flex-1 max-w-full lg:max-w-[650px] xl:max-w-[700px] text-[#222222]">
      {/* Basic summary */}
      <div className="pb-6 border-b border-neutral-200">
        <h2 className="text-xl sm:text-[22px] font-semibold text-[#222222]">
          {listing.roomType} em {listing.neighborhood}, {listing.city}
        </h2>
        <ol className="flex flex-wrap items-center gap-1 text-neutral-700 text-sm sm:text-base mt-1">
          <li>{listing.maxGuests} hóspedes</li>
          <li>·</li>
          <li>{listing.bedrooms} quarto</li>
          <li>·</li>
          <li>{listing.beds} camas</li>
          <li>·</li>
          <li>{listing.bathrooms}</li>
        </ol>
      </div>

      {/* Guest Favorite / Preferido dos Hóspedes Card */}
      <div className="py-6 border-b border-neutral-200">
        <div className="border border-neutral-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-neutral-50/50 to-white shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
              <GuestFavoriteBadge className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-base text-[#222222]">
                Preferido dos Hóspedes
              </div>
              <div className="text-xs sm:text-sm text-neutral-600">
                Uma das acomodações mais amadas pelos hóspedes no Airbnb
              </div>
            </div>
          </div>

          <div className="flex items-center sm:border-l sm:border-neutral-200 sm:pl-6 gap-6 shrink-0">
            <div className="text-center">
              <div className="text-xl font-bold text-[#222222]">
                {listing.rating.toFixed(2).replace('.', ',')}
              </div>
              <div className="flex text-amber-500 text-xs justify-center">★★★★★</div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200" />
            <div className="text-center">
              <div className="text-xl font-bold text-[#222222] underline cursor-pointer">
                {listing.reviewCount}
              </div>
              <div className="text-xs text-neutral-500">Avaliações</div>
            </div>
          </div>
        </div>
      </div>

      {/* Host card snippet */}
      <div className="py-6 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={listing.host.avatar}
              alt={listing.host.name}
              className="w-14 h-14 rounded-full object-cover shadow-xs border border-neutral-200"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-xs">
              <Award className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#222222]">
              Hospedado por {listing.host.name}
            </h3>
            <p className="text-sm text-neutral-500">
              Superhost · {listing.host.yearsHosting} anos hospedando
            </p>
          </div>
        </div>
        <button
          onClick={onOpenHostModal}
          className="text-sm font-semibold underline text-neutral-800 hover:text-black py-2 px-3 rounded-lg hover:bg-neutral-100 transition"
        >
          Ver perfil
        </button>
      </div>

      {/* Highlights */}
      <div className="py-6 border-b border-neutral-200 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-2 text-neutral-800">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#222222]">Self check-in autônomo</h4>
            <p className="text-sm text-neutral-500">
              Faça check-in sem complicação a qualquer hora usando a fechadura eletrônica.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 text-neutral-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#222222]">
              {listing.host.name} é um Superhost
            </h4>
            <p className="text-sm text-neutral-500">
              Superhosts são anfitriões experientes e muito bem avaliados, comprometidos em oferecer estadias excelentes.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 text-neutral-800">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#222222]">Localização excelente</h4>
            <p className="text-sm text-neutral-500">
              100% dos hóspedes recentes deram nota máxima de 5 estrelas para a localização em Vila Olímpia.
            </p>
          </div>
        </div>
      </div>

      {/* AirCover Banner */}
      <div className="py-6 border-b border-neutral-200">
        <div className="flex items-baseline gap-1 text-xl font-bold tracking-tight mb-2">
          <span className="text-[#FF385C]">air</span>
          <span className="text-[#222222]">cover</span>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Toda reserva inclui proteção gratuita contra cancelamentos pelo anfitrião, imprecisões no anúncio e outros problemas, como dificuldades no check-in.
        </p>
        <button className="mt-3 text-sm font-semibold underline text-[#222222] hover:text-black">
          Saiba mais sobre o AirCover
        </button>
      </div>

      {/* Space description */}
      <div className="py-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-[#222222] mb-3">Sobre este espaço</h3>
        <p className="text-neutral-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {showFullDesc ? listing.description + '\n\n' + listing.theSpace + '\n\n' + listing.guestAccess + '\n\n' + listing.otherNotes : listing.description}
        </p>
        <button
          onClick={() => setShowFullDesc(!showFullDesc)}
          className="mt-3 flex items-center gap-1 text-sm font-semibold underline text-[#222222] hover:text-black"
        >
          <span>{showFullDesc ? 'Mostrar menos' : 'Mostrar mais'}</span>
          <ChevronRight className={`w-4 h-4 transition ${showFullDesc ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Where you'll sleep */}
      <div className="py-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-[#222222] mb-4">Onde você vai dormir</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listing.bedroomsInfo.map((b, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-400 transition"
            >
              <div className="flex items-center gap-2 mb-4 text-neutral-800">
                <Bed className="w-6 h-6" />
                {b.beds.length > 1 && <Bed className="w-5 h-5 text-neutral-400" />}
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#222222]">{b.title}</h4>
                <p className="text-sm text-neutral-500 mt-1">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities preview */}
      <div id="amenities-section" className="py-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-[#222222] mb-4">O que esse lugar oferece</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm sm:text-base text-neutral-800">
          <div className="flex items-center gap-4">
            <Wifi className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Wi-Fi rápido (350 Mbps)</span>
          </div>
          <div className="flex items-center gap-4">
            <Wind className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Ar-condicionado (Quente e Frio)</span>
          </div>
          <div className="flex items-center gap-4">
            <Laptop className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Espaço de trabalho para notebook</span>
          </div>
          <div className="flex items-center gap-4">
            <Key className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Fechadura eletrônica (Self check-in)</span>
          </div>
          <div className="flex items-center gap-4">
            <UtensilsCrossed className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Cozinha compartilhada equipada</span>
          </div>
          <div className="flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Secador de cabelo</span>
          </div>
          <div className="flex items-center gap-4">
            <Shirt className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Ferro de passar e cabides</span>
          </div>
          <div className="flex items-center gap-4">
            <Trees className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Quintal e jardim ao ar livre</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCheck className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Serviço de limpeza em dias úteis</span>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-neutral-700 shrink-0" />
            <span>Câmeras de segurança externas</span>
          </div>
        </div>

        <button
          onClick={onOpenAmenitiesModal}
          className="mt-6 border border-neutral-900 hover:bg-neutral-50 text-neutral-900 font-semibold text-sm py-3 px-6 rounded-xl transition"
        >
          Mostrar todas as {listing.amenities.length} comodidades
        </button>
      </div>

      {/* Interactive Calendar Section */}
      <div className="py-6 border-b border-neutral-200">
        <h3 className="text-xl font-semibold text-[#222222]">
          7 noites em Vila Olímpia
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          10 de mai. de 2026 – 17 de mai. de 2026
        </p>

        {/* Dual Month Calendar View */}
        <div className="mt-6 border border-neutral-200 rounded-2xl p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCalendarMonthOffset(Math.max(0, calendarMonthOffset - 1))}
              disabled={calendarMonthOffset === 0}
              className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Selecione as datas da estadia
            </span>
            <button
              onClick={() => setCalendarMonthOffset(calendarMonthOffset + 1)}
              className="p-2 rounded-full hover:bg-neutral-100"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Month 1: Maio 2026 */}
            <div>
              <div className="text-center font-bold text-base text-neutral-900 mb-3">
                Maio de 2026
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-neutral-500 font-semibold mb-2">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              {/* May 2026 starts on Friday (column 5) */}
              <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium">
                {/* 5 blank cells for Sunday..Thursday */}
                <div /><div /><div /><div /><div />
                {mayDays.map((day) => {
                  const selected = isDaySelected(5, day);
                  const isStart = day === checkInDay;
                  const isEnd = day === checkOutDay;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(5, day)}
                      className={`h-9 w-full flex items-center justify-center transition text-xs sm:text-sm font-semibold ${
                        isStart || isEnd
                          ? 'bg-neutral-900 text-white rounded-full'
                          : selected
                          ? 'bg-neutral-100 text-neutral-900'
                          : 'hover:border hover:border-neutral-900 rounded-full text-neutral-800'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Month 2: Junho 2026 */}
            <div className="hidden sm:block">
              <div className="text-center font-bold text-base text-neutral-900 mb-3">
                Junho de 2026
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-neutral-500 font-semibold mb-2">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              {/* June 2026 starts on Monday (column 1) */}
              <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium">
                <div />
                {juneDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(6, day)}
                    className="h-9 w-full flex items-center justify-center hover:border hover:border-neutral-900 rounded-full text-neutral-800 text-xs sm:text-sm font-semibold"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100">
            <button
              onClick={() => onUpdateReservation({ checkIn: '2026-05-10', checkOut: '2026-05-17' })}
              className="text-xs font-semibold underline text-neutral-600 hover:text-black"
            >
              Restaurar datas padrão (10 a 17 de maio)
            </button>
            <button
              onClick={() => onUpdateReservation({ checkIn: '', checkOut: '' })}
              className="text-xs font-semibold underline text-neutral-600 hover:text-black"
            >
              Limpar datas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
