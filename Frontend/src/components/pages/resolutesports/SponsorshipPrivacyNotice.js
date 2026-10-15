import { useEffect } from 'react';
import './SponsorshipPrivacyNotice.css';
import resoluteLogo from '../../../assets/portfolio/logo.png';

/* Sponsorship Privacy Notice v1.0 (13-Oct-2026), from the client's DOCX, styled
   like the Word document. Linked from the consent checkbox and footer of /resolutesports. */
const PAGE_TITLE = 'Sponsorship Privacy Notice | Resolute Sports';
const GRIEVANCE_EMAIL = 'grievance@resolutecorp.in';

const mail = <a href={`mailto:${GRIEVANCE_EMAIL}`}>{GRIEVANCE_EMAIL}</a>;

export default function SponsorshipPrivacyNotice() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    return () => { document.title = prevTitle; };
  }, []);

  return (
    <div className="rs-privacy">
      <div className="pn-page">
        <header className="pn-header">
          <a href="/resolutesports" aria-label="Resolute Sports sponsorship page">
            <img src={resoluteLogo} alt="Resolute Corp Bharat Private Limited" width="132" height="44" />
          </a>
        </header>

        <main>
          <div className="pn-title">
            <h1>Privacy Notice</h1>
            <p className="pn-subtitle">Resolute Sports Private Limited — Sponsorship Privacy Notice</p>
            <p className="pn-meta">Applicable to: RSPL Website</p>
            <p className="pn-meta">Effective Date: 13 October 2026</p>
          </div>

          <p>
            <strong>Resolute Sports Private Limited (RSPL)</strong> (“Resolute Sports”, “we”, “us” or the “Company”) respects the privacy of individuals who submit their personal data through the sponsorship enquiry form on its website. This Privacy Notice explains how Resolute Sports collects, uses and Processes your personal data when you request the sponsorship deck or express interest in potential business collaborations, investments and sponsorship opportunities.
          </p>
          <p>
            This Privacy Notice is issued pursuant to Section 5 of the Digital Personal Data Protection Act, 2023 (“DPDP Act”) read with Rule 3 of the Digital Personal Data Protection Rules, 2025 (“DPDP Rules”) and provides information regarding the personal data collected, the purpose for which it is processed, and the rights available to you as a Data Principal.
          </p>

          <h2>1. Categories of Personal Data We Collect</h2>
          <p>We may Process the following types of your personal data in connection with your submission through the sponsorship enquiry form:</p>
          <table className="pn-table">
            <tbody>
              <tr><th>Category</th><th>Data Elements</th></tr>
              <tr><td>Personal Identification Details</td><td>Name</td></tr>
              <tr><td>Contact Details</td><td>Email address &amp; Phone Number</td></tr>
            </tbody>
          </table>

          <h2>2. Purposes of Processing</h2>
          <p>We will Process your personal data for the following business, legitimate and lawful purposes:</p>
          <table className="pn-table">
            <tbody>
              <tr><th>Purpose</th><th>Details</th></tr>
              <tr>
                <td>Evaluation of Sponsorship, Collaboration and Investment Opportunities</td>
                <td>
                  <ul>
                    <li>Reviewing and evaluating your enquiry to assess potential sponsorships, business collaborations, strategic partnerships and investment opportunities relevant to Resolute Sports</li>
                    <li>Understanding your brand’s interests and requirements and assessing the suitability of potential business opportunities</li>
                    <li>Sharing the sponsorship deck and facilitating discussions regarding prospective opportunities</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Communication, Record Keeping and Business Administration</td>
                <td>
                  <ul>
                    <li>Contacting you regarding your enquiry, seeking additional information or clarification and coordinating follow up discussions</li>
                    <li>Maintaining records of enquiries, communications and potential business opportunities</li>
                    <li>Managing and administering the evaluation and follow up of enquiries and maintaining the integrity and security of the enquiry process</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>3. Data Sharing</h2>
          <p>We may disclose and transfer your personal data to the following entities for the following purposes:</p>
          <table className="pn-table">
            <tbody>
              <tr><th>Recipient</th><th>Purpose</th></tr>
              <tr>
                <td>Resolute Corp Bharat Private Limited (RCBPL)</td>
                <td>
                  <ul>
                    <li>Your personal data collected through the sponsorship enquiry form may be shared with RCBPL, a group company of Resolute Sports Private Limited, for evaluating and managing potential sponsorships, business collaborations, partnerships and investment opportunities</li>
                    <li>Your personal data may be accessed by authorised personnel of Resolute Sports and RCBPL only where required for reviewing, evaluating and responding to your enquiry</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>4. Your Rights</h2>
          <p>Under the DPDPA, you have the right to:</p>
          <ul>
            <li>Access, update and review your personal data.</li>
            <li>Correct inaccuracies in your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Nominate another individual to exercise your rights in case of your incapacity.</li>
            <li>Raise grievances.</li>
          </ul>
          <p>To exercise your rights, please contact us at {mail}.</p>

          <h2>5. Consent Withdrawal</h2>
          <p>You may withdraw your consent at any time by contacting us directly at {mail}.</p>
          <p>Withdrawal of consent will not affect the lawfulness of Processing carried out based on your consent before such withdrawal. Upon withdrawal, Resolute Sports Private Limited shall cease Processing your personal data for the relevant purposes, unless such Processing is required or permitted under applicable law.</p>

          <h2>6. Grievance Redressal</h2>
          <p>If you have concerns regarding how we Process your personal data, you may contact the following designated person to register your grievance:</p>
          <p><strong>Grievance Officer:</strong> {mail}</p>
          <p>If you are not satisfied with the resolution of your grievance, you may approach the Data Protection Board of India in accordance with applicable law.</p>

          <h2>7. Your Obligations as a Data Principal</h2>
          <p>You are requested to provide accurate and authentic information while exercising your rights under applicable data protection law. You are also expected not to impersonate another individual or raise false, frivolous or misleading grievances. Misuse of these rights may attract penalties prescribed under the DPDPA.</p>

          <h2>8. Consent Affirmation</h2>
          <p>By providing your consent by ticking the checkbox, you acknowledge and agree to the following:</p>
          <ol className="alpha">
            <li>That you have read and understood the contents of this Privacy Notice and consent to the Processing of your personal data for the purposes described herein</li>
            <li>That you give your consent voluntarily, without any coercion or influence from Resolute Sports or any other person</li>
            <li>That you will provide accurate, complete and updated personal data while submitting your information through the “Sponsorship” page</li>
            <li>That Resolute may Process your personal data without your consent where such Processing is permitted or required under applicable law</li>
            <li>That you confirm you are above 18 years of age and are legally competent to provide consent for the Processing of your personal data under applicable laws</li>
            <li>That you may withdraw your consent at any time by contacting us at {mail}. Withdrawal of consent will not affect the lawfulness of Processing carried out based on your consent before such withdrawal</li>
            <li>That if you withdraw your consent, Resolute may not be able to continue Processing your personal data for reviewing, evaluating and responding to your submission through the “Sponsorship” page</li>
          </ol>
          <p><strong>Language Access:</strong> You may request this consent statement and Privacy Notice in English or any of the 22 languages specified in the Eighth Schedule to the Constitution of India, as applicable.</p>
        </main>

        <footer className="pn-footer">
          Resolute Sports Private Limited | Website Sponsorship Privacy Notice
        </footer>
      </div>
    </div>
  );
}
