import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ResoluteSports.css';
import resoluteLogo from '../../../assets/portfolio/logo.png';
import dtLogo from '../../../assets/portfolio/dt-logo.jpg';

/* Config */
/* Leads go to a Google Form (responses land in its linked Google Sheet).
   To switch forms: take the form's "Get pre-filled link", copy the id after /d/e/
   into the URL below and the entry.<number> codes into GOOGLE_FORM_FIELDS.
   Fields left out of GOOGLE_FORM_FIELDS are simply not sent. */
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSf85dAzcCi6Cm4crLL0BXnse_GS4DFuXoyuciTAoB3lcelKLg/formResponse'; // PVL Season 5 Sponsorship Leads
const GOOGLE_FORM_FIELDS = {
  name: 'entry.1222673495',
  email: 'entry.1779947801',
  phone: 'entry.241659141',
  company: 'entry.97166290',
  designation: 'entry.1262069505',
  interest: 'entry.1978830549',
  budget_range: 'entry.891847495',
  // lead_score, consent_privacy_notice, consent_age_18, utm_source, utm_medium,
  // utm_campaign, utm_content, utm_term, gclid: add entry codes here if the form has them
};
const LEAD_EMAIL_API = '/api/send-lead-email';
const GA4_ID = 'G-0L39WG9237';  // Google Analytics 4 property for this page
const DECK_URL = '/PVL-Season-5-Sponsorship-Deck.pdf';    // replace with the approved deck URL
const PRIVACY_URL = '/sponsorship-privacy-notice';
const LOGO_PRIMARY = resoluteLogo;
const LOGO_REVERSE = resoluteLogo;
const DT_LOGO = dtLogo;
const KICKOFF = Date.parse('2026-11-30T00:00:00+05:30');  // 30 Nov 2026, IST
const PAGE_TITLE = 'Sponsor Delhi Toofans in PVL Season 5 | Resolute Sports';
const PAGE_DESCRIPTION = 'Sponsor Delhi Toofans in PVL Season 5. Action begins 30 November 2026. Download the official Season 5 deck.';
const PHONE_DISPLAY = '+91 87994 59334';
const PHONE_HREF = 'tel:+918799459334';
const FAIL_MSG = `We could not send this right now. Please email contact@resolutesports.in or call us on ${PHONE_DISPLAY}.`;
const SUBMIT_LABEL = 'Download deck & request call';

