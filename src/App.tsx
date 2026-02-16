import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import AddProperty from "./pages/dashboard/AddProperty";
import MyProperties from "./pages/dashboard/MyProperties";
import Favorites from "./pages/dashboard/Favorites";
import Settings from "./pages/dashboard/Settings";
import Earnings from "./pages/dashboard/Earnings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/add-property" element={<AddProperty />} />
          <Route path="/dashboard/my-properties" element={<MyProperties />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/earnings" element={<Earnings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
