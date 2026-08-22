import { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
import { getAdminDistrict } from "../../api/adminApi";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

function Distribution({title,data}){const entries=Object.entries(data||{});return <div className="gov-card p-5"><h3 className="font-bold">{title}</h3><div className="mt-4 space-y-3">{entries.map(([k,v])=><div key={k} className="flex justify-between gap-4 text-sm"><span className="text-slate-600">{k}</span><span className="font-semibold">{v}</span></div>)}{!entries.length&&<div className="text-sm text-slate-500">No data available.</div>}</div></div>}

export default function AdminDistrictPage(){
 const {districtId}=useParams();const [data,setData]=useState(null),[error,setError]=useState("");
 useEffect(()=>{getAdminDistrict(districtId).then(setData).catch(e=>setError(e.message))},[districtId]);
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!data)return <Loading label="Loading district analytics..."/>;
 const d=data.district;
 return <div className="gov-container py-10"><Link to={`/admin/state/${d.state_id}`} className="text-sm text-emerald-800 hover:underline">← Back to state</Link><div className="mt-5"><div className="gov-eyebrow">District analytics</div><h1 className="mt-2 text-3xl font-extrabold">{d.district_name}</h1><p className="mt-2 text-sm text-slate-500">District ID: {d.district_id} · Code: {d.district_code}</p></div>
 <div className="mt-6 grid gap-4 sm:grid-cols-3">{[["Farmers",data.metrics?.farmers],["Registered",data.metrics?.registered_farmers],["Applications",data.metrics?.applications]].map(([l,v])=><div className="gov-card p-5" key={l}><div className="text-sm text-slate-500">{l}</div><div className="mt-2 text-2xl font-extrabold">{Number(v||0).toLocaleString("en-IN")}</div></div>)}</div>
 <div className="mt-8 grid gap-4 md:grid-cols-2"><Distribution title="Gender distribution" data={data.gender_distribution}/><Distribution title="Social category" data={data.category_distribution}/><Distribution title="EVI distribution" data={data.evi_distribution}/><Distribution title="Primary crops" data={Object.fromEntries((data.top_primary_crops||[]).map(x=>[x.crop,x.farmer_count]))}/><Distribution title="Top schemes by applications" data={Object.fromEntries((data.top_schemes_by_applications||[]).map(x=>[x.scheme_name,x.application_count]))}/></div></div>;
}
