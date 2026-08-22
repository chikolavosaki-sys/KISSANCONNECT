import { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
import { getAdminState,getAdminStateDistricts } from "../../api/adminApi";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function AdminStatePage(){
 const {stateId}=useParams();const [data,setData]=useState(null),[districts,setDistricts]=useState([]),[error,setError]=useState("");
 useEffect(()=>{Promise.all([getAdminState(stateId),getAdminStateDistricts(stateId)]).then(([d,x])=>{setData(d);setDistricts(x)}).catch(e=>setError(e.message))},[stateId]);
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!data)return <Loading label="Loading state analytics..."/>;
 return <div className="gov-container py-10"><Link to="/admin" className="text-sm text-emerald-800 hover:underline">← Back to national dashboard</Link><div className="mt-5"><div className="gov-eyebrow">State analytics</div><h1 className="mt-2 text-3xl font-extrabold">{data.state?.state_name}</h1></div>
 <div className="mt-6 grid gap-4 sm:grid-cols-3">{[["Farmers",data.metrics?.farmers],["Registered",data.metrics?.registered_farmers],["Applications",data.metrics?.applications]].map(([l,v])=><div className="gov-card p-5" key={l}><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-2xl font-extrabold">{Number(v||0).toLocaleString("en-IN")}</div></div>)}</div>
 <section className="mt-8"><div className="gov-eyebrow">Districts</div><h2 className="mt-1 text-xl font-bold">Explore districts</h2><div className="gov-card mt-4 overflow-hidden"><div className="divide-y divide-slate-100">{districts.map(d=><Link key={d.district_id} to={`/admin/district/${d.district_id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"><div><div className="font-semibold">{d.district_name}</div><div className="mt-1 text-xs text-slate-500">{d.agro_climatic_zone||"Agro-climatic zone not available"}</div></div><div className="text-right"><div className="font-bold text-emerald-800">{Number(d.farmer_count||0).toLocaleString("en-IN")}</div><div className="text-xs text-slate-500">farmers</div></div></Link>)}</div></div></section></div>;
}
