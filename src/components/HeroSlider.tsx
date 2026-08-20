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
      <div className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Image with dual vignette overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-100 hover:scale-105"
          style={{
            backgroundImage: `url(${currentSlide.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="w-full h-full bg-gradient-to-r from-black/90 via-black/40 to-black/90 z-10 absolute" />
        </div>

        {/* Slide Content */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-24 text-white z-20 w-full">
          <div className="max-w-3xl">
            {/* Tagline / Eyebrow */}
            <span 
              className="font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block"
              style={{ color: config.primaryColor }}
            >
              {currentSlide.tagline || "LIMITED RELEASE 2024"}
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tighter text-white mb-6 uppercase">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-xl mb-8">
              {currentSlide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-primary-cta-btn"
                onClick={() => onSelectCategory(currentSlide.ctaCategory)}
                className="bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-widest hover:text-white transition-colors duration-200"
                style={{
                  '--hover-bg': config.primaryColor
                } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.primaryColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                {currentSlide.ctaText}
              </button>

              {currentSlide.secondaryCtaText && (
                <button
                  id="hero-secondary-cta-btn"
                  onClick={() => onSelectCategory(currentSlide.secondaryCtaCategory || 'Women')}
                  className="border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
                >
                  {currentSlide.secondaryCtaText}
                </button>
              )}
            </div>

            {/* Visual Edit Mode indicator on Hero */}
            {isEditMode && onEditSlide && (
              <button
                onClick={() => onEditSlide(currentSlideIndex)}
                className="mt-6 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400 text-stone-900 text-xs font-bold rounded-xs shadow-md hover:bg-amber-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Slide #{currentSlideIndex + 1} Content & Image</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        {slides.length > 1 && (
          <>
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
          </>
        )}

        {/* Slide Indicators / Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlideIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
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
