export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body; let asset_id=null;
  if(b.court_id){const ar=await fetch(`${base}/rest/v1/assets?court_id=eq.${encodeURIComponent(b.court_id)}&select=id&limit=1`,{headers:{apikey:key,Authorization:`Bearer ${key}`}});const a=await ar.json();if(a[0])asset_id=a[0].id;}
  const payload={asset_id,buyer_company:b.buyer_company||'',buyer_country:b.buyer_country||'',buyer_email:b.buyer_email||'',message:b.message||''};
  const r=await fetch(`${base}/rest/v1/inquiries`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:'Invalid request'});}
}