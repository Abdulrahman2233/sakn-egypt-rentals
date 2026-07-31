import { Card, CardContent } from "./ui/card";
import { MapPin, ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AreaCardProps {
  area: string;
  propertyCount?: number;
  index?: number;
  featured?: boolean;
}

export const AreaCard = ({ area, propertyCount = 0, index = 0, featured = false }: AreaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link to={`/properties?area=${encodeURIComponent(area)}`} className="block h-full">
        <Card
          className={cn(
            "group relative overflow-hidden cursor-pointer h-full border-0 shadow-lg transition-all duration-500",
            featured
              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
              : "bg-card hover:shadow-2xl hover:shadow-primary/10"
          )}
        >
          {/* Decorative background pattern */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              featured
                ? "bg-[radial-gradient(circle_at_top_left,_hsl(var(--gold)/0.15),_transparent_50%)]"
                : "bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)/0.06),_transparent_60%)]"
            )}
          />

          {/* Gold accent line */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-1 transition-all duration-500",
              featured ? "bg-gold" : "bg-gold scale-x-0 group-hover:scale-x-100"
            )}
          />

          {/* Floating map pin watermark */}
          <div className="absolute -left-3 -bottom-4 opacity-[0.03] rotate-12 group-hover:rotate-0 group-hover:opacity-[0.06] transition-all duration-500">
            <MapPin className="h-24 w-24" />
          </div>

          <CardContent className="relative z-10 p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between gap-3 h-full">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={cn(
                    "p-3 sm:p-3.5 rounded-xl flex-shrink-0 transition-all duration-300",
                    featured
                      ? "bg-gold/20 text-gold"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  )}
                >
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      "font-bold text-sm sm:text-base md:text-lg truncate mb-0.5",
                      featured ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {area}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <Building2
                      className={cn(
                        "h-3 w-3",
                        featured ? "text-gold/80" : "text-muted-foreground"
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs sm:text-sm",
                        featured ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      {propertyCount} عقار متاح
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  featured
                    ? "bg-gold/20 text-gold group-hover:bg-gold group-hover:text-primary"
                    : "bg-muted text-muted-foreground group-hover:bg-gold group-hover:text-primary"
                )}
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
