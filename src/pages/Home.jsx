import React, { useEffect, useState } from 'react';
import axios from 'axios';
// 1. Import your new component 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Reviews from '../components/Home/Reviews';
import PopularSection from '../components/Home/Popular';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [recipes, setRecipes] = useState([]);

  const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta', 'Seafood'];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}filter.php?c=${activeCategory}`);
        setRecipes(res.data.meals.slice(0, 3));
        console.log(recipes)
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [activeCategory]);

  return (
    // Updated background to dark to match your new Brutalist theme
    <div className="min-h-screen  text-white selection:bg-orange-500/30 selection:text-orange-500">

      <Header />

      <Hero />

      <Features />

      {/* --- 2. CALL THE COMPONENT HERE --- */}
      <PopularSection 
        recipes={recipes} 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        loading={loading} 
      />

      <Reviews />

      <Footer />
    </div>
  );
};

export default HomePage;