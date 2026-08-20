import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_BRAND_CONFIG, 
  INITIAL_PRODUCTS 
} from './data/initialData';
import { 
  BrandConfig, 
  Product, 
  ProductColor, 
  CartItem, 
  Gender, 
  DenimFit 
} from './types';

// Components
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ShopByFit } from './components/ShopByFit';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FitGuideModal } from './components/FitGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { BrandCustomizer } from './components/BrandCustomizer';
import { BrandStory } from './components/BrandStory';
import { DenimCareGuide } from './components/DenimCareGuide';
import { Footer } from './components/Footer';

// Icons
import { Sparkles, Zap, Shield, Truck, Award } from 'lucide-react';

const STORAGE_KEY_CONFIG = 'denim_store_brand_config';
const STORAGE_KEY_PRODUCTS = 'denim_store_products';
const STORAGE_KEY_CART = 'denim_store_cart';
const STORAGE_KEY_WISHLIST = 'denim_store_wishlist';

export default function App() {
  // Brand Configuration State with LocalStorage persistence
  const [config, setConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_BRAND_CONFIG;
  });

  // Product Catalog State with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-501-original-men', 'prod-ribcage-straight-women'];
  });

  // UI Filter State
  const [activeGender, setActiveGender] = useState<Gender>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFit, setActiveFit] = useState<string>('All');

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch {}
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, color?: ProductColor, size?: string, quantity: number = 1) => {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes[0] || '32x32';
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor.name === selectedColor.name &&
        item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        selectedColor,
        selectedSize,
        quantity
      };
      setCartItems([...cartItems, newItem]);
    }
    showToast(`Added ${product.name} (${selectedSize}) to Bag`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`Saved to Wishlist`);
    }
  };

  // Product Manager Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts([newProd, ...products]);
    showToast(`Added new style: ${newProd.name}`);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts(products.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    showToast(`Updated ${updatedProd.name}`);
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts(products.filter((p) => p.id !== prodId));
    showToast(`Product deleted`);
  };

  const handleResetToDefault = () => {
    setConfig(DEFAULT_BRAND_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    showToast('Reset to classic Levi\'s default configuration');
  };

  // Navigation Filter helper
  const handleSelectCategory = (gender: Gender, category: string = 'All', fit: string = 'All') => {
    setActiveGender(gender);
    setActiveCategory(category);
    setActiveFit(fit);

    // Smooth scroll down to catalog section if not already in view
    const el = document.getElementById('denim-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectFit = (fit: DenimFit, gender?: Gender) => {
    if (gender && gender !== 'All') {
      setActiveGender(gender);
    }
    setActiveFit(fit);
    setActiveCategory('Jeans');

    const el = document.getElementById('denim-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setActiveGender('All');
    setActiveCategory('All');
    setActiveFit('All');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans selection:bg-[#E11D48] selection:text-white">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-[11px] font-black uppercase tracking-widest py-2.5 px-6 shadow-2xl border border-gray-800">
          {toastMessage}
        </div>
      )}

      {/* Main Header */}
      <Header
        config={config}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onSelectCategory={handleSelectCategory}
        products={products}
        onSelectProduct={(product) => setSelectedProductForModal(product)}
      />

      {/* Main Hero Slider */}
      <HeroSlider
        config={config}
        onSelectCategory={(gender) => handleSelectCategory(gender, 'Jeans')}
        isEditMode={isEditMode}
        onEditSlide={(slideIdx) => {
          setEditingSlideIndex(slideIdx);
          setIsCustomizerOpen(true);
        }}
      />

      {/* Promotional Value Ribbon */}
      <section className="bg-[#F5F5F5] py-4 border-y border-gray-100 text-[#1A1A1A] text-xs">
        <div className="w-full px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Truck className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px]">Free Delivery Above {config.currencySymbol}{config.freeShippingThreshold}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px]">15-Day Returns & Exchanges</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px]">Authentic Heavyweight Denim</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px]">Code FIRST500 for Flat ₹500 Off</span>
          </div>
        </div>
      </section>

      {/* Shop By Fit Section */}
      <ShopByFit
        config={config}
        onSelectFit={handleSelectFit}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
      />

      {/* Product Catalog Section with Filters & Sorting */}
      <ProductCatalog
        products={products}
        config={config}
        activeGender={activeGender}
        activeCategory={activeCategory}
        activeFit={activeFit}
        onSelectGender={setActiveGender}
        onSelectCategory={setActiveCategory}
        onSelectFit={setActiveFit}
        onResetFilters={handleResetFilters}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(product) => setSelectedProductForModal(product)}
        onAddToCart={(product, color, size) => handleAddToCart(product, color, size)}
        isEditMode={isEditMode}
        onAddNewProduct={() => {
          setIsCustomizerOpen(true);
        }}
        onEditProduct={() => {
          setIsCustomizerOpen(true);
        }}
      />

      {/* Brand Heritage & Sustainability Story */}
      <BrandStory
        config={config}
        onExploreCollection={() => handleSelectCategory('Men', 'Collections')}
      />

      {/* Denim Care Guide Section */}
      <DenimCareGuide config={config} />

      {/* Footer */}
      <Footer
        config={config}
        onSelectCategory={handleSelectCategory}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Floating Action Button: Quick Brand Studio */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        <button
          id="floating-brand-customizer-btn"
          onClick={() => setIsCustomizerOpen(true)}
          className="px-4 py-3 bg-black text-white shadow-2xl hover:bg-[#E11D48] transition-all flex items-center space-x-2 border border-gray-800"
          title="Open Brand Customizer Studio"
        >
          <Sparkles className="w-4 h-4 text-[#E11D48] group-hover:text-white" />
          <span className="text-[10px] font-black uppercase tracking-widest">CUSTOM LAB</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForModal}
        config={config}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenFitGuide={() => {
          setSelectedProductForModal(null);
          setIsFitGuideOpen(true);
        }}
      />

      <FitGuideModal
        isOpen={isFitGuideOpen}
        onClose={() => setIsFitGuideOpen(false)}
        config={config}
        onSelectFit={handleSelectFit}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        config={config}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        config={config}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={(p) => setSelectedProductForModal(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <BrandCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => {
          setIsCustomizerOpen(false);
          setEditingSlideIndex(null);
        }}
        config={config}
        onUpdateConfig={(newConf) => setConfig(newConf)}
        onResetToDefault={handleResetToDefault}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        editingSlideIndex={editingSlideIndex}
        onCloseSlideEdit={() => setEditingSlideIndex(null)}
      />
    </div>
  );
}
