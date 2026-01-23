import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bed, Bath, Maximize2, MapPin, Phone, 
  Heart, Share2, ChevronLeft, ChevronRight, Home, Calendar,
  Sofa, Building2, Eye, MessageCircle, CheckCircle2,
  ArrowRight, Star, Shield, Clock, Sparkles, Tag
} from "lucide-react";
import { mockProperties } from "@/data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Home className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">العقار غير موجود</h2>
          <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على هذا العقار</p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/properties">
              <ArrowRight className="h-4 w-4" />
              العودة للعقارات
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const features = [
    { icon: Bed, label: "غرف", value: property.rooms },
    { icon: Bath, label: "حمامات", value: property.bathrooms },
    { icon: Maximize2, label: "المساحة", value: `${property.size} م²` },
    { icon: Building2, label: "الطابق", value: property.floor },
  ];

  const amenities = [
    "تكييف مركزي",
    "مطبخ مجهز",
    "إنترنت فائق السرعة",
    "موقف سيارات",
    "أمن 24 ساعة",
    "مصعد",
    "غسالة ملابس",
    "سخان مياه",
  ];

  const trustBadges = [
    { icon: Shield, title: "عقار موثق", desc: "تم التحقق من البيانات", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: Clock, title: "استجابة سريعة", desc: "يرد خلال ساعة", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Star, title: "تقييم ممتاز", desc: "4.8 من 5 نجوم", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Image Section */}
        <section className="relative">
          <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={property.images[activeImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Top Navigation */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm h-10 w-10"
                asChild
              >
                <Link to="/properties">
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm h-10 w-10"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 transition-all ${isFavorite ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm h-10 w-10"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: property.name,
                        text: property.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10 backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="flex items-end justify-between gap-4">
                {/* Badges & Title */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {property.featured && (
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        <Star className="h-3 w-3 ml-1" />
                        مميز
                      </Badge>
                    )}
                    {property.discount && (
                      <Badge className="bg-red-500 text-white shadow-lg">
                        <Tag className="h-3 w-3 ml-1" />
                        خصم {property.discount}%
                      </Badge>
                    )}
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border-0">
                      {property.type}
                    </Badge>
                  </div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 truncate drop-shadow-lg">
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-1.5 text-white/90 text-sm">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{property.area}</span>
                  </div>
                </div>

                {/* Image Counter */}
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm flex-shrink-0">
                  {activeImage + 1} / {property.images.length}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                {property.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all ${
                      activeImage === index 
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-5 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-5">
              {/* Price Card - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden"
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">السعر الشهري</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold text-primary">
                            {property.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground text-sm">جنيه</span>
                        </div>
                        {property.originalPrice && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground line-through">
                              {property.originalPrice.toLocaleString()}
                            </span>
                            <Badge variant="destructive" className="text-[10px] h-5">
                              وفر {(property.originalPrice - property.price).toLocaleString()}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
                        <SheetTrigger asChild>
                          <Button size="sm" className="gap-2 shadow-md">
                            <Phone className="h-4 w-4" />
                            تواصل الآن
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-3xl">
                          <ContactSheet property={property} onClose={() => setIsContactOpen(false)} />
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-4 divide-x divide-x-reverse divide-border">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="p-3 sm:p-4 text-center hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div className="text-base sm:text-lg font-bold">{feature.value}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">{feature.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-xs sm:text-sm">
                  <Sofa className="h-3.5 w-3.5" />
                  {property.furnished ? "مفروشة" : "غير مفروشة"}
                </Badge>
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-xs sm:text-sm">
                  <Building2 className="h-3.5 w-3.5" />
                  الطابق {property.floor}
                </Badge>
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-xs sm:text-sm">
                  <Eye className="h-3.5 w-3.5" />
                  1,234 مشاهدة
                </Badge>
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-xs sm:text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  متاح الآن
                </Badge>
              </motion.div>

              {/* Tabs Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                      <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-sm"
                      >
                        الوصف
                      </TabsTrigger>
                      <TabsTrigger
                        value="amenities"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-sm"
                      >
                        المميزات
                      </TabsTrigger>
                      <TabsTrigger
                        value="location"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-sm"
                      >
                        الموقع
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="p-4 sm:p-5 m-0">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-5 bg-primary rounded-full" />
                        <h3 className="font-bold">وصف العقار</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {property.description}
                      </p>
                    </TabsContent>

                    <TabsContent value="amenities" className="p-4 sm:p-5 m-0">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-5 bg-primary rounded-full" />
                        <h3 className="font-bold">المميزات والخدمات</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {amenities.map((amenity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.03 }}
                            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm">{amenity}</span>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="location" className="p-4 sm:p-5 m-0">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-5 bg-primary rounded-full" />
                        <h3 className="font-bold">الموقع</h3>
                      </div>
                      <div className="flex items-start gap-3 mb-4 p-3 rounded-xl bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{property.area}</div>
                          <div className="text-xs text-muted-foreground">{property.address}</div>
                        </div>
                      </div>
                      <div className="aspect-video rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <span className="text-sm">خريطة الموقع قريباً</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </motion.div>

              {/* Trust Badges - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="lg:hidden"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-bold text-sm">لماذا تختار هذا العقار؟</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {trustBadges.map((badge, index) => (
                        <motion.div
                          key={badge.title}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + index * 0.1 }}
                          className="text-center p-3 rounded-xl bg-muted/50"
                        >
                          <div className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center mx-auto mb-2`}>
                            <badge.icon className={`h-5 w-5 ${badge.color}`} />
                          </div>
                          <div className="font-semibold text-xs">{badge.title}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{badge.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Desktop Sidebar */}
            <div className="hidden lg:block space-y-5">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="sticky top-24 border-0 shadow-xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                  <CardContent className="p-5 space-y-5">
                    {/* Price */}
                    <div className="text-center pb-5 border-b border-border">
                      <div className="text-sm text-muted-foreground mb-1">السعر الشهري</div>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-bold text-primary">
                          {property.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">جنيه</span>
                      </div>
                      {property.originalPrice && (
                        <div className="mt-2">
                          <span className="text-muted-foreground line-through text-sm ml-2">
                            {property.originalPrice.toLocaleString()} جنيه
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            وفر {(property.originalPrice - property.price).toLocaleString()}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Contact Buttons */}
                    <div className="space-y-3">
                      <a
                        href={`https://wa.me/${property.contact.replace(/^0/, '20')}?text=مرحباً، أريد الاستفسار عن عقار: ${property.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        <MessageCircle className="h-5 w-5" />
                        تواصل عبر واتساب
                      </a>
                      <a
                        href={`tel:${property.contact}`}
                        className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 px-4 rounded-xl font-medium transition-all"
                      >
                        <Phone className="h-5 w-5" />
                        اتصال مباشر
                      </a>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                      <Calendar className="h-4 w-4 text-emerald-500" />
                      <span>متاح للحجز الآن</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-bold text-sm">مميزات العقار</h3>
                    </div>
                    {trustBadges.map((badge, index) => (
                      <motion.div
                        key={badge.title}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                          <badge.icon className={`h-5 w-5 ${badge.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{badge.title}</div>
                          <div className="text-xs text-muted-foreground">{badge.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden h-20" /> {/* Spacer */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-3 z-50 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-muted-foreground">السعر الشهري</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary truncate">
                {property.price.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">جنيه</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${property.contact.replace(/^0/, '20')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 text-white shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={`tel:${property.contact}`}
              className="flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-primary text-primary-foreground shadow-lg font-medium"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">اتصل الآن</span>
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

// Contact Sheet Component
const ContactSheet = ({ property, onClose }: { property: any; onClose: () => void }) => (
  <div className="py-4 space-y-4">
    <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
    <div className="text-center mb-6">
      <h3 className="text-lg font-bold mb-1">تواصل مع المالك</h3>
      <p className="text-muted-foreground text-sm">اختر طريقة التواصل المفضلة</p>
    </div>
    <div className="space-y-3">
      <a
        href={`https://wa.me/${property.contact.replace(/^0/, '20')}?text=مرحباً، أريد الاستفسار عن عقار: ${property.name}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-medium transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        تواصل عبر واتساب
      </a>
      <a
        href={`tel:${property.contact}`}
        onClick={onClose}
        className="w-full flex items-center justify-center gap-3 border-2 border-primary text-primary py-4 rounded-xl font-medium transition-colors"
      >
        <Phone className="h-5 w-5" />
        اتصال مباشر
      </a>
    </div>
  </div>
);

export default PropertyDetails;
