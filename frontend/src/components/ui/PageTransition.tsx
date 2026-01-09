import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const variants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
    return (
        <motion.div
            // @ts-ignore
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`w-full min-h-screen ${className}`}
        >
            {children}
        </motion.div>
    );
};
