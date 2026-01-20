import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  DollarSign,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getMockProperties, Property } from "@/data/mockData";

// Mock data for charts
const visitorsData = [
  { name: "يناير", visitors: 1200, properties: 45 },
  { name: "فبراير", visitors: 1900, properties: 52 },
  { name: "مارس", visitors: 2400, properties: 61 },
  { name: "أبريل", visitors: 1800, properties: 48 },
  { name: "مايو", visitors: 2800, properties: 75 },
  { name: "يونيو", visitors: 3200, properties: 89 },
  { name: "يوليو", visitors: 2900, properties: 82 },
];

const propertyTypeData = [
  { name: "شقق", value: 45, color: "#3b82f6" },
  { name: "فلل", value: 25, color: "#10b981" },
  { name: "محلات", value: 15, color: "#f59e0b" },
  { name: "مكاتب", value: 10, color: "#8b5cf6" },
  { name: "أراضي", value: 5, color: "#ef4444" },
];

const areaData = [
  { name: "سيدي بشر", count: 89, growth: 12 },
  { name: "سموحة", count: 67, growth: 8 },
  { name: "المنتزه", count: 54, growth: -3 },
  { name: "ستانلي", count: 43, growth: 15 },
  { name: "كليوباترا", count: 38, growth: 5 },
];

const recentUsers = [
  { id: 1, name: "أحمد محمد", email: "ahmed@email.com", role: "وسيط", date: "منذ 5 دقائق", avatar: "" },
  { id: 2, name: "سارة أحمد", email: "sara@email.com", role: "مستخدم", date: "منذ 15 دقيقة", avatar: "" },
  { id: 3, name: "محمد علي", email: "mohamed@email.com", role: "وسيط", date: "منذ 30 دقيقة", avatar: "" },
  { id: 4, name: "فاطمة حسن", email: "fatma@email.com", role: "مستخدم", date: "منذ ساعة", avatar: "" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getMockProperties();
      setProperties(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = {
    totalProperties: properties.length,
    pendingProperties: properties.filter(p => p.status === "pending").length,
    approvedProperties: properties.filter(p => p.status === "approved").length,
    rejectedProperties: properties.filter(p => p.status === "rejected").length,
    totalViews: properties.reduce((sum, p) => sum + (p.views_count || 0), 0),
    totalUsers: 156,
    totalInquiries: 47,
    monthlyRevenue: 125000,
  };

  const recentPendingProperties = properties
    .filter(p => p.status === "pending")
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground">مرحباً بك في لوحة تحكم Sakn Egypt</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/properties/add")}>
              <Building2 className="h-4 w-4 ml-2" />
              إضافة عقار
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">إجمالي العقارات</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.totalProperties}</p>
                  <div className="flex items-center gap-1 mt-2 text-blue-100 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12% هذا الشهر</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Building2 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm mb-1">بانتظار الموافقة</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.pendingProperties}</p>
                  <div className="flex items-center gap-1 mt-2 text-amber-100 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>يحتاج مراجعة</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">المستخدمين</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.totalUsers}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-100 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>+8 مستخدم جديد</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-500 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">المشاهدات</p>
                  <p className="text-2xl md:text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2 text-purple-100 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>+23% نمو</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
          {/* Visitors Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>إحصائيات الزيارات والعقارات</span>
                <Badge variant="outline">آخر 7 أشهر</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorsData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        direction: "rtl"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      name="الزيارات"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                    />
                    <Area
                      type="monotone"
                      dataKey="properties"
                      name="العقارات"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorProperties)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Property Types */}
          <Card>
            <CardHeader>
              <CardTitle>أنواع العقارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend 
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Second Row */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
          {/* Pending Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  طلبات الموافقة الأخيرة
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/pending")}
                >
                  عرض الكل
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentPendingProperties.length > 0 ? (
                <div className="space-y-4">
                  {recentPendingProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/properties/${property.id}`)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={property.images?.[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{property.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {property.price.toLocaleString()} جنيه
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <p>لا توجد طلبات معلقة</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  المناطق الأكثر طلباً
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/analytics")}
                >
                  تفاصيل
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areaData.map((area, index) => (
                  <div key={area.name} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{area.name}</span>
                        <span className="text-sm text-muted-foreground">{area.count} طلب</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(area.count / 89) * 100}%` }}
                        />
                      </div>
                    </div>
                    <Badge 
                      variant={area.growth > 0 ? "default" : "secondary"}
                      className={area.growth > 0 ? "bg-green-500" : "bg-red-500"}
                    >
                      {area.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 ml-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 ml-1" />
                      )}
                      {Math.abs(area.growth)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Users */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  المستخدمين الجدد
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/admin/users")}
                >
                  عرض الكل
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{user.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{user.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
