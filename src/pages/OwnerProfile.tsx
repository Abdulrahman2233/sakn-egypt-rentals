import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Home, ChevronLeft, Phone, MessageCircle,
  Star, Shield, Clock, Building2, Calendar,
  CheckCircle2, Award, TrendingUp, User,
  ArrowRight, Sparkles, MapPin, Eye,
  ThumbsUp, Zap, Crown
} from "lucide-react";
import { mockProperties, mockOwners, ownerTypeLabels } from "@/data/properties";
import type { OwnerType } from "@/data/properties";

const ownerTypeIcons: Record<OwnerType, typeof User> = {
  owner: User,
  broker: TrendingUp,
  office: Building2,
};

const ownerTypeGradients: Record<OwnerType, { bg: string; badge: string; icon: string }> = {
  owner: {
    bg: "from-primary via-primary/90 to-primary/70",
    badge: "bg-primary/10 text-primary border-primary/20",
    icon: "from-primary/20 to-primary/5",
  },
  broker: {
    bg: "from-amber-600 via-amber-500 to-yellow-500",
    badge: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    icon: "from-secondary/20 to-secondary/5",
  },
  office: {
    bg: "from-emerald-600 via-emerald-500 to-teal-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    icon: "from-emerald-500/20 to-emerald-500/5",
  },
};

const OwnerProfile = () => {
  const { id } = useParams();
  const owner = mockOwners.find(o => o.id === id);
  const ownerProperties = mockProperties.filter(p => p.owner.id === id);

  if (!owner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">الحساب غير موجود</h2>
          <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على هذا الحساب</p>
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

  const OwnerIcon = ownerTypeIcons[owner.type];
  const gradients = ownerTypeGradients[owner.type];
  const totalViews = ownerProperties.length * 1234;
  const completedDeals = ownerProperties.length * 3;

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
              <span className="text-foreground font-medium truncate max-w-[200px]">{owner.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative overflow-hidden">
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients.bg} opacity-[0.07]`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="container mx-auto px-4 pt-8 pb-20 md:pt-12 md:pb-24 relative">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              {/* Avatar with Ring */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative mb-6"
              >
                <div className="relative">
                  <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${gradients.bg} flex items-center justify-center shadow-2xl`}>
                    <span className="text-5xl md:text-6xl font-bold text-white">
                      {owner.name.charAt(0)}
                    </span>
                  </div>
                  {/* Decorative ring */}
                  <div className={`absolute -inset-2 rounded-[1.75rem] border-2 border-dashed opacity-20`} style={{ borderColor: 'hsl(var(--primary))' }} />
                </div>
                
                {owner.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl border-4 border-background"
                  >
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </motion.div>
                )}

                {/* Type Badge on Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -top-2 -right-2"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients.bg} flex items-center justify-center shadow-lg border-3 border-background`}>
                    <OwnerIcon className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Name & Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                  <Badge className={`gap-1.5 py-1.5 px-4 font-bold text-sm border ${gradients.badge}`}>
                    <OwnerIcon className="h-4 w-4" />
                    {ownerTypeLabels[owner.type]}
                  </Badge>
                  {owner.verified && (
                    <Badge className="gap-1.5 py-1.5 px-4 font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                      <Shield className="h-4 w-4" />
                      موثق
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">{owner.name}</h1>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>الإسكندرية</span>
                  <span className="text-border">•</span>
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>عضو منذ {owner.memberSince}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.floor(owner.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`}
                    />
                  ))}
                  <span className="font-bold text-lg mr-2">{owner.rating}</span>
                  <span className="text-sm text-muted-foreground">(48 تقييم)</span>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${owner.phone.replace(/^0/, '20')}?text=مرحباً، أريد الاستفسار عن عقاراتكم`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-7 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" />
                    تواصل عبر واتساب
                  </a>
                  <a
                    href={`tel:${owner.phone}`}
                    className="flex items-center gap-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 px-7 rounded-2xl font-bold transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="h-5 w-5" />
                    اتصال مباشر
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Cards - Overlapping Hero */}
        <section className="container mx-auto px-4 -mt-12 mb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <CardContent className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-border">
                  <StatBlock
                    icon={Building2}
                    value={ownerProperties.length.toString()}
                    label="عقار متاح"
                    trend="+2 هذا الشهر"
                    gradient="from-primary/15 to-primary/5"
                  />
                  <StatBlock
                    icon={Eye}
                    value={totalViews.toLocaleString()}
                    label="مشاهدة"
                    trend="زيادة 15%"
                    gradient="from-secondary/15 to-secondary/5"
                  />
                  <StatBlock
                    icon={ThumbsUp}
                    value={completedDeals.toString()}
                    label="صفقة ناجحة"
                    trend="معدل رضا 98%"
                    gradient="from-emerald-500/15 to-emerald-500/5"
                  />
                  <StatBlock
                    icon={Zap}
                    value={owner.responseTime}
                    label="وقت الاستجابة"
                    trend="أسرع من 90%"
                    gradient="from-blue-500/15 to-blue-500/5"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Trust & Highlights */}
        <section className="container mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <HighlightCard
              icon={Crown}
              title="عضو متميز"
              description={`عضو فعّال منذ ${owner.memberSince} مع سجل حافل بالصفقات الناجحة`}
              gradient="from-primary/10 to-transparent"
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
            <HighlightCard
              icon={Shield}
              title="حساب موثق ومعتمد"
              description="تم التحقق من الهوية وجميع البيانات والمستندات"
              gradient="from-emerald-500/10 to-transparent"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-600 dark:text-emerald-400"
            />
            <HighlightCard
              icon={Award}
              title="تقييم ممتاز"
              description={`حاصل على تقييم ${owner.rating} من 5 من العملاء السابقين`}
              gradient="from-secondary/10 to-transparent"
              iconBg="bg-secondary/10"
              iconColor="text-secondary-foreground"
            />
          </motion.div>
        </section>

        {/* Properties Section */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                  العقارات المتاحة
                </h2>
                <p className="text-muted-foreground mr-5">تصفح جميع عقارات {owner.name}</p>
              </div>
              <Badge variant="outline" className="text-sm gap-2 py-2 px-4 rounded-xl font-bold">
                <Sparkles className="h-4 w-4 text-secondary" />
                {ownerProperties.length} عقار
              </Badge>
            </div>

            {ownerProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownerProperties.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * i, type: "spring", stiffness: 100 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                  <p className="text-muted-foreground text-lg font-medium">لا توجد عقارات حالياً</p>
                  <p className="text-muted-foreground/60 text-sm mt-1">سيتم إضافة عقارات جديدة قريباً</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- Sub Components ---

const StatBlock = ({ icon: Icon, value, label, trend, gradient }: {
  icon: typeof Building2;
  value: string;
  label: string;
  trend: string;
  gradient: string;
}) => (
  <div className="p-5 md:p-6 text-center group hover:bg-muted/30 transition-colors">
    <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div className="text-2xl md:text-3xl font-bold mb-0.5">{value}</div>
    <div className="text-sm text-muted-foreground font-medium mb-1">{label}</div>
    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{trend}</div>
  </div>
);

const HighlightCard = ({ icon: Icon, title, description, gradient, iconBg, iconColor }: {
  icon: typeof Crown;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}) => (
  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <CardContent className="p-5 relative flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default OwnerProfile;
