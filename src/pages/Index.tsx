import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import StudentOfferModal from "@/components/StudentOfferModal";
import { AreaCard } from "@/components/AreaCard";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Shield,
  Clock,
  Award,
  ChevronDown,
  Home,
  Star,
  Users,
  MessageSquare,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  Eye,
  HeartHandshake,
  BadgeCheck,
  Search,
} from "lucide-react";
import { mockProperties, alexandriaAreas } from "@/data/properties";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const featuredProperties = mockProperties.filter((p) => p.featured);
  const displayAreas = alexandriaAreas.slice(0, 8);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: Building2,
      title: "آلاف العقارات",
      desc: "مجموعة واسعة من العقارات في جميع مناطق الإسكندرية",
    },
    {
      icon: Shield,
      title: "موثوق وآمن",
      desc: "جميع العقارات معتمدة ومفحوصة من قبل فريقنا",
    },
    {
      icon: Clock,
      title: "خدمة سريعة",
      desc: "استجابة فورية وتواصل مباشر مع الوسطاء",
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      desc: "عروض حصرية وأسعار تنافسية في السوق",
    },
  ];

  const stats = [
    { value: "5000+", label: "عقار متاح" },
    { value: "40+", label: "منطقة" },
    { value: "1000+", label: "عميل سعيد" },
    { value: "200+", label: "وسيط معتمد" },
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Search,
      title: "ابحث عن عقارك",
      desc: "استخدم البحث المتقدم للعثور على العقار المناسب في المنطقة المفضلة لديك",
    },
    {
      step: "02",
      icon: Eye,
      title: "شاهد التفاصيل",
      desc: "اطلع على الصور والمواصفات وتفاصيل الموقع والسعر",
    },
    {
      step: "03",
      icon: Phone,
      title: "تواصل مع الوسيط",
      desc: "اتصل مباشرة أو أرسل رسالة للوسيط للترتيب للمعاينة",
    },
    {
      step: "04",
      icon: HeartHandshake,
      title: "أتمم الصفقة",
      desc: "عاين العقار وأتمم التعاقد بسهولة وأمان",
    },
  ];

  const testimonials = [
    {
      name: "أحمد محمود",
      role: "مستأجر",
      content:
        "وجدت شقتي المثالية في سيدي بشر خلال يومين فقط! الموقع سهل الاستخدام والتواصل مع الوسطاء سريع جداً.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "سارة أحمد",
      role: "مستأجرة",
      content:
        "منصة ممتازة! تنوع كبير في العقارات والأسعار مناسبة. أنصح بها بشدة لكل من يبحث عن سكن في الإسكندرية.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "محمد علي",
      role: "وسيط عقاري",
      content:
        "كوسيط، ساعدتني المنصة في الوصول لعملاء أكثر. نظام سهل ودعم فني ممتاز.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  const faqs = [
    {
      question: "هل الموقع مجاني للاستخدام؟",
      answer:
        "نعم، البحث والتصفح مجاني تماماً للباحثين عن سكن. نحن نوفر لك تجربة بحث سهلة ومريحة دون أي رسوم.",
    },
    {
      question: "كيف أتواصل مع صاحب العقار؟",
      answer:
        "يمكنك التواصل مباشرة مع الوسيط أو مالك العقار من خلال أرقام الهاتف المعروضة في صفحة تفاصيل العقار، أو عبر نموذج التواصل المباشر.",
    },
    {
      question: "هل العقارات المعروضة حقيقية؟",
      answer:
        "نعم، نحرص على التحقق من جميع العقارات المعروضة. فريقنا يتابع ويراجع الإعلانات بشكل دوري لضمان مصداقيتها.",
    },
    {
      question: "كيف أضيف عقاري للإيجار؟",
      answer:
        "إذا كنت وسيطاً أو مالكاً للعقار، يمكنك التسجيل كوسيط عقاري ثم إضافة عقاراتك بسهولة مع الصور والتفاصيل.",
    },
    {
      question: "هل يمكنني البحث بمنطقة محددة؟",
      answer:
        "بالتأكيد! يمكنك استخدام البحث المتقدم لتحديد المنطقة، السعر، عدد الغرف، ونوع العقار للحصول على نتائج دقيقة.",
    },
  ];

  const advantages = [
    {
      icon: BadgeCheck,
      title: "موثوقية عالية",
      desc: "جميع العقارات مفحوصة ومعتمدة",
    },
    {
      icon: TrendingUp,
      title: "تحديث مستمر",
      desc: "عقارات جديدة تضاف يومياً",
    },
    {
      icon: ThumbsUp,
      title: "سهولة الاستخدام",
      desc: "واجهة بسيطة ومريحة",
    },
    {
      icon: Users,
      title: "مجتمع كبير",
      desc: "آلاف المستخدمين يثقون بنا",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <StudentOfferModal />
      <Navbar />

      {/* Hero Section - Modern Geometric Design */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Circle */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-secondary/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Small Circles */}
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/10"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-secondary/30"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Squares */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-12 h-12 md:w-20 md:h-20 bg-white/5 rounded-2xl rotate-12"
            animate={{
              rotate: [12, 25, 12],
              y: [0, -20, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-10 h-10 md:w-16 md:h-16 bg-secondary/20 rounded-xl -rotate-12"
            animate={{
              rotate: [-12, -25, -12],
              y: [0, 15, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Gradient Lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              className="absolute top-20 left-0 w-40 md:w-72 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-40 right-0 w-32 md:w-56 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Two Column Layout for Desktop */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-right space-y-6">
                {/* Badge */}
                <motion.div variants={fadeInUp}>
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="h-4 w-4 text-secondary fill-secondary" />
                    </motion.div>
                    <span>المنصة الأولى للإيجار في الإسكندرية</span>
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
                  variants={fadeInUp}
                >
                  اعثر على
                  <br />
                  <span className="relative inline-block">
                    <span className="text-secondary">شقتك المثالية</span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/50 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 max-w-lg mx-auto lg:mx-0"
                  variants={fadeInUp}
                >
                  آلاف العقارات المتاحة للإيجار في أفضل مناطق الإسكندرية بأسعار مناسبة وخدمة موثوقة
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                  variants={fadeInUp}
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 text-lg rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/30 gap-2"
                  >
                    <Link to="/properties">
                      <Search className="h-5 w-5" />
                      تصفح العقارات
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg rounded-2xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm gap-2"
                  >
                    <Link to="/contact">
                      <Phone className="h-5 w-5" />
                      تواصل معنا
                    </Link>
                  </Button>
                </motion.div>

                {/* Quick Areas */}
                <motion.div
                  className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4"
                  variants={fadeInUp}
                >
                  <span className="text-white/60 text-sm ml-2">المناطق الشائعة:</span>
                  {["سيدي بشر", "سموحة", "العجمي", "المنتزه"].map((area) => (
                    <Link
                      key={area}
                      to={`/properties?area=${encodeURIComponent(area)}`}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors border border-white/10"
                    >
                      {area}
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Stats Cards - Desktop Side */}
              <motion.div
                className="w-full lg:w-auto"
                variants={slideInRight}
              >
                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-sm mx-auto lg:max-w-none">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-sm group-hover:blur-md transition-all" />
                      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 text-center">
                        <motion.div
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-1"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm md:text-base text-white/70">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-accent/50"
            />
            <path
              d="M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92C840 94 960 98 1080 100C1200 102 1320 102 1380 102L1440 102V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/50 text-xs">اكتشف المزيد</span>
            <ChevronDown className="h-6 w-6 text-white/50" />
          </div>
        </motion.div>
      </section>

      {/* Features - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-4 md:p-6 bg-background rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-flex p-3 md:p-4 bg-primary/10 rounded-2xl mb-3 md:mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </motion.div>
                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
              <Sparkles className="h-4 w-4" />
              كيف يعمل الموقع
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              أربع خطوات بسيطة
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ابحث عن سكنك المثالي بكل سهولة من خلال خطوات بسيطة
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={fadeInUp}
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-x-1/2" />
                )}

                <div className="relative bg-accent/30 rounded-2xl p-6 text-center hover:bg-accent/50 transition-colors">
                  <div className="absolute -top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {item.step}
                  </div>
                  <motion.div
                    className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4 mt-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - Mobile Carousel Style */}
      <section className="py-12 md:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <div>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
                <Star className="h-4 w-4 fill-primary" />
                عروض حصرية
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                عقارات مميزة
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                أفضل العروض المتاحة الآن
              </p>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
              <Link to="/properties">
                عرض الكل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <motion.div
              className="flex gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {featuredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  className="flex-shrink-0 w-[85vw] max-w-[320px]"
                  variants={scaleIn}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Desktop Grid */}
          <motion.div
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {featuredProperties.map((property) => (
              <motion.div key={property.id} variants={scaleIn}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
                <Award className="h-4 w-4" />
                لماذا تختارنا
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                نحن نجعل البحث عن السكن سهلاً
              </h2>
              <p className="text-muted-foreground mb-6">
                منصة Sakn Egypt هي وجهتك الأولى للعثور على سكنك المثالي في
                الإسكندرية. نوفر لك تجربة بحث سهلة ومريحة مع ضمان الجودة
                والمصداقية.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advantages.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-accent/30 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/80">
                <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
                  {/* Abstract geometric design instead of image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute top-10 right-10 w-40 h-40 rounded-full bg-secondary/20"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-10 w-32 h-32 rounded-2xl bg-white/10 rotate-12"
                      animate={{ rotate: [12, 20, 12] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Building2 className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">الإسكندرية</div>
                      <div className="text-white/80 text-sm">
                        أفضل مناطق السكن والإيجار
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-xl p-4 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">+200</div>
                    <div className="text-xs text-muted-foreground">
                      عميل جديد هذا الشهر
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
              <MessageSquare className="h-4 w-4" />
              آراء العملاء
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-muted-foreground">تجارب حقيقية من مستخدمي المنصة</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-secondary fill-secondary"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Areas - Mobile Optimized Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
              <Home className="h-4 w-4" />
              المناطق
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              استكشف مناطق الإسكندرية
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              اختر المنطقة المفضلة لديك
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displayAreas.map((area, index) => (
              <motion.div
                key={area}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AreaCard
                  area={area}
                  propertyCount={Math.floor(Math.random() * 50) + 10}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2"
            >
              <Link to="/properties">
                عرض جميع المناطق
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
              <MessageSquare className="h-4 w-4" />
              الأسئلة الشائعة
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              هل لديك سؤال؟
            </h2>
            <p className="text-muted-foreground">
              إليك إجابات لأكثر الأسئلة شيوعاً
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
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
                  className="bg-background rounded-xl px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="text-right hover:no-underline py-5">
                    <span className="font-semibold text-base">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">
              لم تجد إجابة لسؤالك؟
            </p>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/contact">
                <Phone className="h-4 w-4" />
                تواصل معنا
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Home className="h-12 w-12 md:h-16 md:w-16 text-white/80 mx-auto mb-4 md:mb-6" />
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={fadeInUp}
          >
            هل أنت وسيط عقاري؟
          </motion.h2>
          <motion.p
            className="text-base md:text-lg mb-6 md:mb-8 text-white/90 max-w-xl mx-auto px-4"
            variants={fadeInUp}
          >
            انضم إلى منصتنا وابدأ في عرض عقاراتك لآلاف المستخدمين
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base px-8"
            >
              سجل كوسيط عقاري
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base px-8 bg-transparent border-white text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              اتصل بنا
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
