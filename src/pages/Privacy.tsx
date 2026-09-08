import PageHeader from '../components/PageHeader';
import { OFFICE_ADDRESS_EN } from '../data/officeAddress';
import './Privacy.css';

const LAST_UPDATED = 'September 2026';

export default function Privacy() {
  return (
    <main className="page-enter privacy-page">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How WIN International Education Service collects, uses, and protects your information."
        compact
      />

      <section className="section privacy__section">
        <div className="container">
          <article className="privacy__content">
            <p className="mono-tag privacy__updated">Last updated: {LAST_UPDATED}</p>

            <section className="privacy__block" aria-labelledby="privacy-who">
              <h2 id="privacy-who" className="privacy__heading">1. Who we are</h2>
              <p>
                WIN International Education Service (“WIN Education”, “we”, “us”) is an education
                consultancy based in Yangon, Myanmar. We help students and families plan study abroad,
                including school selection, applications, visas, and related support.
              </p>
              <p>
                Our website is{' '}
                <a href="https://wineducationyangon.com" target="_blank" rel="noreferrer">
                  wineducationyangon.com
                </a>
                .
              </p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-collect">
              <h2 id="privacy-collect" className="privacy__heading">2. Information we collect</h2>
              <p>We may collect information when you:</p>
              <ul>
                <li>
                  Submit our consultation form (hosted on Google Forms), which may include your
                  name, contact details, education background, and study plans
                </li>
                <li>Email or call us using the contact details on our website</li>
                <li>Visit our website (technical data such as browser type and pages viewed)</li>
              </ul>
              <p>
                We do not operate user accounts on this website. We do not knowingly collect
                information from children without parental consent.
              </p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-use">
              <h2 id="privacy-use" className="privacy__heading">3. How we use your information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to consultation requests and enquiries</li>
                <li>Provide education counselling and application support</li>
                <li>Communicate with you about services, appointments, and follow-ups</li>
                <li>Improve our website and services</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-third-party">
              <h2 id="privacy-third-party" className="privacy__heading">4. Third-party services</h2>
              <p>Our website uses or links to third-party services, including:</p>
              <ul>
                <li>
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Forms
                  </a>{' '}
                  — for undergraduate consultation requests (Contact page)
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    Facebook
                  </a>{' '}
                  — embedded page timeline on our Social page
                </li>
                <li>
                  <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
                    TikTok
                  </a>{' '}
                  — embedded videos on our Social page
                </li>
                <li>
                  <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer">
                    Cloudflare
                  </a>{' '}
                  — website hosting and security
                </li>
              </ul>
              <p>
                These services have their own privacy policies and may collect data according to
                their terms. When you use our contact form or view embedded content, your
                information may be processed by those providers.
              </p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-cookies">
              <h2 id="privacy-cookies" className="privacy__heading">5. Cookies and storage</h2>
              <p>Our website may use:</p>
              <ul>
                <li>
                  <strong>Essential storage</strong> — we save your language preference (English or
                  Myanmar) in your browser’s local storage so the site remembers your choice
                </li>
                <li>
                  <strong>Cookie notice</strong> — we store whether you have accepted our cookie
                  notice in local storage
                </li>
                <li>
                  <strong>Third-party cookies</strong> — Facebook and TikTok embeds on the Social
                  page may set cookies when those features load
                </li>
                <li>
                  <strong>Hosting cookies</strong> — Cloudflare may use technical cookies for
                  security and performance
                </li>
              </ul>
              <p>
                You can control cookies through your browser settings. Disabling cookies may affect
                how some parts of the site work.
              </p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-retention">
              <h2 id="privacy-retention" className="privacy__heading">6. Data retention</h2>
              <p>
                We keep consultation and enquiry information only as long as needed to provide our
                services, comply with legal obligations, or resolve disputes. Form submissions
                stored in Google Forms are retained according to Google’s policies and our internal
                record-keeping practices.
              </p>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-rights">
              <h2 id="privacy-rights" className="privacy__heading">7. Your rights and contact</h2>
              <p>
                Depending on where you live, you may have rights to access, correct, or delete your
                personal information. To make a request or ask questions about this policy, contact
                us:
              </p>
              <ul className="privacy__contact-list">
                <li>
                  Email:{' '}
                  <a href="mailto:info@win-international.ca">info@win-international.ca</a>
                </li>
                <li>
                  Email:{' '}
                  <a href="mailto:myintzu@win-international.ca">myintzu@win-international.ca</a>
                </li>
                <li>Phone: <a href="tel:+959976766429">+95 9 976 766 429</a></li>
                <li>Address: {OFFICE_ADDRESS_EN}</li>
              </ul>
            </section>

            <section className="privacy__block" aria-labelledby="privacy-changes">
              <h2 id="privacy-changes" className="privacy__heading">8. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The “Last updated” date at the
                top of this page will reflect any changes. Continued use of our website after
                changes are posted means you accept the updated policy.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
