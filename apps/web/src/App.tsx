import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Developers from "@/pages/developers";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/developers" component={Developers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isDevPage = location === "/developers";
  
  return (
    <div style={{ paddingTop: isDevPage ? "0px" : "var(--navbar-height)" }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="noise-overlay" />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") }>
            <PageLayout>
              <Router />
            </PageLayout>
          </WouterRouter>
          <GuaranteeBanner />
          <WhatsAppButton />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
