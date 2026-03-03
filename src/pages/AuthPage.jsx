import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ChefHat, Github, Chrome } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", isLogin ? "Login" : "Signup", formData);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-stone-950 px-6 py-12 overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070" 
          alt="Kitchen" 
          className="w-full h-full object-cover opacity-40 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-950" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-stone-900/75 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl">
        
        {/* Brand Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 -rotate-6 shadow-lg shadow-orange-600/20">
            <ChefHat size={32} />
          </div>
          <h2 className="text-white font-serif italic text-4xl md:text-5xl mb-3 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
            {isLogin 
              ? 'Sign in to access your saved recipes and masterclass progress.' 
              : 'Join our community of professional chefs and home cooks.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-stone-600 outline-none focus:border-orange-600 focus:bg-white/10 transition-all"
                required 
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-stone-600 outline-none focus:border-orange-600 focus:bg-white/10 transition-all"
              required 
              onChange={handleInputChange}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-stone-600 outline-none focus:border-orange-600 focus:bg-white/10 transition-all"
              required 
              onChange={handleInputChange}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 mt-4 bg-orange-600 hover:bg-white hover:text-stone-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1"
          >
            {isLogin ? 'Sign In' : 'Begin Journey'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-stone-900 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Or continue with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 bg-transparent border border-white/10 rounded-full text-white text-sm font-semibold hover:bg-white/5 hover:border-white/30 transition-all">
            <Chrome size={18} className="text-orange-500" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-transparent border border-white/10 rounded-full text-white text-sm font-semibold hover:bg-white/5 hover:border-white/30 transition-all">
            <Github size={18} /> GitHub
          </button>
        </div>

        {/* Toggle Area */}
        <p className="mt-10 text-stone-500 text-sm">
          {isLogin ? "New to the platform?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-orange-500 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;