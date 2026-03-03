import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// Components
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

  // Replace 'Your Full Name' with your actual name
  const creatorName = "Ankit"; 
  const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta', 'Seafood'];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}filter.php?c=${activeCategory}`);
        setRecipes(res.data.meals.slice(0, 3));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Flavor | Curated Recipes by {creatorName}</title>
        <meta name="description" content={`Discover professional-grade recipes and kitchen-tested blueprints curated by ${creatorName}. Explore global flavors at Flavor.`} />
        
        {/* KEYWORDS SECTION */}
        <meta name="keywords" content={`${creatorName}, ${creatorName} recipes, Flavor app, professional cooking guides, kitchen tested recipes, healthy meal plans, easy dinner ideas, gourmet cooking ${creatorName}`} />
        
        {/* Author Tag */}
        <meta name="author" content={creatorName} />

        <meta property="og:title" content={`Flavor - Curated by ${creatorName}`} />
        <meta property="og:description" content={`Explore the best culinary moments and recipes hand-picked by ${creatorName}.`} />
      </Helmet>

      <div className="bg-white min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden">
        <Header />

        <main id="main-content">
          <Hero />

          {/* ADDED: Subtle SEO Anchor for your name */}
          <div className="sr-only">
             <h2>Recipes and Culinary Art by {creatorName}</h2>
             <p>Flavor is a platform designed and curated by {creatorName} to provide professional cooking blueprints.</p>
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
    </>
  );
};

export default HomePage;