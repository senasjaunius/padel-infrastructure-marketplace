export default async function handler(req,res){
 if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const adminKey=process.env.ADMIN_DASHBOARD_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 if(!adminKey||req.headers['x-admin-key']!==adminKey)return res.status(401).json({error:'Unauthorized'});
 const headers={apikey:key,Authorization:`Bearer ${key}`};
 try{
  const [buyers,services,sellers]=await Promise.all([
   fetch(`${base}/rest/v1/buyer_requests?select=*&order=created_at.desc`,{headers}),
   fetch(`${base}/rest/v1/service_requests?select=*&order=created_at.desc`,{headers}),
   fetch(`${base}/rest/v1/asset_requests?select=*&order=created_at.desc`,{headers})
  ]);
  const read=async r=>{const t=await r.text();if(!r.ok)throw new Error(t.slice(0,220));return JSON.parse(t)};
  return res.status(200).json({buyers:await read(buyers),services:await read(services),sellers:await read(sellers)});
 }catch(e){return res.status(500).json({error:e?.message||'Unable to load dashboard'});}
}