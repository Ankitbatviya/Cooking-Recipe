import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ChefHat, Github, Chrome } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // --- SOCIAL AUTH HANDLERS ---
  const handleGoogleLogin = () => {
    // Redirect to your backend or Firebase Google Auth
    window.location.href = "http://localhost:5000/auth/google"; 
    console.log("Redirecting to Google...");
  };

  const handleGithubLogin = () => {
    // Redirect to your backend or Firebase Github Auth
    window.location.href = "http://localhost:5000/auth/github";
    console.log("Redirecting to GitHub...");
  };

  return (
    <div className="relative min-h-screen h-screen w-full flex items-center justify-center bg-[#EFECE3] overflow-hidden">
      
      {/* Decorative Elements for 100vh appeal */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#8FABD4] rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#4A70A9] rounded-full blur-[120px] opacity-20" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-black shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-10 md:p-14 border border-[#4A70A9]/20">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#4A70A9] text-[#EFECE3] rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-xl">
            <ChefHat size={32} />
          </div>
          <h2 className="text-[#EFECE3] font-serif italic text-4xl mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-[#8FABD4] text-xs uppercase font-bold tracking-[0.2em]">
            {isLogin ? 'Masterclass Access' : 'Start Your Journey'}
          </p>
        </div>

        {/* Input Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8FABD4]" size={18} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-[#EFECE3]/5 border border-[#4A70A9]/30 rounded-full py-4 pl-14 pr-6 text-[#EFECE3] placeholder-[#8FABD4]/50 outline-none focus:border-[#8FABD4] transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8FABD4]" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#EFECE3]/5 border border-[#4A70A9]/30 rounded-full py-4 pl-14 pr-6 text-[#EFECE3] placeholder-[#8FABD4]/50 outline-none focus:border-[#8FABD4] transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8FABD4]" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#EFECE3]/5 border border-[#4A70A9]/30 rounded-full py-4 pl-14 pr-6 text-[#EFECE3] placeholder-[#8FABD4]/50 outline-none focus:border-[#8FABD4] transition-all"
            />
          </div>

          <button className="w-full py-5 mt-2 bg-[#4A70A9] hover:bg-[#8FABD4] text-[#EFECE3] font-black text-[10px] uppercase tracking-[0.3em] rounded-full flex items-center justify-center gap-3 transition-all duration-500 shadow-lg active:scale-95">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 flex items-center">
          <div className="flex-grow border-t border-[#4A70A9]/20"></div>
          <span className="flex-shrink mx-4 text-[9px] font-bold text-[#8FABD4] uppercase tracking-widest">
            Identity Verification
          </span>
          <div className="flex-grow border-t border-[#4A70A9]/20"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 py-4 bg-white hover:bg-[#EFECE3] text-black rounded-full text-[11px] font-black uppercase tracking-tighter transition-all shadow-sm active:scale-95"
          >
            <Chrome size={18} className="text-[#4A70A9]" /> Google
          </button>
          <button 
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-3 py-4 bg-[#8FABD4] hover:bg-[#4A70A9] text-black hover:text-white rounded-full text-[11px] font-black uppercase tracking-tighter transition-all shadow-sm active:scale-95"
          >
            <Github size={18} /> GitHub
          </button>
        </div>

        {/* Footer Toggle */}
        <div className="mt-10 text-center">
          <p className="text-[#8FABD4] text-[11px] font-medium uppercase tracking-widest">
            {isLogin ? "No account?" : "Member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#EFECE3] font-black border-b border-[#EFECE3] hover:text-[#4A70A9] transition-colors"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;