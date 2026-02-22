import React, { useRef } from 'react';
import { ChefHat, Search, RefreshCw, Layers } from 'lucide-react';

const RecipeHeader = ({ categories, selectedCategory, fetchByCategory, fetchRandomTen, loading }) => {
    const scrollRef = useRef(null);

    return (
        <header className="relative bg-[#0a0a0a] pt-32 pb-24 px-6 overflow-hidden border-b border-white/[0.03]">
            {/* --- COMPLEX BACKGROUND DEPTH --- */}
            {/* Soft Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            {/* Subtle Texture/Watermark */}
            <div className="absolute top-12 right-12 text-white/[0.02] -rotate-12 pointer-events-none hidden lg:block">
                <ChefHat size={480} strokeWidth={0.5} />
            </div>

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
                    
                    {/* --- LEFT: EDITORIAL BRANDING --- */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-orange-600"></span>
                            <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.6em]">
                                Digital Kitchen Library
                            </span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter">
                            Master the <br />
                            <span className="text-stone-600 italic font-light">Craft</span>
                        </h1>
                        
                        <p className="text-stone-400 text-lg max-w-sm font-light leading-relaxed">
                            A professional-grade archive of global culinary techniques and verified recipes.
                        </p>
                    </div>

                    {/* --- RIGHT: INTERACTIVE UTILITIES --- */}
                    <div className="flex flex-col items-start lg:items-end gap-10">
                        <div className="flex gap-12 border-b border-white/5 pb-6 w-full lg:w-auto">
                            <div>
                                <div className="text-2xl font-serif text-white">{categories?.length || 0}</div>
                                <div className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Global Cuisines</div>
                            </div>
                            <div className="text-left border-l border-white/10 pl-12">
                                <div className="text-2xl font-serif text-white">100%</div>
                                <div className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Chef Verified</div>
                            </div>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="w-full max-w-md relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search the archive..." 
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all placeholder:text-stone-600"
                            />
                        </div>
                    </div>
                </div>

                {/* --- CATEGORY NAVIGATION (NO SCROLLBAR) --- */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-stone-600 uppercase tracking-[0.4em] flex-shrink-0">
                            Filter By Category
                        </span>
                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>

                    <div className="relative group">
                        {/* Right Fade Mask - Shows user there is more to scroll */}
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                        
                        {/* The Magnetic Scroll Container */}
                        <div 
                            className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <style>{`
                                .no-scrollbar::-webkit-scrollbar { display: none; }
                            `}</style>

                            {/* SURPRISE ME */}
                            <button
                                onClick={fetchRandomTen}
                                className={`snap-start flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                    selectedCategory === 'Random' 
                                    ? "bg-orange-600 border-orange-500 text-white shadow-[0_10px_40px_rgba(234,88,12,0.2)] scale-105" 
                                    : "bg-stone-900/40 border-white/5 text-stone-500 hover:border-orange-500/40 hover:text-orange-500"
                                }`}
                            >
                                <RefreshCw size={14} className={loading && selectedCategory === 'Random' ? "animate-spin" : ""} />
                                Surprise Me
                            </button>

                            {/* DYNAMIC LIST */}
                            {categories.map((cat) => (
                                <button
                                    key={cat.strCategory}
                                    onClick={() => fetchByCategory(cat.strCategory)}
                                    className={`snap-start flex-shrink-0 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                                        selectedCategory === cat.strCategory 
                                        ? "bg-white border-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.1)] scale-105" 
                                        : "bg-stone-900/20 border-white/5 text-stone-500 hover:bg-stone-900/80 hover:border-white/20 hover:text-white"
                                    }`}
                                >
                                    {cat.strCategory}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default RecipeHeader;