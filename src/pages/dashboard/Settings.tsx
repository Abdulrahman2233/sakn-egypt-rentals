import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, Save, Loader2, MapPin, Calendar,
  Lock, Bell, Shield, Eye, EyeOff, Camera, Briefcase,
  Globe, ChevronLeft, Check, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { getStoredUser, saveUser, initMockData, type User as UserType } from "@/data/mockData";

const Settings = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
    address: "",
    city: "",
    country: "مصر",
    bio: "",
    job_title: "",
    company: "",
    website: "",
    birth_date: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    property_updates: true,
    new_messages: true,
    marketing_emails: false,
  });

  const [privacy, setPrivacy] = useState({
    profile_visible: true,
    show_phone: false,
    show_email: true,
    allow_messages: true,
  });

  useEffect(() => {
    initMockData();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        full_name: storedUser.full_name || "",
        phone: storedUser.phone || "",
        avatar_url: storedUser.avatar_url || "",
        address: storedUser.address || "",
        city: storedUser.city || "",
        country: storedUser.country || "مصر",
        bio: storedUser.bio || "",
        job_title: storedUser.job_title || "",
        company: storedUser.company || "",
        website: storedUser.website || "",
        birth_date: storedUser.birth_date || "",
      });
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (user) {
        const updatedUser: UserType = {
          ...user,
          ...formData,
        };
        saveUser(updatedUser);
        setUser(updatedUser);
      }

      toast.success("تم حفظ التغييرات بنجاح");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("كلمة المرور الجديدة غير متطابقة");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("تم تغيير كلمة المرور بنجاح");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("تم حفظ إعدادات الإشعارات");
    } finally {
      setSaving(false);
    }
  };

  const handlePrivacySave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("تم حفظ إعدادات الخصوصية");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const settingsTabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "security", label: "الأمان", icon: Lock },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "privacy", label: "الخصوصية", icon: Shield },
  ];

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-4 lg:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            إعدادات الحساب
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            تخصيص حسابك وإعداداتك الشخصية
          </p>
        </motion.div>

        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="sm:hidden mb-4 -mx-3 px-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-muted-foreground border border-border"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="hidden sm:grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6 mt-0">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Profile Picture Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-border/50 overflow-hidden">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      الصورة الشخصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative group">
                        <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-primary/10">
                          <AvatarImage src={formData.avatar_url} />
                          <AvatarFallback className="text-2xl sm:text-3xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                            {formData.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <Label htmlFor="avatar_url" className="text-sm">رابط الصورة</Label>
                        <Input
                          id="avatar_url"
                          name="avatar_url"
                          value={formData.avatar_url}
                          onChange={handleInputChange}
                          placeholder="https://example.com/avatar.jpg"
                          dir="ltr"
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          أدخل رابط صورتك أو سيتم عرض الحرف الأول من اسمك
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Personal Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-border/50">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <User className="h-5 w-5 text-primary" />
                      المعلومات الأساسية
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      معلوماتك الشخصية الأساسية
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name" className="text-sm">الاسم الكامل</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          placeholder="أدخل اسمك الكامل"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-muted text-sm"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          رقم الهاتف
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="01xxxxxxxxx"
                          dir="ltr"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birth_date" className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          تاريخ الميلاد
                        </Label>
                        <Input
                          id="birth_date"
                          name="birth_date"
                          type="date"
                          value={formData.birth_date}
                          onChange={handleInputChange}
                          dir="ltr"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Address Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-border/50">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      العنوان
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm">العنوان التفصيلي</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="الشارع، المنطقة، الحي"
                        className="text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm">المدينة</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="القاهرة">القاهرة</SelectItem>
                            <SelectItem value="الجيزة">الجيزة</SelectItem>
                            <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                            <SelectItem value="المنصورة">المنصورة</SelectItem>
                            <SelectItem value="طنطا">طنطا</SelectItem>
                            <SelectItem value="أسيوط">أسيوط</SelectItem>
                            <SelectItem value="الأقصر">الأقصر</SelectItem>
                            <SelectItem value="أسوان">أسوان</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm">الدولة</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          disabled
                          className="bg-muted text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Professional Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-border/50">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                      المعلومات المهنية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job_title" className="text-sm">المسمى الوظيفي</Label>
                        <Input
                          id="job_title"
                          name="job_title"
                          value={formData.job_title}
                          onChange={handleInputChange}
                          placeholder="مثال: مدير مبيعات"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm">الشركة / جهة العمل</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="اسم الشركة"
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4" />
                        الموقع الإلكتروني
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://yourwebsite.com"
                        dir="ltr"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm">نبذة عنك</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="اكتب نبذة مختصرة عن نفسك..."
                        rows={3}
                        className="text-sm resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 shadow-lg shadow-primary/20 h-12 text-base"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      حفظ التغييرات
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4 sm:space-y-6 mt-0">
            <form onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Lock className="h-5 w-5 text-primary" />
                      تغيير كلمة المرور
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      تأكد من استخدام كلمة مرور قوية تحتوي على حروف وأرقام ورموز
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm">كلمة المرور الحالية</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="أدخل كلمة المرور الحالية"
                          dir="ltr"
                          className="text-sm pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm">كلمة المرور الجديدة</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="أدخل كلمة المرور الجديدة"
                          dir="ltr"
                          className="text-sm pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm">تأكيد كلمة المرور</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="أعد إدخال كلمة المرور الجديدة"
                        dir="ltr"
                        className="text-sm"
                      />
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-foreground">متطلبات كلمة المرور:</p>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2">
                          <Check className={`h-3 w-3 ${passwordData.newPassword.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`} />
                          8 أحرف على الأقل
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className={`h-3 w-3 ${/[A-Z]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-muted-foreground'}`} />
                          حرف كبير واحد على الأقل
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className={`h-3 w-3 ${/[0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-muted-foreground'}`} />
                          رقم واحد على الأقل
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Security Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-border/50 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">نصائح أمنية</h4>
                        <ul className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                          <li>• لا تشارك كلمة المرور مع أي شخص</li>
                          <li>• استخدم كلمة مرور فريدة لكل حساب</li>
                          <li>• قم بتغيير كلمة المرور بشكل دوري</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 shadow-lg shadow-primary/20 h-12 text-base"
                disabled={saving || !passwordData.currentPassword || !passwordData.newPassword}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جاري التحديث...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    تغيير كلمة المرور
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4 sm:space-y-6 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Bell className="h-5 w-5 text-primary" />
                    تفضيلات الإشعارات
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    تحكم في كيفية تلقي الإشعارات والتنبيهات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Notification Channels */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">قنوات الإشعارات</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">البريد الإلكتروني</p>
                            <p className="text-xs text-muted-foreground">تلقي الإشعارات عبر البريد</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email_notifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email_notifications: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">الرسائل النصية</p>
                            <p className="text-xs text-muted-foreground">تلقي الإشعارات عبر SMS</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.sms_notifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms_notifications: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">الإشعارات الفورية</p>
                            <p className="text-xs text-muted-foreground">إشعارات المتصفح والتطبيق</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.push_notifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push_notifications: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Notification Types */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">أنواع الإشعارات</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium">تحديثات العقارات</p>
                          <p className="text-xs text-muted-foreground">إشعارات عند تغير حالة عقاراتك</p>
                        </div>
                        <Switch
                          checked={notifications.property_updates}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, property_updates: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium">الرسائل الجديدة</p>
                          <p className="text-xs text-muted-foreground">إشعارات عند تلقي رسائل جديدة</p>
                        </div>
                        <Switch
                          checked={notifications.new_messages}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, new_messages: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium">رسائل تسويقية</p>
                          <p className="text-xs text-muted-foreground">عروض وأخبار من Sakn Egypt</p>
                        </div>
                        <Switch
                          checked={notifications.marketing_emails}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing_emails: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Button
              onClick={handleNotificationSave}
              size="lg"
              className="w-full gap-2 shadow-lg shadow-primary/20 h-12 text-base"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-4 sm:space-y-6 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    إعدادات الخصوصية
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    تحكم في من يمكنه رؤية معلوماتك
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">إظهار الملف الشخصي</p>
                          <p className="text-xs text-muted-foreground">السماح للآخرين برؤية ملفك الشخصي</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy.profile_visible}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profile_visible: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">إظهار رقم الهاتف</p>
                          <p className="text-xs text-muted-foreground">عرض رقم هاتفك في الإعلانات</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy.show_phone}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, show_phone: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">إظهار البريد الإلكتروني</p>
                          <p className="text-xs text-muted-foreground">عرض بريدك في الإعلانات</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy.show_email}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, show_email: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ChevronLeft className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">استقبال الرسائل</p>
                          <p className="text-xs text-muted-foreground">السماح للمستخدمين بإرسال رسائل لك</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy.allow_messages}
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allow_messages: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    منطقة الخطر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border border-destructive/30">
                    <div>
                      <p className="text-sm font-medium text-destructive">حذف الحساب</p>
                      <p className="text-xs text-muted-foreground">حذف حسابك وجميع بياناتك نهائياً</p>
                    </div>
                    <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                      حذف الحساب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Button
              onClick={handlePrivacySave}
              size="lg"
              className="w-full gap-2 shadow-lg shadow-primary/20 h-12 text-base"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
