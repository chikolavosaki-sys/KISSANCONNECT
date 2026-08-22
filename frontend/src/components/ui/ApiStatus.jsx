import { API_BASE_URL } from "../../services/api";

export default function ApiStatus() {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
      API: <span className="font-semibold">{API_BASE_URL}</span>
    </div>
  );
}
