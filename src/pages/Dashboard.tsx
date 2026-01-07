import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, Plus, Home, Heart, Settings, LogOut, 
  Eye, Clock, CheckCircle2, XCircle, AlertCircle,
  TrendingUp, Users, MessageSquare, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"user_properties">;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchData(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (profileData) setProfile(profileData);

      // Fetch user properties
      const { data: propertiesData } = await supabase
        .from("user_properties")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (propertiesData) setProperties(propertiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/");
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "approved":
        return { label: "موافق عليه", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 };
      case "pending":
        return { label: "قيد المراجعة", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock };
      case "rejected":
        return { label: "مرفوض", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle };
      default:
        return { label: status, color: "bg-muted text-muted-foreground", icon: AlertCircle };
    }
  };

  const stats = [
    { 
      label: "إجمالي العقارات", 
      value: properties.length, 
      icon: Building2, 
      color: "bg-primary/10 text-primary" 
    },
    { 
      label: "تمت الموافقة", 
      value: properties.filter(p => p.status === "approved").length, 
      icon: CheckCircle2, 
      color: "bg-green-500/10 text-green-600" 
    },
    { 
      label: "قيد المراجعة", 
      value: properties.filter(p => p.status === "pending").length, 
      icon: Clock, 
      color: "bg-yellow-500/10 text-yellow-600" 
    },
    { 
      label: "إجمالي المشاهدات", 
      value: properties.reduce((acc, p) => acc + (p.views_count || 0), 0), 
      icon: Eye, 
      color: "bg-blue-500/10 text-blue-600" 
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="font-bold text-lg">Sakn Egypt</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                asChild
              >
                <Link to="/">
                  <Home className="h-4 w-4 ml-2" />
                  الرئيسية
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 ml-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            مرحباً، {profile?.full_name || user?.email?.split("@")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            إدارة عقاراتك ومتابعة حالتها من لوحة التحكم
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="gap-2 shadow-lg shadow-primary/20" asChild>
            <Link to="/add-property">
              <Plus className="h-5 w-5" />
              إضافة عقار جديد
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/favorites">
              <Heart className="h-5 w-5" />
              المفضلة
            </Link>
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-5 w-5" />
            إعدادات الحساب
          </Button>
        </div>

        {/* Properties List */}
        <Card className="border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              عقاراتي
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {properties.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  لا توجد عقارات بعد
                </h3>
                <p className="text-muted-foreground mb-4">
                  ابدأ بإضافة عقارك الأول الآن
                </p>
                <Button asChild>
                  <Link to="/add-property">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة عقار
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {properties.map((property, index) => {
                  const statusInfo = getStatusInfo(property.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          {property.images && property.images[0] ? (
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground truncate">
                                {property.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {property.location}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${statusInfo.color} flex items-center gap-1.5 shrink-0`}
                            >
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusInfo.label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="font-semibold text-primary">
                              {property.price.toLocaleString()} ج.م
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {property.views_count || 0} مشاهدة
                            </span>
                            <span>
                              {new Date(property.created_at).toLocaleDateString("ar-EG")}
                            </span>
                          </div>
                          
                          {property.admin_notes && property.status === "rejected" && (
                            <div className="mt-2 p-2 bg-red-500/5 rounded-lg border border-red-500/10">
                              <p className="text-sm text-red-600">
                                <strong>سبب الرفض:</strong> {property.admin_notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
