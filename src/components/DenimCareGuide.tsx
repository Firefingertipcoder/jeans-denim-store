import React from 'react';
import { Droplet, Sun, Wind, Snowflake, ShieldCheck } from 'lucide-react';
import { BrandConfig } from '../types';

interface DenimCareGuideProps {
  config: BrandConfig;
}

export const DenimCareGuide: React.FC<DenimCareGuideProps> = ({ config }) => {
  const careSteps = [
    {
      icon: Droplet,
      title: "1. Wash Less Often",
      desc: "Raw & selvedge denim only needs washing every 10–15 wears. Spot-clean minor stains with a damp cloth to preserve original indigo honeycombs."
    },
    {
      icon: Snowflake,
      title: "2. Cold Water Soak Only",
      desc: "Turn jeans inside out and submerge in cold water with mild detergent. Hot water breaks down cotton fibers and causes unwanted shrinkage."
    },
    {
      icon: Wind,
      title: "3. Always Line Dry",
      desc: "Never toss raw jeans in the tumble dryer. Hang them upside down in a shaded, well-ventilated space to preserve the fit and crisp hand-feel."
    },
    {
      icon: ShieldCheck,
      title: "4. The Freeze Trick",
      desc: "Between washes, fold your jeans into a canvas bag and freeze overnight to neutralize bacteria and odor without losing crisp indigo character."
    }
  ];

  return (
    <section id="denim-care-guide-section" className="py-14 sm:py-20 bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-stone-500">
            PRESERVE YOUR INVESTMENT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-stone-900 mt-1">
            HOW TO CARE FOR YOUR DENIM
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            The less you wash raw denim, the better it looks. Follow these golden rules to let your jeans develop personal whiskering, honeycombs, and fades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xs border border-stone-200 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div 
                    className="w-10 h-10 rounded-xs flex items-center justify-center mb-4 text-white shadow-xs"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
