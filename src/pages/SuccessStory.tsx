import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import FieldNotesLoop from '../components/FieldNotesLoop';
import CountUpNumber from '../components/CountUpNumber';
import { SUCCESS_METRICS } from '../data/successMetrics';
import { SUCCESS_STORY_SLIDES } from '../data/successStorySlides';
import { pickByLanguage, useLanguage } from '../context/language';
import './SuccessStory.css';

const SUCCESS_STORY_HEADER_EYEBROW = 'Success Story';

const SUCCESS_STORY_HEADER_TITLE_MY = 'ကျောင်းသားများ၏ အောင်မြင်မှုပုံရိပ်များ';

const SUCCESS_STORY_HEADER_LEDE_EN =
  'Recent pathways across Canada, the UK, Australia, Asia, and Europe.';
const SUCCESS_STORY_HEADER_LEDE_MY =
  'ကနေဒါ၊ ယူကေ၊ ဩစတြေးလျ၊ အာရှနဲ့ ဥရောပနိုင်ငံများကို မကြာသေးခင်က ထွက်ခွာသွားခဲ့တဲ့ ကျောင်းသားများ။';

const FEATURED = {
  title: <>A consulting team built for <em>global study plans.</em></>,
  desc: 'We help students compare destinations, choose realistic schools, prepare documents, and understand visa timelines without handing their file from one office to another. The goal is simple: one clear plan from first conversation to first semester.',
};

const FEATURED_IMAGES = [
  {
    src: '/images/graduation-cohort.png',
    alt: 'Graduating international student cohort in caps and gowns',
  },
  {
    src: '/images/graduation-group-2.png',
    alt: 'Graduates and advisor posing together indoors',
  },
  {
    src: '/images/graduation-event-1.png',
    alt: 'Graduation celebration group photo with students and flowers',
  },
  {
    src: '/images/graduation-event-2.png',
    alt: 'Students dressed for graduation event portrait',
  },
  {
    src: '/images/graduation-event-3.png',
    alt: 'Family-style graduation photo with bouquet and supporters',
  },
];

