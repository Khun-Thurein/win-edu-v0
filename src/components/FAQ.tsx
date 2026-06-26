import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { pickByLanguage, useLanguage } from '../context/language';
import './FAQ.css';

export interface FAQItem {
  q: string;
  a: string;
  qMy?: string;
  aMy?: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`faq ${language === 'my' ? 'faq--my' : ''}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const question = pickByLanguage(language, item.q, item.qMy);
        const answer = pickByLanguage(language, item.a, item.aMy);
        return (
          <div className={`faq__row ${isOpen ? 'faq__row--open' : ''}`} key={i}>
            <button
              className={`faq__q ${language === 'my' ? 'faq__q--my' : ''}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{question}</span>
              <span className="faq__icon">
                <Plus size={20} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="faq__a-wrap"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`faq__a ${language === 'my' ? 'faq__a--my' : ''}`}>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
