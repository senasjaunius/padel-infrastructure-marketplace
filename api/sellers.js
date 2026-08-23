import { notifyAdmin } from './_notify.js';

export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
  const company=String(b.company||'').trim(),country=String(b.country||'').trim(),email=String(b.email||'').trim();
  if(!company||!country||!email)return res.status(400).json({error:'Company, country and email are required'});
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
  const sellerPayload={company_name:company,country,city:String(b.city||'').trim(),email};
  const sr=await fetch(`${base}/rest/v1/sellers`,{method:'POST',headers:{...headers,Prefer:'return=representation'},body:JSON.stringify(sellerPayload)});
  const st=await sr.text(); if(!sr.ok)return res.status(sr.status).send(st);
  let seller; try{seller=JSON.parse(st)[0]}catch{seller=null}
  const requestPayload={seller_id:seller?.id||null,company,email,country,city:String(b.city||'').trim(),court_count:Math.max(1,Number(b.count||1)),year_installed:b.year?Number(b.year):null,manufacturer:String(b.manufacturer||'').trim()||null,model:String(b.model||'').trim()||null,glass_thickness_mm:b.glass_thickness_mm?Number(b.glass_thickness_mm):null,condition:String(b.condition||'').trim()||null,turf_condition:String(b.turf_condition||'').trim()||null,lighting_included:b.lighting_included==='true',asking_price_eur:b.asking_price_eur?Number(b.asking_price_eur):null,photo_urls:String(b.photo_urls||'').trim()||null,details:String(b.details||'').trim()||null};
  const rr=await fetch(`${base}/rest/v1/asset_requests`,{method:'POST',headers:{...headers,Prefer:'return=minimal'},body:JSON.stringify(requestPayload)});
  const rt=await rr.text(); if(!rr.ok)return res.status(rr.status).send(rt);
  await notifyAdmin('New PADEL TRADE court submission',`${company} · ${country}${b.city?' · '+b.city:''}\nCourts: ${requestPayload.court_count}\n${requestPayload.manufacturer||''} ${requestPayload.model||''}\nEmail: ${email}`);
  return res.status(201).json({ok:true,seller_id:seller?.id||null});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}
