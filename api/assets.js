export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) return res.status(500).json({ error: 'Supabase environment variables are missing' });
  const url = `${base}/rest/v1/assets?select=court_id,manufacturer,model,country,city,year_installed,type,grade,glass_thickness_mm,asking_price_eur,turf_condition,structure_condition,lighting_included,fip_status,description,status&order=created_at.desc`;
  try {
    const r = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);
    return res.status(200).json(JSON.parse(text));
  } catch (e) { return res.status(500).json({ error: 'Could not reach Supabase' }); }
}