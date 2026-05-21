import { Property } from "@/data/properties";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Building2, Sparkles, Tag, Layers } from "lucide-react";
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
  const savings =
    property.originalPrice && property.originalPrice > property.price
      ? property.originalPrice - property.price
      : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full group"
    >
      <Link
        to={`/property/${property.id}`}
        className={cn(
          "relative flex flex-col h-full bg-card rounded-2xl overflow-hidden",
          "border border-border/70 shadow-[0_2px_10px_-2px_hsl(var(--primary)/0.06)]",
          "hover:shadow-[0_20px_40px_-12px_hsl(var(--primary)/0.18)] hover:border-primary/20",
          "transition-all duration-300",
          isListView && "sm:flex-row"
        )}
      >
        {/* ─── IMAGE ─────────────────────────────────── */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isListView ? "h-52 sm:h-auto sm:w-72 flex-shrink-0" : "h-52"
          )}
        >
          {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
          <img
            src={property.images[0]}
            alt={property.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Booked overlay */}
          {property.isBooked && (
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <span className="bg-gold text-primary font-extrabold text-sm px-5 py-2 rounded-full shadow-lg tracking-wider">
                تم الحجز
              </span>
            </div>
          )}

          {/* Type badge — top right (RTL = visual left) */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
              <Building2 className="h-3.5 w-3.5 text-gold" />
              {property.type}
            </span>
          </div>

          {/* Heart — top left (RTL = visual right) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 left-3 z-10 h-9 w-9 rounded-full bg-background/95 backdrop-blur-md shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="إضافة للمفضلة"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-destructive text-destructive" : "text-foreground"
              )}
            />
          </button>
        </div>

        {/* ─── CONTENT ───────────────────────────────── */}
        <div className={cn("flex flex-col p-4", isListView && "flex-1")}>
          {/* Savings pill + price row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {property.originalPrice && property.originalPrice > property.price && (
                <span className="block text-[11px] text-muted-foreground line-through leading-none mb-1">
                  {property.originalPrice.toLocaleString()} جنيه
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-extrabold text-primary leading-none tracking-tight">
                  {property.price.toLocaleString()}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">جنيه/شهر</span>
              </div>
            </div>

            {savings > 0 && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-700 px-2.5 py-1 rounded-md text-[11px] font-bold flex-shrink-0 border border-emerald-500/20">
                وفر {savings.toLocaleString()} جنيه
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base leading-snug line-clamp-1 mb-1.5 text-foreground text-right group-hover:text-primary transition-colors">
            {property.name}
          </h3>

          {/* Location */}
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground mb-3">
            <span className="text-xs">{property.area}</span>
            <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" />
          </div>

          {/* Features pills */}
          <div className="grid grid-cols-3 gap-1.5 mb-2.5">
            <span className="inline-flex items-center justify-center gap-1 text-[11px] py-1.5 px-1 rounded-md border border-border bg-muted/30 text-foreground">
              <Maximize2 className="h-3 w-3 text-muted-foreground" />
              <span className="font-bold">{property.size}</span>
              <span className="text-muted-foreground">م²</span>
            </span>
            <span className="inline-flex items-center justify-center gap-1 text-[11px] py-1.5 px-1 rounded-md border border-border bg-muted/30 text-foreground">
              <Bath className="h-3 w-3 text-muted-foreground" />
              <span className="font-bold">{property.bathrooms}</span>
              <span className="text-muted-foreground">حمام</span>
            </span>
            <span className="inline-flex items-center justify-center gap-1 text-[11px] py-1.5 px-1 rounded-md border border-border bg-muted/30 text-foreground">
              <Bed className="h-3 w-3 text-muted-foreground" />
              <span className="font-bold">{property.rooms}</span>
              <span className="text-muted-foreground">غرف</span>
            </span>
          </div>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            <span className="inline-flex items-center gap-1 text-[10px] py-1 px-2 rounded-md bg-accent text-accent-foreground font-semibold">
              <Layers className="h-2.5 w-2.5" />
              الطابق {property.floor}
            </span>
            {property.discount && property.discount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] py-1 px-2 rounded-md bg-orange-500/15 text-orange-700 font-semibold border border-orange-500/20">
                <Tag className="h-2.5 w-2.5" />
                عرض خاص
              </span>
            )}
            {property.furnished && (
              <span className="inline-flex items-center gap-1 text-[10px] py-1 px-2 rounded-md bg-gold-soft text-gold-deep font-semibold">
                <Sparkles className="h-2.5 w-2.5" />
                مفروشة
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
