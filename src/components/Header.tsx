import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sliders, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Truck, 
  HelpCircle,
  Eye,
  Check,
  ArrowRight
} from 'lucide-react';
import { BrandConfig, Gender, Product } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  config: BrandConfig;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenFitGuide: () => void;
  onOpenCustomizer: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onSelectCategory: (gender: Gender, category?: string, fit?: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenFitGuide,
  onOpenCustomizer,
  isEditMode,
  onToggleEditMode,
  onSelectCategory,
  products,
  onSelectProduct,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'men' | 'women' | 'icons' | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Rotating ticker
  useEffect(() => {
    if (!config.topTickerMessages.length) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % config.topTickerMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [config.topTickerMessages]);

  // Search filtered products
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fitType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSelect = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSelectProduct(product);
  };

  return (
    <header id="main-site-header" className="sticky top-0 z-40 bg-white border-b border-gray-100">
      {/* Top Ticker Bar */}
      {config.topTickerMessages && config.topTickerMessages.length > 0 && (
        <div 
          id="top-announcement-ticker"
          className="text-white text-[11px] font-black uppercase tracking-widest py-2 px-4 transition-colors relative overflow-hidden bg-black border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 text-center font-black tracking-widest flex items-center justify-center space-x-2">
              <span className="text-[#CCFF00] font-black animate-pulse">⚡</span>
              <span>{config.topTickerMessages[tickerIndex]}</span>
              <span className="text-[#CCFF00] font-black animate-pulse">⚡</span>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest">
              <span 
                className="cursor-pointer bg-[#CCFF00] text-black px-2 py-0.5 font-black hover:bg-white transition-colors" 
                onClick={() => onSelectCategory('All', 'Jeans', 'Cargo & Parachute')}
              >
                DROP OF THE DAY
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top Utility Bar (Desktop) */}
      <div id="top-utility-bar" className="bg-[#FAFAFA] text-gray-600 text-[11px] font-medium uppercase tracking-wider border-b border-gray-100 py-1.5 px-6 lg:px-10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="flex items-center hover:text-black cursor-pointer transition-colors">
              <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
              {config.storeLocationText || "Store Locator"}
            </span>
            <span className="flex items-center hover:text-black cursor-pointer transition-colors">
              <Truck className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Order Status
            </span>
            <span className="flex items-center hover:text-black cursor-pointer transition-colors" onClick={onOpenFitGuide}>
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Fit Guide
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Live Brand Customizer Toggle */}
            <button
              id="header-edit-mode-toggle-btn"
              onClick={onOpenCustomizer}
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>CUSTOM LAB</span>
            </button>

            <button
              id="header-live-edit-switch"
              onClick={onToggleEditMode}
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isEditMode ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-gray-500 hover:text-black'
              }`}
              title="Click elements on screen to edit content directly"
            >
              <Sliders className="w-3 h-3" />
              <span>{isEditMode ? 'Edit Mode ON' : 'Visual Edit'}</span>
            </button>

            <span className="text-gray-300">|</span>
            <span className="font-bold text-black text-[10px] tracking-widest">{config.currencyCode} ({config.currencySymbol})</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div id="main-navigation-container" className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-6 lg:gap-12">
            <button
              id="mobile-menu-trigger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <BrandLogo config={config} onClick={() => onSelectCategory('All')} />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[12px] font-black uppercase tracking-widest text-[#1A1A1A]">
            {/* BAGGY & CARGOS */}
            <button 
              id="nav-link-baggy-cargos"
              onClick={() => onSelectCategory('All', 'Jeans', 'Cargo & Parachute')}
              className="font-black text-[12px] tracking-widest uppercase hover:text-[#E11D48] transition-colors flex items-center gap-1.5"
            >
              <span>BAGGY & CARGOS</span>
              <span className="bg-[#CCFF00] text-black text-[8px] font-black px-1 py-0.2 tracking-wider">HOT</span>
            </button>

            {/* KOREAN PANTS */}
            <button 
              id="nav-link-korean-pants"
              onClick={() => onSelectCategory('All', 'Jeans', 'Korean Wide Leg')}
              className="font-black text-[12px] tracking-widest uppercase hover:text-[#E11D48] transition-colors"
            >
              KOREAN PANTS
            </button>

            {/* WOMEN */}
            <div 
              className="relative h-full flex items-center group cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('women')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                id="nav-link-women"
                onClick={() => onSelectCategory('Women')}
                className="font-black text-[12px] tracking-widest uppercase hover:text-[#E11D48] transition-colors flex items-center py-5"
              >
                WOMEN
                <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Mega Menu WOMEN */}
              {activeMegaMenu === 'women' && (
                <div 
                  id="mega-menu-women"
                  className="absolute top-full left-0 w-[680px] bg-white border border-gray-200 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-1">
                      Viral Denim Fits
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-800">
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jeans', 'Baggy & Skater')} className="hover:text-[#E11D48] transition-colors">
                          90s Skater Baggy Jeans
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jeans', 'Cargo & Parachute')} className="hover:text-[#E11D48] transition-colors">
                          Tactical Cargo Pants
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jeans', 'Barrel & Curved')} className="hover:text-[#E11D48] transition-colors">
                          Crossover Barrel Leg
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jeans', 'Bootcut & Flare')} className="hover:text-[#E11D48] transition-colors">
                          Y2K Low-Rise Flare
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jeans')} className="text-[#E11D48] hover:underline font-black pt-1 block">
                          View All Women's Denim &rarr;
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-1">
                      Corsets & Layering
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-800">
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Shirts & Tops', 'Corset & Tops')} className="hover:text-[#E11D48] transition-colors">
                          Denim Boned Corsets
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Jackets')} className="hover:text-[#E11D48] transition-colors">
                          Cropped Bomber Jackets
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Women', 'Shirts & Tops')} className="hover:text-[#E11D48] transition-colors">
                          Baby Tees & Tanks
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F5F5F5] p-4 border border-gray-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#CCFF00] px-1.5 py-0.5">DROP ALERT</span>
                      <h5 className="font-black text-sm uppercase text-black mt-2">FYP VIRAL CARGOS</h5>
                      <p className="text-[11px] text-gray-600 mt-1">Multi-pocket tactical fit with hem cinch toggles.</p>
                    </div>
                    <button 
                      onClick={() => onSelectCategory('Women', 'Jeans', 'Cargo & Parachute')}
                      className="mt-3 text-xs font-black uppercase tracking-wider text-black underline hover:text-[#E11D48] text-left"
                    >
                      Shop Drop &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MEN */}
            <div 
              className="relative h-full flex items-center group cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('men')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                id="nav-link-men"
                onClick={() => onSelectCategory('Men')}
                className="font-black text-[12px] tracking-widest uppercase hover:text-[#E11D48] transition-colors flex items-center py-5"
              >
                MEN
                <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Mega Menu MEN */}
              {activeMegaMenu === 'men' && (
                <div 
                  id="mega-menu-men"
                  className="absolute top-full left-0 w-[680px] bg-white border border-gray-200 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-1">
                      Men's Fits
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-800">
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Jeans', 'Korean Wide Leg')} className="hover:text-[#E11D48] transition-colors">
                          Korean Slouchy Pleats
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Jeans', 'Cargo & Parachute')} className="hover:text-[#E11D48] transition-colors">
                          Cyber Parachute Cargos
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Jeans', 'Straight')} className="hover:text-[#E11D48] transition-colors">
                          Original Straight Fit
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Jeans')} className="text-[#E11D48] hover:underline font-black pt-1 block">
                          View All Men's Jeans &rarr;
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-1">
                      Tops & Outerwear
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-800">
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Jackets')} className="hover:text-[#E11D48] transition-colors">
                          Oversized Acid Truckers
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectCategory('Men', 'Shirts & Tops')} className="hover:text-[#E11D48] transition-colors">
                          Boxy Street Tees
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F5F5F5] p-4 border border-gray-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#CCFF00] px-1.5 py-0.5">NEW RELEASE</span>
                      <h5 className="font-black text-sm uppercase text-black mt-2">SEOUL PLEATED DENIM</h5>
                      <p className="text-[11px] text-gray-600 mt-1">Effortless stacking drape over sneakers and loafers.</p>
                    </div>
                    <button 
                      onClick={() => onSelectCategory('Men', 'Jeans', 'Korean Wide Leg')}
                      className="mt-3 text-xs font-black uppercase tracking-wider text-black underline hover:text-[#E11D48] text-left"
                    >
                      Shop Korean Pants &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CORSET & TOPS */}
            <button 
              id="nav-link-corsets"
              onClick={() => onSelectCategory('Women', 'Shirts & Tops', 'Corset & Tops')}
              className="font-black text-[12px] tracking-widest uppercase hover:text-[#E11D48] transition-colors"
            >
              CORSETS & TOPS
            </button>

            {/* SALE 40% OFF */}
            <button 
              id="nav-link-sale"
              onClick={() => onSelectCategory('All', 'Jeans')}
              className="font-black text-[12px] tracking-widest uppercase text-[#E11D48] hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              <span>SALE FLAT 40%</span>
            </button>
            {/* SUSTAINABILITY */}
            <a 
              href="#brand-story-heritage-section"
              className="font-bold text-[12px] tracking-widest uppercase text-gray-400 hover:text-[#E11D48] transition-colors"
            >
              SUSTAINABILITY
            </a>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-6">
            {/* Search Input matching Sleek Interface Design */}
            <div className="relative">
              <div className="flex items-center bg-gray-100 px-4 py-1.5">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="SEARCH"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[11px] font-bold uppercase tracking-widest w-28 sm:w-44 focus:outline-none border-none text-black placeholder-gray-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-black">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-100 shadow-2xl p-3 z-50 animate-in fade-in">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">
                    Matching Results ({filteredProducts.length})
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleSearchSelect(prod)}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <img
                            src={prod.colors[0]?.image}
                            alt={prod.name}
                            className="w-12 h-14 object-cover border border-gray-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black uppercase text-black truncate">{prod.name}</h4>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500">{prod.fitType} • {prod.gender}</p>
                            <div className="text-xs font-black text-black mt-0.5">
                              {config.currencySymbol}{prod.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-xs text-gray-500">
                      No styles found for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist & Cart Icons */}
            <div className="flex items-center gap-4 text-[#1A1A1A]">
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                className="relative p-1 hover:text-[#E11D48] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                className="relative p-1 hover:text-[#E11D48] transition-colors flex items-center"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden border-t border-gray-200 bg-white p-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button 
              onClick={() => { onSelectCategory('All', 'Jeans', 'Cargo & Parachute'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100"
            >
              <span className="flex items-center gap-2">
                <span>🔥 BAGGY & CARGOS</span>
                <span className="bg-[#CCFF00] text-black text-[8px] font-black px-1 py-0.2">HOT</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectCategory('All', 'Jeans', 'Korean Wide Leg'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100"
            >
              <span>🇰🇷 KOREAN PANTS</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectCategory('Women'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100"
            >
              <span>WOMEN'S COLLECTION</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectCategory('Men'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100"
            >
              <span>MEN'S COLLECTION</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectCategory('Women', 'Shirts & Tops', 'Corset & Tops'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100"
            >
              <span>CORSETS & TOPS</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectCategory('All', 'Jeans'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100 text-[#E11D48]"
            >
              <span>⚡ SALE FLAT 40% OFF</span>
              <ChevronRight className="w-4 h-4 text-[#E11D48]" />
            </button>
            <button 
              onClick={() => { onOpenFitGuide(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between text-xs font-black uppercase py-2.5 px-2 hover:bg-gray-50 border-b border-gray-100 text-gray-700"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
                <span>DENIM FIT GUIDE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => { onOpenCustomizer(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 border border-gray-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>LAUNCH CUSTOM LAB</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
