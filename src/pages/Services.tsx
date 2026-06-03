import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CostCalculator } from '@/components/whatwebuild/CostCalculator';
import { servicesData } from '@/data/servicesData';
import styles from './Services.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const serviceIcons: Record<string, React.ReactNode> = {
  'web-funnels': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'content-systems': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  ),
  'operational-audits': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'aeo-geo-playbook': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  'ai-chatbots': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="9" y2="10" />
      <line x1="15" y1="10" x2="15" y2="10" />
    </svg>
  ),
  'ai-voice-agents': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
};

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    // Set document title and meta description
    document.title = 'Services & AI Consulting | Strohm Partners';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Helping you identify where AI fits and building the custom integrations to make it work. Browse our core service offerings.');
    }

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
              Helping you map where AI actually fits in your operations and engineering the custom integrations to make it work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUpVariants}
                custom={index}
                style={{ display: 'flex' }}
              >
                <Link to={`/services/${service.slug}`} className={styles.serviceCard} id={`service-${service.id}`}>
                  <div className={styles.cardIcon}>
                    {serviceIcons[service.id]}
                  </div>
                  <span className={styles.cardTagline}>{service.tagline}</span>
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDescription}>{service.shortDescription}</p>
                  <span className={styles.cardLink}>
                    Explore service offering
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="11" y2="6" />
                      <polyline points="5 6 11 6 11 12" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ROI Cost Calculator */}
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
              Run the math on your manual administrative workflows, then let's partner to identify where custom AI integration will drive the highest operational return.
            </p>
            <CostCalculator />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className={styles.ctaTitle}>Ready to discover where AI fits in your business?</h2>
            <p className={styles.ctaText}>
              We recommend starting with an operational audit of your highest-friction bottleneck. From there, we map out a comprehensive, custom systems integration roadmap.
            </p>
            <Button magnetic as="a" href="/book">
              Book an Operational Audit
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Services;
