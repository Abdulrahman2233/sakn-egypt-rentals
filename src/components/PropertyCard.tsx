import { Property } from "@/data/properties";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Phone, ArrowLeft, Lock, Star, BadgeCheck, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  variant?: "grid" | "list";
}

export const PropertyCard = ({ property, variant = "grid" }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isListView = variant === "list";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full group"
    >
      <Card
        className={cn(
          "relative overflow-hidden h-full bg-card rounded-xl border border-border/60",
          "shadow-[0_2px_12px_-4px_hsl(var(--primary)/0.08)] hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.35)]",
          "transition-all duration-500",
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/40 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity",
          isListView && "flex flex-col sm:flex-row"
        )}
      >
        {/* ─── Image Section ─────────────────────────── */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isListView ? "h-56 sm:h-auto sm:w-72 lg:w-80 flex-shrink-0" : "h-60 sm:h-64"
          )}
        >
          {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

          <img
            src={property.images[0]}
            alt={property.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.08]",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Subtle dark gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-90" />

          {/* Booked overlay */}
          {property.isBooked && (
            <div className="absolute inset-0 bg-primary/75 backdrop-blur-sm z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-2.5 text-center px-4"
              >
                <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-gold" />
                </div>
                <span className="text-primary-foreground font-bold text-lg tracking-wider">تم الحجز</span>
                <span className="text-primary-foreground/70 text-xs">هذا العقار غير متاح حالياً</span>
              </motion.div>
            </div>
          )}

          {/* Top-left badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {property.featured && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 bg-primary/90 backdrop-blur-md text-gold px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wider uppercase border border-gold/30 shadow-lg"
              >
                <Crown className="h-3 w-3" />
                مميز
              </motion.div>
            )}
            {property.discount && property.discount > 0 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-1 gradient-gold text-primary px-3 py-1.5 rounded-md text-[11px] font-extrabold shadow-lg"
              >
                خصم {property.discount}%
              </motion.div>
            )}
          </div>

          {/* Favorite */}
          <motion.div whileTap={{ scale: 0.9 }} className="absolute top-4 left-4 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className="h-10 w-10 rounded-full bg-background/90 hover:bg-background backdrop-blur-md shadow-lg border border-border/40 flex items-center justify-center transition-all hover:scale-105"
              aria-label="إضافة للمفضلة"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isFavorite ? "fill-destructive text-destructive scale-110" : "text-foreground"
                )}
              />
            </button>
          </motion.div>

          {/* Bottom info on image */}
          <div className="absolute bottom-0 right-0 left-0 p-4 z-10 flex items-end justify-between gap-3">
            <div className="flex items-center gap-2 text-primary-foreground">
              <div className="h-px w-6 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                {property.type}
              </span>
            </div>
            {property.images.length > 1 && (
              <span className="bg-background/15 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground text-[11px] px-2.5 py-1 rounded-md font-medium">
                {property.images.length} صور
              </span>
            )}
          </div>
        </div>

        {/* ─── Content Section ───────────────────────── */}
        <div className={cn("flex flex-col", isListView ? "flex-1 p-5 sm:p-6" : "p-5")}>
          {/* Title & location */}
          <div className="mb-4">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-2 text-foreground group-hover:text-gold-deep transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gold" />
              <span className="text-sm truncate">{property.area}</span>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-border" />
              <span className="text-xs">الطابق {property.floor}</span>
            </div>
          </div>

          {/* Gold divider */}
          <div className="gold-divider mb-4" />

          {/* Features row */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { icon: Bed, value: property.rooms, label: "غرف" },
              { icon: Bath, value: property.bathrooms, label: "حمام" },
              { icon: Maximize2, value: property.size, label: "م²" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center py-2 px-1 rounded-md bg-muted/40 border border-border/40"
                >
                  <Icon className="h-4 w-4 text-gold-deep mb-1" />
                  <div className="text-xs leading-tight">
                    <span className="font-bold text-foreground">{f.value}</span>
                    <span className="text-muted-foreground mr-1 text-[11px]">{f.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-5 text-xs">
            {property.furnished && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <BadgeCheck className="h-3.5 w-3.5 text-gold" />
                مفروشة
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-gold fill-gold" />
              4.8
            </span>
          </div>

          {isListView && <div className="flex-1" />}

          {/* Price + Actions */}
          <div className="mt-auto pt-4 border-t border-border/60">
            <div className="flex items-end justify-between gap-3 mb-4">
              <div>
                {property.originalPrice && property.discount && (
                  <span className="text-xs text-muted-foreground line-through block leading-none mb-1">
                    {property.originalPrice.toLocaleString()} ج
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl sm:text-[1.7rem] font-extrabold text-primary leading-none tracking-tight">
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">ج / شهر</span>
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-md border-border hover:border-gold hover:bg-gold/10 hover:text-gold-deep flex-shrink-0"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>

            <Button
              asChild
              className="w-full h-11 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover font-semibold shadow-md ring-1 ring-gold/30 group/btn"
            >
              <Link to={`/property/${property.id}`} className="flex items-center justify-center gap-2">
                <span>عرض التفاصيل</span>
                <ArrowLeft className="h-4 w-4 text-gold transition-transform group-hover/btn:-translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
