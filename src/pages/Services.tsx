import { Link } from 'react-router-dom';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import FlagTicker from '../components/FlagTicker';
import PartnerDetailPanel from '../components/PartnerDetailPanel';
import { PARTNERS_LIST, type SchoolPartner } from '../data/partners';
import { pickByLanguage, useLanguage } from '../context/LanguageContext';
import iconStudentConsultation from '../assets/icon-student-male-skin-type-1.png';
import iconSvcUniversity from '../assets/icon-svc-university.png';
import iconSvcVisa from '../assets/icon-svc-visa.png';
import iconSvcParentGuardian from '../assets/icon-svc-parent-guardian.png';
import iconSvcDocument from '../assets/icon-svc-document.png';
import iconSvcStayExtension from '../assets/icon-svc-stay-extension.png';
import iconSvcHome from '../assets/icon-svc-home.png';
import './Services.css';

const SERVICES_PAGE_LEDE_EN =
  "Seven services, in the order students typically need them. We work end-to-end so you don't hand off your file three times to three different consultants.";

const SERVICES_PAGE_LEDE_MM =
  'Win Education Consulting မှ ပညာရေးအကြံပေးခြင်း၊ ကျောင်းလျှောက်ထားခြင်း၊ ဗီဇာလျှောက်ထားခြင်း၊ အုပ်ထိန်းသူဆောင်ရွက်ခြင်း၊ ကျောင်းသားပါမစ်သက်တမ်းတိုးခြင်း၊ ယာယီနေထိုင်ခွင့်ပါမစ်သက်တမ်းတိုးခြင်းနှင့် အခြေချနေထိုင်ရေး ဝန်ဆောင်မှုများကို တစ်နေရာတည်းတွင် ဆောင်ရွက်ပေးပါသည်။';

