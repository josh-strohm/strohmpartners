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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>AI-Powered Customer Engagement</h3>
              <p className={styles.pillarDescription}>
                From intelligent websites and lead funnels to AI chatbots and voice agents that answer calls 24/7. We build the systems that greet, qualify, and route every visitor and caller so your team only touches high-value conversations.
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
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>Content &amp; AI Search Visibility</h3>
              <p className={styles.pillarDescription}>
                We build content production systems that scale your brand voice without losing authenticity, and optimize your digital presence so AI search engines like ChatGPT, Gemini, and Perplexity recommend your business first.
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
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>Workflow Automation &amp; Integration</h3>
              <p className={styles.pillarDescription}>
                Our core advisory offering. We conduct deep operational audits to find where your team loses hours to manual work, then build secure custom integrations that connect your tools and automate the repetitive tasks holding you back.
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
                  If any of this sounds like what you've been looking for, please <a href="/contact">send a message</a> or <a href="/book">schedule a call</a>.
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