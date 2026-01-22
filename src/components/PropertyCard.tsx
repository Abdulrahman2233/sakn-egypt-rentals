import { Property } from "@/data/properties";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Phone, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="property-card overflow-hidden group h-full">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="card-gradient-overlay absolute inset-0" />
          
          {/* Discount Badge */}
          {property.discount && property.discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-3 left-3 z-10"
            >
              <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 shadow-lg px-2 py-1 text-xs font-bold flex items-center gap-1">
                <Percent className="h-3 w-3" />
                <span>خصم {property.discount}%</span>
              </Badge>
            </motion.div>
          )}
          
          {/* Featured Badge - positioned after discount if exists */}
          {property.featured && (
            <Badge className={`absolute ${property.discount ? 'top-10' : 'top-3'} left-3 bg-secondary text-secondary-foreground text-xs`}>
              مميز
            </Badge>
          )}
          
          {/* Favorite Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 h-9 w-9"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart className={`h-4 w-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          
          {/* Price */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <div className="flex flex-col">
                {/* Original Price if discount exists */}
                {property.originalPrice && property.discount && (
                  <span className="text-xs text-muted-foreground line-through">
                    {property.originalPrice.toLocaleString()} جنيه
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg sm:text-xl md:text-2xl font-bold ${property.discount ? 'text-red-500' : 'text-primary'}`}>
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">جنيه/شهر</span>
                </div>
              </div>
            </div>
            
            {/* Savings Badge */}
            {property.originalPrice && property.discount && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-lg"
              >
                <span className="text-xs text-white font-medium">
                  وفّر {(property.originalPrice - property.price).toLocaleString()} جنيه
                </span>
              </motion.div>
            )}
          </div>
        </div>

        <CardContent className="p-3 sm:p-4">
          <div className="space-y-2 sm:space-y-3">
            {/* Title & Area */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-1">{property.name}</h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{property.area}</span>
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span>{property.rooms} غرف</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span>{property.bathrooms} حمام</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span>{property.size} م²</span>
              </div>
            </div>

            {/* Tags - Scrollable on mobile */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
              {property.discount && (
                <Badge variant="destructive" className="text-xs flex-shrink-0 animate-pulse">
                  عرض خاص
                </Badge>
              )}
              <Badge variant="outline" className="text-xs flex-shrink-0">{property.type}</Badge>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {property.furnished ? "مفروشة" : "غير مفروشة"}
              </Badge>
              <Badge variant="outline" className="text-xs flex-shrink-0">الطابق {property.floor}</Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 sm:pt-2">
              <Button asChild className="flex-1 h-9 sm:h-10 text-sm">
                <Link to={`/property/${property.id}`}>عرض التفاصيل</Link>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
