import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Sparkles, Clock, BadgePercent, ArrowLeft, Gift, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentOfferModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal was already shown in this session
    const hasSeenOffer = sessionStorage.getItem("hasSeenStudentOffer");
    
    if (!hasSeenOffer) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenStudentOffer", "true");
  };

  const features = [
    { icon: GraduationCap, text: "خصم حصري للطلاب" },
    { icon: Gift, text: "عروض إضافية على الإيجار" },
    { icon: Clock, text: "عرض محدود المدة" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                
                {/* Floating particles */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-10 left-10"
                >
                  <Star className="h-4 w-4 text-yellow-300/60" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-20 right-16"
                >
                  <Sparkles className="h-5 w-5 text-yellow-300/60" />
                </motion.div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-32 right-10"
                >
                  <Zap className="h-4 w-4 text-yellow-300/60" fill="currentColor" />
                </motion.div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-6 lg:p-8 text-center text-white">
                {/* Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-400/30 mb-6"
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium text-yellow-100">عرض حصري للطلاب</span>
                </motion.div>

                {/* Discount percentage */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", damping: 15 }}
                  className="mb-6"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl scale-150" />
                    <div className="relative flex items-center justify-center w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/30">
                      <div className="text-center">
                        <div className="flex items-start justify-center">
                          <span className="text-5xl font-black text-primary">30</span>
                          <span className="text-2xl font-bold text-primary mt-1">%</span>
                        </div>
                        <span className="text-sm font-semibold text-primary/80">خصم</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl lg:text-3xl font-bold mb-3"
                >
                  خصومات حصرية للطلاب! 🎓
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 mb-6 max-w-sm mx-auto leading-relaxed"
                >
                  احصل على خصم يصل إلى 30% على إيجار الشقق والغرف بالقرب من جامعتك. عرض خاص لطلاب الجامعات في الإسكندرية!
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-3 mb-8"
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                      >
                        <Icon className="h-4 w-4 text-yellow-300" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Timer badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/30 mb-6"
                >
                  <Clock className="h-4 w-4 text-red-300 animate-pulse" />
                  <span className="text-sm text-red-200">العرض ينتهي خلال 7 أيام</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg shadow-black/20 gap-2"
                    onClick={handleClose}
                  >
                    <Link to="/properties?discount=true">
                      <BadgePercent className="h-5 w-5" />
                      تصفح العروض
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleClose}
                    className="text-white/80 hover:text-white hover:bg-white/10"
                  >
                    تصفح لاحقاً
                  </Button>
                </motion.div>

                {/* Terms */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-xs text-white/50"
                >
                  * يُطلب إثبات الهوية الطلابية. تطبق الشروط والأحكام.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudentOfferModal;
