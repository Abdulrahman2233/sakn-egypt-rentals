import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaTileCardProps {
  area: string;
  propertyCount?: number;
  icon: LucideIcon;
  index?: number;
  className?: string;
}

const hexagon = {
  clipPath:
    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
};

export const AreaTileCard = ({
  area,
  propertyCount = 0,
  icon: Icon,
  index = 0,
  className,
}: AreaTileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      whileTap={{ scale: 0.97 }}
      className={cn("h-full", className)}
    >
      <Link
        to={`/properties?area=${encodeURIComponent(area)}`}
        className="group relative flex h-full flex-col items-center justify-start gap-2 overflow-hidden rounded-2xl bg-card px-2 pt-5 pb-4 text-center shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.18)] ring-1 ring-primary/5 transition-all duration-300 hover:shadow-[0_10px_28px_-8px_hsl(var(--primary)/0.28)]"
      >
        {/* Hexagon icon */}
        <div
          className="flex h-14 w-14 items-center justify-center bg-primary transition-colors duration-300 group-hover:bg-gold sm:h-16 sm:w-16"
          style={hexagon}
        >
          <Icon
            className="h-6 w-6 text-primary-foreground transition-colors duration-300 group-hover:text-primary sm:h-7 sm:w-7"
            strokeWidth={1.75}
          />
        </div>

        <h3 className="mt-1 line-clamp-1 w-full text-sm font-bold text-foreground sm:text-base">
          {area}
        </h3>

        <p className="text-[11px] text-muted-foreground sm:text-xs">
          <span className="font-semibold text-primary">{propertyCount}</span> عقار متاح
        </p>

        {/* Chevron */}
        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
        </span>

        {/* Bottom accent bar */}
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1/2 -translate-x-1/2 rounded-t-full bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:bg-gold" />
      </Link>
    </motion.div>
  );
};
