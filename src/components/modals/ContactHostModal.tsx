import React, { useState } from 'react';
import { X, Send, Award, CheckCircle2 } from 'lucide-react';
import { HostInfo } from '../../types';

interface ContactHostModalProps {
  isOpen: boolean;
  onClose: () => void;
  host: HostInfo;
}

export const ContactHostModal: React.FC<ContactHostModalProps> = ({
  isOpen,
  onClose,
  host,
}) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'O Wi-Fi tem velocidade suficiente para chamadas de vídeo do trabalho?',
    'É possível antecipar o check-in no dia 10 de maio?',
    'Como funciona o uso da cozinha compartilhada?',
    'Há estacionamento seguro por perto?',
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={host.avatar}
                alt={host.name}
                className="w-12 h-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full">
                <Award className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">
                Fale com {host.name}
              </h3>
              <p className="text-xs text-neutral-500">
                Responde geralmente em {host.responseTime}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {sent ? (
          <div className="py-12 text-center flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg text-neutral-900">Mensagem enviada!</h4>
            <p className="text-sm text-neutral-500 max-w-xs">
              Fernando receberá sua mensagem no aplicativo do Airbnb e responderá em breve.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick prompts */}
            <div>
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider block mb-2">
                Dúvidas frequentes:
              </label>
              <div className="space-y-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(prompt)}
                    className="w-full text-left text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-700 p-2.5 rounded-xl border border-neutral-200 transition"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Custom message input */}
            <div>
              <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider block mb-2">
                Sua mensagem:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Olá ${host.name}! Gostaria de saber mais sobre o quarto na Vila Olímpia...`}
                className="w-full p-3.5 border border-neutral-300 rounded-2xl text-sm focus:outline-none focus:border-neutral-900 transition resize-none"
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-full bg-[#FF385C] hover:bg-[#E00B41] disabled:opacity-40 text-white font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar mensagem</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