/* Content */
const NAV = [
  ['#about', 'Pathways'],
  ['#how', 'How it works'],
  ['#reach', 'Reach'],
  ['#packages', 'Packages'],
  ['#faq', 'FAQ'],
];
const TICKER = ['PVL Season 5', '30 Nov 2026', 'Delhi Toofans', '88M+ TV viewers', '1.1B digital views', 'Sponsor the rally'];
const MEDIA = ['Sony Sports Network', 'SonyLIV', 'Hurun India', 'Fanatic', 'YouTube'];
const INTERESTS = ['Brand sponsorship', 'Investment / equity', 'Both'];
const BUDGETS = [
  { value: 'under-25l', label: 'Under ₹25 lakh', score: 10 },
  { value: '25-50l', label: '₹25 – 50 lakh', score: 25 },
  { value: '50l-1cr', label: '₹50 lakh – 1 crore', score: 45 },
  { value: '1cr-plus', label: '₹1 crore +', score: 70 },
  { value: 'not-decided', label: 'Not decided', score: 0 },
];
const HOW = [
  ['01', 'Front-of-kit visibility', 'Primary placement held in the centre frame of every replay and celebration.'],
  ['02', 'Sustained court presence', 'Sideline, LED and broadcast billboards working across every extended exchange.'],
  ['03', 'Peak-moment content', 'Match-winning points, highlights and social clips carrying your brand past the final whistle.'],
];
const STATS = [
  { k: 'TV reach', end: 88.2, dec: 1, unit: 'M', label: 'Households and viewers, BARC 2025' },
  { k: 'Live views', end: 151, dec: 0, unit: 'M', label: 'Across live broadcast partners' },
  { k: 'Digital views', end: 1.1, dec: 1, unit: 'B', label: 'Cumulative, YouTube and digital' },
  { k: 'Growth', end: 200, dec: 0, unit: '%', label: 'Audience growth across seasons' },
];
const ZONES = {
  front:   ['Front panel', 'Primary logo position, held in the centre frame of replays, goal celebrations and close-ups.'],
  back:    ['Back of kit', 'Visible on serve and rally replays, and in wide shots from the stands camera.'],
  sleeveL: ['Left sleeve', 'Frequent in side-on and celebration shots, with strong presence on reaction close-ups.'],
  sleeveR: ['Right sleeve', 'Captured in arm-raise and huddle frames across the match broadcast.'],
  sides:   ['Sides', 'Visible during lateral movement and dives, strong in slow-motion and highlight packages.'],
  shorts:  ['Shorts', 'Official kit credit placement, visible in full-body and warm-up footage.'],
};
const INITIAL_READOUT = ['Front panel', 'Primary logo position. Held in the centre frame of every replay, goal celebration and close-up.'];
const HOTSPOTS = [
  { zone: 'front', label: 'Front of kit', left: '40%', top: '38%' },
  { zone: 'back', label: 'Back of kit', left: '46%', top: '62%' },
  { zone: 'sleeveL', label: 'Left sleeve', left: '14%', top: '30%' },
  { zone: 'sleeveR', label: 'Right sleeve', left: '84%', top: '30%' },
  { zone: 'sides', label: 'Sides', left: '26%', top: '62%' },
  { zone: 'shorts', label: 'Shorts', left: '50%', top: '86%' },
];
const TIERS = [
  {
    feat: true, tag: 'Top tier', title: 'Principal Partner', btn: 'btn-cyan', interest: 'Brand Sponsorship', budget: 'tier-4',
    items: ['Front-of-kit primary placement', 'Title naming across broadcast and digital', 'Stadium signage and LED rotation', 'Priority access to content and activation rights'],
  },
  {
    tag: 'Associate', title: 'Associate Partner', btn: 'btn-outline', interest: 'Brand Sponsorship', budget: 'tier-3',
    items: ['Sleeve or side-panel placement', 'Broadcast billboard and digital mentions', 'Stadium LED presence'],
  },
  {
    tag: 'Kit', title: 'Official Kit Partner', btn: 'btn-outline', interest: 'Kit / Stadium Partner', budget: 'tier-2',
    items: ['Shorts or back-of-kit placement', 'Official kit credit in content', 'Fan merchandise co-branding'],
  },
];
const SPECS = [
  ['Front of jersey', '206.45 sq. cm'],
  ['Back of jersey', '206.45 sq. cm'],
  ['Jersey sides', '200 sq. cm'],
  ['Sleeves', '64.5 sq. cm'],
  ['Shorts', '77.4 sq. cm'],
];
const CHIPS = ['LED perimeter (up to 10 min rotation)', 'Big-screen ads 30–60s', 'Courtside boards', 'TV commercial spots (FCT)', 'Fan zones', 'Trophy naming rights', 'VIP hospitality'];
const INDUSTRIES = [
  ['01', 'FMCG', 'Reach households at peak viewing, with product demos on live high-energy broadcast.'],
  ['02', 'Fintech', 'Acquire app users through trusted sports moments and digital-first activations.'],
  ['03', 'Electronics', 'Demonstrate product performance on screen during live play and replays.'],
  ['04', 'Lifestyle', 'Associate your label with energy, fashion and the fan community.'],
];
const FAQS = [
  ['When does Season 5 begin?', 'Season 5 of the Prime Volleyball League kicks off on 30 November 2026. Sponsor assets go live from the first match day.'],
  ['What happens after I submit my details?', 'You can download the Season 5 deck straight away, and a copy is sent to your email. A partnerships executive calls you within 2 working days to discuss your objectives and budget.'],
  ['Can we customise sponsorship assets?', 'Yes. Sponsor creative, activation formats and kit placements can be tailored within the approved brand guidelines.'],
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => (n < 10 ? '0' : '') + n;
const cx = (...names) => names.filter(Boolean).join(' ');

/* Scroll reveal: adds .in once the element is 12% visible */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setInView(true); return undefined; }
    const io = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) { setInView(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ as: Tag = 'div', className, children, ...rest }) {
  const [ref, inView] = useReveal();
  return <Tag ref={ref} className={cx(className, 'reveal', inView && 'in')} {...rest}>{children}</Tag>;
}

