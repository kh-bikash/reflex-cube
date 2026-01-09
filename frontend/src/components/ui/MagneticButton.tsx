import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useUISound } from "../../hooks/useUISound";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const { playHover, playClick } = useUISound();

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.5); // Attraction strength
        y.set(middleY * 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => playHover()}
            onClick={() => {
                playClick();
                onClick?.();
            }}
            style={{ x: springX, y: springY }}
            className={`relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-colors rounded-full bg-midnight-800 hover:bg-neon-purple ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
