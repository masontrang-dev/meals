import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMeals = async () => {
  const response = await axios.get(`${API_BASE}/api/meals`);
  return response.data;
};
