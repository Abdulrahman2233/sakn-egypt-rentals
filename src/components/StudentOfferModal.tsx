import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Sparkles, Clock, BadgePercent, ArrowLeft, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentOfferModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem("hasSeenStudentOffer");
    
    if (!hasSeenOffer) {
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/85 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-6 left-8"
                >
                  <Star className="h-3 w-3 text-yellow-300/50" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-12 right-12"
                >
                  <Sparkles className="h-4 w-4 text-yellow-300/50" />
                </motion.div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 left-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-5 text-center text-white">
                {/* Badge */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30 mb-4"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-yellow-300" />
                  <span className="text-xs font-medium text-yellow-100">عرض حصري للطلاب</span>
                </motion.div>

                {/* Discount percentage */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", damping: 15 }}
                  className="mb-4"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl scale-125" />
                    <div className="relative flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/20">
                      <div className="text-center">
                        <div className="flex items-start justify-center">
                          <span className="text-3xl font-black text-primary">30</span>
                          <span className="text-lg font-bold text-primary mt-0.5">%</span>
                        </div>
                        <span className="text-xs font-semibold text-primary/80">خصم</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg font-bold mb-2"
                >
                  خصومات حصرية للطلاب! 🎓
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 text-sm mb-4 leading-relaxed"
                >
                  خصم يصل إلى 30% على إيجار الشقق بالقرب من جامعتك
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-2 mb-4"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs">
                    <Gift className="h-3 w-3 text-yellow-300" />
                    <span>عروض إضافية</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs">
                    <Clock className="h-3 w-3 text-yellow-300" />
                    <span>عرض محدود</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col gap-2"
                >
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg gap-1.5 h-9"
                    onClick={handleClose}
                  >
                    <Link to="/properties?discount=true">
                      <BadgePercent className="h-4 w-4" />
                      تصفح العروض
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <button
                    onClick={handleClose}
                    className="text-white/60 hover:text-white text-xs py-1 transition-colors"
                  >
                    تصفح لاحقاً
                  </button>
                </motion.div>

                {/* Terms */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-3 text-[10px] text-white/40"
                >
                  * يُطلب إثبات الهوية الطلابية
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
