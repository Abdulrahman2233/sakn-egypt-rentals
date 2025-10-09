import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bed, Bath, Maximize2, MapPin, Phone, Mail, 
  Heart, Share2, ChevronLeft, ChevronRight 
} from "lucide-react";
import { mockProperties } from "@/data/properties";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">العقار غير موجود</h2>
          <Button asChild>
            <Link to="/properties">العودة للعقارات</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 mt-16">
        {/* Breadcrumb */}
        <div className="bg-accent/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">
                الرئيسية
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <Link to="/properties" className="text-muted-foreground hover:text-primary">
                العقارات
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-foreground font-medium">{property.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Carousel */}
              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${property.name} - صورة ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              {/* Property Info */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="h-5 w-5" />
                        <span>{property.address}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{property.type}</Badge>
                        <Badge variant="outline">
                          {property.furnished ? "مفروشة" : "غير مفروشة"}
                        </Badge>
                        <Badge variant="outline">الطابق {property.floor}</Badge>
                        {property.featured && (
                          <Badge className="bg-secondary text-secondary-foreground">
                            مميز
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: property.name,
                              text: property.description,
                              url: window.location.href,
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('تم نسخ الرابط');
                          }
                        }}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Bed className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-bold">{property.rooms}</div>
                      <div className="text-sm text-muted-foreground">غرف النوم</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Bath className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-bold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">حمامات</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Maximize2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-bold">{property.size}</div>
                      <div className="text-sm text-muted-foreground">متر مربع</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-bold">{property.floor}</div>
                      <div className="text-sm text-muted-foreground">الطابق</div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-3">الوصف</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center pb-4 border-b border-border">
                    <div className="text-sm text-muted-foreground mb-1">السعر الشهري</div>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-primary">
                        {property.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground">جنيه</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={() => window.location.href = `tel:${property.contact}`}
                    >
                      <Phone className="h-5 w-5" />
                      اتصل الآن
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={() => window.location.href = `mailto:info@sakn-egypt.com?subject=استفسار عن ${property.name}`}
                    >
                      <Mail className="h-5 w-5" />
                      أرسل رسالة
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span dir="ltr">{property.contact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">الموقع</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{property.area}</div>
                        <div className="text-sm text-muted-foreground">
                          {property.address}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-48 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">خريطة الموقع</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
