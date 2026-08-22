import { apiRequest } from "../services/api";

export const getMyProfile = () => apiRequest("/farmers/me");

export const updateMyProfile = (payload) =>
  apiRequest("/farmers/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
