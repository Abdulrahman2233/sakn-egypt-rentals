import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Search, X, MapPin, Home, DoorOpen, Sofa, Coins } from "lucide-react";
import { alexandriaAreas } from "@/data/properties";
import { motion } from "framer-motion";

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

  const hasActiveFilters = area || rooms || propertyType || furnished || priceRange[0] > 0 || priceRange[1] < 20000;

  return (
    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">بحث متقدم</h3>
            </div>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-destructive hover:text-destructive">
                  <X className="h-4 w-4 ml-1" />
                  مسح الكل
                </Button>
              </motion.div>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Area */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                المنطقة
              </Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  {alexandriaAreas.map((areaName) => (
                    <SelectItem key={areaName} value={areaName}>
                      {areaName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Home className="h-4 w-4 text-muted-foreground" />
                نوع العقار
              </Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شقة">شقة</SelectItem>
                  <SelectItem value="استوديو">استوديو</SelectItem>
                  <SelectItem value="دوبلكس">دوبلكس</SelectItem>
                  <SelectItem value="بنتهاوس">بنتهاوس</SelectItem>
                  <SelectItem value="فيلا">فيلا</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rooms */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                عدد الغرف
              </Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue placeholder="اختر عدد الغرف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 غرفة</SelectItem>
                  <SelectItem value="2">2 غرفة</SelectItem>
                  <SelectItem value="3">3 غرف</SelectItem>
                  <SelectItem value="4">4 غرف</SelectItem>
                  <SelectItem value="5+">5+ غرف</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Furnished */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Sofa className="h-4 w-4 text-muted-foreground" />
                حالة الأثاث
              </Label>
              <Select value={furnished} onValueChange={setFurnished}>
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">مفروشة</SelectItem>
                  <SelectItem value="false">غير مفروشة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Coins className="h-4 w-4 text-muted-foreground" />
                نطاق السعر
              </Label>
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary">
                    {priceRange[0].toLocaleString()} جنيه
                  </span>
                  <span className="text-xs text-muted-foreground">إلى</span>
                  <span className="text-sm font-medium text-primary">
                    {priceRange[1].toLocaleString()} جنيه
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={500}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  الإيجار الشهري
                </p>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button onClick={handleSearch} className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
            <Search className="h-5 w-5 ml-2" />
            ابحث الآن
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};