// pages/api/lead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  try {
    const lead = req.body || {};
    // Minimal validation
    const payload = {
      name: String(lead.name || '').slice(0, 120),
      phone: String(lead.phone || '').slice(0, 60),
      service: String(lead.service || '').slice(0, 120),
      location: String(lead.location || '').slice(0, 120),
      keyword: String(lead.keyword || '').slice(0, 200),
      source: String(lead.source || '').slice(0, 120),
      action: String(lead.action || 'submit').slice(0, 60),
      page: String(lead.page || 'landing').slice(0, 60),
      ts: Number(lead.ts || Date.now()),
      ip: (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString(),
      ua: (req.headers['user-agent'] || '').toString(),
    };

    // ✅ For now: log. Later: push to Sheets/CRM.
    console.log('LEAD_CAPTURED', payload);

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}