const SERVICES = [
  {
    icon: (
      <img
        src={iconStudentConsultation}
        alt=""
        width={100}
        height={100}
        className="svc__icon-img"
        decoding="async"
      />
    ),
    title: 'Education Consultation',
    titleMm: 'ပညာရေးအကြံပေးဝန်ဆောင်မှု',
    desc: 'Personalized guidance to help you choose the right country, school, and program for your goals.',
    descMm:
      'သင့်ရည်မှန်းချက်နှင့်ကိုက်ညီမယ့် နိုင်ငံ၊ ကျောင်းနှင့် ဘာသာရပ်ကို ရွေးချယ်နိုင်ဖို့ တစ်ဦးချင်းအကြံပေးဆွေးနွေးခြင်း။',
    deliverables: ['Goals & eligibility check', 'Country & program shortlist', 'Budget & intake planning'],
    deliverablesMm: ['ရည်မှန်းချက်နှင့် လျှောက်ထားနိုင်မှုစစ်ဆေးခြင်း', 'နိုင်ငံနှင့်ဘာသာရပ် ရွေးချယ်ပေးခြင်း', 'ကုန်ကျစရိတ်နှင့် အချိန်ဇယားစီစဉ်ခြင်း'],
  },
  {
    icon: (
      <img src={iconSvcUniversity} alt="" width={64} height={64} className="svc__icon-img" decoding="async" />
    ),
    title: 'School Application',
    titleMm: 'ကျောင်းလျှောက်ထားပေးခြင်း',
    desc: 'End-to-end support with applications, essays, and documents to maximize your admission chances.',
    descMm:
      'လျှောက်လွှာ၊ Essay နှင့် စာရွက်စာတမ်းများကို အစအဆုံးကူညီပြီး ကျောင်းဝင်ခွင့်ရရှိနိုင်ခြေ မြင့်တက်စေဖို့ ဆောင်ရွက်ပေးခြင်း။',
    deliverables: ['Transcript & credential review', 'Application submission'],
    deliverablesMm: ['အမှတ်စာရင်းနှင့် အရည်အချင်းသုံးသပ်ခြင်း', 'ကျောင်းလျှောက်လွှာတင်သွင်းခြင်း'],
  },
  {
    icon: <img src={iconSvcVisa} alt="" width={64} height={64} className="svc__icon-img" decoding="async" />,
    title: 'Visa Application',
    titleMm: 'ဗီဇာလျှောက်ထားပေးခြင်း',
    desc: 'Complete visa filing assistance with document prep and review to avoid costly mistakes.',
    descMm:
      'စာရွက်စာတမ်းပြင်ဆင်ခြင်းမှ တင်သွင်းခြင်းအထိ အပြည့်အဝကူညီပြီး အမှားအယွင်းမရှိစေရန် စစ်ဆေးပေးခြင်း။',
    deliverables: ['Permit filing', 'Biometrics scheduling', 'Medical exam booking'],
    deliverablesMm: ['ပါမစ်လျှောက်ထားပေးခြင်း', 'Biometrics စီစဉ်ပေးခြင်း', 'ဆေးစစ်ချိန်းဆိုပေးခြင်း'],
  },
  {
    icon: (
      <img src={iconSvcParentGuardian} alt="" width={100} height={100} className="svc__icon-img" decoding="async" />
    ),
    title: 'Custodianship',
    titleMm: 'အုပ်ထိန်းသူဆောင်ရွက်ပေးခြင်း',
    desc: 'Legally appointed custodian services for minor students studying abroad.',
    descMm:
      'အသက်မပြည့်သေးတဲ့ ကျောင်းသား/သူများအတွက် နိုင်ငံခြားတွင် တရားဝင် Custodian အဖြစ် ဆောင်ရွက်ပေးခြင်း။',
    refLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/minor-children.html',
    refLabelPrefix: '⚠️',
    refLabel: 'IRCC minor children guidance',
    deliverables: ['Custodian declaration', 'Notarized forms', 'Guardian liaison'],
    deliverablesMm: ['Custodian ကြေညာစာ', 'Notary လက်မှတ်ထိုးစာရွက်များ', 'မိဘနှင့် အုပ်ထိန်းသူ ဆက်သွယ်ပေးခြင်း'],
  },
  {
    icon: <img src={iconSvcDocument} alt="" width={100} height={100} className="svc__icon-img" decoding="async" />,
    title: 'Study Permit Extension',
    titleMm: 'ကျောင်းသားပါမစ်သက်တမ်းတိုးခြင်း',
    desc: 'Renew your study permit on time with full document and submission support.',
    descMm:
      'သတ်မှတ်ရက်အတွင်း မှန်ကန်စွာ သက်တမ်းတိုးနိုင်ဖို့ စာရွက်စာတမ်းနှင့် တင်သွင်းမှု အပြည့်အဝကူညီခြင်း။',
    deliverables: ['Eligibility & status review', 'Document checklist', 'Renewal filing'],
    deliverablesMm: ['လျှောက်ထားနိုင်မှုနှင့် အခြေအနေသုံးသပ်ခြင်း', 'လိုအပ်သောစာရွက်စာတမ်းစာရင်း', 'သက်တမ်းတိုးလျှောက်လွှာတင်ခြင်း'],
  },
  {
    icon: <img src={iconSvcStayExtension} alt="" width={64} height={64} className="svc__icon-img" decoding="async" />,
    title: 'Entry Permit Extension',
    titleMm: 'ယာယီနေထိုင်ခွင့်ပါမစ်သက်တမ်းတိုးခြင်း',
    desc: 'Extend your stay legally with proper paperwork and timely filing.',
    descMm:
      'တရားဝင် ဆက်လက်နေထိုင်နိုင်ဖို့ စာရွက်စာတမ်းပြင်ဆင်ပြီး အချိန်မီတင်သွင်းပေးခြင်း။',
    deliverables: ['Eligibility & status review', 'Document checklist', 'Renewal filing'],
    deliverablesMm: ['လျှောက်ထားနိုင်မှုနှင့် အခြေအနေသုံးသပ်ခြင်း', 'လိုအပ်သောစာရွက်စာတမ်းစာရင်း', 'သက်တမ်းတိုးလျှောက်လွှာတင်ခြင်း'],
  },
  {
    icon: <img src={iconSvcHome} alt="" width={100} height={100} className="svc__icon-img" decoding="async" />,
    title: 'Settlement Service',
    titleMm: 'အခြေချနေထိုင်ရေးဝန်ဆောင်မှု',
    desc: 'Airport pickup, housing, banking, and orientation to help you settle in smoothly.',
    descMm:
      'လေဆိပ်ကြိုဆိုခြင်း၊ နေရာထိုင်ခင်း၊ ဘဏ်အကောင့်ဖွင့်ရန်ကူညီခြင်းနှင့် လမ်းညွှန်ဝန်ဆောင်မှုများဖြင့် အဆင်ပြေချောမွေ့စွာ အခြေချနိုင်အောင် ကူညီပေးခြင်း။',
    deliverables: ['Airport pickup', 'Accommodation help', 'Bank account setup'],
    deliverablesMm: ['လေဆိပ်ကြိုဆိုခြင်း', 'နေရာထိုင်ခင်းရှာဖွေပေးခြင်း', 'ဘဏ်အကောင့်ဖွင့်ပေးခြင်း'],
  },
];

