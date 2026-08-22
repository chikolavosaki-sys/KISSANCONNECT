import { Building2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function OfficerLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!/^\d{10,30}$/.test(phone)) return setError("Enter a valid phone number.");
    if (!password) return setError("Enter your password.");

    setSubmitting(true);
    try {
      const user = await signIn(phone, password);
      if (!["district_admin", "state_admin", "super_admin"].includes(user.role)) {
        return setError("This account does not have officer access.");
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="gov-container py-14">
      <form className="gov-card mx-auto max-w-lg p-8" onSubmit={submit}>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-slate-800"><Building2 size={22} /></div>
        <div className="mt-5 gov-eyebrow">Authorized access</div>
        <h1 className="mt-2 text-2xl font-extrabold">Officer Login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">For authorized administrators managing farmer analytics and programme activity.</p>

        {error && <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

        <div className="mt-7 space-y-5">
          <div>
            <label className="gov-label">Official Phone</label>
            <input className="gov-input" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} inputMode="numeric" autoComplete="tel" placeholder="Admin phone number" />
          </div>
          <div>
            <label className="gov-label">Password</label>
            <input className="gov-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Enter password" />
          </div>
          <button className="gov-button gov-button-primary w-full" disabled={submitting}>{submitting ? "Signing in..." : "Sign In"}</button>
        </div>

        <div className="mt-5 text-center text-sm"><Link to="/" className="text-emerald-800 hover:underline">Return to public portal</Link></div>
      </form>
    </div>
  );
}
