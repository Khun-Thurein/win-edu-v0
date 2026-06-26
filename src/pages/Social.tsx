import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import TikTokOfficialEmbed from '../components/TikTokOfficialEmbed';
import {
  AIRPORT_MOMENTS_SLIDES,
  type AirportMomentSlide,
  SOCIAL_FEED_POSTS,
  type SocialFeedPost,
} from '../data/socialFeed';
import { pickByLanguage, useLanguage } from '../context/language';
import './Social.css';

const SOCIAL_HEADER_TITLE_MY = 'WIN Education ရဲ့ Social Media မှ update များ';

const SOCIAL_HEADER_LEDE_EN =
  "We're on Facebook, TikTok, and YouTube — visa updates, student stories, and open-house dates from Yangon.";
const SOCIAL_HEADER_LEDE_MY =
  'Facebook, TikTok နဲ့ YouTube မှာ WIN ကို လိုက်ကြည့်လိုက်ပါ — ဗီဇာသတင်းအသစ်တွေ၊ ကျောင်းသားတွေရဲ့ အတွေ့အကြုံတွေနဲ့ ရန်ကုန်မှာ ကျင်းပမယ့် open-house အစီအစဉ်တွေကို မှန်မှန် တင်ပေးနေပါတယ်။';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100067407050438';
const TIKTOK_URL = 'https://www.tiktok.com/@winyangon3';
const YOUTUBE_URL = 'https://www.youtube.com/@wineducation5861';

const PLATFORMS = [
  {
    name: 'Facebook',
    handle: 'Win Education Myanmar · Yangon',
    url: FACEBOOK_URL,
    logoSrc: '/images/facebook-logo.svg',
    color: '#1877F2',
  },
  {
    name: 'TikTok',
    handle: '@winyangon3',
    url: TIKTOK_URL,
    logoSrc: '/images/tiktok-logo.svg',
    color: '#FE2C55',
  },
  {
    name: 'YouTube',
    handle: '@wineducation5861',
    url: YOUTUBE_URL,
    logoSrc: '/images/youtube-logo.svg',
    color: '#F61C0D',
  },
] as const;

const FB_PAGE_PLUGIN_MIN_W = 180;
const FB_PAGE_PLUGIN_MAX_W = 500;
const FB_PAGE_PLUGIN_H = 520;

/**
 * Facebook Page Plugin — timeline for the public page.
 * Width tracks the container so the embed shrinks when the window/column narrows.
 * Optional `VITE_FACEBOOK_APP_ID` if Meta requires it for your app setup.
 */
