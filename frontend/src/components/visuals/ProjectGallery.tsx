import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const ProjectGallery = () => {
    const navigate = useNavigate();

    const projects = [
        { id: "dream", title: "Dream Canvas", category: "Text to Image", year: "2024", image: "/cubes/dream.png" },
        { id: "vision", title: "Vision Core", category: "Computer Vision", year: "2024", image: "/cubes/vision.png" },
        { id: "nexus", title: "Nexus LLM", category: "Language Model", year: "2025", image: "/cubes/nexus.png" },
        { id: "forge", title: "Forge LLM", category: "Build from Scratch", year: "2026", image: "/cubes/forge.png" },
    ];

    return (
        <>
            <section className="py-10 bg-transparent relative z-10 w-full h-full">
                <div className="w-full h-full flex flex-col">
                    <h3 className="text-foreground text-sm mb-8 uppercase tracking-widest border-b border-border pb-4">Selected Works</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                onClick={() => navigate(`/cube/${p.id}`)}
                                className="group relative w-full aspect-[3/2] overflow-hidden bg-card rounded-sm border border-border cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
                            >
                                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                    <h4 className="text-xl font-display font-bold text-foreground mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{p.title}</h4>
                                    <div className="flex justify-between text-muted-foreground text-xs translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        <span>{p.category}</span>
                                        <span>{p.year}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
};
