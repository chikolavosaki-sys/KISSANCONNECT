import { registerNewFarmer } from "../api/authApi";
import { getMyProfile, updateMyProfile } from "../api/farmerApi";

export async function registerFarmer(payload) {
  return registerNewFarmer(payload);
}

export async function getFarmerProfile() {
  return getMyProfile();
}

export async function updateFarmerProfile(payload) {
  return updateMyProfile(payload);
}
