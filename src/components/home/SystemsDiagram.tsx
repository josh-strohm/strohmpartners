import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/cn';
import styles from './SystemsDiagram.module.css';

const pillars = [
  {
    id: 'websites' as const,
    label: 'Websites',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description: 'Leads arrive, get qualified, and route automatically.',
    flow: 'A visitor submits a form. The system instantly qualifies the lead, adds them to your CRM, triggers a welcome sequence, and notifies the right person, completing the loop before you even see the notification.',
  },
  {
    id: 'content' as const,
    label: 'Content',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    ),
    description: 'Content drafts, schedules, and publishes on its own.',
    flow: 'Your content system drafts a post based on your guidelines, formats it for each platform, schedules it at optimal times, and publishes, which maintains your brand voice across every channel without manual effort.',
  },
  {
    id: 'process' as const,
    label: 'Processes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description: 'Workflows trigger, tasks complete, teams stay in sync.',
    flow: 'A new client signs. The system sends the contract, creates their folder, sets up their profile in your tools, and alerts your team, starting the engagement before anyone on your side has touched a single task.',
  },
];

type PillarId = 'websites' | 'content' | 'process';

const connections: Record<PillarId, PillarId[]> = {
  websites: ['content', 'process'],
  content: ['websites', 'process'],
  process: ['websites', 'content'],
};

export function SystemsDiagram() {
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const activeConnections = activePillar ? connections[activePillar] : [];

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.diagramWrapper}>
        {/* Pillar Cards */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => {
            const isActive = activePillar === pillar.id;
            const isConnected = activePillar !== null && activeConnections.includes(pillar.id);

            return (
              <motion.button
                key={pillar.id}
                className={cn(
                  styles.pillarCard,
                  isActive && styles.active,
                  isConnected && styles.connected
                )}
                onClick={() => setActivePillar(prev => prev === pillar.id ? null : pillar.id as PillarId)}
                initial={inView ? { opacity: 0, y: 30 } : false}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: reducedMotion ? 0 : index * 0.12, duration: 0.5 }}
                aria-pressed={isActive}
              >
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h4 className={styles.pillarLabel}>{pillar.label}</h4>
                <p className={styles.pillarDescription}>{pillar.description}</p>
                {isActive && !reducedMotion && (
                  <motion.div
                    className={styles.activeRing}
                    layoutId="activeRing"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

              </div>

      {/* Flow Description */}
      <AnimatePresence mode="wait">
        {activePillar && (
          <motion.div
            key={activePillar}
            className={styles.flowPanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <div className={styles.flowIcon}>
              {pillars.find(p => p.id === activePillar)?.icon}
            </div>
            <div className={styles.flowContent}>
              <h4 className={styles.flowTitle}>
                {pillars.find(p => p.id === activePillar)?.label} in action
              </h4>
              <p className={styles.flowText}>
                {pillars.find(p => p.id === activePillar)?.flow}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction hint */}
      {!activePillar && (
        <motion.p
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click any area to learn more about how it works
        </motion.p>
      )}
    </div>
  );
}

