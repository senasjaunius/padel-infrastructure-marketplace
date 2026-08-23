import { notifyAdmin } from './_notify.js';

export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const email=String(b.email||'').trim(),service=String(b.service||'').trim(),name=String(b.name||b.company||'').trim(),country=String(b.country||'').trim();
  if(!email||!service||!name||!country)return res.status(400).json({error:'Name/company, country, service and email are required'});
  const payload={name,email,country,city:String(b.city||'').trim()||null,service,court_count:b.court_count?Math.max(1,Number(b.court_count)):null,details:String(b.details||'').trim()||null,status:'new'};
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'};
  const r=await fetch(`${base}/rest/v1/service_requests`,{method:'POST',headers,body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);
  await notifyAdmin('New PADEL TRADE service request',`${service}\n${name} · ${country}${b.city?' · '+b.city:''}\nCourts: ${b.court_count||'not specified'}\nEmail: ${email}`);
  return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}
