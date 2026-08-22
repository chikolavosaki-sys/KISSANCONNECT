import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";

export default function FarmerLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { translate } = useLanguage();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phone)) return setError(translate("invalidMobile"));
    if (password.length < 8) return setError(translate("shortPassword"));

    setSubmitting(true);
    try {
      const user = await signIn(phone, password);
      if (user.role !== "farmer") return setError(translate("notFarmerAccount"));
      navigate("/farmer/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="gov-container py-14">
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-emerald-900 p-8 text-white">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">{translate("farmerServices")}</div>
          <h1 className="mt-3 text-3xl font-extrabold">{translate("farmerLoginTitle")}</h1>
          <p className="mt-4 text-sm leading-6 text-emerald-50/80">
            {translate("loginDescription")}
          </p>
        </div>
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
            <LockKeyhole size={22} />
          </div>
          <h2 className="mt-5 text-xl font-bold">{translate("signInTitle")}</h2>

          {error && <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

          <div className="mt-6 space-y-5">
            <div>
              <label className="gov-label">{translate("mobileNumber")}</label>
              <input className="gov-input" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" />
            </div>
            <div>
              <label className="gov-label">{translate("password")}</label>
              <input className="gov-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Enter password" />
            </div>
            <button className="gov-button gov-button-primary w-full" disabled={submitting}>{submitting ? translate("signingIn") : translate("login")}</button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-600">
            {translate("registerPrompt")} <Link className="font-semibold text-emerald-800 hover:underline" to="/register">{translate("registerHere")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