/* Count-up for stats, started when the stat is revealed */
function CountUp({ end, dec, run }) {
  const [text, setText] = useState(end.toFixed(dec));
  useEffect(() => {
    if (!run || prefersReducedMotion()) return undefined;
    const dur = 1600;
    let start = null;
    let raf;
    setText((0).toFixed(dec));
    const step = ts => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setText((end * (1 - Math.pow(1 - p, 3))).toFixed(dec));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, end, dec]);
  return <span>{text}</span>;
}

function Stat({ k, end, dec, unit, label }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={cx('stat', 'reveal', inView && 'in')}>
      <div className="k">{k}</div>
      <div className="num"><CountUp end={end} dec={dec} run={inView} /><sup>{unit}</sup></div>
      <div className="lbl">{label}</div>
    </div>
  );
}

/* Countdown to kickoff (own component so the 1s tick only re-renders this) */
function Countdown() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, KICKOFF - Date.now());
      setT({
        d: String(Math.floor(d / 86400000)),
        h: pad(Math.floor(d % 86400000 / 3600000)),
        m: pad(Math.floor(d % 3600000 / 60000)),
        s: pad(Math.floor(d % 60000 / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const v = key => (t ? t[key] : '--');
  return (
    <div className="cd" role="timer" aria-label="Countdown to Season 5 kickoff">
      <div><b id="cd-d">{v('d')}</b><small>Days</small></div>
      <div><b id="cd-h">{v('h')}</b><small>Hours</small></div>
      <div><b id="cd-m">{v('m')}</b><small>Min</small></div>
      <div><b id="cd-s">{v('s')}</b><small>Sec</small></div>
    </div>
  );
}

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={cx('site', scrolled && 'scrolled')} id="siteHeader">
      <div className="wrap">
        <div className="brand">
          <a href="#top" aria-label="Resolute Sports home"><img className="rs" src={LOGO_PRIMARY} alt="Resolute Corp Bharat Private Limited" height="36" /></a>
          <span className="sep" aria-hidden="true"></span>
          <img className="dt" src={DT_LOGO} alt="Delhi Toofans" width="50" height="50" />
        </div>
        <nav className="main" aria-label="Primary">
          {NAV.map(([href, text]) => <a key={href} href={href}>{text}</a>)}
        </nav>
        <div className="hdr-cta">
          <a className="btn btn-outline btn-sm" href={PHONE_HREF}>Call us</a>
          <a className="btn btn-primary btn-sm" href="#lead">Get deck</a>
        </div>
      </div>
    </header>
  );
}

/* Lead form: two steps, validation, submit */
const EMPTY_FIELDS = { name: '', email: '', phone: '', company: '', role: '' };

function send(payload) {
  if (!GOOGLE_FORM_ACTION) return Promise.reject(new Error('not-connected'));
  const body = new URLSearchParams();
  Object.entries(GOOGLE_FORM_FIELDS).forEach(([key, entry]) => {
    if (payload[key] !== undefined) body.append(entry, String(payload[key]));
  });
  // Google Forms does not allow cross-site reads, so the response is opaque:
  // this only rejects on a network failure, not if Google refuses the entry.
  return fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body });
}

/* Emails the lead their deck link and the team the lead details (api/send-lead-email.js).
   Resolves to true/false and never rejects: the lead is already saved in the Sheet. */
