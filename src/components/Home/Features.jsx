import { ArrowRight, Star, Leaf, Zap, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import React from 'react'

function Features() {
    const featureData = [
        { 
            icon: <ShieldCheck className="text-[#355872]" size={22} />, 
            title: 'Kitchen Tested', 
            desc: 'Proven blueprints. We test every variable for perfection.' 
        },
        { 
            icon: <Zap className="text-[#355872]" size={22} />, 
            title: 'Adaptive Macros', 
            desc: 'Dynamic data that scales with your portions automatically.' 
        }
    ];

    return (
        <section className="bg-[#F7F8F0] py-16 lg:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-20 gap-6">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-[#7AAACE]" />
                            <span className="text-[9px] lg:text-[10px] font-black text-[#7AAACE] uppercase tracking-[0.4em]">The Flavor Edge</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-serif text-[#355872] leading-tight">
                            More than just <br />
                            <span className="italic font-light text-[#7AAACE]">a blueprint.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                    
                    {/* --- VISUAL CARD: Responsive Height --- */}
                    <div className="lg:col-span-7 group relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-white shadow-xl 
                        h-[320px] lg:min-h-[500px]"> {/* Fixed height on mobile, min-h on laptop */}
                        
                        <img 
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            alt="Cooking Craft"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#355872] via-[#355872]/20 to-transparent" />
                        
                        {/* Quote & Iconic Line */}
                        <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 space-y-4">
                            <p className="text-white text-lg lg:text-2xl font-serif italic max-w-xs leading-tight">
                                "The step-by-step techniques changed my kitchen game forever."
                            </p>

                            <div className="flex items-center gap-3 group/line">
                                <div className="flex items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#9CD5FF]" />
                                    <div className="w-8 lg:w-16 h-[1px] bg-gradient-to-r from-[#9CD5FF] to-transparent transition-all group-hover/line:w-24" />
                                </div>
                                <span className="text-white/80 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em]">
                                    Chef Thomas
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* --- FEATURE CARDS: Vertical Feed on Mobile --- */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-4 lg:gap-6">
                        {featureData.map((item, i) => (
                            <div key={i} className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-[#7AAACE]/10 shadow-sm flex flex-col justify-center">
                                <div className="bg-[#9CD5FF]/20 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                                    {item.icon}
                                </div>
                                <h4 className="text-lg lg:text-xl font-bold text-[#355872] mb-2">{item.title}</h4>
                                <p className="text-[#355872]/60 text-[11px] lg:text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features