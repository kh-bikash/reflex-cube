import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, Sparkles } from "lucide-react";

export const FloatingNavbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    const navLinks = [
        { label: 'Products', path: '/services' },
        { label: 'Generate', path: '/generate' },
        { label: 'Dashboard', path: '/dashboard' },
    ];

    return (
        <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none"
        >
            <div className="flex items-center justify-between w-full mx-auto px-8 py-4 pointer-events-auto bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Reflex<span className="font-normal opacity-80">Cube</span>
                </div>

                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            className="bg-transparent text-white/90 hover:text-white text-sm font-semibold transition-colors"
                            onClick={() => navigate(link.path)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-4 py-2 text-sm font-semibold transition-colors rounded-full"
                        onClick={() => navigate('/services')}
                    >
                        Build with Reflex
                    </button>
                    <button
                        className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-4 py-2 text-sm font-semibold transition-colors rounded-full flex items-center gap-2"
                        onClick={() => navigate('/generate')}
                    >
                        <Sparkles className="w-4 h-4" />
                        Try Reflex
                    </button>
                </div>

                <button
                    className="md:hidden text-foreground hover:text-primary transition-colors"
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
                    className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.path}
                            className="text-4xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(link.path);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};
