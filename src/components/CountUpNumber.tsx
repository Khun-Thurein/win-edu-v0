import { useEffect, useMemo, useRef, useState } from 'react';

interface CountUpNumberProps {
  value: string;
  durationMs?: number;
}

export default function CountUpNumber({ value, durationMs = 1600 }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [animatedDisplay, setAnimatedDisplay] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const parsed = useMemo(() => {
    const match = value.trim().match(/^(\d+)(.*)$/);
    if (!match) return null;
    return {
      target: Number.parseInt(match[1], 10),
      suffix: match[2] ?? '',
    };
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasStarted(true);
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed, hasStarted]);

  useEffect(() => {
    if (!parsed || !hasStarted) return;

    const start = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(parsed.target * eased);
      setAnimatedDisplay(`${current}${parsed.suffix}`);

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [parsed, hasStarted, durationMs]);

  if (!parsed) {
    return <span ref={ref}>{value}</span>;
  }

  const display = hasStarted ? (animatedDisplay || `0${parsed.suffix}`) : value;

  return <span ref={ref}>{display}</span>;
}
