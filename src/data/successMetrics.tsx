import type { ReactNode } from 'react';
import iconMetricOk from '../assets/icon-metric-ok.png';

export type SuccessMetricItem = {
  value: string;
  label: string;
  icon: ReactNode;
};

export const SUCCESS_METRICS: SuccessMetricItem[] = [
  {
    value: '8',
    label: 'Destination Countries',
    icon: (
      <img
        src="https://img.icons8.com/dusk/64/globe-earth.png"
        alt=""
        width={64}
        height={64}
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
  {
    value: '2000+',
    label: 'Students Advised',
    icon: (
      <img
        src="https://img.icons8.com/stickers/100/student-female.png"
        alt=""
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
  {
    value: '2000+',
    label: 'Visa Success',
    icon: (
      <img
        src={iconMetricOk}
        alt=""
        width={50}
        height={50}
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
        decoding="async"
      />
    ),
  },
];

/** Home stats keep partner institutions; success page shows visa success. */
export const HOME_METRIC_CARDS: SuccessMetricItem[] = [
  {
    value: '8',
    label: 'Destination Countries',
    icon: (
      <img
        src="https://img.icons8.com/dusk/64/globe-earth.png"
        alt=""
        width={64}
        height={64}
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
  {
    value: '2000+',
    label: 'Students Advised',
    icon: (
      <img
        src="https://img.icons8.com/stickers/100/student-female.png"
        alt=""
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
  {
    value: '15+',
    label: 'Partner Institutions',
    icon: (
      <img
        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-school-literature-flaticons-lineal-color-flat-icons.png"
        alt=""
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
  {
    value: '10+',
    label: 'Years of Experience',
    icon: (
      <img
        src="https://img.icons8.com/color/48/story-time.png"
        alt=""
        className="success-metric__glyph success-metric__glyph--img"
        aria-hidden
      />
    ),
  },
];
