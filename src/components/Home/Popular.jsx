import React from "react";
import { Flame } from "lucide-react";
import RecipeCard from "../RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton";

function PopularSection({ recipes, categories, activeCategory, setActiveCategory, loading }) {
  return (
    <section className="bg-[#F7F8F0] py-16 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-20 gap-6">
          <div className="space-y-2 lg:space-y-4">
            <div className="flex items-center gap-2 text-[#7AAACE]">
              <Flame size={16} className="animate-pulse fill-[#7AAACE]" />
              <span className="uppercase tracking-[0.3em] text-[9px] lg:text-[10px] font-black">
                Curated Selection
              </span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-serif text-[#355872] tracking-tight leading-none">
              Popular <br className="hidden lg:block" />
              <span className="italic font-light text-[#7AAACE]"> This Week</span>
            </h2>
          </div>

          {/* Category Filter - Hidden scrollbar for cleaner look */}
          <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex lg:flex-wrap gap-2 min-w-max bg-white p-1.5 rounded-2xl border border-[#7AAACE]/10 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-[#355872] text-white shadow-md'
                      : 'text-[#355872]/50 hover:text-[#355872]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- GRID FIX: 2 columns on mobile, 3 columns on laptop --- */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-10">
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          )}  
        </div>
        
        {/* Mobile-only hint */}
        <div className="mt-10 text-center lg:hidden opacity-50">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#7AAACE] font-bold">
              Tap to view more delicacies
            </p>
        </div>
      </div>
    </section>
  );
}

export default PopularSection;