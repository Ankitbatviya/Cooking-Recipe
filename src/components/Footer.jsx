import React from 'react';
import { Utensils, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
            <Utensils className="text-orange-500" />
            <span>FLAVOR.</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Making professional cooking accessible to everyone, one recipe at a time.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-500">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Browse Recipes</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Cooking Tips</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Our Chefs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-slate-500">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-50 text-center text-slate-400 text-sm">
        <p>© 2026 Flavor Recipe App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;