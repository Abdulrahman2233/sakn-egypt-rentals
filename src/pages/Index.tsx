import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import StudentOfferModal from "@/components/StudentOfferModal";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Shield,
  Clock,
  Award,
  Home,
  Star,
  Users,
  Phone,
  ArrowLeft,
  TrendingUp,
  ThumbsUp,
  Eye,
  HeartHandshake,
  BadgeCheck,
  Search,
  MapPin,
  ChevronLeft,
  Zap,
  CheckCircle2,
  Quote,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { mockProperties } from "@/data/properties";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import img3dAgent from "@/assets/3d-agent.png";
import img3dHouse from "@/assets/3d-house.png";
import img3dSearch from "@/assets/3d-search.png";
import { useRef } from "react";

// ─── Animation Variants ─────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// ─── Hero Background ────────────────────────────────────────────
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Main gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.03]" />
    
    {/* Geometric grid */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>

    {/* Floating orbs */}
    <motion.div
      className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 left-[5%] w-[350px] h-[350px] rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.05) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* 3D Illustrations */}
    <motion.div
      className="absolute hidden xl:block right-[3%] bottom-[8%] w-64 2xl:w-72"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
    >
      <motion.img
        src={img3dAgent}
        alt="3D Agent"
        className="w-full h-auto drop-shadow-2xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
    <motion.div
      className="absolute hidden xl:block left-[3%] bottom-[10%] w-52 2xl:w-60"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src={img3dHouse}
        alt="3D House"
        className="w-full h-auto drop-shadow-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

    {/* Mobile illustration */}
    <motion.div
      className="absolute xl:hidden left-1/2 -translate-x-1/2 bottom-2 w-24 sm:w-28 opacity-60"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <motion.img
        src={img3dHouse}
        alt="3D House"
        className="w-full h-auto drop-shadow-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>
);

