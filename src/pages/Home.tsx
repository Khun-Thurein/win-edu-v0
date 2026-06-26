import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import WhoWeAreCarousel from '../components/WhoWeAreCarousel';
import HomeSpotlightCarousel from '../components/HomeSpotlightCarousel';
import FieldNotesLoop from '../components/FieldNotesLoop';
import Stats from '../components/Stats';
import FAQ from '../components/FAQ';
import CountUpNumber from '../components/CountUpNumber';
import { HOME_METRIC_CARDS } from '../data/successMetrics';
import { FIELD_NOTES_HOME_SLIDES } from '../data/fieldNotesHomeSlides';
import { WHO_WE_ARE_SLIDES } from '../data/whoWeAreSlides';
import { pickByLanguage, useLanguage } from '../context/language';
import './Home.css';

const WHO_WE_ARE_BODY_EN =
  'WIN Education is a consultancy focused on international study: we help families compare destinations and schools, prepare honest applications, and understand visa timelines without passing your file between disconnected offices. From first conversation to arrival, you work with people who stay with your case.';

const WHO_WE_ARE_BODY_MY =
  'WIN Education က နိုင်ငံခြားမှာ ပညာသင်ချင်တဲ့သူတွေအတွက် လမ်းညွှန်ပေးနေတာပါ။ ဘယ်နိုင်ငံကို သွားမလဲ၊ ဘယ်ကျောင်းက ကိုယ်နဲ့ ကိုက်ညီမလဲဆိုတာကစလို့ လျှောက်လွှာတင်တဲ့အဆင့်၊ ဗီဇာကိစ္စ၊ ကနေဒါမှာ ခြေချတဲ့နေ့အထိ — အစအဆုံး WIN ကပဲ တာဝန်ယူ ဆောင်ရွက်ပေးပါတယ်။';

const WHO_WE_ARE_CTA_EN = 'Request Consultation';
const WHO_WE_ARE_CTA_MY = 'Booking ယူရန်';

const FAQS = [
  {
    q: 'Which countries do you help students apply to?',
    qMy: 'ဘယ်နိုင်ငံတွေကို လျှောက်ထားဖို့ ကူညီပေးလဲ?',
    a: 'We support study plans across Canada, Germany, Singapore, Malaysia, China, New Zealand, the United Kingdom, and the United States.',
    aMy:
      'ကနေဒါ၊ ဂျာမနီ၊ စင်္ကာပူ၊ မလေးရှား၊ တရုတ်၊ နယူးဇီလန်၊ ယူနိုက်တက်ကင်းဒမ်း (UK) နှင့် အမေရိကန် (US) နိုင်ငံများသို့ သွားရောက်ပညာသင်ယူရန် အစီအစဉ်များကို ကူညီပေးပါသည်။',
  },
  {
    q: 'When should I begin the application process?',
    qMy: 'လျှောက်ထားမှုကို ဘယ်အချိန်ကစတင်သင့်လဲ?',
    a: 'For September intake we recommend starting at least 5-6 months ahead. That gives us breathing room for transcript evaluation, language testing, statement of purpose drafting, financial documentation, and the visa application itself.',
    aMy:
      'စက်တင်ဘာ Intake အတွက် အနည်းဆုံး ၅-၆လ ကြိုတင်စတင်ဖို့ အကြံပြုပါတယ်။ ဒါမှသာ အမှတ်စာရင်းသုံးသပ်ခြင်း၊ ဘာသာစကားစာမေးပွဲ၊ Statement of Purpose ရေးသားခြင်း၊ ငွေကြေးအထောက်အထားပြင်ဆင်ခြင်းနှင့် ဗီဇာလျှောက်ထားခြင်းတို့အတွက် အချိန်လုံလောက်စွာ ရရှိမှာဖြစ်ပါတယ်။',
  },
  {
    q: 'Do you handle visa and study permit paperwork?',
    qMy: 'ဗီဇာနဲ့ ကျောင်းသားပါမစ် စာရွက်စာတမ်းတွေ ကူညီပေးလား?',
    a: 'Yes. We prepare and review destination-specific student visas, study permits, biometric steps, and accompanying family documentation where applicable.',
    aMy:
      'ဟုတ်ကဲ့၊ ကူညီပေးပါတယ်။ သွားရောက်မည့်နိုင်ငံအလိုက် ကျောင်းသားဗီဇာ၊ ကျောင်းသားပါမစ်၊ Biometrics၊ နှင့် မိသားစုဝင်စာရွက်စာတမ်းများ (လိုအပ်ပါက) ကို ပြင်ဆင်ပေးပြီး စစ်ဆေးပေးပါသည်။',
  },
];

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="page-enter">
      <Hero />
      <Stats plain>
        <div className="container stats__metrics">
          <div className="success-metrics success-metrics--quad">
            {HOME_METRIC_CARDS.map((metric) => (
              <div className="success-metric" key={metric.label}>
                <span className="success-metric__icon">{metric.icon}</span>
                <strong><CountUpNumber value={metric.value} /></strong>
                <span className="success-metric__label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Stats>

      {/* Who we are */}
      <section className="section quote" aria-labelledby="home-who-we-are-heading">
        <div className="container quote__inner quote__inner--split">
          <div className="quote__grid">
            <div className="quote__copy">
              <span className="eyebrow">Who we are</span>
              <h2 id="home-who-we-are-heading" className="h-display quote__title">
                We prioritize your individual needs and goals.
              </h2>
              <p className={`quote__body ${language === 'my' ? 'quote__body--my' : ''}`}>
                {pickByLanguage(language, WHO_WE_ARE_BODY_EN, WHO_WE_ARE_BODY_MY)}
              </p>
              <p className="quote__attribution">WIN</p>
              <Link
                to="/contact"
                className={`btn btn-primary quote__cta ${language === 'my' ? 'quote__cta--my' : ''}`}
              >
                {pickByLanguage(language, WHO_WE_ARE_CTA_EN, WHO_WE_ARE_CTA_MY)}
              </Link>
            </div>
            <div className="quote__media">
              <WhoWeAreCarousel slides={WHO_WE_ARE_SLIDES} label="Recognition and awards" />
            </div>
          </div>
        </div>
      </section>

      <HomeSpotlightCarousel />

      <section className="section" aria-labelledby="home-field-notes-heading">
        <div className="container">
          <div className="section__head home-field-notes__head">
            <div>
              <span className="eyebrow">Field Notes</span>
              <h2 id="home-field-notes-heading" className="h-display section__title">
                Guides &amp; <em>Updates</em>
              </h2>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 48 }}>
          <FieldNotesLoop slides={FIELD_NOTES_HOME_SLIDES} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="h-display section__title">
              We <em>answered</em><br />all of it.
            </h2>
            <Link to="/contact" className="btn btn-ghost" style={{ marginTop: 24 }}>
              Ask your question
            </Link>
          </div>
          <FAQ items={FAQS} />
        </div>
      </section>
    </main>
  );
}
