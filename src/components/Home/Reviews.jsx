import { Star } from 'lucide-react'
import React from 'react'

function Reviews() {

     const reviews = [
        { id: 1, name: "Sarah Jenkins", role: "Home Cook", comment: "The recipes are so easy to follow! I made the Honey Glazed Salmon and it was better than restaurant quality.", rating: 5 },
        { id: 2, name: "Marcus Chen", role: "Food Enthusiast", comment: "I love the category filtering. It makes finding a quick weekday dinner incredibly simple.", rating: 5 },
        { id: 3, name: "Elena Rodriguez", role: "Busy Mom", comment: "Finally, a recipe app that doesn't have 10 pages of backstory. Just straight to the good stuff!", rating: 4 }
    ];

    return (
        <section className="bg-slate-50 py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-20 gap-8">
                    <h2 className="text-5xl font-black max-w-xl text-center lg:text-left leading-tight">
                        Trusted by 50,000+ <br /> <span className="text-orange-500 underline decoration-8 underline-offset-4">Home Chefs</span>
                    </h2>
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="user" />
                        ))}
                        <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-white text-xs font-bold">+12k</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white hover:bg-white transition-all duration-500 shadow-xl shadow-slate-200/50 group">
                            <div className="flex gap-1 mb-8">
                                {[...Array(5)].map((_, starI) => (
                                    <Star key={starI} size={16} className={starI < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"} />
                                ))}
                            </div>
                            <p className="text-slate-700 text-xl leading-relaxed mb-10 font-medium italic">"{review.comment}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-orange-100 border-2 border-white overflow-hidden shadow-inner">
                                    <img src={`https://i.pravatar.cc/150?u=review${i}`} alt={review.name} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-900">{review.name}</p>
                                    <p className="text-xs text-orange-600 font-black uppercase tracking-[0.2em]">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </section>
    )
}

export default Reviews
