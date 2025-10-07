// Vercel Serverless Function: Send contact form via EmailJS server-side
// Env vars required on Vercel:
// - EMAILJS_PRIVATE_KEY
// - EMAILJS_SERVICE_ID
// - EMAILJS_TEMPLATE_ID
// Optional:
// - EMAILJS_REPLY_TO (fallback email if form email missing)

export default async function handler(req, res) {
  // CORS headers (safe for same-origin and cross-origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'send-contact OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel Node functions usually provide parsed JSON in req.body,
    // but be defensive if it's a string or undefined.
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    if (!body) {
      // Attempt to read raw buffer (rare)
      body = {};
    }

    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      service = '',
      vehicle = '',
      timeframe = '',
      message = ''
    } = body;

    // Basic validation
    if (!firstName || !lastName || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY; // EmailJS 'user_id'
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

    if (!PRIVATE_KEY || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      return res.status(500).json({ error: 'Server email configuration is missing' });
    }

    const template_params = {
      firstName,
      lastName,
      email,
      phone,
      service,
      vehicle,
      timeframe,
      message,
      from_name: `${firstName} ${lastName}`,
      reply_to: email || process.env.EMAILJS_REPLY_TO || ''
    };

    // EmailJS server-side REST call with Private Key
    const resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PRIVATE_KEY}`
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: 'EmailJS error', detail: text });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', detail: String(err?.message || err) });
  }
}
