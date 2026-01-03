import { Card, CardContent } from "./ui/card";
import { MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AreaCardProps {
  area: string;
  propertyCount?: number;
}

export const AreaCard = ({ area, propertyCount = 0 }: AreaCardProps) => {
  return (
    <Link to={`/properties?area=${encodeURIComponent(area)}`}>
      <Card className="property-card overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">{area}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {propertyCount} عقار متاح
                </p>
              </div>
            </div>
            <ArrowLeft className="h-5 w-5 text-primary flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
