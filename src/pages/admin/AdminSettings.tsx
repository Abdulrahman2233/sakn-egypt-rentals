import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Sakn Egypt",
    siteDescription: "أفضل منصة للعقارات في مصر",
    email: "info@sakn-egypt.com",
    phone: "+20 123 456 7890",
    address: "القاهرة، مصر",
    whatsapp: "+20 123 456 7890",
  });

  // Social Links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/saknegypt",
    instagram: "https://instagram.com/saknegypt",
    twitter: "https://twitter.com/saknegypt",
    linkedin: "https://linkedin.com/company/saknegypt",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newProperty: true,
    newUser: true,
    newInquiry: true,
    dailyReport: false,
    weeklyReport: true,
  });

  // Feature Toggles
  const [features, setFeatures] = useState({
    userRegistration: true,
    brokerRegistration: true,
    propertySubmission: true,
    comments: false,
    ratings: true,
    favorites: true,
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات بنجاح",
    });
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              إعدادات النظام
            </h1>
            <p className="text-muted-foreground">
              إدارة إعدادات الموقع والتكوينات العامة
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">عام</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">الإشعارات</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">الميزات</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">متقدم</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الموقع</CardTitle>
                <CardDescription>
                  المعلومات الأساسية للموقع التي تظهر للزوار
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">اسم الموقع</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, siteName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pr-10"
                        value={siteSettings.email}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">وصف الموقع</Label>
                  <Textarea
                    id="description"
                    value={siteSettings.siteDescription}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, siteDescription: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pr-10"
                        value={siteSettings.phone}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">رقم الواتساب</Label>
                    <Input
                      id="whatsapp"
                      value={siteSettings.whatsapp}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, whatsapp: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      className="pr-10"
                      value={siteSettings.address}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>روابط التواصل الاجتماعي</CardTitle>
                <CardDescription>
                  روابط صفحات الموقع على منصات التواصل الاجتماعي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      فيسبوك
                    </Label>
                    <Input
                      value={socialLinks.facebook}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, facebook: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      انستجرام
                    </Label>
                    <Input
                      value={socialLinks.instagram}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, instagram: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-sky-500" />
                      تويتر
                    </Label>
                    <Input
                      value={socialLinks.twitter}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, twitter: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-700" />
                      لينكد إن
                    </Label>
                    <Input
                      value={socialLinks.linkedin}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>
                  تحكم في الإشعارات التي تصلك عبر البريد الإلكتروني
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">عقار جديد</p>
                      <p className="text-sm text-muted-foreground">
                        إشعار عند إضافة عقار جديد بانتظار الموافقة
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newProperty}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newProperty: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">مستخدم جديد</p>
                      <p className="text-sm text-muted-foreground">
                        إشعار عند تسجيل مستخدم جديد
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newUser}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newUser: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">استفسار جديد</p>
                      <p className="text-sm text-muted-foreground">
                        إشعار عند استلام رسالة استفسار
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newInquiry}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newInquiry: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تقرير يومي</p>
                      <p className="text-sm text-muted-foreground">
                        ملخص يومي للنشاط على الموقع
                      </p>
                    </div>
                    <Switch
                      checked={notifications.dailyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, dailyReport: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تقرير أسبوعي</p>
                      <p className="text-sm text-muted-foreground">
                        ملخص أسبوعي للإحصائيات والنشاط
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, weeklyReport: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Settings */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الميزات</CardTitle>
                <CardDescription>
                  تفعيل أو تعطيل ميزات الموقع المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تسجيل المستخدمين</p>
                      <p className="text-sm text-muted-foreground">
                        السماح للزوار بإنشاء حسابات جديدة
                      </p>
                    </div>
                    <Switch
                      checked={features.userRegistration}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, userRegistration: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تسجيل الوسطاء</p>
                      <p className="text-sm text-muted-foreground">
                        السماح بتسجيل حسابات وسطاء عقارات
                      </p>
                    </div>
                    <Switch
                      checked={features.brokerRegistration}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, brokerRegistration: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إضافة عقارات</p>
                      <p className="text-sm text-muted-foreground">
                        السماح للمستخدمين بإضافة عقارات للموافقة
                      </p>
                    </div>
                    <Switch
                      checked={features.propertySubmission}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, propertySubmission: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">التعليقات</p>
                      <p className="text-sm text-muted-foreground">
                        السماح بالتعليق على العقارات
                      </p>
                    </div>
                    <Switch
                      checked={features.comments}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, comments: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">التقييمات</p>
                      <p className="text-sm text-muted-foreground">
                        السماح بتقييم العقارات بالنجوم
                      </p>
                    </div>
                    <Switch
                      checked={features.ratings}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, ratings: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">المفضلة</p>
                      <p className="text-sm text-muted-foreground">
                        السماح بإضافة العقارات للمفضلة
                      </p>
                    </div>
                    <Switch
                      checked={features.favorites}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, favorites: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات متقدمة</CardTitle>
                <CardDescription>
                  إعدادات النظام المتقدمة - تعامل معها بحذر
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">تنبيه</p>
                      <p className="text-sm text-amber-700">
                        تغيير هذه الإعدادات قد يؤثر على عمل الموقع. تأكد من فهمك
                        لتأثير كل إعداد قبل تغييره.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>مفتاح API الخارجي (Django)</Label>
                    <Input placeholder="sk-xxxxxxxxxxxxxxxx" type="password" />
                    <p className="text-xs text-muted-foreground">
                      مفتاح الاتصال مع خادم Django الخلفي
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>عنوان API</Label>
                    <Input placeholder="https://api.sakn-egypt.com/v1" />
                    <p className="text-xs text-muted-foreground">
                      العنوان الأساسي لـ Django REST API
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">وضع الصيانة</p>
                      <p className="text-sm text-muted-foreground">
                        إيقاف الموقع مؤقتاً للصيانة
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="pt-4">
                    <Button variant="destructive" className="w-full">
                      مسح ذاكرة التخزين المؤقت
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettings;
