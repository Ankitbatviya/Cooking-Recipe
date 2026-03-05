import { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const AllRecipes = lazy(() => import("../pages/allRecipes"));
const RecipePage = lazy(() => import("../pages/RecipePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));

// ── Centered Loader ──────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-orange-50">
    {/* Spinning ring with emoji */}
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-orange-200" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
      <span className="text-3xl animate-bounce">🍳</span>
    </div>

    {/* Animated label */}
    <div className="mt-6 flex items-center gap-1.5">
      <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase">
        Cooking
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
    </div>
  </div>
);

// ── 404 Not Found ────────────────────────────────────────────────────────────
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-6 text-center">
    <h1 className="text-[clamp(80px,18vw,180px)] font-black leading-none tracking-tighter text-orange-500 select-none">
      404
    </h1>

    <div className="text-6xl -mt-4 mb-4 animate-bounce">🍳</div>

    <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">
      Oops! Recipe Not Found
    </h2>

    <p className="text-amber-700 text-base max-w-sm leading-relaxed mb-8">
      Looks like this page got burnt in the kitchen. Let's get you back to
      something delicious!
    </p>

    <Link
      to="/"
      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm tracking-wide px-7 py-3 rounded-full shadow-lg shadow-orange-300 transition-all duration-200"
    >
      🏠 Back to Home
    </Link>
  </div>
);

// ── Routes ───────────────────────────────────────────────────────────────────
const MyRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/recipes"    element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/auth"       element={<AuthPage />} />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MyRoutes;