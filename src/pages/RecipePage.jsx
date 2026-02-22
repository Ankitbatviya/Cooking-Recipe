import React, { useEffect, useState } from 'react';
import {
    Clock,
    ChefHat,
    Check,
    Heart,
    ArrowLeft,
    Youtube,
    MapPin,
    Utensils,
    ExternalLink,
    Printer,
    SearchX
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BlobProvider } from "@react-pdf/renderer";
import RecipePdf from "../Services/RecipePdf";
import Loader from '../components/Loader ';

const RecipePageProfessional = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [instructionsList, setInstructionsList] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            navigate('/', { replace: true });
            return;
        }

        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}lookup.php?i=${id}`
                );

                if (!res.data.meals) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const meal = res.data.meals[0];
                setRecipe(meal);

                // Process Ingredients
                const processedIngredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ing = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ing && ing.trim()) {
                        processedIngredients.push({
                            item: ing,
                            measure: measure ? measure.trim() : ""
                        });
                    }
                }
                setIngredientsList(processedIngredients);

                // Process Instructions
                const rawSteps = meal.strInstructions
                    .split(/\r?\n/)
                    .filter(step => step.trim().length > 5);

                setInstructionsList(
                    rawSteps.map((step, index) => ({
                        title: `Phase ${index + 1}`,
                        text: step.replace(/^step\s\d+/i, '').trim()
                    }))
                );
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recipe:", err);
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    // --- RENDER: LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader/>
            </div>
        );
    }

    // --- RENDER: NOT FOUND STATE ---
    if (notFound) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
                <div className="mb-6 p-6 bg-white rounded-full shadow-sm border border-stone-100">
                    <ChefHat size={64} className="text-orange-500" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">Recipe Not Found</h1>
                <p className="text-stone-500 mb-8 max-w-md leading-relaxed">
                    We couldn't find the recipe you're looking for. It may have been moved, 
                    deleted, or the link might be incorrect.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                    <ArrowLeft size={16} />
                    Back to Collection
                </button>
            </div>
        );
    }

    // --- RENDER: MAIN UI ---
    return (
        <div className="min-h-screen bg-white">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    aside { position: relative !important; height: auto !important; width: 100% !important; }
                    main { width: 100% !important; padding: 20px !important; }
                }
            `}} />

            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* --- IMAGE SIDEBAR --- */}
                <aside className="relative w-full lg:w-[40%] xl:w-[45%] h-[45vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-stone-900">
                    <div className="absolute top-4 left-4 z-30 no-print">
                        <button
                            onClick={() => window.history.back()}
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-stone-900 shadow-lg hover:scale-105 transition-transform"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    </div>

                    <div className="absolute top-4 right-4 z-30 no-print">
                        <BlobProvider document={<RecipePdf meal={recipe} />}>
                            {({ blob, loading: pdfLoading }) => (
                                <button
                                    disabled={pdfLoading}
                                    onClick={() => {
                                        if (!blob) return;
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `${recipe.strMeal}.pdf`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black/70 transition-all disabled:opacity-50"
                                >
                                    <Printer size={14} />
                                    {pdfLoading ? "Generating..." : "Save PDF"}
                                </button>
                            )}
                        </BlobProvider>
                    </div>

                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-full object-cover opacity-80"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 lg:p-12 text-white">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-[10px] font-black uppercase tracking-widest">
                                {recipe.strCategory}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <MapPin size={10} /> {recipe.strArea}
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-serif leading-tight mb-4">
                            {recipe.strMeal}
                        </h1>
                        <div className="flex items-center gap-6 no-print text-[10px] font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                            {recipe.strYoutube && (
                                <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                    <Youtube size={14} className="text-red-500" /> Video Tutorial
                                </a>
                            )}
                            <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : ""} /> {isLiked ? 'Saved' : 'Save Recipe'}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="w-full lg:w-[60%] xl:w-[55%] bg-white p-6 sm:p-10 lg:p-16 xl:p-24">

                    {/* Ingredients Section */}
                    <section className="mb-16">
                        <header className="mb-8 border-b border-stone-100 pb-4">
                            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">Mise en Place</h2>
                            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Check off as you prep</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                            {ingredientsList.map((ing, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCheckedIngredients(p => ({ ...p, [index]: !p[index] }))}
                                    className={`flex items-center justify-between py-3 border-b border-stone-50 cursor-pointer transition-all duration-300 ${checkedIngredients[index] ? 'opacity-30 translate-x-1' : 'opacity-100'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${checkedIngredients[index] ? 'bg-stone-300' : 'bg-orange-500'}`} />
                                        <span className={`text-sm tracking-wide text-stone-700 ${checkedIngredients[index] ? 'line-through' : ''}`}>
                                            {ing.item}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black text-stone-400 uppercase bg-stone-50 px-2 py-1 rounded">
                                        {ing.measure}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Preparation Section */}
                    <section>
                        <header className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">Preparation</h2>
                            <div className="text-[10px] font-black text-orange-500 tracking-widest uppercase bg-orange-50 px-3 py-1 rounded-full">
                                {Object.values(completedSteps).filter(Boolean).length} / {instructionsList.length} Steps Complete
                            </div>
                        </header>

                        <div className="space-y-10">
                            {instructionsList.map((step, index) => {
                                const isDone = completedSteps[index];
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setCompletedSteps(p => ({ ...p, [index]: !p[index] }))}
                                        className="flex gap-4 sm:gap-8 group cursor-pointer"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300 ${isDone ? 'bg-green-500 border-green-500 text-white' : 'border-stone-200 text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900'
                                                }`}>
                                                {isDone ? <Check size={14} /> : index + 1}
                                            </div>
                                            <div className="w-px h-full bg-stone-100 mt-4 group-last:hidden" />
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <p className={`text-base sm:text-lg leading-relaxed transition-all duration-500 ${isDone ? 'text-stone-300 italic line-through' : 'text-stone-600'}`}>
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Footer Meta */}
                    <footer className="mt-20 pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-40">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                            {recipe.strSource && (
                                <a href={recipe.strSource} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-stone-900 transition-colors">
                                    <ExternalLink size={10} /> Source Material
                                </a>
                            )}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Digital Kitchen Library &copy; 2026</p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default RecipePageProfessional;