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

export function Terms() {
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
            <h1 className={styles.title}>Terms of Service</h1>
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
              Welcome to Strohm Partners. These Terms of Service ("Terms") govern your access to and use of the services, website, and digital systems provided by Strohm Partners LLC ("Strohm Partners," "we," "us," or "our").
            </p>
            <p>
              By accessing our website or engaging us for services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
            </p>

            <h2>1. Services Offered</h2>
            <p>
              Strohm Partners LLC is an AI consulting and systems engineering firm specializing in operational optimization and custom AI integrations, including:
            </p>
            <ul>
              <li>AI operational audits, workflow diagnostics, and operational bottleneck mapping.</li>
              <li>Intelligent acquisition funnels and custom web-based lead qualification systems.</li>
              <li>Content voice engineering, training frameworks, and custom prompt architectures.</li>
              <li>Custom API integrations, intelligent back-office pipelines, and data-extraction systems.</li>
            </ul>
            <p>
              Specific scopes of work, consulting milestones, roadmaps, and custom engineering deliverables will be detailed in individual service agreements or statements of work signed between you and Strohm Partners LLC.
            </p>

            <h2>2. Fees and Payments</h2>
            <p>
              Clients agree to pay all fees specified in the relevant invoice, statement of work, or consulting agreement. Payments are processed securely via Stripe or bank transfer, as outlined in your billing agreement.
            </p>
            <ul>
              <li><strong>Milestone-Based Billing:</strong> Custom consulting and system integration engagements are typically billed in structural stages (e.g., diagnostic audit deposit, systems architecture approval, staging integration, and production launch).</li>
              <li><strong>Retainers and Subscriptions:</strong> Ongoing support, system optimization, prompt tuning, and active database monitoring agreements are billed in advance on a recurring monthly or annual basis.</li>
              <li><strong>Late Payments:</strong> We reserve the right to temporarily suspend active systems integrations or ongoing consulting delivery if payments remain outstanding past their due date.</li>
            </ul>

            <h2>3. Intellectual Property and Ownership</h2>
            <p>
              At Strohm Partners, we believe you should fully own the AI systems we design and engineer for you.
            </p>
            <p>
              Upon receipt of full payment for completed services, Strohm Partners LLC transfers and assigns to you all intellectual property rights, title, and interest in and to the custom prompt frameworks, database configurations, API integrations, and code built specifically for your business under our agreement.
            </p>
            <p>
              Any pre-existing tools, open-source libraries, or third-party SaaS platforms (e.g., Make.com, Zapier, Webflow, Stripe, OpenAI, Anthropic) utilized in your custom integrations remain subject to their respective creators' and platforms' licensing terms, which you are responsible for maintaining directly.
            </p>

            <h2>4. Client Responsibilities</h2>
            <p>
              To ensure successful implementation, clients agree to:
            </p>
            <ul>
              <li>Provide timely access to necessary accounts, digital assets, and guidelines.</li>
              <li>Review deliverables and provide feedback within agreed timelines.</li>
              <li>Maintain the active subscriptions for third-party platforms utilized in their workflows.</li>
            </ul>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              Our systems and services are provided on an "as is" and "as available" basis. While we strive to build robust, highly automated workflows, Strohm Partners LLC does not guarantee that third-party APIs or automated pipelines will run continuously without occasional service disruptions, as their performance is dependent on external service providers.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Strohm Partners LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or business opportunities arising out of or related to your use of our services or website.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These Terms and any dispute arising from your use of our site or services shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued engagement with our services following updates constitutes acceptance of the revised Terms.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please contact us at:
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

export default Terms;
