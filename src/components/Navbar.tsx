import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Menu, User, Sparkles, HelpCircle, Heart, Share2 } from 'lucide-react';
import { BeloLogo } from './AirbnbIcons';
import { ReservationParams } from '../types';

interface NavbarProps {
  reservation: ReservationParams;
  onOpenSearch?: () => void;
  onOpenLanguage?: () => void;
  onOpenLoginModal?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onOpenShare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  reservation,
  onOpenSearch,
  onOpenLanguage,
  onOpenLoginModal,
  isSaved,
  onToggleSave,
  onOpenShare,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format dates for compact pill
  const dateText = '10 a 17 de mai.';
  const guestText = `${reservation.adults} hóspedes`;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 h-20 flex items-center justify-between gap-4">
        {/* Left: Airbnb Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-2 text-[#FF385C] focus:outline-none group">
            <BeloLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
            <span className="hidden md:inline font-bold text-xl tracking-tight text-[#FF385C]">
              airbnb
            </span>
          </a>
        </div>

        {/* Center: Search pill with exact search params */}
        <div
          onClick={onOpenSearch}
          className="hidden sm:flex items-center border border-neutral-300 rounded-full py-2 px-3 shadow-xs hover:shadow-md transition cursor-pointer text-sm font-medium"
        >
          <button className="px-3 text-[#222222] font-semibold truncate hover:text-black">
            Vila Olímpia
          </button>
          <span className="h-5 w-[1px] bg-neutral-300"></span>
          <button className="px-3 text-[#222222] font-semibold truncate hover:text-black">
            {dateText}
          </button>
          <span className="h-5 w-[1px] bg-neutral-300"></span>
          <div className="flex items-center gap-2 pl-3 pr-1">
            <span className="text-neutral-600 font-normal truncate">{guestText}</span>
            <div className="w-8 h-8 rounded-full bg-[#FF385C] text-white flex items-center justify-center shrink-0">
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Mobile top bar search pill */}
        <div
          onClick={onOpenSearch}
          className="flex sm:hidden items-center flex-1 max-w-xs border border-neutral-200 rounded-full py-2 px-3 shadow-xs"
        >
          <Search className="w-4 h-4 text-[#222222] mr-2 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#222222]">Vila Olímpia</span>
            <span className="text-[11px] text-neutral-500">10 – 17 de mai. · 3 hóspedes</span>
          </div>
        </div>

        {/* Right navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="https://www.airbnb.com.br/host/homes"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block text-sm font-semibold text-[#222222] hover:bg-neutral-100 py-2.5 px-4 rounded-full transition"
          >
            Anuncie seu espaço no Airbnb
          </a>

          <button
            onClick={onOpenLanguage}
            title="Idioma e moeda"
            className="p-2.5 text-neutral-700 hover:bg-neutral-100 rounded-full transition flex items-center justify-center"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 border border-neutral-300 rounded-full py-1.5 pl-3 pr-1.5 hover:shadow-md transition text-neutral-700"
              aria-expanded={userMenuOpen}
            >
              <Menu className="w-4 h-4" />
              <div className="w-8 h-8 rounded-full bg-neutral-600 text-white flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4" />
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenLoginModal?.();
                  }}
                  className="w-full text-left px-4 py-3 font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                >
                  Cadastre-se
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenLoginModal?.();
                  }}
                  className="w-full text-left px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Entrar
                </button>
                <div className="h-[1px] bg-neutral-200 my-1.5" />
                <a
                  href="https://www.airbnb.com.br/host/homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Hospede em sua acomodação
                </a>
                <a
                  href="https://www.airbnb.com.br/help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Central de Ajuda
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
