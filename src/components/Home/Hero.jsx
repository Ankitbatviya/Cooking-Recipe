import React from 'react';
import { Compass, ArrowRight, Heart, Clock, Utensils, Play, Star } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen bg-[#F7F8F0] overflow-hidden flex items-center mt-10">
            {/* --- BACKGROUND ORNAMENTATION --- */}
            <div className="hidden lg:block absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#9CD5FF]/20 rounded-full blur-[120px] -z-10" />
            <div className="hidden lg:block absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-[#7AAACE]/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-12 lg:py-0">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* --- IMAGE SECTION (Top on Mobile, Right on Laptop) --- */}
                    <div className="col-span-1 lg:col-span-5 order-1 lg:order-2 relative">
                        <div className="relative group">
                            {/* Decorative Frame Behind Image (Laptop only) */}
                            <div className="hidden lg:block absolute -top-6 -right-6 w-full h-full border-2 border-[#7AAACE]/20 rounded-[4rem] -z-10 translate-x-3 translate-y-3" />

                            {/* Main Image Container */}
                            <div className="relative h-[40vh] md:h-[50vh] lg:h-[650px] rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] lg:border-[12px] border-white transition-transform duration-700 group-hover:scale-[1.02]">
                                <img
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
                                    className="w-full h-full object-cover"
                                    alt="Premium Culinary Dish"
                                />
                                {/* Mobile-only gradient to blend image into text section */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F8F0] via-transparent to-transparent lg:hidden" />
                            </div>

                            {/* Floating Detail Card */}
                            <div className="absolute -bottom-6 right-4 left-4 lg:left-auto lg:-left-16 lg:bottom-16 z-20 bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] shadow-xl border border-white flex items-center gap-4 lg:w-72">
                                <div className="bg-[#355872] p-3 rounded-2xl shadow-lg shadow-[#355872]/20">
                                    <Utensils size={20} className="text-[#9CD5FF]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#355872] text-sm lg:text-base leading-tight">Glazed Salmon</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#7AAACE]">
                                            <Clock size={12} /> 15m
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span className="text-[11px] font-bold text-[#355872]/50 italic">Chef's Choice</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- TEXT SECTION (Bottom on Mobile, Left on Laptop) --- */}
                    <div className="col-span-1 lg:col-span-7 order-2 lg:order-1 lg:pr-10">
                        <div className="space-y-8 lg:space-y-10">


                            {/* Main Title */}
                            <h1 className="text-[14vw] sm:text-7xl lg:text-[100px] xl:text-[120px] font-serif text-[#355872] leading-[0.85] tracking-tighter">
                                Pure <br />
                                <span className="italic font-light text-[#7AAACE]">Flavor.</span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg lg:text-xl text-[#355872]/70 font-light leading-relaxed max-w-md">
                                Beyond recipes, we curate <span className="text-[#355872] font-semibold italic underline decoration-[#9CD5FF] decoration-4 underline-offset-4">culinary moments</span>. Simple ingredients, extraordinary results.
                            </p>

                            {/* --- BUTTONS --- */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                                {/* Primary Button */}
                                <button className="w-full sm:w-auto group relative h-16 px-10 overflow-hidden rounded-2xl bg-[#355872] text-white transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(53,88,114,0.4)]">
                                    <div className="absolute inset-0 w-0 bg-[#7AAACE] transition-all duration-300 ease-out group-hover:w-full" />
                                    <span className="relative flex items-center justify-center gap-3 font-bold tracking-widest uppercase text-sm">
                                        Explore Now
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>

                                {/* Secondary Button */}
                                <button className="group flex items-center gap-4 text-[#355872] font-black uppercase text-[11px] tracking-[0.25em] h-16 transition-all">
                                    <div className="w-12 h-12 rounded-full border border-[#7AAACE]/30 flex items-center justify-center group-hover:bg-[#7AAACE] group-hover:text-white transition-all">
                                        <Play size={16} className="fill-current ml-1" />
                                    </div>
                                    <span className="border-b-2 border-transparent group-hover:border-[#355872]">Watch Story</span>
                                </button>
                            </div>

                            {/* --- STATS SECTION --- */}
                            {/* --- STATS SECTION --- */}
                            {/* Added 'hidden lg:block' to hide on mobile and show on laptop/desktop */}
                            <div className="hidden lg:block pt-10 mt-10 border-t border-[#7AAACE]/10">
                                <div className="flex items-center gap-16">
                                    {/* Stat 1 */}
                                    <div className="relative pl-6">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-[#9CD5FF] rounded-full" />
                                        <p className="text-4xl lg:text-5xl font-serif text-[#355872] leading-none">12k+</p>
                                        <p className="text-[10px] text-[#7AAACE] uppercase font-black tracking-widest mt-2">Curated Dishes</p>
                                    </div>

                                    {/* Stat 2 */}
                                    <div className="relative pl-6">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-[#7AAACE] rounded-full" />
                                        <p className="text-4xl lg:text-5xl font-serif text-[#355872] leading-none">85</p>
                                        <p className="text-[10px] text-[#7AAACE] uppercase font-black tracking-widest mt-2">Master Chefs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;