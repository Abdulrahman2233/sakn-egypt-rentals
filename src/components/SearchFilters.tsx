import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Search, X } from "lucide-react";
import { alexandriaAreas } from "@/data/properties";

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              بحث متقدم
            </h3>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 ml-2" />
              إعادة تعيين
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Area */}
            <div className="space-y-2">
              <Label>المنطقة</Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger>
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

            {/* Rooms */}
            <div className="space-y-2">
              <Label>عدد الغرف</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger>
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

            {/* Property Type */}
            <div className="space-y-2">
              <Label>نوع العقار</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
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

            {/* Furnished */}
            <div className="space-y-2">
              <Label>حالة الأثاث</Label>
              <Select value={furnished} onValueChange={setFurnished}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">مفروشة</SelectItem>
                  <SelectItem value="false">غير مفروشة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2 md:col-span-2">
              <Label>
                السعر: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} جنيه/شهر
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={20000}
                step={500}
                className="mt-2"
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full">
            <Search className="h-4 w-4 ml-2" />
            بحث
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
