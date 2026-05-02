import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";

// Admin Layout & Pages
import { AdminLayout } from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminContent from "@/pages/admin/AdminContent";
import AdminContacts from "@/pages/admin/AdminContacts";
import { useLocation } from "wouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function LayoutSelector() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <Switch>
        <Route path="/admin" component={() => <AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/content" component={() => <AdminLayout><AdminContent /></AdminLayout>} />
        <Route path="/admin/contacts" component={() => <AdminLayout><AdminContacts /></AdminLayout>} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <Router />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <LayoutSelector />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
