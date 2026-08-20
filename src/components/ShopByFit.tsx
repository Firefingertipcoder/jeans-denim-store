import React from 'react';
import { DenimFit, Gender, BrandConfig } from '../types';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface ShopByFitProps {
  config: BrandConfig;
  onSelectFit: (fit: DenimFit, gender?: Gender) => void;
  onOpenFitGuide: () => void;
}

interface FitCardItem {
  id: string;
  name: DenimFit;
  code: string;
  tagline: string;
  rise: string;
  leg: string;
  gender: Gender;
  imageUrl: string;
}

const FIT_CARDS: FitCardItem[] = [
  {
    id: 'fit-501',
    name: 'Straight',
    code: '501® ORIGINAL',
    tagline: 'Timeless Straight Leg with Signature Button Fly',
    rise: 'Mid/High Rise',
    leg: '16.5" Straight',
    gender: 'All',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fit-511',
    name: 'Slim',
    code: '511™ SLIM',
    tagline: 'Modern Slim Through Hip & Thigh with Added Stretch',
    rise: 'Mid Rise',
    leg: '14.5" Slim Leg',
    gender: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fit-ribcage',
    name: 'Straight',
    code: 'RIBCAGE HIGH RISE',
    tagline: '12-Inch Super High Rise with Sculpting Waistline',
    rise: 'Ultra High Rise',
    leg: '17" Straight Ankle',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fit-512',
    name: 'Slim Taper',
    code: '512™ SLIM TAPER',
    tagline: 'Tailored Taper to Highlight Your Sneakers',
    rise: 'Mid Rise',
    leg: '12.75" Tapered',
    gender: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fit-711',
    name: 'Skinny',
    code: '711™ SKINNY',
    tagline: 'Sculpting Stretch That Holds and Flatters Curves',
    rise: 'Mid Rise',
    leg: '10.5" Skinny',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fit-flare',
    name: 'Bootcut & Flare',
    code: '70S HIGH FLARE',
    tagline: 'Retro Bell Bottom with Elongating Silhouette',
    rise: 'High Rise',
    leg: '22" Flared',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
  }
];

export const ShopByFit: React.FC<ShopByFitProps> = ({ config, onSelectFit, onOpenFitGuide }) => {
  return (
    <section id="shop-by-fit-section" className="py-14 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
              <span className="w-3 h-0.5" style={{ backgroundColor: config.primaryColor }} />
              <span>THE ARCHIVE SPECIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              EXPLORE SIGNATURE SILHOUETTES
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              From our revolutionary 1873 501® Straight to sculpted high-rise and tailored slim tapers.
            </p>
          </div>

          <button
            id="open-fit-guide-from-section-btn"
            onClick={onOpenFitGuide}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-black hover:text-[#E11D48] transition-colors border-b border-black pb-1 self-start md:self-end"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Fit & Size Guide &rarr;</span>
          </button>
        </div>

        {/* Fit Cards: Horizontal Scroll on Mobile, Grid on Tablet/Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-0 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-none sm:border-t sm:border-l border-gray-100 snap-x">
          {FIT_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectFit(card.name, card.gender)}
              className="min-w-[240px] max-w-[260px] sm:min-w-0 sm:max-w-none snap-start group bg-white border sm:border-0 sm:border-r sm:border-b border-gray-100 overflow-hidden cursor-pointer flex flex-col justify-between relative transition-colors hover:bg-[#FAFAFA]"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={card.imageUrl}
                  alt={card.code}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                {/* Badge on top left */}
                <div 
                  className="absolute top-3 left-3 text-white text-[9px] font-black uppercase px-2 py-0.5 tracking-widest"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {card.gender}
                </div>

                {/* Model Code Overlay at bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                  <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest block">Fit: {card.name}</span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">{card.code}</h3>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-3.5 sm:p-5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-gray-500 mb-2.5 font-normal leading-relaxed line-clamp-1 sm:line-clamp-none">{card.tagline}</p>
                  
                  {/* Silhouette Specs */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#F8F8F8] p-2 border border-gray-100 mb-3">
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[8px] tracking-wider">Rise</span>
                      <span className="font-bold text-black text-[10px]">{card.rise}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[8px] tracking-wider">Leg Opening</span>
                      <span className="font-bold text-black text-[10px]">{card.leg}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-black group-hover:text-[#E11D48] pt-2 border-t border-gray-100 transition-colors">
                  <span>Shop {card.name}</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
