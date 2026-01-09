import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
}

const Word = ({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mr-2 lg:mr-4">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }} className="relative text-white">
                {children}
            </motion.span>
        </span>
    );
};

export const TextReveal = ({ text, className = "" }: TextRevealProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    return (
        <div ref={container} className={`relative z-0 min-h-[50vh] flex items-center justify-center pointer-events-none translate-y-[-100px] ${className}`}>
            <div className="max-w-4xl mx-auto px-4 leading-[1.1]">
                <p className="flex flex-wrap text-3xl md:text-5xl font-bold tracking-tight text-white/20">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} range={[start, end]} progress={scrollYProgress}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};
