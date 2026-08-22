import { ArrowRight, ClipboardList, LogIn, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccessCards() {
  const cards = [
    {
      title: "Register as a Farmer",
      text: "Create your agricultural profile with land, farming, location and household indicators.",
      icon: ClipboardList,
      to: "/register"
    },
    {
      title: "Login as a Farmer",
      text: "View matched schemes, eligibility explanations, saved schemes and application status.",
      icon: LogIn,
      to: "/farmer/login"
    },
    {
      title: "Login as an Officer",
      text: "Access scheme management, application review and district-level analytics.",
      icon: ShieldCheck,
      to: "/officer/login"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link
            key={card.title}
            to={card.to}
            className="gov-card group p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
              <Icon size={23} />
            </div>

            <div className="mt-5 text-lg font-bold">{card.title}</div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.text}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-800">
              Continue
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
