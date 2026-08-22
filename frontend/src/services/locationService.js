import { getDistricts, getStates } from "../api/locationApi";

export async function getStateOptions() {
  const rows = await getStates();

  if (!Array.isArray(rows)) {
    throw new Error("The locations API returned an invalid state list.");
  }

  return rows.map((item) => ({
    value: Number(item.state_id),
    label: item.state_name,
    stateCode: item.state_code,
  }));
}

export async function getDistrictOptions(stateId) {
  if (!stateId) return [];

  const rows = await getDistricts(Number(stateId));

  if (!Array.isArray(rows)) {
    throw new Error("The locations API returned an invalid district list.");
  }

  return rows.map((item) => ({
    value: Number(item.district_id),
    label: item.district_name,
    districtCode: item.district_code,
  }));
}
