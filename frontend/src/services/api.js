import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getDashboard = () => api.get("/dashboard/weekly");

export const getActivities = () => api.get("/activities");

export const createActivity = (activity) => api.post("/activities", activity);

export const getTarget = () => api.get("/target");

export const setTarget = (target) => api.put("/target", target);

export const getWeeklyAdvice = () => api.get("/ai/weekly-advice");

export default api;
