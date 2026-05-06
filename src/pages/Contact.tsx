import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pickByLanguage, useLanguage } from '../context/LanguageContext';
import { OFFICE_ADDRESS_EN, OFFICE_ADDRESS_MY } from '../data/officeAddress';
import consultationPhoto from '../assets/contact-consultation.jpg';
import './Contact.css';

const CONTACT_HEADER_EYEBROW = 'Talk to Us';

const CONTACT_HEADER_LEDE_EN =
  "Free Consultation. Tell us a rough idea of where you want to study — we'll handle the rest.";
const CONTACT_HEADER_LEDE_MY =
  'အခမဲ့ တိုင်ပင်ဆွေးနွေးခြင်း။ ဘယ်နိုင်ငံ၊ ဘယ်ကျောင်းမှာ ပညာသင်ချင်တယ်ဆိုတာ ခန့်မှန်းခြေလောက်ပဲ ပြောပြပေးပါ — ကျန်တာအားလုံး WIN က တာဝန်ယူပေးပါမယ်။';

const CONSULT_LEDE_EN =
  'For a FREE Undergraduate Consultation, please fill out the form via the link below. Once submitted, the Win Education Team will reach out via Zoom Link, Viber, or Email to provide a one-to-one free consultation for students and parents.';

export default function Contact() {
  const { language } = useLanguage();
  const googleFormUrl =
    import.meta.env.VITE_UNDERGRAD_FORM_URL ||
    'https://docs.google.com/forms/d/e/1FAIpQLSfs9TIBXILThn_hoEwnrBjyzn1RstbCK2d404a9ey_pOUQoOA/viewform';

  return (
    <main className={`page-enter contact-page ${language === 'my' ? 'contact-page--my' : ''}`}>
      <PageHeader
        eyebrow={CONTACT_HEADER_EYEBROW}
        title={
          language === 'my' ? (
            'ဘယ်ကိုသွားချင်လဲ ပြောပြလိုက်ပါ။'
          ) : (
            <>
              Tell us <em>where</em>
              <br />
              you want to go.
            </>
          )
        }
        lede={pickByLanguage(language, CONTACT_HEADER_LEDE_EN, CONTACT_HEADER_LEDE_MY)}
        compact
      />

      <section className="section">
        <div className="container">
          <div className="contact__head">
            <span className="eyebrow">Start with a Free Call</span>
            <h2 className="h-display contact__title">Start your application conversation.</h2>
          </div>

          <div className="contact__grid">
          <motion.div
            className="contact__form"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__consult-card">
              <h3 className="contact__consult-title"><strong>Free</strong> Undergraduate Consultation</h3>
              <img
                src={consultationPhoto}
                alt="WIN International team consultation meeting"
                className="contact__consult-photo"
              />
              <p className="contact__consult-lede">
                {language === 'my' ? (
                  <>
                    FREE Undergraduate Consultation အတွက် အောက်ပါ Link မှ ဖောင်ဖြည့်ပေးပါ။
                    <br />
                    ဖောင်တင်ပြီးပါက Win Education Team မှ Zoom Link, Viber (သို့) Email မှတစ်ဆင့် ဆက်သွယ်ပေးပြီး ကျောင်းသား/မိဘများနှင့် One-to-One အခမဲ့ဆွေးနွေးပေးသွားပါမည်။
                  </>
                ) : (
                  CONSULT_LEDE_EN
                )}
              </p>
              <div className="contact__submit">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary contact__consult-cta"
                >
                  Book Now
                </a>
                <div className="contact__meta">
                  <span className="contact__note">Takes 3-5 minutes. You&apos;ll hear from us within one business day.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact info */}
          <aside className="contact__aside">
            <div className="contact__block">
              <span className="eyebrow">Direct</span>
              <a className="contact__line" href="mailto:info@win-international.ca">
                <Mail size={16} /> info@win-international.ca
              </a>
              <a className="contact__line" href="mailto:myintzu@win-international.ca">
                <Mail size={16} /> myintzu@win-international.ca
              </a>
              <a className="contact__line" href="tel:+959976766429">
                <Phone size={16} /> +95 9 976 766 429
              </a>
              <div className="contact__line">
                <MessageSquare size={16} /> Viber · +95 940-191-3007
              </div>
              <div className="contact__line">
                <MessageSquare size={16} /> Viber · +1 778-751-1885
              </div>
            </div>

            <div className="contact__block">
              <span className="eyebrow">Office</span>
              <div className="contact__line">
                <MapPin size={16} />
                <span className="contact__office-address">
                  {language === 'my' ? OFFICE_ADDRESS_MY : OFFICE_ADDRESS_EN}
                </span>
              </div>
            </div>

            <div className="contact__block">
              <span className="eyebrow">Hours</span>
              <div className="contact__line"><Clock size={16} /> Mon–Fri · 9:00–18:00 MMT</div>
            </div>

          </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
