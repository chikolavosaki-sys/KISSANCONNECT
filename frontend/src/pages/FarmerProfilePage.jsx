import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/farmerApi";
import { getStateOptions, getDistrictOptions } from "../services/locationService";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

const fields = [
  ["full_name", "Full Name", "text"],
  ["age", "Age", "number"],
  ["gender", "Gender", "select"],
  ["social_category", "Social Category", "select"],
  ["address_line", "Address", "text"],
  ["village", "Village / Town", "text"],
  ["block", "Block", "text"],
  ["pincode", "Pincode", "number"],
  ["occupation", "Occupation", "text"],
  ["annual_income_inr", "Annual Income (₹)", "number"],
];

export default function FarmerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [profileData, stateOptions] = await Promise.all([
          getMyProfile(),
          getStateOptions(),
        ]);

        setProfile(profileData);
        setStates(stateOptions);
        setForm({
          full_name: profileData.full_name || "",
          age: profileData.age ?? "",
          gender: profileData.gender || "",
          social_category: profileData.social_category || "",
          address_line: profileData.address_line || "",
          village: profileData.village || "",
          block: profileData.block || "",
          pincode: profileData.pincode ?? "",
          occupation: profileData.occupation || "",
          annual_income_inr: profileData.annual_income_inr ?? "",
          state_id: profileData.state_id ?? "",
          district_id: profileData.district_id ?? "",
        });

        if (profileData.state_id) {
          setDistricts(await getDistrictOptions(profileData.state_id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function changeState(value) {
    const stateId = Number(value);
    update("state_id", stateId);
    update("district_id", "");
    setError("");

    try {
      setDistricts(await getDistrictOptions(stateId));
    } catch (err) {
      setError(err.message);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = await updateMyProfile({
        full_name: form.full_name || null,
        age: form.age === "" ? null : Number(form.age),
        gender: form.gender || null,
        social_category: form.social_category || null,
        address_line: form.address_line || null,
        village: form.village || null,
        block: form.block || null,
        pincode: form.pincode === "" ? null : Number(form.pincode),
        occupation: form.occupation || null,
        annual_income_inr:
          form.annual_income_inr === ""
            ? null
            : Number(form.annual_income_inr),
        state_id: Number(form.state_id),
        district_id: Number(form.district_id),
      });

      setProfile(data);
      setForm((current) => ({ ...current, ...data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loading label="Loading your profile..." />;

  return (
    <div className="gov-container py-10">
      <div className="mb-7">
        <div className="gov-eyebrow">Farmer services</div>
        <h1 className="mt-2 text-3xl font-extrabold">My Profile</h1>
        <p className="mt-2 text-sm text-slate-600">
          Keep your information updated so scheme matching remains accurate.
        </p>
      </div>

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <form className="gov-card max-w-4xl p-6" onSubmit={submit}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fields.map(([key, label, type]) => (
            <label key={key} className={key === "address_line" ? "lg:col-span-3" : ""}>
              <span className="gov-label">{label}</span>

              {type === "select" && key === "gender" ? (
                <select
                  className="gov-select"
                  value={form[key] || ""}
                  onChange={(e) => update(key, e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : type === "select" && key === "social_category" ? (
                <select
                  className="gov-select"
                  value={form[key] || ""}
                  onChange={(e) => update(key, e.target.value)}
                >
                  <option value="">Select</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>Other</option>
                </select>
              ) : (
                <input
                  className="gov-input"
                  type={type === "number" ? "number" : "text"}
                  value={form[key] ?? ""}
                  onChange={(e) => update(key, e.target.value)}
                />
              )}
            </label>
          ))}

          <label>
            <span className="gov-label">State</span>
            <select
              className="gov-select"
              value={form.state_id || ""}
              onChange={(e) => changeState(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="gov-label">District</span>
            <select
              className="gov-select"
              value={form.district_id || ""}
              onChange={(e) => update("district_id", Number(e.target.value))}
              disabled={!form.state_id}
            >
              <option value="">
                {form.state_id ? "Select District" : "Select State first"}
              </option>
              {districts.map((district) => (
                <option key={district.value} value={district.value}>
                  {district.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="gov-button gov-button-primary mt-6"
          disabled={saving || !form.state_id || !form.district_id}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {profile?.farmer_id && (
          <div className="mt-4 text-xs text-slate-500">
            Farmer ID: {profile.farmer_id}
          </div>
        )}
      </form>
    </div>
  );
}
