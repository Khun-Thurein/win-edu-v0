import { motion } from 'framer-motion';
import './PageHeader.css';

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  compact?: boolean;
  dark?: boolean;
}

export default function PageHeader({ eyebrow, title, lede, compact = false, dark = false }: PageHeaderProps) {
  return (
    <header className={`ph ${compact ? 'ph--compact' : ''} ${dark ? 'ph--dark' : ''}`}>
      <div className="container ph__inner">
        <motion.span
          className="eyebrow ph__eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="h-display ph__title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            className="ph__lede"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </header>
  );
}
