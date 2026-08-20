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
    <section id="denim-care-guide-section" className="py-8 sm:py-16 bg-[#F9F9F9] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-gray-500">
            PRESERVE YOUR INVESTMENT
          </span>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-gray-900 mt-0.5">
            HOW TO CARE FOR YOUR DENIM
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-600 mt-1 max-w-lg mx-auto">
            The less you wash raw denim, the better it looks. Follow these golden rules to let your jeans develop personal whiskering and fades.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {careSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-3.5 sm:p-5 border border-gray-200 flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                <div>
                  <div 
                    className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center mb-2.5 text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-black uppercase text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
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
