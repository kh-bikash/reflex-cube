import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

export const HeroBackground = () => {
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sparkles
                    count={100}
                    scale={12}
                    size={4}
                    speed={0.4}
                    opacity={0.5}
                    color="#00f0ff"
                />
            </Float>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sparkles
                    count={100}
                    scale={12}
                    size={4}
                    speed={0.4}
                    opacity={0.3}
                    color="#7b61ff"
                />
            </Float>
        </group>
    );
};
