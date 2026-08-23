import { notifyAdmin } from './_notify.js';

export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const name=String(b.company||b.name||'').trim(),email=String(b.email||'').trim(),country=String(b.country||'').trim();
  if(!name||!email||!country)return res.status(400).json({error:'Name/company, email and country are required'});
  const extra=[b.model?`Preferred model: ${String(b.model).trim()}`:'',b.preferred_year_from?`Minimum year: ${b.preferred_year_from}`:'',b.preferred_year_to?`Maximum year: ${b.preferred_year_to}`:''].filter(Boolean).join('\n');
  const details=[String(b.details||'').trim(),extra].filter(Boolean).join('\n\n')||null;
  const payload={name,email,country,city:String(b.city||'').trim()||null,court_count:Math.max(1,Number(b.court_count||1)),location_notes:null,indoor_outdoor:String(b.indoor_outdoor||'').trim()||null,condition:String(b.condition||'').trim()||null,budget_eur:b.max_budget_eur?Number(b.max_budget_eur):null,preferred_manufacturer:String(b.manufacturer||'').trim()||null,needed_by:b.needed_by||null,transport_installation:b.transport_installation==='true',details,status:'new'};
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'};
  const r=await fetch(`${base}/rest/v1/buyer_requests`,{method:'POST',headers,body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);
  await notifyAdmin('New PADEL TRADE buyer request',`${name} · ${country}${b.city?' · '+b.city:''}\nCourts: ${payload.court_count}\nBudget: ${payload.budget_eur||'not specified'}\nEmail: ${email}`);
  return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}
