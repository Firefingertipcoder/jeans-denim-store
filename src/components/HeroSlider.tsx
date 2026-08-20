import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Edit3 } from 'lucide-react';
import { BrandConfig, Gender, HeroSlide } from '../types';

interface HeroSliderProps {
  config: BrandConfig;
  onSelectCategory: (gender: Gender) => void;
  isEditMode: boolean;
  onEditSlide?: (slideIndex: number) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  config,
  onSelectCategory,
  isEditMode,
  onEditSlide
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = config.heroSlides || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <section id="hero-slider-section" className="relative w-full overflow-hidden bg-stone-900 select-none">
      <div className="relative min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center">
        {/* Background Image with dual vignette overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${currentSlide.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="w-full h-full bg-gradient-to-r from-black/90 via-black/50 to-black/80 z-10 absolute" />
        </div>

        {/* Slide Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 py-8 sm:py-16 text-white z-20 w-full">
          <div className="max-w-2xl">
            {/* Tagline / Eyebrow */}
            <span 
              className="font-black text-[10px] sm:text-xs tracking-widest uppercase mb-1.5 sm:mb-3 block"
              style={{ color: config.primaryColor }}
            >
              {currentSlide.tagline || "LIMITED RELEASE 2026"}
            </span>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-2 sm:mb-4 uppercase">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-sm text-gray-300 font-normal leading-relaxed max-w-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
              {currentSlide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <button
                id="hero-primary-cta-btn"
                onClick={() => onSelectCategory(currentSlide.ctaCategory)}
                className="bg-white text-black px-4 sm:px-8 py-2.5 sm:py-3.5 font-black text-[11px] sm:text-xs uppercase tracking-widest hover:text-white transition-colors duration-200 shadow-md"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.primaryColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                {currentSlide.ctaText}
              </button>

              {currentSlide.secondaryCtaText && (
                <button
                  id="hero-secondary-cta-btn"
                  onClick={() => onSelectCategory(currentSlide.secondaryCtaCategory || 'Women')}
                  className="border border-white/80 text-white px-4 sm:px-8 py-2.5 sm:py-3.5 font-black text-[11px] sm:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
                >
                  {currentSlide.secondaryCtaText}
                </button>
              )}
            </div>

            {/* Visual Edit Mode indicator on Hero */}
            {isEditMode && onEditSlide && (
              <button
                onClick={() => onEditSlide(currentSlideIndex)}
                className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400 text-stone-900 text-[10px] font-bold rounded-xs shadow-md hover:bg-amber-300"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Slide #{currentSlideIndex + 1}</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Arrow Controls (Desktop/Tablet only) */}
        {slides.length > 1 && (
          <div className="hidden md:block">
            <button
              id="hero-prev-slide-btn"
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/80 transition-all z-20 backdrop-blur-xs"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="hero-next-slide-btn"
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/80 transition-all z-20 backdrop-blur-xs"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Slide Indicators / Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1 transition-all duration-300 rounded-full ${
                  idx === currentSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
