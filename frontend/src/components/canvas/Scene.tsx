import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";

interface SceneProps {
    children: React.ReactNode;
    className?: string;
}

export const Scene = ({ children, className = "" }: SceneProps) => {
    return (
        <div className={`fixed inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};
