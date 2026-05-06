interface LogoProps {
  size?: number;
  variant?: 'full' | 'mark';
  inverted?: boolean;
}

import logoMarkTop from '../assets/win-logo-mark-top.png';

export default function Logo({ size = 44, variant = 'full', inverted = false }: LogoProps) {
  const mark = (
    <img
      src={logoMarkTop}
      alt="WIN logo mark"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        objectPosition: 'center',
        display: 'block',
        userSelect: 'none',
        borderRadius: 6,
        filter: inverted ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  );

  if (variant === 'mark') {
    return mark;
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {mark}
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: size,
          lineHeight: 1.05,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign: 'center',
          color: 'var(--cobalt-900)',
          filter: inverted ? 'brightness(0) invert(1)' : 'none',
        }}
      >
        <span style={{ fontSize: Math.max(10, Math.round(size * 0.22)), fontWeight: 600 }}>
          WIN International
        </span>
        <span style={{ fontSize: Math.max(8, Math.round(size * 0.15)), fontWeight: 500, opacity: 0.9 }}>
          Education Service
        </span>
      </span>
    </span>
  );
}
