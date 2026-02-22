import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat, PlayCircle, Star } from "lucide-react";
import startVideo from "../Services/StartVideo";

 
function RecipeCard({ recipe }) {

  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-200 transition-all duration-700 hover:shadow-2xl hover:shadow-orange-200/40">
      
      {/* 1. Background Image Layer */}
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
      />

      {/* 2. Top Badges (Visible Always) */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <span className="bg-white/90 backdrop-blur-md text-slate-950 px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-sm border border-white/20">
          {recipe.strCategory || "Main Dish"}
        </span>
      </div>

      {/* 3. Hover Overlay (Reveals Content) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8 text-left">
        
        {/* Content Slide-Up Animation */}
        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 bg-orange-600 px-2 py-0.5 rounded text-black">
              <Star size={10} className="fill-current" />
              <span className="text-[10px] font-black italic">4.9</span>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-[10px] uppercase font-bold">
              <Clock size={12} />
              <span>25 Mins</span>
            </div>
          </div>

          <h4 className="text-white text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {recipe.strMeal}
          </h4>

          <p className="text-white/50 text-xs font-light leading-relaxed mb-6 line-clamp-2">
            Discover the secret ingredients and step-by-step techniques to master this  masterpiece at home.
          </p>

          <div className="flex items-center gap-3">
            <Link 
              to={`/recipe/${recipe.idMeal}`}
              className="flex-1 bg-white text-black hover:bg-orange-600 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ChefHat size={14} />
              View Full Recipe
            </Link>
            
            <button className="h-12 w-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-orange-600 transition-colors border border-white/10 " onClick={()=> startVideo(recipe.idMeal)}>
              <PlayCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Subtle Ambient Glow on Hover */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-orange-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
    </div>
  );
}

export default RecipeCard;