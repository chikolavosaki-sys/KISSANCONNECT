import { apiRequest } from "../services/api";

export const getEvi = () => apiRequest("/matching/evi");

export const getRecommendations = (topK = 10) =>
  apiRequest(`/matching/recommendations?top_k=${topK}`);