function emailLead(payload) {
  return fetch(LEAD_EMAIL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(r => r.ok, () => false);
}

function LeadForm({ interest, setInterest, budget, setBudget, track, onSent }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [consent, setConsent] = useState(false);
  const [age, setAge] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const honeypotRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const focusOnStep = useRef(false);
  /* form_start is sent automatically by GA4 enhanced measurement, so it is not sent here. */

  useEffect(() => {
    if (!focusOnStep.current) return;
    focusOnStep.current = false;
    const first = step === 1
      ? step1Ref.current.querySelector('input')
      : step2Ref.current.querySelector('input, select');
    if (first) first.focus();
  }, [step]);

  const goStep = n => { focusOnStep.current = true; setStep(n); };
  const onField = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const step1Errors = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) e.email = 'Enter a valid work email.';
    if (!/^\+?\d{8,15}$/.test(fields.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid phone number.';
    if (!fields.company.trim()) e.company = 'Please enter your company name.';
    if (!fields.role.trim()) e.role = 'Please enter your designation.';
    return e;
  };

  const onNext = () => {
    const e = step1Errors();
    setErrors(e);
    setStatus('');
    if (Object.keys(e).length) {
      ga4Event('form_validation_error', { form_id: 'leadForm', form_step: 1, error_fields: Object.keys(e).join(',') });
      return;
    }
    ga4Event('form_step_complete', { form_id: 'leadForm', form_step: 1 });
    goStep(2);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (honeypotRef.current.value) return;                // honeypot
    const e1 = step1Errors();
    setStatus('');
    if (Object.keys(e1).length) { setErrors(e1); goStep(1); return; }
    const e2 = {};
    if (!interest) e2.interest = 'Select an interest type.';
    if (!budget) e2.budget = 'Select a budget range.';
    if (!consent || !age) e2.consent = 'Please tick both consent boxes to continue.';
    setErrors(e2);
    if (Object.keys(e2).length) {
      ga4Event('form_validation_error', { form_id: 'leadForm', form_step: 2, error_fields: Object.keys(e2).join(',') });
      return;
    }

    const b = BUDGETS.find(x => x.value === budget);
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      company: fields.company.trim(),
      designation: fields.role.trim(),
      consent_privacy_notice: 'Sponsorship Privacy Notice v1.0 (13-Oct-2026)',
      consent_age_18: true,
      interest,
      budget_range: b.label,
      lead_score: b.score || 0,
      source: 'PVL S5 landing page',
      submitted_at: new Date().toISOString(),
      ...track,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      lead_interest: payload.interest,
      lead_budget: payload.budget_range,
      lead_score: payload.lead_score,
      utm_campaign: track.utm_campaign,
      utm_source: track.utm_source,
      utm_medium: track.utm_medium,
      gclid: track.gclid,
    });

    const gaLead = {
      form_id: 'leadForm',
      lead_interest: payload.interest,
      lead_budget: payload.budget_range,
      lead_score: payload.lead_score,
      utm_source: track.utm_source,
      utm_medium: track.utm_medium,
      utm_campaign: track.utm_campaign,
    };
    ga4Event('form_submit', gaLead);

    setSending(true);
    send(payload)
      .then(() => emailLead(payload))
      .then(emailed => {
        setSending(false);
        ga4Event('generate_lead', { ...gaLead, deck_emailed: emailed });
        onSent({ email: payload.email, emailed });
      })
      .catch(() => {
        setSending(false);
        ga4Event('form_submit_error', { form_id: 'leadForm' });
        setStatus(FAIL_MSG);
      });
  };

  const textField = (id, name, label, type, extra) => (
    <div className="field">
      <label className="lbl" htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} value={fields[name]} onChange={onField} {...extra} />
      <div className="err" data-err={name}>{errors[name]}</div>
    </div>
  );

  return (
    <>
    <div className="steps" aria-hidden="true"><span className="on"></span><span id="pb2" className={step === 2 ? 'on' : undefined}></span></div>
    <form id="leadForm" noValidate onSubmit={onSubmit}>
      <div className="hp" aria-hidden="true"><label>Leave this field empty<input type="text" id="f-website" name="website" tabIndex={-1} autoComplete="off" ref={honeypotRef} /></label></div>

      <div id="step1" ref={step1Ref} hidden={step !== 1}>
        <div className="row">
          {textField('f-name', 'name', 'Name *', 'text', { autoComplete: 'name' })}
          {textField('f-email', 'email', 'Work email *', 'email', { autoComplete: 'email' })}
          {textField('f-phone', 'phone', 'Phone / WhatsApp *', 'tel', { autoComplete: 'tel', inputMode: 'tel', placeholder: '+91' })}
          {textField('f-company', 'company', 'Company *', 'text', { autoComplete: 'organization' })}
          {textField('f-role', 'role', 'Designation *', 'text', { autoComplete: 'organization-title' })}
        </div>
        <div className="form-nav">
          <button className="btn btn-primary" type="button" id="next1" onClick={onNext}>Next: your interest →</button>
        </div>
      </div>

      <div id="step2" ref={step2Ref} hidden={step !== 2}>
        <div className="field">
          <span className="lbl">I am interested in *</span>
          <div className="radios" role="radiogroup" aria-label="Interest type">
            {INTERESTS.map(v => (
              <label key={v} className={interest === v ? 'on' : undefined}>
                <input type="radio" name="interest" value={v} checked={interest === v} onChange={() => setInterest(v)} />{v}
              </label>
            ))}
          </div>
          <div className="err" data-err="interest">{errors.interest}</div>
        </div>
        <div className="field">
          <label className="lbl" htmlFor="f-budget">Indicative budget *</label>
          <select id="f-budget" name="budget" value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="">Select</option>
            {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <div className="err" data-err="budget">{errors.budget}</div>
        </div>
        <div className="consent-box">
          <label className="consent">
            <input type="checkbox" id="f-consent" name="consent" checked={consent} onChange={e => setConsent(e.target.checked)} />
            <span>I consent to Resolute Sports Private Limited processing my personal data for sponsorship, collaboration and investment related enquiries, as described in the <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Sponsorship Privacy Notice</a>.</span>
          </label>
          <label className="consent">
            <input type="checkbox" id="f-age" name="age" checked={age} onChange={e => setAge(e.target.checked)} />
            <span>I confirm that I am above 18 years of age and legally competent to provide this consent.</span>
          </label>
        </div>
        <div className="err" data-err="consent">{errors.consent}</div>
        <div className="form-nav">
          <button className="btn btn-outline" type="button" id="back2" onClick={() => goStep(1)}>← Back</button>
          <button className="btn btn-primary" type="submit" id="submitBtn" disabled={sending}>{sending ? 'Sending…' : SUBMIT_LABEL}</button>
        </div>
      </div>

      <p className="status" id="formStatus" role="status" aria-live="polite">{status}</p>
      <p className="assure">Takes under 60 seconds. We never share your details with third parties.</p>
    </form>
    </>
  );
}

