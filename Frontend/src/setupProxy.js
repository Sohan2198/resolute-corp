// Development only (used by `npm start`, ignored by `npm run build`):
// serves the Vercel function in /api so the lead form can be tested locally.
// SMTP settings come from Frontend/.env.local, which react-scripts loads.
const sendLeadEmail = require('../api/send-lead-email');

module.exports = function setupProxy(app) {
  app.post('/api/send-lead-email', (req, res) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { req.body = JSON.parse(raw || '{}'); } catch { req.body = {}; }
      // The dev server is Express, so res.status()/res.json() match Vercel's helpers.
      sendLeadEmail(req, res).catch(err => {
        console.error('lead-email: unexpected error', err);
        if (!res.headersSent) res.status(500).json({ ok: false });
      });
    });
  });
};
