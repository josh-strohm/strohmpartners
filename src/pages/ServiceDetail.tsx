import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/servicesData';
import { LeadCaptureDemo } from '@/components/whatwebuild/LeadCaptureDemo';
import { ContentVoiceDemo } from '@/components/whatwebuild/ContentVoiceDemo';
import { WorkflowAutomationDemo } from '@/components/whatwebuild/WorkflowAutomationDemo';
import { AeoGeoDemo } from '@/components/whatwebuild/AeoGeoDemo';
import styles from './ServiceDetail.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export function ServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  const service = servicesData.find(s => s.slug === serviceSlug);

  useEffect(() => {
    if (service) {
      document.title = service.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', service.seoDescription);
      }
      window.scrollTo(0, 0);
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Map service ID to the corresponding interactive see-it-work demo
  const renderDemo = () => {
    switch (service.id) {
      case 'web-funnels':
        return <LeadCaptureDemo />;
      case 'content-systems':
        return <ContentVoiceDemo />;
      case 'operational-audits':
        return <WorkflowAutomationDemo />;
      case 'aeo-geo-playbook':
        return <AeoGeoDemo />;
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
          <Link to="/services" className={styles.breadcrumbLink}>Services</Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{service.title}</span>
        </nav>

        {/* Editorial Header */}
        <header className={styles.header}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={0}
            className={styles.headerContent}
          >
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.tagline}>{service.tagline}</p>
            <p className={styles.description}>{service.description}</p>
          </motion.div>
        </header>
      </div>

      {/* Showcase with interactive see-it-work demo */}
      <section className={styles.showcaseSection}>
        <div className="container">
          <div className={styles.showcaseGrid}>
            <div className={styles.showcaseDetails}>
              {/* How it works */}
              <div>
                <h2 className={styles.sectionTitle}>How it works.</h2>
                <div className={styles.methodologyGrid}>
                  {service.howItWorks.map((step, idx) => (
                    <motion.div
                      key={step.step}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      variants={fadeUpVariants}
                      custom={idx}
                      className={styles.methodologyCard}
                    >
                      <span className={styles.methodologyStep}>Step {step.step}</span>
                      <h3 className={styles.methodologyTitle}>{step.title}</h3>
                      <p className={styles.methodologyDesc}>{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky interactive demo card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={1}
              className={styles.demoWrapper}
            >
              {renderDemo()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expectation outcomes */}
      <section className={styles.expectationSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What you can expect.</h2>
          <div className={styles.expectationGrid}>
            {service.whatToExpect.map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUpVariants}
                custom={idx}
                className={styles.expectationCard}
              >
                <h3 className={styles.expectationTitle}>{item.title}</h3>
                <p className={styles.expectationDesc}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostics: Symptoms vs Deliverables */}
      <section className={styles.diagnosticSection}>
        <div className="container">
          <div className={styles.diagnosticGrid}>
            {/* Symptoms before hiring */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUpVariants}
              custom={0}
              className={`${styles.diagnosticBlock} ${styles.diagnosticBlockSymptoms}`}
            >
              <h4 className={styles.diagnosticTitle}>Before we're hired, you might experience:</h4>
              <ul className={styles.diagnosticList}>
                {service.symptoms.map((s, idx) => (
                  <li key={idx} className={styles.diagnosticListItem}>{s}</li>
                ))}
              </ul>
            </motion.div>

            {/* Deliverables we provide */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUpVariants}
              custom={1}
              className={`${styles.diagnosticBlock} ${styles.diagnosticBlockDeliverables}`}
            >
              <h4 className={styles.diagnosticTitle}>What we deliver:</h4>
              <ul className={styles.diagnosticList}>
                {service.deliverables.map((d, idx) => (
                  <li key={idx} className={styles.diagnosticListItem}>{d}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ideal Fit client callout */}
      <section className={styles.idealSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.idealBox}
          >
            <span className={styles.idealLabel}>Ideal Client Fit</span>
            <p className={styles.idealText}>{service.idealClient}</p>
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
            <h2 className={styles.ctaTitle}>Ready to begin your strategic integration?</h2>
            <p className={styles.ctaText}>
              We recommend starting with an operational audit or footprint diagnostics, mapping out precisely where custom AI engineering fits your organization.
            </p>
            <Button magnetic as="a" href="/book">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default ServiceDetail;
