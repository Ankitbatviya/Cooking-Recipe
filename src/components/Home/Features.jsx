import { ArrowRight, Star } from 'lucide-react'
import React from 'react'

function Features() {
    return (
        <section className="max-w-7xl mx-auto px-8 py-32 relative">
            <div className="grid lg:grid-cols-12 gap-16 items-center">

                {/* Left Side: Visual Image Stack */}
                <div className="lg:col-span-5 relative">
                    <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600"
                            alt="Chef at work"
                            className="w-full h-[500px] object-cover"
                        />
                    </div>
                    {/* Decorative Floating Card */}
                    <div className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-3xl shadow-2xl max-w-[240px] border border-slate-50 -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-orange-500 text-orange-500" />)}
                        </div>
                        <p className="text-sm font-medium text-slate-600">"The step-by-step guides changed my kitchen game forever."</p>
                        <p className="text-xs font-bold text-slate-400 mt-4 uppercase">— Chef Thomas</p>
                    </div>
                    {/* Background shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
                </div>

                {/* Right Side: Elegant List Content */}
                <div className="lg:col-span-7 space-y-16">
                    <div>
                        <h2 className="text-5xl font-bold tracking-tight mb-6">More than just <br /> <span className="text-orange-500 italic font-serif">a recipe book.</span></h2>
                        <p className="text-slate-500 text-lg max-w-xl">We’ve reimagined the digital cooking experience to be as smooth as a hollandaise sauce.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
                        {/* Feature 1 */}
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 text-6xl font-serif italic text-orange-200 leading-none select-none">01</span>
                            <h4 className="text-xl font-bold mb-3">Kitchen Tested</h4>
                            <p className="text-slate-500 leading-relaxed">Not just recipes—proven blueprints. We test every variable so you don't have to.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 text-6xl font-serif italic text-orange-200 leading-none select-none">02</span>
                            <h4 className="text-xl font-bold mb-3">Adaptive Macros</h4>
                            <p className="text-slate-500 leading-relaxed">Dynamic nutritional data that scales with your portions automatically.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 text-6xl font-serif italic text-orange-200 leading-none select-none">03</span>
                            <h4 className="text-xl font-bold mb-3">No-Fluff Guides</h4>
                            <p className="text-slate-500 leading-relaxed">Skip the 2,000-word life story. Get straight to the ingredients and steps.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 text-6xl font-serif italic text-orange-200 leading-none select-none">04</span>
                            <h4 className="text-xl font-bold mb-3">Global Flavors</h4>
                            <p className="text-slate-500 leading-relaxed">Authentic techniques sourced from professional chefs across 40+ countries.</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-4 text-slate-900 font-bold group">
                        <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all">
                            <ArrowRight size={20} />
                        </span>
                        <span className="border-b-2 border-transparent group-hover:border-orange-500 transition-all uppercase tracking-widest text-sm">Meet Our Chefs</span>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Features
