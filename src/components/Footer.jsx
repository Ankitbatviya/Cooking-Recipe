import React from 'react';
import { Utensils, Instagram, Twitter, Facebook, ArrowRight, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#355872] text-[#F7F8F0] pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#9CD5FF] p-3 rounded-2xl shadow-lg shadow-black/20">
                <Utensils className="text-[#355872]" size={24} />
              </div>
              <h2 className="text-4xl font-serif italic tracking-tight">Flavor.</h2>
            </div>
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-md">
              Crafting digital blueprints for the modern epicurean. Excellence in every byte.
            </p>
          </div>

          <div className="relative group">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9CD5FF] mb-6">
              Weekly Masterclass
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-[#9CD5FF] transition-colors"
              />
              <button className="group flex items-center gap-3 bg-white text-[#355872] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#9CD5FF] transition-all">
                Join Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: BOLD NAVIGATION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {[
            { label: 'Recipes', links: ['Beef', 'Chicken', 'Seafood', 'Dessert'] },
            { label: 'Studio', links: ['About', 'Chefs', 'Art', 'Careers'] },
            { label: 'Support', links: ['Contact', 'FAQ', 'Help', 'Privacy'] },
            { label: 'Social', links: ['Instagram', 'Twitter', 'Pinterest', 'Youtube'] }
          ].map((col) => (
            <div key={col.label} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{col.label}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-lg font-serif italic hover:text-[#9CD5FF] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: THE SIGNATURE --- */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">© 2026 Flavor Studio</p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40">
              <Globe size={12} /> <span>Global Edition</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              Curated by <span className="text-white">Ankit Batviya</span>
            </p>
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#355872] transition-all"
            >
              <ArrowRight size={20} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/4 translate-x-1/4">
        <Utensils size={600} />
      </div>
    </footer>
  );
};

export default Footer;