// Vercel Serverless Function: Send contact form via EmailJS server-side
// Env vars required on Vercel:
// - EMAILJS_PRIVATE_KEY
// - EMAILJS_SERVICE_ID
// - EMAILJS_TEMPLATE_ID
// Optional:
// - EMAILJS_REPLY_TO (fallback email if form email missing)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      service = '',
      vehicle = '',
      timeframe = '',
      message = ''
    } = req.body || {};

    // Basic validation
    if (!firstName || !lastName || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

    if (!PRIVATE_KEY || !SERVICE_ID || !TEMPLATE_ID) {
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
