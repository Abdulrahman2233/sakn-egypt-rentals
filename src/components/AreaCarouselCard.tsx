import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaCarouselCardProps {
  area: string;
  propertyCount?: number;
  tag: string;
  index?: number;
  image?: string;
  className?: string;
}

const areaGradients = [
  "from-primary via-primary/95 to-primary/80",
  "from-primary/95 via-primary/90 to-primary/75",
  "from-[hsl(222,65%,18%)] via-[hsl(222,65%,14%)] to-[hsl(222,65%,10%)]",
  "from-[hsl(222,60%,22%)] via-[hsl(222,65%,14%)] to-[hsl(222,70%,8%)]",
  "from-primary/90 via-primary/85 to-primary/70",
  "from-[hsl(215,55%,20%)] via-[hsl(222,65%,14%)] to-[hsl(222,65%,10%)]",
];

export const AreaCarouselCard = ({
  area,
  propertyCount = 0,
  tag,
  index = 0,
  image,
  className,
}: AreaCarouselCardProps) => {
  const gradient = areaGradients[index % areaGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("snap-center shrink-0", className)}
    >
      <Link
        to={`/properties?area=${encodeURIComponent(area)}`}
        className="group block"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-tr-[48px] rounded-bl-[48px] md:rounded-tr-[60px] md:rounded-bl-[60px]",
            "shadow-xl shadow-primary/15 transition-all duration-500",
            "border border-gold/20 hover:border-gold/40 hover:shadow-2xl hover:shadow-primary/20"
          )}
        >
          {/* Background image or gradient */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary">
            {image ? (
              <img
                src={image}
                alt={area}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div
                className={cn(
                  "h-full w-full bg-gradient-to-br transition-all duration-700 group-hover:scale-105",
                  gradient
                )}
              />
            )}

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, hsl(var(--gold)) 1px, transparent 1px), radial-gradient(circle at 70% 60%, hsl(var(--gold)) 1px, transparent 1px), radial-gradient(circle at 40% 80%, hsl(var(--gold)) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

            {/* Gold corner accent */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-gold/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 right-0 left-0 p-5 md:p-6 text-right">
              <span className="inline-block rounded-sm bg-gold px-3 py-1 text-[10px] font-semibold text-primary shadow-sm">
                {tag}
              </span>
              <h3 className="mt-2 text-2xl font-display font-bold text-primary-foreground leading-tight md:text-3xl">
                {area}
              </h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-primary-foreground/80">
                  {propertyCount} عقار متاح
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary group-hover:border-gold">
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