/* Kit diagram: zone readout */
function KitExplorer() {
  const [active, setActive] = useState(null);
  const [title, text] = active ? ZONES[active] : INITIAL_READOUT;
  return (
    <Reveal>
      <div className="kit">
        <div className="kit-stage">
          <svg className="kit-svg" viewBox="0 0 380 440" role="img" aria-label="Delhi Toofans playing kit diagram">
            <path d="M120 40 L60 70 L20 150 L62 176 L80 140 L80 420 L300 420 L300 140 L318 176 L360 150 L320 70 L260 40 Q190 78 120 40 Z" fill="#3B0067" />
            <path d="M120 40 Q190 78 260 40" fill="none" stroke="#FFD65C" strokeWidth="6" />
            <path d="M80 420 L300 420 L300 398 L80 398 Z" fill="#FFBD00" />
            <path d="M150 150 L230 150 L190 214 Z" fill="#FFBD00" />
            <path d="M20 150 L62 176" stroke="#FFD65C" strokeWidth="5" />
            <path d="M360 150 L318 176" stroke="#FFD65C" strokeWidth="5" />
            <rect x="150" y="280" width="80" height="24" fill="#FFFFFF" />
            <path d="M300 420 L380 440 L380 380 Z" fill="#3B0067" />
          </svg>
          {HOTSPOTS.map((h, i) => (
            <button
              key={h.zone}
              className={cx('hotspot', active === h.zone && 'on')}
              type="button"
              style={{ left: h.left, top: h.top }}
              data-zone={h.zone}
              aria-label={h.label}
              aria-pressed={active === null ? h.zone === 'front' : active === h.zone}
              onClick={() => setActive(h.zone)}
              onMouseEnter={() => setActive(h.zone)}
              onFocus={() => setActive(h.zone)}
            >{i + 1}</button>
          ))}
        </div>
      </div>
      <div className="readout" aria-live="polite">
        <h3 id="kitTitle">{title}</h3>
        <p id="kitText">{text}</p>
      </div>
    </Reveal>
  );
}

