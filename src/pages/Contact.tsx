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
    question: 'How long does a typical project take?',
    answer: 'It depends on scope. A single website automation (lead capture with routing) typically takes 2–3 weeks. A full process automation overhaul varies more widely — we usually scope those after understanding the current situation. We\'ll give you a realistic timeline before any work begins.',
  },
  {
    id: 'ownership',
    question: 'Who owns the systems you build?',
    answer: 'You do. Everything we build is yours — the code, the integrations, the automations. We don\'t hold anything hostage with proprietary tooling or require you to use our platform forever. If you want to move to another provider eventually, you can.',
  },
  {
    id: 'ai',
    question: 'What does "AI-powered" actually mean here?',
    answer: 'It means we use AI as one tool among many to build your systems. For content, AI helps draft and format. For lead qualification, AI helps score and route. For process automation, AI can handle edge cases that rule-based systems can\'t. The AI is in service of the workflow, not the other way around.',
  },
  {
    id: 'maintenance',
    question: 'What happens after the project is done?',
    answer: 'We typically offer a support period after launch to handle any issues. After that, you can maintain the systems yourself (we\'ll document everything), or we can discuss ongoing support arrangements. Most clients start with us and then either maintain themselves or stay on a light support retainer.',
  },
  {
    id: 'start',
    question: 'How do we get started?',
    answer: 'Fill out the form. We\'ll review what you\'ve shared and reach out within 24 hours to schedule a conversation. No sales pressure — we just want to understand your situation well enough to know if we\'re a good fit.',
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
            <h1 className={styles.title}>Let's talk.</h1>
            <p className={styles.subtitle}>
              Tell us about your business and what you're trying to accomplish.
              We'll be in touch within 24 hours.
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
                      <strong>We have a conversation</strong>
                      <p>30 minutes, no sales pitch. We want to understand your situation.</p>
                    </div>
                  </li>
                  <li className={styles.nextStep}>
                    <span className={styles.stepNumber}>3</span>
                    <div>
                      <strong>We scope the work</strong>
                      <p>If we're a good fit, we put together a detailed proposal with realistic timelines and pricing.</p>
                    </div>
                  </li>
                </ol>
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