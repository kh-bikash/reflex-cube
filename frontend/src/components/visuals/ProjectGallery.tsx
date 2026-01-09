export const ProjectGallery = () => {
    const projects = [
        { title: "Alpha Agent", category: "Autonomous Trading", year: "2024" },
        { title: "Vision Core", category: "Computer Vision", year: "2024" },
        { title: "Nexus LLM", category: "Language Model", year: "2025" },
    ];

    return (
        <section className="py-10 bg-transparent relative z-10 w-full h-full">
            <div className="w-full h-full flex flex-col">
                <h3 className="text-white text-sm mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Selected Works</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {projects.map((p, i) => (
                        <div key={i} className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-900 rounded-lg border border-white/5 cursor-pointer hover:border-neon-purple/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                <h4 className="text-2xl font-display font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{p.title}</h4>
                                <div className="flex justify-between text-gray-400 text-sm translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    <span>{p.category}</span>
                                    <span>{p.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
