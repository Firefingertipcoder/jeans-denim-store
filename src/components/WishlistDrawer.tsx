import React from 'react';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product, BrandConfig } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  config: BrandConfig;
  onRemoveFromWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  config,
  onRemoveFromWishlist,
  onQuickView,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div id="wishlist-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              SAVED STYLES ({wishlistedProducts.length})
            </h2>
          </div>
          <button 
            id="close-wishlist-drawer-btn"
            onClick={onClose} 
            className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="py-4 flex space-x-3 group">
                <img
                  src={product.colors[0]?.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded-xs border border-stone-200 cursor-pointer flex-shrink-0"
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="text-xs font-black uppercase text-stone-900 cursor-pointer hover:text-red-600 line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500">{product.fitType} • {product.gender}</p>
                    
                    <div className="text-xs font-black text-stone-900 mt-1">
                      {config.currencySymbol}{product.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="mt-2 w-full py-2 bg-stone-900 text-white text-[10px] font-black uppercase tracking-wider rounded-xs hover:bg-black flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Quick Add To Bag</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-sm font-black uppercase text-stone-800">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 mt-1">Click the heart icon on any pair of jeans or jacket to save for later.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
              }}
              className="w-full py-3 bg-stone-900 text-white text-xs font-black uppercase tracking-widest rounded-xs hover:bg-black flex items-center justify-center space-x-2"
            >
              <span>Move All to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
