import React, { useState } from 'react';
import { X, Mail, Phone, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
          <h3 className="font-bold text-base text-neutral-900">Entrar ou cadastrar-se</h3>
          <div className="w-9" />
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="text-xl font-bold text-neutral-900">Bem-vindo(a) de volta!</div>
            <p className="text-sm text-neutral-600">Sessão iniciada no Airbnb.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-xl font-bold text-neutral-900">
              Bem-vindo(a) ao Airbnb
            </h4>

            <div className="border border-neutral-300 rounded-2xl overflow-hidden focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900">
              <div className="p-3 border-b border-neutral-300 bg-neutral-50/50">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase">
                  País / Região
                </label>
                <div className="text-sm font-medium text-neutral-800">
                  Brasil (+55)
                </div>
              </div>
              <div className="p-3">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase">
                  Número de telefone
                </label>
                <input
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-sm font-medium focus:outline-none text-neutral-900"
                  required
                />
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Ligaremos ou enviaremos uma mensagem de texto para confirmar seu número. Taxas padrão de dados e mensagens podem ser aplicadas.
            </p>

            <button
              type="submit"
              className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white font-bold py-3.5 px-6 rounded-xl transition shadow-sm"
            >
              Continuar
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-[1px] bg-neutral-200 flex-1" />
              <span className="text-xs text-neutral-500 font-medium">ou</span>
              <div className="h-[1px] bg-neutral-200 flex-1" />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full border border-neutral-300 hover:border-neutral-800 font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition"
              >
                <Mail className="w-4 h-4 text-neutral-700" />
                <span>Continuar com email</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
