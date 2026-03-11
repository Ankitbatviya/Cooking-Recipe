import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

function Reviews() {
    const reviews = [
        { id: 1, name: "Sarah Jenkins", role: "Home Cook", comment: "The recipes are so easy to follow! I made the Honey Glazed Salmon and it was better than restaurant quality.", rating: 5 },
        { id: 2, name: "Marcus Chen", role: "Food Enthusiast", comment: "I love the category filtering. It makes finding a quick weekday dinner incredibly simple.", rating: 5 },
        { id: 3, name: "Elena Rodriguez", role: "Busy Mom", comment: "Finally, a recipe app that doesn't have 10 pages of backstory. Just straight to the good stuff!", rating: 5 }
    ];

    return (
        <section className="bg-[#F7F8F0] py-16 lg:py-32 relative overflow-hidden">
            {/* Custom CSS to hide scrollbar (Works in Tailwind) */}
            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />

            <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[#9CD5FF]/10 rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header Block: Animated */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-24 gap-8"
                >
                    <div className="space-y-3 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <div className="h-[1px] w-6 bg-[#7AAACE]" />
                            <span className="text-[9px] font-black text-[#7AAACE] uppercase tracking-[0.4em]">Community</span>
                        </div>
                        <h2 className="text-3xl lg:text-7xl font-serif text-[#355872] leading-tight">
                            Trusted by <br className="hidden lg:block" />
                            <span className="italic font-light text-[#7AAACE]">50k+ Creators.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm border border-[#7AAACE]/10">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="user" />
                            ))}
                        </div>
                        <div className="pr-3">
                            <p className="text-[8px] lg:text-[10px] font-black text-[#355872] uppercase tracking-widest">Join them</p>
                            <p className="text-[10px] lg:text-xs text-[#7AAACE] font-medium italic">New daily</p>
                        </div>
                    </div>
                </motion.div>

                {/* Horizontal Scroll with "no-scrollbar" class */}
                <div className="flex overflow-x-auto no-scrollbar pb-12 px-6 gap-5 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 lg:px-8 lg:gap-8">
                    {reviews.map((review, i) => (
                        <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="min-w-[85vw] md:min-w-full snap-center bg-white p-7 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-[#7AAACE]/10 hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6 lg:mb-8">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star key={starI} size={12} className={starI < review.rating ? "fill-[#355872] text-[#355872]" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <Quote size={20} className="text-[#9CD5FF] opacity-30 group-hover:rotate-12 transition-transform duration-500" />
                                </div>
                                <p className="text-[#355872] text-lg lg:text-2xl font-serif italic leading-relaxed mb-8">
                                    "{review.comment}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <img 
                                        src={`https://i.pravatar.cc/100?u=review${review.id}`} 
                                        alt={review.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-[#9CD5FF]" />
                                        <p className="font-bold text-xs lg:text-sm text-[#355872]">{review.name}</p>
                                    </div>
                                    <p className="text-[8px] lg:text-[9px] text-[#7AAACE] font-black uppercase tracking-widest mt-0.5">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;