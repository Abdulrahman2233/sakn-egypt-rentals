import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2, Upload, Eye, TrendingUp, Shield, Zap, Users, Star,
  CheckCircle2, ArrowLeft, Sparkles, Camera, BarChart3, Globe,
  Smartphone, Clock, Award, Target, Layers, MessageSquare, ChevronLeft
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const }
  })
};

const stats = [
  { value: "10,000+", label: "عقار منشور", icon: Building2 },
  { value: "50,000+", label: "مشاهدة شهرياً", icon: Eye },
  { value: "5,000+", label: "مُعلن نشط", icon: Users },
  { value: "98%", label: "نسبة الرضا", icon: Star },
];

const features = [
  {
    icon: Upload,
    title: "نشر سريع وسهل",
    description: "أضف عقارك في دقائق مع نظام نشر ذكي يدعم الصور والفيديو",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Eye,
    title: "وصول لآلاف المشترين",
    description: "عقارك يظهر لآلاف الباحثين عن عقارات يومياً في مختلف المناطق",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: BarChart3,
    title: "إحصائيات تفصيلية",
    description: "تابع أداء إعلاناتك بالأرقام: المشاهدات، الاستفسارات، والتفاعل",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "حماية وأمان",
    description: "نظام توثيق متقدم يحمي بياناتك ويضمن مصداقية إعلاناتك",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "متوافق مع جميع الأجهزة",
    description: "إعلاناتك تظهر بشكل مثالي على الهاتف والتابلت والكمبيوتر",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "إدارة متكاملة",
    description: "لوحة تحكم شاملة لإدارة جميع عقاراتك وتتبع أرباحك",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const steps = [
  {
    number: "01",
    title: "أنشئ حسابك",
    description: "سجّل مجاناً في ثوانٍ وأكمل ملفك الشخصي",
    icon: Users,
  },
  {
    number: "02",
    title: "أضف عقارك",
    description: "أدخل تفاصيل العقار وارفع الصور والفيديوهات",
    icon: Camera,
  },
  {
    number: "03",
    title: "انتظر الموافقة",
    description: "يتم مراجعة إعلانك خلال ساعات قليلة",
    icon: Clock,
  },
  {
    number: "04",
    title: "استقبل العملاء",
    description: "تلقَّ الاستفسارات وأتمّ صفقاتك بنجاح",
    icon: MessageSquare,
  },
];

const accountTypes = [
  {
    type: "مالك عقار",
    icon: Building2,
    description: "انشر عقاراتك مباشرة وتواصل مع المشترين بدون وسيط",
    features: ["نشر غير محدود", "إحصائيات مفصلة", "دعم فني مخصص", "توثيق الملكية"],
    gradient: "from-blue-600 to-blue-400",
    popular: false,
  },
  {
    type: "وسيط عقاري",
    icon: Target,
    description: "أدر محفظتك العقارية واعرض عقارات عملائك باحترافية",
    features: ["لوحة تحكم متقدمة", "تتبع الأرباح", "شارة وسيط معتمد", "أولوية في الظهور"],
    gradient: "from-emerald-600 to-emerald-400",
    popular: true,
  },
  {
    type: "مكتب عقاري",
    icon: Layers,
    description: "حلول متكاملة لمكاتب العقارات مع أدوات إدارة احترافية",
    features: ["حسابات فرعية", "تقارير شاملة", "API متقدم", "مدير حساب خاص"],
    gradient: "from-violet-600 to-violet-400",
    popular: false,
  },
];

const PublishProperty = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 ml-2" />
                منصة النشر العقاري الأولى
              </Badge>
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" custom={1} variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              انشر عقارك
              <span className="block mt-2 bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-transparent">
                واوصل لآلاف العملاء
              </span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              بوابتك الاحترافية لنشر العقارات. سواء كنت مالكاً أو وسيطاً أو مكتباً عقارياً، 
              نوفر لك الأدوات والوصول لتحقيق أفضل النتائج
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" custom={3} variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link to="/dashboard/add-property">
                  <Upload className="w-5 h-5 ml-2" />
                  ابدأ النشر مجاناً
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl">
                <Link to="/properties">
                  تصفح العقارات
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label} custom={i} variants={scaleIn}
                className="bg-card border border-border rounded-2xl p-5 md:p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm">
              <Globe className="w-4 h-4 ml-2" />
              مميزات المنصة
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أدوات متقدمة صُممت خصيصاً لتمكين المعلنين العقاريين من تحقيق أقصى استفادة
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title} custom={i} variants={fadeUp}
                className="group relative bg-card border border-border rounded-2xl p-7 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm">
              <Zap className="w-4 h-4 ml-2" />
              خطوات بسيطة
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              كيف تنشر عقارك؟
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أربع خطوات فقط تفصلك عن الوصول لآلاف العملاء المحتملين
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  custom={i} variants={fadeUp}
                  className="relative bg-card border border-border rounded-2xl p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <span className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm">
              <Award className="w-4 h-4 ml-2" />
              أنواع الحسابات
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              اختر ما يناسبك
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              حلول مخصصة تناسب جميع أنواع المعلنين العقاريين
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {accountTypes.map((account, i) => (
              <motion.div
                key={account.type}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i} variants={scaleIn}
                className={`relative bg-card border rounded-2xl p-7 transition-all duration-300 hover:shadow-xl group ${
                  account.popular ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20' : 'border-border hover:border-primary/20'
                }`}
              >
                {account.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs shadow-lg">
                      الأكثر طلباً
                    </Badge>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${account.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <account.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{account.type}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{account.description}</p>

                <ul className="space-y-3 mb-7">
                  {account.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-xl py-5 ${account.popular ? '' : 'variant-outline'}`}
                  variant={account.popular ? 'default' : 'outline'}
                >
                  <Link to="/auth">
                    ابدأ الآن
                    <ChevronLeft className="w-4 h-4 mr-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                جاهز لنشر عقارك؟
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                انضم لآلاف المعلنين الناجحين وابدأ في الوصول لعملائك المحتملين اليوم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-base px-8 py-6 rounded-xl shadow-lg">
                  <Link to="/dashboard/add-property">
                    <Upload className="w-5 h-5 ml-2" />
                    انشر عقارك الآن
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
                  <Link to="/contact">
                    تواصل معنا
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublishProperty;
