import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchTopRecipes = async () => {
  const res = await axios.get(`${API_URL}/api/recipes/top/popular`);
  return res.data;
};
