import { useEffect, useMemo, useState } from "react";
import { Bookmark, FileText, MapPin, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getMyProfile } from "../api/farmerApi";
import { getEvi, getRecommendations } from "../api/matchingApi";
import { getMyApplications } from "../api/applicationApi";
import { getMyBookmarks } from "../api/bookmarkApi";
import SchemeCard from "../components/farmer/SchemeCard";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useLanguage } from "../context/LanguageContext";

export default function FarmerDashboardPage() {
  const { user } = useAuth();
  const { translate } = useLanguage();
  const [profile,setProfile]=useState(null), [evi,setEvi]=useState(null), [recommendations,setRecommendations]=useState([]), [applications,setApplications]=useState([]), [bookmarks,setBookmarks]=useState([]);
  const [error,setError]=useState(""), [loading,setLoading]=useState(true);

  useEffect(()=>{(async()=>{try{
    const [p,e,r,a,b]=await Promise.all([getMyProfile(),getEvi(),getRecommendations(10),getMyApplications(),getMyBookmarks()]);
    setProfile(p);setEvi(e);setRecommendations(r.recommendations||[]);setApplications(a||[]);setBookmarks(b||[]);
  }catch(err){setError(err.message)}finally{setLoading(false)}})()},[]);

  const bookmarkedIds=useMemo(()=>new Set(bookmarks.map(x=>x.scheme_id)),[bookmarks]);
  function handleBookmarkChange(id,saved){setBookmarks(cur=>saved?(cur.some(x=>x.scheme_id===id)?cur:[...cur,{scheme_id:id}]):cur.filter(x=>x.scheme_id!==id));}

  if(loading)return <Loading label={translate("loadingDashboard")}/>;
  if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;

  const stats=[[translate("matchedSchemes"),recommendations.length,Search],[translate("savedSchemes"),bookmarks.length,Bookmark],[translate("applications"),applications.length,FileText],[translate("eviScore"),evi?.score??profile?.evi_score??"—",TrendingUp]];

  return <div className="gov-container py-10">
    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
      <div><div className="gov-eyebrow">{translate("farmerDashboard")}</div><h1 className="mt-2 text-3xl font-extrabold">{translate("welcome")}, {profile?.full_name||user?.phone||translate("farmer")}</h1>
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={15}/> {profile?.village||"Farmer profile"} · District {profile?.district_id} · State {profile?.state_id}</div></div>
      <Link to="/farmer/profile" className="gov-button gov-button-secondary">{translate("updateProfile")}</Link>
    </div>

    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label,value,Icon])=><div key={label} className="gov-card p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><Icon size={18} className="text-emerald-700"/></div><div className="mt-2 text-2xl font-extrabold">{value}</div></div>)}</div>

    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.72fr]">
      <section><div className="mb-4 flex items-end justify-between gap-4"><div><div className="gov-eyebrow">{translate("recommended")}</div><h2 className="mt-1 text-xl font-bold">{translate("matchedToProfile")}</h2></div><Link to="/farmer/schemes" className="text-sm font-semibold text-emerald-800 hover:underline">{translate("viewAll")}</Link></div>
      <div className="space-y-4">{recommendations.slice(0,5).map(s=><SchemeCard key={s.scheme_id} scheme={s} bookmarked={bookmarkedIds.has(s.scheme_id)} onBookmarkChange={handleBookmarkChange}/>)}{!recommendations.length&&<div className="gov-card p-6 text-sm text-slate-600">{translate("noRecommendations")}</div>}</div></section>

      <aside><div className="gov-card p-6"><div className="gov-eyebrow">{translate("applications")}</div><h2 className="mt-1 text-xl font-bold">{translate("recentActivity")}</h2><div className="mt-5 space-y-4">{applications.slice(0,5).map(x=><div key={x.application_id} className="border-b border-slate-100 pb-4 last:border-0"><div className="text-sm font-bold">Scheme #{x.scheme_id}</div><div className="mt-1 text-xs text-slate-500">{x.status}</div></div>)}{!applications.length&&<div className="text-sm text-slate-500">{translate("noApplications")}</div>}</div><Link to="/farmer/applications" className="mt-5 inline-block text-sm font-semibold text-emerald-800 hover:underline">{translate("viewApplications")}</Link></div>
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-5"><div className="text-sm font-bold text-blue-950">{translate("yourEvi")}</div><div className="mt-2 text-3xl font-extrabold text-blue-950">{evi?.score??"—"}</div><div className="mt-1 text-xs text-blue-900/70">{evi?.bucket||translate("calculatedProfile")}</div></div></aside>
    </div>
  </div>;
}
