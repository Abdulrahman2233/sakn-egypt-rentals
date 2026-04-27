import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart, Share2, ChevronLeft, ChevronRight,
  Star, Tag, X, Expand, Images, Grid3x3,
} from "lucide-react";

interface PropertyImageCarouselProps {
  images: string[];
  propertyName: string;
  featured?: boolean;
  discount?: number;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  description?: string;
}

export const PropertyImageCarousel = ({
  images,
  propertyName,
  featured,
  discount,
  isFavorite,
  setIsFavorite,
  description,
}: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setShowFullscreen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyName,
          text: description,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!showFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") prevImage();
      if (e.key === "ArrowLeft") nextImage();
      if (e.key === "Escape") setShowFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFullscreen, nextImage, prevImage]);

  // Swipe handling (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      // RTL: swipe right = next, swipe left = prev
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
  };

  const Badges = ({ compact = false }: { compact?: boolean }) => (
    <div className={`absolute ${compact ? "top-3 right-3 gap-1.5" : "top-4 right-4 gap-2"} flex flex-col z-10`}>
      {featured && (
        <Badge className={`bg-secondary text-secondary-foreground shadow-lg gap-1 ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5"}`}>
          <Star className={`${compact ? "h-3 w-3" : "h-3.5 w-3.5"} fill-current`} />
          مميز
        </Badge>
      )}
      {discount && (
        <Badge className={`bg-destructive text-destructive-foreground shadow-lg gap-1 ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5"}`}>
          <Tag className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
          خصم {discount}%
        </Badge>
      )}
    </div>
  );

  const FloatingActions = ({ compact = false }: { compact?: boolean }) => (
    <div className={`absolute ${compact ? "top-3 left-3 gap-1.5" : "top-4 left-4 gap-2"} flex z-10`}>
      <button
        onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
        className={`${compact ? "w-9 h-9" : "w-10 h-10"} rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all`}
        aria-label="حفظ"
      >
        <Heart className={`${compact ? "h-4 w-4" : "h-[18px] w-[18px]"} transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleShare(); }}
        className={`${compact ? "w-9 h-9" : "w-10 h-10"} rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all`}
        aria-label="مشاركة"
      >
        <Share2 className={`${compact ? "h-4 w-4" : "h-[18px] w-[18px]"} text-foreground`} />
      </button>
    </div>
  );

  // ============ DESKTOP: Airbnb-style mosaic ============
  const renderDesktopGallery = () => {
    const mainImage = images[0];
    const secondaryImages = images.slice(1, 5);
    const hasOnlyOne = images.length === 1;

    return (
      <div className="hidden md:block relative">
        <div
          className={`relative grid gap-2 h-[480px] lg:h-[520px] rounded-2xl overflow-hidden ring-1 ring-border/50 shadow-sm ${
            hasOnlyOne ? "grid-cols-1" : "grid-cols-4 grid-rows-2"
          }`}
        >
          {/* Main Image */}
          <motion.button
            type="button"
            onClick={() => openFullscreen(0)}
            className={`relative overflow-hidden group ${hasOnlyOne ? "" : "col-span-2 row-span-2"}`}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={mainImage}
              alt={propertyName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>

          {/* Secondary Images */}
          {secondaryImages.map((image, index) => {
            const isLast = index === secondaryImages.length - 1;
            const hasMore = images.length > 5;
            return (
              <motion.button
                type="button"
                key={index}
                onClick={() => openFullscreen(index + 1)}
                className="relative overflow-hidden group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={image}
                  alt={`${propertyName} - ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {hasMore && isLast && (
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="text-center text-white">
                      <Images className="h-7 w-7 mx-auto mb-1.5 opacity-90" />
                      <div className="font-bold text-xl">+{images.length - 5}</div>
                      <div className="text-xs opacity-80">صورة</div>
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Badges & Actions Overlay */}
        <Badges />
        <FloatingActions />

        {/* Show-all pill button */}
        <button
          onClick={() => openFullscreen(0)}
          className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md hover:bg-white text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-border/40 transition-all hover:scale-105 active:scale-95"
        >
          <Grid3x3 className="h-4 w-4" />
          عرض كل الصور ({images.length})
        </button>
      </div>
    );
  };

  // ============ MOBILE: cinematic carousel ============
  const renderMobileCarousel = () => (
    <div className="md:hidden relative">
      <div
        className="relative h-[320px] sm:h-[380px] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/50 shadow-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${propertyName} - ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => openFullscreen(currentIndex)}
          />
        </AnimatePresence>

        {/* Bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <Badges compact />
        <FloatingActions compact />

        {/* Counter */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-semibold z-10 tabular-nums">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center z-10 active:scale-90 transition-transform"
              aria-label="السابق"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center z-10 active:scale-90 transition-transform"
              aria-label="التالي"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}

        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.slice(0, Math.min(images.length, 8)).map((_, index) => {
            const activeIdx = Math.min(currentIndex, 7);
            const showIdx = images.length > 8 && index === 7 ? activeIdx : index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(showIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === showIdx ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`الصورة ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-200 ${
                currentIndex === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={image} alt={`مصغرة ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* View all button */}
      <button
        onClick={() => openFullscreen(0)}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-muted/60 hover:bg-muted text-foreground text-sm font-semibold py-2.5 rounded-xl border border-border/60 transition-colors"
      >
        <Grid3x3 className="h-4 w-4" />
        عرض جميع الصور ({images.length})
      </button>
    </div>
  );

  return (
    <>
      {renderDesktopGallery()}
      {renderMobileCarousel()}

      {/* ============ Fullscreen Modal ============ */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
            onClick={() => setShowFullscreen(false)}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white font-medium tabular-nums">
                <span className="text-xl">{currentIndex + 1}</span>
                <span className="text-white/60 text-lg"> / {images.length}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                onClick={() => setShowFullscreen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Main Image */}
            <div
              className="flex-1 flex items-center justify-center px-4 md:px-20"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  src={images[currentIndex]}
                  alt={`${propertyName} - ${currentIndex + 1}`}
                  className="max-w-full max-h-[78vh] object-contain rounded-lg select-none"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all ${
                      currentIndex === index
                        ? "ring-2 ring-white scale-110"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
