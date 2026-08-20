import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  Ruler,
  Share2
} from 'lucide-react';
import { Product, ProductColor, BrandConfig, Review } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  config: BrandConfig;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onOpenFitGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  config,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenFitGuide
}) => {
  if (!isOpen || !product) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '32x32');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [justAdded, setJustAdded] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // New review form
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const gallery = activeColor?.gallery && activeColor.gallery.length > 0 
    ? activeColor.gallery 
    : [activeColor?.image || product.colors[0]?.image];
  const currentImage = gallery[selectedImageIndex] || gallery[0];

  const handleAdd = () => {
    onAddToCart(product, activeColor, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: 'Verified Buyer Review',
      comment: newReviewComment,
      fitFeedback: 'True to Size',
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div id="product-detail-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="product-detail-modal-card"
        className="relative bg-white w-full max-w-5xl rounded-xs shadow-2xl overflow-hidden my-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-white/90 hover:bg-black hover:text-white rounded-full transition-colors text-stone-700 shadow-md"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Gallery (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-100 p-4 sm:p-6 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-3/4 max-h-[500px] overflow-hidden bg-stone-200 rounded-xs group flex items-center justify-center">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              {/* Red Tab Label on Modal Stage */}
              <div 
                className="absolute top-4 left-0 text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-wider shadow-md"
                style={{ backgroundColor: config.primaryColor }}
              >
                {config.tabLabel}
              </div>

              {product.isIcon && (
                <div className="absolute bottom-4 left-4 bg-black/90 text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-widest">
                  ORIGINAL ICON
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {gallery.length > 1 && (
              <div className="flex items-center space-x-2 mt-4 overflow-x-auto py-1 max-w-full">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === selectedImageIndex ? 'border-black ring-2 ring-black/20' : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Config & Actions (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Product Code & Gender */}
              <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">
                <span>{product.gender} • {product.category}</span>
                <span className="font-mono text-[11px] text-stone-500">{product.code}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-black uppercase text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs text-stone-600 mt-1 font-medium leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-2 mt-2 pb-3 border-b border-stone-100">
                <div className="flex items-center text-amber-500 text-xs font-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-40'}`} />
                  ))}
                  <span className="ml-1.5 text-stone-900 font-bold">{product.rating}</span>
                </div>
                <span className="text-stone-300">|</span>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-stone-500 font-semibold underline hover:text-black"
                >
                  {reviewsList.length} Customer Reviews
                </button>
              </div>

              {/* Price & Discounts */}
              <div className="my-4 flex items-baseline space-x-3">
                <span className="text-2xl font-black text-stone-900">
                  {config.currencySymbol}{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-stone-400 line-through">
                      {config.currencySymbol}{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-red-600 px-1.5 py-0.5 bg-red-50 rounded-xs">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-stone-500 -mt-2 mb-4">Inclusive of all taxes. Free delivery on this style.</p>

              {/* Color Swatch Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase mb-2 text-stone-700">
                    <span>Color Wash: <strong className="text-black">{activeColor.name}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColorIndex(idx);
                          setSelectedImageIndex(0);
                        }}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          idx === selectedColorIndex ? 'ring-2 ring-stone-900 border-white scale-110' : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold uppercase mb-2 text-stone-700">
                  <span>Select Waist x Length: <strong className="text-black">{selectedSize}</strong></span>
                  <button
                    id="modal-open-fit-guide-link"
                    onClick={onOpenFitGuide}
                    className="inline-flex items-center space-x-1 text-red-600 hover:underline font-bold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Fit & Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold rounded-xs uppercase transition-all ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Wishlist */}
              <div className="space-y-2.5">
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG • {config.currencySymbol}{(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider border rounded-xs transition-colors flex items-center justify-center space-x-1.5 ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{showShareToast ? 'Link Copied!' : 'Share Style'}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 py-3 border-t border-stone-200 text-stone-600 text-[10px]">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="font-bold text-stone-800">Free Shipping</span>
                  <span>Above {config.currencySymbol}{config.freeShippingThreshold}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="font-bold text-stone-800">15-Day Exchange</span>
                  <span>Hassle-free return</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="font-bold text-stone-800">100% Genuine</span>
                  <span>Authentic denim</span>
                </div>
              </div>
            </div>

            {/* Accordion / Tabs: Details, Specs, Reviews */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="flex space-x-4 border-b border-stone-200 pb-2 text-xs font-extrabold uppercase">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors ${activeTab === 'details' ? 'text-black border-b-2 border-black' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  Description & Fit
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 transition-colors ${activeTab === 'specs' ? 'text-black border-b-2 border-black' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  Denim Specs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 transition-colors ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  Reviews ({reviewsList.length})
                </button>
              </div>

              {/* Tab: Details */}
              {activeTab === 'details' && (
                <div className="pt-3 text-xs text-stone-600 space-y-2">
                  <p className="leading-relaxed">{product.description}</p>
                  <ul className="list-disc pl-4 space-y-1 text-stone-700 font-medium pt-2">
                    {product.details?.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab: Specs */}
              {activeTab === 'specs' && (
                <div className="pt-3 text-xs space-y-2">
                  <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xs border border-stone-200">
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Waist Rise</span>
                      <span className="font-semibold text-stone-800">{product.rise}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Leg Opening</span>
                      <span className="font-semibold text-stone-800">{product.legOpening}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Stretch Level</span>
                      <span className="font-semibold text-stone-800">{product.stretch}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-bold block text-[10px] uppercase">Fabric Composition</span>
                      <span className="font-semibold text-stone-800">{product.composition}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Reviews */}
              {activeTab === 'reviews' && (
                <div className="pt-3 space-y-4 max-h-56 overflow-y-auto">
                  {/* Write a quick review */}
                  <form onSubmit={handleAddReview} className="bg-stone-50 p-3 rounded-xs border border-stone-200 space-y-2">
                    <span className="text-[11px] font-bold uppercase text-stone-700 block">Leave a Review</span>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="w-1/2 text-xs p-1.5 bg-white border border-stone-300 rounded-xs"
                        required
                      />
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-1/2 text-xs p-1.5 bg-white border border-stone-300 rounded-xs font-bold"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                        <option value={3}>⭐⭐⭐ (3/5)</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="How do they fit? How is the wash & denim quality?"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={2}
                      className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded-xs"
                      required
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-stone-900 text-white text-[10px] font-black uppercase tracking-wider rounded-xs hover:bg-black"
                    >
                      Post Review
                    </button>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="text-xs border-b border-stone-100 pb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{rev.author}</span>
                          <span className="text-[10px] text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-500 my-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                          <span className="text-[10px] font-semibold text-stone-600 ml-1">({rev.fitFeedback})</span>
                        </div>
                        <p className="text-stone-600 mt-1 font-normal">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
