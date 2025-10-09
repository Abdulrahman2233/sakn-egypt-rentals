import { Property } from "@/data/properties";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card className="property-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="card-gradient-overlay absolute inset-0" />
        
        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
            مميز
          </Badge>
        )}
        
        {/* Favorite Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        
        {/* Price */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">
                {property.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">جنيه/شهر</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title & Area */}
          <div>
            <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{property.rooms} غرف</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.bathrooms} حمام</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <span>{property.size} م²</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">
              {property.furnished ? "مفروشة" : "غير مفروشة"}
            </Badge>
            <Badge variant="outline">الطابق {property.floor}</Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <Link to={`/property/${property.id}`}>عرض التفاصيل</Link>
            </Button>
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
