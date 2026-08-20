import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Check, 
  Globe, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BrandConfig, Gender } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  config: BrandConfig;
  onSelectCategory: (gender: Gender, category?: string, fit?: string) => void;
  onOpenFitGuide: () => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onSelectCategory,
  onOpenFitGuide,
  onOpenCustomizer,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer id="main-site-footer" className="bg-[#1A1A1A] text-white border-t border-gray-100">
      {/* Newsletter Bar */}
      <div className="border-b border-gray-800 py-12 px-6 lg:px-10 bg-black">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] block mb-1">
              EXCLUSIVE DENIM CLUB
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              GET 15% OFF YOUR FIRST ORDER
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-md">
              Sign up for early access to limited selvedge drops, private fitting sessions, and secret warehouse releases.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#262626] border border-gray-700 text-white text-[11px] font-bold uppercase tracking-widest placeholder-gray-500 focus:outline-none focus:border-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black flex items-center justify-center space-x-2"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <span>JOIN CLUB</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#262626] border border-[#E11D48] text-white flex items-center space-x-3 text-xs font-bold">
                <Check className="w-5 h-5 text-[#E11D48]" />
                <span>You're in! Use code <strong className="text-[#E11D48]">FIRST500</strong> for ₹500 off.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo config={config} size="lg" />
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {config.brandTagline || "Architectural construction. Timeless denim craftsmanship."}
            </p>

            <div className="space-y-1.5 text-xs text-gray-400 pt-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>{config.contactPhone || "1800-1020-501"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{config.contactEmail || "customercare@levijeans.store"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>{config.storeLocationText || "120+ Outlets Nationwide"}</span>
              </div>
            </div>

            <button
              onClick={onOpenCustomizer}
              className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-black hover:bg-[#262626] text-white text-[10px] font-bold uppercase tracking-widest transition-colors border border-gray-700"
            >
              <Sparkles className="w-3 h-3 text-[#E11D48]" />
              <span>CUSTOM LAB</span>
            </button>
          </div>

          {/* Col 2: Men */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-800 pb-1">
              Men's Denim
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Straight')} className="hover:text-white transition-colors">
                  501® Original Straight
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Slim')} className="hover:text-white transition-colors">
                  511™ Slim Jeans
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Slim Taper')} className="hover:text-white transition-colors">
                  512™ Slim Taper
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jackets')} className="hover:text-white transition-colors">
                  Trucker Jackets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Shirts & Tops')} className="hover:text-white transition-colors">
                  Western Denim Shirts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Women */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-800 pb-1">
              Women's Denim
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Straight')} className="hover:text-white transition-colors">
                  Ribcage High Rise
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Skinny')} className="hover:text-white transition-colors">
                  711™ Skinny Jeans
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Bootcut & Flare')} className="hover:text-white transition-colors">
                  70s High Flare
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Relaxed / Loose')} className="hover:text-white transition-colors">
                  Baggy Dad Relaxed
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jackets')} className="hover:text-white transition-colors">
                  Ex-Boyfriend Trucker
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Fit */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-800 pb-1">
              Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button onClick={onOpenFitGuide} className="hover:text-white transition-colors text-[#E11D48]">
                  Interactive Fit Guide &rarr;
                </button>
              </li>
              <li>
                <a href="#denim-care-guide-section" className="hover:text-white transition-colors">
                  Raw Denim Care
                </a>
              </li>
              <li>
                <a href="#brand-story-heritage-section" className="hover:text-white transition-colors">
                  Heritage Story
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchange
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Track Order
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright matching Sleek Interface */}
        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span>© {new Date().getFullYear()} {config.brandName || "FREAKINS"}. ALL RIGHTS RESERVED.</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">DESIGNED BY S&S PARTNERS</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
            <span className="hover:text-white cursor-pointer">Sustainability</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Globe className="w-3.5 h-3.5" />
            <span>INDIA ({config.currencyCode})</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
