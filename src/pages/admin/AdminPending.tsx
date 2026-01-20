import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  User,
  Eye,
  Phone,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { getMockProperties, saveProperties, Property } from "@/data/mockData";

const AdminPending = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const allProperties = getMockProperties();
    const pending = allProperties.filter((p) => p.status === "pending");
    setProperties(pending);
    setLoading(false);
  };

  const handleApprove = (property: Property) => {
    const allProperties = getMockProperties();
    const updated = allProperties.map((p) =>
      p.id === property.id
        ? { ...p, status: "approved" as const, rejection_reason: undefined, admin_notes: undefined }
        : p
    );
    saveProperties(updated);
    setProperties(properties.filter((p) => p.id !== property.id));
    setDetailDialogOpen(false);
    toast({
      title: "تمت الموافقة ✓",
      description: `تمت الموافقة على العقار "${property.title}"`,
    });
  };

  const handleReject = () => {
    if (!selectedProperty || !rejectionReason.trim()) return;

    const allProperties = getMockProperties();
    const updated = allProperties.map((p) =>
      p.id === selectedProperty.id
        ? {
            ...p,
            status: "rejected" as const,
            rejection_reason: rejectionReason,
            admin_notes: rejectionReason,
          }
        : p
    );
    saveProperties(updated);
    setProperties(properties.filter((p) => p.id !== selectedProperty.id));
    setRejectDialogOpen(false);
    setDetailDialogOpen(false);
    setRejectionReason("");
    toast({
      title: "تم الرفض",
      description: `تم رفض العقار "${selectedProperty.title}"`,
      variant: "destructive",
    });
  };

  const openDetail = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    setDetailDialogOpen(true);
  };

  const nextImage = () => {
    if (!selectedProperty?.images) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProperty.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProperty?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProperty.images!.length - 1 : prev - 1
    );
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
              <Clock className="h-8 w-8 text-amber-500" />
              طلبات الموافقة
            </h1>
            <p className="text-muted-foreground">
              مراجعة العقارات المعلقة والموافقة عليها أو رفضها
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {properties.length} عقار معلق
          </Badge>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold mb-2">لا توجد طلبات معلقة</h3>
              <p className="text-muted-foreground">
                جميع العقارات تمت مراجعتها
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 bg-muted">
                    <img
                      src={property.images?.[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-amber-500">
                      <Clock className="h-3 w-3 ml-1" />
                      معلق
                    </Badge>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      {property.images && property.images.length > 1 && (
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          <ImageIcon className="h-3 w-3 ml-1" />
                          {property.images.length}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg truncate">{property.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {property.bedrooms && (
                          <span className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            {property.bedrooms}
                          </span>
                        )}
                        {property.bathrooms && (
                          <span className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            {property.bathrooms}
                          </span>
                        )}
                        {property.area && (
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-4 w-4" />
                            {property.area}م²
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-primary">
                        {property.price.toLocaleString()} جنيه
                      </p>
                      <Badge variant="outline">
                        {property.listing_type === "sale" ? "للبيع" : "للإيجار"}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openDetail(property)}
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        مراجعة
                      </Button>
                      <Button
                        onClick={() => handleApprove(property)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        موافقة
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setSelectedProperty(property);
                          setRejectDialogOpen(true);
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProperty && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProperty.title}</DialogTitle>
                  <DialogDescription>
                    مراجعة تفاصيل العقار قبل الموافقة أو الرفض
                  </DialogDescription>
                </DialogHeader>

                {/* Image Gallery */}
                <div className="relative h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedProperty.images?.[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedProperty.images && selectedProperty.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedProperty.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedProperty.location}</span>
                      {selectedProperty.address && (
                        <span className="text-sm">- {selectedProperty.address}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {selectedProperty.bedrooms && (
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {selectedProperty.bedrooms} غرف
                        </span>
                      )}
                      {selectedProperty.bathrooms && (
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {selectedProperty.bathrooms} حمام
                        </span>
                      )}
                      {selectedProperty.area && (
                        <span className="flex items-center gap-1">
                          <Maximize2 className="h-4 w-4" />
                          {selectedProperty.area} م²
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedProperty.contact || "غير متوفر"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-primary">
                      {selectedProperty.price.toLocaleString()} جنيه
                      {selectedProperty.listing_type === "rent" && (
                        <span className="text-sm font-normal text-muted-foreground">
                          /شهر
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge>{selectedProperty.property_type}</Badge>
                      <Badge variant="outline">
                        {selectedProperty.listing_type === "sale" ? "للبيع" : "للإيجار"}
                      </Badge>
                      {selectedProperty.furnished && (
                        <Badge variant="secondary">مفروش</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        تاريخ الإضافة:{" "}
                        {new Date(selectedProperty.created_at).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedProperty.description && (
                  <div className="space-y-2">
                    <h4 className="font-medium">الوصف</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDetailDialogOpen(false)}
                  >
                    إغلاق
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setRejectDialogOpen(true);
                    }}
                  >
                    <XCircle className="h-4 w-4 ml-2" />
                    رفض
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedProperty)}
                  >
                    <CheckCircle className="h-4 w-4 ml-2" />
                    موافقة
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

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
                  placeholder="مثال: الصور غير واضحة، يرجى إعادة رفع صور عالية الجودة"
                  rows={4}
                />
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-700">
                  سيتم إرسال سبب الرفض للمستخدم عبر البريد الإلكتروني وسيظهر في
                  لوحة التحكم الخاصة به
                </p>
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
                variant="destructive"
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

export default AdminPending;
