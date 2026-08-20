import React from 'react';
import { BrandConfig } from '../types';

interface BrandLogoProps {
  config: BrandConfig;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ config, className = '', size = 'md', onClick }) => {
  const { logoType, logoText, tabLabel, primaryColor, accentColor } = config;

  const sizeClasses = {
    sm: 'text-lg px-2 py-0.5',
    md: 'text-2xl px-3 py-1.5',
    lg: 'text-3xl px-5 py-2.5'
  };

  // Freakins Bold Streetwear Logo
  if (logoType === 'freakins-bold') {
    return (
      <div 
        id="brand-logo-freakins"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none group transition-transform duration-200 active:scale-95 ${className}`}
      >
        <div className="flex items-center space-x-1.5">
          <div 
            className="px-3 py-1 text-white font-black text-xl sm:text-2xl tracking-tighter uppercase flex items-center justify-center transition-all bg-black group-hover:bg-[#E11D48]"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            <span className="font-black tracking-tighter text-white">
              {logoText || "FREAKINS"}
            </span>
          </div>
          <span className="bg-[#CCFF00] text-black text-[9px] font-black uppercase px-1.5 py-0.5 tracking-widest hidden sm:inline-block">
            {tabLabel || "GEN-Z"}
          </span>
        </div>
      </div>
    );
  }

  // Batwing / Iconic Red Tab Style (like Levi's famous batwing tab)
  if (logoType === 'red-tab') {
    return (
      <div 
        id="brand-logo-red-tab"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none group transition-transform duration-200 active:scale-95 ${className}`}
      >
        <div 
          className="relative px-3 py-1 text-white font-black text-xl sm:text-2xl tracking-tighter uppercase flex items-center justify-center transition-all group-hover:brightness-110"
          style={{
            backgroundColor: primaryColor,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <span className="font-black tracking-tighter">
            {logoText || "RAW & CO"}
          </span>
          <span className="text-[9px] font-bold ml-0.5 -mt-2">®</span>
        </div>
      </div>
    );
  }

  // Denim Selvedge Tag style
  if (logoType === 'denim-selvedge') {
    return (
      <div 
        id="brand-logo-selvedge"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none group ${className}`}
      >
        <div 
          className="relative px-3 py-1 text-white font-black tracking-widest uppercase border-y-2 border-red-500 flex items-center shadow-sm"
          style={{ backgroundColor: primaryColor }}
        >
          <span className="text-xs font-mono text-red-400 mr-1.5 border-r border-red-500/50 pr-1">ID</span>
          <span className="text-lg sm:text-xl font-black tracking-tight">{logoText}</span>
        </div>
      </div>
    );
  }

  // Vintage Leather Patch Style
  if (logoType === 'vintage-patch') {
    return (
      <div 
        id="brand-logo-patch"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none group ${className}`}
      >
        <div 
          className="px-3 py-1.5 border border-amber-800/40 rounded-xs shadow-inner flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: '#2b1a11', borderColor: accentColor }}
        >
          <span className="text-[8px] font-bold text-amber-200 uppercase tracking-widest">GENUINE QUALITY</span>
          <span className="text-lg font-black text-amber-400 tracking-wider uppercase">{logoText}</span>
          <span className="text-[7px] text-amber-200/80 tracking-tighter">SAN FRANCISCO • EST. {config.brandEstYear || '1873'}</span>
        </div>
      </div>
    );
  }

  // Minimal Modern Badge
  if (logoType === 'minimal-modern') {
    return (
      <div 
        id="brand-logo-minimal"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none ${className}`}
      >
        <div 
          className="px-2.5 py-1 text-white font-bold tracking-widest text-lg sm:text-xl uppercase"
          style={{ backgroundColor: primaryColor }}
        >
          {logoText}
        </div>
      </div>
    );
  }

  // Default clean text
  return (
    <div 
      id="brand-logo-text"
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none font-black text-2xl tracking-tighter uppercase ${className}`}
      style={{ color: primaryColor }}
    >
      <span>{logoText}</span>
      <span className="text-xs ml-0.5 -mt-2">®</span>
    </div>
  );
};
