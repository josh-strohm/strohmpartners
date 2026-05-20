import { motion } from 'framer-motion';
import styles from './Legal.module.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function Privacy() {
  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className={styles.headerContent}
          >
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: May 19, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className={styles.article}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className={styles.body}
          >
            <p>
              Strohm Partners LLC ("we," "us," or "our") operates the Strohm Partners website and provides custom AI consulting, strategic advisory, and custom systems integration services. We are committed to protecting your privacy and ensuring a secure experience.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide better services to our clients and website visitors.
            </p>
            <h3>Information You Provide to Us:</h3>
            <ul>
              <li><strong>Contact and Project Inquiries:</strong> When you fill out our multi-step contact form, we collect your name, email address, company name, industry, and details about your operational bottlenecks, system integration needs, or consulting goals.</li>
              <li><strong>Billing and Financial Details:</strong> If you engage us for services, we collect necessary billing details. Please note that all payments are processed through third-party secure payment processors (like Stripe), and we do not store credit card details directly on our servers.</li>
            </ul>
            <h3>Information Collected Automatically:</h3>
            <ul>
              <li><strong>Usage Data:</strong> We may collect standard browser information, IP address, page views, and interaction details to optimize website performance and improve user experience.</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to recall your settings and understand site traffic patterns. You can manage cookie preferences directly through your browser.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information for various professional purposes:
            </p>
            <ul>
              <li>To respond to your inquiries, schedule strategic consultation calls, and scope operational audits.</li>
              <li>To deliver, monitor, and optimize our custom AI consulting, prompts tuning, and systems integration services.</li>
              <li>To manage your client account, process payments, and issue invoices.</li>
              <li>To ensure the security, integrity, and operational health of our digital systems.</li>
              <li>To comply with regulatory and legal obligations (such as financial reporting and Know Your Customer rules).</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We value your trust. We do not sell, rent, or trade your personal information to third parties. We only share information with partners under specific, secure conditions:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We share data with trusted vendors that support our business operations, such as hosting providers, email platforms, CRMs, and payment systems (specifically Stripe). These partners are contractually obligated to protect your data.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required to do so by law, court order, or governmental authority to comply with legal processes or protect rights and safety.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data against loss, theft, and unauthorized access or modification. However, please note that no internet transmission or digital storage method is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>5. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have specific privacy rights regarding your personal information:
            </p>
            <ul>
              <li><strong>Access and Correction:</strong> You may request a copy of the personal information we hold about you or ask us to update/correct inaccurate details.</li>
              <li><strong>Deletion:</strong> You may request that we delete your contact information, subject to certain exceptions (like outstanding payments or active regulatory compliance requirements).</li>
              <li><strong>Opt-Out:</strong> You can opt-out of marketing communications at any time by clicking the "Unsubscribe" link in our emails or contacting us directly.</li>
            </ul>

            <h2>6. Children's Privacy</h2>
            <p>
              Our website and services are intended exclusively for businesses and adults. We do not knowingly collect personal data from individuals under the age of 18.
            </p>

            <h2>7. Updates to This Privacy Policy</h2>
            <p>
              We may revise this Privacy Policy from time to time. The updated version will be posted on this page with the revised "Last Updated" date. We encourage you to review this policy periodically.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions or would like to exercise any of your privacy rights, please contact our team at:
            </p>
            <p>
              <strong>Strohm Partners LLC</strong><br />
              Email: <a href="mailto:info@strohmpartners.com">info@strohmpartners.com</a><br />
              Phone: <a href="tel:+18149313981">+1 (814) 931-3981</a><br />
              Address: 911 23rd Ave., Altoona, PA 16601
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Privacy;
