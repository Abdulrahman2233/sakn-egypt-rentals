import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, Share2, ChevronLeft, ChevronRight, 
  Star, Tag, X, ZoomIn, Images, Play
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
  const [isHovering, setIsHovering] = useState(false);

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
      await navigator.share({
        title: propertyName,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Keyboard navigation for fullscreen
  useEffect(() => {
    if (!showFullscreen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') prevImage();
      if (e.key === 'ArrowLeft') nextImage();
      if (e.key === 'Escape') setShowFullscreen(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullscreen, nextImage, prevImage]);

  // Desktop: Mosaic Grid Layout
  const renderDesktopGallery = () => {
    const mainImage = images[0];
    const secondaryImages = images.slice(1, 5);
    const hasMoreImages = images.length > 5;

    return (
      <div 
        className="hidden md:grid gap-2 h-[500px]"
        style={{
          gridTemplateColumns: secondaryImages.length > 0 ? '2fr 1fr' : '1fr',
          gridTemplateRows: 'repeat(2, 1fr)',
        }}
      >
        {/* Main Large Image */}
        <motion.div
          className="relative row-span-2 cursor-pointer overflow-hidden rounded-r-2xl group"
          onClick={() => openFullscreen(0)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={mainImage}
            alt={propertyName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Zoom Icon on Hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <ZoomIn className="h-8 w-8 text-foreground" />
            </div>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {featured && (
              <Badge className="bg-secondary text-secondary-foreground shadow-lg gap-1 px-3 py-1.5">
                <Star className="h-3.5 w-3.5 fill-current" />
                مميز
              </Badge>
            )}
            {discount && (
              <Badge className="bg-destructive text-destructive-foreground shadow-lg gap-1 px-3 py-1.5">
                <Tag className="h-3.5 w-3.5" />
                خصم {discount}%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Secondary Images Grid */}
        {secondaryImages.map((image, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer overflow-hidden group ${
              index === 0 ? 'rounded-tr-2xl' : ''
            } ${index === secondaryImages.length - 1 || index === 1 ? 'rounded-tl-2xl' : ''}`}
            onClick={() => openFullscreen(index + 1)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image}
              alt={`${propertyName} - ${index + 2}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {/* Show More Overlay on Last Image */}
            {hasMoreImages && index === secondaryImages.length - 1 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <Images className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-bold text-lg">+{images.length - 5}</span>
                  <div className="text-sm opacity-80">صورة</div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Mobile: Swipeable Carousel
  const renderMobileCarousel = () => (
    <div className="md:hidden relative">
      <div className="relative h-[300px] sm:h-[350px] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${propertyName} - ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => openFullscreen(currentIndex)}
          />
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {featured && (
            <Badge className="bg-secondary text-secondary-foreground shadow-lg gap-1 px-2.5 py-1 text-xs">
              <Star className="h-3 w-3 fill-current" />
              مميز
            </Badge>
          )}
          {discount && (
            <Badge className="bg-destructive text-destructive-foreground shadow-lg gap-1 px-2.5 py-1 text-xs">
              <Tag className="h-3 w-3" />
              {discount}%
            </Badge>
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center z-10"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center z-10"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium z-10">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderDesktopGallery()}
      {renderMobileCarousel()}

      {/* Action Buttons - Below Gallery */}
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover:bg-muted"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="hidden sm:inline">{isFavorite ? "تم الحفظ" : "حفظ"}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover:bg-muted"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">مشاركة</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover:bg-muted md:hidden"
          onClick={() => openFullscreen(0)}
        >
          <Images className="h-4 w-4" />
          <span>عرض الكل</span>
        </Button>
      </div>

      {/* Fullscreen Gallery Modal */}
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
              <div className="text-white font-medium">
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
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  src={images[currentIndex]}
                  alt={`${propertyName} - ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-7 w-7 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-7 w-7 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                    className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all ${
                      currentIndex === index
                        ? "ring-2 ring-white scale-110"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