export default function Services() {
  const { language } = useLanguage();
  const partnerViewportRef = useRef<HTMLDivElement | null>(null);
  const partnerModalCloseRef = useRef<HTMLButtonElement | null>(null);
  const PARTNER_SLIDES_LOOP = [...PARTNERS_LIST, ...PARTNERS_LIST, ...PARTNERS_LIST];
  const [modalPartner, setModalPartner] = useState<SchoolPartner | null>(null);

  const closePartnerModal = useCallback(() => setModalPartner(null), []);

  useLayoutEffect(() => {
    if (!modalPartner) return;
    partnerModalCloseRef.current?.focus();
  }, [modalPartner]);

  useEffect(() => {
    if (!modalPartner) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePartnerModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalPartner, closePartnerModal]);

  useEffect(() => {
    const viewport = partnerViewportRef.current;
    if (!viewport) return;

    const singleSetWidth = viewport.scrollWidth / 3;
    viewport.scrollLeft = singleSetWidth;
  }, []);

  const scrollPartners = (direction: 'left' | 'right') => {
    const viewport = partnerViewportRef.current;
    if (!viewport) return;
    const scrollAmount = Math.max(260, Math.round(viewport.clientWidth * 0.7));

    viewport.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handlePartnerScroll = () => {
    const viewport = partnerViewportRef.current;
    if (!viewport) return;

    const singleSetWidth = viewport.scrollWidth / 3;
    const minThreshold = singleSetWidth * 0.5;
    const maxThreshold = singleSetWidth * 1.5;

    if (viewport.scrollLeft < minThreshold) {
      viewport.scrollLeft += singleSetWidth;
    } else if (viewport.scrollLeft > maxThreshold) {
      viewport.scrollLeft -= singleSetWidth;
    }
  };

  const partnerModal =
    modalPartner &&
    createPortal(
      <div
        className="svc__partner-modal-root"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closePartnerModal();
        }}
      >
        <div
          className="svc__partner-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`svc-partner-modal-${modalPartner.slug}-title`}
        >
          <button
            ref={partnerModalCloseRef}
            type="button"
            className="svc__partner-detail-modal-close"
            onClick={closePartnerModal}
            aria-label="Close school details"
          >
            <X size={20} strokeWidth={2} />
          </button>
          <div className="svc__partner-detail-modal-body">
            <PartnerDetailPanel
              partner={modalPartner}
              variant="modal"
              titleLevel="h2"
              idPrefix={`svc-partner-modal-${modalPartner.slug}`}
            />
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <main className={`page-enter services-page ${language === 'my' ? 'services-page--my' : ''}`}>
      <PageHeader
        eyebrow="Services"
        title={
          language === 'my' ? (
            <>Win Education မှဝန်ဆောင်မှုများ</>
          ) : (
            <>
              What we <em>actually</em>
              <br />
              do for you.
            </>
          )
        }
        lede={pickByLanguage(language, SERVICES_PAGE_LEDE_EN, SERVICES_PAGE_LEDE_MM)}
        compact
      />

      <section className="svc__network" aria-label="Global destinations">
        <section className="svc__ticker-section" aria-label="Coverage metrics and countries">
          <div className="container">
            <div className="svc__ticker-rail">
              <aside className="svc__ticker-badge" aria-label="Coverage summary">
                <div className="svc__ticker-badge-row">
                  <span className="svc__ticker-badge-value">8</span>
                  <span className="svc__ticker-badge-label">Countries</span>
                </div>
                <div className="svc__ticker-badge-row">
                  <span className="svc__ticker-badge-value">150+</span>
                  <span className="svc__ticker-badge-label">Institutions</span>
                </div>
              </aside>
              <FlagTicker speed={72} direction="left" lines={2} forceAnimation />
            </div>
          </div>
        </section>
      </section>

      <section className="svc__network svc__network--institutions" aria-label="Institution partners slider">
        <section className="svc__ticker-section" aria-label="Institution slider">
          <div className="container">
            <div className="svc__ticker-rail svc__ticker-rail--slider">
              <aside className="svc__ticker-badge" aria-label="Institution partner label">
                <div className="svc__ticker-badge-row svc__ticker-badge-row--partners">
                  <span className="svc__ticker-badge-text">Our Partners</span>
                </div>
              </aside>

              <div className="svc__partner-slider">
                <button
                  type="button"
                  className="svc__partner-nav"
                  aria-label="Previous partners"
                  onClick={() => scrollPartners('left')}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="svc__partner-slider-viewport" ref={partnerViewportRef} onScroll={handlePartnerScroll}>
                  {PARTNER_SLIDES_LOOP.map((partner, idx) => (
                    <button
                      type="button"
                      className="svc__partner-card"
                      key={`${partner.slug}-${idx}`}
                      onClick={() => setModalPartner(partner)}
                      aria-haspopup="dialog"
                      aria-label={`${partner.name}, ${partner.meta}. Open partner details.`}
                    >
                      <div className="svc__partner-logo-slot">
                        <img className="svc__partner-logo-image" src={partner.logo} alt="" />
                      </div>
                      <div className="svc__partner-body">
                        <div className="svc__partner-text">
                          <span className="svc__partner-name">{partner.name}</span>
                          <p className="svc__partner-meta">{partner.meta}</p>
                        </div>
                        <span className="svc__partner-action">
                          <span>View details</span>
                          <ChevronRight className="svc__partner-action-icon" size={15} aria-hidden />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="svc__partner-nav"
                  aria-label="Next partners"
                  onClick={() => scrollPartners('right')}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="section">
        <div className="container svc__grid">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              className="svc__card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <div className="svc__icon">{s.icon}</div>
              <h3 className="svc__title">{pickByLanguage(language, s.title, s.titleMm)}</h3>
              <p className="svc__desc">{pickByLanguage(language, s.desc, s.descMm)}</p>
              {s.refLink ? (
                <a className="svc__ref-link" href={s.refLink} target="_blank" rel="noreferrer">
                  {'refLabelPrefix' in s && s.refLabelPrefix ? (
                    <>
                      <span aria-hidden>{String(s.refLabelPrefix)}</span>
                      {' '}
                    </>
                  ) : null}
                  {s.refLabel ?? 'Official reference'}
                </a>
              ) : null}
              <ul className="svc__deliv">
                {s.deliverables.map((d, idx) => (
                  <li key={d}>{pickByLanguage(language, d, s.deliverablesMm?.[idx])}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section svc__cta-section">
        <div className="container">
          <div className="svc__cta">
            <h3 className="h-display svc__cta-title">Ready To <em>Explore Your Options</em>?</h3>
            <p>Book a free call. No fee, no commitment.</p>
            <Link to="/contact" className="btn btn-primary">Request Consultation</Link>
          </div>
        </div>
      </section>

      {partnerModal}
    </main>
  );
}
