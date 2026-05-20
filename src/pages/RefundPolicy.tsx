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

export function RefundPolicy() {
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
            <h1 className={styles.title}>Refund &amp; Cancellation Policy</h1>
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
              Strohm Partners LLC ("we," "us," or "our") provides custom AI consulting, operational audits, and custom system integration engineering services. Because our services are highly tailored, we maintain clear guidelines regarding billing, contract cancellations, and refunds.
            </p>
            <p>
              Please read this policy carefully before signing a service agreement, starting an operational audit, or initiating payments.
            </p>

            <h2>1. AI Consulting &amp; System Integration Scopes</h2>
            <p>
              Custom advisory and integration roadmaps (including custom brand voice engineering, smart lead acquisition funnels, and custom operational bottleneck solutions) are structured around a detailed Statement of Work (SOW) or Consulting Agreement with defined milestone approvals.
            </p>
            <ul>
              <li><strong>Milestone Approvals:</strong> At the completion of each strategic milestone (e.g., discovery audit, systems design blueprint, staging, production launch), we submit work for client review. Upon formal approval, the corresponding milestone payment is due.</li>
              <li><strong>Non-Refundability:</strong> Once a milestone deliverable or strategic roadmap phase has been reviewed, approved, and billed, all fees paid for that milestone are strictly non-refundable. This reflects the dedicated consulting hours, system architecture engineering, and specialized advisory resources allocated to your business.</li>
              <li><strong>Diagnostic Audit &amp; Discovery Deposits:</strong> Upfront payments for operational diagnostics, data mapping, and initial scoping sessions are non-refundable once the onboarding process has commenced.</li>
            </ul>

            <h2>2. Project Cancellations</h2>
            <p>
              Either party may terminate an active service agreement or Statement of Work under the following terms:
            </p>
            <ul>
              <li><strong>Cancellation Notice:</strong> Unless specified otherwise in your SOW, projects may be cancelled by providing 14 days written notice (via email) to our team.</li>
              <li><strong>Final Billing:</strong> Upon receiving a cancellation request, all active work will cease. The client will be billed for all completed hours, deliverables, or proportional milestone progress up to the date of cancellation. Any outstanding payments must be settled within 7 business days.</li>
              <li><strong>Transfer of Work:</strong> Any completed code, files, or custom configurations will be packaged and delivered to the client only after the final invoice has been paid in full.</li>
            </ul>

            <h2>3. Strategic Retainers and Monitoring Subscriptions</h2>
            <p>
              Ongoing strategic consulting, custom model tuning, integration maintenance, and active system monitoring retainers are billed in advance on a recurring monthly or annual basis.
            </p>
            <ul>
              <li><strong>No Long-Term Commitments:</strong> Clients may cancel recurring monthly consulting or monitoring retainers at any time.</li>
              <li><strong>Cancellation Procedure:</strong> To cancel your subscription and prevent the next billing cycle from charging, you must submit a written cancellation request via email to <a href="mailto:info@strohmpartners.com">info@strohmpartners.com</a> at least 5 business days prior to your renewal date.</li>
              <li><strong>No Partial Refunds:</strong> Payments for monthly or annual retainers are processed automatically. We do not provide prorated refunds or credits for partial months or unused advisory hours within a billing cycle. Following cancellation, your services will continue uninterrupted until the end of your current paid billing period.</li>
            </ul>

            <h2>4. Disputes and Payment Issues</h2>
            <p>
              We pride ourselves on honest partnerships, clear communication, and premium delivery. If you are unsatisfied with a deliverable or believe there has been a billing discrepancy:
            </p>
            <ul>
              <li>Please contact our client support team immediately at <a href="mailto:info@strohmpartners.com">info@strohmpartners.com</a>. We will respond within 24 hours to review your feedback.</li>
              <li>We request that clients discuss any concerns directly with us before initiating card chargebacks or payment disputes, as we are committed to finding fair and cooperative resolutions.</li>
            </ul>

            <h2>5. Policy Revisions</h2>
            <p>
              We reserve the right to amend this Refund and Cancellation Policy at any time to align with service updates or financial regulations. Any revisions will be published on this page.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions, require assistance with a cancellation, or want to review your active service agreement, please contact us:
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

export default RefundPolicy;
