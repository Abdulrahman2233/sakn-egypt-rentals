import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Bed, Bath, Maximize2, MapPin, Phone, Mail, 
  Heart, Share2, ChevronLeft, Home, Calendar,
  Sofa, Building2, Eye, MessageCircle, CheckCircle2,
  ArrowLeft, Star, Shield, Clock
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Home className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">العقار غير موجود</h2>
          <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على هذا العقار</p>
          <Button asChild size="lg">
            <Link to="/properties">العودة للعقارات</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const features = [
    { icon: Bed, label: "غرف النوم", value: property.rooms },
    { icon: Bath, label: "الحمامات", value: property.bathrooms },
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Image Section - Full Width on Mobile */}
        <div className="relative">
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={property.images[activeImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Back Button */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-20 md:top-24 right-4 z-10"
            >
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                asChild
              >
                <Link to="/properties">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-20 md:top-24 left-4 z-10 flex gap-2"
            >
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
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
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-20 left-4 z-10">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm">
                {activeImage + 1} / {property.images.length}
              </div>
            </div>

            {/* Price Badge on Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 right-4 left-4 z-10"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {property.featured && (
                      <Badge className="bg-secondary text-secondary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        مميز
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-0">
                      {property.type}
                    </Badge>
                  </div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{property.area}</span>
                  </div>
                </div>
                <div className="text-left hidden md:block">
                  <div className="bg-primary text-primary-foreground rounded-xl px-4 py-2">
                    <div className="text-xs opacity-80">الإيجار الشهري</div>
                    <div className="text-2xl font-bold">{property.price.toLocaleString()} جنيه</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 z-20 md:relative">
            <div className="container mx-auto px-4">
              <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide -mt-16 md:mt-4">
                {property.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? "border-primary ring-2 ring-primary/30" 
                        : "border-white/50 md:border-border"
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
        </div>

        {/* Mobile Price Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-primary text-primary-foreground py-3 px-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-80">الإيجار الشهري</div>
              <div className="text-xl font-bold">{property.price.toLocaleString()} جنيه</div>
            </div>
            <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  تواصل الآن
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                <div className="py-6 space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-1">تواصل مع المالك</h3>
                    <p className="text-muted-foreground text-sm">اختر طريقة التواصل المفضلة</p>
                  </div>
                  <Button 
                    className="w-full gap-3 h-14 text-lg" 
                    onClick={() => window.location.href = `tel:${property.contact}`}
                  >
                    <Phone className="h-5 w-5" />
                    اتصال مباشر
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full gap-3 h-14 text-lg border-green-500 text-green-600 hover:bg-green-50" 
                    onClick={() => window.open(`https://wa.me/${property.contact.replace(/^0/, '20')}`, '_blank')}
                  >
                    <MessageCircle className="h-5 w-5" />
                    واتساب
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-3 h-14 text-lg"
                    onClick={() => window.location.href = `mailto:info@sakn-egypt.com?subject=استفسار عن ${property.name}`}
                  >
                    <Mail className="h-5 w-5" />
                    بريد إلكتروني
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-4 divide-x divide-x-reverse divide-border">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="p-4 text-center hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                            <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                          </div>
                          <div className="text-lg md:text-xl font-bold">{feature.value}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{feature.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Property Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                <Badge variant="outline" className="gap-1 py-1.5 px-3">
                  <Sofa className="h-3.5 w-3.5" />
                  {property.furnished ? "مفروشة" : "غير مفروشة"}
                </Badge>
                <Badge variant="outline" className="gap-1 py-1.5 px-3">
                  <Building2 className="h-3.5 w-3.5" />
                  الطابق {property.floor}
                </Badge>
                <Badge variant="outline" className="gap-1 py-1.5 px-3">
                  <Eye className="h-3.5 w-3.5" />
                  1,234 مشاهدة
                </Badge>
                <Badge variant="outline" className="gap-1 py-1.5 px-3">
                  <Calendar className="h-3.5 w-3.5" />
                  متاح الآن
                </Badge>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-5 md:p-6">
                    <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      الوصف
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {property.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card>
                  <CardContent className="p-5 md:p-6">
                    <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      المميزات والخدمات
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenities.map((amenity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{amenity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-5 md:p-6">
                    <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      الموقع
                    </h2>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{property.area}</div>
                        <div className="text-sm text-muted-foreground">{property.address}</div>
                      </div>
                    </div>
                    <div className="h-48 md:h-64 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <span className="text-muted-foreground text-sm">خريطة الموقع</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="sticky top-24 overflow-hidden border-primary/20">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">الإيجار الشهري</div>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-primary">
                          {property.price.toLocaleString()}
                        </span>
                        <span className="text-lg text-muted-foreground">جنيه</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <Button 
                      className="w-full gap-2 h-12 text-base" 
                      onClick={() => window.location.href = `tel:${property.contact}`}
                    >
                      <Phone className="h-5 w-5" />
                      اتصل الآن
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full gap-2 h-12 text-base border-green-500 text-green-600 hover:bg-green-50" 
                      onClick={() => window.open(`https://wa.me/${property.contact.replace(/^0/, '20')}`, '_blank')}
                    >
                      <MessageCircle className="h-5 w-5" />
                      واتساب
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 h-12 text-base"
                      onClick={() => window.location.href = `mailto:info@sakn-egypt.com?subject=استفسار عن ${property.name}`}
                    >
                      <Mail className="h-5 w-5" />
                      أرسل رسالة
                    </Button>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span dir="ltr">{property.contact}</span>
                      </div>
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
                <Card>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">عقار موثق</div>
                        <div className="text-xs text-muted-foreground">تم التحقق من البيانات</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">استجابة سريعة</div>
                        <div className="text-xs text-muted-foreground">يرد خلال ساعة</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Star className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">تقييم ممتاز</div>
                        <div className="text-xs text-muted-foreground">4.8 من 5 نجوم</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 safe-area-inset-bottom">
          <div className="flex gap-3">
            <Button 
              className="flex-1 gap-2 h-12" 
              onClick={() => window.location.href = `tel:${property.contact}`}
            >
              <Phone className="h-5 w-5" />
              اتصل الآن
            </Button>
            <Button 
              variant="outline"
              className="flex-1 gap-2 h-12 border-green-500 text-green-600" 
              onClick={() => window.open(`https://wa.me/${property.contact.replace(/^0/, '20')}`, '_blank')}
            >
              <MessageCircle className="h-5 w-5" />
              واتساب
            </Button>
          </div>
        </div>
        
        {/* Spacer for fixed bottom bar on mobile */}
        <div className="lg:hidden h-20" />
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
