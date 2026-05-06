import { useEffect, useRef } from 'react';
import { loadTikTokEmbedScript, renderTikTokEmbed } from '../lib/tiktokEmbedScript';

type Props = {
  videoId: string;
  /** Full video URL, e.g. https://www.tiktok.com/@handle/video/123 */
  citeUrl: string;
  title: string;
};

/**
 * Official TikTok oEmbed: blockquote + embed.js (replaces raw iframe for a cleaner player chrome).
 */
export default function TikTokOfficialEmbed({ videoId, citeUrl, title }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    (async () => {
      try {
        await loadTikTokEmbedScript();
      } catch {
        return;
      }
      if (cancelled) return;
      const blockquote = root.querySelector('blockquote.tiktok-embed');
      if (blockquote) {
        renderTikTokEmbed(blockquote);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [videoId, citeUrl]);

  return (
    <div ref={rootRef} className="tiktok-official-embed">
      <blockquote
        className="tiktok-embed"
        cite={citeUrl}
        data-video-id={videoId}
      >
        <section>
          <a href={citeUrl} target="_blank" rel="noopener noreferrer" title={title}>
            {title}
          </a>
        </section>
      </blockquote>
    </div>
  );
}
