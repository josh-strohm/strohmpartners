import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SystemsDiagram } from '@/components/home/SystemsDiagram';
import styles from './Home.module.css';

const processSteps = [
  {
    number: '01',
    title: 'Audit & Identify',
    description: 'We start by auditing your operations to identify the highest-leverage opportunities for AI in your business and expose the hidden bottlenecks.',
  },
  {
    number: '02',
    title: 'Map Opportunity',
    description: 'We map out exactly where AI can fit, designing custom solution architectures that integrate smoothly into your existing business stack.',
  },
  {
    number: '03',
    title: 'Build & Integrate',
    description: 'We build what we design. No outsourcing or templates. We engineer custom AI pipelines and integrations, giving you full ownership of the systems.',
  },
  {
    number: '04',
    title: 'Measure Impact',
    description: 'We establish clear metrics to track time saved, accuracy improvements, and return on investment. You will always see the direct value of your AI.',
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
              We help you find where AI
              <br />
              <span className={styles.heroAccent}>actually fits in your business.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              AI consulting and systems engineering. We audit your workflows, identify high-impact AI opportunities, and build the custom integrations that deliver real operational ROI.
            </p>
            <div className={styles.heroCta}>
              <Button magnetic as="a" href="/book">
                Start a conversation
              </Button>
              <Button variant="ghost" as="a" href="/services">
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
            <h2 className={styles.sectionTitle}>AI consulting with a builder's perspective.</h2>
            <p className={styles.sectionText}>
              We don't just build systems; we help you identify the highest-leverage opportunities for AI in your business. By auditing your workflows and mapping your data, we find the exact bottlenecks where AI will drive efficiency, then we build the custom systems to solve them.
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
              <h3 className={styles.pillarTitle}>Web &amp; AI Acquisition Funnels</h3>
              <p className={styles.pillarDescription}>
                We audit how you capture and interact with customers online. We map exactly where AI can naturally qualify prospects and route lead data, then build custom sites to support it.
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
              <h3 className={styles.pillarTitle}>Content Voice &amp; Scaling Systems</h3>
              <p className={styles.pillarDescription}>
                We design a systematic approach to brand content. We identify where AI models can accelerate research and formatting while keeping your brand voice fully authentic and editor-approved.
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
              <h3 className={styles.pillarTitle}>AI Operational Audits &amp; Integrations</h3>
              <p className={styles.pillarDescription}>
                Our core advisory offering. We conduct deep workflow audits to isolate high-friction internal bottlenecks, mapping exactly where custom AI database integrations can reclaim lost hours.
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
              Click any node to see how data flows between systems, showcasing where custom AI integrations eliminate operational friction.
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
            <h2 className={styles.povTitle}>We believe AI should solve real problems.</h2>
            <div className={styles.povText}>
              <p>
                AI is a tool, not a strategy. The value of AI isn't in deploying the flashiest new model; it's in finding where it actually fits to eliminate manual friction, reduce human error, and save your team real hours every week.
              </p>
              <p>
                As consultants, we start with honest math and deep workflow audits, helping you cut through the marketing noise to focus purely on ROI. We design and integrate systems that work quietly in the background while you focus on high-value client relationships.
              </p>
              <p>
                The question we help you answer isn't "how do we use AI?" It's "where does AI make business sense for our bottom line?"
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
              <img src="/josh-strohm.png" alt="Josh Strohm" className={styles.founderImg} />
            </div>
            <div className={styles.founderInfo}>
              <span className={styles.founderLabel}>A Message from the Founder</span>
              <h3 className={styles.founderName}>Josh Strohm</h3>
              <p className={styles.founderRole}>Founder, Strohm Partners LLC</p>
              <div className={styles.founderMessage}>
                <p>
                  Strohm Partners exists because I got tired of seeing the same story play out over and over. A business owner gets talked into some shiny new tool, signs up, pays for it, and a few months later nothing has actually changed except their credit card statement.
                </p>
                <p>
                  I'm not interested in being one more person trying to sell you something you don't need.
                </p>
                <p>
                  When someone hires me, the first thing I do is just learn how their business works. What takes up the most time. Where things keep falling through. What the team complains about on Mondays. You can't fix any of that from a sales call, and you definitely can't fix it with a template someone made for a different company in a different industry.
                </p>
                <p>
                  Once I actually understand what's going on, then we figure out together what's worth building and what isn't. Sometimes the answer is a custom tool. Sometimes the answer is way simpler than that. Sometimes the answer is don't do anything yet. I'd rather tell you the honest version than the version that gets me a bigger invoice.
                </p>
                <p>
                  And anything we end up building, you keep. It's yours.
                </p>
                <p>
                  If any of this sounds like what you've been needing, shoot me a message.
                </p>
              </div>
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
            <h2 className={styles.ctaTitle}>Ready to discover where AI actually fits?</h2>
            <p className={styles.ctaText}>
              Let's audit your processes, map your systems architecture, and unlock real operational ROI.
            </p>
            <Button magnetic as="a" href="/book">
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