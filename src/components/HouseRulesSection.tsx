import React, { useState } from 'react';
import { Clock, Shield, AlertTriangle, ChevronRight, Ban, Volume2 } from 'lucide-react';
import { ListingData } from '../types';

interface HouseRulesSectionProps {
  houseRules: ListingData['houseRules'];
}

export const HouseRulesSection: React.FC<HouseRulesSectionProps> = ({ houseRules }) => {
  const [showFullCancellation, setShowFullCancellation] = useState(false);

  return (
    <section className="py-10 border-t border-neutral-200 text-[#222222]">
      <h2 className="text-2xl font-bold mb-6">Regras e avisos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Regras da casa */}
        <div>
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <span>Regras da casa</span>
          </h3>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
              <span>Check-in: {houseRules.checkIn}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
              <span>Checkout: {houseRules.checkOut}</span>
            </li>
            {houseRules.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Ban className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Segurança e propriedade */}
        <div>
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <span>Segurança e propriedade</span>
          </h3>
          <ul className="space-y-3 text-sm text-neutral-700">
            {houseRules.safety.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Política de cancelamento */}
        <div>
          <h3 className="font-bold text-base mb-3">Política de cancelamento</h3>
          <p className="text-sm text-neutral-700 leading-relaxed mb-3">
            {showFullCancellation
              ? houseRules.cancellation
              : 'Cancelamento gratuito até 48 horas antes da data de check-in (10 de mai. de 2026).'}
          </p>
          <button
            onClick={() => setShowFullCancellation(!showFullCancellation)}
            className="flex items-center gap-1 text-sm font-semibold underline text-neutral-900 hover:text-black"
          >
            <span>{showFullCancellation ? 'Mostrar menos' : 'Mostrar mais'}</span>
            <ChevronRight className={`w-4 h-4 transition ${showFullCancellation ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
