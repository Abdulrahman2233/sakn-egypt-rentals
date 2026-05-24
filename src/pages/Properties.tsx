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
        {/* Hero - Editorial Luxe */}
        <section className="relative bg-primary overflow-hidden">
          {/* Atmospheric layers */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.08] rounded-full blur-[140px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gold/[0.06] rounded-full blur-[100px]" />
            {/* Fine vertical lines pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)`,
                backgroundSize: '80px 100%',
              }}
            />
            {/* Top gold hairline */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </div>

          <div className="container mx-auto px-5 sm:px-6 relative z-10 pt-10 pb-8 sm:pt-16 sm:pb-12">
            {/* Editorial label row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-8 sm:mb-10"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-gold font-semibold uppercase">
                  Collection · 2026
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">
                <MapPin className="h-3 w-3 text-gold" />
                Alexandria
              </div>
            </motion.div>

            {/* Editorial Title — large serif-like display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <h1 className="font-display text-white font-bold tracking-tight leading-[0.95] text-[44px] sm:text-7xl lg:text-[84px]">
                {initialArea ? (
                  <>
                    عقارات
                    <br />
                    <span className="text-gradient-gold italic font-light">{initialArea}</span>
                  </>
                ) : (
                  <>
                    عقارات
                    <br />
                    <span className="text-gradient-gold italic font-light">استثنائية</span>
                  </>
                )}
              </h1>

              {/* Side meta column - desktop */}
              <div className="hidden lg:flex absolute top-2 left-0 flex-col items-start gap-2 max-w-[180px]">
                <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Featured</div>
                <div className="h-px w-12 bg-gold/40" />
                <p className="text-white/60 text-xs leading-relaxed">
                  مجموعة منتقاة بعناية لأرقى العقارات في الإسكندرية بأسعار شفافة.
                </p>
              </div>
            </motion.div>

            {/* Bottom row: counter + search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 sm:mt-12 flex items-end gap-4 sm:gap-6"
            >
              {/* Big counter */}
              <div className="shrink-0">
                <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase mb-1">Properties</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-gold text-4xl sm:text-6xl font-bold leading-none tabular-nums">
                    {String(mockProperties.length).padStart(2, '0')}
                  </span>
                  <span className="text-gold/60 text-lg sm:text-2xl font-light">+</span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="self-stretch w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              {/* Search trigger */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-4 py-3.5 sm:px-5 sm:py-4 text-right hover:border-gold/40 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/0 to-gold/[0.08] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.2em] text-gold/80 uppercase mb-0.5">بحث متقدم</div>
                    <div className="text-white/70 text-xs sm:text-sm truncate">المنطقة · النوع · السعر</div>
                  </div>
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center shrink-0 shadow-lg shadow-gold/20">
                    <Search className="h-4 w-4 sm:h-4 sm:w-4 text-primary" strokeWidth={2.5} />
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Quick Area Chips — refined */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 sm:mt-8 -mx-5 px-5 sm:mx-0 sm:px-0"
            >
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <span className="shrink-0 text-[10px] tracking-[0.2em] text-white/30 uppercase pr-1">المناطق</span>
                {["الكل", "سموحة", "سيدي جابر", "ميامي", "المنتزه", "العجمي", "الإبراهيمية", "جليم"].map((area) => {
                  const isActive = (area === "الكل" && !initialArea) || area === initialArea;
                  return (
                    <button
                      key={area}
                      onClick={() => handleSearch(area === "الكل" ? {} : { area })}
                      className={cn(
                        "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border",
                        isActive
                          ? "bg-gold text-primary border-gold"
                          : "bg-transparent text-white/60 border-white/10 hover:border-gold/40 hover:text-white"
                      )}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Editorial stats — horizontal line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-10 pt-6 border-t border-white/10 grid grid-cols-4 gap-3 sm:gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1">
                    <stat.icon className="h-3 w-3 text-gold" />
                    <span className="text-[9px] sm:text-[10px] tracking-[0.15em] text-white/40 uppercase leading-none">
                      {stat.label}
                    </span>
                  </div>
                  <div className="font-display text-white font-bold text-lg sm:text-2xl leading-tight">
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Smooth gradient transition */}
          <div className="h-8 sm:h-12 bg-gradient-to-b from-transparent to-background" />
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
