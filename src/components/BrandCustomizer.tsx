import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Palette, 
  Sliders, 
  Type, 
  Image as ImageIcon, 
  Package, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Layers,
  DollarSign,
  Megaphone,
  Edit2
} from 'lucide-react';
import { BrandConfig, Product, HeroSlide, Gender, Category, DenimFit, WashType } from '../types';
import { BRAND_PRESETS } from '../data/initialData';

interface BrandCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  onUpdateConfig: (newConfig: BrandConfig) => void;
  onResetToDefault: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  editingSlideIndex: number | null;
  onCloseSlideEdit: () => void;
}

export const BrandCustomizer: React.FC<BrandCustomizerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isEditMode,
  onToggleEditMode,
  editingSlideIndex,
  onCloseSlideEdit,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'identity' | 'store' | 'hero' | 'products' | 'export'>('presets');
  const [newTickerMsg, setNewTickerMsg] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // New product state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Product Form state
  const [prodName, setProdName] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodPrice, setProdPrice] = useState(3999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(4999);
  const [prodGender, setProdGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');
  const [prodCategory, setProdCategory] = useState<Category>('Jeans');
  const [prodFit, setProdFit] = useState<DenimFit>('Straight');
  const [prodWash, setProdWash] = useState<WashType>('Medium Vintage');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop');
  const [prodColorName, setProdColorName] = useState('Vintage Stonewash');
  const [prodColorHex, setProdColorHex] = useState('#46607e');
  const [prodSizesStr, setProdSizesStr] = useState('28x30, 30x32, 32x32, 34x32, 36x34');
  const [prodDesc, setProdDesc] = useState('Authentic custom denim crafted with heavyweight fabric.');

  if (!isOpen) return null;

  // Preset colors
  const COLOR_PALETTES = [
    { name: "Levi's Red", hex: "#E00000" },
    { name: "Deep Raw Indigo", hex: "#1B365D" },
    { name: "Tobacco California", hex: "#8B4513" },
    { name: "Onyx Black", hex: "#111111" },
    { name: "Vintage Pine Green", hex: "#2D5A27" },
    { name: "Burgundy Wine", hex: "#7A1C2E" },
    { name: "Midnight Navy", hex: "#0D1B2A" }
  ];

  const handleApplyPreset = (presetConfig: Partial<BrandConfig>) => {
    onUpdateConfig({
      ...config,
      ...presetConfig
    });
  };

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerMsg.trim()) return;
    onUpdateConfig({
      ...config,
      topTickerMessages: [...config.topTickerMessages, newTickerMsg.trim()]
    });
    setNewTickerMsg('');
  };

  const handleDeleteTicker = (index: number) => {
    const updated = config.topTickerMessages.filter((_, i) => i !== index);
    onUpdateConfig({ ...config, topTickerMessages: updated });
  };

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: any) => {
    const updatedSlides = [...config.heroSlides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value
    };
    onUpdateConfig({ ...config, heroSlides: updatedSlides });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizes = prodSizesStr.split(',').map((s) => s.trim()).filter(Boolean);

    const productPayload: Product = {
      id: editingProductId || `custom-prod-${Date.now()}`,
      name: prodName || 'Signature Denim Style',
      slug: (prodName || 'signature-denim').toLowerCase().replace(/\s+/g, '-'),
      subtitle: prodSubtitle || 'Crafted with premium denim fabric',
      code: `DEN-${Math.floor(1000 + Math.random() * 9000)}`,
      gender: prodGender,
      category: prodCategory,
      fitType: prodFit,
      price: Number(prodPrice),
      originalPrice: Number(prodOriginalPrice),
      rating: 4.9,
      reviewsCount: 12,
      isNew: true,
      isBestSeller: false,
      colors: [
        {
          name: prodColorName,
          hex: prodColorHex,
          image: prodImage,
          gallery: [prodImage]
        }
      ],
      sizes: sizes.length ? sizes : ['30x32', '32x32', '34x32'],
      description: prodDesc,
      details: [
        'Premium reinforced stitching with durable bar-tacks',
        'Custom copper rivets and shank button closure',
        'Stitched redline detail on outseam'
      ],
      wash: prodWash,
      rise: 'Mid Rise',
      stretch: 'Comfort Stretch (3-5%)',
      legOpening: '15.5" Leg Opening',
      composition: '99% Premium Cotton, 1% Elastane'
    };

    if (editingProductId) {
      onUpdateProduct(productPayload);
      setEditingProductId(null);
    } else {
      onAddProduct(productPayload);
      setIsAddingProduct(false);
    }

    // Reset form
    setProdName('');
    setProdSubtitle('');
    setProdPrice(3999);
  };

  const handleEditProductOpen = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdSubtitle(prod.subtitle);
    setProdPrice(prod.price);
    setProdOriginalPrice(prod.originalPrice);
    setProdGender(prod.gender);
    setProdCategory(prod.category);
    setProdFit(prod.fitType);
    setProdWash(prod.wash);
    setProdImage(prod.colors[0]?.image || '');
    setProdColorName(prod.colors[0]?.name || 'Indigo');
    setProdColorHex(prod.colors[0]?.hex || '#1b2c45');
    setProdSizesStr(prod.sizes.join(', '));
    setProdDesc(prod.description);
    setIsAddingProduct(true);
    setActiveTab('products');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `denim-brand-${config.brandName.toLowerCase().replace(/\s+/g, '-')}-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.brandName) {
          onUpdateConfig(parsed);
          alert('Custom brand configuration loaded successfully!');
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="brand-customizer-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        id="brand-customizer-panel"
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider">
                BRAND CUSTOMIZER & VISUAL STUDIO
              </h2>
              <p className="text-[11px] text-stone-400">
                Transform this Levi's clone to perfectly fit your own jeans brand in seconds.
              </p>
            </div>
          </div>

          <button 
            id="close-customizer-btn"
            onClick={onClose} 
            className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'presets' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            1. Brand Presets
          </button>
          <button
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'identity' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            2. Logo & Colors
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'store' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            3. Tickers & Currency
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'hero' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            4. Hero Banners
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'products' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            5. Jeans Manager
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'export' ? 'border-black text-black bg-white' : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            6. Backup & Export
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* TAB 1: Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase text-stone-900">Instant Brand Themes</h3>
                <p className="text-xs text-stone-500">Pick an archetype style or customize each detail individually.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BRAND_PRESETS.map((preset) => (
                  <div
                    key={preset.name}
                    onClick={() => handleApplyPreset(preset.config)}
                    className="p-4 bg-stone-50 border border-stone-200 rounded-xs hover:border-black hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="w-3.5 h-3.5 rounded-full inline-block"
                          style={{ backgroundColor: preset.config.primaryColor }}
                        />
                        <span className="text-[10px] font-mono font-bold text-stone-400">{preset.config.currencyCode}</span>
                      </div>
                      <h4 className="text-xs font-black uppercase text-stone-900">{preset.name}</h4>
                      <p className="text-[11px] text-stone-600 mt-1">{preset.description}</p>
                    </div>

                    <button className="mt-3 text-[10px] font-black uppercase tracking-wider text-red-600 self-start">
                      Apply This Style &rarr;
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Restore Authentic Levi's Defaults</h4>
                  <p className="text-[11px] text-stone-500">Reverts all colors, logo, and slogans to initial state.</p>
                </div>
                <button
                  onClick={onResetToDefault}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xs flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Brand Identity */}
          {activeTab === 'identity' && (
            <div className="space-y-5 text-xs">
              {/* Brand Name & Tagline */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Brand Name & Heritage</h4>
                
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Brand Name Display</label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => onUpdateConfig({ ...config, brandName: e.target.value })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Logo Text (Inside Batwing / Tag)</label>
                  <input
                    type="text"
                    value={config.logoText}
                    onChange={(e) => onUpdateConfig({ ...config, logoText: e.target.value })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Pocket Red Tab Text</label>
                    <input
                      type="text"
                      value={config.tabLabel}
                      onChange={(e) => onUpdateConfig({ ...config, tabLabel: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Est. Year</label>
                    <input
                      type="text"
                      value={config.brandEstYear}
                      onChange={(e) => onUpdateConfig({ ...config, brandEstYear: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Brand Tagline / Slogan</label>
                  <input
                    type="text"
                    value={config.brandTagline}
                    onChange={(e) => onUpdateConfig({ ...config, brandTagline: e.target.value })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                  />
                </div>
              </div>

              {/* Logo Badge Shape */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Logo Badge Archetype</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'red-tab', label: "Iconic Batwing Tab" },
                    { id: 'denim-selvedge', label: "Selvedge ID Stripe" },
                    { id: 'vintage-patch', label: "Leather Jeans Patch" },
                    { id: 'minimal-modern', label: "Modern Block Badge" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => onUpdateConfig({ ...config, logoType: style.id as any })}
                      className={`p-2.5 text-xs font-bold text-left rounded-xs transition-all ${
                        config.logoType === style.id
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-700 border border-stone-300 hover:border-black'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Colors */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Primary Brand Accent Color</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {COLOR_PALETTES.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => onUpdateConfig({ ...config, primaryColor: color.hex })}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        config.primaryColor === color.hex ? 'ring-2 ring-black scale-110' : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {config.primaryColor === color.hex && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                  
                  <div className="flex items-center space-x-1.5 ml-2">
                    <span className="text-[10px] text-stone-500 font-bold">Custom Hex:</span>
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => onUpdateConfig({ ...config, primaryColor: e.target.value })}
                      className="w-20 p-1 bg-white border border-stone-300 rounded-xs font-mono font-bold text-xs uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Store & Currency */}
          {activeTab === 'store' && (
            <div className="space-y-5 text-xs">
              {/* Currency */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Store Currency</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { symbol: '₹', code: 'INR' },
                    { symbol: '$', code: 'USD' },
                    { symbol: '€', code: 'EUR' },
                    { symbol: '£', code: 'GBP' },
                  ].map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => onUpdateConfig({ ...config, currencySymbol: curr.symbol, currencyCode: curr.code })}
                      className={`py-2 text-xs font-bold rounded-xs transition-colors ${
                        config.currencyCode === curr.code ? 'bg-stone-900 text-white' : 'bg-white border border-stone-300 text-stone-700'
                      }`}
                    >
                      {curr.symbol} {curr.code}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Free Shipping Threshold</label>
                  <input
                    type="number"
                    value={config.freeShippingThreshold}
                    onChange={(e) => onUpdateConfig({ ...config, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                  />
                </div>
              </div>

              {/* Marquee Ticker Messages */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Top Header Announcement Tickers</h4>
                
                <form onSubmit={handleAddTicker} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="New ticker promo text..."
                    value={newTickerMsg}
                    onChange={(e) => setNewTickerMsg(e.target.value)}
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 text-white font-bold rounded-xs hover:bg-black"
                  >
                    Add
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  {config.topTickerMessages.map((msg, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white border border-stone-200 rounded-xs">
                      <span className="text-[11px] text-stone-800 font-medium truncate flex-1 mr-2">{msg}</span>
                      <button
                        onClick={() => handleDeleteTicker(idx)}
                        className="text-stone-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Store text */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-xs border border-stone-200">
                <h4 className="text-xs font-black uppercase text-stone-900">Contact & Support</h4>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Customer Care Phone</label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => onUpdateConfig({ ...config, contactPhone: e.target.value })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => onUpdateConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Hero Slides */}
          {activeTab === 'hero' && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-black uppercase text-stone-900">Hero Banners & Headlines</h3>
                <p className="text-xs text-stone-500">Edit the editorial denim photography and promotional headlines.</p>
              </div>

              {config.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-black uppercase text-stone-900">Slide #{idx + 1} - {slide.badge || 'Main'}</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Headline</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-black text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Tagline / Eyebrow</label>
                    <input
                      type="text"
                      value={slide.tagline}
                      onChange={(e) => handleSlideChange(idx, 'tagline', e.target.value)}
                      className="w-full p-1.5 bg-white border border-stone-300 rounded-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Subtitle</label>
                    <textarea
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full p-1.5 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Primary CTA Button</label>
                      <input
                        type="text"
                        value={slide.ctaText}
                        onChange={(e) => handleSlideChange(idx, 'ctaText', e.target.value)}
                        className="w-full p-1.5 bg-white border border-stone-300 rounded-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Background Image URL</label>
                      <input
                        type="url"
                        value={slide.imageUrl}
                        onChange={(e) => handleSlideChange(idx, 'imageUrl', e.target.value)}
                        className="w-full p-1.5 bg-white border border-stone-300 rounded-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Jeans & Products Manager */}
          {activeTab === 'products' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase text-stone-900">Denim Products ({products.length})</h3>
                  <p className="text-xs text-stone-500">Add, edit pricing, washes, or remove products.</p>
                </div>
                {!isAddingProduct && (
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setProdName('');
                      setIsAddingProduct(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Style</span>
                  </button>
                )}
              </div>

              {/* Product Form */}
              {isAddingProduct ? (
                <form onSubmit={handleSaveProduct} className="bg-stone-50 p-4 border border-stone-300 rounded-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <h4 className="font-black uppercase text-stone-900">
                      {editingProductId ? 'Edit Denim Style' : 'Add New Denim Style'}
                    </h4>
                    <button type="button" onClick={() => setIsAddingProduct(false)} className="text-stone-400 hover:text-black">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Style Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. 501® Original Cut Raw Denim"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Subtitle / Catchphrase</label>
                    <input
                      type="text"
                      placeholder="e.g. The Iconic Straight Leg with Signature Button Fly"
                      value={prodSubtitle}
                      onChange={(e) => setProdSubtitle(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Price ({config.currencySymbol}) *</label>
                      <input
                        type="number"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Original Price (for discount)</label>
                      <input
                        type="number"
                        value={prodOriginalPrice}
                        onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Gender</label>
                      <select
                        value={prodGender}
                        onChange={(e) => setProdGender(e.target.value as any)}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                      >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Category</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value as any)}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                      >
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Shirts & Tops">Shirts & Tops</option>
                        <option value="Collections">Collections</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Fit Cut</label>
                      <select
                        value={prodFit}
                        onChange={(e) => setProdFit(e.target.value as any)}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                      >
                        <option value="Straight">Straight</option>
                        <option value="Slim">Slim</option>
                        <option value="Slim Taper">Slim Taper</option>
                        <option value="Skinny">Skinny</option>
                        <option value="Relaxed / Loose">Relaxed / Loose</option>
                        <option value="Bootcut & Flare">Bootcut & Flare</option>
                        <option value="Trucker Jacket">Trucker Jacket</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Product Photo URL</label>
                    <input
                      type="url"
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-600 block mb-0.5">Available Sizes (Comma separated)</label>
                    <input
                      type="text"
                      value={prodSizesStr}
                      onChange={(e) => setProdSizesStr(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-stone-900 text-white font-black uppercase tracking-wider rounded-xs hover:bg-black"
                    >
                      {editingProductId ? 'Update Product' : 'Save Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingProduct(false)}
                      className="px-4 py-2.5 border border-stone-300 text-stone-700 font-bold rounded-xs hover:bg-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* Products List */
                <div className="space-y-2">
                  {products.map((prod) => (
                    <div key={prod.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xs flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.colors[0]?.image}
                          alt={prod.name}
                          className="w-12 h-14 object-cover rounded-xs border border-stone-300"
                        />
                        <div>
                          <h4 className="font-extrabold text-stone-900">{prod.name}</h4>
                          <span className="text-[10px] text-stone-500 font-bold">{prod.gender} • {prod.fitType} • {config.currencySymbol}{prod.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditProductOpen(prod)}
                          className="p-1.5 text-stone-600 hover:text-black hover:bg-stone-200 rounded-xs"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xs"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: Export / Import */}
          {activeTab === 'export' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-2">
                <h4 className="font-black uppercase text-stone-900">Export Brand Configuration</h4>
                <p className="text-stone-600 leading-relaxed">
                  Download a complete JSON backup of your current brand colors, products, slogans, and hero banners.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="mt-2 px-4 py-2 bg-stone-900 text-white font-bold uppercase rounded-xs hover:bg-black flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Brand JSON</span>
                </button>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-2">
                <h4 className="font-black uppercase text-stone-900">Import Brand Configuration</h4>
                <p className="text-stone-600 leading-relaxed">
                  Load a previously exported configuration file to restore all settings instantly.
                </p>
                <label className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 border border-stone-400 text-stone-800 font-bold uppercase rounded-xs hover:bg-white cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload JSON File</span>
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleEditMode}
              className={`px-3 py-2 text-xs font-black uppercase rounded-xs transition-colors ${
                isEditMode ? 'bg-amber-400 text-stone-900' : 'bg-stone-800 text-white'
              }`}
            >
              {isEditMode ? 'Visual Edit: ON' : 'Enable Visual Edit Mode'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-black uppercase tracking-wider rounded-xs hover:bg-black"
          >
            Apply & View Store
          </button>
        </div>
      </div>
    </div>
  );
};
