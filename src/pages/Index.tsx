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
} from "lucide-react";
import { mockProperties } from "@/data/properties";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Static Professional Background
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Radial gradient overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]" />
    
    {/* Subtle dot grid pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="hsl(var(--primary))" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>

    {/* Decorative gradient blobs - static */}
    <div className="absolute top-16 right-[8%] w-72 h-72 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
    <div className="absolute bottom-24 left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/8 to-transparent blur-3xl" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />

    {/* Static building skyline silhouette */}
    <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 md:h-56 opacity-[0.04]">
      <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="xMidYMax slice" fill="hsl(var(--primary))">
        <rect x="50" y="60" width="80" height="140" rx="2" />
        <rect x="55" y="55" width="70" height="8" rx="1" />
        <rect x="160" y="90" width="60" height="110" rx="2" />
        <rect x="250" y="40" width="100" height="160" rx="2" />
        <rect x="255" y="33" width="90" height="10" rx="1" />
        <rect x="380" y="80" width="70" height="120" rx="2" />
        <rect x="480" y="50" width="90" height="150" rx="2" />
        <rect x="600" y="70" width="75" height="130" rx="2" />
        <rect x="700" y="30" width="110" height="170" rx="2" />
        <rect x="705" y="23" width="100" height="10" rx="1" />
        <rect x="840" y="85" width="65" height="115" rx="2" />
        <rect x="930" y="55" width="85" height="145" rx="2" />
        <rect x="1040" y="75" width="70" height="125" rx="2" />
        <rect x="1130" y="95" width="55" height="105" rx="2" />
        {/* Windows */}
        {[65, 85, 105, 125].map(y => [65, 85, 105].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="1" opacity="0.5" />
        )))}
        {[55, 75, 95, 115, 135].map(y => [265, 290, 315].map(x => (
          <rect key={`b${x}-${y}`} x={x} y={y} width="12" height="12" rx="1" opacity="0.5" />
        )))}
        {[45, 65, 85, 105, 125, 145].map(y => [715, 740, 770].map(x => (
          <rect key={`c${x}-${y}`} x={x} y={y} width="12" height="12" rx="1" opacity="0.5" />
        )))}
      </svg>
    </div>

    {/* Subtle diagonal lines accent */}
    <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02]"
      style={{
        backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 21px)",
      }}
    />
  </div>
);

const Index = () => {
  const featuredProperties = mockProperties.filter((p) => p.featured);

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
    { value: "5000+", label: "عقار", icon: Building2 },
    { value: "40+", label: "منطقة", icon: MapPin },
    { value: "1000+", label: "عميل", icon: Users },
    { value: "200+", label: "وسيط", icon: BadgeCheck },
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

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <StudentOfferModal />
      <Navbar />

      {/* Hero Section - Professional Static Design */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden min-h-[90vh] md:min-h-[85vh] flex items-center">
        <HeroBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <motion.span 
                  className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-medium backdrop-blur-sm"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(var(--primary), 0)",
                      "0 0 0 10px rgba(var(--primary), 0.1)",
                      "0 0 0 0 rgba(var(--primary), 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span>المنصة الأولى للإيجار في الإسكندرية</span>
                </motion.span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
                variants={fadeInUp}
              >
                اعثر على سكنك المثالي
                <br />
                <motion.span 
                  className="text-primary inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  في الإسكندرية
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                variants={fadeInUp}
              >
                آلاف الشقق والعقارات المتاحة للإيجار في أفضل مناطق الإسكندرية
                <br className="hidden sm:block" />
                بأسعار مناسبة وخدمة موثوقة
              </motion.p>

              {/* Enhanced CTA Button */}
              <motion.div
                className="flex justify-center mb-12"
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% auto" }}
                  />
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute -inset-2 rounded-2xl border-2 border-primary/30"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button
                    asChild
                    size="lg"
                    className="relative h-14 md:h-16 px-8 md:px-12 text-base md:text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-2xl shadow-primary/40 gap-3 border border-primary-foreground/10"
                  >
                    <Link to="/properties" className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Search className="h-5 w-5 md:h-6 md:w-6" />
                      </motion.div>
                      <span className="font-bold">تصفح العقارات</span>
                      <motion.div
                        animate={{ x: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced Stats Grid */}
              <motion.div
                className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative group"
                      variants={scaleIn}
                      whileHover={{ y: -5, scale: 1.03 }}
                    >
                      {/* Card glow on hover */}
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative bg-background/90 backdrop-blur-md border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center shadow-lg hover:shadow-xl hover:border-primary/40 transition-all overflow-hidden">
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        {/* Icon with animation */}
                        <motion.div 
                          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-2 mx-auto"
                          whileHover={{ rotate: 10 }}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.div>
                        {/* Animated counter effect */}
                        <motion.div 
                          className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-1">{stat.label}</div>
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-xl" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-accent/50 rounded-2xl p-5 md:p-6 text-center hover:bg-accent transition-colors"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              عقارات مميزة
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              أحدث العقارات المتاحة
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              اكتشف أفضل العقارات المعروضة حالياً في مختلف مناطق الإسكندرية
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button asChild size="lg" className="rounded-xl gap-2">
              <Link to="/properties">
                عرض جميع العقارات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-4">
              كيف يعمل؟
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              خطوات بسيطة للعثور على سكنك
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              اتبع هذه الخطوات السهلة للعثور على العقار المناسب
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="relative text-center"
                  variants={fadeInUp}
                >
                  <div className="relative z-10 bg-background border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                    <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                      {step.step}
                    </div>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-4">
              آراء العملاء
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              ماذا يقول عملاؤنا
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-2xl p-6 hover:shadow-lg transition-all border border-border/50"
                variants={fadeInUp}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              الأسئلة الشائعة
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              لديك سؤال؟
            </h2>
          </motion.div>

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
                  className="bg-accent/50 border border-border rounded-xl px-5 overflow-hidden"
                >
                  <AccordionTrigger className="text-right font-medium py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary relative overflow-hidden">
        {/* Animated background for CTA */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -left-1/4 w-80 h-80 rounded-full bg-white/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              جاهز للعثور على سكنك؟
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-sm md:text-base">
              ابدأ رحلة البحث عن عقارك المثالي اليوم. آلاف العقارات بانتظارك!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-10 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl gap-3"
              >
                <Link to="/properties">
                  <Search className="h-5 w-5" />
                  ابدأ البحث الآن
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
