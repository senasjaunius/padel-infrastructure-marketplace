export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,adminKey=process.env.ADMIN_DASHBOARD_KEY;
 if(!adminKey||req.headers['x-admin-key']!==adminKey)return res.status(401).json({error:'Unauthorized'});
 if(!base||!key)return res.status(500).json({error:'Admin Supabase service-role environment variable is missing'});
 const h={apikey:key,Authorization:`Bearer ${key}`};
 try{
  const [buyers,services,sellers,matches,suppliers]=await Promise.all([
   fetch(`${base}/rest/v1/buyer_requests?select=*&order=created_at.desc`,{headers:h}),
   fetch(`${base}/rest/v1/service_requests?select=*&order=created_at.desc`,{headers:h}),
   fetch(`${base}/rest/v1/asset_requests?select=*&order=created_at.desc`,{headers:h}),
   fetch(`${base}/rest/v1/marketplace_matches?select=*&order=created_at.desc`,{headers:h}),
   fetch(`${base}/rest/v1/supplier_profiles?select=*&order=created_at.desc`,{headers:h})
  ]);
  const read=async r=>{const t=await r.text();if(!r.ok)throw new Error(t.slice(0,220));return JSON.parse(t)};
  return res.status(200).json({buyers:await read(buyers),services:await read(services),sellers:await read(sellers),matches:await read(matches),suppliers:await read(suppliers)});
 }catch(e){return res.status(500).json({error:e?.message||'Unable to load dashboard'})}
}
