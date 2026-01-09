import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "../pages/index";
import NotFound from "../pages/NotFound";
import PromptModel from "./PromptModel";
import ModelDashboard from "./ModelDashboard";
import Services from "../pages/Services";
import { PageTransition } from "./ui/PageTransition";

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageTransition>
                        <Index />
                    </PageTransition>
                } />
                <Route path="/dashboard" element={
                    <PageTransition>
                        <ModelDashboard />
                    </PageTransition>
                } />
                <Route path="/generate" element={
                    <PageTransition>
                        <PromptModel />
                    </PageTransition>
                } />
                <Route path="/services" element={
                    <PageTransition>
                        <Services />
                    </PageTransition>
                } />
                <Route path="*" element={
                    <PageTransition>
                        <NotFound />
                    </PageTransition>
                } />
            </Routes>
        </AnimatePresence>
    );
};
