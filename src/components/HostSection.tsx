import React from 'react';
import { Award, ShieldCheck, MessageSquare, Star, Clock, CheckCircle2 } from 'lucide-react';
import { HostInfo } from '../types';

interface HostSectionProps {
  host: HostInfo;
  onOpenMessageModal: () => void;
}

export const HostSection: React.FC<HostSectionProps> = ({
  host,
  onOpenMessageModal,
}) => {
  return (
    <section className="py-10 border-t border-neutral-200 text-[#222222]">
      {/* Host Profile Header Card */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
        <div className="flex items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm border border-neutral-200"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 bg-[#FF385C] text-white p-1.5 rounded-full shadow-md">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#222222]">
              Hospedado por {host.name}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Superhost há {host.yearsHosting} anos · Cadastrou-se em 2014
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm font-semibold text-neutral-800">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-neutral-900" />
                <span>{host.rating} ({host.reviewCount} avaliações)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#FF385C]" />
                <span>Identidade verificada</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#FF385C]" />
                <span>Superhost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Co-host tag */}
        {host.coHosts && host.coHosts.length > 0 && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center gap-3 shrink-0 self-start">
            <img
              src={host.coHosts[0].avatar}
              alt={host.coHosts[0].name}
              className="w-10 h-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs text-neutral-500">{host.coHosts[0].role}</div>
              <div className="text-sm font-bold text-neutral-900">{host.coHosts[0].name}</div>
            </div>
          </div>
        )}
      </div>

      {/* Host Narrative & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-base mb-2">Fernando é um Superhost</h3>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            Superhosts são anfitriões experientes e com excelentes avaliações, comprometidos em oferecer estadias incríveis para seus hóspedes.
          </p>

          <h3 className="font-bold text-base mb-2">Sobre o anfitrião</h3>
          <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
            {host.about}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
            <div className="text-sm font-semibold text-neutral-900">Detalhes da hospedagem:</div>
            <div className="text-sm text-neutral-700 flex items-center justify-between">
              <span>Taxa de resposta:</span>
              <strong className="text-neutral-900">{host.responseRate}</strong>
            </div>
            <div className="text-sm text-neutral-700 flex items-center justify-between">
              <span>Tempo de resposta:</span>
              <strong className="text-neutral-900">{host.responseTime}</strong>
            </div>
          </div>

          <button
            onClick={onOpenMessageModal}
            className="w-full sm:w-auto border border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-900 font-semibold text-sm py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Fale com o anfitrião</span>
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 text-xs text-neutral-500 pt-4 border-t border-neutral-100">
        <ShieldCheck className="w-5 h-5 text-[#FF385C] shrink-0" />
        <p>
          Para proteger seu pagamento, nunca transfira dinheiro ou se comunique fora do site ou aplicativo do Airbnb.
        </p>
      </div>
    </section>
  );
};
