import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface LanguageCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageCurrencyModal: React.FC<LanguageCurrencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<'lang' | 'curr'>('lang');
  const [selectedLang, setSelectedLang] = useState('pt-BR');
  const [selectedCurr, setSelectedCurr] = useState('BRL');

  if (!isOpen) return null;

  const languages = [
    { code: 'pt-BR', name: 'Português', region: 'Brasil' },
    { code: 'en-US', name: 'English', region: 'United States' },
    { code: 'es-ES', name: 'Español', region: 'España' },
    { code: 'fr-FR', name: 'Français', region: 'France' },
    { code: 'de-DE', name: 'Deutsch', region: 'Deutschland' },
    { code: 'it-IT', name: 'Italiano', region: 'Italia' },
  ];

  const currencies = [
    { code: 'BRL', symbol: 'R$', name: 'Real brasileiro' },
    { code: 'USD', symbol: '$', name: 'Dólar americano' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'Libra esterlina' },
    { code: 'CAD', symbol: '$', name: 'Dólar canadense' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setTab('lang')}
              className={`font-bold text-base pb-1 border-b-2 transition ${
                tab === 'lang'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Idioma e região
            </button>
            <button
              onClick={() => setTab('curr')}
              className={`font-bold text-base pb-1 border-b-2 transition ${
                tab === 'curr'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Moeda
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {tab === 'lang' ? (
          <div className="grid grid-cols-2 gap-3">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setSelectedLang(l.code);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  selectedLang === l.code
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-900">{l.name}</div>
                  <div className="text-xs text-neutral-500">{l.region}</div>
                </div>
                {selectedLang === l.code && <Check className="w-4 h-4 text-neutral-900" />}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setSelectedCurr(c.code);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  selectedCurr === c.code
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-900">
                    {c.name} ({c.symbol})
                  </div>
                  <div className="text-xs text-neutral-500">{c.code}</div>
                </div>
                {selectedCurr === c.code && <Check className="w-4 h-4 text-neutral-900" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
