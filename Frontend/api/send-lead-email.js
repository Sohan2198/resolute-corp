// Vercel serverless function: POST /api/send-lead-email
// Sends (1) a confirmation with the deck link to the lead and (2) the full lead
// details to the Resolute Sports inbox, through the GoDaddy mailbox over SMTP.
// Credentials come from environment variables (Vercel > Settings > Environment
// Variables, or Frontend/.env.local when testing locally). Never hard-code them.
const nodemailer = require('nodemailer');

const FROM_NAME = 'Resolute Sports';
const DECK_PATH = '/PVL-Season-5-Sponsorship-Deck.pdf';
const ALLOWED_ORIGINS = [/^https:\/\/(www\.)?resolutecorp\.in$/, /^https:\/\/[\w-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS = ['name', 'email', 'phone', 'company', 'designation', 'interest', 'budget_range'];
const TRACKING = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];

/* Basic per-IP throttle. Serverless instances are short-lived, so this only
   slows down bursts against one warm instance; it is not a hard limit. */
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max = 200) => String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);

function leadEmail(lead, deckUrl) {
  const first = esc(lead.name.split(' ')[0]);
  const text =
    `Hi ${lead.name.split(' ')[0]},\n\n` +
    `Thank you for your interest in sponsoring Delhi Toofans in PVL Season 5.\n\n` +
    `Download the Season 5 sponsorship deck here:\n${deckUrl}\n\n` +
    `Our partnerships team will call you within 2 working days to discuss your objectives and budget.\n\n` +
    `Regards,\nResolute Sports Private Limited\ncontact@resolutesports.in`;
  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1F1A24;max-width:560px">
  <p>Hi ${first},</p>
  <p>Thank you for your interest in sponsoring <strong>Delhi Toofans</strong> in <strong>PVL Season 5</strong>.</p>
  <p style="margin:24px 0">
    <a href="${esc(deckUrl)}" style="background:#3B0067;color:#ffffff;padding:12px 22px;text-decoration:none;font-weight:bold;display:inline-block">Download the Season 5 deck</a>
  </p>
  <p>Our partnerships team will call you within 2 working days to discuss your objectives and budget.</p>
  <p>Regards,<br>Resolute Sports Private Limited<br><a href="mailto:contact@resolutesports.in">contact@resolutesports.in</a></p>
</div>`;
  return { subject: 'Your PVL Season 5 sponsorship deck | Delhi Toofans', text, html };
}

function notifyEmail(lead, tracking) {
  const rows = [
    ['Name', lead.name], ['Work email', lead.email], ['Phone / WhatsApp', lead.phone],
    ['Company', lead.company], ['Designation', lead.designation],
    ['Interested in', lead.interest], ['Indicative budget', lead.budget_range],
    ...TRACKING.filter(k => tracking[k]).map(k => [k, tracking[k]]),
    ['Submitted at', new Date().toISOString()],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table style="font-family:Arial,Helvetica,sans-serif;font-size:14px;border-collapse:collapse">${
    rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5C5F68">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join('')
  }</table>`;
  return { subject: `New sponsorship lead: ${lead.name} (${lead.company})`, text, html };
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method-not-allowed' });
  if (!ALLOWED_ORIGINS.some(re => re.test(origin))) return res.status(403).json({ ok: false, error: 'forbidden' });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('lead-email: SMTP environment variables are not set');
    return res.status(500).json({ ok: false, error: 'not-configured' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  if (throttled(ip)) return res.status(429).json({ ok: false, error: 'too-many-requests' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (body.website) return res.status(200).json({ ok: true });              // honeypot
  const lead = Object.fromEntries(FIELDS.map(k => [k, clean(body[k])]));
  const tracking = Object.fromEntries(TRACKING.map(k => [k, clean(body[k])]));
  if (!lead.name || !EMAIL_RE.test(lead.email) || !lead.phone || !lead.company) {
    return res.status(400).json({ ok: false, error: 'invalid-lead' });
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const from = `"${FROM_NAME}" <${SMTP_USER}>`;
  const deckUrl = `${origin.startsWith('http://localhost') ? origin : 'https://www.resolutecorp.in'}${DECK_PATH}`;

  try {
    await transport.sendMail({ from, to: lead.email, replyTo: SMTP_USER, ...leadEmail(lead, deckUrl) });
    console.log('lead-email: confirmation sent');
  } catch (err) {
    console.error('lead-email: confirmation failed:', err.code || '', err.response || err.message);
    return res.status(502).json({ ok: false, error: 'send-failed' });
  }

  try {
    await transport.sendMail({ from, to: LEAD_NOTIFY_TO || SMTP_USER, replyTo: lead.email, ...notifyEmail(lead, tracking) });
    console.log('lead-email: team notification sent');
  } catch (err) {
    // The lead already has their email and the row is in the Google Sheet, so don't fail the request.
    console.error('lead-email: team notification failed:', err.code || '', err.response || err.message);
  }

  return res.status(200).json({ ok: true });
};
