import { useEffect,useState } from "react";
import { getMyBookmarks,removeBookmark } from "../api/bookmarkApi";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function BookmarksPage(){
 const [items,setItems]=useState(null),[error,setError]=useState("");
 useEffect(()=>{getMyBookmarks().then(setItems).catch(e=>setError(e.message))},[]);
 async function remove(id){try{await removeBookmark(id);setItems(cur=>cur.filter(x=>x.scheme_id!==id))}catch(e){setError(e.message)}}
 if(error)return <div className="gov-container py-10"><ErrorMessage message={error}/></div>;
 if(!items)return <Loading label="Loading saved schemes..."/>;
 return <div className="gov-container py-10"><div className="mb-7"><div className="gov-eyebrow">Farmer services</div><h1 className="mt-2 text-3xl font-extrabold">Saved Schemes</h1></div>
 <div className="space-y-3">{items.map(x=><div key={x.bookmark_id} className="gov-card flex items-center justify-between gap-4 p-5"><div><div className="text-sm font-bold">Scheme #{x.scheme_id}</div><div className="mt-1 text-xs text-slate-500">Saved item #{x.bookmark_id}</div></div><button className="gov-button gov-button-muted" onClick={()=>remove(x.scheme_id)}>Remove</button></div>)}{!items.length&&<div className="gov-card p-6 text-sm text-slate-600">You have not saved any schemes yet.</div>}</div></div>;
}
