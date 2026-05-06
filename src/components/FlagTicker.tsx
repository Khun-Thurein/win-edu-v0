import { motion, useReducedMotion } from 'framer-motion';
import caFlag from 'flag-icons/flags/1x1/ca.svg?url';
import deFlag from 'flag-icons/flags/1x1/de.svg?url';
import sgFlag from 'flag-icons/flags/1x1/sg.svg?url';
import myFlag from 'flag-icons/flags/1x1/my.svg?url';
import cnFlag from 'flag-icons/flags/1x1/cn.svg?url';
import nzFlag from 'flag-icons/flags/1x1/nz.svg?url';
import gbFlag from 'flag-icons/flags/1x1/gb.svg?url';
import usFlag from 'flag-icons/flags/1x1/us.svg?url';
import './FlagTicker.css';

const COUNTRY_FLAG_SRC: Record<string, string> = {
  CA: caFlag,
  DE: deFlag,
  SG: sgFlag,
  MY: myFlag,
  CN: cnFlag,
  NZ: nzFlag,
  GB: gbFlag,
  US: usFlag,
};

const COUNTRIES = [
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'CN', name: 'China' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];

type SchoolTickerItem = {
  code: string;
  name: string;
  logo: string;
  logoOnly: boolean;
  logoAlt?: string;
};

const SCHOOLS: SchoolTickerItem[] = [
  { code: 'AA', name: 'Alexander Academy', logo: '/partners/ticker-big/alexander-academy.png', logoOnly: true },
  { code: 'AC', name: 'Alexander College', logo: '/partners/ticker-big/alexander-college.png', logoOnly: true },
  { code: 'BDW', name: 'Bodwell High School', logo: '/partners/ticker-big/bodwell.png', logoOnly: true },
  { code: 'DC', name: 'Douglas College', logo: '/partners/ticker-big/douglas.png', logoOnly: true },
  { code: 'FIC', name: 'Fraser International College', logo: '/partners/ticker-big/fic.png', logoOnly: true },
  { code: 'ICM', name: 'International College of Manitoba', logo: '/partners/ticker-big/manitoba.png', logoOnly: true },
  { code: 'KWA', name: 'Kingsway Academy', logo: '/partners/ticker-big/kingsway.png', logoOnly: true },
  { code: 'LC', name: 'Langara College', logo: '/partners/ticker-big/langara.png', logoOnly: true },
  { code: 'SGA', name: 'Siam Global Academy (Thai)', logo: '/partners/ticker-big/siam-global.png', logoOnly: true },
  { code: 'SU', name: 'Sunway University (Malaysia)', logo: '/partners/ticker-big/sunway.png', logoOnly: true },
  { code: 'UIC', name: 'ULethbridge International College Calgary', logo: '/partners/ticker-big/ulethbridge.png', logoOnly: true },
  { code: 'WIC', name: 'Western International College', logo: '/partners/ticker-big/western.png', logoOnly: true },
  { code: 'WLIC', name: 'Wilfrid Laurier International College', logo: '/partners/ticker-big/wilfrid-laurier.png', logoOnly: true },
];

interface FlagTickerProps {
  speed?: number;
  direction?: 'left' | 'right';
  variant?: 'countries' | 'schools';
  lines?: 1 | 2;
  forceAnimation?: boolean;
}

export default function FlagTicker({
  speed = 80,
  direction = 'left',
  variant = 'countries',
  lines = 1,
  forceAnimation = false,
}: FlagTickerProps) {
  const reduceMotion = useReducedMotion();
  const disableAnimation = reduceMotion && !forceAnimation;

  if (variant === 'countries') {
    const items = [...COUNTRIES, ...COUNTRIES];
    const primaryStart = direction === 'left' ? '0%' : '-50%';
    const primaryEnd = direction === 'left' ? '-50%' : '0%';
    const secondaryStart = direction === 'left' ? '-50%' : '0%';
    const secondaryEnd = direction === 'left' ? '0%' : '-50%';

    return (
      <div className={`ticker ticker--countries ${lines === 2 ? 'ticker--countries-double' : ''}`}>
        <div className="ticker__marquee">
          <motion.div
            className="ticker__track"
            animate={disableAnimation ? {} : { x: [primaryStart, primaryEnd] }}
            transition={{ duration: speed, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: 0 }}
          >
            {items.map((c, i) => (
              <div className="ticker__item" key={`${c.code}-${i}`}>
                <img
                  className="ticker__flag ticker__flag--svg"
                  src={COUNTRY_FLAG_SRC[c.code]}
                  alt=""
                  aria-hidden
                  draggable={false}
                />
                <span className="ticker__name">{c.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {lines === 2 && (
          <div className="ticker__marquee ticker__marquee--secondary">
            <motion.div
              className="ticker__track"
              animate={disableAnimation ? {} : { x: [secondaryStart, secondaryEnd] }}
              transition={{ duration: speed + 10, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: 0 }}
            >
              {items.map((c, i) => (
                <div className="ticker__item" key={`${c.code}-secondary-${i}`}>
                  <img
                    className="ticker__flag ticker__flag--svg"
                    src={COUNTRY_FLAG_SRC[c.code]}
                    alt=""
                    aria-hidden
                    draggable={false}
                  />
                  <span className="ticker__name">{c.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  // Schools variant — slow marquee, respects reduced-motion
  const items = [...SCHOOLS, ...SCHOOLS];
  const primaryStart = direction === 'left' ? '0%' : '-50%';
  const primaryEnd = direction === 'left' ? '-50%' : '0%';
  const secondaryStart = direction === 'left' ? '-50%' : '0%';
  const secondaryEnd = direction === 'left' ? '0%' : '-50%';

  return (
    <div className={`ticker ticker--schools ${lines === 2 ? 'ticker--schools-double' : ''}`}>
      <div className="ticker__marquee">
        <motion.div
          className="ticker__track"
          animate={disableAnimation ? {} : { x: [primaryStart, primaryEnd] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: 0 }}
        >
          {items.map((item, i) => (
            <div className="ticker__item" key={`${item.code}-${i}`}>
              {item.logo ? (
                <img
                  className={`ticker__school-logo ticker__school-logo--image ${item.logoOnly ? 'ticker__school-logo--large' : ''}`}
                  src={item.logo}
                  alt={item.logoAlt ?? `${item.name} logo`}
                />
              ) : (
                <span className="ticker__school-logo" aria-hidden>{item.code}</span>
              )}
              {!item.logoOnly && <span className="ticker__name">{item.name}</span>}
            </div>
          ))}
        </motion.div>
      </div>

      {lines === 2 && (
        <div className="ticker__marquee ticker__marquee--secondary">
          <motion.div
            className="ticker__track"
            animate={disableAnimation ? {} : { x: [secondaryStart, secondaryEnd] }}
            transition={{ duration: speed + 10, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: 0 }}
          >
            {items.map((item, i) => (
              <div className="ticker__item" key={`${item.code}-secondary-${i}`}>
                {item.logo ? (
                  <img
                    className={`ticker__school-logo ticker__school-logo--image ${item.logoOnly ? 'ticker__school-logo--large' : ''}`}
                    src={item.logo}
                    alt={item.logoAlt ?? `${item.name} logo`}
                  />
                ) : (
                  <span className="ticker__school-logo" aria-hidden>{item.code}</span>
                )}
                {!item.logoOnly && <span className="ticker__name">{item.name}</span>}
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
