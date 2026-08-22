import { useEffect,useState } from "react";
import { getMyApplications } from "../api/applicationApi";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ApplicationsPage(){
 const [items,setItems]=useState(null),[error,setError]=useState("");
 useEffect(()=>{getMyApplications().then(setItems).catch(e=>setError(e.message))},[]);
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!items)return <Loading label="Loading your applications..."/>;
 return <div className="gov-container py-10"><div className="mb-7"><div className="gov-eyebrow">Farmer services</div><h1 className="mt-2 text-3xl font-extrabold">My Applications</h1></div>
 <div className="space-y-3">{items.map(x=><div key={x.application_id} className="gov-card p-5 flex justify-between gap-4"><div><div className="text-sm font-bold">Scheme #{x.scheme_id}</div><div className="mt-1 text-xs text-slate-500">Application #{x.application_id}</div></div><div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{x.status}</div></div>)}{!items.length&&<div className="gov-card p-6 text-sm text-slate-600">You have no applications yet.</div>}</div></div>;
}