const TESTIMONIALS = [
  {
    quoteEn: 'WIN made my dream of studying in Canada a smooth and stress-free reality.',
    quoteMy: 'WIN ရဲ့အကူအညီကြောင့် Alexander College မှာ ပညာသင်ဖို့ ကနေဒါအိပ်မက်ကို လွယ်ကူစွာ အကောင်အထည်ဖော်နိုင်ခဲ့ပါတယ်။',
    nameEn: 'Kaung Kyaw San',
    nameMy: '',
    schoolEn: 'Alexander College',
    schoolMy: 'Alexander College',
  },
  {
    quoteEn: 'Fast, professional support — I got my student visa and into BCIT in no time.',
    quoteMy: 'မြန်ဆန်ပြီး ပရော်ဖက်ရှင်နယ် ဝန်ဆောင်မှုကြောင့် BCIT ဝင်ခွင့်နဲ့ Student Visa ကို အချိန်တိုအတွင်း ရရှိခဲ့ပါတယ်။',
    nameEn: 'Htet Kaung San',
    nameMy: '',
    schoolEn: 'BCIT',
    schoolMy: 'BCIT',
  },
  {
    quoteEn: 'Miss Indra went above and beyond to help me study in Canada.',
    quoteMy: 'Miss Indra ရဲ့ အထူးကူညီမှုကြောင့် Alexander College မှာ ကနေဒါပညာရေးကို စတင်နိုင်ခဲ့ပါတယ်။',
    nameEn: 'Ingyin Maung Maung',
    nameMy: '',
    schoolEn: 'Alexander College',
    schoolMy: 'Alexander College',
  },
  {
    quoteEn: 'Reliable and professional — WIN handled everything from start to finish.',
    quoteMy: 'ယုံကြည်စိတ်ချရတဲ့ WIN ကြောင့် Alexander College မှာ လေ့လာရေးအခွင့်အရေးကို လွယ်ကူစွာ ရရှိခဲ့ပါတယ်။',
    nameEn: 'Min Thant',
    nameMy: '',
    schoolEn: 'Alexander College',
    schoolMy: 'Alexander College',
  },
  {
    quoteEn: 'Highly professional service — I confidently recommend WIN to future students.',
    quoteMy: 'ပရော်ဖက်ရှင်နယ် WIN ရဲ့ ဝန်ဆောင်မှုကြောင့် BCIT မှာ ယုံကြည်စွာ ပညာသင်နေပါတယ်။',
    nameEn: 'Min Htet Kyaw',
    nameMy: '',
    schoolEn: 'BCIT',
    schoolMy: 'BCIT',
  },
  {
    quoteEn: 'A trustworthy agency dedicated to helping Myanmar students succeed abroad.',
    quoteMy: 'ယုံကြည်စိတ်ချရတဲ့ WIN ကြောင့် BCIT မှာ ပညာသင်နိုင်ခဲ့ပါတယ်။',
    nameEn: 'Htin Shar',
    nameMy: '',
    schoolEn: 'BCIT',
    schoolMy: 'BCIT',
  },
  {
    quoteEn: 'Fast, knowledgeable service with excellent support every step of the way.',
    quoteMy: 'မြန်ဆန်ပြီး နားလည်မှုမြင့်တဲ့ WIN ရဲ့ ဝန်ဆောင်မှုကြောင့် VCC ဝင်ခွင့်နဲ့ Visa ကို လွယ်ကူစွာ ရရှိခဲ့ပါတယ်။',
    nameEn: 'Khin Mar',
    nameMy: '',
    schoolEn: 'VCC',
    schoolMy: 'VCC',
  },
  {
    quoteEn: 'WIN gave me the opportunity to upgrade my future in Canada.',
    quoteMy: 'WIN ကြောင့် Langara College မှာ ပညာရေးအခွင့်အရေးအသစ်တွေကို ရရှိခဲ့ပါတယ်။',
    nameEn: 'Khant Kyaw Htin',
    nameMy: '',
    schoolEn: 'Langara College',
    schoolMy: 'Langara College',
  },
  {
    quoteEn: 'Even in my 30s, WIN helped me successfully secure admission and a visa.',
    quoteMy: 'WIN ရဲ့ အကူအညီကြောင့် Douglas College ဝင်ခွင့်နဲ့ Visa ကို အောင်မြင်စွာ ရရှိခဲ့ပါတယ်။',
    nameEn: 'Nandar Aye',
    nameMy: '',
    schoolEn: 'Douglas College',
    schoolMy: 'Douglas College',
  },
  {
    quoteEn:
      'They truly care about both students and parents. Even after arriving in Canada, they continue to look after the students like their own—very trustworthy.',
    quoteMy:
      'ကလေးတွေနဲ့ မိဘတွေအပေါ် စိတ်စေတနာတွေ အရမ်းအပြည့်အဝထားပြီး ဆောင်ရွက်ပေးပါတယ် ကနေဒါရောက်ပြီးတာတောင် ကိုယ့်သားသမီးလို အမြဲစောင့်ရှောက်ပေးတဲ့ အရမ်းယုံကြည်စိတ်ချရတဲ့ win Education ပါနော်',
    nameEn: 'Ma Thandar',
    nameMy: '',
    schoolEn: 'Ma Thandar Parent',
    schoolMy: 'မိဘ',
  },
  {
    quoteEn:
      'They treat students with genuine care like family, with patience and dedication. WIN Education is truly reliable, and Aunty Moe is a great support for parents.',
    quoteMy:
      'တကယ့် မိသားစုရင်း ပမာကလေးတွေအပေါ် မေတ္တာထားပြီး စိတ်ရှည်သည်းခံ ၊ စိတ်ချရတာ win education ပါ။ အန်တီမိုးကလဲ ကလေးမိဘတွေအတွက် အကြည်ဓာတ်လေးပါ',
    nameEn: 'Burmese Buddhist Society of BC',
    nameMy: '',
    schoolEn: 'Community',
    schoolMy: 'အသိုင်းအဝိုင်း',
  },
  {
    quoteEn:
      'They support students with everything they need and care for them like family. Wishing WIN continued growth and success.',
    quoteMy:
      'ကလေးတွေကိုလိုအပ်တာကူညီပြီးမိသားစုလိုစောင့်ရှောက်ပေး နေသော win education ပါရှင် ဆထက်ထမ်းပိုးတိုးတက်အောင်မြင်ပါစေ မမိုးနဲ့မဥ္ဇူ',
    nameEn: 'Kyi Kyi',
    nameMy: '',
    schoolEn: 'Kyi Kyi Parent',
    schoolMy: 'မိဘ',
  },
  {
    quoteEn: 'Thank you for helping with such genuine care and kindness. Wishing you even greater success ahead.',
    quoteMy:
      'တကယ်မိသားစု စိတ်အပြည့်နဲ့ ကူညီတာ ကျေးဇူးပါညီမလေး မိုး ဒီထက်မကအဆပေါင်းများစွာအောင်မြင်ပါစေနော်',
    nameEn: 'Ma Htay',
    nameMy: '',
    schoolEn: 'Ma Htay Parent',
    schoolMy: 'မိဘ',
  },
  {
    quoteEn: 'They treat students like their own family, and you can truly trust WIN Education.',
    quoteMy: 'တကယ့် မိသားစု လိုမျိုး ကလေးတွေအပေါ် သဘောထားပြီး စိတ်ချရတာ win education ပါ',
    nameEn: 'Hninnilar Kyaw',
    nameMy: '',
    schoolEn: 'Hninnilar Kyaw Parent',
    schoolMy: 'မိဘ',
  },
];

