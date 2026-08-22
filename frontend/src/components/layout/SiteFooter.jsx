import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="gov-container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="font-bold">KISAN CONNECT</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
            A farmer-first platform for discovering agricultural government
            schemes, understanding eligibility and tracking applications.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold">Quick Links</div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link className="text-emerald-800 hover:underline" to="/register">
              New Farmer Registration
            </Link>
            <Link className="text-emerald-800 hover:underline" to="/farmer/login">
              Farmer Login
            </Link>
            <Link className="text-emerald-800 hover:underline" to="/officer/login">
              Officer Login
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold">Important</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Eligibility scores are decision-support indicators. Final scheme
            eligibility remains subject to applicable government guidelines.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50">
        <div className="gov-container py-4 text-xs text-slate-500">
          © 2026 Kisan Connect
        </div>
      </div>
    </footer>
  );
}
