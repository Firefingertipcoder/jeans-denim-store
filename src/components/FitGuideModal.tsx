import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { FIT_GUIDE_DATA } from '../data/initialData';
import { DenimFit, BrandConfig } from '../types';

interface FitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  onSelectFit: (fit: DenimFit) => void;
}

export const FitGuideModal: React.FC<FitGuideModalProps> = ({
  isOpen,
  onClose,
  config,
  onSelectFit,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'finder' | 'silhouettes' | 'rises' | 'stretch'>('finder');
  
  // Interactive Size Calculator State
  const [waistInches, setWaistInches] = useState<number>(32);
  const [heightFeet, setHeightFeet] = useState<string>('5ft 10in (178 cm)');
  const [preference, setPreference] = useState<'fitted' | 'classic' | 'relaxed'>('classic');
  const [genderCalc, setGenderCalc] = useState<'Men' | 'Women'>('Men');

  // Calculated fit recommendation
  const getRecommendedSize = () => {
    let recommendedWaist = waistInches;
    if (preference === 'relaxed') recommendedWaist += 1;
    if (preference === 'fitted') recommendedWaist = Math.max(24, recommendedWaist - 1);

    let recommendedInseam = 32;
    if (heightFeet.includes('5ft 4') || heightFeet.includes('5ft 6')) recommendedInseam = 30;
    if (heightFeet.includes('6ft') || heightFeet.includes('6ft 2')) recommendedInseam = 34;

    const recommendedModel = genderCalc === 'Men' 
      ? (preference === 'fitted' ? '511™ Slim / 512™ Slim Taper' : (preference === 'classic' ? '501® Original Straight' : '550™ Relaxed'))
      : (preference === 'fitted' ? '711™ Skinny' : (preference === 'classic' ? 'Ribcage Straight Ankle' : 'Baggy Dad Relaxed'));

    return {
      size: `${recommendedWaist}x${recommendedInseam}`,
      model: recommendedModel,
      fitType: (preference === 'classic' ? 'Straight' : (preference === 'fitted' ? 'Slim' : 'Relaxed / Loose')) as DenimFit
    };
  };

  const recommendation = getRecommendedSize();

  return (
    <div id="fit-guide-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="fit-guide-modal-card"
        className="relative bg-white w-full max-w-4xl rounded-xs shadow-2xl overflow-hidden my-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div 
              className="px-2.5 py-1 text-white text-xs font-black uppercase tracking-wider"
              style={{ backgroundColor: config.primaryColor }}
            >
              {config.tabLabel}
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                THE ULTIMATE DENIM FIT & SIZE GUIDE
              </h2>
              <p className="text-xs text-stone-400">
                Find your signature rise, stretch ratio, and millimeter-precise waist measurement.
              </p>
            </div>
          </div>

          <button
            id="close-fit-guide-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('finder')}
            className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'finder' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Size Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('silhouettes')}
            className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'silhouettes' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            All Cut Silhouettes
          </button>

          <button
            onClick={() => setActiveTab('rises')}
            className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'rises' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Rise Comparison (Low vs Mid vs High)
          </button>

          <button
            onClick={() => setActiveTab('stretch')}
            className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'stretch' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Rigid Cotton vs Stretch Fabric
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* TAB 1: Interactive Size Finder */}
          {activeTab === 'finder' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Inputs */}
                <div className="md:col-span-7 space-y-4 bg-stone-50 p-5 rounded-xs border border-stone-200">
                  <h3 className="text-sm font-black uppercase text-stone-900">
                    Input Your Dimensions
                  </h3>

                  {/* Gender */}
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Gender</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Men', 'Women'] as const).map((g) => (
                        <button
                          key={g}
                          onClick={() => setGenderCalc(g)}
                          className={`py-2 text-xs font-bold uppercase rounded-xs transition-colors ${
                            genderCalc === g ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-300'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Natural Waist Measurement Slider */}
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase text-stone-600 mb-1">
                      <span>Natural Waist Measurement:</span>
                      <span className="text-sm font-black text-stone-900">{waistInches} Inches ({Math.round(waistInches * 2.54)} cm)</span>
                    </div>
                    <input
                      type="range"
                      min={24}
                      max={42}
                      value={waistInches}
                      onChange={(e) => setWaistInches(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                    />
                    <div className="flex justify-between text-[9px] text-stone-400 font-bold mt-1">
                      <span>24" (Extra Petite)</span>
                      <span>32" (Standard)</span>
                      <span>42" (Plus)</span>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Approximate Height</label>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full text-xs font-bold p-2 bg-white border border-stone-300 rounded-xs"
                    >
                      <option value="5ft 2in (157 cm)">5ft 2in - 5ft 4in (Inseam ~ 28"-30")</option>
                      <option value="5ft 6in (168 cm)">5ft 5in - 5ft 7in (Inseam ~ 30")</option>
                      <option value="5ft 10in (178 cm)">5ft 8in - 6ft 0in (Inseam ~ 32")</option>
                      <option value="6ft 2in (188 cm)">6ft 1in - 6ft 4in (Inseam ~ 34")</option>
                    </select>
                  </div>

                  {/* Fit Preference */}
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Fit Feel Preference</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPreference('fitted')}
                        className={`py-2 text-[11px] font-bold uppercase rounded-xs ${
                          preference === 'fitted' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-300'
                        }`}
                      >
                        Snug / Slim
                      </button>
                      <button
                        onClick={() => setPreference('classic')}
                        className={`py-2 text-[11px] font-bold uppercase rounded-xs ${
                          preference === 'classic' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-300'
                        }`}
                      >
                        Original Straight
                      </button>
                      <button
                        onClick={() => setPreference('relaxed')}
                        className={`py-2 text-[11px] font-bold uppercase rounded-xs ${
                          preference === 'relaxed' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-300'
                        }`}
                      >
                        Relaxed / Baggy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Output Result Card */}
                <div className="md:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 text-white p-6 rounded-xs shadow-xl flex flex-col justify-between h-full border border-stone-800">
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>YOUR CUSTOM DENIM MATCH</span>
                    </div>

                    <div className="mt-3">
                      <span className="text-xs text-stone-400 block font-bold">Recommended Size</span>
                      <div className="text-4xl font-black tracking-tight text-white mt-0.5">
                        {recommendation.size}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-800">
                      <span className="text-xs text-stone-400 block font-bold">Recommended Style</span>
                      <h4 className="text-lg font-black text-white mt-0.5 uppercase">
                        {recommendation.model}
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 font-normal leading-relaxed">
                        Tailored for your height ({heightFeet.split(' ')[0]}) and {waistInches}" waistline with {preference} leg profile.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectFit(recommendation.fitType);
                      onClose();
                    }}
                    className="mt-6 w-full py-3 text-xs font-black uppercase tracking-widest text-white shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <span>SHOP THIS FIT NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Silhouettes */}
          {activeTab === 'silhouettes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIT_GUIDE_DATA.map((item) => (
                <div key={item.name} className="p-4 bg-stone-50 border border-stone-200 rounded-xs flex space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-xs border border-stone-300" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black uppercase text-stone-900">{item.name}</h4>
                      <span className="text-[10px] font-bold text-stone-500 bg-stone-200 px-1.5 py-0.5">{item.modelCode}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">{item.description}</p>
                    <div className="mt-2 text-[11px] space-y-0.5 text-stone-700">
                      <div><strong>Rise:</strong> {item.waistRise}</div>
                      <div><strong>Leg Opening:</strong> {item.legOpening}</div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectFit(item.name);
                        onClose();
                      }}
                      className="mt-3 text-xs font-black text-red-600 hover:underline uppercase tracking-wider block"
                    >
                      Shop {item.name} &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Rise Comparison */}
          {activeTab === 'rises' && (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                  <div className="text-xs font-black uppercase text-stone-900 mb-1">Ultra High Rise (12"+)</div>
                  <span className="text-[10px] font-bold text-stone-500 block mb-2">Example: Ribcage / 70s Flare</span>
                  <p className="text-stone-600 leading-relaxed">
                    Sits well above the belly button. Creates dramatic waist-cinching and lengthens legs for an elongated silhouette.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                  <div className="text-xs font-black uppercase text-stone-900 mb-1">Mid Rise (9" - 11")</div>
                  <span className="text-[10px] font-bold text-stone-500 block mb-2">Example: 501® Original, 511™ Slim</span>
                  <p className="text-stone-600 leading-relaxed">
                    Sits comfortably at the natural waistline. The most versatile everyday cut for comfort and ease of movement.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                  <div className="text-xs font-black uppercase text-stone-900 mb-1">Low Rise (7" - 8.5")</div>
                  <span className="text-[10px] font-bold text-stone-500 block mb-2">Example: Y2K Low Slung</span>
                  <p className="text-stone-600 leading-relaxed">
                    Sits directly on the hips. Casual relaxed attitude that pairs naturally with cropped tops and vintage belts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Stretch vs Rigid */}
          {activeTab === 'stretch' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                <h4 className="text-sm font-black uppercase text-stone-900">Rigid 100% Heavyweight Cotton (Raw / Selvedge)</h4>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  Zero synthetic elastane. Authentic vintage feel that molds and shapes to your exact body contours over time, developing one-of-a-kind personal fades and whiskers.
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                <h4 className="text-sm font-black uppercase text-stone-900">Comfort Stretch (1% - 2% Elastane)</h4>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  Looks like traditional vintage denim with added flexibility for sitting, cycling, and all-day commuting.
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs">
                <h4 className="text-sm font-black uppercase text-stone-900">Hyperstretch Sculpt (4-Way Recovery)</h4>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  Maximum hug and lift that holds its shape wash after wash without bagging out at the knees.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
