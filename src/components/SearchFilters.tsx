import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import {
  Search,
  MapPin,
  Home,
  DoorOpen,
  Sofa,
  Coins,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";
import { alexandriaAreas } from "@/data/properties";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  initialArea?: string;
}

export const SearchFilters = ({ onSearch, initialArea }: SearchFiltersProps) => {
  const [area, setArea] = useState(initialArea || "");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [rooms, setRooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnished, setFurnished] = useState("");

  const handleSearch = () => {
    onSearch({ area, priceRange, rooms, propertyType, furnished });
  };

  const handleReset = () => {
    setArea("");
    setPriceRange([0, 20000]);
    setRooms("");
    setPropertyType("");
    setFurnished("");
    onSearch({});
  };

  const activeFiltersCount = [
    area,
    rooms,
    propertyType,
    furnished,
    priceRange[0] > 0 || priceRange[1] < 20000,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  const filterItems = [
    {
      key: "area",
      icon: MapPin,
      label: "المنطقة",
      value: area,
      onChange: setArea,
      placeholder: "كل المناطق",
      options: alexandriaAreas.map((a) => ({ value: a, label: a })),
    },
    {
      key: "type",
      icon: Home,
      label: "نوع العقار",
      value: propertyType,
      onChange: setPropertyType,
      placeholder: "كل الأنواع",
      options: [
        { value: "شقة", label: "شقة" },
        { value: "استوديو", label: "استوديو" },
        { value: "دوبلكس", label: "دوبلكس" },
        { value: "بنتهاوس", label: "بنتهاوس" },
        { value: "فيلا", label: "فيلا" },
      ],
    },
    {
      key: "rooms",
      icon: DoorOpen,
      label: "عدد الغرف",
      value: rooms,
      onChange: setRooms,
      placeholder: "أي عدد",
      options: [
        { value: "1", label: "غرفة 1" },
        { value: "2", label: "غرفتين" },
        { value: "3", label: "3 غرف" },
        { value: "4", label: "4 غرف" },
        { value: "5+", label: "5+ غرف" },
      ],
    },
    {
      key: "furnished",
      icon: Sofa,
      label: "الأثاث",
      value: furnished,
      onChange: setFurnished,
      placeholder: "الكل",
      options: [
        { value: "true", label: "مفروشة" },
        { value: "false", label: "غير مفروشة" },
      ],
    },
  ];

  const priceActive = priceRange[0] > 0 || priceRange[1] < 20000;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.15)]">
      {/* Decorative gold orb */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3 border-b border-border/60 px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
              <SlidersHorizontal className="h-4 w-4 text-gold" />
            </div>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary ring-2 ring-card">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground leading-none">
              تخصيص البحث
            </h3>
            <p className="mt-1 text-[11px] tracking-wide text-muted-foreground">
              اختر ما يناسب احتياجك بدقة
            </p>
          </div>
        </div>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleReset}
              className="group flex h-9 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 text-xs font-medium text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
            >
              <RotateCcw className="h-3 w-3 transition-transform group-hover:-rotate-180" />
              مسح
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="relative space-y-4 p-5">
        {/* Filter pills grid: 2 cols on mobile, 1 col on desktop (sidebar) */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
          {filterItems.map((item, index) => {
            const isActive = !!item.value;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Select value={item.value} onValueChange={item.onChange}>
                  <SelectTrigger
                    className={cn(
                      "group relative h-auto w-full rounded-2xl border bg-background px-3.5 py-3 text-right transition-all hover:border-gold/40 hover:bg-gold/[0.02]",
                      isActive
                        ? "border-gold/60 bg-gold/[0.04] shadow-[0_2px_12px_-4px_hsl(var(--gold)/0.3)]"
                        : "border-border/70"
                    )}
                  >
                    <div className="flex w-full items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isActive
                            ? "bg-gradient-to-br from-gold/20 to-gold/5 text-gold"
                            : "bg-muted text-muted-foreground group-hover:text-gold"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col items-start text-right">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </span>
                        <SelectValue placeholder={item.placeholder}>
                          <span
                            className={cn(
                              "block truncate text-sm font-semibold leading-tight",
                              isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            {item.options.find((o) => o.value === item.value)?.label ||
                              item.placeholder}
                          </span>
                        </SelectValue>
                      </div>
                      {isActive && (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {item.options.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="rounded-lg">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            );
          })}
        </div>

        {/* Price Range Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "relative overflow-hidden rounded-2xl border p-4 transition-all",
            priceActive
              ? "border-gold/60 bg-gradient-to-br from-gold/[0.06] to-transparent"
              : "border-border/70 bg-background"
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  priceActive
                    ? "bg-gradient-to-br from-gold/20 to-gold/5 text-gold"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Coins className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                نطاق الإيجار الشهري
              </span>
            </div>
            {priceActive && (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">
                نشط
              </span>
            )}
          </div>

          <div className="mb-4 flex items-end justify-between gap-3 rounded-xl bg-card/60 px-3 py-2.5 backdrop-blur">
            <div className="flex-1 text-right">
              <div className="text-[10px] text-muted-foreground">من</div>
              <div className="font-display text-lg font-bold leading-tight text-primary">
                {priceRange[0].toLocaleString()}
                <span className="mr-1 text-[10px] font-normal text-muted-foreground">ج.م</span>
              </div>
            </div>
            <div className="mb-1 h-6 w-px bg-border" />
            <div className="flex-1 text-right">
              <div className="text-[10px] text-muted-foreground">إلى</div>
              <div className="font-display text-lg font-bold leading-tight text-primary">
                {priceRange[1].toLocaleString()}
                <span className="mr-1 text-[10px] font-normal text-muted-foreground">ج.م</span>
              </div>
            </div>
          </div>

          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={20000}
            step={500}
            className="mt-1"
          />
        </motion.div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="group relative h-12 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/95 text-base font-semibold text-gold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Sparkles className="h-4 w-4" />
          <span>اعرض النتائج</span>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
