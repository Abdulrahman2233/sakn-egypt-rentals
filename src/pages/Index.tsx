import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { AreaCard } from "@/components/AreaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, Shield, Clock, Award } from "lucide-react";
import { mockProperties, alexandriaAreas } from "@/data/properties";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featuredProperties = mockProperties.filter(p => p.featured);
  const displayAreas = alexandriaAreas.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              اعثر على شقتك المثالية
              <br />
              <span className="text-secondary">في الإسكندرية</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              آلاف العقارات المتاحة للإيجار في أفضل مناطق الإسكندرية
            </p>
            
            {/* Quick Search */}
            <div className="bg-white rounded-lg p-2 shadow-xl max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input 
                  placeholder="ابحث عن منطقة أو عقار..." 
                  className="border-0 text-lg"
                />
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">آلاف العقارات</h3>
              <p className="text-sm text-muted-foreground">
                مجموعة واسعة من العقارات في جميع مناطق الإسكندرية
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">موثوق وآمن</h3>
              <p className="text-sm text-muted-foreground">
                جميع العقارات معتمدة ومفحوصة من قبل فريقنا
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">خدمة سريعة</h3>
              <p className="text-sm text-muted-foreground">
                استجابة فورية وتواصل مباشر مع الوسطاء
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">أفضل الأسعار</h3>
              <p className="text-sm text-muted-foreground">
                عروض حصرية وأسعار تنافسية في السوق
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">عقارات مميزة</h2>
              <p className="text-muted-foreground">أفضل العروض المتاحة الآن</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/properties">عرض الكل</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">استكشف مناطق الإسكندرية</h2>
            <p className="text-muted-foreground">اختر المنطقة المفضلة لديك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayAreas.map((area) => (
              <AreaCard 
                key={area} 
                area={area}
                propertyCount={Math.floor(Math.random() * 50) + 10}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/properties">عرض جميع المناطق</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل أنت وسيط عقاري؟
          </h2>
          <p className="text-lg mb-8 text-white/90">
            انضم إلى منصتنا وابدأ في عرض عقاراتك لآلاف المستخدمين
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            سجل كوسيط عقاري
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
