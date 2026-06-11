import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

import { Scene } from "./components/canvas/Scene";
import { HeroBackground } from "./components/canvas/HeroBackground";
import { AppLayout } from "./components/layout/AppLayout";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <Scene className="fixed inset-0 z-0">
        <HeroBackground />
      </Scene> */}
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout>
          <AnimatedRoutes />
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
