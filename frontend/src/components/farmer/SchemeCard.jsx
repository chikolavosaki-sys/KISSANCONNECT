import { useState } from "react";
import { Bookmark, Check, ExternalLink } from "lucide-react";
import { addBookmark, removeBookmark } from "../../api/bookmarkApi";
import { createApplication } from "../../api/applicationApi";

export default function SchemeCard({ scheme, bookmarked = false, onBookmarkChange }) {
  const [saved, setSaved] = useState(bookmarked);
  const [busy, setBusy] = useState(false);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  async function toggleBookmark() {
    setBusy(true);
    setMessage("");
    try {
      if (saved) {
        await removeBookmark(scheme.scheme_id);
        setSaved(false);
        onBookmarkChange?.(scheme.scheme_id, false);
      } else {
        await addBookmark(scheme.scheme_id);
        setSaved(true);
        onBookmarkChange?.(scheme.scheme_id, true);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function apply() {
    setApplying(true);
    setMessage("");
    try {
      await createApplication(scheme.scheme_id);
      setMessage("Application draft created successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setApplying(false);
    }
  }

  const score = Number(scheme.match_score ?? 0);

  return (
    <div className="gov-card p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {scheme.benefit_type || "Government Scheme"}
          </div>
          <h3 className="mt-1 text-lg font-bold">{scheme.scheme_name}</h3>
          {scheme.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">{scheme.description}</p>
          )}
          {scheme.benefit_amount_inr != null && (
            <div className="mt-3 text-sm font-semibold text-slate-700">
              Benefit: ₹{Number(scheme.benefit_amount_inr).toLocaleString("en-IN")}
            </div>
          )}
        </div>

        <div className="shrink-0 text-left sm:text-right">
          <div className="text-2xl font-extrabold text-emerald-800">{Math.round(score)}%</div>
          <div className="text-xs text-slate-500">profile match</div>
        </div>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-emerald-700"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Why it matched</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(scheme.matched_keywords || []).map((item) => (
              <span key={item} className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <Check size={12} /> {item}
              </span>
            ))}
            {!scheme.matched_keywords?.length && (
              <span className="text-xs text-slate-500">Profile and eligibility filters contributed to this match.</span>
            )}
          </div>
        </div>

        {scheme.missing_keywords?.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Missing indicators</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {scheme.missing_keywords.map((item) => (
                <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{item}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {message && <div className="mt-3 text-xs text-slate-600">{message}</div>}

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="gov-button gov-button-primary" onClick={apply} disabled={applying}>
          {applying ? "Creating..." : "Apply"}
        </button>
        <button type="button" className="gov-button gov-button-muted" onClick={toggleBookmark} disabled={busy}>
          <Bookmark size={16} /> {saved ? "Saved" : "Save"}
        </button>
        {scheme.official_url && (
          <a className="gov-button gov-button-muted" href={scheme.official_url} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Official site
          </a>
        )}
      </div>
    </div>
  );
}
