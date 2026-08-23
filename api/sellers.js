export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
  const payload={company_name:b.company||'',country:b.country||'',city:b.city||'',email:b.email||''};
  const r=await fetch(`${base}/rest/v1/sellers`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(payload)});
  const text=await r.text(); if(!r.ok)return res.status(r.status).send(text); return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:'Invalid request'});}
}