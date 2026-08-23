export default async function handler(req,res){
 if(req.method!=='PATCH')return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,adminKey=process.env.ADMIN_DASHBOARD_KEY;
 if(!adminKey||req.headers['x-admin-key']!==adminKey)return res.status(401).json({error:'Unauthorized'});
 if(!base||!key)return res.status(500).json({error:'Admin Supabase service-role environment variable is missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const tableMap={buyers:'buyer_requests',services:'service_requests',sellers:'asset_requests',suppliers:'supplier_profiles',matches:'marketplace_matches'};
  const table=tableMap[b.type],id=String(b.id||''),status=String(b.status||'').trim();
  const allowed=['new','reviewing','contacted','matched','approved','published','closed','rejected'];
  if(!table||!id||!allowed.includes(status))return res.status(400).json({error:'Invalid type, id or status'});
  const h={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'};
  const r=await fetch(`${base}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:h,body:JSON.stringify({status})});
  const t=await r.text();if(!r.ok)return res.status(r.status).send(t);
  return res.status(200).send(t||'[]');
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'})}
}
