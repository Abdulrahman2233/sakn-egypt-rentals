import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { AreaCard } from "@/components/AreaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, Shield, Clock, Award, ChevronDown, MapPin, Home, Star } from "lucide-react";
import { mockProperties, alexandriaAreas } from "@/data/properties";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";
import { useState } from "react";

const Index = () => {
  const featuredProperties = mockProperties.filter(p => p.featured);
  const displayAreas = alexandriaAreas.slice(0, 8);
  const [searchQuery, setSearchQuery] = useState("");

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const features = [
    { icon: Building2, title: "آلاف العقارات", desc: "مجموعة واسعة من العقارات في جميع مناطق الإسكندرية" },
    { icon: Shield, title: "موثوق وآمن", desc: "جميع العقارات معتمدة ومفحوصة من قبل فريقنا" },
    { icon: Clock, title: "خدمة سريعة", desc: "استجابة فورية وتواصل مباشر مع الوسطاء" },
    { icon: Award, title: "أفضل الأسعار", desc: "عروض حصرية وأسعار تنافسية في السوق" },
  ];

  const stats = [
    { value: "5000+", label: "عقار متاح" },
    { value: "40+", label: "منطقة" },
    { value: "1000+", label: "عميل سعيد" },
    { value: "200+", label: "وسيط معتمد" },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      {/* Hero Section - Enhanced for Mobile */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        
        {/* Animated Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20 pb-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white space-y-6 md:space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">
                <Star className="h-4 w-4 text-secondary fill-secondary" />
                <span>المنصة الأولى للإيجار في الإسكندرية</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={fadeInUp}
            >
              اعثر على شقتك المثالية
              <br />
              <span className="text-secondary">في الإسكندرية</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              آلاف العقارات المتاحة للإيجار في أفضل مناطق الإسكندرية بأسعار مناسبة
            </motion.p>
            
            {/* Search Box - Mobile Optimized */}
            <motion.div 
              className="px-2 sm:px-4"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="ابحث عن منطقة أو عقار..." 
                      className="border-0 bg-accent/50 pr-10 h-12 sm:h-14 text-base rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-base gap-2 w-full sm:w-auto">
                    <Search className="h-5 w-5" />
                    <span>بحث</span>
                  </Button>
                </div>
                
                {/* Quick Filters - Mobile Scrollable */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                  {["سيدي بشر", "سموحة", "العجمي", "المنتزه", "رشدي"].map((area) => (
                    <Link 
                      key={area}
                      to={`/properties?area=${encodeURIComponent(area)}`}
                      className="flex-shrink-0 px-4 py-2 bg-accent hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats - Mobile Grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 md:pt-10 px-2"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                  variants={scaleIn}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/80 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
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
                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - Mobile Carousel Style */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">عقارات مميزة</h2>
              <p className="text-muted-foreground text-sm md:text-base">أفضل العروض المتاحة الآن</p>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/properties">عرض الكل</Link>
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

      {/* Areas - Mobile Optimized Grid */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">استكشف مناطق الإسكندرية</h2>
            <p className="text-muted-foreground text-sm md:text-base">اختر المنطقة المفضلة لديك</p>
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
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/properties">عرض جميع المناطق</Link>
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
          <motion.div variants={fadeInUp}>
            <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto text-base px-8">
              سجل كوسيط عقاري
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
