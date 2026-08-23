export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const email=String(b.email||'').trim();
  const country=String(b.country||'').trim();
  if(!email||!country)return res.status(400).json({error:'Email and country are required'});
  const payload={name:String(b.name||'').trim()||null,email,country,city:String(b.city||'').trim()||null,court_count:Math.max(1,Number(b.court_count||1)),location_notes:String(b.location_notes||'').trim()||null,indoor_outdoor:String(b.indoor_outdoor||'').trim()||null,condition:String(b.condition||'').trim()||null,budget_eur:b.budget_eur?Number(b.budget_eur):null,preferred_manufacturer:String(b.preferred_manufacturer||'').trim()||null,needed_by:String(b.needed_by||'').trim()||null,transport_installation:b.transport_installation==='true',details:String(b.details||'').trim()||null};
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'};
  const r=await fetch(`${base}/rest/v1/buyer_requests`,{method:'POST',headers,body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);
  return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}