import React from "react";
import { Flame, Grid, ArrowRight } from "lucide-react";
import RecipeCard from "../RecipeCard";
import RecipeCardSkeleton from "../RecipeCardSkeleton";


function PopularSection({ recipes, categories, activeCategory, setActiveCategory, loading }) {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Flame size={18} className="animate-pulse fill-orange-600" />
              <span className="uppercase tracking-[0.4em] text-[10px] font-black">Ankit's Selection</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none text-left">
              Popular <br />
              <span className="text-orange-600 not-italic">This Week</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-900'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid - Calling the new card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show 3 skeletons if loading
            Array(3).fill(0).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          )}  
        </div>
      </div>
    </section>
  );
}

export default PopularSection;