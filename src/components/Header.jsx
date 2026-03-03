import React, { useState, useEffect } from 'react';
import { Utensils, User, Menu, X, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Logic: Hide on Down Scroll, Show on Up Scroll
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  // Lock Body Scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Recipes', path: '/recipes' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Culinary Art', path: '/art' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ease-in-out bg-[#F7F8F0] ${
          isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled && !isMobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-[#7AAACE]/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 relative z-[160]">
            <div className="bg-[#355872] p-2 rounded-xl shadow-lg shadow-[#355872]/20">
              <Utensils className="text-[#9CD5FF]" size={20} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-[#355872]">
              FLAVOR<span className="text-[#7AAACE]">.</span>
            </span>
          </div>

          {/* DESKTOP NAV LINKS - Re-added for Laptop Screen */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-[11px] font-black text-[#355872]/60 hover:text-[#355872] uppercase tracking-[0.25em] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#7AAACE] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-4 relative z-[160]">
            {!isMobileMenuOpen && (
              <button className="hidden sm:flex items-center gap-2 bg-[#355872] text-white px-5 py-2.5 rounded-2xl text-[10px] font-bold tracking-widest active:scale-95 transition-transform">
                <User size={14} className="text-[#9CD5FF]" />
                SIGN IN
              </button>
            )}

            <button 
              className="md:hidden p-2 text-[#355872] outline-none border-none bg-transparent active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={34} strokeWidth={1.5} /> : <Menu size={34} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#F7F8F0] z-[140] transition-all duration-500 flex flex-col items-center justify-center ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-12 mb-12">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.path}
              className={`text-5xl font-serif italic text-[#355872] transition-all duration-700 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className={`flex flex-col items-center gap-8 transition-all duration-700 delay-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-12 h-[2px] bg-[#7AAACE]/30" />
          <button className="bg-[#355872] text-white px-10 py-5 rounded-2xl text-xs font-bold tracking-[0.2em] shadow-xl shadow-[#355872]/20 flex items-center gap-3">
              <User size={18} className="text-[#9CD5FF]" />
              SIGN IN
          </button>
          
          <div className="flex gap-10">
            <Instagram size={22} className="text-[#355872] hover:text-[#7AAACE] transition-colors cursor-pointer" />
            <Twitter size={22} className="text-[#355872] hover:text-[#7AAACE] transition-colors cursor-pointer" />
            <Facebook size={22} className="text-[#355872] hover:text-[#7AAACE] transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;