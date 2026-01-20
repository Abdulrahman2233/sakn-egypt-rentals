import { ReactNode, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  MessageSquare,
  FileText,
  Shield,
  Home,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    path: "/admin",
    label: "الرئيسية",
    icon: LayoutDashboard,
    description: "نظرة عامة على الإحصائيات",
  },
  {
    path: "/admin/properties",
    label: "العقارات",
    icon: Building2,
    description: "إدارة جميع العقارات",
    badge: 5,
  },
  {
    path: "/admin/pending",
    label: "طلبات الموافقة",
    icon: Clock,
    description: "العقارات المعلقة",
    badge: 3,
  },
  {
    path: "/admin/users",
    label: "المستخدمين",
    icon: Users,
    description: "إدارة المستخدمين والوسطاء",
  },
  {
    path: "/admin/inquiries",
    label: "الاستفسارات",
    icon: MessageSquare,
    description: "رسائل العملاء",
    badge: 12,
  },
  {
    path: "/admin/reports",
    label: "التقارير",
    icon: FileText,
    description: "تقارير مفصلة",
  },
  {
    path: "/admin/analytics",
    label: "التحليلات",
    icon: BarChart3,
    description: "رسوم بيانية متقدمة",
  },
  {
    path: "/admin/settings",
    label: "الإعدادات",
    icon: Settings,
    description: "إعدادات النظام",
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const adminUser = {
    name: "مدير النظام",
    email: "admin@sakn-egypt.com",
    avatar: "",
    role: "مسؤول",
  };

  return (
    <div className="min-h-screen bg-muted/30 flex w-full" dir="rtl">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={{
            width: isCollapsed ? 80 : 280,
            x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : 280,
          }}
          className={cn(
            "fixed lg:sticky top-0 right-0 h-screen z-50",
            "bg-gradient-to-b from-slate-900 to-slate-800",
            "border-l border-slate-700/50 flex flex-col",
            "transition-all duration-300"
          )}
        >
          {/* Logo */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Sakn Admin</h1>
                    <p className="text-xs text-slate-400">لوحة التحكم</p>
                  </div>
                </motion.div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setIsCollapsed(!isCollapsed);
                  } else {
                    setIsSidebarOpen(false);
                  }
                }}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                    "group relative",
                    isActive(item.path)
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-white"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-700/50">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  <AvatarImage src={adminUser.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {adminUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{adminUser.name}</p>
                  <p className="text-xs text-slate-400 truncate">{adminUser.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-border/50">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن عقارات، مستخدمين..."
                  className="pr-10 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-start gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">عقار جديد بانتظار الموافقة</p>
                      <p className="text-xs text-muted-foreground">منذ 5 دقائق</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">مستخدم جديد انضم للموقع</p>
                      <p className="text-xs text-muted-foreground">منذ 15 دقيقة</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">رسالة استفسار جديدة</p>
                      <p className="text-xs text-muted-foreground">منذ 30 دقيقة</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Go to Site */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="hidden sm:flex gap-2"
              >
                <Home className="h-4 w-4" />
                الموقع الرئيسي
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={adminUser.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {adminUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium">{adminUser.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                    <Settings className="h-4 w-4 ml-2" />
                    الإعدادات
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
