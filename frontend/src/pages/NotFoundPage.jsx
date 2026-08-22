import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="gov-container py-20 text-center">
      <div className="text-5xl font-extrabold text-slate-300">
        404
      </div>

      <h1 className="mt-4 text-2xl font-bold">
        Page not found
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        The requested Kisan Connect page does not exist.
      </p>

      <Link
        to="/"
        className="gov-button gov-button-primary mt-6"
      >
        Return to Home
      </Link>
    </div>
  );
}
