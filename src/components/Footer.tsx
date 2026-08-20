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
import { BrandConfig, Gender, UserProfile } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  config: BrandConfig;
  user?: UserProfile | null;
  onSelectCategory: (gender: Gender, category?: string, fit?: string) => void;
  onOpenFitGuide: () => void;
  onOpenCustomizer: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onOpenProfile?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  user,
  onSelectCategory,
  onOpenFitGuide,
  onOpenCustomizer,
  onOpenAuth,
  onOpenProfile,
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
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-3 sm:space-y-4">
            <BrandLogo config={config} size="md" />
            
            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed max-w-sm">
              {config.brandTagline || "Architectural construction. Timeless denim craftsmanship."}
            </p>

            <div className="space-y-1 text-[11px] sm:text-xs text-gray-400 pt-1">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>{config.contactPhone || "1800-1020-501"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{config.contactEmail || "customercare@freakins.store"}</span>
              </div>
            </div>

            <button
              onClick={onOpenCustomizer}
              className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-black hover:bg-[#262626] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors border border-gray-700"
            >
              <Sparkles className="w-3 h-3 text-[#CCFF00]" />
              <span>LAUNCH CUSTOM LAB</span>
            </button>
          </div>

          {/* Col 2: Men */}
          <div>
            <h4 className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 border-b border-gray-800 pb-1">
              Men's Denim
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Straight')} className="hover:text-white transition-colors">
                  501® Original
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Slim')} className="hover:text-white transition-colors">
                  511™ Slim
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jeans', 'Cargo & Parachute')} className="hover:text-white transition-colors">
                  Tactical Cargos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men', 'Jackets')} className="hover:text-white transition-colors">
                  Truckers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Women */}
          <div>
            <h4 className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 border-b border-gray-800 pb-1">
              Women's Denim
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Straight')} className="hover:text-white transition-colors">
                  Ribcage High Rise
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Bootcut & Flare')} className="hover:text-white transition-colors">
                  70s Flare
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Jeans', 'Relaxed / Loose')} className="hover:text-white transition-colors">
                  Baggy Skater
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Women', 'Shirts & Tops', 'Corset & Tops')} className="hover:text-white transition-colors">
                  Denim Corset
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Fit */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 mb-2 sm:mb-4 border-b border-gray-800 pb-1">
              Help & Account
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
              <li>
                <button 
                  onClick={() => user ? onOpenProfile?.() : onOpenAuth?.('login')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white"
                >
                  <span>{user ? `Account (${user.name.split(' ')[0]})` : 'Member Sign In'}</span>
                  <span className="bg-[#CCFF00] text-black text-[7px] font-black px-1">VIP</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenFitGuide} className="hover:text-white transition-colors text-[#CCFF00]">
                  Interactive Fit Guide &rarr;
                </button>
              </li>
              <li>
                <a href="#denim-care-guide-section" className="hover:text-white transition-colors">
                  Raw Denim Care
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  15-Day Exchange
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright matching Sleek Interface */}
        <div className="mt-8 sm:mt-14 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span>© {new Date().getFullYear()} {config.brandName || "FREAKINS"}. ALL RIGHTS RESERVED.</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">DESIGNED BY S&S PARTNERS</span>
          </div>

          <div className="flex items-center space-x-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Sustainability</span>
          </div>

          <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Globe className="w-3 h-3" />
            <span>INDIA ({config.currencyCode})</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
