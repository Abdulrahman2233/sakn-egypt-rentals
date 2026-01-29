import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { mockProperties } from "@/data/properties";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Grid3X3, LayoutList, SlidersHorizontal, Home, TrendingUp, Star, ChevronDown, Search, Sparkles, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc" | "rooms-desc";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  useEffect(() => {
    if (initialArea) {
      setFilteredProperties(
        mockProperties.filter(p => p.area === initialArea)
      );
    }
  }, [initialArea]);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    let sorted = [...filteredProperties];
    
    switch (option) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rooms-desc":
        sorted.sort((a, b) => b.rooms - a.rooms);
        break;
      default:
        sorted = [...mockProperties];
    }
    
    setFilteredProperties(sorted);
  };

  const handleSearch = (filters: any) => {
    let filtered = [...mockProperties];
    let filterCount = 0;

    if (filters.area) {
      filtered = filtered.filter(p => p.area === filters.area);
      filterCount++;
    }

    if (filters.rooms) {
      const roomCount = filters.rooms === "5+" ? 5 : parseInt(filters.rooms);
      filtered = filtered.filter(p => 
        filters.rooms === "5+" ? p.rooms >= roomCount : p.rooms === roomCount
      );
      filterCount++;
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType);
      filterCount++;
    }

    if (filters.furnished !== "") {
      const isFurnished = filters.furnished === "true";
      filtered = filtered.filter(p => p.furnished === isFurnished);
      filterCount++;
    }

    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 20000)) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
      filterCount++;
    }

    setActiveFilters(filterCount);
    setFilteredProperties(filtered);
    setIsFilterOpen(false);
  };

  const stats = [
    { icon: Home, label: "عقار متاح", value: mockProperties.length, color: "from-blue-500 to-blue-600" },
    { icon: MapPin, label: "منطقة مختلفة", value: "15+", color: "from-emerald-500 to-emerald-600" },
    { icon: TrendingUp, label: "صفقة هذا الشهر", value: "50+", color: "from-amber-500 to-amber-600" },
    { icon: Star, label: "تقييم العملاء", value: "4.9", color: "from-purple-500 to-purple-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const featuredProperties = filteredProperties.filter(p => p.featured);
  const regularProperties = filteredProperties.filter(p => !p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navbar />
      
      <main className="flex-1 mt-16">
        {/* Hero Section - Modern Glassmorphism Design */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-24">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
          </div>
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20"
              >
                <Sparkles className="h-5 w-5 text-secondary" />
                <span className="text-white/90 text-sm font-medium">أفضل العقارات في الإسكندرية</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                اعثر على{" "}
                <span className="relative inline-block">
                  <span className="text-secondary">منزل أحلامك</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-secondary/50" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                {initialArea 
                  ? `استعرض أفضل العقارات المتاحة في ${initialArea} مع أسعار تنافسية ومواقع مميزة`
                  : "نقدم لك مجموعة متنوعة من الشقق والعقارات الفاخرة بأفضل الأسعار في أرقى المناطق"
                }
              </p>

              {/* Quick Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 max-w-2xl mx-auto mb-12"
              >
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <Search className="h-5 w-5 text-white/70" />
                    <span className="text-white/70 text-sm">ابحث عن عقارك المثالي...</span>
                  </div>
                  <Button 
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6 rounded-xl font-semibold shadow-lg"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4 ml-2" />
                    فلترة
                  </Button>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/15">
                      <div className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 shadow-lg",
                        stat.color
                      )}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
              <path 
                d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                className="fill-background"
              />
            </svg>
          </div>
        </section>

        {/* Properties Section */}
        <section className="container mx-auto px-4 py-8 lg:py-12">
          {/* Header with Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 mb-8"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  العقارات المتاحة
                </h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {filteredProperties.length}
                  </Badge>
                  <span>عقار يطابق بحثك</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortOption) => handleSort(value)}>
                  <SelectTrigger className="w-[160px] h-10 bg-background border-2">
                    <ArrowUpDown className="h-4 w-4 ml-2 text-muted-foreground" />
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-asc">السعر: الأقل</SelectItem>
                    <SelectItem value="price-desc">السعر: الأعلى</SelectItem>
                    <SelectItem value="rooms-desc">عدد الغرف</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-muted rounded-xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "h-8 w-8 p-0 rounded-lg",
                      viewMode === "grid" && "shadow-md"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "h-8 w-8 p-0 rounded-lg",
                      viewMode === "list" && "shadow-md"
                    )}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative h-10 border-2">
                      <SlidersHorizontal className="h-4 w-4 ml-2" />
                      <span>الفلاتر</span>
                      {activeFilters > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                        >
                          {activeFilters}
                        </motion.span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-right flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        فلترة البحث
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <SearchFilters onSearch={handleSearch} initialArea={initialArea} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters Pills */}
            {activeFilters > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 flex-wrap"
              >
                <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
                <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors">
                  {activeFilters} فلتر
                  <span 
                    onClick={() => {
                      setFilteredProperties(mockProperties);
                      setActiveFilters(0);
                    }}
                    className="mr-1"
                  >
                    ✕
                  </span>
                </Badge>
              </motion.div>
            )}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <motion.aside 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block lg:w-80 flex-shrink-0"
            >
              <div className="sticky top-24">
                <SearchFilters onSearch={handleSearch} initialArea={initialArea} />
              </div>
            </motion.aside>

            {/* Properties Content */}
            <div className="flex-1">
              {/* Featured Properties Section */}
              {featuredProperties.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-2 rounded-xl">
                      <Sparkles className="h-5 w-5 text-amber-950" />
                    </div>
                    <h3 className="text-xl font-bold">العقارات المميزة</h3>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      {featuredProperties.length} عقار
                    </Badge>
                  </div>
                  
                  <div className={cn(
                    "grid gap-4 sm:gap-6",
                    viewMode === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2" 
                      : "grid-cols-1"
                  )}>
                    {featuredProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        variants={itemVariants}
                        layout
                      >
                        <PropertyCard property={property} variant={viewMode} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All Properties */}
              <AnimatePresence mode="wait">
                {regularProperties.length > 0 ? (
                  <>
                    {featuredProperties.length > 0 && (
                      <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary/10 p-2 rounded-xl">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">جميع العقارات</h3>
                      </div>
                    )}
                    
                    <motion.div 
                      key="properties"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      className={cn(
                        "grid gap-4 sm:gap-6",
                        viewMode === "grid" 
                          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                          : "grid-cols-1"
                      )}
                    >
                      {regularProperties.map((property) => (
                        <motion.div
                          key={property.id}
                          variants={itemVariants}
                          layout
                        >
                          <PropertyCard property={property} variant={viewMode} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                ) : filteredProperties.length === 0 && (
                  <motion.div 
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <div className="bg-gradient-to-br from-muted to-muted/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">لا توجد نتائج</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                      لم نتمكن من العثور على عقارات تطابق معايير البحث الخاصة بك. جرب تعديل الفلاتر أو البحث في مناطق أخرى.
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => {
                        setFilteredProperties(mockProperties);
                        setActiveFilters(0);
                      }}
                      className="px-8"
                    >
                      عرض جميع العقارات
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Load More */}
              {filteredProperties.length > 0 && filteredProperties.length >= 6 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-12"
                >
                  <Button variant="outline" size="lg" className="px-10 h-12 rounded-xl border-2 gap-2">
                    عرض المزيد من العقارات
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section - Modern Design */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5" />
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">نحن هنا لمساعدتك</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                لم تجد ما تبحث عنه؟
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                تواصل معنا وسنساعدك في العثور على العقار المثالي الذي يناسب احتياجاتك وميزانيتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  تواصل معنا الآن
                </Button>
                <Button size="lg" variant="outline" className="px-8 h-12 rounded-xl border-2">
                  طلب عقار مخصص
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
