// api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchRandomMeals = async () => {
  const requests = Array.from({ length: 19 }, () => axios.get(`${BASE_URL}random.php`));
  const responses = await Promise.all(requests);
  return responses.map((r) => r.data.meals[0]);
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}list.php?c=list`);
  return res.data.meals;
};

export const fetchAreas = async () => {
  const res = await axios.get(`${BASE_URL}list.php?a=list`);
  return res.data.meals;
};

export const fetchMealsByFilter = async (type, value) => {
  const param = type === "category" ? "c" : "a";
  const res = await axios.get(`${BASE_URL}filter.php?${param}=${encodeURIComponent(value)}`);
  if (!res.data.meals) return [];
  // fetch full details for first 12 meals
  const details = await Promise.all(
    res.data.meals.map((meal) => axios.get(`${BASE_URL}lookup.php?i=${meal.idMeal}`))
  );
  return details.map((r) => r.data.meals[0]);
};

export const searchMeals = async (query) => {
  const res = await axios.get(`${BASE_URL}search.php?s=${query}`);
  return res.data.meals || [];
};