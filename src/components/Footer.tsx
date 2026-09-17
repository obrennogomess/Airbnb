import React from 'react';
import { Globe, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onOpenLanguage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLanguage }) => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 text-[#222222] text-sm mt-12">
      {/* Breadcrumb row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 py-5 border-b border-neutral-200">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
          <a href="#" className="hover:underline">Airbnb</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a href="#" className="hover:underline">Brasil</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a href="#" className="hover:underline">Estado de São Paulo</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a href="#" className="hover:underline">São Paulo</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a href="#" className="hover:underline">Vila Olímpia</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-medium">Quarto na MELHOR Localização * Vila Olímpia *</span>
        </nav>
      </div>

      {/* 4 Columns Links */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-neutral-900 mb-4 text-sm">Suporte</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
            <li><a href="#" className="hover:underline">Central de Ajuda</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Antidiscriminação</a></li>
            <li><a href="#" className="hover:underline">Apoio a pessoas com deficiência</a></li>
            <li><a href="#" className="hover:underline">Opções de cancelamento</a></li>
            <li><a href="#" className="hover:underline">Reporte um problema no bairro</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-4 text-sm">Hospedagem</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
            <li><a href="#" className="hover:underline">Anuncie seu espaço no Airbnb</a></li>
            <li><a href="#" className="hover:underline">AirCover para anfitriões</a></li>
            <li><a href="#" className="hover:underline">Recursos para anfitriões</a></li>
            <li><a href="#" className="hover:underline">Fórum da comunidade</a></li>
            <li><a href="#" className="hover:underline">Hospedagem responsável</a></li>
            <li><a href="#" className="hover:underline">Participe de uma aula gratuita de hospedagem</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-4 text-sm">Airbnb</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">Novos recursos</a></li>
            <li><a href="#" className="hover:underline">Carreiras</a></li>
            <li><a href="#" className="hover:underline">Investidores</a></li>
            <li><a href="#" className="hover:underline">Estadias de emergência com o Airbnb.org</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-4 text-sm">Comunidade</h4>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
            <li><a href="#" className="hover:underline">Airbnb.org: ajuda em desastres</a></li>
            <li><a href="#" className="hover:underline">Combate à discriminação</a></li>
            <li><a href="#" className="hover:underline">Convide amigos</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 py-6 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center md:text-left">
          <span>© 2026 Airbnb, Inc.</span>
          <span>·</span>
          <a href="#" className="hover:underline">Privacidade</a>
          <span>·</span>
          <a href="#" className="hover:underline">Termos</a>
          <span>·</span>
          <a href="#" className="hover:underline">Mapa do site</a>
          <span>·</span>
          <a href="#" className="hover:underline">Informações da empresa</a>
        </div>

        <div className="flex items-center gap-6 font-semibold text-neutral-900">
          <button
            onClick={onOpenLanguage}
            className="flex items-center gap-2 hover:underline"
          >
            <Globe className="w-4 h-4" />
            <span>Português (BR)</span>
          </button>
          <button
            onClick={onOpenLanguage}
            className="hover:underline"
          >
            R$ BRL
          </button>

          <div className="flex items-center gap-4 text-neutral-800">
            <Facebook className="w-4 h-4 hover:text-[#FF385C] cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-[#FF385C] cursor-pointer" />
            <Instagram className="w-4 h-4 hover:text-[#FF385C] cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
