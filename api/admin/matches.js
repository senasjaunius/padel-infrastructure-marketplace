export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,adminKey=process.env.ADMIN_DASHBOARD_KEY;
 if(!adminKey||req.headers['x-admin-key']!==adminKey)return res.status(401).json({error:'Unauthorized'});
 if(!base||!key)return res.status(500).json({error:'Admin Supabase service-role environment variable is missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
  if(!b?.buyer_id||!b?.seller_id)return res.status(400).json({error:'Buyer and seller are required'});
  const h={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation'};
  const payload={buyer_request_id:b.buyer_id,seller_request_id:b.seller_id,status:'new',notes:String(b.notes||'').trim()||null};
  const r=await fetch(`${base}/rest/v1/marketplace_matches`,{method:'POST',headers:h,body:JSON.stringify(payload)});const t=await r.text();if(!r.ok)return res.status(r.status).send(t);
  return res.status(201).send(t);
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'})}
}