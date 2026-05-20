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
    title: 'Web & AI Acquisition Funnels',
    tagline: 'Advising on and engineering smart lead pipelines.',
    description: 'We audit your customer acquisition journey to find where AI integration drives real conversion. We design intelligent scoring mechanisms, qualification funnels, and data synchronization schemas, then build the custom site architectures to operate them.',
    symptoms: [
      'You are unsure where AI actually fits in your sales and lead generation pipeline',
      'High-quality prospects get lost because response times are slow or require manual checks',
      'Your sales team spends valuable hours manually sorting and entering leads into CRM systems',
      'Your web infrastructure fails to pass clean, enriched data directly to your sales tools',
    ],
    deliverables: [
      'Comprehensive customer touchpoint and acquisition funnel audit',
      'Custom lead capture architectures with automated qualification algorithms',
      'Seamless API integrations to sync customer insights directly to your CRM',
      'High-performance, accessible, and search-optimized web architectures',
    ],
    idealClient: 'You want to transform your static website into an intelligent, self-qualifying pipeline that aligns marketing with sales and maximizes client acquisition ROI.',
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
    title: 'Content Voice & Scaling Systems',
    tagline: 'Preserving authentic voice while maximizing output.',
    description: 'We design custom voice models and distribution architectures. We analyze your brand identity to isolate where AI can accelerate your research, drafting, and cross-channel formatting while ensuring your experts remain firmly in the editorial driver\'s seat.',
    symptoms: [
      'Your creative staff spends more time formatting and copy-pasting than ideating and editing',
      'You want to leverage generative AI but fear losing your premium brand standards or voice',
      'Multi-channel consistency is impossible because posting relies on ad-hoc, manual routines',
      'Your content marketing efforts feel siloed and lack a defined, data-backed operational system',
    ],
    deliverables: [
      'Custom brand voice training frameworks and prompt engineering systems',
      'Multi-platform editorial pipelines with human-in-the-loop review layers',
      'Centralized asset systems designed to output unified multi-format content',
      'Content distribution architectures connecting key tools and publishing channels',
    ],
    idealClient: 'You want to scale a premium, high-trust media footprint across multiple platforms without overworking your key subject matter experts.',
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
    title: 'AI Operational Audits & Integrations',
    tagline: 'Identifying and eliminating operational friction points.',
    description: 'Our flagship strategic service. We perform a complete diagnostic audit of your team\'s daily operations to locate hidden cost centers. We map precisely where intelligent document processing, AI-driven routing, and API integrations can solve manual friction permanently.',
    symptoms: [
      'Your staff spends hours moving, sorting, and verifying data across isolated business systems',
      'Client onboarding or project execution stalls due to manual administrative checklists',
      'Human error or missing steps occur because critical tasks rely on memory instead of code',
      'You lack structured visibility into which operational workflows are your biggest cost bottlenecks',
    ],
    deliverables: [
      'Deep operational workflow audit and visual system bottleneck blueprint',
      'Intelligent document processing and automated extraction pipelines for unstructured data',
      'Secure, custom API architectures connecting your core back-office applications',
      'Custom executive dashboards to track integration performance and active ROI math',
    ],
    idealClient: 'You want to scale your firm\'s operational capacity and increase profit margins without adding linear overhead or sacrificing work quality.',
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
            <h1 className={styles.title}>Services &amp; AI Consulting.</h1>
            <p className={styles.subtitle}>
              Helping you map where AI actually fits and building the custom integrations to make it work.
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
                  Run the math on manual processes, then let's identify where custom AI integration will drive the highest operational return.
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
            <h2 className={styles.ctaTitle}>Want to identify where AI fits in your business?</h2>
            <p className={styles.ctaText}>
              We recommend starting with an operational audit of your highest-friction bottleneck. From there, we map out a comprehensive, custom systems integration roadmap.
            </p>
            <Button magnetic as="a" href="/contact">
              Book an Operational Audit
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default WhatWeBuild;