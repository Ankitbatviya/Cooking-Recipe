import React from 'react';
import { 
    Code2, 
    Terminal, 
    Cpu, 
    Coffee, 
    Github, 
    Linkedin,
    ExternalLink,
    ArrowLeft,
    Layers,
    Database,
    Sparkles
} from 'lucide-react';

const AboutMe = ({ onBack }) => {
    const techStack = [
        { name: "MongoDB", icon: <Database size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Express.js", icon: <Terminal size={18} />, color: "text-stone-600", bg: "bg-stone-100" },
        { name: "React.js", icon: <Code2 size={18} />, color: "text-sky-500", bg: "bg-sky-50" },
        { name: "Node.js", icon: <Layers size={18} />, color: "text-green-500", bg: "bg-green-50" },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            
            {/* 1. HERO SECTION - Fixed Height & Centering */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-stone-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000" 
                    alt="Code background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                
                {/* Nav Bar */}
                <div className="absolute top-0 left-0 w-full p-6 z-30">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all shadow-xl"
                        >
                            <ArrowLeft size={22} />
                        </button>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center pt-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full w-fit mb-6">
                        <Sparkles size={14} className="text-orange-400" />
                        <span className="text-orange-300 font-bold tracking-widest uppercase text-[10px] md:text-xs">Available for Projects</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight">
                        Ankit Batviya<span className="text-orange-500">.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-300 max-w-xl leading-relaxed font-light">
                        MERN Stack Developer crafting high-performance web applications with a focus on clean architecture.
                    </p>
                </div>
            </div>

            {/* 2. MAIN CONTENT CARD - Improved Layering */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-900/10 overflow-hidden border border-stone-100">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        
                        {/* Bio Content */}
                        <div className="lg:col-span-7 p-8 md:p-16">
                            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">
                                The Developer Behind the Code
                            </h2>
                            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                                <p>
                                    I am a <span className="text-stone-900 font-semibold underline decoration-orange-300 decoration-2">MERN Stack Developer</span> based in India. 
                                    I don't just write code; I build digital ecosystems that are scalable, maintainable, and user-centric.
                                </p>
                                <p>
                                    My philosophy is simple: **Clean Code, Efficient Logic, and Great UI.** I specialize in converting complex business requirements into seamless, interactive web experiences.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-12">
                                <a href="https://github.com/Ankitbatviya/" target='_blank' className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-stone-900/20">
                                    <Github size={20} /> <span className="font-bold">GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/ankit-batviya-6096102b4" target='_blank' className="flex items-center gap-2 px-8 py-4 border-2 border-stone-100 rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all font-bold">
                                    <Linkedin size={20} /> <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>

                        {/* Side Profile Info */}
                        <div className="lg:col-span-5 bg-[#FAFAF8] p-8 md:p-12 border-l border-stone-100">
                            <div className="sticky top-12 space-y-8">
                                {/* Technical Stack Display */}
                                <div>
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-black text-stone-400 mb-6">Mastered Technologies</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {techStack.map((tech, i) => (
                                            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200/60 shadow-sm group hover:border-orange-200 transition-all`}>
                                                <div className={`p-3 rounded-xl ${tech.bg} ${tech.color} group-hover:scale-110 transition-transform`}>
                                                    {tech.icon}
                                                </div>
                                                <span className="font-bold text-stone-800">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Coffee Quote */}
                                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                                    <div className="flex gap-4 items-start">
                                        <Coffee className="text-orange-600 shrink-0" size={24} />
                                        <p className="text-sm text-orange-900 italic leading-relaxed">
                                            "A great developer is like a great chef—it's not about the tools, it's about how you handle the ingredients."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. CAPABILITIES GRID */}
                    <div className="p-8 md:p-16 bg-white border-t border-stone-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                {
                                    title: "Frontend Mastery",
                                    desc: "Pixel-perfect React interfaces with Tailwind CSS and Framer Motion.",
                                    icon: <Cpu className="text-orange-600" size={32} />
                                },
                                {
                                    title: "Scalable Backends",
                                    desc: "Secure REST APIs and Microservices built with Node.js and Express.",
                                    icon: <Terminal className="text-orange-600" size={32} />
                                },
                                {
                                    title: "Data Architecture",
                                    desc: "Optimized NoSQL database design with MongoDB and Mongoose.",
                                    icon: <Database className="text-orange-600" size={32} />
                                }
                            ].map((item, i) => (
                                <div key={i} className="group transition-all">
                                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                                    <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. CALL TO ACTION - Final Layout Fix */}
                    <div className="m-4 md:m-8 p-10 md:p-16 bg-stone-900 rounded-[2rem] text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to start a project?</h2>
                            <p className="text-stone-400 mb-10 max-w-lg mx-auto text-lg">
                                Whether you're a startup or an established business, let's collaborate to build something exceptional.
                            </p>
                            <button className="px-12 py-5 bg-orange-600 text-white font-black rounded-full hover:bg-orange-500 hover:scale-105 transition-all shadow-xl shadow-orange-600/20 inline-flex items-center gap-3">
                                Say Hello <ExternalLink size={20} />
                            </button>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
                    </div>

                </div>
            </div>

            {/* Footer Spacer */}
            <div className="h-20"></div>
        </div>
    );
};

export default AboutMe;

