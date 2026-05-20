import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui/Accordion';
import { MultiStepForm } from '@/components/contact/MultiStepForm';
import styles from './Contact.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const faqItems = [
  {
    id: 'timeline',
    question: 'How long does a typical engagement take?',
    answer: 'It depends on scope. Designing and deploying a high-leverage AI funnel or integration (such as an acquisition flow) typically takes 2–3 weeks. A comprehensive operational audit and multi-system custom AI integration roadmap is broader. We always start with a diagnostic audit to present you with a precise timeline and projected ROI before any integration work begins.',
  },
  {
    id: 'ownership',
    question: 'Who owns the AI models and systems you build?',
    answer: 'You do. Everything we engineer is yours, including the custom prompt frameworks, the database configurations, the integrations, and the code. We do not lock you into proprietary platforms or require you to pay ongoing agency licensing fees to access your systems. You retain complete intellectual property ownership.',
  },
  {
    id: 'ai',
    question: 'What does "AI-powered" actually mean here?',
    answer: 'It means we use AI as a tactical lever to solve real operational bottlenecks, not as flashy hype. In lead acquisition, AI classifies and qualifies leads intelligently. In content systems, it automates research and voice matching while keeping your editorial staff in control. In operations, AI parses unstructured data and handles complex decision paths that traditional software cannot.',
  },
  {
    id: 'maintenance',
    question: 'What happens after the AI systems are deployed?',
    answer: 'We provide hands-on training and a dedicated monitoring period to ensure your team is comfortable and the integrations perform correctly. After that, you can manage the systems internally (we deliver comprehensive documentation), or you can retain us for active monthly monitoring and operational optimization.',
  },
  {
    id: 'start',
    question: 'How do we get started?',
    answer: 'Fill out our contact form to book an operational audit. We\'ll analyze your current workflows and reach out within 24 hours to schedule a diagnostic strategy call. Our goal is to identify if we\'re a good fit to drive real ROI in your business.',
  },
];

export function Contact() {
  const headerRef = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  return (
    <main className={styles.main}>
      {/* Header with Form */}
      <section className={styles.header}>
        <div className="container">
          <motion.div
            ref={headerRef.ref}
            initial="hidden"
            animate={headerRef.inView ? 'visible' : 'hidden'}
            variants={fadeUpVariants}
            custom={0}
            className={styles.headerContent}
          >
            <h1 className={styles.title}>Let's find where AI fits.</h1>
            <p className={styles.subtitle}>
              Book an operational audit. Tell us about your business and we'll help you identify the highest-leverage AI opportunities.
            </p>
          </motion.div>

          <div className={styles.formGrid}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={1}
              className={styles.formWrapper}
            >
              <MultiStepForm />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              custom={2}
              className={styles.sideContent}
            >
              <div className={styles.whatToExpect}>
                <h3 className={styles.sideTitle}>What happens next</h3>
                <ol className={styles.nextSteps}>
                  <li className={styles.nextStep}>
                    <span className={styles.stepNumber}>1</span>
                    <div>
                      <strong>We review your submission</strong>
                      <p>We read what you've shared and come prepared with questions.</p>
                    </div>
                  </li>
                  <li className={styles.nextStep}>
                    <span className={styles.stepNumber}>2</span>
                    <div>
                      <strong>Diagnostic consultation</strong>
                      <p>We hold a 30-minute strategy session to map your current processes and isolate high-leverage bottlenecks.</p>
                    </div>
                  </li>
                  <li className={styles.nextStep}>
                    <span className={styles.stepNumber}>3</span>
                    <div>
                      <strong>AI integration roadmap</strong>
                      <p>If there is a strong fit, we design a tailored integration proposal detailing system scope, timeline, and operational ROI math.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className={styles.contactDetails}>
                <h3 className={styles.sideTitle}>Official details</h3>
                <ul className={styles.detailsList}>
                  <li className={styles.detailsItem}>
                    <strong>Email</strong>
                    <a href="mailto:info@strohmpartners.com" className={styles.detailsLink}>info@strohmpartners.com</a>
                  </li>
                  <li className={styles.detailsItem}>
                    <strong>Phone</strong>
                    <a href="tel:+18149313981" className={styles.detailsLink}>+1 (814) 931-3981</a>
                  </li>
                  <li className={styles.detailsItem}>
                    <strong>Office</strong>
                    <span className={styles.detailsText}>
                      Strohm Partners LLC<br />
                      911 23rd Ave.<br />
                      Altoona, PA 16601
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={0}
            className={styles.faqHeader}
          >
            <h2 className={styles.faqTitle}>Common questions</h2>
            <p className={styles.faqSubtitle}>
              Honest answers to things people usually ask before working with us.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            custom={1}
            className={styles.faqWrapper}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Contact;