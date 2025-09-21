import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import ThankYouPage from "@/pages/ThankYouPage";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import { loadRecaptcha } from "@/utils/recaptcha";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/book" component={BookingPage} />
      <Route path="/thank-you" component={ThankYouPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Load reCAPTCHA globally
    loadRecaptcha();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ScrollToTop />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
