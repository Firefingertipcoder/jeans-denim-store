import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check, Edit2 } from 'lucide-react';
import { Product, ProductColor, BrandConfig } from '../types';

interface ProductCardProps {
  product: Product;
  config: BrandConfig;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  isEditMode?: boolean;
  onEditProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  isEditMode,
  onEditProduct
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>('');
  const [justAdded, setJustAdded] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const displayImage = isHovered && activeColor?.gallery && activeColor.gallery.length > 1
    ? activeColor.gallery[1]
    : activeColor?.image || product.colors[0]?.image;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQuickSize(size);
    onAddToCart(product, activeColor, size);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedQuickSize('');
    }, 1800);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-gray-100 flex flex-col justify-between overflow-hidden hover:border-black transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-3/4 w-full bg-[#F5F5F5] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Brand Label on Edge */}
        <div
          className="absolute top-3 left-0 text-white text-[8px] font-black uppercase px-2 py-0.5 tracking-widest"
          style={{ backgroundColor: config.primaryColor }}
          title={config.tabLabel}
        >
          {config.tabLabel || "RAW"}
        </div>

        {/* Badges: Best Seller, New, Icon */}
        <div className="absolute top-3 right-3 flex flex-col items-end space-y-1 z-10">
          {product.isIcon && (
            <span className="bg-black text-white text-[8px] font-black uppercase px-2 py-0.5 tracking-widest">
              ARCHIVE
            </span>
          )}
          {product.isBestSeller && !product.isIcon && (
            <span 
              className="text-white text-[8px] font-black uppercase px-2 py-0.5 tracking-widest"
              style={{ backgroundColor: config.primaryColor }}
            >
              BESTSELLER
            </span>
          )}
          {product.isNew && (
            <span className="bg-black text-white text-[8px] font-bold uppercase px-2 py-0.5 tracking-widest">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 sm:top-10 right-2 sm:right-3 p-1.5 transition-all z-20 ${
            isWishlisted
              ? 'bg-[#E11D48] text-white opacity-100'
              : 'bg-white/90 text-gray-700 hover:bg-black hover:text-white opacity-90 md:opacity-0 md:group-hover:opacity-100 shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on hover (Desktop) */}
        <button
          id={`quick-view-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#E11D48] transition-colors opacity-0 group-hover:opacity-100 items-center space-x-1.5 whitespace-nowrap z-10"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Hover Quick Size Selector */}
        {isHovered && product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 bg-black/95 p-2 text-white transform translate-y-0 transition-all z-20">
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-300 mb-1 flex items-center justify-between">
              <span>Quick Size:</span>
              {justAdded && (
                <span className="text-[#E11D48] font-bold flex items-center">
                  <Check className="w-3 h-3 mr-0.5" /> Added!
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAdd(sz, e)}
                  className="px-2 py-0.5 text-[9px] font-black bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-colors"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Color Wash Swatches */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center space-x-1.5 mb-2.5">
              {product.colors.map((col, idx) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-3.5 h-3.5 border transition-all ${
                    idx === selectedColorIndex ? 'ring-1 ring-black scale-110' : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider pl-1">
                {product.colors.length} Washes
              </span>
            </div>
          )}

          {/* Subtitle / Fit Badge */}
          <div className="flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">
            <span>{product.gender}</span>
            <span>•</span>
            <span className="text-gray-600">{product.fitType}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-xs font-black uppercase tracking-wider text-black hover:text-[#E11D48] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Description line */}
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-normal">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          {/* Price & Discount */}
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs font-black text-black tracking-wider">
                {config.currencySymbol}{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-gray-400 line-through">
                  {config.currencySymbol}{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span className="text-[9px] font-bold text-[#E11D48] uppercase tracking-wider">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center text-[10px] text-gray-600 font-bold">
            <Star className="w-3 h-3 fill-black text-black mr-1" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Visual Edit Product Trigger in Edit Mode */}
        {isEditMode && onEditProduct && (
          <button
            onClick={() => onEditProduct(product)}
            className="mt-2 w-full py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold uppercase flex items-center justify-center space-x-1 border border-amber-300"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Denim Spec</span>
          </button>
        )}
      </div>
    </div>
  );
};
