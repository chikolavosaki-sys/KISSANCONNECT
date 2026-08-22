import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CircleHelp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/ui/FormField";
import SectionHeading from "../components/ui/SectionHeading";
import * as options from "../data/options";
import { getStateOptions, getDistrictOptions } from "../services/locationService";
import useAuth from "../hooks/useAuth";
import { updateMyProfile } from "../api/farmerApi";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useLanguage } from "../context/LanguageContext";

const initialForm = {
  name:"", phone:"", password:"", confirmPassword:"",
  stateId:"", districtId:"", pincode:"", addressLine:"", village:"", block:"", occupation:"",
  category:"", gender:"", age:"", differentlyAbled:"", annualIncome:"",
  landSize:"", landUnit:"Acres", landType:"", soilType:"", irrigationType:"", irrigationSource:"",
  primaryCrop:"", season:"", mechanization:[], livestock:[], enamRegistered:"", mspId:"",
  electricityConnection:"", electricityUnits:"", lpgStatus:"", houseType:"", rooms:"",
  vehicleOwned:"", bankAccount:"", kccStatus:"", loanStatus:"", intents:[]
};

const steps = [
  ["Identity & Location","Account, identity and location"],
  ["Land & Farming","Farm and cultivation profile"],
  ["Economic Profile","Household and asset indicators"],
  ["Scheme Interests","What support are you looking for?"],
  ["Review","Confirm your information"]
];

