import React from "react";
import { FloatingNavbar } from "../ui/FloatingNavbar";
import { Footer } from "../Footer";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative">
            <FloatingNavbar />
            <main className="flex-1 w-full z-10 flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
};