function SocialFacebookPageEmbed() {
  const pluginRef = useRef<HTMLDivElement>(null);
  const [pluginW, setPluginW] = useState(FB_PAGE_PLUGIN_MAX_W);

  const updatePluginWidth = useCallback(() => {
    const el = pluginRef.current;
    if (!el) return;
    const raw = el.clientWidth;
    const w = Math.max(FB_PAGE_PLUGIN_MIN_W, Math.min(FB_PAGE_PLUGIN_MAX_W, Math.floor(raw)));
    setPluginW((prev) => (prev === w ? prev : w));
  }, []);

  useLayoutEffect(() => {
    updatePluginWidth();
  }, [updatePluginWidth]);

  useEffect(() => {
    const el = pluginRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updatePluginWidth());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updatePluginWidth]);

  const pageHref = encodeURIComponent(FACEBOOK_URL);
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID as string | undefined;
  const appQuery = appId ? `&appId=${encodeURIComponent(appId)}` : '';
  const src = `https://www.facebook.com/plugins/page.php?href=${pageHref}&tabs=timeline&width=${pluginW}&height=${FB_PAGE_PLUGIN_H}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true${appQuery}`;

  return (
    <div className="social__embed-slot" role="region" aria-label="Facebook page timeline">
      <div ref={pluginRef} className="social__page-plugin">
        <iframe
          title="Win Education Myanmar on Facebook"
          src={src}
          width={pluginW}
          height={FB_PAGE_PLUGIN_H}
          style={{ border: 'none', overflow: 'hidden', maxWidth: '100%', display: 'block' }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
}

function SocialCarousel({
  slides,
  badge,
  badgeModifier,
  titleLine,
  ariaLabelPrefix,
  children,
}: {
  slides: AirportMomentSlide[];
  badge: string;
  badgeModifier: 'airport' | 'gathering' | 'proud';
  titleLine: string;
  ariaLabelPrefix: string;
  children?: ReactNode;
}) {
  const n = slides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + n) % n);
    },
    [n],
  );

  if (n === 0) return null;

  const active = slides[index];
  const badgeClass =
    badgeModifier === 'airport'
      ? 'feed__badge--airport'
      : badgeModifier === 'proud'
        ? 'feed__badge--proud'
        : 'feed__badge--gathering';

  return (
    <>
      <div
        className="feed__media feed__media--carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${ariaLabelPrefix} — photo ${index + 1} of ${n}`}
      >
        <div
          className="feed__carousel-viewport"
          style={{ ['--carousel-n' as string]: String(n) }}
        >
          <div
            className="feed__carousel-track"
            style={{
              width: `${n * 100}%`,
              transform: `translateX(-${(index / n) * 100}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div key={`${slide.img}-${i}`} className="feed__carousel-slide" aria-hidden={i !== index}>
                <img
                  src={slide.img}
                  alt={slide.alt ?? ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <span className={`feed__badge ${badgeClass}`}>{badge}</span>
          <div className="feed__carousel-controls">
            <button
              type="button"
              className="feed__carousel-btn"
              onClick={() => go(-1)}
              aria-label={`${ariaLabelPrefix} — previous photo`}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              className="feed__carousel-btn"
              onClick={() => go(1)}
              aria-label={`${ariaLabelPrefix} — next photo`}
            >
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <div className="feed__body">
        <p className="feed__caption">{titleLine}</p>
        <p className="feed__carousel-sub" aria-live="polite">
          {active.caption ?? '\u00a0'}
        </p>
        {children}
      </div>
    </>
  );
}

function AirportMomentsCarousel({ slides }: { slides: AirportMomentSlide[] }) {
  return (
    <SocialCarousel
      slides={slides}
      badge="Airports"
      badgeModifier="airport"
      titleLine="Moments from Airports"
      ariaLabelPrefix="Moments from Airports"
    />
  );
}

function FeedPostCard({
  post,
  index,
  className = '',
  transitionDelay = 0,
}: {
  post: SocialFeedPost;
  index: number;
  className?: string;
  transitionDelay?: number;
}) {
  const isTikTok = Boolean(post.tiktokVideoId);
  const hasCarousel = Boolean(post.carouselSlides?.length);
  const carouselTheme = post.carouselTheme ?? 'gathering';
  const viewLabel = isTikTok ? 'View on TikTok' : 'View on Facebook';
  const mediaLabel = isTikTok
    ? `TikTok video: ${post.caption}`
    : `Open Facebook post: ${post.caption}`;

  const carouselModifierClass =
    carouselTheme === 'proud' ? 'feed__post--proud-carousel' : 'feed__post--gathering-carousel';

  const articleClass = ['feed__post', className, hasCarousel ? carouselModifierClass : '']
    .filter(Boolean)
    .join(' ');

  if (hasCarousel && post.carouselSlides) {
    const badgeModifier = carouselTheme === 'proud' ? 'proud' : 'gathering';
    const badge = carouselTheme === 'proud' ? 'Proud' : 'Gathering';
    const ariaLabelPrefix = carouselTheme === 'proud' ? 'Proud moments' : 'Making memories';

    return (
      <motion.article
        className={articleClass}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01 }}
        transition={{ duration: 0.6, delay: transitionDelay }}
      >
        <SocialCarousel
          slides={post.carouselSlides}
          badge={badge}
          badgeModifier={badgeModifier}
          titleLine={post.caption}
          ariaLabelPrefix={ariaLabelPrefix}
        />
      </motion.article>
    );
  }

  return (
    <motion.article
      className={articleClass}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.6, delay: transitionDelay }}
    >
      {isTikTok && post.tiktokVideoId ? (
        <div
          className="feed__media feed__media--tiktok"
          role="region"
          aria-label={mediaLabel}
        >
          <TikTokOfficialEmbed
            key={post.tiktokVideoId}
            videoId={post.tiktokVideoId}
            citeUrl={post.postUrl}
            title={post.alt ?? post.caption}
          />
          <span className="feed__platform">TikTok</span>
        </div>
      ) : (
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="feed__media feed__media--photo"
          aria-label={mediaLabel}
        >
          <img
            src={post.img}
            alt={post.alt ?? post.caption}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="feed__platform">Facebook</span>
        </a>
      )}
      <div className="feed__body">
        <p className="feed__caption">{post.caption}</p>
        <div className="feed__meta feed__meta--actions">
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="feed__post-link"
          >
            {viewLabel}
            <ExternalLink size={13} aria-hidden />
          </a>
          {post.dateLabel ? <span className="feed__date">{post.dateLabel}</span> : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Social() {
  const { language } = useLanguage();
  const tiktokPost = SOCIAL_FEED_POSTS.find((p) => p.tiktokVideoId);
  const quadFacebook = SOCIAL_FEED_POSTS.filter((p) => !p.tiktokVideoId);

  return (
    <main className={`page-enter social-page ${language === 'my' ? 'social-page--my' : ''}`}>
      <PageHeader
        eyebrow="Social"
        title={
          language === 'my' ? (
            SOCIAL_HEADER_TITLE_MY
          ) : (
            <>
              Follow the <em>journeys</em>
              <br />
              in real time.
            </>
          )
        }
        lede={pickByLanguage(language, SOCIAL_HEADER_LEDE_EN, SOCIAL_HEADER_LEDE_MY)}
        compact
      />

      {/* Facebook link + Page Plugin */}
      <section className="section social__top-section">
        <div className="container">
          <div className="social__top">
            <div className="social__top-link">
              <div className="social__platforms social__platforms--row">
                {PLATFORMS.map((p, i) => (
                  <motion.a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform"
                    aria-label={`Open Win Education Myanmar on ${p.name} in a new tab`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <span
                      className={
                        p.name === 'YouTube'
                          ? 'platform__icon platform__icon--youtube'
                          : 'platform__icon'
                      }
                      style={{ color: p.color }}
                    >
                      <img
                        src={p.logoSrc}
                        alt=""
                        className="platform__brand-img"
                        draggable={false}
                        aria-hidden
                      />
                    </span>
                    <div className="platform__info">
                      <span className="platform__name">{p.name}</span>
                      <span className="platform__handle">{p.handle}</span>
                    </div>
                    <span className="platform__hint">Visit page</span>
                    <ExternalLink size={16} className="platform__ext" />
                  </motion.a>
                ))}
              </div>
            </div>
            <SocialFacebookPageEmbed />
          </div>
        </div>
      </section>

      {/* Feed grid — airport carousel (no FB) + photo cards linking to Facebook */}
      <section className="section">
        <div className="container">
          <div className="social__feed-head">
            <span className="eyebrow">Feed</span>
            <h2 className="h-display section__title social__feed-title">
              Moments
            </h2>
          </div>
          <div className="feed feed--tiktok-beside-quad">
            {tiktokPost ? (
              <div className="feed__tiktok-column">
                <FeedPostCard
                  post={tiktokPost}
                  index={0}
                  className="feed__post--tiktok-slot"
                  transitionDelay={0}
                />
              </div>
            ) : null}
            <div className="feed__quad">
              <motion.article
                className="feed__post feed__post--quad feed__post--airport"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.6, delay: 0.06 }}
              >
                <AirportMomentsCarousel slides={AIRPORT_MOMENTS_SLIDES} />
              </motion.article>
              {quadFacebook.map((p, i) => (
                <FeedPostCard
                  key={p.postUrl}
                  post={p}
                  index={i + 1}
                  className="feed__post--quad"
                  transitionDelay={0.1 + i * 0.06}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container social__cta">
          <h3 className="h-display">We share every update on <em>social media.</em></h3>
          
        </div>
      </section>
    </main>
  );
}
