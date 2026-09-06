import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import Home from "@/pages/home";

// Secondary routes are code-split so the home page ships less JavaScript
const Developers = lazy(() => import("@/pages/developers"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/developers" component={Developers} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isDevPage = location === "/developers";
  
  return (
    <>
      <div style={{ paddingTop: isDevPage ? "0px" : "var(--navbar-height)" }}>
        {children}
      </div>
      {!isDevPage && (
        <>
          <GuaranteeBanner />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <LanguageProvider>
        <div className="noise-overlay" />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") }>
          <PageLayout>
            <Router />
          </PageLayout>
        </WouterRouter>
        <Toaster />
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
