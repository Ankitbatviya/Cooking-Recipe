import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Reviews from "../components/Home/Reviews";
import PopularSection from "../components/Home/Popular";
import Loader from "../components/Loader";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);

  const creatorName = "Ankit Batviya";
  const categories = ["Beef", "Chicken", "Dessert", "Lamb", "Pasta", "Seafood"];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}filter.php?c=${activeCategory}`
        );

        if (res.data?.meals) {
          setRecipes(res.data.meals.slice(0, 3));
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [activeCategory]);

  // Optional dynamic title
  useEffect(() => {
    document.title = `Flavor | Curated Recipes by ${creatorName}`;
  }, []);

  return (
    <div className="bg-white min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <Loader/>
      <Header />

      <main id="main-content">
        <Hero />

        {/* Hidden SEO Text */}
        <div className="sr-only">
          <h2>Recipes and Culinary Art by {creatorName}</h2>
          <p>
            Flavor is a professional recipe platform curated by {creatorName},
            offering global cuisine ideas and kitchen-tested meal blueprints.
          </p>
        </div>

        <PopularSection
          recipes={recipes}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loading={loading}
        />

        <Features />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;