const TESTIMONIALS_LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

/** One testimonial card advance per tick (paired with `.testimonial-ticker__track { gap: 20px }`). */
const TESTIMONIAL_AUTO_ADVANCE_MS = 4000;
const TESTIMONIAL_CARD_GAP_PX = 20;

export default function SuccessStory() {
  const [featuredIndex, setFeaturedIndex] = useState(3);
  const { language } = useLanguage();
  const testimonialTickerRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const userScrollingRef = useRef(false);
  const resumeScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % FEATURED_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = testimonialTickerRef.current;
    if (!el) return;

    const clearResumeTimer = () => {
      if (resumeScrollTimerRef.current) {
        clearTimeout(resumeScrollTimerRef.current);
        resumeScrollTimerRef.current = null;
      }
    };

    const scheduleAutoResume = () => {
      clearResumeTimer();
      resumeScrollTimerRef.current = setTimeout(() => {
        userScrollingRef.current = false;
        resumeScrollTimerRef.current = null;
      }, 700);
    };

    const markUserScroll = () => {
      if (programmaticScrollRef.current) return;
      userScrollingRef.current = true;
      scheduleAutoResume();
    };

    const markUserActive = () => {
      userScrollingRef.current = true;
      scheduleAutoResume();
    };

    const handleScroll = () => {
      const box = testimonialTickerRef.current;
      if (box) {
        const half = box.scrollWidth / 2;
        if (half > 20 && box.scrollLeft >= half - 0.5) {
          box.scrollLeft -= half;
        }
      }
      markUserScroll();
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('wheel', markUserActive, { passive: true });
    el.addEventListener('touchstart', markUserActive, { passive: true });
    el.addEventListener('pointerdown', markUserActive);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getStepPx = () => {
      const card = el.querySelector('.testimonial-card');
      if (!card) return 0;
      return card.getBoundingClientRect().width + TESTIMONIAL_CARD_GAP_PX;
    };

    const advanceTestimonials = () => {
      if (document.visibilityState === 'hidden') return;
      const box = testimonialTickerRef.current;
      if (!box || reduceMotion.matches || userScrollingRef.current) return;
      const step = getStepPx();
      if (step <= 0) return;

      programmaticScrollRef.current = true;
      box.scrollBy({ left: step, behavior: 'smooth' });

      let finished = false;
      const finishProgrammatic = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(fallbackTimer);
        box.removeEventListener('scrollend', finishProgrammatic);
        programmaticScrollRef.current = false;
      };
      const fallbackTimer = window.setTimeout(finishProgrammatic, 600);
      box.addEventListener('scrollend', finishProgrammatic, { once: true });
    };

    const intervalId = window.setInterval(advanceTestimonials, TESTIMONIAL_AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(intervalId);
      clearResumeTimer();
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('wheel', markUserActive);
      el.removeEventListener('touchstart', markUserActive);
      el.removeEventListener('pointerdown', markUserActive);
    };
  }, [language]);

  useEffect(() => {
    userScrollingRef.current = false;
    const el = testimonialTickerRef.current;
    if (el) el.scrollLeft = 0;
  }, [language]);

  const goPrevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + FEATURED_IMAGES.length) % FEATURED_IMAGES.length);
  };

  const goNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % FEATURED_IMAGES.length);
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    const el = testimonialTickerRef.current;
    if (!el) return;

    userScrollingRef.current = true;
    if (resumeScrollTimerRef.current) {
      clearTimeout(resumeScrollTimerRef.current);
    }
    resumeScrollTimerRef.current = setTimeout(() => {
      userScrollingRef.current = false;
      resumeScrollTimerRef.current = null;
    }, 900);

    const amount = Math.max(280, Math.round(el.clientWidth * 0.7));
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <main className={`page-enter success-story-page ${language === 'my' ? 'success-story-page--my' : ''}`}>
      <PageHeader
        eyebrow={SUCCESS_STORY_HEADER_EYEBROW}
        title={
          language === 'my' ? (
            SUCCESS_STORY_HEADER_TITLE_MY
          ) : (
            <>
              Student <em>outcomes.</em>
            </>
          )
        }
        lede={pickByLanguage(language, SUCCESS_STORY_HEADER_LEDE_EN, SUCCESS_STORY_HEADER_LEDE_MY)}
        compact
      />

      {/* Agency overview */}
      <section className="section featured-section">
        <div className="container featured">
          <motion.div
            className="featured__media"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={FEATURED_IMAGES[featuredIndex].src} alt={FEATURED_IMAGES[featuredIndex].alt} />
            <div className="featured__controls">
              <button type="button" className="featured__control-btn" onClick={goPrevFeatured} aria-label="Previous featured photo">
                <ArrowLeft size={16} />
              </button>
              <button type="button" className="featured__control-btn" onClick={goNextFeatured} aria-label="Next featured photo">
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="featured__dots" aria-label="Featured image slides">
              {FEATURED_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`featured__dot ${index === featuredIndex ? 'is-active' : ''}`}
                  onClick={() => setFeaturedIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={index === featuredIndex}
                />
              ))}
            </div>
          </motion.div>

          <div className="featured__body">
            <span className="eyebrow">How we work</span>
            <h2 className="h-display featured__title">{FEATURED.title}</h2>
            <p className="featured__desc">{FEATURED.desc}</p>
          </div>
        </div>
      </section>

      <section className="success-metrics-section">
        <div className="container success-metrics">
          {SUCCESS_METRICS.map((metric) => (
            <div className="success-metric" key={metric.label}>
              <span className="success-metric__icon">{metric.icon}</span>
              <strong><CountUpNumber value={metric.value} /></strong>
              <span className="success-metric__label">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--testimonials-only">
            <div>
              <span className="eyebrow">Testimonials</span>
              <h4 className="h-display section__title testimonials__title">
                Student & Parent <em>Voices</em>
              </h4>
            </div>
          </div>
        </div>
        <div className="testimonial-carousel">
          <button
            type="button"
            className="testimonial-carousel__nav"
            aria-label="Previous testimonials"
            onClick={() => scrollTestimonials('left')}
          >
            <ArrowLeft size={18} />
          </button>
          <div
            ref={testimonialTickerRef}
            className="testimonial-ticker"
            aria-label="Student and parent testimonials"
          >
            <div className="testimonial-ticker__track">
              {TESTIMONIALS_LOOP.map((testimonial, index) => (
                <article className="testimonial-card" key={`${testimonial.nameEn}-${index}`}>
                  <p className={`testimonial-card__quote ${language === 'my' ? 'testimonial-card__quote--my' : ''}`}>
                    "{pickByLanguage(language, testimonial.quoteEn, testimonial.quoteMy)}"
                  </p>
                  <div className="testimonial-card__meta">
                    <strong className="testimonial-card__name">{pickByLanguage(language, testimonial.nameEn, testimonial.nameMy)}</strong>
                    {pickByLanguage(language, testimonial.schoolEn, testimonial.schoolMy) ? (
                      <span className="testimonial-card__school">
                        {pickByLanguage(language, testimonial.schoolEn, testimonial.schoolMy)}
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="testimonial-carousel__nav"
            aria-label="Next testimonials"
            onClick={() => scrollTestimonials('right')}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Carousel of stories */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--single-col">
            <div>
              <span className="eyebrow">Impact</span>
              <h2 className="h-display section__title">
                Visa <em>Success</em> Stories
              </h2>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 48 }}>
          <FieldNotesLoop slides={SUCCESS_STORY_SLIDES} />
        </div>
      </section>
    </main>
  );
}
