import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Grid2X2, 
  Grid3X3, 
  LayoutGrid, 
  Plus, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Product, ProductColor, Gender, DenimFit, WashType, BrandConfig } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  config: BrandConfig;
  activeGender: Gender;
  activeCategory: string;
  activeFit: string;
  onSelectGender: (gender: Gender) => void;
  onSelectCategory: (category: string) => void;
  onSelectFit: (fit: string) => void;
  onResetFilters: () => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  isEditMode: boolean;
  onAddNewProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  config,
  activeGender,
  activeCategory,
  activeFit,
  onSelectGender,
  onSelectCategory,
  onSelectFit,
  onResetFilters,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  isEditMode,
  onAddNewProduct,
  onEditProduct,
}) => {
  const [selectedWash, setSelectedWash] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = ['All', 'Jeans', 'Jackets', 'Shirts & Tops', 'Collections'];
  const fits: string[] = [
    'All',
    'Straight',
    'Slim',
    'Slim Taper',
    'Skinny',
    'Relaxed / Loose',
    'Bootcut & Flare',
    'Trucker Jacket'
  ];
  const washes: string[] = [
    'All',
    'Raw / Dark Indigo',
    'Medium Vintage',
    'Light Bleach',
    'Black & Grey'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Gender
    if (activeGender !== 'All') {
      list = list.filter(
        (p) => p.gender === activeGender || p.gender === 'Unisex'
      );
    }

    // Category
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Fit
    if (activeFit !== 'All') {
      list = list.filter((p) => p.fitType === activeFit);
    }

    // Wash
    if (selectedWash !== 'All') {
      list = list.filter((p) => p.wash === selectedWash);
    }

    // Sorting
    if (selectedSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [products, activeGender, activeCategory, activeFit, selectedWash, selectedSort]);

  const hasActiveFilters =
    activeGender !== 'All' ||
    activeCategory !== 'All' ||
    activeFit !== 'All' ||
    selectedWash !== 'All';

  return (
    <section id="denim-catalog-section" className="py-12 bg-white">
      <div className="w-full px-6 lg:px-10">
        {/* Main Section Title & Gender Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              EXPLORE OUR ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-0.5">
              {activeGender === 'All' ? 'ALL DENIM STYLES' : `${activeGender.toUpperCase()}'S COLLECTION`}
            </h2>
          </div>

          {/* Gender Pill Buttons */}
          <div className="flex items-center space-x-2">
            {(['All', 'Men', 'Women'] as Gender[]).map((gender) => (
              <button
                key={gender}
                onClick={() => onSelectGender(gender)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeGender === gender
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {gender === 'All' ? 'Everything' : gender}
              </button>
            ))}

            {/* Add Product Button in Edit Mode */}
            {isEditMode && (
              <button
                id="catalog-add-new-product-btn"
                onClick={onAddNewProduct}
                className="ml-2 inline-flex items-center space-x-1 px-3 py-2 bg-black hover:bg-gray-800 text-white text-[11px] font-black uppercase tracking-widest transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
          {/* Category Quick Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Grid View Controls */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1.5 bg-gray-100 px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <select
                id="catalog-sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent font-bold text-black focus:outline-none cursor-pointer text-[10px] uppercase tracking-wider"
              >
                <option value="featured">Featured / Iconic</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
            </div>

            {/* Grid density buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 border border-gray-100 p-0.5">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1 ${gridCols === 3 ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                aria-label="3 columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1 ${gridCols === 4 ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                aria-label="4 columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Filters: Fits & Washes Bar */}
        <div className="py-3 flex flex-wrap items-center gap-2 text-xs border-b border-gray-100 bg-[#FAFAFA] px-3 my-2">
          <span className="font-black uppercase text-gray-400 text-[9px] tracking-widest mr-1">
            Fit:
          </span>
          {fits.map((fit) => (
            <button
              key={fit}
              onClick={() => onSelectFit(fit)}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                activeFit === fit
                  ? 'bg-black text-white font-bold'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
              }`}
            >
              {fit}
            </button>
          ))}

          <div className="h-4 w-px bg-gray-300 mx-2 hidden sm:block" />

          <span className="font-black uppercase text-gray-400 text-[9px] tracking-widest mr-1">
            Wash:
          </span>
          {washes.map((wash) => (
            <button
              key={wash}
              onClick={() => setSelectedWash(wash)}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                selectedWash === wash
                  ? 'bg-black text-white font-bold'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
              }`}
            >
              {wash}
            </button>
          ))}

          {/* Clear Filters button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onResetFilters();
                setSelectedWash('All');
              }}
              className="ml-auto text-[10px] font-bold text-[#E11D48] hover:underline flex items-center space-x-1 uppercase tracking-wider"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Showing <span className="text-black">{filteredProducts.length}</span> styles
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${
              gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-2.5 sm:gap-4 lg:gap-6 pt-4`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                config={config}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isEditMode={isEditMode}
                onEditProduct={onEditProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-stone-50 border border-stone-200 rounded-xs my-6">
            <h3 className="text-base font-bold text-stone-900">No denim styles match the selected filters</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try choosing another fit, wash, or gender category to discover our collection.
            </p>
            <button
              onClick={() => {
                onResetFilters();
                setSelectedWash('All');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-black uppercase tracking-wider rounded-xs hover:bg-stone-800"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
