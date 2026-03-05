import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Utensils, User, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ import Link

// --- Styled Component for the Animated Hamburger ---
const HamburgerWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: 2.5em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: #355872;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;

const Header = () => {
  const navigate = useNavigate(); // ✅ fixed typo: was "navgation"
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Recipes', path: '/recipes' },
    { name: 'About Us', path: '/about' }, // ✅ fixed: was '/aboutus'
    { name: 'Culinary Art', path: '/art' },
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

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-[160]"> {/* ✅ Link */}
            <div className="bg-[#355872] p-2 rounded-xl shadow-lg shadow-[#355872]/20">
              <Utensils className="text-[#9CD5FF]" size={20} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-[#355872]">
              FLAVOR<span className="text-[#7AAACE]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link                                      // ✅ was <a href>
                key={link.name}
                to={link.path}
                className="text-[11px] font-black text-[#355872]/60 hover:text-[#355872] uppercase tracking-[0.25em] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#7AAACE] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-4 relative z-[160]">
            {!isMobileMenuOpen && (
              <button
                onClick={() => navigate('/auth')}        // ✅ navigate works here
                className="hidden sm:flex items-center gap-2 bg-[#355872] text-white px-5 py-2.5 rounded-2xl text-[10px] font-bold tracking-widest active:scale-95 transition-transform"
              >
                <User size={14} className="text-[#9CD5FF]" />
                SIGN IN
              </button>
            )}

            {/* Animated Hamburger */}
            <HamburgerWrapper className="md:hidden">
              <label className="hamburger">
                <input
                  type="checkbox"
                  checked={isMobileMenuOpen}
                  onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
                <svg viewBox="0 0 32 32">
                  <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                  <path className="line" d="M7 16 27 16" />
                </svg>
              </label>
            </HamburgerWrapper>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 bg-[#F7F8F0] z-[140] transition-all duration-500 flex flex-col items-center justify-center ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-12 mb-12">
          {navLinks.map((link, i) => (
            <Link                                        // ✅ was <a href>
              key={link.name}
              to={link.path}
              className={`text-5xl font-serif italic text-[#355872] transition-all duration-700 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className={`flex flex-col items-center gap-8 transition-all duration-700 delay-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-12 h-[2px] bg-[#7AAACE]/30" />
          <button
            onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }} // ✅ also closes menu
            className="bg-[#355872] text-white px-10 py-5 rounded-2xl text-xs font-bold tracking-[0.2em] shadow-xl shadow-[#355872]/20 flex items-center gap-3"
          >
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