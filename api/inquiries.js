export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) return res.status(500).json({ error: 'Supabase environment variables are missing' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const r = await fetch(`${base}/rest/v1/inquiries`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(body)
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);
    return res.status(201).json({ ok: true });
  } catch (e) { return res.status(400).json({ error: 'Invalid request' }); }
}