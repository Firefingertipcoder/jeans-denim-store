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
  DenimFit,
  UserProfile,
  UserOrder
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
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

// Icons
import { Sparkles, Zap, Shield, Truck, Award, Home, Compass, Heart, ShoppingBag, HelpCircle, User } from 'lucide-react';

const STORAGE_KEY_CONFIG = 'denim_store_brand_config';
const STORAGE_KEY_PRODUCTS = 'denim_store_products';
const STORAGE_KEY_CART = 'denim_store_cart';
const STORAGE_KEY_WISHLIST = 'denim_store_wishlist';
const STORAGE_KEY_CURRENT_USER = 'denim_store_current_user';
const STORAGE_KEY_REGISTERED_USERS = 'denim_store_registered_users';

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

  // User Profile & Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
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
      if (user) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch {}
  }, [user]);

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

  // Auth & Profile Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    showToast(`Welcome back, ${loggedInUser.name.split(' ')[0]}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
    showToast('Signed out successfully');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    
    // Also sync in registered users list
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
      if (stored) {
        const users: UserProfile[] = JSON.parse(stored);
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index > -1) {
          users[index] = updatedUser;
          localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(users));
        }
      }
    } catch {}
    
    showToast('Profile updated successfully');
  };

  const handleOrderPlaced = (order: UserOrder) => {
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        orders: [order, ...(user.orders || [])],
        rewardPoints: (user.rewardPoints || 0) + Math.round(order.total * 0.1),
      };
      handleUpdateUser(updatedUser);
    }
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
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans selection:bg-[#E11D48] selection:text-white pb-16 md:pb-0">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-[11px] font-black uppercase tracking-widest py-2.5 px-6 shadow-2xl border border-gray-800">
          {toastMessage}
        </div>
      )}

      {/* Main Header */}
      <Header
        config={config}
        user={user}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileModalOpen(true)}
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

      {/* Promotional Value Ribbon: Clean 1-line marquee/scroll on mobile, 4-col on desktop */}
      <section className="bg-[#F5F5F5] py-2.5 sm:py-3.5 border-y border-gray-200 text-[#1A1A1A] text-xs overflow-hidden">
        <div className="w-full px-4 lg:px-10 flex sm:grid sm:grid-cols-4 gap-6 sm:gap-4 overflow-x-auto sm:overflow-x-visible whitespace-nowrap scrollbar-none text-center">
          <div className="flex items-center justify-center space-x-1.5 flex-shrink-0">
            <Truck className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Free Delivery Above {config.currencySymbol}{config.freeShippingThreshold}</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 flex-shrink-0">
            <Shield className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">15-Day Returns & Exchanges</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 flex-shrink-0">
            <Award className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Heavyweight Streetwear Denim</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Code FIRST500 for Flat ₹500 Off</span>
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
        user={user}
        onSelectCategory={handleSelectCategory}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Floating Action Button: Quick Brand Studio (Desktop) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end space-y-2">
        <button
          id="floating-brand-customizer-btn"
          onClick={() => setIsCustomizerOpen(true)}
          className="px-4 py-3 bg-black text-white shadow-2xl hover:bg-[#E11D48] transition-all flex items-center space-x-2 border border-gray-800"
          title="Open Brand Customizer Studio"
        >
          <Sparkles className="w-4 h-4 text-[#CCFF00]" />
          <span className="text-[10px] font-black uppercase tracking-widest">CUSTOM LAB</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav 
        id="mobile-bottom-nav" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-gray-800 text-white px-2 py-2 flex items-center justify-around"
      >
        <button 
          id="mobile-nav-home-btn"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Home className="w-4.5 h-4.5" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Home</span>
        </button>

        <button 
          id="mobile-nav-shop-btn"
          onClick={() => {
            const el = document.getElementById('denim-catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Compass className="w-4.5 h-4.5" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Shop</span>
        </button>

        <button 
          id="mobile-nav-wishlist-btn"
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white transition-colors relative"
        >
          <Heart className="w-4.5 h-4.5" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 right-1 bg-[#E11D48] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Wishlist</span>
        </button>

        <button 
          id="mobile-nav-bag-btn"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white transition-colors relative"
        >
          <ShoppingBag className="w-4.5 h-4.5 text-[#CCFF00]" />
          {cartItems.reduce((a, b) => a + b.quantity, 0) > 0 && (
            <span className="absolute top-0 right-0 bg-[#CCFF00] text-black text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
          <span className="text-[9px] font-black uppercase tracking-wider text-[#CCFF00] mt-0.5">Bag</span>
        </button>

        <button 
          id="mobile-nav-profile-btn"
          onClick={() => user ? setIsProfileModalOpen(true) : handleOpenAuth('login')}
          className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white transition-colors"
        >
          {user ? (
            <div 
              className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
              style={{ backgroundColor: config.primaryColor }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <User className="w-4.5 h-4.5" />
          )}
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">
            {user ? 'Account' : 'Login'}
          </span>
        </button>
      </nav>

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
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onContinueShopping={() => setIsCartOpen(false)}
        onOrderPlaced={handleOrderPlaced}
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        config={config}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        config={config}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        onContinueShopping={() => {
          setIsProfileModalOpen(false);
          const el = document.getElementById('denim-catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
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
