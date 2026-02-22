import React from 'react';
import { Utensils, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation()
  return (
    /* absolute: Allows Hero to use the top space 
       py-4: Slightly reduced padding to save vertical space
    */
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">

        {/* Logo Section */}
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer">
          <div className="bg-orange-500 p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Utensils className="text-white" size={18} />
          </div>
          <span className="text-slate-900">
            FLAVOR.
          </span>
        </div>

        {/* Navigation Links - Tightened gap and font size */}
        <div className="hidden md:flex gap-8">
          {['Recipes', 'About Us'].map((link) => (
            <a
              key={link}
              href={link === 'About Us' ? '/aboutus' : link === 'Recipes' ? '/Recipes' : '#'}
              className="text-[11px] font-extrabold text-slate-500 hover:text-orange-500 uppercase tracking-[0.2em] transition-all relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Action Icons - Scaled down for minimalist feel */}
        <div className="flex items-center gap-5">
          { location.pathname != '/' &&
            <button className="text-slate-400 hover:text-orange-500 transition-colors p-2 rounded-full">
              <Search size={18} />
            </button>
          }
          <div className="h-5 w-[1px] bg-slate-200/50 hidden sm:block"></div>

          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-[11px] font-bold hover:bg-orange-500 transition-all active:scale-95 shadow-sm">
            <User size={14} />
            <span className="hidden sm:inline">SIGN IN</span>
          </button>
        </div>

      </nav>
    </header>
  );
};

export default Header;