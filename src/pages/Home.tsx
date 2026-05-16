import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SystemsDiagram } from '@/components/home/SystemsDiagram';
import styles from './Home.module.css';

const processSteps = [
  {
    number: '01',
    title: 'Understand the system',
    description: 'We start by mapping how work actually flows through your business — where things get stuck, where time disappears, and where opportunities slip through.',
  },
  {
    number: '02',
    title: 'Design the automation',
    description: 'We design systems that fit how your business works, not the other way around. Every automation is built around your processes, not generic templates.',
  },
  {
    number: '03',
    title: 'Build with intention',
    description: 'We build what we design. No handoffs to offshore teams, no scope creep, no surprises. You work directly with the people building your systems.',
  },
  {
    number: '04',
    title: 'Measure what matters',
    description: 'We set up clear metrics so you can see the impact: time saved, errors eliminated, leads captured. You\'ll always know what\'s working.',
  },
];

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export function Home() {
  const processSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = processSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroCanvas />
        <div className={styles.heroContent}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className={styles.heroText}
          >
            <h1 className={styles.heroTitle}>
              We build the digital systems
              <br />
              <span className={styles.heroAccent}>modern businesses depend on.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              AI automation agency specializing in websites, content systems, and business process automation — designed to work as one.
            </p>
            <div className={styles.heroCta}>
              <Button magnetic as="a" href="/contact">
                Start a conversation
              </Button>
              <Button variant="ghost" as="a" href="/what-we-build">
                See what we build
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={styles.whatWeDo}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>One practice, three connected capabilities.</h2>
            <p className={styles.sectionText}>
              Most agencies offer these as separate services. We think about them as one system. Your website captures leads. Your content keeps prospects engaged. Your internal workflows deliver on promises. When all three work together, the business runs itself.
            </p>
          </motion.div>

          <div className={styles.pillarsGrid}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={1}
              className={styles.pillar}
            >
              <div className={styles.pillarIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>Websites & Web Automation</h3>
              <p className={styles.pillarDescription}>
                Custom-designed sites built for conversion. Lead capture, qualification, and routing handled automatically.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={2}
              className={styles.pillar}
            >
              <div className={styles.pillarIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>Content & Social Automation</h3>
              <p className={styles.pillarDescription}>
                End-to-end content systems: planning, drafting, scheduling, publishing. On-brand output without the full team.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={3}
              className={styles.pillar}
            >
              <div className={styles.pillarIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>Business Process Automation</h3>
              <p className={styles.pillarDescription}>
                Workflows that eliminate manual handoffs. CRMs, inboxes, spreadsheets, and back-office tools — all connected.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Systems Diagram Section */}
      <section className={styles.systemsSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>A business as a system.</h2>
            <p className={styles.sectionText}>
              Click any node to see how data flows between systems — and where automation transforms how work gets done.
            </p>
          </motion.div>

          <SystemsDiagram />
        </div>
      </section>

      {/* Process Steps Section */}
      <section className={styles.processSection} ref={processSectionRef}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>How we work.</h2>
          </motion.div>

          <div className={styles.stepsGrid}>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUpVariants}
                custom={i + 1}
                className={styles.step}
              >
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POV Section */}
      <section className={styles.povSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.povContent}
          >
            <h2 className={styles.povTitle}>We believe AI should be invisible.</h2>
            <div className={styles.povText}>
              <p>
                The best automation doesn't announce itself. It just means the work gets done — leads captured, content published, invoices sent, clients notified. The AI is in the background, handling the repetitive so your team can focus on the meaningful.
              </p>
              <p>
                We're not here to build flashy AI demos. We're here to build systems that run while you sleep, scale without proportionally scaling headcount, and give you back the hours you spend on work that should be automatic.
              </p>
              <p>
                The question we ask isn't "should we add AI to this?" It's "what would this look like if it ran itself?"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className={styles.founderSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.founderContent}
          >
            <div className={styles.founderImage}>
              <img src="/josh-strohm.png" alt="Josh Strohm" width="80" height="80" className={styles.founderImg} />
            </div>
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>Josh Strohm</h3>
              <p className={styles.founderRole}>Founder, Strohm Partners LLC</p>
              <p className={styles.founderBio}>
                After years building software for companies of all sizes, I saw the same pattern: businesses drowning in manual work that should be automatic. Strohm Partners exists to fix that — one system at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.ctaContent}
          >
            <h2 className={styles.ctaTitle}>Ready to think about your business as a system?</h2>
            <p className={styles.ctaText}>
              Let's map out how your work actually flows — and where automation could reclaim your time.
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

function HeroCanvas() {
  return (
    <div className={styles.heroCanvas} aria-hidden="true">
      <svg className={styles.heroMesh} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#meshGradient)" />
      </svg>
    </div>
  );
}

export default Home;