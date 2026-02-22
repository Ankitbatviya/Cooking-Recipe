import React, { useState, useEffect } from 'react';
import { ChefHat, ArrowRight, Utensils, RefreshCw, Layers, Search, Frown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- SKELETON LOADER ---
const CardSkeleton = () => (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 animate-pulse">
        <div className="h-80 bg-stone-200" />
        <div className="p-6">
            <div className="h-2 w-12 bg-stone-200 mb-4 rounded" />
            <div className="h-4 w-full bg-stone-200 mb-2 rounded" />
            <div className="h-2 w-16 bg-stone-100 mt-6 rounded" />
        </div>
    </div>
);

const AllRecipes = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Random');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // 1. Fetch Categories and Initial Random Selection
    useEffect(() => {
        const initPage = async () => {
            try {
                const catRes = await axios.get(`${import.meta.env.VITE_BASE_URL}list.php?c=list`);
                setCategories(catRes.data.meals);
                fetchRandomTen();
            } catch (err) {
                console.error("Initialization error:", err);
            }
        };
        initPage();
    }, []);

    // 2. Fetch 10 Random Recipes
    const fetchRandomTen = async () => {
        setLoading(true);
        setSelectedCategory('Random');
        setSearchQuery(''); // Clear search when switching categories
        try {
            const requests = Array.from({ length: 10 }, () =>
                axios.get(`${import.meta.env.VITE_BASE_URL}random.php`)
            );
            const responses = await Promise.all(requests);
            setMeals(responses.map(res => res.data.meals[0]));
        } finally {
            setLoading(false);
        }
    };

    // 3. Fetch by Specific Category
    const fetchByCategory = async (catName) => {
        setLoading(true);
        setSelectedCategory(catName);
        setSearchQuery(''); 
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}filter.php?c=${catName}`);
            setMeals(res.data.meals || []);
        } finally {
            setLoading(false);
        }
    };

    // 4. NEW: Search Functionality
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim().length > 2) {
            setLoading(true);
            setSelectedCategory('Search');
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}search.php?s=${query}`);
                setMeals(res.data.meals || []); // Set to empty array if null
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        } else if (query.trim().length === 0) {
            fetchRandomTen();
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />

            {/* --- HERO HEADER --- */}
            <header className="relative bg-stone-950 pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-black text-[11px] uppercase tracking-[0.5em]">
                                    The Professional Suite
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                                Epicurean <br />
                                <span className="text-stone-500 italic font-light">Archive</span>
                            </h1>
                        </div>

                        <div className="flex flex-col items-start lg:items-end gap-8">
                            <div className="w-full max-w-md relative group">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-orange-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search recipes (e.g., Pizza)..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- CATEGORY NAVIGATION --- */}
                    <div className="mt-20">
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory">
                            <button
                                onClick={fetchRandomTen}
                                className={`snap-start flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                    selectedCategory === 'Random'
                                        ? "bg-orange-600 border-orange-500 text-white shadow-xl scale-105"
                                        : "bg-stone-900/50 border-white/5 text-stone-500 hover:border-white/20 hover:text-white"
                                }`}
                            >
                                <RefreshCw size={14} className={loading && selectedCategory === 'Random' ? "animate-spin" : ""} />
                                Surprise Me
                            </button>

                            {categories.map((cat) => (
                                <button
                                    key={cat.strCategory}
                                    onClick={() => fetchByCategory(cat.strCategory)}
                                    className={`snap-start flex-shrink-0 px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                        selectedCategory === cat.strCategory
                                            ? "bg-white border-white text-black shadow-xl scale-105"
                                            : "bg-stone-900/50 border-white/5 text-stone-500 hover:border-white/10 hover:text-white"
                                    }`}
                                >
                                    {cat.strCategory}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-end justify-between mb-12 border-b border-stone-200 pb-6">
                    <h2 className="text-3xl font-serif font-bold text-stone-900 capitalize">
                        {selectedCategory === 'Search' ? `Results for "${searchQuery}"` : selectedCategory}
                    </h2>
                </div>

                {/* --- RESULTS LOGIC --- */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
                    </div>
                ) : meals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {meals.map((meal) => (
                            <div
                                key={meal.idMeal}
                                onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-[22rem] rounded-[2.5rem] overflow-hidden mb-8 bg-stone-200 shadow-sm border border-stone-100">
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-80" />
                                </div>
                                <div className="space-y-3 px-2">
                                    <h3 className="text-2xl font-serif font-bold text-stone-800 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                                        {meal.strMeal}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* --- NOT FOUND STATE --- */
                    <div className="flex flex-col items-center justify-center py-24 text-stone-400">
                        <Frown size={64} strokeWidth={1} className="mb-4 text-stone-300" />
                        <h3 className="text-xl font-serif">No recipes found</h3>
                        <p className="text-sm">Try searching for something else, like "Chicken" or "Pasta"</p>
                        <button 
                            onClick={fetchRandomTen}
                            className="mt-6 text-orange-500 text-[10px] font-bold uppercase tracking-widest hover:underline"
                        >
                            Reset Archive
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllRecipes;