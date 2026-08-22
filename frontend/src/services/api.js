function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  return "/api";
}

export const API_BASE_URL = getApiBaseUrl();
export const TOKEN_KEY = "kissan_connect_access_token";

const ROLE_KEY = "kissan_connect_role";
const USER_ID_KEY = "kissan_connect_user_id";

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

function getErrorMessage(payload, status) {
  if (payload && typeof payload === "object" && payload.detail) {
    if (Array.isArray(payload.detail)) {
      return payload.detail
        .map((item) => item?.msg || item?.detail || "Invalid request")
        .join(", ");
    }
    return String(payload.detail);
  }

  if (status === 401) return "Invalid credentials or your session has expired.";
  if (status === 403) return "You are not authorized to access this service.";
  if (status === 404) return "The requested service was not found.";
  if (status >= 500) return "The server encountered an error. Please try again.";

  return `Request failed (${status}).`;
}

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    Accept: "application/json",
    ...(options.body !== undefined
      ? { "Content-Type": "application/json" }
      : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
    } catch (error) {
    const target = API_BASE_URL.startsWith("/")
      ? `${window.location.origin}${API_BASE_URL}`
      : API_BASE_URL;

    console.error("Kissan Connect API request failed:", {
      url: `${target}${path}`,
      error,
    });

    throw new Error(
      `Unable to reach Kissan Connect API at ${target}. ` +
      `Browser error: ${error?.message || "Unknown network error"}`
    );
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
    }

    throw new Error(getErrorMessage(payload, response.status));
  }

  return payload;
}

export const api = {
  registerFarmer: (payload) =>
    apiRequest("/auth/register/new", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  loginFarmer: (payload) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  loginOfficer: (payload) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getCurrentUser: () => apiRequest("/auth/me"),

  getFarmerProfile: () => apiRequest("/farmers/me"),

  updateFarmerProfile: (payload) =>
    apiRequest("/farmers/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  getStates: () => apiRequest("/locations/states"),

  getDistricts: (stateId) =>
    apiRequest(`/locations/states/${stateId}/districts`),

  getEvi: () => apiRequest("/matching/evi"),

  getRecommendations: (topK = 10) =>
    apiRequest(`/matching/recommendations?top_k=${topK}`),

  getSchemes: (state) =>
    apiRequest(
      state ? `/schemes?state=${encodeURIComponent(state)}` : "/schemes"
    ),

  getScheme: (schemeId) => apiRequest(`/schemes/${schemeId}`),

  getApplications: () => apiRequest("/applications"),

  createApplication: (schemeId, applicationData = {}) =>
    apiRequest("/applications", {
      method: "POST",
      body: JSON.stringify({
        scheme_id: schemeId,
        application_data: applicationData,
      }),
    }),

  getBookmarks: () => apiRequest("/bookmarks"),

  addBookmark: (schemeId) =>
    apiRequest(`/bookmarks/${schemeId}`, { method: "POST" }),

  removeBookmark: (schemeId) =>
    apiRequest(`/bookmarks/${schemeId}`, { method: "DELETE" }),

  getAdminOverview: () => apiRequest("/admin/overview"),

  getAdminStates: () => apiRequest("/admin/states"),

  getAdminState: (stateId) => apiRequest(`/admin/states/${stateId}`),

  getAdminStateDistricts: (stateId) =>
    apiRequest(`/admin/states/${stateId}/districts`),

  getAdminDistrict: (districtId) =>
    apiRequest(`/admin/districts/${districtId}`),

  getAdminFarmers: (params = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, value);
      }
    });

    const suffix = query.toString() ? `?${query}` : "";
    return apiRequest(`/admin/farmers${suffix}`);
  },

  getAdminApplications: (params = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, value);
      }
    });

    const suffix = query.toString() ? `?${query}` : "";
    return apiRequest(`/admin/applications${suffix}`);
  },

  getAdminSchemes: () => apiRequest("/admin/schemes"),
};
