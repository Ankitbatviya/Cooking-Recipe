import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
    ChefHat, Check, ArrowLeft, Youtube, Volume2, Square,
    MapPin, Utensils, Printer, Languages, ChevronDown
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BlobProvider } from "@react-pdf/renderer";
import RecipePdf from "../Services/RecipePdf";

const RecipePageProfessional = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [recipe, setRecipe] = useState(null);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [instructionsList, setInstructionsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
    const [selectedLang, setSelectedLang] = useState('en');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    const [speaking, setSpeaking] = useState(null);

    const languages = [
        { code: 'en', name: 'English', label: 'English', locale: 'en-US' },
        { code: 'hi', name: 'Hindi', label: 'हिन्दी', locale: 'hi-IN' },
        { code: 'gu', name: 'Gujarati', label: 'ગુજરાતી', locale: 'gu-IN' },
        { code: 'te', name: 'Telugu', label: 'తెలుగు', locale: 'te-IN' },
        { code: 'mr', name: 'Marathi', label: 'मराठी', locale: 'mr-IN' },
        { code: 'ta', name: 'Tamil', label: 'தமிழ்', locale: 'ta-IN' },
        { code: 'kn', name: 'Kannada', label: 'ಕನ್ನಡ', locale: 'kn-IN' }
    ];

    const speak = (text, stepId) => {
        window.speechSynthesis.cancel();
        if (speaking === stepId) { setSpeaking(null); return; }
        const utterance = new SpeechSynthesisUtterance(text);
        const langConfig = languages.find(l => l.code === selectedLang);
        utterance.lang = langConfig?.locale || 'en-US';
        utterance.onend = () => setSpeaking(null);
        setSpeaking(stepId);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setSpeaking(null);
    };

    const fetchRecipe = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/meal/${id}?lang=${selectedLang === 'en' ? '' : selectedLang}`);
            
            if (!res.data.meals || !res.data.meals[0]) {
                setNotFound(true);
                return;
            }

            const meal = res.data.meals[0];
            setRecipe(meal);

            const processedIngs = [];
            for (let i = 1; i <= 20; i++) {
                const displayName = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                
                // CRITICAL FIX: Use the English source name for images if it exists
                const imageSearchName = meal.strIngredientSource 
                    ? meal.strIngredientSource[`strIngredient${i}`] 
                    : displayName;

                if (displayName && displayName.trim()) {
                    processedIngs.push({
                        item: displayName.trim(),
                        measure: measure ? measure.trim() : "",
                        image: `https://www.themealdb.com/images/ingredients/${imageSearchName}.png` 
                    });
                }
            }
            setIngredientsList(processedIngs);

            const steps = meal.strInstructions
                .split(/\r?\n/)
                .filter(step => step.trim().length > 10)
                .map((text, index) => ({
                    id: index,
                    text: text.replace(/^\d+\.\s?/, '').trim()
                }));
            setInstructionsList(steps);

        } catch (err) {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    }, [id, selectedLang]);

    useEffect(() => {
        fetchRecipe();
        const handleGlobalClick = () => setIsDropdownOpen(false);
        window.addEventListener('click', handleGlobalClick);
        return () => {
            window.removeEventListener('click', handleGlobalClick);
            window.speechSynthesis.cancel();
        };
    }, [fetchRecipe]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]"><Loader /></div>;
    if (notFound) return <NotFoundView navigate={navigate} />;

    return (
        <div className="min-h-screen bg-[#FDFDFB] text-stone-900 selection:bg-orange-100">
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                <aside className="relative w-full lg:w-[45%] h-[60vh] lg:h-screen lg:sticky lg:top-0">
                    <div className="absolute inset-0 bg-stone-900 overflow-hidden">
                        <img src={recipe.strMealThumb} alt="" className="w-full h-full object-cover scale-105 opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
                    </div>

                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[100]">
                        <div className="flex gap-4">
                            <NavButton onClick={() => navigate(-1)}><ArrowLeft size={20} /></NavButton>
                            
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <LanguageTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <Languages size={18} className="text-orange-400" />
                                    <span>{languages.find(l => l.code === selectedLang)?.label}</span>
                                    <ChevronDown size={14} className={isDropdownOpen ? 'rotate-180' : ''} />
                                </LanguageTrigger>

                                <LanguageMenu $isOpen={isDropdownOpen}>
                                    {languages.map((lang) => (
                                        <button 
                                            key={lang.code}
                                            className={selectedLang === lang.code ? 'active' : ''}
                                            onClick={() => { setSelectedLang(lang.code); setIsDropdownOpen(false); }}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </LanguageMenu>
                            </div>
                        </div>

                        <BlobProvider document={<RecipePdf meal={recipe} />}>
                            {({ blob, loading: pdfLoading }) => (
                                <NavButton 
                                    $primary 
                                    disabled={pdfLoading}
                                    onClick={() => {
                                        if (!blob) return;
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `${recipe.strMeal}.pdf`;
                                        a.click();
                                    }}
                                >
                                    <Printer size={18} />
                                    <span className="hidden sm:inline">{pdfLoading ? 'Preparing...' : 'Export PDF'}</span>
                                </NavButton>
                            )}
                        </BlobProvider>
                    </div>

                    <div className="absolute bottom-16 left-10 right-10 text-white">
                        <span className="px-3 py-1 bg-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                            {recipe.strCategory}
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-serif italic mb-10 leading-tight">{recipe.strMeal}</h1>
                        <div className="flex items-center gap-10 pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-widest text-stone-300">
                            <span className="flex items-center gap-2"><MapPin size={14} className="text-orange-400" /> {recipe.strArea}</span>
                            {recipe.strYoutube && (
                                <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-all">
                                    <Youtube size={20} className="text-red-500" /> Masterclass
                                </a>
                            )}
                        </div>
                    </div>
                </aside>

                <main className="w-full lg:w-[55%] px-8 py-20 lg:px-24 xl:px-32">
                    <SectionTitle title="Mise en Place" subtitle="Essential Components" icon={<Utensils size={32} />} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
                        {ingredientsList.map((ing, index) => (
                            <IngredientCard 
                                key={index}
                                $checked={checkedIngredients[index]}
                                onClick={() => setCheckedIngredients(p => ({ ...p, [index]: !p[index] }))}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="img-wrapper"><img src={ing.image} alt="" /></div>
                                    <div>
                                        <p className="ing-name">{ing.item}</p>
                                        <p className="ing-measure">{ing.measure}</p>
                                    </div>
                                </div>
                                <div className="check-circle">{checkedIngredients[index] && <Check size={14} />}</div>
                            </IngredientCard>
                        ))}
                    </div>

                    <SectionTitle 
                        title="The Method" 
                        subtitle="Culinary Execution" 
                        icon={speaking !== null && <StopButton onClick={stopSpeech}><Square size={12} fill="currentColor" /> Stop Voice</StopButton>} 
                    />
                    <div className="space-y-10">
                        {instructionsList.map((step, index) => (
                            <StepItem key={index} $done={completedSteps[index]} $active={speaking === index}>
                                <div className="step-content" onClick={() => setCompletedSteps(p => ({ ...p, [index]: !p[index] }))}>
                                    <span className="step-num">{(index + 1).toString().padStart(2, '0')}</span>
                                    <p className="step-text">{step.text}</p>
                                </div>
                                <button className="speak-btn" onClick={() => speak(step.text, index)}>
                                    <Volume2 size={20} className={speaking === index ? "text-orange-500 animate-pulse" : ""} />
                                </button>
                            </StepItem>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- STYLES REMAIN SAME AS YOURS ---
const SectionTitle = ({ title, subtitle, icon }) => (
    <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-8">
        <div>
            <h2 className="text-5xl font-serif text-stone-900 italic tracking-tight">{title}</h2>
            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">{subtitle}</p>
        </div>
        <div className="text-stone-200">{icon}</div>
    </div>
);

const NotFoundView = ({ navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <ChefHat size={80} className="text-stone-200 mb-6" />
        <h1 className="text-3xl font-serif text-stone-900">Recipe Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-bold tracking-widest uppercase">Return to Library</button>
    </div>
);

const NavButton = styled.button`
    padding: 14px;
    background: ${props => props.$primary ? '#f97316' : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    color: white;
    display: flex; align-items: center; gap: 10px;
    transition: all 0.3s ease;
    font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;
    &:hover { background: white; color: #1c1917; transform: translateY(-2px); }
`;

const LanguageTrigger = styled.button`
    display: flex; align-items: center; gap: 12px;
    padding: 14px 24px; background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px; color: white;
    font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
`;

const LanguageMenu = styled.div`
    position: absolute; top: calc(100% + 12px); left: 0; width: 180px;
    background: rgba(28, 25, 23, 0.98); backdrop-filter: blur(20px);
    border-radius: 24px; padding: 8px; z-index: 1000;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: ${props => props.$isOpen ? 1 : 0};
    transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
    pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
    button {
        width: 100%; text-align: left; padding: 12px 20px; border-radius: 16px;
        color: #a8a29e; font-size: 11px; font-weight: 700; transition: 0.2s;
        &.active { background: #f97316; color: white; }
        &:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: white; }
    }
`;

const IngredientCard = styled.div`
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px; background: white; border: 1px solid #f5f5f4;
    border-radius: 100px; cursor: pointer; transition: all 0.4s ease;
    opacity: ${props => props.$checked ? 0.4 : 1};
    .img-wrapper { width: 44px; height: 44px; background: #fafaf9; border-radius: 50%; padding: 4px; img { width: 100%; height: 100%; object-fit: contain; } }
    .ing-name { font-family: serif; font-style: italic; font-size: 1.1rem; color: #1c1917; }
    .ing-measure { font-size: 9px; font-weight: 900; color: #f97316; text-transform: uppercase; }
    .check-circle { width: 24px; height: 24px; border: 2px solid #e7e5e4; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${props => props.$checked ? '#1c1917' : 'transparent'}; color: white; }
`;

const StepItem = styled.div`
    display: flex; align-items: flex-start; gap: 20px;
    padding: 30px; background: white; border: 2px solid ${props => props.$active ? '#f97316' : '#f5f5f4'};
    border-radius: 32px; transition: all 0.4s;
    opacity: ${props => props.$done ? 0.4 : 1};
    .step-content { flex: 1; cursor: pointer; display: flex; gap: 30px; }
    .step-num { font-family: serif; font-size: 3rem; font-style: italic; color: #1c1917; opacity: 0.05; line-height: 1; }
    .step-text { font-family: serif; font-size: 1.25rem; line-height: 1.7; color: #444; text-decoration: ${props => props.$done ? 'line-through' : 'none'}; }
    .speak-btn { padding: 15px; border-radius: 50%; background: #fafaf9; color: #a8a29e; transition: 0.3s; &:hover { background: #f97316; color: white; } }
`;

const StopButton = styled.button`
    display: flex; align-items: center; gap: 8px; padding: 10px 18px;
    background: #1c1917; color: white; border-radius: 100px;
    font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;
`;

const Loader = () => (
    <LoaderWrapper>
        <div className="spinner" />
        <p>Curating Your Recipe</p>
    </LoaderWrapper>
);

const LoaderWrapper = styled.div`
    display: flex; flex-direction: column; align-items: center; gap: 30px;
    .spinner { width: 40px; height: 40px; border: 4px solid #f5f5f4; border-top-color: #f97316; border-radius: 50%; animation: spin 1s linear infinite; }
    p { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 5px; color: #a8a29e; }
    @keyframes spin { to { transform: rotate(360deg); } }
`;

export default RecipePageProfessional;