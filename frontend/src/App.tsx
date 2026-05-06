import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="noise-overlay" />
          <div style={{ paddingTop: "var(--navbar-height)" }}>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") }>
              <Router />
            </WouterRouter>
          </div>
          <GuaranteeBanner />
          <WhatsAppButton />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
