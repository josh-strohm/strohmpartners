import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { LeadCaptureDemo } from '@/components/whatwebuild/LeadCaptureDemo';
import { ContentPipeline } from '@/components/whatwebuild/ContentPipeline';
import { FlowchartDemo } from '@/components/whatwebuild/FlowchartDemo';
import { CostCalculator } from '@/components/whatwebuild/CostCalculator';
import styles from './WhatWeBuild.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const pillars = [
  {
    id: 'websites',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Websites & Web Automation',
    tagline: 'Custom-designed, built for conversion.',
    description: 'We build sites that do more than look good. Every site we build is designed around a clear purpose: capturing leads, qualifying them automatically, and routing them to the right place. No more lost leads, no more manual follow-up.',
    symptoms: [
      'Leads come in but nothing happens until you personally follow up',
      'Your website doesn\'t integrate with your CRM or email system',
      'You\'re manually copying leads from web forms into spreadsheets',
      'Your site loads slowly and you\'re not sure why',
    ],
    deliverables: [
      'Custom-designed site built to your brand and goals',
      'Lead capture forms with automatic qualification routing',
      'CRM and email integrations that work automatically',
      'Performance optimization for speed and SEO',
    ],
    idealClient: 'You want a website that works as hard as you do — capturing and qualifying leads around the clock, without adding to your workload.',
    demo: <LeadCaptureDemo />,
  },
  {
    id: 'content',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    ),
    title: 'Content & Social Automation',
    tagline: 'On-brand content, consistently published.',
    description: 'Content systems that plan, draft, format, schedule, and publish — automatically. Your brand voice stays consistent even when the team is small. You own the system, not just the output.',
    symptoms: [
      'You know you should be publishing more but can\'t keep up',
      'Social media is "someone\'s job" but they\'re always behind',
      'Content feels inconsistent or off-brand',
      'You\'re spending hours creating content that doesn\'t move the needle',
    ],
    deliverables: [
      'Content planning and drafting workflow',
      'Multi-channel publishing automation',
      'Brand voice guidelines built into the system',
      'Analytics tracking what content actually performs',
    ],
    idealClient: 'You want consistent, quality content across channels without hiring a full marketing team or spending every evening writing posts.',
    demo: <ContentPipeline />,
  },
  {
    id: 'process',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Business Process Automation',
    tagline: 'Workflows that run themselves.',
    description: 'We connect CRMs, inboxes, spreadsheets, and back-office tools into one coherent system. Manual handoffs become automatic. Your business runs itself — quietly, reliably.',
    symptoms: [
      'You\'re manually moving data between tools that should talk to each other',
      '"New client" means a dozen manual tasks before anything actually happens',
      'Your team spends hours on work that should take minutes',
      'You\'re not sure where things slip through the cracks',
    ],
    deliverables: [
      'Workflow mapping and design',
      'System integrations that connect your tools',
      'Automated task triggers and notifications',
      'Clear visibility into what\'s happening and where',
    ],
    idealClient: 'You want your business to run on systems, not memory — with clear workflows that start themselves and reporting that tells you what\'s working.',
    demo: <FlowchartDemo />,
  },
];

export function WhatWeBuild() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            custom={0}
            className={styles.headerContent}
          >
            <h1 className={styles.title}>What we build.</h1>
            <p className={styles.subtitle}>
              Three connected capabilities. One system that works together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, index) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className={styles.pillarSection}
        >
          <div className="container">
            <div className={styles.pillarGrid}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUpVariants}
                custom={0}
                className={styles.pillarContent}
              >
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                <p className={styles.pillarTagline}>{pillar.tagline}</p>
                <p className={styles.pillarDescription}>{pillar.description}</p>

                <div className={styles.pillarDetails}>
                  <div className={styles.pillarDetailBlock}>
                    <h4 className={styles.pillarDetailTitle}>Before we\'re hired, you might be experiencing:</h4>
                    <ul className={styles.pillarList}>
                      {pillar.symptoms.map((s, i) => (
                        <li key={i} className={styles.pillarListItem}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.pillarDetailBlock}>
                    <h4 className={styles.pillarDetailTitle}>What we deliver:</h4>
                    <ul className={styles.pillarList}>
                      {pillar.deliverables.map((d, i) => (
                        <li key={i} className={styles.pillarListItem}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.pillarIdeal}>
                  <span className={styles.pillarIdealLabel}>Ideal fit:</span>
                  <p className={styles.pillarIdealText}>{pillar.idealClient}</p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUpVariants}
                custom={1}
                className={styles.pillarDemo}
              >
                {pillar.demo}
              </motion.div>
            </div>

            {index === 1 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUpVariants}
                custom={0}
                className={styles.calculatorWrapper}
              >
                <h3 className={styles.calculatorTitle}>What is this actually costing you?</h3>
                <p className={styles.calculatorText}>
                  Run the math on manual work — then decide if automation makes sense for your situation.
                </p>
                <CostCalculator />
              </motion.div>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.ctaContent}
          >
            <h2 className={styles.ctaTitle}>Want to see how these connect for your business?</h2>
            <p className={styles.ctaText}>
              Most businesses benefit from starting with whichever pain point is most acute. We can map out the full system from there.
            </p>
            <Button magnetic as="a" href="/contact">
              Start a conversation
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default WhatWeBuild;