// ─── Section Header Component ───────────────────────────────────
const SectionHeader = ({
  badge,
  title,
  subtitle,
  badgeVariant = "primary",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  badgeVariant?: "primary" | "secondary";
}) => (
  <motion.div
    className="text-center mb-10 md:mb-14"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeInUp}
  >
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full mb-4 ${
        badgeVariant === "primary"
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-secondary/15 text-secondary-foreground border border-secondary/25"
      }`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {badge}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

// ─── Main Component ─────────────────────────────────────────────
const Index = () => {
  const featuredProperties = mockProperties.filter((p) => p.featured);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const stats = [
    { value: "5,000+", label: "عقار متاح", icon: Building2, color: "from-primary/20 to-primary/5" },
    { value: "40+", label: "منطقة مغطاة", icon: MapPin, color: "from-secondary/20 to-secondary/5" },
    { value: "1,000+", label: "عميل سعيد", icon: Users, color: "from-primary/20 to-primary/5" },
    { value: "200+", label: "وسيط معتمد", icon: BadgeCheck, color: "from-secondary/20 to-secondary/5" },
  ];

  const features = [
    {
      icon: Building2,
      title: "آلاف العقارات",
      desc: "تشكيلة واسعة من الشقق والاستديوهات في جميع مناطق الإسكندرية بأسعار متنوعة",
      gradient: "from-blue-500/10 to-indigo-500/5",
    },
    {
      icon: Shield,
      title: "موثوق وآمن",
      desc: "جميع العقارات موثقة ومعتمدة من فريقنا لضمان تجربة آمنة وموثوقة",
      gradient: "from-emerald-500/10 to-green-500/5",
    },
    {
      icon: Zap,
      title: "خدمة فورية",
      desc: "استجابة سريعة وتواصل مباشر مع الوسطاء والملاك في الوقت الفعلي",
      gradient: "from-amber-500/10 to-yellow-500/5",
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      desc: "عروض حصرية وخصومات مستمرة على أفضل العقارات في السوق",
      gradient: "from-purple-500/10 to-pink-500/5",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Search,
      title: "ابحث عن عقارك",
      desc: "استخدم البحث المتقدم مع فلاتر ذكية للعثور على العقار المناسب",
    },
    {
      step: "02",
      icon: Eye,
      title: "شاهد التفاصيل",
      desc: "اطلع على الصور عالية الجودة والمواصفات الكاملة والموقع",
    },
    {
      step: "03",
      icon: Phone,
      title: "تواصل مع الوسيط",
      desc: "اتصل أو أرسل رسالة للوسيط مباشرة لترتيب موعد المعاينة",
    },
    {
      step: "04",
      icon: HeartHandshake,
      title: "أتمم الصفقة",
      desc: "عاين العقار ميدانياً وأتمم التعاقد بكل سهولة وثقة",
    },
  ];

  const testimonials = [
    {
      name: "أحمد محمود",
      role: "مستأجر",
      content: "وجدت شقتي المثالية في سيدي بشر خلال يومين فقط! الموقع سهل الاستخدام والتواصل مع الوسطاء سريع جداً.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "سارة أحمد",
      role: "مستأجرة",
      content: "منصة ممتازة! تنوع كبير في العقارات والأسعار مناسبة. أنصح بها بشدة لكل من يبحث عن سكن في الإسكندرية.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "محمد علي",
      role: "وسيط عقاري",
      content: "كوسيط، ساعدتني المنصة في الوصول لعملاء أكثر. نظام سهل ودعم فني ممتاز يجعل العمل أسرع وأكثر كفاءة.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  const faqs = [
    {
      question: "هل الموقع مجاني للاستخدام؟",
      answer: "نعم، البحث والتصفح مجاني تماماً للباحثين عن سكن. نحن نوفر لك تجربة بحث سهلة ومريحة دون أي رسوم.",
    },
    {
      question: "كيف أتواصل مع صاحب العقار؟",
      answer: "يمكنك التواصل مباشرة مع الوسيط أو مالك العقار من خلال أرقام الهاتف المعروضة في صفحة تفاصيل العقار، أو عبر نموذج التواصل المباشر.",
    },
    {
      question: "هل العقارات المعروضة حقيقية؟",
      answer: "نعم، نحرص على التحقق من جميع العقارات المعروضة. فريقنا يتابع ويراجع الإعلانات بشكل دوري لضمان مصداقيتها.",
    },
    {
      question: "كيف أضيف عقاري للإيجار؟",
      answer: "إذا كنت وسيطاً أو مالكاً للعقار، يمكنك التسجيل كوسيط عقاري ثم إضافة عقاراتك بسهولة مع الصور والتفاصيل.",
    },
    {
      question: "هل يمكنني البحث بمنطقة محددة؟",
      answer: "بالتأكيد! يمكنك استخدام البحث المتقدم لتحديد المنطقة، السعر، عدد الغرف، ونوع العقار للحصول على نتائج دقيقة.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <StudentOfferModal />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-24 md:pt-28 pb-20 md:pb-32 overflow-hidden min-h-[92vh] md:min-h-[88vh] flex items-center"
      >
        <HeroBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center" initial="hidden" animate="visible" variants={staggerContainer}>
              {/* Trust badge */}
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-flex items-center gap-2.5 bg-background/80 backdrop-blur-lg border border-border/60 px-5 py-2.5 rounded-full text-sm font-medium text-foreground shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-muted-foreground">أكثر من</span>
                  <span className="font-bold text-primary">5,000+</span>
                  <span className="text-muted-foreground">عقار متاح الآن</span>
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.15] mb-6 tracking-tight"
                variants={fadeInUp}
              >
                اعثر على سكنك
                <br />
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(217 91% 50%) 50%, hsl(var(--secondary)) 100%)",
                    }}
                  >
                    المثالي
                  </span>
                  {/* Underline decoration */}
                  <motion.svg
                    className="absolute -bottom-2 right-0 w-full h-3"
                    viewBox="0 0 200 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M2 8 C50 2, 150 2, 198 8"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
                variants={fadeInUp}
              >
                آلاف الشقق والعقارات المتاحة للإيجار في أفضل مناطق الإسكندرية بأسعار مناسبة وخدمة موثوقة
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14" variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 md:px-10 text-base rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 gap-3 w-full sm:w-auto"
                  >
                    <Link to="/properties">
                      <Search className="h-5 w-5" />
                      <span className="font-bold">تصفح العقارات</span>
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-base rounded-2xl border-2 border-border hover:border-primary/40 hover:bg-primary/5 gap-2 w-full sm:w-auto"
                  >
                    <Link to="/contact">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-semibold">تواصل معنا</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats bar */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="group relative"
                      variants={scaleIn}
                      whileHover={{ y: -4 }}
                    >
                      <div className={`relative bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className="relative z-10">
                          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary mx-auto mb-2">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-foreground">{stat.value}</div>
                          <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-muted-foreground font-medium">اكتشف المزيد</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-background relative">
        {/* Subtle top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto px-4">
          <SectionHeader
            badge="لماذا نحن؟"
            title="ما يميزنا عن الآخرين"
            subtitle="نقدم تجربة متكاملة تجمع بين الجودة والثقة والسرعة في البحث عن عقارك المثالي"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                >
                  <div className="relative h-full bg-background border border-border/60 rounded-2xl p-6 md:p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2.5 text-base md:text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PROPERTIES
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-accent/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="عقارات مميزة"
            title="أحدث العقارات المتاحة"
            subtitle="اكتشف أفضل العقارات المعروضة حالياً في مختلف مناطق الإسكندرية بأسعار تنافسية"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {featuredProperties.slice(0, 6).map((property) => (
              <motion.div key={property.id} variants={fadeInUp}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="h-13 px-8 rounded-2xl gap-2.5 text-base shadow-md">
                <Link to="/properties">
                  عرض جميع العقارات
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 mb-12 lg:mb-16">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-110" />
                <img src={img3dSearch} alt="How it works" className="relative w-28 md:w-40 h-auto drop-shadow-xl" />
              </div>
            </motion.div>
            <motion.div
              className="text-center lg:text-right flex-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/15 text-secondary-foreground border border-secondary/25 text-sm font-semibold rounded-full mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                كيف يعمل؟
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                أربع خطوات للعثور على سكنك
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                عملية سهلة وسريعة من البحث حتى التعاقد، نجعلها بسيطة لك
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={index} className="relative group" variants={fadeInUp}>
                  {/* Connector line (desktop) */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -left-3 w-6 border-t-2 border-dashed border-primary/20" />
                  )}
                  
                  <div className="relative bg-background border border-border/60 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute -top-3.5 right-5 bg-primary text-primary-foreground text-xs font-black px-3 py-1.5 rounded-lg shadow-md">
                      {step.step}
                    </div>
                    
                    <div className="mt-2">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary mb-4 group-hover:from-primary group-hover:to-primary/90 group-hover:text-primary-foreground transition-all duration-300">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2 text-base">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-accent/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="آراء العملاء"
            title="ماذا يقول عملاؤنا"
            subtitle="تجارب حقيقية من عملائنا الذين وجدوا سكنهم المثالي عبر منصتنا"
            badgeVariant="secondary"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUp}
                whileHover={{ y: -4 }}
              >
                <div className="relative bg-background rounded-2xl p-6 md:p-7 border border-border/50 hover:border-primary/25 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="absolute top-5 left-5 opacity-[0.06]">
                    <Quote className="h-12 w-12 text-primary" />
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-6 leading-relaxed flex-1 text-sm md:text-base">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/10"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container mx-auto px-4">
          <SectionHeader badge="الأسئلة الشائعة" title="لديك سؤال؟" subtitle="إجابات سريعة على الأسئلة الأكثر شيوعاً حول منصتنا" />

          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background border border-border/60 rounded-2xl px-6 overflow-hidden hover:border-primary/25 transition-colors data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="text-right font-semibold py-5 hover:no-underline text-sm md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
          <motion.div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-primary-foreground/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-primary-foreground/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-foreground/[0.03] blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground/90 text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
                <Home className="h-3.5 w-3.5" />
                ابدأ رحلتك اليوم
              </span>
            </motion.div>
            
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-5 leading-tight"
              variants={fadeInUp}
            >
              جاهز للعثور على سكنك؟
            </motion.h2>
            
            <motion.p
              className="text-primary-foreground/75 mb-10 text-sm md:text-lg max-w-md mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              ابدأ رحلة البحث عن عقارك المثالي اليوم. آلاف العقارات بانتظارك!
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-black/20 gap-3 text-base font-bold w-full sm:w-auto"
                >
                  <Link to="/properties">
                    <Search className="h-5 w-5" />
                    ابدأ البحث الآن
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-2xl border-2 border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40 gap-2 text-base w-full sm:w-auto"
                >
                  <Link to="/contact">
                    <Phone className="h-5 w-5" />
                    اتصل بنا
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-primary-foreground/60"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>مجاني 100%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>بدون تسجيل</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>تواصل مباشر</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
