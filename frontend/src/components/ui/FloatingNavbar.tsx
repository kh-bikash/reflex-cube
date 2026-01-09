import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "./MagneticButton";
import { Menu, X } from "lucide-react";

export const FloatingNavbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = ["Work", "Services", "About", "Contact"];

    const handleNavigation = (link: string) => {
        if (link === "Services") {
            navigate("/services");
        } else {
            navigate(`/#${link.toLowerCase()}`);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-6 pointer-events-none"
            >
                <div className="flex items-center gap-8 px-8 py-4 pointer-events-auto bg-midnight-900/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <div className="text-xl font-bold font-display tracking-tighter text-white" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        RC<span className="text-neon-cyan">.</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <MagneticButton
                                key={link}
                                className="bg-transparent hover:bg-white/5 text-sm uppercase tracking-widest px-4 py-2"
                                onClick={() => handleNavigation(link)}
                            >
                                {link}
                            </MagneticButton>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <MagneticButton className="bg-white text-black hover:bg-neon-cyan hover:text-white px-5 py-2 text-sm uppercase font-bold">
                            Let's Talk
                        </MagneticButton>
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        className="fixed inset-0 z-30 bg-midnight-900 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-4xl font-display font-bold text-white hover:text-neon-cyan transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
