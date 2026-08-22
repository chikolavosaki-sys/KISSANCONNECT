import { apiRequest } from "../services/api";

export const getMyBookmarks = () => apiRequest("/bookmarks");

export const addBookmark = (schemeId) =>
  apiRequest(`/bookmarks/${schemeId}`, { method: "POST" });

export const removeBookmark = (schemeId) =>
  apiRequest(`/bookmarks/${schemeId}`, { method: "DELETE" });
