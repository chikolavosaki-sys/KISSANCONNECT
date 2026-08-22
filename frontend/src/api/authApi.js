import { apiRequest } from "../services/api";

export const login = (phone, password) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone, password }),
  });

export const registerNewFarmer = (payload) =>
  apiRequest("/auth/register/new", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getCurrentUser = () => apiRequest("/auth/me");
