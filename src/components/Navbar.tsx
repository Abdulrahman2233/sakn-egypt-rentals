import { Building2, Menu, Phone, Heart, User, X, ChevronDown, Home, Building, Users, Mail, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "الرئيسية", icon: Home },
    { path: "/properties", label: "العقارات", icon: Building },
    { path: "/about", label: "من نحن", icon: Users },
    { path: "/contact", label: "تواصل معنا", icon: Mail },
    { path: "/admin", label: "لوحة التحكم", icon: Settings },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Main navbar background with curved bottom */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled 
              ? "bg-primary shadow-xl" 
              : "bg-gradient-to-r from-primary via-primary to-primary/95"
          }`}
          style={{
            clipPath: 'ellipse(75% 100% at 50% 0%)',
          }}
        />
        
        {/* Curved wave overlay for extra depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20"
          style={{
            clipPath: 'ellipse(75% 100% at 50% 0%)',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:bg-white/30 transition-all duration-300" />
                <div className="relative bg-white/20 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-white/30">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">
                  Sakn Egypt
                </span>
                <span className="text-[10px] text-white/80 font-medium tracking-wider">
                  سكن مصر للعقارات
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                      isActive(link.path) 
                        ? "text-white" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {!isActive(link.path) && (
                      <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-white/20 relative group text-white"
                >
                  <Heart className="h-5 w-5 transition-colors group-hover:text-red-400" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-white/20 text-white"
                >
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="sm" 
                  className="gap-2 rounded-xl bg-white text-primary hover:bg-white/90 shadow-lg px-5 font-medium"
                >
                  <Phone className="h-4 w-4" />
                  <span>اتصل بنا</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl hover:bg-white/20 text-white"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[320px] p-0 bg-gradient-to-b from-background to-accent/20"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                        <div className="bg-gradient-to-br from-primary to-primary/80 p-2 rounded-xl">
                          <Building2 className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <span className="font-bold text-lg text-primary">Sakn Egypt</span>
                          <p className="text-[10px] text-muted-foreground">سكن مصر للعقارات</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                      {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={link.path}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                                isActive(link.path) 
                                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                                  : "hover:bg-accent/80 text-foreground"
                              }`}
                            >
                              <div className={`p-2 rounded-xl ${
                                isActive(link.path) 
                                  ? "bg-primary-foreground/20" 
                                  : "bg-accent"
                              }`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <span className="font-medium text-base">{link.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-3 px-2">إجراءات سريعة</p>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            className="w-full rounded-xl h-auto py-4 flex-col gap-2 hover:bg-accent/80 border-border/50"
                            onClick={() => setIsOpen(false)}
                          >
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="text-xs">المفضلة</span>
                          </Button>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            className="w-full rounded-xl h-auto py-4 flex-col gap-2 hover:bg-accent/80 border-border/50"
                            onClick={() => setIsOpen(false)}
                          >
                            <User className="h-5 w-5 text-primary" />
                            <span className="text-xs">حسابي</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-border/50 bg-background/50">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 h-12"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="h-5 w-5" />
                        <span className="font-medium">اتصل بنا الآن</span>
                      </Button>
                    </motion.div>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      متاحون على مدار الساعة
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
      
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};
