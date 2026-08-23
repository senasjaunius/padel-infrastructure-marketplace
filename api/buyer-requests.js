export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!base||!key)return res.status(500).json({error:'Supabase environment variables are missing'});
 try{
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const company=String(b.company||'').trim(),email=String(b.email||'').trim(),country=String(b.country||'').trim();
  if(!company||!email||!country)return res.status(400).json({error:'Company, email and country are required'});
  const extra=[b.indoor_outdoor?`Indoor/outdoor: ${b.indoor_outdoor}`:'',b.transport_installation==='true'?'Transport / installation may be required.':'',b.needed_by?`Needed by: ${b.needed_by}`:''].filter(Boolean).join('\n');
  const details=[String(b.details||'').trim(),extra].filter(Boolean).join('\n\n')||null;
  const payload={company,email,country,city:String(b.city||'').trim()||null,court_count:Math.max(1,Number(b.court_count||1)),preferred_year_from:b.preferred_year_from?Number(b.preferred_year_from):null,preferred_year_to:b.preferred_year_to?Number(b.preferred_year_to):null,manufacturer:String(b.manufacturer||'').trim()||null,model:String(b.model||'').trim()||null,max_budget_eur:b.max_budget_eur?Number(b.max_budget_eur):null,condition:String(b.condition||'').trim()||null,details};
  const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'};
  const r=await fetch(`${base}/rest/v1/buyer_requests`,{method:'POST',headers,body:JSON.stringify(payload)});
  const text=await r.text();if(!r.ok)return res.status(r.status).send(text);
  return res.status(201).json({ok:true});
 }catch(e){return res.status(400).json({error:e?.message||'Invalid request'});}
}
