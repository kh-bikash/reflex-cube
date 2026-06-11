import React from "react";
import ForgeCube from "../components/cubes/ForgeCube";
import { Scene } from "../components/canvas/Scene";
import { HeroBackground } from "../components/canvas/HeroBackground";

const ModelZoo: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-black relative">
            {/* Background */}
            <Scene className="fixed inset-0 z-0">
                <HeroBackground />
            </Scene>

            {/* Main Content - Full Screen Forge UI */}
            <div className="relative z-10 w-full h-screen pt-20 pb-4 px-4">
                <ForgeCube />
            </div>
        </div>
    );
};

export default ModelZoo;
