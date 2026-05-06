import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import './FieldNotesLoop.css';

/** Icons8 Facebook mark (24×24 source); scaled in CSS for the corner badge. */
const FIELD_LOOP_FB_BADGE_SRC =
  'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-online-social-media-facebook-website-homescreen-logo-button-logo-shadow-tal-revivo.png';

export interface FieldNoteSlide {
  src?: string;
  alt?: string;
  embedUrl?: string;
  embedTitle?: string;
  /** With `src` (no embed): opens the original post — use when embeds fail (e.g. without VPN). */
  linkUrl?: string;
  /** Use contain to avoid stretching logos/portraits. */
  imageFit?: 'cover' | 'contain';
  /** Facebook mark (image), bottom-right on the image (static `src` slides only). */
  showFacebookBadge?: boolean;
  caption: string;
  location: string;
}

function permalinkFromFacebookEmbed(embedUrl: string | undefined): string | undefined {
  if (!embedUrl) return undefined;
  try {
    const u = new URL(embedUrl);
    const href = u.searchParams.get('href');
    if (!href) return undefined;
    return decodeURIComponent(href);
  } catch {
    return undefined;
  }
}

function FieldLoopFacebookBadge() {
  return (
    <span className="field-loop__fb-badge" aria-hidden="true">
      <img
        src={FIELD_LOOP_FB_BADGE_SRC}
        alt=""
        className="field-loop__fb-badge__img"
        width={24}
        height={24}
        decoding="async"
      />
    </span>
  );
}

interface FieldNotesLoopProps {
  slides: readonly FieldNoteSlide[];
}

function readX(track: HTMLElement): number {
  const v = gsap.getProperty(track, 'x');
  return typeof v === 'number' ? v : parseFloat(String(v)) || 0;
}

