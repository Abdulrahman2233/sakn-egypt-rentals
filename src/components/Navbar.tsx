import { Building2, Menu, Phone, Heart, User, Home, Building, Users, Mail, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_-8px_hsl(var(--primary)/0.15)] border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      {/* Top luxe bar */}
      {!isScrolled && (
        <div className="hidden md:block bg-primary text-primary-foreground/90 text-[11px] tracking-wider">
          <div className="container mx-auto px-4 flex items-center justify-between h-8">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-gold" /> منصة العقارات الفاخرة في الإسكندرية</span>
            </div>
            <div className="flex items-center gap-5">
              <span dir="ltr" className="text-gold">+20 123 456 7890</span>
              <span className="opacity-50">|</span>
              <span>info@sakn-egypt.com</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gold/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-primary p-2.5 rounded-xl shadow-lg ring-1 ring-gold/40">
                <Building2 className="h-5 w-5 md:h-6 md:w-6 text-gold" />
              </div>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg md:text-xl text-foreground tracking-tight">
                Sakn <span className="text-gradient-gold">Egypt</span>
              </span>
              <span className="text-[10px] md:text-[11px] text-muted-foreground font-medium mt-1 tracking-[0.15em] uppercase">
                Luxury · Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-gold"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-primary hover:bg-gold/10 rounded-md"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-[10px] text-primary rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Button>

            <Link to="/auth">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-gold/10 rounded-md"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <div className="h-6 w-px bg-border mx-1" />

            <Button
              size="sm"
              className="gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover shadow-md ring-1 ring-gold/30 px-5 h-10 font-semibold"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span>اتصل بنا</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground hover:bg-accent rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] p-0 bg-background"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-5 border-b border-border">
                  <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                    <div className="bg-primary p-2 rounded-xl">
                      <Building2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-bold text-base text-foreground">Sakn Egypt</span>
                      <p className="text-[9px] text-muted-foreground">سكن مصر للعقارات</p>
                    </div>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                            isActive(link.path) 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-accent text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3 px-1">إجراءات سريعة</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full rounded-xl h-auto py-3 flex-col gap-1.5 border-border"
                        onClick={() => setIsOpen(false)}
                      >
                        <Heart className="h-4 w-4 text-destructive" />
                        <span className="text-xs">المفضلة</span>
                      </Button>
                      <Link to="/auth" onClick={() => setIsOpen(false)} className="w-full">
                        <Button 
                          variant="outline" 
                          className="w-full rounded-xl h-auto py-3 flex-col gap-1.5 border-border"
                        >
                          <User className="h-4 w-4 text-primary" />
                          <span className="text-xs">حسابي</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border">
                  <Button 
                    className="w-full gap-2 rounded-xl bg-primary text-primary-foreground h-11"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">اتصل بنا الآن</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};
