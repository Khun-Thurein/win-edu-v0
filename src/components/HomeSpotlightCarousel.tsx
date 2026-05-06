import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import s01 from '../assets/spotlight/spotlight-01.png';
import s02 from '../assets/spotlight/spotlight-02.png';
import s03 from '../assets/spotlight/spotlight-03.png';
import s04 from '../assets/spotlight/spotlight-04.png';
import s05 from '../assets/spotlight/spotlight-05.png';
import s06 from '../assets/spotlight/spotlight-06.png';
import s07 from '../assets/spotlight/spotlight-07.png';
import s08 from '../assets/spotlight/spotlight-08.png';
import s09 from '../assets/spotlight/spotlight-09.png';
import s10 from '../assets/spotlight/spotlight-10.png';
import s11 from '../assets/spotlight/spotlight-11.png';
import s12 from '../assets/spotlight/spotlight-12.png';
import s13 from '../assets/spotlight/spotlight-13.png';
import s14 from '../assets/spotlight/spotlight-14.png';
import './HomeSpotlightCarousel.css';

/** Order separates tall portrait / compact slides (s02, s03, s14) so they are not adjacent. */
const SLIDE_SOURCES = [s01, s05, s09, s02, s11, s06, s04, s03, s12, s07, s08, s10, s13, s14] as const;

/** Doubled sequence for seamless infinite scroll reset (same idea as `TESTIMONIALS_LOOP`). */
const SLIDE_LOOP = [...SLIDE_SOURCES, ...SLIDE_SOURCES];

export default function HomeSpotlightCarousel() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const userScrollingRef = useRef(false);
  const resumeScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = tickerRef.current;
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

    el.addEventListener('scroll', markUserScroll, { passive: true });
    el.addEventListener('wheel', markUserActive, { passive: true });
    el.addEventListener('touchstart', markUserActive, { passive: true });
    el.addEventListener('pointerdown', markUserActive);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const speedPx = 0.32;
    let rafId = 0;

    const tick = () => {
      const box = tickerRef.current;
      if (box && !reduceMotion.matches && !userScrollingRef.current) {
        const half = box.scrollWidth / 2;
        if (half > 20) {
          programmaticScrollRef.current = true;
          box.scrollLeft += speedPx;
          if (box.scrollLeft >= half - 0.5) {
            box.scrollLeft -= half;
          }
          programmaticScrollRef.current = false;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearResumeTimer();
      el.removeEventListener('scroll', markUserScroll);
      el.removeEventListener('wheel', markUserActive);
      el.removeEventListener('touchstart', markUserActive);
      el.removeEventListener('pointerdown', markUserActive);
    };
  }, []);

  const scrollTicker = (direction: 'left' | 'right') => {
    const el = tickerRef.current;
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
    <section className="home-spotlight section" aria-labelledby="home-spotlight-heading">
      <div className="container">
        <div className="home-spotlight__intro">
          <span className="eyebrow">Spotlight</span>
          <h2 id="home-spotlight-heading" className="h-display home-spotlight__title">
            Shared <span className="home-spotlight__title-accent">Moments</span>
          </h2>
        </div>

        <div
          className="home-spotlight-ticker-carousel"
          role="region"
          aria-label="Spotlight photo gallery"
        >
          <button
            type="button"
            className="home-spotlight-ticker-carousel__nav"
            aria-label="Scroll spotlight left"
            onClick={() => scrollTicker('left')}
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <div ref={tickerRef} className="home-spotlight-ticker" aria-label="Shared moments photos">
            <div className="home-spotlight-ticker__track">
              {SLIDE_LOOP.map((src, index) => {
                const compactSlide = src === s02 || src === s03 || src === s14;
                return (
                <div
                  className={`home-spotlight-ticker__slide${compactSlide ? ' home-spotlight-ticker__slide--compact' : ''}`}
                  key={`${String(src)}-${index}`}
                >
                  <div className="home-spotlight-ticker__card">
                    <img
                      src={src}
                      alt=""
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                </div>
              );
              })}
            </div>
          </div>
          <button
            type="button"
            className="home-spotlight-ticker-carousel__nav"
            aria-label="Scroll spotlight right"
            onClick={() => scrollTicker('right')}
          >
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
