import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    ChefHat, Check, Heart, ArrowLeft, Youtube,
    MapPin, Utensils, ExternalLink, Printer, Share2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BlobProvider } from "@react-pdf/renderer";
import RecipePdf from "../Services/RecipePdf";

// --- LOADER COMPONENT ---
const Loader = () => (
    <LoaderWrapper>
        <div className="loadingspinner">
            <div id="square1" /><div id="square2" /><div id="square3" />
            <div id="square4" /><div id="square5" />
        </div>
        <p className="loading-text">Accessing Culinary Archives</p>
    </LoaderWrapper>
);

const RecipePageProfessional = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [recipe, setRecipe] = useState(null);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [instructionsList, setInstructionsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [shareStatus, setShareStatus] = useState("Share");

    // --- FUNCTIONAL SHARE LOGIC ---
    const handleShare = async () => {
        const shareData = {
            title: `Flavor: ${recipe.strMeal}`,
            text: `Take a look at this recipe for ${recipe.strMeal}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setShareStatus("Link Copied!");
                setTimeout(() => setShareStatus("Share"), 2000);
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    useEffect(() => {
        if (!id) { navigate('/', { replace: true }); return; }

        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}lookup.php?i=${id}`);
                
                if (!res.data.meals) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const meal = res.data.meals[0];
                setRecipe(meal);

                // Process Ingredients with High-Res Images
                const processedIngs = [];
                for (let i = 1; i <= 20; i++) {
                    const name = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (name && name.trim()) {
                        processedIngs.push({
                            item: name.trim(),
                            measure: measure ? measure.trim() : "",
                            image: `https://www.themealdb.com/images/ingredients/${name.trim()}.png`
                        });
                    }
                }
                setIngredientsList(processedIngs);

                // Process Instructions into Phases
                const steps = meal.strInstructions
                    .split(/\r?\n/)
                    .filter(step => step.trim().length > 10)
                    .map((text, index) => ({
                        id: index,
                        text: text.replace(/^\d+\.\s?/, '').trim()
                    }));
                setInstructionsList(steps);

                setLoading(false);
            } catch (err) {
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]"><Loader /></div>;

    if (notFound) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
            <ChefHat size={80} className="text-stone-200 mb-6" />
            <h1 className="text-3xl font-serif text-stone-900 mb-2">Entry Not Found</h1>
            <button onClick={() => navigate('/')} className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-bold tracking-widest uppercase">
                Return to Library
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFB] text-stone-900 selection:bg-orange-100">
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                {/* --- SIDEBAR: HERO SECTION --- */}
                <aside className="relative w-full lg:w-[40%] xl:w-[45%] h-[60vh] lg:h-screen lg:sticky lg:top-0">
                    <div className="absolute inset-0 bg-stone-900 overflow-hidden">
                        <img 
                            src={recipe.strMealThumb} 
                            alt={recipe.strMeal} 
                            className="w-full h-full object-cover scale-105 opacity-80" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
                    </div>

                    <div className="absolute top-8 left-8 flex gap-3 z-50">
                        <button onClick={() => navigate(-1)} className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white hover:text-stone-900 transition-all">
                            <ArrowLeft size={20} />
                        </button>
                    </div>

                    <div className="absolute top-8 right-8 z-50">
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
                                    }}
                                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all shadow-xl"
                                >
                                    <Printer size={16} /> {pdfLoading ? "Processing..." : "Export PDF"}
                                </button>
                            )}
                        </BlobProvider>
                    </div>

                    <div className="absolute bottom-16 left-10 right-10 text-white">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {recipe.strCategory}
                            </span>
                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-stone-300">
                                <MapPin size={12} className="text-orange-400" /> {recipe.strArea}
                            </span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-serif italic mb-10 leading-[1.05] tracking-tight">
                            {recipe.strMeal}
                        </h1>
                        <div className="flex items-center gap-10 pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {recipe.strYoutube && (
                                <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-orange-400 transition-all group">
                                    <Youtube size={20} className="text-red-500 group-hover:scale-110 transition-transform" /> Masterclass
                                </a>
                            )}
                            <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-2.5 group transition-all">
                                <Heart size={20} className={`${isLiked ? "fill-orange-500 text-orange-500" : "group-hover:text-orange-400"}`} /> 
                                {isLiked ? 'In Library' : 'Save'}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT: THE METHOD --- */}
                <main className="w-full lg:w-[60%] xl:w-[55%] px-8 py-20 sm:px-16 lg:px-24 xl:px-40">
                    
                    {/* SECTION: MISE EN PLACE */}
                    <section className="mb-32">
                        <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-8">
                            <div>
                                <h2 className="text-5xl font-serif text-stone-900 italic tracking-tight">Mise en Place</h2>
                                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">Essential Components</p>
                            </div>
                            <Utensils size={32} className="text-stone-100" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {ingredientsList.map((ing, index) => (
                                <label
                                    key={index}
                                    className={`group relative flex items-center justify-between p-4 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                                        checkedIngredients[index] 
                                        ? 'bg-stone-50 border-transparent opacity-40 translate-x-2' 
                                        : 'bg-white border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-900/5'
                                    }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24 flex-shrink-0 bg-stone-50 rounded-full overflow-hidden p-2 group-hover:rotate-12 transition-transform duration-500">
                                            <img 
                                                src={ing.image} 
                                                alt={ing.item}
                                                className="w-full h-full object-contain filter drop-shadow-lg"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className={`text-lg font-serif italic text-stone-800 ${checkedIngredients[index] ? 'line-through opacity-50' : ''}`}>
                                                {ing.item}
                                            </span>
                                            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full self-start tracking-widest">
                                                {ing.measure}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pr-4">
                                        <input 
                                            type="checkbox" 
                                            className="peer hidden"
                                            checked={!!checkedIngredients[index]}
                                            onChange={() => setCheckedIngredients(p => ({ ...p, [index]: !p[index] }))}
                                        />
                                        <div className="w-7 h-7 border-2 border-stone-200 rounded-full peer-checked:bg-stone-900 peer-checked:border-stone-900 transition-all flex items-center justify-center">
                                            <Check size={16} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* SECTION: METHOD */}
                    <section>
                        <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-8">
                            <div>
                                <h2 className="text-5xl font-serif text-stone-900 italic tracking-tight">The Method</h2>
                                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">Culinary Execution</p>
                            </div>
                            <div className="text-[11px] font-black text-white tracking-[0.2em] uppercase bg-stone-900 px-6 py-2.5 rounded-full">
                                {Object.values(completedSteps).filter(Boolean).length} / {instructionsList.length} PHASES
                            </div>
                        </div>

                        <div className="space-y-10">
                            {instructionsList.map((step, index) => {
                                const isDone = completedSteps[index];
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setCompletedSteps(p => ({ ...p, [index]: !p[index] }))}
                                        className={`group relative p-10 rounded-[3rem] transition-all duration-700 cursor-pointer border-2 ${
                                            isDone 
                                            ? 'bg-stone-100 border-transparent opacity-40 scale-[0.98]' 
                                            : 'bg-white border-stone-50 hover:border-stone-200 hover:shadow-2xl hover:shadow-stone-900/5'
                                        }`}
                                    >
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-6xl font-serif italic leading-none opacity-10 ${isDone ? 'text-stone-400' : 'text-stone-900'}`}>
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                {isDone && <div className="p-2 bg-green-500 text-white rounded-full"><Check size={16} /></div>}
                                            </div>
                                            <p className={`text-xl leading-relaxed font-serif ${isDone ? 'text-stone-400 italic line-through' : 'text-stone-700'}`}>
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* FOOTER */}
                    <footer className="mt-40 pt-20 border-t border-stone-100 flex flex-col items-center gap-10">
                        <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-stone-400">
                            {recipe.strSource && (
                                <a href={recipe.strSource} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-stone-900 transition-all">
                                    <ExternalLink size={14} /> Source
                                </a>
                            )}
                            <button 
                                onClick={handleShare}
                                className={`flex items-center gap-3 transition-all ${shareStatus !== "Share" ? "text-orange-600 font-bold" : "hover:text-stone-900"}`}
                            >
                                <Share2 size={14} className={shareStatus !== "Share" ? "animate-pulse" : ""} /> {shareStatus}
                            </button>
                        </div>
                        <div className="flex items-center gap-6 opacity-10">
                            <div className="w-24 h-px bg-stone-900" />
                            <Utensils size={20} />
                            <div className="w-24 h-px bg-stone-900" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-200">FLAVOR ARCHIVE &copy; 2026</p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

// --- STYLED COMPONENTS ---
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    .loading-text {
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.6em;
        color: #78716c;
        animation: loaderFade 2s infinite ease-in-out;
    }

    .loadingspinner {
        --square: 30px;
        --offset: 38px;
        --duration: 2.4s;
        --timing-function: cubic-bezier(0.76, 0, 0.24, 1);
        width: calc(3 * var(--offset) + var(--square));
        height: calc(2 * var(--offset) + var(--square));
        position: relative;
    }

    .loadingspinner div {
        background: #f97316;
        border-radius: 8px;
        width: var(--square);
        height: var(--square);
        position: absolute;
        box-shadow: 0 10px 20px -5px rgba(249, 115, 22, 0.3);
    }

    #square1 { left:0; top:0; animation: square1 var(--duration) infinite var(--timing-function); }
    #square2 { left:0; top:var(--offset); animation: square2 var(--duration) infinite var(--timing-function); }
    #square3 { left:var(--offset); top:var(--offset); animation: square3 var(--duration) infinite var(--timing-function); }
    #square4 { left:calc(2*var(--offset)); top:var(--offset); animation: square4 var(--duration) infinite var(--timing-function); }
    #square5 { left:calc(3*var(--offset)); top:var(--offset); animation: square5 var(--duration) infinite var(--timing-function); }

    @keyframes square1 { 0% {left:0; top:0;} 8.33% {left:0; top:var(--offset);} 100% {left:0; top:var(--offset);} }
    @keyframes square2 { 0% {left:0; top:var(--offset);} 8.33% {left:0; top:calc(2*var(--offset));} 16.67% {left:var(--offset); top:calc(2*var(--offset));} 25% {left:var(--offset); top:var(--offset);} 83.33% {left:var(--offset); top:var(--offset);} 91.67% {left:var(--offset); top:0;} 100% {left:0; top:0;} }
    @keyframes square3 { 0%,100% {left:var(--offset); top:var(--offset);} 25% {left:var(--offset); top:0;} 33.33% {left:calc(2*var(--offset)); top:0;} 41.67% {left:calc(2*var(--offset)); top:var(--offset);} 66.67% {left:calc(2*var(--offset)); top:var(--offset);} 75% {left:calc(2*var(--offset)); top:calc(2*var(--offset));} 83.33% {left:var(--offset); top:calc(2*var(--offset));} }
    @keyframes square4 { 0% {left:calc(2*var(--offset)); top:var(--offset);} 41.67% {left:calc(2*var(--offset)); top:calc(2*var(--offset));} 50% {left:calc(3*var(--offset)); top:calc(2*var(--offset));} 58.33% {left:calc(3*var(--offset)); top:var(--offset);} 100% {left:calc(3*var(--offset)); top:var(--offset);} }
    @keyframes square5 { 0% {left:calc(3*var(--offset)); top:var(--offset);} 58.33% {left:calc(3*var(--offset)); top:0;} 66.67% {left:calc(2*var(--offset)); top:0;} 75% {left:calc(2*var(--offset)); top:var(--offset);} 100% {left:calc(2*var(--offset)); top:var(--offset);} }
    @keyframes loaderFade { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
`;

export default RecipePageProfessional;