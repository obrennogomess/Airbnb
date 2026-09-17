import React, { useState } from 'react';
import { X, ChevronLeft, ShieldCheck, CheckCircle2, CreditCard, QrCode, FileText } from 'lucide-react';
import { ListingData, ReservationParams } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
  reservation: ReservationParams;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  listing,
  reservation,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'boleto'>('pix');
  const [isBooked, setIsBooked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Nights calculation
  const start = new Date(reservation.checkIn);
  const end = new Date(reservation.checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 7;

  const basePrice = listing.pricePerNight * nights;
  const cleaningFee = listing.cleaningFee;
  const serviceFee = Math.round(basePrice * listing.serviceFeePercent);
  const totalPrice = basePrice + cleaningFee + serviceFee;
  const totalGuests = reservation.adults + reservation.children;

  const handleConfirmReservation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsBooked(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl my-8 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={resetAndClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition flex items-center gap-1 text-sm font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
            Confirmar e pagar
          </h2>
          <div className="w-8" />
        </div>

        {isBooked ? (
          /* Confirmation state */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center max-w-md mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Reserva confirmada com sucesso!
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              Sua estadia na Vila Olímpia com o anfitrião {listing.host.name} está garantida para{' '}
              {reservation.checkIn} a {reservation.checkOut}.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 w-full text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-500">Código de reserva:</span>
                <span className="font-mono font-bold text-neutral-800">HM-SP-16506814</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Check-in autônomo:</span>
                <span className="font-semibold text-neutral-800">Senha enviada no app</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total pago:</span>
                <span className="font-bold text-neutral-900">R$ {totalPrice.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white font-bold py-3 px-6 rounded-xl transition"
            >
              Concluir e voltar ao anúncio
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto max-h-[80vh]">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trip info */}
              <div className="space-y-3 pb-6 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900">Sua viagem</h3>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-neutral-900">Datas</div>
                    <div className="text-neutral-600">
                      10 a 17 de mai. de 2026 ({nights} noites)
                    </div>
                  </div>
                  <button className="underline font-semibold text-neutral-900">Editar</button>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <div>
                    <div className="font-semibold text-neutral-900">Hóspedes</div>
                    <div className="text-neutral-600">
                      {totalGuests} {totalGuests === 1 ? 'hóspede' : 'hóspedes'}
                    </div>
                  </div>
                  <button className="underline font-semibold text-neutral-900">Editar</button>
                </div>
              </div>

              {/* Payment selection */}
              <div className="space-y-4 pb-6 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900">Pague com</h3>

                <div className="space-y-2">
                  {/* PIX */}
                  <div
                    onClick={() => setPaymentMethod('pix')}
                    className={`border rounded-2xl p-4 cursor-pointer flex items-center justify-between transition ${
                      paymentMethod === 'pix'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-neutral-900">Pix</div>
                        <div className="text-xs text-neutral-500">Aprovação instantânea sem taxas</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'pix' ? 'border-neutral-900' : 'border-neutral-300'}`}>
                      {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />}
                    </div>
                  </div>

                  {/* Cartão de Crédito */}
                  <div
                    onClick={() => setPaymentMethod('credit')}
                    className={`border rounded-2xl p-4 cursor-pointer flex items-center justify-between transition ${
                      paymentMethod === 'credit'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-neutral-900">Cartão de Crédito</div>
                        <div className="text-xs text-neutral-500">Parcele em até 6x sem juros</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'credit' ? 'border-neutral-900' : 'border-neutral-300'}`}>
                      {paymentMethod === 'credit' && <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />}
                    </div>
                  </div>

                  {/* Boleto */}
                  <div
                    onClick={() => setPaymentMethod('boleto')}
                    className={`border rounded-2xl p-4 cursor-pointer flex items-center justify-between transition ${
                      paymentMethod === 'boleto'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-neutral-900">Boleto Bancário</div>
                        <div className="text-xs text-neutral-500">Compensação em até 3 dias úteis</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'boleto' ? 'border-neutral-900' : 'border-neutral-300'}`}>
                      {paymentMethod === 'boleto' && <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation policy */}
              <div className="space-y-2 pb-6 border-b border-neutral-200 text-sm">
                <h3 className="font-bold text-neutral-900">Política de cancelamento</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Cancelamento gratuito até 48 horas antes do check-in (10 de mai. de 2026).
                  Reembolso integral garantido pelo Airbnb.
                </p>
              </div>

              {/* Confirm button */}
              <div>
                <button
                  onClick={handleConfirmReservation}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] text-white font-bold text-base py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processando reserva...</span>
                    </div>
                  ) : (
                    <span>Confirmar e pagar · R$ {totalPrice.toLocaleString('pt-BR')}</span>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-[#FF385C]" />
                  <span>Pagamento 100% criptografado e seguro</span>
                </div>
              </div>
            </div>

            {/* Right Column: Listing Card & Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="border border-neutral-200 rounded-3xl p-5 bg-neutral-50/60 sticky top-4 space-y-4">
                {/* Mini property card */}
                <div className="flex gap-3 pb-4 border-b border-neutral-200">
                  <img
                    src={listing.photos[0].url}
                    alt={listing.title}
                    className="w-24 h-24 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        {listing.roomType}
                      </span>
                      <h4 className="font-bold text-sm text-neutral-900 line-clamp-2">
                        {listing.title}
                      </h4>
                    </div>
                    <div className="text-xs font-semibold text-neutral-800">
                      ★ {listing.rating} ({listing.reviewCount} avaliações) · Superhost
                    </div>
                  </div>
                </div>

                {/* AirCover mini */}
                <div className="text-xs text-neutral-600 pb-4 border-b border-neutral-200">
                  Sua reserva está protegida pelo <strong className="text-[#FF385C]">AirCover</strong>.
                </div>

                {/* Price summary */}
                <div className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                  <h4 className="font-bold text-sm text-neutral-900 mb-2">Informações de preço</h4>
                  <div className="flex justify-between">
                    <span>R$ {listing.pricePerNight} x {nights} noites</span>
                    <span>R$ {basePrice.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de limpeza</span>
                    <span>R$ {cleaningFee.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de serviço do Airbnb</span>
                    <span>R$ {serviceFee.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="h-[1px] bg-neutral-200 my-2" />
                  <div className="flex justify-between font-bold text-base text-neutral-900">
                    <span>Total (BRL)</span>
                    <span>R$ {totalPrice.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
