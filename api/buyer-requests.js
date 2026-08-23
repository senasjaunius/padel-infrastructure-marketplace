import { notifyAdmin } from './_notify.js';

export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const company=String(b.company||b.name||'').trim(),email=String(b.email||'').trim(),country=String(b.country||'').trim();
  if(!company||!email||!country)return res.status(400).json({error:'Company/name, email and country are required'});
  const payload={
   company,email,country,
   city:String(b.city||'').trim()||null,
   court_count:Math.max(1,Number(b.court_count||1)),
   preferred_year_from:b.preferred_year_from?Number(b.preferred_year_from):null,
   preferred_year_to:b.preferred_year_to?Number(b.preferred_year_to):null,
   manufacturer:String(b.manufacturer||'').trim()||null,
   model:String(b.model||'').trim()||null,
   max_budget_eur:b.max_budget_eur?Number(b.max_budget_eur):null,
   condition:String(b.condition||'').trim()||null,
   details:String(b.details||'').trim()||null,
   status:'new'
  };
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'};
  const r=await fetch(`${base}/rest/v1/buyer_requests`,{method:'POST',headers,body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);
  await notifyAdmin('New PADEL TRADE buyer request',`${company} · ${country}${b.city?' · '+b.city:''}\nCourts: ${payload.court_count}\nBudget: ${payload.max_budget_eur||'not specified'}\nEmail: ${email}`);
  return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}
