import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw, Search, Frown, Globe, Layers, Filter } from "lucide-react";
import RecipeCard from "../components/RecipeCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllRecipes = () => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filterType, setFilterType] = useState("category"); // "category" or "area"
  const [selectedFilter, setSelectedFilter] = useState("Random");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Initial Load: Fetch List of Categories and Areas
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [catRes, areaRes] = await Promise.all([
          axios.get(`${BASE_URL}list.php?c=list`),
          axios.get(`${BASE_URL}list.php?a=list`)
        ]);
        setCategories(catRes.data.meals || []);
        setAreas(areaRes.data.meals || []);
        fetchRandom();
      } catch (err) {
        console.error("Filter load error:", err);
      }
    };
    loadFilters();
  }, []);

  // 2. Fetch Random Blueprints
  const fetchRandom = async () => {
    setLoading(true);
    setSelectedFilter("Random");
    setSearchQuery("");
    try {
      const requests = Array.from({ length: 19 }, () => axios.get(`${BASE_URL}random.php`));
      const responses = await Promise.all(requests);
      setMeals(responses.map((r) => r.data.meals[0]));
    } catch (err) {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Unified Fetching Logic (Supports both Category and Area)
  const handleFilterClick = async (value, type) => {
    setLoading(true);
    setSelectedFilter(value);
    setFilterType(type);
    setSearchQuery("");
    
    const param = type === "category" ? "c" : "a";
    try {
      const res = await axios.get(`${BASE_URL}filter.php?${param}=${encodeURIComponent(value)}`);
      if (!res.data.meals) { setMeals([]); return; }
      
      // Fetch full details for the first 12 results to show rating/time
      const detailRequests = res.data.meals.map((meal) =>
        axios.get(`${BASE_URL}lookup.php?i=${meal.idMeal}`)
      );
      const detailResponses = await Promise.all(detailRequests);
      setMeals(detailResponses.map((r) => r.data.meals[0]));
    } catch (err) {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 2) {
      setLoading(true);
      setSelectedFilter("Search");
      try {
        const res = await axios.get(`${BASE_URL}search.php?s=${value}`);
        setMeals(res.data.meals || []);
      } catch (err) {
        setMeals([]);
      } finally {
        setLoading(false);
      }
    }
    if (value.trim().length === 0) fetchRandom();
  };

  return (
    <div className="min-h-screen bg-[#F7F8F0]">
      {/* --- HERO HEADER --- */}
      <header className="bg-[#355872] pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9CD5FF]/5 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-10 bg-[#9CD5FF]" />
                <span className="text-[#9CD5FF] text-[10px] font-black uppercase tracking-[0.4em]">Master Library</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none">
                Epicurean <br /> <span className="italic font-light opacity-50">Archive.</span>
              </h1>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 group">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#9CD5FF] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Find a blueprint..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-[#9CD5FF]/40 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* --- DUAL FILTER TABS --- */}
          <div className="flex flex-col gap-6">
            {/* Filter Toggle Switch */}
            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl w-fit self-center lg:self-start">
              <button 
                onClick={() => setFilterType("category")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'category' ? 'bg-white text-[#355872] shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <Layers size={14} /> Categories
              </button>
              <button 
                onClick={() => setFilterType("area")}
                className={ `flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'area' ? 'bg-white text-[#355872] shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <Globe size={14} /> Cuisines
              </button>
            </div>

            {/* Scrollable Filter List */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
              <button
                onClick={fetchRandom}
                className={`snap-start flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedFilter === "Random" ? "bg-[#9CD5FF] text-[#355872] shadow-xl" : "bg-white/5 text-white/40 hover:text-white border-white/5"}`}
              >
                <RefreshCw size={14} className={loading && selectedFilter === "Random" ? "animate-spin" : ""} /> Surprise
              </button>
              
              <div className="w-[1px] h-8 bg-white/10 mx-2 flex-shrink-0" />

              {/* Dynamic Filter Rendering */}
              {(filterType === "category" ? categories : areas).map((item) => {
                const val = filterType === "category" ? item.strCategory : item.strArea;
                return (
                  <button
                    key={val}
                    onClick={() => handleFilterClick(val, filterType)}
                    className={`snap-start flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedFilter === val ? "bg-white text-[#355872] border-white shadow-xl" : "bg-transparent text-white/30 border-white/10 hover:border-white/30 hover:text-white"}`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-center justify-between mb-12 border-b border-[#355872]/10 pb-6">
          <div className="flex items-center gap-4">
             <h2 className="text-3xl font-serif italic text-[#355872] capitalize flex items-center gap-3">
               <Filter size={20} className="text-[#7AAACE]" />
               {selectedFilter === "Search" ? searchQuery : selectedFilter}
             </h2>
             <span className="text-[10px] font-black text-[#7AAACE] uppercase tracking-widest mt-2">
               {meals.length} Blueprint{meals.length !== 1 ? 's' : ''}
             </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full bg-white rounded-[2.5rem] overflow-hidden border border-[#7AAACE]/10 animate-pulse">
                <div className="h-40 md:h-64 bg-stone-200" />
                <div className="p-5 space-y-3">
                  <div className="h-2 w-1/3 bg-stone-200 rounded" />
                  <div className="h-4 w-full bg-stone-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} recipe={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Frown size={48} className="text-[#7AAACE] mb-6" />
            <h3 className="text-2xl font-serif text-[#355872]">No blueprints found</h3>
            <p className="text-sm text-[#355872]/50 mt-2">Try a different filter or search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllRecipes;