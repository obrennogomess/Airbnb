import React, { useState } from 'react';
import {
  X,
  Search,
  Wifi,
  Wind,
  Laptop,
  Key,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Bed,
  Trees,
  CheckCheck,
  ShieldCheck,
  Car,
  CigaretteOff,
  AlertTriangle,
  FolderCheck,
  Droplets,
  Flame,
  Microwave,
  Coffee,
  HeartPulse,
  Camera,
  ShieldAlert,
} from 'lucide-react';
import { Amenity } from '../../types';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenities: Amenity[];
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  onClose,
  amenities,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const iconMap: Record<string, React.ElementType> = {
    Wifi,
    Wind,
    Laptop,
    Key,
    UtensilsCrossed,
    Sparkles,
    Shirt,
    Bed,
    Trees,
    CheckCheck,
    ShieldCheck,
    Car,
    CigaretteOff,
    AlertTriangle,
    FolderCheck,
    Droplets,
    Flame,
    Microwave,
    Coffee,
    HeartPulse,
    Camera,
    ShieldAlert,
  };

  // Group by category
  const filteredAmenities = amenities.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(filteredAmenities.map((a) => a.category)));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
          <h3 className="font-bold text-base text-neutral-900">O que esse lugar oferece</h3>
          <div className="w-9" />
        </div>

        {/* Search input */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar comodidades (ex: wifi, ar-condicionado, ferro...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition"
            />
          </div>
        </div>

        {/* Body content grouped */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {categories.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-sm">
              Nenhuma comodidade encontrada com "{searchTerm}"
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat} className="space-y-4">
                <h4 className="font-bold text-base text-neutral-900 border-b border-neutral-100 pb-2">
                  {cat}
                </h4>
                <div className="space-y-4">
                  {filteredAmenities
                    .filter((a) => a.category === cat)
                    .map((item) => {
                      const IconComponent = iconMap[item.iconName] || Sparkles;
                      return (
                        <div key={item.id} className="flex items-center gap-4 text-sm text-neutral-800">
                          <IconComponent
                            className={`w-5 h-5 shrink-0 ${
                              item.available ? 'text-neutral-700' : 'text-neutral-400'
                            }`}
                          />
                          <span
                            className={
                              item.available
                                ? 'text-neutral-800'
                                : 'text-neutral-400 line-through'
                            }
                          >
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
