import apiClient from "./apiClient";

export const getSchemes = () => apiClient.get("/schemes/");
export const getSchemeById = (id) => apiClient.get(`/schemes/${id}`);
export const getMatchesForFarmer = (farmerId) =>
  apiClient.get(`/schemes/match/${farmerId}`);
