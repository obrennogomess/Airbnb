import React, { useState } from 'react';
import { MapPin, Navigation, Building2, ShoppingBag, TreePine, Train, Plane, Plus, Minus } from 'lucide-react';
import { BeloLogo } from './AirbnbIcons';

export const LocationSection: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(15);
  const [showFullNeighborhood, setShowFullNeighborhood] = useState(false);

  return (
    <section id="location-section" className="py-10 border-t border-neutral-200 text-[#222222]">
      <h2 className="text-2xl font-bold mb-2">Onde você estará</h2>
      <p className="text-sm sm:text-base text-neutral-600 mb-6 font-medium">
        Vila Olímpia, São Paulo, Estado de São Paulo, Brasil
      </p>

      {/* Interactive Map Visual */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl overflow-hidden border border-neutral-200 bg-[#e5e3df] shadow-xs">
        {/* Stylized vector map background representation */}
        <div className="absolute inset-0 bg-[#e8ece9] opacity-90 overflow-hidden">
          {/* Roads SVG lines */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d5dcda" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Main avenues */}
            {/* Av. Brig. Faria Lima */}
            <path
              d="M -50 80 L 900 380"
              stroke="#ffffff"
              strokeWidth="24"
              fill="none"
            />
            <path
              d="M -50 80 L 900 380"
              stroke="#fbd59a"
              strokeWidth="16"
              fill="none"
            />

            {/* Av. dos Bandeirantes */}
            <path
              d="M -100 420 L 900 410"
              stroke="#ffffff"
              strokeWidth="20"
              fill="none"
            />
            <path
              d="M -100 420 L 900 410"
              stroke="#fbd59a"
              strokeWidth="12"
              fill="none"
            />

            {/* Av. Hélio Pelegrino */}
            <path
              d="M 320 -50 L 520 500"
              stroke="#ffffff"
              strokeWidth="18"
              fill="none"
            />
            <path
              d="M 320 -50 L 520 500"
              stroke="#fedba0"
              strokeWidth="10"
              fill="none"
            />

            {/* Secondary local streets */}
            <path d="M 120 0 L 220 500" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path d="M 0 250 L 800 230" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path d="M 0 150 L 800 130" stroke="#ffffff" strokeWidth="6" fill="none" />
            <path d="M 400 0 L 400 500" stroke="#ffffff" strokeWidth="6" fill="none" />
            <path d="M 600 0 L 600 500" stroke="#ffffff" strokeWidth="6" fill="none" />

            {/* Pinheiros river representation on left */}
            <path
              d="M 30 -50 Q 60 200 40 500"
              stroke="#aadaff"
              strokeWidth="48"
              fill="none"
            />
            {/* Green park zones */}
            <rect x="70" y="20" width="130" height="90" rx="20" fill="#cbe6c4" opacity="0.8" />
            <rect x="520" y="80" width="160" height="120" rx="30" fill="#cbe6c4" opacity="0.8" />
          </svg>
        </div>

        {/* Street labels */}
        <div className="absolute top-28 left-44 sm:left-64 text-[11px] font-bold text-neutral-600 tracking-wider rotate-[19deg] select-none pointer-events-none">
          AV. BRIGADEIRO FARIA LIMA
        </div>
        <div className="absolute bottom-14 left-24 sm:left-48 text-[11px] font-bold text-neutral-600 tracking-wider select-none pointer-events-none">
          AV. DOS BANDEIRANTES
        </div>
        <div className="absolute top-12 left-16 text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full select-none pointer-events-none">
          Parque do Povo
        </div>

        {/* Center Airbnb radar pulse marker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Radar glow circle */}
            <div className="w-36 h-36 rounded-full bg-[#FF385C]/15 border-2 border-[#FF385C]/30 animate-pulse flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FF385C]/25 flex items-center justify-center" />
            </div>

            {/* Center icon badge */}
            <div className="absolute w-12 h-12 rounded-full bg-[#FF385C] text-white shadow-xl flex items-center justify-center border-2 border-white scale-110">
              <BeloLogo className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Map control widgets */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-1 z-10">
          <button
            onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
            className="w-10 h-10 bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg shadow-md flex items-center justify-center border border-neutral-200 transition font-bold"
            aria-label="Aumentar zoom"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(12, z - 1))}
            className="w-10 h-10 bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg shadow-md flex items-center justify-center border border-neutral-200 transition font-bold"
            aria-label="Diminuir zoom"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Exact Location disclaimer pill */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-xs text-neutral-800 text-xs font-semibold py-2 px-3.5 rounded-xl shadow-md border border-neutral-200 max-w-[280px] sm:max-w-none">
          Localização aproximada na Vila Olímpia (o endereço exato é fornecido após a reserva)
        </div>
      </div>

      {/* Proximity Points of Interest */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <ShoppingBag className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">Shop. Vila Olímpia</div>
            <div className="text-[11px] text-neutral-500">400m · 5 min a pé</div>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <Building2 className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">Av. Faria Lima</div>
            <div className="text-[11px] text-neutral-500">600m · 7 min a pé</div>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <ShoppingBag className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">JK Iguatemi</div>
            <div className="text-[11px] text-neutral-500">1 km · 12 min a pé</div>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <TreePine className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">Parque do Povo</div>
            <div className="text-[11px] text-neutral-500">1,2 km · 15 min a pé</div>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <Train className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">Estação CPTM</div>
            <div className="text-[11px] text-neutral-500">Linha 9 Esmeralda</div>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-2xl flex flex-col justify-between">
          <Plane className="w-5 h-5 text-neutral-700 mb-1" />
          <div>
            <div className="text-xs font-bold text-neutral-900">Aerop. Congonhas</div>
            <div className="text-[11px] text-neutral-500">15 min de carro</div>
          </div>
        </div>
      </div>

      {/* Neighborhood Narrative */}
      <div className="mt-6 text-sm text-neutral-700 leading-relaxed max-w-3xl">
        <h3 className="font-semibold text-base text-[#222222] mb-2">Sobre a Vila Olímpia</h3>
        <p className="whitespace-pre-line">
          {showFullNeighborhood
            ? `A Vila Olímpia é um dos bairros mais vibrantes, seguros e cosmopolitas de São Paulo. Conhecida como um dos principais pólos de tecnologia e finanças da América Latina, abriga sedes de gigantes como Google, Facebook/Meta e Microsoft, além de importantes fundos de investimento na vizinha Faria Lima.\n\nDurante o dia, você tem à disposição renomadas padarias artesanais, cafeterias especiais, supermercados e os shoppings JK Iguatemi e Vila Olímpia. À noite, o bairro ganha vida com alta gastronomia, bares charmosos e renomadas casas noturnas.`
            : `A Vila Olímpia é um dos bairros mais vibrantes, seguros e cosmopolitas de São Paulo. Conhecida como um dos principais pólos de tecnologia e finanças da América Latina, abriga sedes de gigantes mundiais e os melhores shoppings da cidade.`}
        </p>
        <button
          onClick={() => setShowFullNeighborhood(!showFullNeighborhood)}
          className="mt-2 font-semibold underline text-[#222222] hover:text-black"
        >
          {showFullNeighborhood ? 'Mostrar menos' : 'Saiba mais sobre o bairro >'}
        </button>
      </div>
    </section>
  );
};
