import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyImageCarousel } from "@/components/PropertyImageCarousel";
import { 
  Bed, Bath, Maximize2, MapPin, Phone, 
  Heart, ChevronLeft, Home, Calendar,
  Sofa, Building2, MessageCircle, CheckCircle2,
  ArrowRight, Shield, Clock, Sparkles,
  User, Share2, Eye, Ruler, DoorOpen,
  Wifi, Car, Droplets, Wind, Tv, Coffee,
  ChevronDown
} from "lucide-react";
import { mockProperties } from "@/data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const property = mockProperties.find(p => p.id === id);

  const amenities = [
    { icon: Wind, label: "تكييف مركزي" },
    { icon: Coffee, label: "مطبخ مجهز" },
    { icon: Wifi, label: "إنترنت فائق السرعة" },
    { icon: Car, label: "موقف سيارات" },
    { icon: Shield, label: "أمن 24 ساعة" },
    { icon: DoorOpen, label: "مصعد" },
    { icon: Droplets, label: "غسالة ملابس" },
    { icon: Tv, label: "تلفزيون ذكي" },
  ];

  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 6);

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

  const savingsAmount = property.originalPrice 
    ? property.originalPrice - property.price 
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                الرئيسية
              </Link>
              <ChevronLeft className="h-4 w-4 text-muted-foreground/50" />
              <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                العقارات
              </Link>
              <ChevronLeft className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{property.name}</span>
            </nav>
          </div>
        </div>

        {/* Image Gallery Section */}
        <section className="container mx-auto px-4 py-6">
          <PropertyImageCarousel 
            images={property.images}
            propertyName={property.name}
            featured={property.featured}
            discount={property.discount}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            description={property.description}
          />
        </section>

        {/* Main Content Grid */}
        <section className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        {property.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-medium gap-1">
                        <Eye className="h-3 w-3" />
                        1,234
                      </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      {property.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-sm bg-muted/30">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-4 divide-x divide-x-reverse divide-border">
                      <QuickStat icon={Bed} value={property.rooms} label="غرف" />
                      <QuickStat icon={Bath} value={property.bathrooms} label="حمامات" />
                      <QuickStat icon={Maximize2} value={`${property.size}`} label="م²" />
                      <QuickStat icon={Building2} value={property.floor} label="الطابق" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Property Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                <Badge 
                  variant="secondary" 
                  className={`gap-1.5 py-1.5 px-3 ${property.furnished ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}`}
                >
                  <Sofa className="h-3.5 w-3.5" />
                  {property.furnished ? "مفروشة بالكامل" : "غير مفروشة"}
                </Badge>
                <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                  <Calendar className="h-3.5 w-3.5" />
                  متاحة الآن
                </Badge>
                <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                  <Clock className="h-3.5 w-3.5" />
                  استجابة سريعة
                </Badge>
              </motion.div>

              <Separator />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  وصف العقار
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </motion.div>

              <Separator />

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    المميزات والخدمات
                  </h2>
                  <Badge variant="outline" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {amenities.length} مميزات
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <AnimatePresence>
                    {displayedAmenities.map((amenity, index) => (
                      <motion.div
                        key={amenity.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.04 * index, type: "spring", stiffness: 200 }}
                        className="group relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-border/60 bg-gradient-to-b from-muted/40 to-background hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-colors duration-300">
                          <amenity.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-semibold leading-tight">{amenity.label}</span>
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {amenities.length > 6 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-xl w-full border-dashed"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                  >
                    <span>{showAllAmenities ? 'عرض أقل' : `عرض جميع المميزات (${amenities.length})`}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllAmenities ? 'rotate-180' : ''}`} />
                  </Button>
                )}
              </motion.div>

              <Separator />

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  الموقع
                </h2>
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="p-4 bg-muted/30 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{property.area}</div>
                      <div className="text-sm text-muted-foreground">{property.address}</div>
                    </div>
                  </div>
                  <div className="aspect-[16/9] bg-muted flex items-center justify-center border-t border-border">
                    <div className="text-center text-muted-foreground p-8">
                      <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">الخريطة التفاعلية قريباً</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                    <CardContent className="p-6 space-y-5">
                      {/* Price Display */}
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">الإيجار الشهري</div>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-primary">
                            {property.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground text-lg">جنيه</span>
                        </div>
                        {property.originalPrice && (
                          <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
                            <span className="text-muted-foreground line-through">
                              {property.originalPrice.toLocaleString()} جنيه
                            </span>
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              وفر {savingsAmount.toLocaleString()} جنيه
                            </Badge>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Quick Features */}
                      <div className="grid grid-cols-2 gap-3">
                        <FeatureBox icon={Bed} label="غرف" value={property.rooms} />
                        <FeatureBox icon={Bath} label="حمامات" value={property.bathrooms} />
                        <FeatureBox icon={Ruler} label="المساحة" value={`${property.size} م²`} />
                        <FeatureBox icon={Sofa} label="الأثاث" value={property.furnished ? "مفروش" : "بدون"} />
                      </div>

                      <Separator />

                      {/* Contact Buttons */}
                      <div className="space-y-3">
                        <a
                          href={`https://wa.me/${property.contact.replace(/^0/, '20')}?text=مرحباً، أريد الاستفسار عن عقار: ${property.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                        >
                          <MessageCircle className="h-5 w-5" />
                          تواصل عبر واتساب
                        </a>
                        <a
                          href={`tel:${property.contact}`}
                          className="w-full flex items-center justify-center gap-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3.5 px-4 rounded-xl font-medium transition-all"
                        >
                          <Phone className="h-5 w-5" />
                          اتصال مباشر
                        </a>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>متاح للحجز الآن</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Trust Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-secondary" />
                        <span className="font-bold">لماذا هذا العقار؟</span>
                      </div>
                      <TrustItem 
                        icon={Shield}
                        title="عقار موثق"
                        desc="تم التحقق من جميع البيانات"
                        color="emerald"
                      />
                      <TrustItem 
                        icon={Clock}
                        title="استجابة سريعة"
                        desc="المالك يرد خلال ساعة"
                        color="blue"
                      />
                      <TrustItem 
                        icon={User}
                        title="مالك موثوق"
                        desc="تقييم 4.8 من 5"
                        color="amber"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden h-24" />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border p-4 z-50 shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground">الإيجار الشهري</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">
                {property.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">جنيه</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${property.contact.replace(/^0/, '20')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500 text-white shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={`tel:${property.contact}`}
              className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>اتصل</span>
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

// Helper Components
const QuickStat = ({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) => (
  <div className="p-4 text-center">
    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div className="text-lg font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const FeatureBox = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
    <Icon className="h-4 w-4 text-primary flex-shrink-0" />
    <div className="min-w-0">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium truncate">{value}</div>
    </div>
  </div>
);

const TrustItem = ({ 
  icon: Icon, 
  title, 
  desc, 
  color 
}: { 
  icon: any; 
  title: string; 
  desc: string; 
  color: 'emerald' | 'blue' | 'amber' 
}) => {
  const colors = {
    emerald: 'bg-emerald-500/10 text-emerald-600',
    blue: 'bg-blue-500/10 text-blue-600',
    amber: 'bg-amber-500/10 text-amber-600',
  };

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`w-9 h-9 rounded-full ${colors[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
};

export default PropertyDetails;