function ThankYouDialog({ sent, onClose }) {
  const open = sent !== null;
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const lastFocus = document.activeElement;
    closeRef.current.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
  }, [open, onClose]);
  return (
    <div
      className={cx('dialog', open && 'open')}
      id="thankyou"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tyTitle"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="card lead-card">
        <span className="label">Thank you</span>
        {sent && sent.emailed ? (
          <>
            <h2 id="tyTitle">Your deck is on its way</h2>
            <p>We have sent a copy to <strong id="ty-email">{sent.email}</strong>. Our partnerships team will call you within 2 working days.</p>
          </>
        ) : (
          <>
            <h2 id="tyTitle">Your deck is ready</h2>
            <p>Download the Season 5 deck below. Our partnerships team will call you within 2 working days.</p>
          </>
        )}
        <div className="form-nav">
          <a className="btn btn-primary" id="ty-download" href={DECK_URL} download>Download Season 5 deck (PDF)</a>
          <button className="btn btn-outline" type="button" id="ty-close" ref={closeRef} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* Google Analytics 4 for this page only. The site-wide tag in public/index.html
   uses a different property; this adds the Resolute Sports one on top of it. */
function loadGa4() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) window.gtag = function gtag() { window.dataLayer.push(arguments); };
  if (!document.querySelector(`script[src*="gtag/js?id=${GA4_ID}"]`)) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.gtag('js', new Date());
  }
  window.gtag('config', GA4_ID);
}

/* Sends a GA4 event to this page's property. Never pass personal data
   (name, email, phone, company): Google Analytics does not allow it. */
function ga4Event(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, { ...params, send_to: GA4_ID });
}

