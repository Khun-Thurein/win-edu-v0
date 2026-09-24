import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import WhoWeAreCarousel from '../components/WhoWeAreCarousel';
import Stats from '../components/Stats';
import CountUpNumber from '../components/CountUpNumber';
import { HOME_METRIC_CARDS } from '../data/successMetrics';
import { WHO_WE_ARE_SLIDES } from '../data/whoWeAreSlides';
import { pickByLanguage, useLanguage } from '../context/language';
import '../styles/SuccessMetrics.css';
import './Home.css';
import './About.css';

const BODY_EN =
  'WIN Education is a consultancy focused on international study: we help families compare destinations and schools, prepare honest applications, and understand visa timelines without passing your file between disconnected offices. From first conversation to arrival, you work with people who stay with your case.';

const BODY_MY =
  'WIN Education က နိုင်ငံခြားမှာ ပညာသင်ချင်တဲ့သူတွေအတွက် လမ်းညွှန်ပေးနေတာပါ။ ဘယ်နိုင်ငံကို သွားမလဲ၊ ဘယ်ကျောင်းက ကိုယ်နဲ့ ကိုက်ညီမလဲဆိုတာကစလို့ လျှောက်လွှာတင်တဲ့အဆင့်၊ ဗီဇာကိစ္စ၊ ကနေဒါမှာ ခြေချတဲ့နေ့အထိ — အစအဆုံး WIN ကပဲ တာဝန်ယူ ဆောင်ရွက်ပေးပါတယ်။';

const APPROACH_EN =
  'Based in Yangon, we support study plans across Canada, Germany, Singapore, Malaysia, China, New Zealand, the United Kingdom, and the United States. Our team guides students and parents through consultation, applications, visas, and arrival support — end to end.';

const APPROACH_MY =
  'ရန်ကုန်အခြေစိုက်အဖွဲ့အစည်းအနေနဲ့ ကနေဒါ၊ ဂျာမနီ၊ စင်္ကာပူ၊ မလေးရှား၊ တရုတ်၊ နယူးဇီလန်၊ ယူနိုက်တက်ကင်းဒမ်း (UK) နှင့် အမေရိကန် (US) တို့အထိ ပညာသင်ခရီးစဉ်များကို ကူညီပေးပါတယ်။ တိုင်ပင်ဆွေးနွေးခြင်း၊ လျှောက်လွှာ၊ ဗီဇာနှင့် ခြေချတဲ့နေ့အထိ — အစအဆုံး တာဝန်ယူဆောင်ရွက်ပေးပါတယ်။';

export default function About() {
  const { language } = useLanguage();

  return (
    <main className={`page-enter about-page ${language === 'my' ? 'about-page--my' : ''}`}>
      <PageHeader
        eyebrow="About Us"
        title={
          language === 'my' ? (
            'သင့်ရည်မှန်းချက်ကို ဦးစားပေးပါတယ်။'
          ) : (
            <>
              We prioritize your
              <br />
              individual needs and goals.
            </>
          )
        }
        lede={pickByLanguage(
          language,
          'WIN International Education Service — a Yangon-based consultancy helping students plan study abroad.',
          'WIN International Education Service — နိုင်ငံခြားပညာသင်ရန် ကူညီပေးနေသော ရန်ကုန်အခြေစိုက် ပညာရေးအကြံပေးအဖွဲ့အစည်း။'
        )}
        compact
      />

      <Stats plain>
        <div className="container stats__metrics">
          <div className="success-metrics success-metrics--quad">
            {HOME_METRIC_CARDS.map((metric) => (
              <div className="success-metric" key={metric.label}>
                <span className="success-metric__icon">{metric.icon}</span>
                <strong>
                  <CountUpNumber value={metric.value} />
                </strong>
                <span className="success-metric__label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Stats>

      <section className="section quote" aria-labelledby="about-who-heading">
        <div className="container quote__inner quote__inner--split">
          <div className="quote__grid">
            <div className="quote__copy">
              <span className="eyebrow">Who we are</span>
              <h2 id="about-who-heading" className="h-display quote__title">
                {pickByLanguage(
                  language,
                  'Your pathway, guided end to end.',
                  'သင့်ခရီးလမ်းကို အစအဆုံး လိုက်ပါကူညီပေးပါတယ်။'
                )}
              </h2>
              <p className={`quote__body ${language === 'my' ? 'quote__body--my' : ''}`}>
                {pickByLanguage(language, BODY_EN, BODY_MY)}
              </p>
              <p className={`quote__body about__approach ${language === 'my' ? 'quote__body--my' : ''}`}>
                {pickByLanguage(language, APPROACH_EN, APPROACH_MY)}
              </p>
              <p className="quote__attribution">WIN</p>
              <div className="about__actions">
                <Link
                  to="/services"
                  className={`btn btn-ghost ${language === 'my' ? 'quote__cta--my' : ''}`}
                >
                  {pickByLanguage(language, 'Our Services', 'ဝန်ဆောင်မှုများ')}
                </Link>
                <Link
                  to="/contact"
                  className={`btn btn-primary quote__cta ${language === 'my' ? 'quote__cta--my' : ''}`}
                >
                  {pickByLanguage(language, 'Request Consultation', 'Booking ယူရန်')}
                </Link>
              </div>
            </div>
            <div className="quote__media">
              <WhoWeAreCarousel slides={WHO_WE_ARE_SLIDES} label="Recognition and awards" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