export default function FieldNotesLoop({ slides }: FieldNotesLoopProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const xRef = useRef(0);
  const metricsRef = useRef({ firstSetWidth: 0, step: 0 });
  const animatingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const [erroredSlides, setErroredSlides] = useState<Record<number, boolean>>({});

  const duplicatedSlides = useMemo(() => [...slides, ...slides], [slides]);

  const remeasure = () => {
    const track = trackRef.current;
    if (!track || slides.length === 0) return;

    const items = track.querySelectorAll<HTMLElement>('[data-loop-item="true"]');
    if (items.length < slides.length * 2) return;

    const first = items[0];
    const firstOfSecondSet = items[slides.length];
    const firstSetWidth = firstOfSecondSet.offsetLeft - first.offsetLeft;
    const step =
      slides.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : firstSetWidth;

    if (firstSetWidth <= 0 || step <= 0) return;

    metricsRef.current = { firstSetWidth, step };

    let x = readX(track);
    while (x <= -firstSetWidth - 0.5) x += firstSetWidth;
    while (x > 0.5) x -= firstSetWidth;
    gsap.set(track, { x });
    xRef.current = x;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(() => {
      remeasure();
    });
    ro.observe(track);

    const id = window.requestAnimationFrame(() => {
      remeasure();
    });

    return () => {
      ro.disconnect();
      window.cancelAnimationFrame(id);
      gsap.killTweensOf(track);
    };
  }, [slides]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartXRef.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startX = touchStartXRef.current;
      const endX = event.changedTouches[0]?.clientX ?? null;
      touchStartXRef.current = null;
      if (startX == null || endX == null) return;

      const deltaX = endX - startX;
      const threshold = 40;
      if (Math.abs(deltaX) < threshold) return;

      if (deltaX < 0) moveByOne(1);
      if (deltaX > 0) moveByOne(-1);
    };

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchend', handleTouchEnd);
    };
  }, [slides.length]);

  const moveByOne = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track || slides.length === 0 || animatingRef.current) return;

    const { firstSetWidth, step } = metricsRef.current;
    if (firstSetWidth <= 0 || step <= 0) {
      remeasure();
      return;
    }

    let from = xRef.current;

    // Previous from the start of the first set: jump to equivalent position in the duplicate strip (no visible change), then slide forward one step.
    if (direction === -1 && from > -step * 0.5) {
      from -= firstSetWidth;
      gsap.set(track, { x: from });
      xRef.current = from;
    }

    const to = from - direction * step;

    animatingRef.current = true;
    gsap.to(track, {
      x: to,
      duration: 0.48,
      ease: 'power2.out',
      onComplete: () => {
        let x = to;
        while (x <= -firstSetWidth - 0.5) x += firstSetWidth;
        while (x > 0.5) x -= firstSetWidth;
        gsap.set(track, { x });
        xRef.current = x;
        animatingRef.current = false;
      },
    });
  };

  return (
    <section className="field-loop" aria-label="Carousel">
      <div className="field-loop__viewport" ref={viewportRef}>
        <div className="field-loop__track" ref={trackRef}>
          {duplicatedSlides.map((slide, index) => {
            const originalIndex = index % slides.length;
            const isErrored = !!erroredSlides[originalIndex];
            const postUrl = slide.linkUrl ?? permalinkFromFacebookEmbed(slide.embedUrl);
            const shouldShowFacebookBadge = slide.showFacebookBadge !== false;

            const meta = (
              <div className="field-loop__meta">
                <span>{slide.location}</span>
                <strong>{slide.caption}</strong>
              </div>
            );

            const ariaPost = `${slide.caption} — open Facebook post in new tab`;

            return (
              <article className="field-loop__card" data-loop-item="true" key={`${slide.caption}-${index}`}>
                {slide.embedUrl ? (
                  <>
                    <div className="field-loop__media">
                      <iframe
                        src={slide.embedUrl}
                        title={slide.embedTitle ?? `Embedded slide ${index + 1}`}
                        loading={index < slides.length ? 'eager' : 'lazy'}
                        className="field-loop__embed"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    {postUrl ? (
                      <a
                        className="field-loop__meta-link"
                        href={postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ariaPost}
                      >
                        {meta}
                      </a>
                    ) : (
                      meta
                    )}
                  </>
                ) : postUrl ? (
                  <a
                    className="field-loop__card-link"
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaPost}
                  >
                    <div className="field-loop__media">
                      {isErrored ? (
                        <div className="field-loop__fallback" role="img" aria-label={slide.alt ?? `Slide ${index + 1}`}>
                          Image unavailable
                        </div>
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt ?? slide.caption}
                          className={slide.imageFit === 'contain' ? 'field-loop__img--contain' : undefined}
                          loading={index < slides.length ? 'eager' : 'lazy'}
                          onError={() =>
                            setErroredSlides((prev) => ({
                              ...prev,
                              [originalIndex]: true,
                            }))
                          }
                        />
                      )}
                      {shouldShowFacebookBadge ? <FieldLoopFacebookBadge /> : null}
                    </div>
                    {meta}
                  </a>
                ) : (
                  <>
                    <div className="field-loop__media">
                      {isErrored ? (
                        <div className="field-loop__fallback" role="img" aria-label={slide.alt ?? `Slide ${index + 1}`}>
                          Image unavailable
                        </div>
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt ?? `Slide ${index + 1}`}
                          className={slide.imageFit === 'contain' ? 'field-loop__img--contain' : undefined}
                          loading={index < slides.length ? 'eager' : 'lazy'}
                          onError={() =>
                            setErroredSlides((prev) => ({
                              ...prev,
                              [originalIndex]: true,
                            }))
                          }
                        />
                      )}
                      {shouldShowFacebookBadge ? <FieldLoopFacebookBadge /> : null}
                    </div>
                    {meta}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="field-loop__controls">
        <button type="button" className="field-loop__btn field-loop__btn--prev" onClick={() => moveByOne(-1)} aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
        <button type="button" className="field-loop__btn field-loop__btn--next" onClick={() => moveByOne(1)} aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
