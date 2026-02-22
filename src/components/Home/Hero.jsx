import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        /* Increased pt-32 (upper padding) to push content down, 
           and used min-h-[85vh] to ensure it feels centered on the viewport */
        <section className="relative w-full max-w-7xl mx-auto px-8 pt-32 pb-20 min-h-[85vh] flex items-center justify-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

                {/* Left Side: Editorial Typography */}
                <div className="relative z-20 space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-orange-500">
                            <div className="h-[1px] w-12 bg-orange-500"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Est. 2026</span>
                        </div>

                        <h1 className="text-7xl md:text-[110px] font-black leading-[0.8] tracking-tighter text-slate-900">
                            Pure <br />
                            <span className="relative">
                                Flavor.
                                <svg className="absolute -bottom-2 left-0 w-full h-4 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h1>
                    </div>

                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md">
                        Beyond recipes, we curate <span className="text-slate-900 font-medium italic">culinary moments</span>. Simple ingredients, extraordinary results.
                    </p>

                    {/* Action Group */}
                    <div className="flex items-center gap-8">
                        <button className="relative group overflow-hidden bg-slate-900 text-white px-10 py-5 rounded-full font-bold transition-all hover:pr-14 active:scale-95">
                            <span className="relative z-10 text-sm">Start Cooking</span>
                            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={20} />
                        </button>

                        <button className="group flex items-center gap-3 font-bold text-slate-900">
                            <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-200 transition-all">
                                <Play size={16} className="text-orange-500 fill-orange-500" />
                            </span>
                            <span className="border-b-2 border-slate-900 pb-1 uppercase text-[10px] tracking-widest">Watch Story</span>
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-6 flex gap-12">
                        <div>
                            <p className="text-3xl font-black">12k+</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Curated Dishes</p>
                        </div>
                        <div className="w-[1px] h-12 bg-slate-100"></div>
                        <div>
                            <p className="text-3xl font-black">85</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Master Chefs</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image with adjusted vertical alignment */}
                <div className="relative lg:mt-0 mt-12">
                    <div className="relative rounded-[4rem] overflow-hidden group shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800"
                            alt="Artistic Food"
                            className="w-full h-[600px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>

                        {/* Floating Nutrition Info */}
                        <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white rotate-6 group-hover:rotate-0 transition-transform duration-500">
                            <p className="text-4xl font-black">420</p>
                            <p className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Kcal / Serving</p>
                        </div>
                    </div>

                    {/* Secondary Overlap - Positioned to anchor the bottom */}
                    <div className="absolute -bottom-10 -left-16 w-56 h-56 rounded-3xl overflow-hidden border-[12px] border-white shadow-2xl hidden xl:block">
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
                            className="w-full h-full object-cover"
                            alt="Fresh Ingredients"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;