export default function ResoluteSports() {
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [sentTo, setSentTo] = useState(null);

  /* Tracking (UTM and gclid read from the URL; held in memory only) */
  const track = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    const t = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'].forEach(k => { t[k] = p.get(k) || ''; });
    return t;
  }, []);

  /* Page title, description and smooth anchor scrolling while this page is mounted */
  useEffect(() => {
    const html = document.documentElement;
    const prevTitle = document.title;
    const prevScroll = html.style.scrollBehavior;
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.getAttribute('content') : null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    document.title = PAGE_TITLE;
    meta.setAttribute('content', PAGE_DESCRIPTION);
    if (!prefersReducedMotion()) html.style.scrollBehavior = 'smooth';
    window.dataLayer = window.dataLayer || [];
    loadGa4();
    return () => {
      document.title = prevTitle;
      if (prevDesc === null) meta.remove(); else meta.setAttribute('content', prevDesc);
      html.style.scrollBehavior = prevScroll;
    };
  }, []);

  /* Pathway and tier buttons pre-select the interest and budget */
  const preselect = (i, b) => {
    if (INTERESTS.includes(i)) setInterest(i);
    if (b) setBudget(BUDGETS.some(x => x.value === b) ? b : '');
  };

  const closeThanks = useCallback(() => setSentTo(null), []);

  return (
    <div className="pvl-s5 js">
      <SiteHeader />

      <main id="top">

        <section className="hero" id="hero">
          <div className="hero-diag" aria-hidden="true"></div>
          <div className="wrap">
            <div>
              <div className="presented">
                <img src={DT_LOGO} alt="Delhi Toofans" width="72" height="72" />
                <div><span>Presented by</span><b>Resolute Sports</b></div>
              </div>
              <span className="label">PVL Season 5 · Official sponsorship</span>
              <h1>Sponsor Delhi Toofans in <em>PVL Season 5</em></h1>
              <p className="sub">Action begins <strong>30 November 2026</strong></p>
              <div className="pills">
                <span>88M+ TV viewers</span>
                <span>1.1B digital views</span>
                <span>Hurun India 2026 ranked</span>
              </div>
              <p className="cd-label">Days until Season 5 kickoff</p>
              <Countdown />
              <div className="cta-row">
                <a className="btn btn-primary" href="#lead">Get Season 5 deck</a>
                <a className="btn btn-outline" href="#packages">Explore packages</a>
              </div>
            </div>

            <div className="lead-card" id="lead">
              <span className="label">Official Season 5 deck</span>
              <h3>Request the sponsorship deck</h3>
              <p className="note">Download the full deck instantly (a copy is also emailed to you), and our partnerships team calls within 2 working days.</p>
              <LeadForm
                interest={interest}
                setInterest={setInterest}
                budget={budget}
                setBudget={setBudget}
                track={track}
                onSent={setSentTo}
              />
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="track">
            {[0, 1].map(g => (
              <div className="grp" key={g}>
                {TICKER.map(t => <span key={t}>{t}</span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="ribbon" aria-label="Broadcast and media ecosystem">
          <div className="wrap ribbon-in">
            <span className="label">Broadcast &amp; media ecosystem</span>
            <div className="names">
              {MEDIA.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </section>

        <section className="section s-grey" id="about">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">Choose your pathway</span>
              <h2>Built for <em>brands</em> and investors</h2>
              <p className="lead">Two ways into Delhi Toofans. Pick the one that matches your objective.</p>
            </Reveal>
            <div className="two">
              <Reveal as="article" className="card">
                <span className="label">Brand sponsors</span>
                <h3>Put your brand in front of 88M+ viewers</h3>
                <ul>
                  <li>88.2M TV audience reach</li>
                  <li>80% youth demographic (18–44)</li>
                  <li>360° kit and stadium inventory</li>
                </ul>
                <a className="btn btn-primary" href="#packages">View kit inventory</a>
              </Reveal>
              <Reveal as="article" className="card alt">
                <span className="label">Franchise investors</span>
                <h3>Own a share of a ranked sports franchise</h3>
                <ul>
                  <li>Ranked top sports franchise</li>
                  <li>PVL Season 3 finalists</li>
                  <li>Diversified equity and revenue</li>
                </ul>
                <a className="btn btn-primary" href="#lead" onClick={() => preselect('Franchise Investment')}>Request financial deck</a>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">How sponsorship works</span>
              <h2>Every point is a <em>sponsorship moment</em></h2>
            </Reveal>
            <div className="how">
              {HOW.map(([n, h, p]) => (
                <Reveal className="how-card" key={n}>
                  <div className="n">{n}</div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section s-navy" id="reach">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">Verified reach</span>
              <h2>The numbers behind <em>Season 5</em></h2>
            </Reveal>
            <div className="score">
              {STATS.map(s => <Stat key={s.k} {...s} />)}
            </div>
            <p className="source">Sources: BARC 2025 (TV reach); YouTube Analytics (live and digital views); digital audits. Figures to be confirmed against source reports before publication.</p>
          </div>
        </section>

        <section className="section" id="packages">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">Packages</span>
              <h2>Tap a zone to see its <em>TV value</em></h2>
              <p className="lead">Every kit placement is mapped to the camera angles that carry it on broadcast.</p>
            </Reveal>
            <div className="kit-wrap">
              <KitExplorer />
              <Reveal className="tiers">
                {TIERS.map(t => (
                  <div className={cx('tier', t.feat && 'feat')} key={t.title}>
                    <span className="tag">{t.tag}</span>
                    <h3>{t.title}</h3>
                    <div className="price">Pricing on request</div>
                    <ul>
                      {t.items.map(li => <li key={li}>{li}</li>)}
                    </ul>
                    <a className={cx('btn', t.btn, 'btn-block')} href="#lead" onClick={() => preselect(t.interest, t.budget)}>Enquire about this tier</a>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="inventory">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">Brand visibility</span>
              <h2>Every touchpoint, from jersey to <em>broadcast</em></h2>
              <p className="lead">Your brand appears where fans and cameras are looking.</p>
            </Reveal>
            <div className="inv-grid">
              <Reveal>
                <table className="spec">
                  <tbody>
                    <tr><th>Asset</th><th>Specification</th></tr>
                    {SPECS.map(([a, s]) => <tr key={a}><td>{a}</td><td>{s}</td></tr>)}
                  </tbody>
                </table>
                <p className="note">Indicative specifications, to be confirmed against the official kit design before publication.</p>
              </Reveal>
              <Reveal>
                <div className="chips">
                  {CHIPS.map(c => <span key={c}>{c}</span>)}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section s-grey" id="audience">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">Industries</span>
              <h2>Built for categories that <em>win with youth</em></h2>
            </Reveal>
            <div className="ind-grid">
              {INDUSTRIES.map(([n, h, p]) => (
                <Reveal className="ind" key={n}><div className="n">{n}</div><h3>{h}</h3><p>{p}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <Reveal className="head">
              <span className="label">FAQ</span>
              <h2>Questions, <em>answered</em></h2>
            </Reveal>
            <Reveal className="faq">
              {FAQS.map(([q, a], i) => (
                <details key={q} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="cta" aria-label="Call to action">
          <div className="wrap">
            <Reveal>
              <span className="label">Limited inventory</span>
              <h2>Season 5 inventory is limited</h2>
              <p>Secure your placement before kit and stadium slots are allocated.</p>
            </Reveal>
            <a className="btn btn-cyan" href="#lead">Get Season 5 deck</a>
          </div>
        </section>

      </main>

      <footer className="site" id="privacy">
        <div className="wrap">
          <div className="foot">
            <div>
              <img className="rc" src={LOGO_REVERSE} alt="Resolute Corp Bharat Private Limited" />
              <span className="dtbox"><img src={DT_LOGO} alt="Delhi Toofans" /></span>
              <h4>Resolute Sports Private Limited</h4>
              <p>Owner of Delhi Toofans and Hyderabad Toofans, Prime Volleyball League</p>
              <p>Ahmedabad, India</p>
              <p><a href="mailto:contact@resolutesports.in">contact@resolutesports.in</a></p>
              <p><a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
            </div>
            <div>
              <h4>Site map</h4>
              <p><a href="#about">Pathways</a></p>
              <p><a href="#how">How it works</a></p>
              <p><a href="#reach">Audience reach</a></p>
              <p><a href="#packages">Packages</a></p>
              <p><a href="#inventory">Brand visibility</a></p>
              <p><a href="#audience">Industries</a></p>
              <p><a href="#faq">FAQ</a></p>
              <p><a href="#lead">Request the deck</a></p>
              <p><a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Sponsorship Privacy Notice</a></p>
            </div>
            <div>
              <h4>About Resolute Corp</h4>
              <p>Resolute Corp Bharat Private Limited is a diversified investment and venture-building group.</p>
              <p>Group ventures include ShareSquare, Hair Drama Co. and Resolute Sports Private Limited.</p>
              <p><a href="https://www.resolutecorp.in/" target="_blank" rel="noopener noreferrer">resolutecorp.in</a></p>
              <h4 style={{ marginTop: 22 }}>Grievance officer</h4>
              <p><a href="mailto:grievance@resolutecorp.in">grievance@resolutecorp.in</a></p>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 Resolute Sports Private Limited. All rights reserved. Delhi Toofans is a franchise team of the Prime Volleyball League.</span>
            <span><a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy notice</a></span>
          </div>
        </div>
      </footer>

      <div className="sticky">
        <a className="btn btn-primary btn-block" href="#lead">Get Season 5 deck</a>
      </div>

      <ThankYouDialog sent={sentTo} onClose={closeThanks} />
    </div>
  );
}
