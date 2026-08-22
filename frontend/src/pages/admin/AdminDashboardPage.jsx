import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getAdminOverview,getAdminStates } from "../../api/adminApi";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function AdminDashboardPage(){
 const [overview,setOverview]=useState(null),[states,setStates]=useState([]),[error,setError]=useState("");
 useEffect(()=>{Promise.all([getAdminOverview(),getAdminStates()]).then(([o,s])=>{setOverview(o);setStates(s)}).catch(e=>setError(e.message))},[]);
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!overview)return <Loading label="Loading national dashboard..."/>;
 const stats=[["Total farmers",overview.farmers?.total],["Registered farmers",overview.farmers?.registered],["States",overview.geography?.states],["Districts",overview.geography?.districts],["Applications",overview.activity?.applications],["Schemes",overview.schemes?.total]];
 return <div className="gov-container py-10"><div className="mb-8"><div className="gov-eyebrow">Administration</div><h1 className="mt-2 text-3xl font-extrabold">Kisan Connect National Dashboard</h1><p className="mt-2 text-sm text-slate-600">Monitor farmer participation and programme activity across India.</p></div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{stats.map(([l,v])=><div key={l} className="gov-card p-5"><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-2xl font-extrabold">{Number(v||0).toLocaleString("en-IN")}</div></div>)}</div>
 <section className="mt-8"><div className="mb-4"><div className="gov-eyebrow">Geographic exploration</div><h2 className="mt-1 text-xl font-bold">States</h2></div><div className="gov-card overflow-hidden"><div className="divide-y divide-slate-100">{states.map(s=><Link key={s.state_id} to={`/admin/state/${s.state_id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"><div><div className="font-semibold">{s.state_name}</div><div className="mt-1 text-xs text-slate-500">{s.district_count} districts · {s.registered_farmer_count} registered</div></div><div className="text-right"><div className="font-bold text-emerald-800">{Number(s.farmer_count||0).toLocaleString("en-IN")}</div><div className="text-xs text-slate-500">farmers</div></div></Link>)}</div></div></section>
 </div>;
}
