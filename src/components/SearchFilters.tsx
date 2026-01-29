import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Search, X, MapPin, Home, DoorOpen, Sofa, Coins, Filter, RotateCcw } from "lucide-react";
import { alexandriaAreas } from "@/data/properties";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

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
    onSearch({
      area,
      priceRange,
      rooms,
      propertyType,
      furnished
    });
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
    priceRange[0] > 0 || priceRange[1] < 20000
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  const filterItems = [
    {
      icon: MapPin,
      label: "المنطقة",
      value: area,
      onChange: setArea,
      placeholder: "اختر المنطقة",
      options: alexandriaAreas.map(a => ({ value: a, label: a }))
    },
    {
      icon: Home,
      label: "نوع العقار",
      value: propertyType,
      onChange: setPropertyType,
      placeholder: "اختر النوع",
      options: [
        { value: "شقة", label: "شقة" },
        { value: "استوديو", label: "استوديو" },
        { value: "دوبلكس", label: "دوبلكس" },
        { value: "بنتهاوس", label: "بنتهاوس" },
        { value: "فيلا", label: "فيلا" }
      ]
    },
    {
      icon: DoorOpen,
      label: "عدد الغرف",
      value: rooms,
      onChange: setRooms,
      placeholder: "اختر عدد الغرف",
      options: [
        { value: "1", label: "1 غرفة" },
        { value: "2", label: "2 غرفة" },
        { value: "3", label: "3 غرف" },
        { value: "4", label: "4 غرف" },
        { value: "5+", label: "5+ غرف" }
      ]
    },
    {
      icon: Sofa,
      label: "حالة الأثاث",
      value: furnished,
      onChange: setFurnished,
      placeholder: "اختر الحالة",
      options: [
        { value: "true", label: "مفروشة" },
        { value: "false", label: "غير مفروشة" }
      ]
    }
  ];

  return (
    <Card className="border-0 shadow-xl bg-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">فلترة البحث</h3>
              <p className="text-white/70 text-sm">خصص نتائج البحث</p>
            </div>
          </div>
          {hasActiveFilters && (
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
              {activeFiltersCount} فلتر
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 sm:p-5">
        <div className="space-y-5">
          {/* Filter Items */}
          {filterItems.map((item, index) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-2"
            >
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <div className={cn(
                  "p-1.5 rounded-lg",
                  item.value ? "bg-primary/10" : "bg-muted"
                )}>
                  <item.icon className={cn(
                    "h-4 w-4",
                    item.value ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                {item.label}
                {item.value && (
                  <Badge variant="secondary" className="mr-auto text-xs py-0">
                    محدد
                  </Badge>
                )}
              </Label>
              <Select value={item.value} onValueChange={item.onChange}>
                <SelectTrigger className={cn(
                  "h-12 bg-background border-2 rounded-xl transition-all",
                  item.value ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/20"
                )}>
                  <SelectValue placeholder={item.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {item.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          ))}

          <Separator className="my-4" />

          {/* Price Range */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <div className={cn(
                "p-1.5 rounded-lg",
                (priceRange[0] > 0 || priceRange[1] < 20000) ? "bg-primary/10" : "bg-muted"
              )}>
                <Coins className={cn(
                  "h-4 w-4",
                  (priceRange[0] > 0 || priceRange[1] < 20000) ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              نطاق السعر
              {(priceRange[0] > 0 || priceRange[1] < 20000) && (
                <Badge variant="secondary" className="mr-auto text-xs py-0">
                  محدد
                </Badge>
              )}
            </Label>
            
            <div className={cn(
              "rounded-2xl p-4 border-2 transition-all",
              (priceRange[0] > 0 || priceRange[1] < 20000) 
                ? "border-primary/30 bg-primary/5" 
                : "border-border bg-muted/30"
            )}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground block mb-1">من</span>
                  <span className="text-lg font-bold text-primary">
                    {priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground mr-1">جنيه</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <span className="text-xs text-muted-foreground block mb-1">إلى</span>
                  <span className="text-lg font-bold text-primary">
                    {priceRange[1].toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground mr-1">جنيه</span>
                </div>
              </div>
              
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={20000}
                step={500}
                className="mt-2"
              />
              
              <p className="text-xs text-muted-foreground text-center mt-3">
                الإيجار الشهري
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={handleSearch} 
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all gap-2"
            >
              <Search className="h-5 w-5" />
              ابحث الآن
            </Button>
            
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Button 
                    variant="outline" 
                    onClick={handleReset} 
                    className="w-full h-10 text-sm rounded-xl border-2 gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5"
                  >
                    <RotateCcw className="h-4 w-4" />
                    مسح جميع الفلاتر
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
