import {
  ArrowRight,
  BarChart3,
  FileSearch,
  MapPinned,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import AccessCards from "../components/home/AccessCards";
import IndiaUsageMap from "../components/home/IndiaUsageMap";
import SectionHeading from "../components/ui/SectionHeading";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { translate } = useLanguage();
  const services = [
    ["Find matching schemes", FileSearch, "Ranked scheme discovery using profile and scheme information."],
    ["Understand your profile", Sparkles, "Economic Vulnerability Index as a transparent decision-support signal."],
    ["Track applications", BarChart3, "Follow submitted applications through review and decision."],
    ["View local activity", MapPinned, "Explore anonymized state and district-level scheme activity."]
  ];

  return (
    <>
      <section className="gov-grid border-b border-slate-200 bg-white">
        <div className="gov-container grid min-h-[440px] items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="gov-eyebrow">{translate("heroEyebrow")}</div>

            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {translate("heroTitle")}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {translate("heroText")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="gov-button gov-button-primary">
                {translate("register")}
                <ArrowRight size={17} className="ml-2" />
              </Link>

              <Link to="/farmer/login" className="gov-button gov-button-secondary">
                Login as Farmer
              </Link>
            </div>

            <div className="mt-5 text-xs text-slate-500">
              {translate("disclaimer")}
            </div>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="border-b border-emerald-800 bg-emerald-900 px-5 py-4 text-white">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                What you can do
              </div>
              <div className="mt-1 text-xl font-bold">
                {translate("services")}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {services.map(([title, Icon, text]) => (
                <div key={title} className="flex gap-4 p-5">
                  <div className="mt-0.5 text-emerald-800">
                    <Icon size={21} />
                  </div>

                  <div>
                    <div className="text-sm font-bold">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      {text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gov-container py-12">
        <SectionHeading
          eyebrow="Access services"
          title="Choose your role"
          description="The first release separates farmer services from officer workflows."
        />

        <AccessCards />
      </section>

      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-white"
      >
        <div className="gov-container py-12">
          <SectionHeading
            eyebrow="How it works"
            title="From farmer profile to relevant schemes"
            description="The frontend follows the project blueprint: structured profile data first, then the matching engine and application workflow in the backend."
          />

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["01", "Build your profile", "Tell us about your location, land, crop, irrigation and household indicators."],
              ["02", "Apply eligibility filters", "State, scheme category and explicit eligibility conditions are checked first."],
              ["03", "Rank relevant schemes", "The backend will use TF-IDF + cosine similarity and an EVI alignment boost."],
              ["04", "Apply and track", "Submit applications and follow their status through the farmer dashboard."]
            ].map(([number, title, text]) => (
              <div key={number} className="gov-card p-5">
                <div className="text-xs font-extrabold text-emerald-700">
                  {number}
                </div>
                <div className="mt-3 font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="gov-container py-12">
        <SectionHeading
          eyebrow={translate("publicReports")}
          title={translate("reportsTitle")}
          description={translate("reportsDescription")}
        />

        <IndiaUsageMap />
      </section>

      <section className="gov-container pb-14">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex gap-4">
            <ShieldCheck className="mt-0.5 shrink-0 text-emerald-800" size={22} />

            <div>
              <div className="font-bold text-emerald-950">
                Transparent and explainable by design
              </div>

              <p className="mt-1 text-sm leading-6 text-emerald-900/80">
                The core matching design is rule-based filtering plus
                TF-IDF/cosine ranking, with the EVI clearly presented as a
                heuristic.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
