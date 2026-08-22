import { apiRequest } from "../services/api";

export const getStates = () => apiRequest("/locations/states");

export const getDistricts = (stateId) =>
  apiRequest(`/locations/states/${stateId}/districts`);
