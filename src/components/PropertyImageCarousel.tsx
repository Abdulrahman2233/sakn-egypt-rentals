import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { 
  Heart, Share2, ChevronLeft, ChevronRight, 
  Eye, Star, Tag, X, ZoomIn
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setShowFullscreen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: propertyName,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <section className="container mx-auto px-4 py-4 lg:py-6">
        {/* Main Carousel */}
        <div className="relative rounded-2xl overflow-hidden bg-muted">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-0">
                  <motion.div
                    className="relative h-[300px] sm:h-[400px] lg:h-[500px] cursor-pointer group"
                    onClick={() => openFullscreen(index)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <img
                      src={image}
                      alt={`${propertyName} - صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <ZoomIn className="h-6 w-6 text-foreground" />
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
              {featured && (
                <Badge className="bg-primary text-primary-foreground shadow-lg">
                  <Star className="h-3 w-3 ml-1" />
                  مميز
                </Badge>
              )}
              {discount && (
                <Badge className="bg-destructive text-destructive-foreground shadow-lg">
                  <Tag className="h-3 w-3 ml-1" />
                  خصم {discount}%
                </Badge>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm font-medium z-10">
              {current + 1} / {images.length}
            </div>

            {/* View All Button */}
            <button
              onClick={() => openFullscreen(0)}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium shadow-lg hover:bg-white transition-colors z-10 flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              عرض الكل
            </button>
          </Carousel>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-3 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden transition-all ${
                  current === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`صورة مصغرة ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="hidden sm:inline">{isFavorite ? "تم الحفظ" : "حفظ"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
        </div>
      </section>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
              <div className="text-white">
                <span className="text-lg font-bold">{fullscreenIndex + 1}</span>
                <span className="text-white/60"> / {images.length}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={() => setShowFullscreen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center relative px-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={fullscreenIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={images[fullscreenIndex]}
                  alt={`${propertyName} - صورة ${fullscreenIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={() => setFullscreenIndex((prev) => (prev + 1) % images.length)}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setFullscreenIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all ${
                      fullscreenIndex === index
                        ? "ring-2 ring-white"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`صورة مصغرة ${index + 1}`}
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
