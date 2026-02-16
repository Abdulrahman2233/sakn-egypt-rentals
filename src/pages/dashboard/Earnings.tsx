import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  TrendingUp, TrendingDown, DollarSign, Plus, Building2,
  MapPin, Calendar, Trash2, BarChart3, PieChart as PieChartIcon,
  Wallet, ArrowUpRight, ArrowDownRight, Sparkles, Target,
  Users, GraduationCap, Umbrella, Home, BedDouble, CalendarDays
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  Legend
} from "recharts";

const propertyTypes = [
  { value: "students", label: "طلاب", icon: GraduationCap, color: "hsl(var(--primary))" },
  { value: "families", label: "عائلات", icon: Users, color: "hsl(210, 80%, 55%)" },
  { value: "vacationers", label: "مصيفين", icon: Umbrella, color: "hsl(40, 90%, 55%)" },
  { value: "studio", label: "استديو", icon: Home, color: "hsl(280, 70%, 55%)" },
  { value: "daily", label: "حجز يومي", icon: CalendarDays, color: "hsl(160, 70%, 45%)" },
];

const PIE_COLORS = propertyTypes.map(t => t.color);

const Earnings = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    property_name: "",
    area: "",
    property_type: "families",
    earnings: "",
    deal_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("user_id", user.id)
        .order("deal_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addDeal = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("deals").insert({
        user_id: user.id,
        property_name: form.property_name,
        area: form.area,
        property_type: form.property_type,
        earnings: parseFloat(form.earnings),
        deal_date: form.deal_date,
        notes: form.notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast.success("تم إضافة الصفقة بنجاح");
      setDialogOpen(false);
      setForm({ property_name: "", area: "", property_type: "families", earnings: "", deal_date: new Date().toISOString().split("T")[0], notes: "" });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة الصفقة"),
  });

  const deleteDeal = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("deals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast.success("تم حذف الصفقة");
    },
  });

  // Stats
  const totalEarnings = useMemo(() => deals.reduce((s: number, d: any) => s + Number(d.earnings), 0), [deals]);
  const avgEarnings = deals.length ? totalEarnings / deals.length : 0;
  const thisMonth = useMemo(() => {
    const now = new Date();
    return deals.filter((d: any) => {
      const dd = new Date(d.deal_date);
      return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
    }).reduce((s: number, d: any) => s + Number(d.earnings), 0);
  }, [deals]);
  const lastMonth = useMemo(() => {
    const now = new Date();
    const lm = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const ly = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    return deals.filter((d: any) => {
      const dd = new Date(d.deal_date);
      return dd.getMonth() === lm && dd.getFullYear() === ly;
    }).reduce((s: number, d: any) => s + Number(d.earnings), 0);
  }, [deals]);
  const growthPct = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1) : thisMonth > 0 ? "100" : "0";

  // Chart data: by type
  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    deals.forEach((d: any) => { map[d.property_type] = (map[d.property_type] || 0) + Number(d.earnings); });
    return propertyTypes.map(t => ({ name: t.label, value: map[t.value] || 0 })).filter(d => d.value > 0);
  }, [deals]);

  // Chart data: monthly trend (last 6 months)
  const monthlyData = useMemo(() => {
    const months: { name: string; earnings: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      const total = deals.filter((deal: any) => {
        const dd = new Date(deal.deal_date);
        return dd.getMonth() === m && dd.getFullYear() === y;
      }).reduce((s: number, deal: any) => s + Number(deal.earnings), 0);
      months.push({ name: d.toLocaleDateString("ar-EG", { month: "short" }), earnings: total });
    }
    return months;
  }, [deals]);

  // Chart data: by area
  const areaData = useMemo(() => {
    const map: Record<string, number> = {};
    deals.forEach((d: any) => { map[d.area] = (map[d.area] || 0) + Number(d.earnings); });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [deals]);

  const getTypeInfo = (type: string) => propertyTypes.find(t => t.value === type) || propertyTypes[1];

  const stats = [
    { label: "إجمالي الأرباح", value: totalEarnings.toLocaleString("ar-EG"), icon: Wallet, color: "from-primary to-primary/70", suffix: "ج.م" },
    { label: "أرباح هذا الشهر", value: thisMonth.toLocaleString("ar-EG"), icon: TrendingUp, color: "from-emerald-500 to-emerald-600", suffix: "ج.م" },
    { label: "متوسط الصفقة", value: avgEarnings.toLocaleString("ar-EG", { maximumFractionDigits: 0 }), icon: Target, color: "from-blue-500 to-blue-600", suffix: "ج.م" },
    { label: "عدد الصفقات", value: deals.length.toString(), icon: BarChart3, color: "from-amber-500 to-amber-600", suffix: "صفقة" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6" dir="rtl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary via-primary/90 to-primary/70 p-6 md:p-8 text-primary-foreground"
        >
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white" style={{
                width: `${60 + i * 30}px`, height: `${60 + i * 30}px`,
                top: `${10 + i * 15}%`, right: `${5 + i * 15}%`, opacity: 0.1 + i * 0.03
              }} />
            ))}
          </div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">إدارة الأرباح</h1>
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base">تتبع صفقاتك وأرباحك من العقارات</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg gap-2 font-bold">
                  <Plus className="h-5 w-5" />
                  إضافة صفقة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    صفقة جديدة
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={e => { e.preventDefault(); addDeal.mutate(); }} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>اسم العقار</Label>
                    <Input placeholder="مثال: شقة سيدي بشر" value={form.property_name} onChange={e => setForm(f => ({ ...f, property_name: e.target.value }))} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>المنطقة</Label>
                      <Input placeholder="مثال: سيدي بشر" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} required />
                    </div>
                    <div className="space-y-2">
                      <Label>نوع العقار</Label>
                      <Select value={form.property_type} onValueChange={v => setForm(f => ({ ...f, property_type: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map(t => (
                            <SelectItem key={t.value} value={t.value}>
                              <span className="flex items-center gap-2"><t.icon className="h-4 w-4" />{t.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>الأرباح (ج.م)</Label>
                      <Input type="number" min="0" placeholder="0" value={form.earnings} onChange={e => setForm(f => ({ ...f, earnings: e.target.value }))} required />
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ الصفقة</Label>
                      <Input type="date" value={form.deal_date} onChange={e => setForm(f => ({ ...f, deal_date: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>ملاحظات (اختياري)</Label>
                    <Textarea placeholder="أي ملاحظات إضافية..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} />
                  </div>
                  <Button type="submit" className="w-full gap-2" size="lg" disabled={addDeal.isPending}>
                    {addDeal.isPending ? "جاري الإضافة..." : "إضافة الصفقة"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="relative overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.07]`} />
                <CardContent className="p-4 md:p-5 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                      <stat.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {i === 1 && (
                      <Badge variant={Number(growthPct) >= 0 ? "default" : "destructive"} className="text-[10px] gap-1">
                        {Number(growthPct) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {growthPct}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    {stat.value} <span className="text-xs text-muted-foreground font-normal">{stat.suffix}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Monthly Trend */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base md:text-lg">الأرباح الشهرية</CardTitle>
                </div>
                <CardDescription>آخر 6 أشهر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                        formatter={(v: number) => [`${v.toLocaleString("ar-EG")} ج.م`, "الأرباح"]}
                      />
                      <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#earningsGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* By Type Pie */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base md:text-lg">الأرباح حسب النوع</CardTitle>
                </div>
                <CardDescription>توزيع الأرباح على أنواع العقارات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] md:h-[300px]">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => [`${v.toLocaleString("ar-EG")} ج.م`, ""]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">لا توجد بيانات بعد</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* By Area Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2">
            <Card className="shadow-md border-none">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base md:text-lg">الأرباح حسب المنطقة</CardTitle>
                </div>
                <CardDescription>أفضل المناطق أداءً</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] md:h-[300px]">
                  {areaData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={areaData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                        <Tooltip formatter={(v: number) => [`${v.toLocaleString("ar-EG")} ج.م`, "الأرباح"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">لا توجد بيانات بعد</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Deals List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="shadow-md border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base md:text-lg">سجل الصفقات</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">{deals.length} صفقة</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-10 text-muted-foreground">جاري التحميل...</div>
              ) : deals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">لا توجد صفقات بعد</p>
                  <p className="text-xs text-muted-foreground mt-1">ابدأ بإضافة أول صفقة لك</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {deals.map((deal: any, i: number) => {
                      const typeInfo = getTypeInfo(deal.property_type);
                      const TypeIcon = typeInfo.icon;
                      return (
                        <motion.div
                          key={deal.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: i * 0.05 }}
                          className="group relative flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-border/50 bg-card hover:shadow-md hover:border-primary/20 transition-all"
                        >
                          {/* Type icon */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${typeInfo.color}15` }}>
                              <TypeIcon className="h-5 w-5" style={{ color: typeInfo.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground text-sm truncate">{deal.property_name}</p>
                              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{deal.area}</span>
                                <span className="text-border">•</span>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">{typeInfo.label}</Badge>
                              </div>
                            </div>
                          </div>

                          {/* Earnings & date */}
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="text-left">
                              <p className="font-bold text-foreground text-base">{Number(deal.earnings).toLocaleString("ar-EG")} <span className="text-xs text-muted-foreground">ج.م</span></p>
                              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(deal.deal_date).toLocaleDateString("ar-EG")}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => deleteDeal.mutate(deal.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
