import { apiRequest } from "../services/api";

export const getSchemes = (state) =>
  apiRequest(state ? `/schemes?state=${encodeURIComponent(state)}` : "/schemes");

export const getScheme = (schemeId) => apiRequest(`/schemes/${schemeId}`);
