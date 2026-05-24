import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './BookCall.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export function BookCall() {
  useEffect(() => {
    document.title = 'Schedule a Consultation | Strohm Partners';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Schedule a 30-minute operational audit diagnostic session with our team to map out custom AI systems integration for your business.');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className="container">
          {/* Header */}
          <header className={styles.header}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={0}
            >
              <h1 className={styles.title}>Schedule a Consultation.</h1>
              <p className={styles.subtitle}>
                Choose a time that works for you below. Let's map your operational workflows, identify hidden bottlenecks, and find exactly where custom AI engineering fits your business.
              </p>
            </motion.div>
          </header>

          {/* Booking Content Grid */}
          <div className={styles.grid}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
              className={styles.calendarContainer}
            >
              {/* Google Calendar Appointment Scheduling Embed */}
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2lnFVDVF4oKIzE6ZHDeeyE7cLSIGsE79nUYZPvsPWxz8a6Do7nJDVXq1uwyqJVtig3pMaB3tg7?gv=true"
                style={{ border: 0, width: '100%', height: '700px' }}
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
                aria-label="Google Calendar Appointment Booking Widget"
              />
            </motion.div>

            {/* Bottom Callouts */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={2}
              className={styles.sidebar}
            >
              <div className={styles.infoBox}>
                <span className={styles.infoTitle}>What to expect on this call</span>
                <p className={styles.infoText}>
                  This is a 30-minute diagnostic session focused entirely on your business operations. 
                  No pushy sales pitches or generic software templates. We will cover:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <strong>Bottleneck Identification</strong>: Point out the highest-friction manual tasks currently slowing your team down.
                  </li>
                  <li className={styles.bulletItem}>
                    <strong>Integration Analysis</strong>: Trace how data currently flows between your active CRM, billing, and document databases.
                  </li>
                  <li className={styles.bulletItem}>
                    <strong>ROI Projection</strong>: Map precisely where custom automation code will recover the most hours and save the most overhead.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookCall;
