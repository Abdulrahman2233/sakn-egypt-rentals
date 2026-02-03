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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/50" 
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="bg-primary p-2 rounded-xl shadow-sm">
                <Building2 className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-lg text-foreground">
                Sakn Egypt
              </span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground font-medium -mt-0.5">
                سكن مصر للعقارات
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive(link.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
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
              className="relative text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-[10px] text-destructive-foreground rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Button>
            
            <Link to="/auth">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              size="sm" 
              className="gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm px-4"
            >
              <Phone className="h-4 w-4" />
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
