import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat, PlayCircle, Star, Heart } from "lucide-react";
import startVideo from "../Services/StartVideo";

function RecipeCard({ recipe }) {
  return (
    /* MOBILE FIX: 
       - Changed from vertical aspect to 'h-auto' with a fixed image height.
       - This allows multiple cards to stack and be visible simultaneously.
    */
    <div className="group relative w-full bg-white rounded-[2rem] overflow-hidden border border-[#7AAACE]/10 transition-all duration-300 hover:shadow-xl">
      
      <div className="flex flex-col">
        {/* 1. Image Section - Fixed height on mobile to save space */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#355872] text-[#9CD5FF] px-2 py-1 rounded-lg font-bold text-[8px] uppercase tracking-widest shadow-md">
              {recipe.strCategory || "Gourmet"}
            </span>
          </div>

          <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#355872] shadow-sm">
            <Heart size={14} />
          </button>
        </div>

        {/* 2. Content Body - Tightened for multiple-card visibility */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#7AAACE]">
                <Star size={10} className="fill-current" />
                <span className="text-[10px] font-black">4.9</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
                <Clock size={10} />
                <span>25m</span>
              </div>
            </div>
          </div>

          <h4 className="text-[#355872] text-lg font-serif italic leading-tight mb-4 line-clamp-1">
            {recipe.strMeal}
          </h4>

          {/* 3. Action Row - Slimmer buttons */}
          <div className="flex items-center gap-2">
            <Link 
              to={`/recipe/${recipe.idMeal}`}
              className="flex-1 bg-[#F7F8F0] text-[#355872] py-3 rounded-xl font-bold text-[9px] uppercase tracking-widest text-center transition-all hover:bg-[#355872] hover:text-white flex items-center justify-center gap-2"
            >
              <ChefHat size={12} />
              View
            </Link>
            
            <button 
              className="h-10 w-10 flex items-center justify-center bg-[#9CD5FF]/20 text-[#355872] rounded-xl hover:bg-[#355872] hover:text-[#9CD5FF] transition-all"
              onClick={() => startVideo(recipe.idMeal)}
            >
              <PlayCircle size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;