import { apiRequest } from "../services/api";

export const getAdminOverview = () => apiRequest("/admin/overview");

export const getAdminStates = () => apiRequest("/admin/states");

export const getAdminState = (stateId) => apiRequest(`/admin/states/${stateId}`);

export const getAdminStateDistricts = (stateId) =>
  apiRequest(`/admin/states/${stateId}/districts`);

export const getAdminDistrict = (districtId) =>
  apiRequest(`/admin/districts/${districtId}`);

export const getAdminFarmers = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  return apiRequest(`/admin/farmers${query.toString() ? `?${query}` : ""}`);
};

export const getAdminApplications = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  return apiRequest(`/admin/applications${query.toString() ? `?${query}` : ""}`);
};

export const getAdminSchemes = () => apiRequest("/admin/schemes");
