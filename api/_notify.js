export async function notifyAdmin(subject, text) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || 'PADEL TRADE <onboarding@resend.dev>';
  if (!apiKey || !to) return { sent: false, skipped: true };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, text })
    });
    if (!r.ok) return { sent: false, skipped: false };
    return { sent: true, skipped: false };
  } catch {
    return { sent: false, skipped: false };
  }
}
