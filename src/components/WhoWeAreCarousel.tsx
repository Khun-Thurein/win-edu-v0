import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './WhoWeAreCarousel.css';

/** Auto-advance interval (ms); keep between ~3–4s per design brief */
const AUTOPLAY_INTERVAL_MS = 3500;

export type WhoWeAreSlide = {
  src: string;
  alt: string;
  /** Short line shown under the image for the active slide. */
  caption: string;
};

type Props = {
  slides: readonly WhoWeAreSlide[];
  label?: string;
};

export default function WhoWeAreCarousel({ slides, label = 'Who we are photos' }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pauseHover, setPauseHover] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (!emblaApi || slides.length <= 1) return;

    const clearTimer = () => {
      if (autoplayTimerRef.current != null) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      autoplayTimerRef.current = window.setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_INTERVAL_MS);
    };

    const onVisibility = () => {
      if (document.hidden) clearTimer();
      else if (!pauseHover) startTimer();
    };

    if (!pauseHover && !document.hidden) startTimer();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearTimer();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [emblaApi, slides.length, pauseHover]);

  if (slides.length === 0) return null;

  const active = slides[selectedIndex];

  return (
    <div className="wwa-carousel">
      <div
        className="wwa-carousel__stage"
        onMouseEnter={() => setPauseHover(true)}
        onMouseLeave={() => setPauseHover(false)}
      >
        <div className="wwa-carousel__viewport" ref={emblaRef}>
          <div className="wwa-carousel__container">
            {slides.map((slide, i) => (
              <div className="wwa-carousel__slide" key={`${slide.src}-${i}`}>
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
          className="wwa-carousel__btn wwa-carousel__btn--prev"
          onClick={scrollPrev}
          aria-label="Previous photo"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="wwa-carousel__btn wwa-carousel__btn--next"
          onClick={scrollNext}
          aria-label="Next photo"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        <div className="wwa-carousel__dots" role="tablist" aria-label={label}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              className={`wwa-carousel__dot ${i === selectedIndex ? 'wwa-carousel__dot--active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Photo ${i + 1} of ${slides.length}`}
            />
          ))}
        </div>
      </div>

      <p className="wwa-carousel__caption" aria-live="polite">
        {active?.caption ?? ''}
      </p>
    </div>
  );
}