export default function FarmerRegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { translate } = useLanguage();
  const [step,setStep] = useState(0);
  const [form,setForm] = useState(initialForm);
  const [states,setStates] = useState([]);
  const [districts,setDistricts] = useState([]);
  const [submitting,setSubmitting] = useState(false);
  const [successId,setSuccessId] = useState(null);
  const [error,setError] = useState("");

  useEffect(() => {
    getStateOptions().then(setStates).catch(e => setError(e.message));
  }, []);

  const selectedState = useMemo(() => states.find(s => Number(s.value) === Number(form.stateId)), [states, form.stateId]);

  function update(key,value){ setForm(cur => ({...cur,[key]:value})); }

  async function changeState(value){
    const stateId = Number(value);
    update("stateId",stateId);
    update("districtId","");
    setError("");
    try { setDistricts(await getDistrictOptions(stateId)); }
    catch(e){ setError(e.message); }
  }

  function toggleArray(key,value){
    setForm(cur => {
      const values=cur[key];
      return {...cur,[key]:values.includes(value)?values.filter(x=>x!==value):[...values,value]};
    });
  }

  function canContinue(){
    if(step===0) return Boolean(
      form.name && /^\d{10}$/.test(form.phone) && form.password.length>=8 &&
      form.password===form.confirmPassword && form.stateId && form.districtId &&
      /^\d{6}$/.test(form.pincode) && form.addressLine && form.village &&
      form.category && form.gender && Number(form.age)>=18 && Number(form.age)<=100
    );
    if(step===1) return Boolean(form.landSize && form.landType && form.soilType && form.irrigationType && form.irrigationSource && form.primaryCrop && form.season);
    if(step===2) return Boolean(form.electricityConnection && form.lpgStatus && form.houseType && form.vehicleOwned && form.bankAccount && form.kccStatus && form.loanStatus);
    if(step===3) return form.intents.length>0;
    return true;
  }

  async function submit(){
    setSubmitting(true); setError("");
    try{
      const user = await register({
        phone:form.phone,
        password:form.password,
        full_name:form.name,
        age:Number(form.age),
        gender:form.gender,
        state_id:Number(form.stateId),
        district_id:Number(form.districtId),
        pincode:Number(form.pincode),
        address_line:form.addressLine,
        village:form.village || null,
        block:form.block || null,
        occupation:form.occupation || null,
        annual_income_inr:form.annualIncome===""?null:Number(form.annualIncome),
        social_category:form.category || null
      });

      const acres = form.landUnit==="Hectares" ? Number(form.landSize)*2.47105 : Number(form.landSize);
      const differentlyAbled = form.differentlyAbled==="Yes" ? true : form.differentlyAbled==="No" ? false : null;

      await updateMyProfile({
        differently_abled:differentlyAbled,
        land_owned_acres:acres,
        land_ownership_type:form.landType,
        irrigation_source:form.irrigationSource,
        primary_crop:form.primaryCrop,
        cropping_pattern:form.season,
        soil_type:form.soilType,
        farm_mechanization_level:form.mechanization.join(", ") || null,
        livestock_ownership:form.livestock.join(", ") || null,
        electricity_conn:form.electricityConnection,
        lpg_conn:form.lpgStatus,
        vehicle_ownership:form.vehicleOwned,
        bank_account:form.bankAccount,
        kisan_credit_card:form.kccStatus,
        existing_loan_indebtedness:form.loanStatus,
        crop_insurance_pmfby:form.intents.includes("Crop Insurance") ? "Interested" : null
      });

      setSuccessId(user.farmer_id);
    }catch(e){ setError(e.message); }
    finally{ setSubmitting(false); }
  }

  if(successId) return (
    <div className="gov-container py-14">
      <div className="gov-card mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><Check size={28}/></div>
        <div className="mt-5 gov-eyebrow">{translate("registrationSuccessful")}</div>
        <h1 className="mt-2 text-2xl font-extrabold">{translate("profileCreated")}</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">{translate("profileSaved")}</p>
        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Farmer ID</div>
          <div className="mt-1 text-xl font-extrabold text-emerald-800">{successId}</div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button className="gov-button gov-button-primary" onClick={()=>navigate("/farmer/dashboard")}>{translate("openDashboard")}</button>
          <Link className="gov-button gov-button-muted" to="/">{translate("backHome")}</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="gov-container py-10">
      <div className="mb-8">
        <div className="text-sm text-slate-500"><Link to="/" className="text-emerald-800 hover:underline">{translate("home")}</Link> / {translate("registration")}</div>
        <h1 className="mt-3 text-3xl font-extrabold">{translate("newRegistration")}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{translate("completeProfile")}</p>
      </div>

      {error && <div className="mb-5"><ErrorMessage message={error}/></div>}

      <div className="gov-card mb-6 overflow-hidden">
        <div className="hidden border-b border-slate-200 md:grid md:grid-cols-5">
          {steps.map(([title,subtitle],i)=>(
            <button key={title} type="button" onClick={()=>i<step&&setStep(i)} className={`border-r border-slate-200 p-4 text-left last:border-r-0 ${i===step?"bg-emerald-50":""}`}>
              <div className={`text-xs font-extrabold ${i<=step?"text-emerald-800":"text-slate-400"}`}>STEP {i+1}</div>
              <div className="mt-1 text-sm font-bold">{title}</div><div className="mt-1 text-xs text-slate-500">{subtitle}</div>
            </button>
          ))}
        </div>
        <div className="p-4 md:hidden"><div className="text-xs font-bold uppercase tracking-wider text-emerald-800">{translate("step")} {step+1} {translate("of")} {steps.length}</div><div className="mt-1 font-bold">{steps[step][0]}</div></div>
      </div>

      <div className="gov-card p-6 sm:p-8">
        {step===0 && <>
          <SectionHeading title="Identity & Location" description="State and district are loaded directly from the PostgreSQL-backed location APIs."/>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FormField label="Full Name" required><input className="gov-input" value={form.name} onChange={e=>update("name",e.target.value)} /></FormField>
            <FormField label="Mobile Number" required><input className="gov-input" value={form.phone} onChange={e=>update("phone",e.target.value.replace(/\D/g,"").slice(0,10))} inputMode="numeric"/></FormField>
            <FormField label="Password" required hint="Minimum 8 characters."><input className="gov-input" type="password" value={form.password} onChange={e=>update("password",e.target.value)} /></FormField>
            <FormField label="Confirm Password" required><input className="gov-input" type="password" value={form.confirmPassword} onChange={e=>update("confirmPassword",e.target.value)} /></FormField>
            <FormField label="State" required><select className="gov-select" value={form.stateId} onChange={e=>changeState(e.target.value)}><option value="">Select State</option>{states.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}</select></FormField>
            <FormField label="District" required><select className="gov-select" value={form.districtId} onChange={e=>update("districtId",Number(e.target.value))} disabled={!form.stateId}><option value="">{form.stateId?"Select District":"Select State first"}</option>{districts.map(d=><option key={d.value} value={d.value}>{d.label}</option>)}</select></FormField>
            <FormField label="Pincode" required><input className="gov-input" value={form.pincode} onChange={e=>update("pincode",e.target.value.replace(/\D/g,"").slice(0,6))} inputMode="numeric"/></FormField>
            <FormField label="Address" required><input className="gov-input" value={form.addressLine} onChange={e=>update("addressLine",e.target.value)}/></FormField>
            <FormField label="Village / Town" required><input className="gov-input" value={form.village} onChange={e=>update("village",e.target.value)}/></FormField>
            <FormField label="Block"><input className="gov-input" value={form.block} onChange={e=>update("block",e.target.value)}/></FormField>
            <FormField label="Occupation"><input className="gov-input" value={form.occupation} onChange={e=>update("occupation",e.target.value)}/></FormField>
            <FormField label="Social Category" required><select className="gov-select" value={form.category} onChange={e=>update("category",e.target.value)}><option value="">Select</option>{options.categories.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Gender" required><select className="gov-select" value={form.gender} onChange={e=>update("gender",e.target.value)}><option value="">Select</option>{options.genders.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Age" required><input className="gov-input" value={form.age} onChange={e=>update("age",e.target.value.replace(/\D/g,"").slice(0,3))} inputMode="numeric"/></FormField>
            <FormField label="Differently Abled"><select className="gov-select" value={form.differentlyAbled} onChange={e=>update("differentlyAbled",e.target.value)}><option value="">Select</option>{options.yesNo.map(x=><option key={x}>{x}</option>)}</select></FormField>
          </div>
        </>}

        {step===1 && <>
          <SectionHeading title="Land & Farming Profile" description="These fields are mapped to the farmer profile fields used by the backend."/>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FormField label="Farm Size" required><input className="gov-input" value={form.landSize} onChange={e=>update("landSize",e.target.value)} inputMode="decimal"/></FormField>
            <FormField label="Unit"><select className="gov-select" value={form.landUnit} onChange={e=>update("landUnit",e.target.value)}>{options.landUnits.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Land Ownership Type" required><select className="gov-select" value={form.landType} onChange={e=>update("landType",e.target.value)}><option value="">Select</option>{options.landTypes.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Soil Type" required><select className="gov-select" value={form.soilType} onChange={e=>update("soilType",e.target.value)}><option value="">Select</option>{options.soilTypes.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Irrigation Type" required><select className="gov-select" value={form.irrigationType} onChange={e=>update("irrigationType",e.target.value)}><option value="">Select</option>{options.irrigationTypes.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Irrigation Source" required><select className="gov-select" value={form.irrigationSource} onChange={e=>update("irrigationSource",e.target.value)}><option value="">Select</option>{options.irrigationSources.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Primary Crop" required><input className="gov-input" value={form.primaryCrop} onChange={e=>update("primaryCrop",e.target.value)}/></FormField>
            <FormField label="Cropping Season" required><select className="gov-select" value={form.season} onChange={e=>update("season",e.target.value)}><option value="">Select</option>{options.seasons.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="e-NAM Registered"><select className="gov-select" value={form.enamRegistered} onChange={e=>update("enamRegistered",e.target.value)}><option value="">Select</option>{options.yesNo.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="MSP Procurement ID"><input className="gov-input" value={form.mspId} onChange={e=>update("mspId",e.target.value)} placeholder="Optional"/></FormField>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-6"><div className="text-sm font-bold">Farm Mechanization</div><div className="mt-3 flex flex-wrap gap-2">{options.mechanization.map(x=><ChoiceChip key={x} label={x} selected={form.mechanization.includes(x)} onClick={()=>toggleArray("mechanization",x)}/>)}</div></div>
          <div className="mt-6"><div className="text-sm font-bold">Livestock Owned</div><div className="mt-3 flex flex-wrap gap-2">{options.livestock.map(x=><ChoiceChip key={x} label={x} selected={form.livestock.includes(x)} onClick={()=>toggleArray("livestock",x)}/>)}</div></div>
        </>}

        {step===2 && <>
          <SectionHeading title="Economic & Household Profile" description="These observable proxies support the project's EVI heuristic."/>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FormField label="Annual Income (₹)"><input className="gov-input" type="number" min="0" value={form.annualIncome} onChange={e=>update("annualIncome",e.target.value)}/></FormField>
            <FormField label="Electricity Connection" required><select className="gov-select" value={form.electricityConnection} onChange={e=>update("electricityConnection",e.target.value)}><option value="">Select</option>{options.electricityConnections.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Average Electricity Units / Month"><input className="gov-input" value={form.electricityUnits} onChange={e=>update("electricityUnits",e.target.value.replace(/\D/g,"").slice(0,4))}/></FormField>
            <FormField label="LPG Connection" required><select className="gov-select" value={form.lpgStatus} onChange={e=>update("lpgStatus",e.target.value)}><option value="">Select</option>{options.lpgStatuses.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="House Type" required><select className="gov-select" value={form.houseType} onChange={e=>update("houseType",e.target.value)}><option value="">Select</option>{options.houseTypes.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Number of Rooms"><input className="gov-input" value={form.rooms} onChange={e=>update("rooms",e.target.value.replace(/\D/g,"").slice(0,2))}/></FormField>
            <FormField label="Vehicle Ownership" required><select className="gov-select" value={form.vehicleOwned} onChange={e=>update("vehicleOwned",e.target.value)}><option value="">Select</option>{options.vehicles.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Bank Account" required><select className="gov-select" value={form.bankAccount} onChange={e=>update("bankAccount",e.target.value)}><option value="">Select</option>{options.bankStatuses.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Kisan Credit Card (KCC)" required><select className="gov-select" value={form.kccStatus} onChange={e=>update("kccStatus",e.target.value)}><option value="">Select</option>{options.kccStatuses.map(x=><option key={x}>{x}</option>)}</select></FormField>
            <FormField label="Existing Loan / Debt" required><select className="gov-select" value={form.loanStatus} onChange={e=>update("loanStatus",e.target.value)}><option value="">Select</option>{options.loanStatuses.map(x=><option key={x}>{x}</option>)}</select></FormField>
          </div>
          <div className="mt-6 flex gap-3 rounded-md border border-blue-200 bg-blue-50 p-4 text-xs leading-5 text-blue-900"><CircleHelp size={17}/><span>The EVI is a prioritization heuristic, not an official eligibility decision.</span></div>
        </>}

        {step===3 && <>
          <SectionHeading title="Scheme Interests" description="Select the areas where you are currently looking for support."/>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.intents.map(x=><ChoiceChip key={x} label={x} selected={form.intents.includes(x)} onClick={()=>toggleArray("intents",x)} large/>)}</div>
        </>}

        {step===4 && <>
          <SectionHeading title="Review & Consent" description="Review the information before submitting."/>
          <div className="grid gap-4 md:grid-cols-2">
            <ReviewItem label="Name" value={form.name}/><ReviewItem label="Mobile" value={form.phone}/>
            <ReviewItem label="State / District" value={`${selectedState?.label||form.stateId} / ${districts.find(d=>Number(d.value)===Number(form.districtId))?.label||form.districtId}`}/>
            <ReviewItem label="Address" value={`${form.addressLine}, ${form.village}, ${form.pincode}`}/>
            <ReviewItem label="Category / Gender / Age" value={`${form.category} / ${form.gender} / ${form.age}`}/>
            <ReviewItem label="Farm" value={`${form.landSize} ${form.landUnit}, ${form.landType}`}/>
            <ReviewItem label="Crop / Season" value={`${form.primaryCrop} / ${form.season}`}/>
            <ReviewItem label="Irrigation" value={`${form.irrigationType} / ${form.irrigationSource}`}/>
            <ReviewItem label="Household" value={`${form.houseType}, ${form.lpgStatus}, ${form.vehicleOwned}`}/>
            <ReviewItem label="Bank / KCC" value={`${form.bankAccount} / ${form.kccStatus}`}/>
            <ReviewItem label="Interests" value={form.intents.join(", ")}/>
          </div>
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">The platform does not store raw Aadhaar or bank-account numbers in this form.</div>
        </>}

        <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <button className="gov-button gov-button-muted" type="button" disabled={step===0||submitting} onClick={()=>setStep(v=>v-1)}><ChevronLeft size={17} className="mr-1"/> {translate("previous")}</button>
          {step<steps.length-1 ? <button className="gov-button gov-button-primary" type="button" disabled={!canContinue()||submitting} onClick={()=>setStep(v=>v+1)}>{translate("continue")} <ChevronRight size={17} className="ml-1"/></button> :
          <button className="gov-button gov-button-primary" type="button" disabled={submitting} onClick={submit}>{submitting?translate("creatingAccount"):translate("submitRegistration")}</button>}
        </div>
      </div>
    </div>
  );
}

function ChoiceChip({label,selected,onClick,large=false}) {
  return <button type="button" onClick={onClick} className={`rounded-md border px-3 py-2 text-left text-sm font-medium transition ${large?"min-h-14":""} ${selected?"border-emerald-700 bg-emerald-50 text-emerald-900":"border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50"}`}>{selected?"✓ ":""}{label}</button>;
}
function ReviewItem({label,value}) {
  return <div className="rounded-md border border-slate-200 p-4"><div className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div><div className="mt-1 text-sm font-semibold">{value||"—"}</div></div>;
}
