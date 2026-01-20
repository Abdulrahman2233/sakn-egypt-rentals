import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
  Filter,
  Download,
  Star,
  StarOff,
} from "lucide-react";
import { getMockProperties, saveProperties, Property } from "@/data/mockData";

const AdminProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, statusFilter]);

  const fetchProperties = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = getMockProperties();
    setProperties(data);
    setLoading(false);
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleApprove = (property: Property) => {
    const updated = properties.map((p) =>
      p.id === property.id
        ? { ...p, status: "approved" as const, rejection_reason: undefined, admin_notes: undefined }
        : p
    );
    setProperties(updated);
    saveProperties(updated);
    toast({
      title: "تمت الموافقة",
      description: `تمت الموافقة على العقار "${property.title}"`,
    });
  };

  const handleReject = () => {
    if (!selectedProperty || !rejectionReason.trim()) return;

    const updated = properties.map((p) =>
      p.id === selectedProperty.id
        ? { ...p, status: "rejected" as const, rejection_reason: rejectionReason, admin_notes: rejectionReason }
        : p
    );
    setProperties(updated);
    saveProperties(updated);
    setRejectDialogOpen(false);
    setRejectionReason("");
    setSelectedProperty(null);
    toast({
      title: "تم الرفض",
      description: `تم رفض العقار "${selectedProperty.title}"`,
      variant: "destructive",
    });
  };

  const handleDelete = () => {
    if (!selectedProperty) return;

    const updated = properties.filter((p) => p.id !== selectedProperty.id);
    setProperties(updated);
    saveProperties(updated);
    setDeleteDialogOpen(false);
    setSelectedProperty(null);
    toast({
      title: "تم الحذف",
      description: "تم حذف العقار بنجاح",
    });
  };

  const handleToggleFeatured = (property: Property) => {
    const updated = properties.map((p) =>
      p.id === property.id ? { ...p, is_featured: !p.is_featured } : p
    );
    setProperties(updated);
    saveProperties(updated);
    toast({
      title: property.is_featured ? "تم إزالة التمييز" : "تم التمييز",
      description: property.is_featured
        ? "تم إزالة العقار من المميزة"
        : "تم تمييز العقار",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="h-3 w-3 ml-1" />
            موافق عليه
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Clock className="h-3 w-3 ml-1" />
            معلق
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="h-3 w-3 ml-1" />
            مرفوض
          </Badge>
        );
      default:
        return null;
    }
  };

  const stats = [
    {
      label: "الكل",
      value: "all",
      count: properties.length,
      color: "bg-primary",
    },
    {
      label: "موافق عليها",
      value: "approved",
      count: properties.filter((p) => p.status === "approved").length,
      color: "bg-green-500",
    },
    {
      label: "معلقة",
      value: "pending",
      count: properties.filter((p) => p.status === "pending").length,
      color: "bg-amber-500",
    },
    {
      label: "مرفوضة",
      value: "rejected",
      count: properties.filter((p) => p.status === "rejected").length,
      color: "bg-red-500",
    },
  ];

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
            <h1 className="text-2xl md:text-3xl font-bold">إدارة العقارات</h1>
            <p className="text-muted-foreground">
              عرض وإدارة جميع العقارات في الموقع
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">تصدير</span>
            </Button>
            <Button
              onClick={() => navigate("/admin/properties/add")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              إضافة عقار
            </Button>
          </div>
        </div>

        {/* Stats Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.value}
              className={`cursor-pointer transition-all ${
                statusFilter === stat.value
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => setStatusFilter(stat.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن عقار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                فلترة متقدمة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">جاري التحميل...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="p-8 text-center">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">لا توجد عقارات</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">العقار</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المشاهدات</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={property.images?.[0] || "/placeholder.svg"}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium truncate max-w-[200px]">
                                {property.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {property.property_type} - {property.listing_type}
                              </p>
                            </div>
                            {property.is_featured && (
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {property.location}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {property.price.toLocaleString()} جنيه
                        </TableCell>
                        <TableCell>{getStatusBadge(property.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {property.views_count || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/admin/properties/${property.id}`)
                                }
                              >
                                <Eye className="h-4 w-4 ml-2" />
                                عرض
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/admin/properties/${property.id}/edit`)
                                }
                              >
                                <Pencil className="h-4 w-4 ml-2" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFeatured(property)}
                              >
                                {property.is_featured ? (
                                  <>
                                    <StarOff className="h-4 w-4 ml-2" />
                                    إزالة التمييز
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4 ml-2" />
                                    تمييز العقار
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {property.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleApprove(property)}
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="h-4 w-4 ml-2" />
                                    موافقة
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedProperty(property);
                                      setRejectDialogOpen(true);
                                    }}
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4 ml-2" />
                                    رفض
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedProperty(property);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف العقار "{selectedProperty?.title}"؟ لا يمكن
                التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Dialog */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>رفض العقار</DialogTitle>
              <DialogDescription>
                يرجى كتابة سبب الرفض ليتم إرساله للمستخدم
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>سبب الرفض</Label>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="اكتب سبب الرفض هنا..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setRejectDialogOpen(false);
                  setRejectionReason("");
                }}
              >
                إلغاء
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                تأكيد الرفض
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminProperties;
