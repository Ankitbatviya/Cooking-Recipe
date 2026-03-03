import React from 'react';
import { Utensils, Instagram, Twitter, Facebook, ArrowUpRight, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { title: 'Platform', links: ['Recipes', 'Popular', 'Categories', 'Collections'] },
    { title: 'Company', links: ['Our Story', 'Master Chefs', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'] }
  ];

  return (
    <footer className="bg-[#355872] text-[#F7F8F0] pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Brand Watermark */}
      <div className="absolute top-0 right-0 text-[20vw] font-serif italic text-white/5 pointer-events-none select-none translate-y-[-20%] translate-x-[10%]">
        Flavor.
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* --- BRAND COLUMN --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#9CD5FF] p-2 rounded-xl">
                <Utensils className="text-[#355872]" size={20} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                FLAVOR<span className="text-[#9CD5FF]">.</span>
              </span>
            </div>
            
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm">
              We curate culinary blueprints for the modern kitchen. Beyond recipes, we build the bridge between passion and plate.
            </p>

            <div className="flex items-center gap-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#9CD5FF] hover:text-[#355872] transition-all duration-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9CD5FF]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                        {link}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- NEWSLETTER STRIP --- */}
        <div className="border-t border-white/5 pt-12 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-serif italic mb-2">Join our monthly feast.</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">No fluff, just masterclass techniques.</p>
            </div>
            <div className="w-full lg:w-auto flex bg-white/5 p-1.5 rounded-2xl border border-white/10 focus-within:border-[#9CD5FF] transition-all">
              <input 
                type="email" 
                placeholder="email@flavor.com" 
                className="bg-transparent px-6 py-3 text-sm focus:outline-none w-full lg:w-64"
              />
              <button className="bg-[#9CD5FF] text-[#355872] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-medium">
            © 2026 Flavor. Curated by Ankit Batviya
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#9CD5FF] hover:text-white transition-colors"
          >
            Back to Top <div className="w-1.5 h-1.5 rounded-full bg-[#9CD5FF]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;