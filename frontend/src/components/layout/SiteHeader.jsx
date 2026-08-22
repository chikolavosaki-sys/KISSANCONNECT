import { useState } from "react";
import { Accessibility, LogOut, Menu, Wheat } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { scheduledLanguages, useLanguage } from "../../context/LanguageContext";

export default function SiteHeader(){
 const [open,setOpen]=useState(false);const {user,isFarmer,isAdmin,signOut}=useAuth();const navigate=useNavigate();
 const {language,changeLanguage,translate}=useLanguage();
 function logout(){signOut();setOpen(false);navigate("/");}
 return <>
    <div className="bg-slate-800 text-white"><div className="gov-container flex min-h-9 items-center justify-between gap-3 text-xs"><span className="truncate">{translate("government")}</span><div className="flex shrink-0 items-center gap-2 sm:gap-4"><span className="hidden sm:inline">{translate("skip")}</span><label className="flex items-center gap-1"><span className="hidden md:inline">{translate("language")}</span><select aria-label={translate("language")} value={language} onChange={(event)=>changeLanguage(event.target.value)} className="max-w-24 bg-transparent font-semibold text-white outline-none sm:max-w-none"><option className="text-slate-900" value="en">English</option>{scheduledLanguages.filter(([code])=>code!=="en").map(([code,label])=><option className="text-slate-900" key={code} value={code}>{label}</option>)}</select></label><Accessibility size={14}/></div></div></div>
  <div className="tricolor-rule"/>
  <header className="border-b border-slate-200 bg-white"><div className="gov-container flex min-h-20 items-center justify-between gap-6">
   <Link to="/" className="flex items-center gap-3" onClick={()=>setOpen(false)}><div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-emerald-800 bg-emerald-50 text-emerald-800"><Wheat size={24}/></div><div><div className="text-lg font-extrabold tracking-tight">KISAN CONNECT</div><div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Agriculture Scheme Discovery Platform</div></div></Link>
   <button className="rounded-md border border-slate-300 p-2 md:hidden" onClick={()=>setOpen(v=>!v)} aria-label="Toggle navigation"><Menu size={20}/></button>
   <nav className={`${open?"flex":"hidden"} absolute left-0 right-0 top-[113px] z-30 flex-col gap-1 border-b border-slate-200 bg-white p-4 shadow-md md:static md:flex md:flex-row md:items-center md:border-0 md:p-0 md:shadow-none`}>
    <NavLink to="/" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800">{translate("home")}</NavLink>
    <a href="/#how-it-works" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800">{translate("howItWorks")}</a>
    <a href="/#reports" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800">{translate("publicReports")}</a>
    {isFarmer&&<><Link to="/farmer/dashboard" className="px-3 py-2 text-sm font-semibold text-emerald-800">Dashboard</Link><Link to="/farmer/profile" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800">Profile</Link></>}
    {isAdmin&&<Link to="/admin" className="px-3 py-2 text-sm font-semibold text-emerald-800">Admin Dashboard</Link>}
    {!user&&<><Link to="/farmer/login" className="gov-button gov-button-secondary ml-0 md:ml-2">{translate("farmerLogin")}</Link><Link to="/officer/login" className="gov-button gov-button-primary">{translate("officerLogin")}</Link></>}
    {user&&<button type="button" onClick={logout} className="gov-button gov-button-muted ml-0 md:ml-2"><LogOut size={16}/> Logout</button>}
   </nav>
  </div></header>
 </>;
}
