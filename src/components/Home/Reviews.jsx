import { Star, Quote } from 'lucide-react'
import React from 'react'

function Reviews() {
    const reviews = [
        { id: 1, name: "Sarah Jenkins", role: "Home Cook", comment: "The recipes are so easy to follow! I made the Honey Glazed Salmon and it was better than restaurant quality.", rating: 5 },
        { id: 2, name: "Marcus Chen", role: "Food Enthusiast", comment: "I love the category filtering. It makes finding a quick weekday dinner incredibly simple.", rating: 5 },
        { id: 3, name: "Elena Rodriguez", role: "Busy Mom", comment: "Finally, a recipe app that doesn't have 10 pages of backstory. Just straight to the good stuff!", rating: 5 }
    ];

    return (
        <section className="bg-[#F7F8F0] py-20 lg:py-32 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#9CD5FF]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* Header Block: Mobile-Optimized */}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 lg:mb-24 gap-10">
                    <div className="space-y-4 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <div className="h-[1px] w-8 bg-[#7AAACE]" />
                            <span className="text-[10px] font-black text-[#7AAACE] uppercase tracking-[0.4em]">Community</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-serif text-[#355872] leading-none">
                            Trusted by <br />
                            <span className="italic font-light text-[#7AAACE]">50k+ Creators.</span>
                        </h2>
                    </div>

                    {/* Avatar Stack */}
                    <div className="flex items-center gap-4 bg-white p-3 rounded-full shadow-sm border border-[#7AAACE]/10">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="user" />
                            ))}
                        </div>
                        <div className="pr-4">
                            <p className="text-[10px] font-black text-[#355872] uppercase tracking-widest">Join them</p>
                            <p className="text-xs text-[#7AAACE] font-medium italic">New recipes daily</p>
                        </div>
                    </div>
                </div>

                {/* Grid: 1 column on mobile, 3 on laptop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-[#7AAACE]/10 hover:shadow-2xl hover:shadow-[#355872]/5 transition-all duration-500 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star key={starI} size={14} className={starI < review.rating ? "fill-[#355872] text-[#355872]" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <Quote size={24} className="text-[#9CD5FF] opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-[#355872] text-xl lg:text-2xl font-serif italic leading-snug mb-10">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* Iconic Line User Anchor */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={`https://i.pravatar.cc/150?u=review${review.id}`} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#9CD5FF]" />
                                        <p className="font-bold text-sm text-[#355872]">{review.name}</p>
                                    </div>
                                    <p className="text-[9px] text-[#7AAACE] font-black uppercase tracking-[0.2em] pl-3">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Reviews