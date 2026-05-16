import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './Accordion.module.css';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <div className={cn(styles.accordion, className)} role="list">
      {items.map(item => (
        <div key={item.id} className={styles.item} role="listitem">
          <button
            className={cn(styles.trigger, openId === item.id && styles.open)}
            onClick={() => toggle(item.id)}
            aria-expanded={openId === item.id}
            aria-controls={`accordion-content-${item.id}`}
            id={`accordion-trigger-${item.id}`}
          >
            <span className={styles.question}>{item.question}</span>
            <motion.span
              className={styles.icon}
              animate={{ rotate: openId === item.id ? 45 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
                className={styles.content}
              >
                <p className={styles.answer}>{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}