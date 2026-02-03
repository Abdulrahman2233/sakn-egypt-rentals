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
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowUpRight,
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
    { value: "5000+", label: "عقار متاح", icon: Building2 },
    { value: "40+", label: "منطقة", icon: MapPin },
    { value: "1000+", label: "عميل سعيد", icon: Users },
    { value: "200+", label: "وسيط معتمد", icon: BadgeCheck },
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

  const popularAreas = ["سيدي بشر", "سموحة", "العجمي", "المنتزه", "جليم", "ستانلي"];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <StudentOfferModal />
      <Navbar />

      {/* Hero Section - Clean Professional Design */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-accent/50 via-background to-background">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-medium">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span>المنصة الأولى للإيجار في الإسكندرية</span>
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
                variants={fadeInUp}
              >
                اعثر على سكنك المثالي
                <br />
                <span className="text-primary">في الإسكندرية</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                variants={fadeInUp}
              >
                آلاف الشقق والعقارات المتاحة للإيجار في أفضل مناطق الإسكندرية
                <br className="hidden sm:block" />
                بأسعار مناسبة وخدمة موثوقة
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
                variants={fadeInUp}
              >
                <Button
                  asChild
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 text-base rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2"
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
                  className="h-12 md:h-14 px-6 md:px-8 text-base rounded-xl border-2 gap-2"
                >
                  <Link to="/contact">
                    <Phone className="h-5 w-5" />
                    تواصل معنا
                  </Link>
                </Button>
              </motion.div>

              {/* Popular Areas */}
              <motion.div
                className="flex flex-wrap gap-2 justify-center"
                variants={fadeInUp}
              >
                <span className="text-muted-foreground text-sm">المناطق الشائعة:</span>
                {popularAreas.map((area) => (
                  <Link
                    key={area}
                    to={`/properties?area=${encodeURIComponent(area)}`}
                    className="px-3 py-1 bg-background border border-border hover:border-primary/50 hover:bg-accent text-foreground text-sm rounded-full transition-all"
                  >
                    {area}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-background border border-border rounded-2xl p-4 md:p-5 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                    variants={scaleIn}
                    whileHover={{ y: -3 }}
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
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

      {/* Areas Section */}
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
              استكشف المناطق
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              أشهر مناطق الإسكندرية
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              تصفح العقارات حسب المنطقة واختر ما يناسبك
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displayAreas.map((area, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <AreaCard area={area} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
                className="bg-accent/50 rounded-2xl p-6 hover:shadow-lg transition-all"
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
                  className="bg-background border border-border rounded-xl px-5 overflow-hidden"
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
      <section className="py-12 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 md:h-14 px-8 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg gap-2"
              >
                <Link to="/properties">
                  <Search className="h-5 w-5" />
                  ابدأ البحث الآن
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 md:h-14 px-8 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 gap-2"
              >
                <Link to="/contact">
                  <Phone className="h-5 w-5" />
                  تواصل معنا
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
