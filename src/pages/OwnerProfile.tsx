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
  Home, ChevronLeft, MapPin, Phone, MessageCircle,
  Star, Shield, Clock, Building2, Calendar,
  CheckCircle2, Award, TrendingUp, User,
  ArrowRight, Sparkles
} from "lucide-react";
import { mockProperties, mockOwners, ownerTypeLabels } from "@/data/properties";
import type { OwnerType } from "@/data/properties";

const ownerTypeIcons: Record<OwnerType, typeof User> = {
  owner: User,
  broker: TrendingUp,
  office: Building2,
};

const ownerTypeColors: Record<OwnerType, string> = {
  owner: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
  broker: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
  office: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
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

        {/* Hero Profile Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="container mx-auto px-4 py-8 md:py-12 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl shadow-primary/20">
                  <span className="text-4xl md:text-5xl font-bold text-primary-foreground">
                    {owner.name.charAt(0)}
                  </span>
                </div>
                {owner.verified && (
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-4 border-background">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center md:text-right"
              >
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <Badge className={`gap-1.5 py-1.5 px-3 font-semibold border ${ownerTypeColors[owner.type]}`}>
                    <OwnerIcon className="h-3.5 w-3.5" />
                    {ownerTypeLabels[owner.type]}
                  </Badge>
                  {owner.verified && (
                    <Badge className="gap-1.5 py-1.5 px-3 bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800">
                      <Shield className="h-3.5 w-3.5" />
                      حساب موثق
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-2">{owner.name}</h1>
                <p className="text-muted-foreground mb-4">عضو منذ {owner.memberSince} · الإسكندرية</p>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold">{owner.rating}</span>
                    <span className="text-sm text-muted-foreground">تقييم</span>
                  </div>
                  <Separator orientation="vertical" className="h-5" />
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-bold">{ownerProperties.length}</span>
                    <span className="text-sm text-muted-foreground">عقار</span>
                  </div>
                  <Separator orientation="vertical" className="h-5" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">الرد {owner.responseTime}</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href={`https://wa.me/${owner.phone.replace(/^0/, '20')}?text=مرحباً، أريد الاستفسار عن عقاراتكم`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-5 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    واتساب
                  </a>
                  <a
                    href={`tel:${owner.phone}`}
                    className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-2.5 px-5 rounded-xl font-medium transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    اتصال
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="container mx-auto px-4 -mt-2 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Building2, label: "إجمالي العقارات", value: ownerProperties.length, color: "from-primary/15 to-primary/5" },
              { icon: Star, label: "التقييم", value: owner.rating, color: "from-amber-500/15 to-amber-500/5" },
              { icon: Calendar, label: "عضو منذ", value: owner.memberSince, color: "from-emerald-500/15 to-emerald-500/5" },
              { icon: Award, label: "وقت الاستجابة", value: owner.responseTime, color: "from-blue-500/15 to-blue-500/5" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Properties Section */}
        <section className="container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <Sparkles className="h-5 w-5 text-secondary" />
                عقارات {owner.name}
              </h2>
              <Badge variant="outline" className="text-sm gap-1.5 py-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {ownerProperties.length} عقار
              </Badge>
            </div>

            {ownerProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownerProperties.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-12 text-center">
                  <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground text-lg">لا توجد عقارات حالياً</p>
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

export default OwnerProfile;
