import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users, Award, CheckCircle2, Star, MapPin, Phone, Shield, TrendingUp, Heart, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "10,000+", label: "عقار متاح", icon: Building2 },
  { value: "50,000+", label: "مستخدم نشط", icon: Users },
  { value: "25+", label: "منطقة في الإسكندرية", icon: MapPin },
  { value: "98%", label: "رضا العملاء", icon: Star },
];

const values = [
  {
    icon: Target,
    title: "رؤيتنا",
    description: "أن نكون المنصة الرائدة في مجال تأجير العقارات في مصر، ونوفر تجربة استثنائية لجميع عملائنا",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building2,
    title: "رسالتنا",
    description: "تسهيل عملية البحث عن السكن من خلال منصة تقنية حديثة تجمع بين الشفافية والمصداقية والسرعة",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Users,
    title: "فريقنا",
    description: "فريق محترف من الخبراء في مجال العقارات والتكنولوجيا، نعمل على مدار الساعة لخدمتكم",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Award,
    title: "قيمنا",
    description: "المصداقية، الشفافية، الاحترافية، والالتزام برضا العملاء هي القيم التي نؤمن بها",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const features = [
  { icon: Shield, title: "عقارات موثوقة", desc: "جميع العقارات معتمدة ومفحوصة للتأكد من جودتها ومطابقتها للوصف" },
  { icon: Zap, title: "بحث متقدم وسريع", desc: "أدوات بحث قوية مع فلاتر متقدمة تساعدك في العثور على شقتك المثالية" },
  { icon: TrendingUp, title: "أسعار تنافسية", desc: "مقارنة أسعار شاملة تضمن لك الحصول على أفضل قيمة مقابل المال" },
  { icon: Heart, title: "دعم فني متواصل", desc: "فريق دعم متخصص جاهز لمساعدتك في أي وقت على مدار الساعة" },
  { icon: Phone, title: "تواصل مباشر", desc: "تواصل مباشر مع أصحاب العقارات بدون وسطاء أو رسوم إضافية" },
  { icon: CheckCircle2, title: "ضمان الجودة", desc: "نضمن لك تجربة سلسة وآمنة من البحث حتى التعاقد" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                <span>المنصة العقارية الأولى في الإسكندرية</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                نبني مستقبل
                <br />
                <span className="text-secondary">السكن في مصر</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                منصة Sakn Egypt هي الوجهة الأولى للباحثين عن شقق للإيجار في محافظة الإسكندرية.
                نوفر تجربة سلسة وموثوقة تجمع بين الباحثين عن السكن وأصحاب العقارات.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Floating Cards */}
        <section className="relative z-20 -mt-12 mb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                    <CardContent className="p-5 text-center">
                      <div className="inline-flex p-2.5 bg-primary/10 rounded-xl mb-3">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="text-sm font-semibold text-primary tracking-wider">ما يميزنا</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">رؤيتنا وقيمنا</h2>
              <div className="w-16 h-1 bg-secondary rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Card className="group border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
                    <CardContent className="p-7 relative">
                      {/* Subtle gradient background on hover */}
                      <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex gap-5">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                          <item.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="text-sm font-semibold text-primary tracking-wider">لماذا نحن</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">لماذا تختار Sakn Egypt؟</h2>
              <div className="w-16 h-1 bg-secondary rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-card">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3.5 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center max-w-4xl mx-auto"
            >
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  ابدأ رحلتك معنا اليوم
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                  انضم إلى آلاف المستخدمين الذين وجدوا سكنهم المثالي عبر Sakn Egypt
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/properties"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-base"
                  >
                    <Building2 className="h-5 w-5" />
                    تصفح العقارات
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-primary-foreground font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-base border border-white/20"
                  >
                    <Phone className="h-5 w-5" />
                    تواصل معنا
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
