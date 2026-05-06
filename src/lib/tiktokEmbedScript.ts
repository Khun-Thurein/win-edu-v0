/**
 * Load TikTok’s official embed.js once; resolves when `window.tiktokEmbed.lib` is ready (or timeout).
 */
let loadPromise: Promise<void> | null = null;

type TikTokWindow = Window & {
  tiktokEmbed?: { lib?: { render: (node: Element | Element[]) => void } };
};

export function loadTikTokEmbedScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const w = window as TikTokWindow;
  if (w.tiktokEmbed?.lib) return Promise.resolve();

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.tiktok.com/embed.js"]',
    );
    if (existing) {
      waitForTiktokLib().then(resolve).catch(() => resolve());
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    s.onload = () => waitForTiktokLib().then(resolve).catch(() => resolve());
    s.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load TikTok embed.js'));
    };
    document.body.appendChild(s);
  });

  return loadPromise;
}

function waitForTiktokLib(): Promise<void> {
  return new Promise((resolve) => {
    const w = window as TikTokWindow;
    if (w.tiktokEmbed?.lib) {
      resolve();
      return;
    }
    let ticks = 0;
    const id = window.setInterval(() => {
      ticks += 1;
      if (w.tiktokEmbed?.lib || ticks > 200) {
        window.clearInterval(id);
        resolve();
      }
    }, 40);
  });
}

export function renderTikTokEmbed(node: Element | null): void {
  if (!node) return;
  const w = window as TikTokWindow;
  try {
    w.tiktokEmbed?.lib?.render(node);
  } catch {
    /* TikTok API varies by embed.js version */
  }
}
