import { useState, useEffect, useCallback } from "react";
import {
  Mail, Lock, User, ArrowRight, ChefHat,
  Github, Eye, EyeOff, Sparkles, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────────────────────── */
const BASE_URL       = "http://localhost:5000";
const GOOGLE_AUTH    = `${BASE_URL}/auth/google`;
const GITHUB_AUTH    = `${BASE_URL}/auth/github`;
const FRONTEND_URL   = window.location.origin;

/* ─────────────────────────────────────────────────────────────
   IN-MEMORY TOKEN STORE  (never localStorage — XSS safe)
───────────────────────────────────────────────────────────── */
let _accessToken = null;
const tokenStore = {
  get:   ()  => _accessToken,
  set:   (t) => { _accessToken = t; },
  clear: ()  => { _accessToken = null; },
};

/* ─────────────────────────────────────────────────────────────
   API HELPERS
───────────────────────────────────────────────────────────── */
async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

async function apiRegister({ name, email, password }) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (data.accessToken) tokenStore.set(data.accessToken);
  return data;
}

async function apiLogin({ email, password }) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.accessToken) tokenStore.set(data.accessToken);
  return data;
}

/* ─────────────────────────────────────────────────────────────
   VALIDATION
───────────────────────────────────────────────────────────── */
function validate(form, isLogin) {
  const errs = {};
  if (!isLogin && !form.name.trim())        errs.name     = "Name is required";
  if (!form.email.trim())                   errs.email    = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email  = "Enter a valid email";
  if (!form.password)                       errs.password = "Password is required";
  else if (!isLogin && form.password.length < 8) errs.password = "Minimum 8 characters";
  return errs;
}

/* ─────────────────────────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Toast notification
function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium transition-all duration-300 ${
        isSuccess
          ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
          : "bg-red-950/90 border-red-500/30 text-red-300"
      }`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {isSuccess
        ? <CheckCircle size={16} className="shrink-0" />
        : <AlertCircle size={16} className="shrink-0" />
      }
      {toast.message}
    </div>
  );
}

// Reusable input field
function Field({ icon: Icon, type, name, placeholder, value, onChange, error, rightSlot, autoComplete }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Icon size={15} className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#8fabd4]/50 pointer-events-none" />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`w-full bg-white/[.04] border rounded-2xl py-3.5 pl-11 pr-5 text-sm text-[#e8e4dc] placeholder-[#e8e4dc]/20 outline-none transition-all duration-200 ${
            error
              ? "border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/10"
              : "border-white/[.08] focus:border-[#4a70a9]/60 focus:bg-[#4a70a9]/[.06] focus:ring-2 focus:ring-[#4a70a9]/10"
          } ${rightSlot ? "pr-12" : ""}`}
        />
        {rightSlot}
      </div>
      {error && (
        <p className="text-[11px] text-red-400/80 pl-1 flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

// Dashboard shown after login
function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <div className="font-body text-center max-w-sm w-full bg-[#0d141f] border border-white/[.06] rounded-3xl p-10 shadow-2xl">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-[0_8px_24px_rgba(74,112,169,.45)]"
          style={{ background: "linear-gradient(135deg,#4a70a9,#8fabd4)" }}
        >
          <ChefHat size={28} color="#e8e4dc" />
        </div>
        {user?.avatar && (
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[#4a70a9]/40 object-cover" />
        )}
        <h2 className="font-display text-3xl text-[#e8e4dc] mb-1">
          Welcome, <em className="italic text-[#8fabd4]">{user?.name?.split(" ")[0]}</em>
        </h2>
        <p className="text-xs text-[#e8e4dc]/40 mb-2">{user?.email}</p>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-8 ${
          user?.subscription?.status === "active"
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
            : "bg-white/[.05] text-[#e8e4dc]/40 border border-white/[.08]"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${user?.subscription?.status === "active" ? "bg-emerald-400" : "bg-[#e8e4dc]/30"}`} />
          {user?.subscription?.plan === "free" || !user?.subscription?.plan ? "Free Plan" : `${user.subscription.plan} plan`}
        </span>
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-2xl text-[11px] font-bold tracking-[.2em] uppercase text-[#e8e4dc]/60 border border-white/[.08] hover:border-white/[.15] hover:text-[#e8e4dc] transition-all bg-transparent cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN AUTH PAGE
───────────────────────────────────────────────────────────── */
const FEATURES = [
  "500+ professional recipes",
  "Live chef masterclasses",
  "Personalized meal planning",
  "Global cuisine library",
];

