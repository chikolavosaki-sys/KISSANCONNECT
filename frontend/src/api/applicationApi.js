import { apiRequest } from "../services/api";

export const getMyApplications = () => apiRequest("/applications");

export const createApplication = (schemeId, applicationData = {}) =>
  apiRequest("/applications", {
    method: "POST",
    body: JSON.stringify({
      scheme_id: schemeId,
      application_data: applicationData,
    }),
  });
