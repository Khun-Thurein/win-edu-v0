import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import heroGraduates from '../assets/hero-graduates.png';
import heroTulips from '../assets/hero-student-life-tulips.png';
import heroWalk from '../assets/hero-student-life-walk.png';
import { pickByLanguage, useLanguage } from '../context/language';
import './Hero.css';

const HERO_LEDE_EN =
  'We navigate admissions, documentation, visas, and student life across multiple countries — quietly, carefully, and tailored to where you want to go next.';

const HERO_LEDE_MY =
  'WIN Education မှကျောင်းဝင်ခွင့်လျှောက်ထားခြင်း၊ စာရွက်စာတမ်းပြင်ဆင်ခြင်း၊ ဗီဇာကိစ္စရပ်များနဲ့ နိုင်ငံခြားရောက် ကျောင်းသားဘဝအတွက် လိုအပ်တာတွေအထိ — နိုင်ငံပေါင်းများစွာမှာ ကိုယ်စားဝန်ဆောင်မှုပေးလျက်ရှိပါတယ်။ ကိုယ်ရောက်ချင်တဲ့နေရာအလိုက် တိတိကျကျ၊ သေသေချာချာ၊ မလိုအပ်တဲ့ ရှုပ်ထွေးမှုတွေမပါဘဲ စီစဉ်ပေးပါတယ်။';

const HERO_SLIDES = [
  { src: heroGraduates, alt: 'Graduating students in caps and gowns' },
  {
    src: heroTulips,
    alt: 'Students together outdoors with tulips and mountains in the background',
  },
  {
    src: heroWalk,
    alt: 'Students walking together in a neighborhood',
  },
] as const;

export default function Hero() {
  const { language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__head">
            <motion.h3
              className="hero__title hero__title--hero h-display section__title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Pathway To Studying
              <br />
              Abroad <span className="hero__title-soft">Starts</span> Here
            </motion.h3>
          </div>

          <div className="hero__content">
            <motion.div
              className="hero__block hero__content-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className={`hero__lede ${language === 'my' ? 'hero__lede--my' : ''}`}>
                {pickByLanguage(language, HERO_LEDE_EN, HERO_LEDE_MY)}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero__media"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__carousel">
            <div className="hero__carousel__viewport" ref={emblaRef}>
              <div className="hero__carousel__container">
                {HERO_SLIDES.map((slide, i) => (
                  <div className="hero__carousel__slide" key={`hero-slide-${i}`}>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="hero__carousel-btn hero__carousel-btn--prev"
              onClick={scrollPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="hero__carousel-btn hero__carousel-btn--next"
              onClick={scrollNext}
              aria-label="Next photo"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>

            <div className="hero__carousel-dots" role="tablist" aria-label="Hero photos">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === selectedIndex}
                  className={`hero__carousel-dot ${i === selectedIndex ? 'hero__carousel-dot--active' : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Photo ${i + 1} of ${HERO_SLIDES.length}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link to="/services" className="btn btn-primary">
            See Services <ArrowUpRight size={16} />
          </Link>
          <Link to="/success-story" className="btn btn-ghost">
            Student Stories <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
