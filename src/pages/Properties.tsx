import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { mockProperties } from "@/data/properties";
import { useSearchParams } from "react-router-dom";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    if (initialArea) {
      setFilteredProperties(
        mockProperties.filter(p => p.area === initialArea)
      );
    }
  }, [initialArea]);

  const handleSearch = (filters: any) => {
    let filtered = [...mockProperties];

    if (filters.area) {
      filtered = filtered.filter(p => p.area === filters.area);
    }

    if (filters.rooms) {
      const roomCount = filters.rooms === "5+" ? 5 : parseInt(filters.rooms);
      filtered = filtered.filter(p => 
        filters.rooms === "5+" ? p.rooms >= roomCount : p.rooms === roomCount
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType);
    }

    if (filters.furnished !== "") {
      const isFurnished = filters.furnished === "true";
      filtered = filtered.filter(p => p.furnished === isFurnished);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 mt-16">
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">عقارات للإيجار</h1>
            <p className="text-muted-foreground">
              {initialArea ? `عقارات في ${initialArea}` : "جميع العقارات المتاحة"}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} initialArea={initialArea} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              عرض {filteredProperties.length} عقار
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">
                جرب تعديل معايير البحث للعثور على عقارات مناسبة
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