export default function AuthPage() {
  const [mode,      setMode]      = useState("login");
  const [form,      setForm]      = useState({ name: "", email: "", password: "" });
  const [errors,    setErrors]    = useState({});
  const [fieldErr,  setFieldErr]  = useState({});
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [toast,     setToast]     = useState(null);
  const [user,      setUser]      = useState(null);   // logged-in user

  const isLogin = mode === "login";

  /* ── Mount animation ── */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* ── Handle OAuth callback: /auth/callback?token=xxx ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");
    const error  = params.get("error");

    if (error) {
      setToast({ type: "error", message: "OAuth sign-in failed. Please try again." });
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (token) {
      tokenStore.set(token);
      window.history.replaceState({}, "", window.location.pathname);
      // Fetch user profile
      apiFetch("/auth/me")
        .then((d) => {
          setUser(d.user);
          setToast({ type: "success", message: `Welcome, ${d.user.name}! 🎉` });
        })
        .catch(() => setToast({ type: "error", message: "Could not load profile." }));
    }
  }, []);

  const showToast = (type, message) => setToast({ type, message });
  const dismissToast = useCallback(() => setToast(null), []);

  const switchMode = (next) => {
    setMode(next);
    setForm({ name: "", email: "", password: "" });
    setFieldErr({});
    setShowPass(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear field error on change
    if (fieldErr[name]) setFieldErr((p) => ({ ...p, [name]: "" }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errs = validate(form, isLogin);
    if (Object.keys(errs).length) {
      setFieldErr(errs);
      return;
    }

    setLoading(true);
    setFieldErr({});

    try {
      let data;
      if (isLogin) {
        data = await apiLogin({ email: form.email, password: form.password });
        showToast("success", `Welcome back, ${data.user?.name}! 👋`);
      } else {
        data = await apiRegister({ name: form.name, email: form.email, password: form.password });
        showToast("success", `Account created! Welcome, ${data.user?.name}! 🎉`);
      }
      setUser(data.user);
    } catch (err) {
      // Map common server errors to specific fields
      const msg = err.message || "Something went wrong";
      if (msg.toLowerCase().includes("email")) {
        setFieldErr((p) => ({ ...p, email: msg }));
      } else if (msg.toLowerCase().includes("password")) {
        setFieldErr((p) => ({ ...p, password: msg }));
      } else {
        showToast("error", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Logout ── */
  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      tokenStore.clear();
      setUser(null);
      setForm({ name: "", email: "", password: "" });
      showToast("success", "You've been signed out.");
    }
  };

  /* ── If logged in, show dashboard ── */
  if (user) return <Dashboard user={user} onLogout={handleLogout} />;

  /* ─────────────────────────────────────────────────────────
     RENDER AUTH FORM
  ───────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        @keyframes orb {
          0%,100% { transform: translateY(0) scale(1); }
          50%     { transform: translateY(-20px) scale(1.04); }
        }
        .orb-1 { animation: orb 7s ease-in-out infinite; }
        .orb-2 { animation: orb 9s ease-in-out infinite 1.5s; }
        .orb-3 { animation: orb 11s ease-in-out infinite 3s; }
        .grid-lines {
          background-image:
            linear-gradient(rgba(74,112,169,.05) 1px, transparent 1px),
            linear-gradient(90deg,rgba(74,112,169,.05) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px #0d141f inset !important;
          -webkit-text-fill-color: #e8e4dc !important;
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-down { animation: slideDown 0.25s ease both; }
      `}</style>

      <Toast toast={toast} onDismiss={dismissToast} />

      <div className="font-body relative min-h-screen w-full flex items-center justify-center bg-[#080c14] overflow-hidden p-6">

        {/* Ambient orbs */}
        <div className="orb-1 pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#4a70a9] opacity-[.09] blur-[110px]" />
        <div className="orb-2 pointer-events-none absolute -bottom-40 -right-20 w-[360px] h-[360px] rounded-full bg-[#8fabd4] opacity-[.07] blur-[100px]" />
        <div className="orb-3 pointer-events-none absolute top-1/2 right-1/4 w-[240px] h-[240px] rounded-full bg-[#4a70a9] opacity-[.07] blur-[80px]" />

        {/* Card */}
        <div className={`relative z-10 w-full max-w-[880px] rounded-3xl overflow-hidden border border-white/[.06] shadow-[0_40px_80px_rgba(0,0,0,.65)] grid grid-cols-1 md:grid-cols-2 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>

          {/* ── LEFT PANEL ── */}
          <div
            className="hidden md:flex flex-col justify-between relative overflow-hidden border-r border-white/[.06] p-14"
            style={{ background: "linear-gradient(145deg,#0f1b2e 0%,#0a1220 60%,#071018 100%)" }}
          >
            <div className="grid-lines absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 30% 20%,rgba(74,112,169,.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(143,171,212,.09) 0%,transparent 50%)" }} />

            {/* Brand */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center -rotate-6 shadow-[0_8px_24px_rgba(74,112,169,.45)]"
                style={{ background: "linear-gradient(135deg,#4a70a9,#8fabd4)" }}>
                <ChefHat size={20} color="#e8e4dc" />
              </div>
              <span className="font-display text-[22px] font-semibold text-[#e8e4dc] tracking-wide">Culinara</span>
            </div>

            {/* Hero */}
            <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
              <p className="text-[10px] font-semibold tracking-[.24em] uppercase text-[#4a70a9] mb-4">
                Culinary Masterclass
              </p>
              <h1 className="font-display text-[46px] font-light leading-[1.1] text-[#e8e4dc] mb-5">
                Elevate your<br />
                <em className="italic text-[#8fabd4]">culinary craft</em>
              </h1>
              <p className="text-[13px] text-[#e8e4dc]/40 leading-relaxed font-light max-w-[260px]">
                Unlock chef-curated recipes, techniques, and live masterclasses from world-class kitchens.
              </p>
            </div>

            {/* Features */}
            <div className="relative z-10 flex flex-col gap-3">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3 text-xs text-[#e8e4dc]/45">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg,#4a70a9,#8fabd4)" }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="bg-[#0d141f] p-10 md:p-12 flex flex-col justify-center">

            {/* Mode Toggle */}
            <div className="flex bg-white/[.04] border border-white/[.06] rounded-full p-1 mb-9">
              {[{ key: "login", label: "Sign In" }, { key: "signup", label: "Register" }].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchMode(key)}
                  disabled={loading}
                  className={`flex-1 py-2.5 rounded-full text-[11px] font-semibold tracking-[.12em] uppercase transition-all duration-300 cursor-pointer border-none ${
                    mode === key
                      ? "text-[#e8e4dc] shadow-[0_4px_16px_rgba(74,112,169,.4)]"
                      : "bg-transparent text-[#e8e4dc]/30 hover:text-[#e8e4dc]/60"
                  }`}
                  style={mode === key ? { background: "linear-gradient(135deg,#4a70a9,#5d84bc)" } : {}}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Heading */}
            <h2 className="font-display text-[30px] font-light text-[#e8e4dc] mb-1">
              {isLogin
                ? <><em className="italic text-[#8fabd4]">Welcome</em> back</>
                : <>Create <em className="italic text-[#8fabd4]">account</em></>
              }
            </h2>
            <p className="text-xs text-[#e8e4dc]/35 mb-7 font-light">
              {isLogin
                ? "Sign in to continue your culinary journey"
                : "Start your culinary adventure today"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              {!isLogin && (
                <div className="slide-down">
                  <Field
                    icon={User}
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleInput}
                    error={fieldErr.name}
                    autoComplete="name"
                  />
                </div>
              )}

              <Field
                icon={Mail}
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleInput}
                error={fieldErr.email}
                autoComplete="email"
              />

              <Field
                icon={Lock}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInput}
                error={fieldErr.password}
                autoComplete={isLogin ? "current-password" : "new-password"}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8fabd4]/45 hover:text-[#8fabd4] transition-colors p-1 bg-transparent border-none cursor-pointer"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {isLogin && (
                <div className="text-right pt-0.5">
                  <button
                    type="button"
                    className="text-[11px] text-[#8fabd4]/55 hover:text-[#8fabd4] transition-colors bg-transparent border-none cursor-pointer font-body"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 flex items-center justify-center gap-2.5 py-[15px] text-[#e8e4dc] text-[11px] font-bold tracking-[.2em] uppercase rounded-2xl border-none cursor-pointer shadow-[0_8px_24px_rgba(74,112,169,.35)] hover:shadow-[0_12px_32px_rgba(74,112,169,.5)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: "linear-gradient(135deg,#4a70a9,#5d84bc)" }}
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {isLogin ? "Signing in…" : "Creating account…"}
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[.07]" />
              <span className="text-[10px] font-medium tracking-[.15em] uppercase text-[#e8e4dc]/25 whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/[.07]" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <a
                href={GOOGLE_AUTH}
                className="flex items-center justify-center gap-2 py-3 bg-white/[.03] border border-white/[.08] hover:bg-white/[.07] hover:border-white/[.15] rounded-2xl text-[11px] font-semibold text-[#e8e4dc]/65 hover:text-[#e8e4dc] tracking-wide transition-all duration-200 hover:-translate-y-px no-underline"
                style={{ textDecoration: "none" }}
              >
                <GoogleIcon />
                Google
              </a>
              <a
                href={GITHUB_AUTH}
                className="flex items-center justify-center gap-2 py-3 bg-white/[.03] border border-white/[.08] hover:bg-white/[.07] hover:border-[#8fabd4]/30 rounded-2xl text-[11px] font-semibold text-[#e8e4dc]/65 hover:text-[#e8e4dc] tracking-wide transition-all duration-200 hover:-translate-y-px"
                style={{ textDecoration: "none" }}
              >
                <Github size={16} />
                GitHub
              </a>
            </div>

            {/* Footer */}
            <p className="text-center text-[11px] text-[#e8e4dc]/25">
              {isLogin ? "Don't have an account? " : "Already a member? "}
              <button
                type="button"
                onClick={() => switchMode(isLogin ? "signup" : "login")}
                className="text-[#8fabd4] font-semibold hover:text-[#e8e4dc] transition-colors bg-transparent border-none text-[11px] cursor-pointer font-body"
              >
                {isLogin ? "Register free" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}