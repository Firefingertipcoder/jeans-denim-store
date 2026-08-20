import React from 'react';
import { BrandConfig } from '../types';
import { Droplets, Sparkles, Shield, Recycle, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  config: BrandConfig;
  onExploreCollection: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ config, onExploreCollection }) => {
  return (
    <section id="brand-story-heritage-section" className="bg-stone-900 text-white py-10 sm:py-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center mb-10 sm:mb-16">
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400" />
              <span>CRAFTED SINCE {config.brandEstYear || '1873'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {config.storiesHeadline}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl font-normal">
              {config.storiesSubtitle}
            </p>

            <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed max-w-xl hidden sm:block">
              From gold rush miners and rock-and-roll legends to modern street culture, genuine selvedge denim is an authentic canvas of living history that shapes to you.
            </p>

            <div className="pt-2 sm:pt-4">
              <button
                id="explore-heritage-collection-btn"
                onClick={onExploreCollection}
                className="px-5 sm:px-6 py-2.5 sm:py-3.5 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg hover:brightness-110 active:scale-95"
                style={{ backgroundColor: config.primaryColor }}
              >
                EXPLORE ROOTS &rarr;
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-4">
            <div className="space-y-2.5 sm:space-y-4">
              <div className="aspect-3/4 overflow-hidden rounded-xs bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
                  alt="Denim heritage craftsmanship"
                  className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 sm:p-3 bg-stone-800/80 border border-stone-700/60 rounded-xs text-[10px] sm:text-[11px] text-stone-300">
                <strong className="text-white block uppercase font-bold text-[10px] sm:text-xs mb-0.5">Heavyweight Weave</strong>
                Durable double-stitched selvedge seam construction.
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-4 pt-3 sm:pt-6">
              <div className="p-2.5 sm:p-3 bg-stone-800/80 border border-stone-700/60 rounded-xs text-[10px] sm:text-[11px] text-stone-300">
                <strong className="text-white block uppercase font-bold text-[10px] sm:text-xs mb-0.5">Riveted Hardware</strong>
                Industrial grade reinforcement at stress points.
              </div>
              <div className="aspect-3/4 overflow-hidden rounded-xs bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
                  alt="Denim jackets styling"
                  className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Bar */}
        <div className="bg-stone-950 p-4 sm:p-8 rounded-xs border border-stone-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
              <Recycle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>SUSTAINABILITY COMMITMENT</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white">
              {config.sustainableHeadline}
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">
              {config.sustainableText}
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2.5 sm:p-4 bg-stone-900/90 rounded-xs border border-stone-800">
              <Droplets className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-sm sm:text-2xl font-black text-white">4.2B+</div>
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-bold mt-0.5">Water Saved</div>
            </div>

            <div className="p-2.5 sm:p-4 bg-stone-900/90 rounded-xs border border-stone-800">
              <Recycle className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-sm sm:text-2xl font-black text-white">96%</div>
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-bold mt-0.5">Recycled H2O</div>
            </div>

            <div className="p-2.5 sm:p-4 bg-stone-900/90 rounded-xs border border-stone-800">
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400 mx-auto mb-1.5" />
              <div className="text-sm sm:text-2xl font-black text-white">100%</div>
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-bold mt-0.5">Ethical Cotton</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
