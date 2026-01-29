import { Property } from "@/data/properties";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Phone, Percent, Eye, Calendar, ChevronLeft, Sparkles } from "lucide-react";
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card className={cn(
        "group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 bg-card h-full",
        isListView && "flex flex-col sm:flex-row"
      )}>
        {/* Image Section */}
        <div className={cn(
          "relative overflow-hidden",
          isListView ? "h-48 sm:h-auto sm:w-72 lg:w-80 flex-shrink-0" : "h-52 sm:h-56"
        )}>
          {/* Skeleton Loader */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          
          <img 
            src={property.images[0]} 
            alt={property.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Top Badges Row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              {/* Discount Badge */}
              {property.discount && property.discount > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 shadow-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 rounded-full">
                    <Percent className="h-3 w-3" />
                    <span>خصم {property.discount}%</span>
                  </Badge>
                </motion.div>
              )}
              
              {/* Featured Badge */}
              {property.featured && (
                <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-0 shadow-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 rounded-full">
                  <Sparkles className="h-3 w-3" />
                  <span>مميز</span>
                </Badge>
              )}
            </div>
            
            {/* Favorite Button */}
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg border-0"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                }}
              >
                <Heart className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"
                )} />
              </Button>
            </motion.div>
          </div>
          
          {/* Property Type Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-white/95 text-foreground border-0 backdrop-blur-sm shadow-md px-3 py-1 text-xs font-semibold rounded-full">
              {property.type}
            </Badge>
          </div>
          
          {/* Image Count Indicator */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{property.images.length} صور</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={cn(
          "flex flex-col",
          isListView ? "flex-1 p-4 sm:p-5" : "p-4"
        )}>
          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                {/* Original Price if discount exists */}
                {property.originalPrice && property.discount && (
                  <span className="text-sm text-muted-foreground line-through block">
                    {property.originalPrice.toLocaleString()} جنيه
                  </span>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className={cn(
                    "text-2xl sm:text-3xl font-bold",
                    property.discount ? "text-red-500" : "text-primary"
                  )}>
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">جنيه/شهر</span>
                </div>
              </div>
              
              {/* Savings Badge */}
              {property.originalPrice && property.discount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-lg"
                >
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    وفّر {(property.originalPrice - property.price).toLocaleString()} جنيه
                  </span>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-1.5 group-hover:text-primary transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
              <span className="text-sm truncate">{property.area}</span>
            </div>
          </div>

          {/* Property Features */}
          <div className={cn(
            "grid gap-2 mb-4",
            isListView ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
          )}>
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
              <Bed className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-semibold">{property.rooms}</span>
                <span className="text-muted-foreground mr-1">غرف</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
              <Bath className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-semibold">{property.bathrooms}</span>
                <span className="text-muted-foreground mr-1">حمام</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
              <Maximize2 className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-semibold">{property.size}</span>
                <span className="text-muted-foreground mr-1">م²</span>
              </div>
            </div>
            {isListView && (
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <span className="font-semibold">الطابق {property.floor}</span>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.discount && (
              <Badge variant="destructive" className="text-xs rounded-full px-2.5 animate-pulse">
                عرض خاص
              </Badge>
            )}
            <Badge variant="outline" className="text-xs rounded-full px-2.5 bg-background">
              {property.furnished ? "مفروشة" : "غير مفروشة"}
            </Badge>
            {!isListView && (
              <Badge variant="outline" className="text-xs rounded-full px-2.5 bg-background">
                الطابق {property.floor}
              </Badge>
            )}
          </div>

          {/* Spacer for list view */}
          {isListView && <div className="flex-1" />}

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button asChild className="flex-1 h-11 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all group/btn">
              <Link to={`/property/${property.id}`} className="flex items-center justify-center gap-2">
                عرض التفاصيل
                <ChevronLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-11 w-11 rounded-xl border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
