import { useEffect,useState } from "react";
import { getRecommendations } from "../api/matchingApi";
import SchemeCard from "../components/farmer/SchemeCard";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function SchemesPage(){
 const [data,setData]=useState(null),[error,setError]=useState("");
 useEffect(()=>{getRecommendations(50).then(setData).catch(e=>setError(e.message))},[]);
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!data)return <Loading label="Finding schemes for your profile..."/>;
 return <div className="gov-container py-10"><div className="mb-7"><div className="gov-eyebrow">Scheme matching</div><h1 className="mt-2 text-3xl font-extrabold">Recommended Schemes</h1><p className="mt-2 text-sm text-slate-600">{data.count} recommendations generated from your current profile.</p></div>
 <div className="gov-card mb-6 p-5"><div className="text-sm font-bold">Economic Vulnerability Index</div><div className="mt-1 text-2xl font-extrabold text-emerald-800">{data.evi?.score??"—"}</div><div className="text-xs text-slate-500">{data.evi?.bucket||"—"}</div></div>
 <div className="space-y-4">{data.recommendations?.map(s=><SchemeCard key={s.scheme_id} scheme={s}/>)}</div>{!data.recommendations?.length&&<div className="gov-card p-6 text-sm text-slate-600">No recommendations are available yet.</div>}</div>;
}
