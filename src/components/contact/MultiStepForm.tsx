import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './MultiStepForm.module.css';

interface FormData {
  serviceType: string;
  projectDescription: string;
  budgetRange: string;
  name: string;
  email: string;
  company: string;
  phone: string;
}

interface Errors {
  serviceType?: string;
  projectDescription?: string;
  budgetRange?: string;
  name?: string;
  email?: string;
  company?: string;
}

const serviceTypes = [
  { value: 'websites', label: 'Web & AI Acquisition Funnels' },
  { value: 'content', label: 'Content Voice & Scaling Systems' },
  { value: 'process', label: 'AI Operational Audits & Integrations' },
  { value: 'multiple', label: 'Comprehensive AI Strategy Consulting' },
];

const budgetRanges = [
  { value: 'under-1k', label: 'Less than $1,000' },
  { value: '1k-5k', label: '$1,000 – $5,000' },
  { value: '5k-10k', label: '$5,000 – $10,000' },
  { value: 'over-10k', label: '$10,000+' },
];

const steps = [
  { id: 1, title: 'Your goals', description: 'What are your operational goals?' },
  { id: 2, title: 'Your budget', description: 'Help us understand the scope.' },
  { id: 3, title: 'Your details', description: 'How do we reach you?' },
];

const STORAGE_KEY = 'strohm-contact-form';

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      serviceType: '',
      projectDescription: '',
      budgetRange: '',
      name: '',
      email: '',
      company: '',
      phone: '',
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const validate = (step: number, data: FormData): Errors => {
    const errs: Errors = {};

    if (step === 1) {
      if (!data.serviceType) errs.serviceType = 'Please select a service type';
      if (!data.projectDescription.trim()) errs.projectDescription = 'Please describe your operational needs';
      else if (data.projectDescription.trim().length < 20) errs.projectDescription = 'Please provide more detail (at least 20 characters)';
    }

    if (step === 2) {
      if (!data.budgetRange) errs.budgetRange = 'Please select a budget range';
    }

    if (step === 3) {
      if (!data.name.trim()) errs.name = 'Name is required';
      if (!data.email.trim()) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email';
      if (!data.company.trim()) errs.company = 'Company is required';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const stepErrors = validate(currentStep, formData);
    setErrors(prev => ({ ...prev, [field]: stepErrors[field as keyof Errors] }));
  };

  const next = () => {
    const stepErrors = validate(currentStep, formData);
    setErrors(stepErrors);

    const fieldsToMark = currentStep === 1
      ? ['serviceType', 'projectDescription']
      : currentStep === 2
      ? ['budgetRange']
      : ['name', 'email', 'company'];

    setTouched(fieldsToMark.reduce((acc, f) => ({ ...acc, [f]: true }), {}));

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const back = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const submit = async () => {
    const stepErrors = validate(3, formData);
    setErrors(stepErrors);

    const fieldsToMark = ['name', 'email', 'company'];
    setTouched(fieldsToMark.reduce((acc, f) => ({ ...acc, [f]: true }), {}));

    if (Object.keys(stepErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://n8n.srv945929.hstgr.cloud/webhook/96daf806-3a1c-4dc3-a43a-c655bef78f13', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const direction = currentStep > 1 ? 1 : -1;

  if (isSuccess) {
    return (
      <motion.div
        className={styles.success}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
      >
        <motion.div
          className={styles.successIcon}
          initial={reducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
        <h3 className={styles.successTitle}>Message sent.</h3>
        <p className={styles.successText}>
          Thanks, {formData.name}. We'll review what you've shared and be in touch within 1–2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Progress */}
      <div className={styles.progress}>
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              styles.progressStep,
              currentStep > step.id && styles.complete,
              currentStep === step.id && styles.active
            )}
          >
            <div className={styles.progressDot}>
              {currentStep > step.id ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className={styles.progressLabel}>{step.title}</span>
            {i < steps.length - 1 && <div className={styles.progressLine} />}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className={styles.formArea}>
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 50 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -50 * direction }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>{steps[0].title}</h3>
                <p className={styles.stepDescription}>{steps[0].description}</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="serviceType" className={styles.label}>What do you need help with?</label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={e => setFormData(p => ({ ...p, serviceType: e.target.value }))}
                  onBlur={() => handleBlur('serviceType')}
                  className={cn(styles.select, touched.serviceType && errors.serviceType && styles.inputError)}
                >
                  <option value="">Select a service...</option>
                  {serviceTypes.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {touched.serviceType && errors.serviceType && (
                  <span className={styles.error}>{errors.serviceType}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="projectDescription" className={styles.label}>Describe your business and operational needs</label>
                <textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={e => setFormData(p => ({ ...p, projectDescription: e.target.value }))}
                  onBlur={() => handleBlur('projectDescription')}
                  placeholder="What bottlenecks are your team facing? Where do you suspect AI could help streamline your operations?"
                  rows={4}
                  className={cn(styles.textarea, touched.projectDescription && errors.projectDescription && styles.inputError)}
                />
                {touched.projectDescription && errors.projectDescription && (
                  <span className={styles.error}>{errors.projectDescription}</span>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 50 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -50 * direction }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>{steps[1].title}</h3>
                <p className={styles.stepDescription}>{steps[1].description}</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>What's your approximate budget?</label>
                <div className={styles.radioGroup}>
                  {budgetRanges.map(range => (
                    <label
                      key={range.value}
                      className={cn(styles.radioLabel, formData.budgetRange === range.value && styles.selected)}
                    >
                      <input
                        type="radio"
                        name="budgetRange"
                        value={range.value}
                        checked={formData.budgetRange === range.value}
                        onChange={e => setFormData(p => ({ ...p, budgetRange: e.target.value }))}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioText}>{range.label}</span>
                    </label>
                  ))}
                </div>
                {touched.budgetRange && errors.budgetRange && (
                  <span className={styles.error}>{errors.budgetRange}</span>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 50 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -50 * direction }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>{steps[2].title}</h3>
                <p className={styles.stepDescription}>{steps[2].description}</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  onBlur={() => handleBlur('name')}
                  placeholder="Your name"
                  className={cn(styles.input, touched.name && errors.name && styles.inputError)}
                />
                {touched.name && errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@company.com"
                  className={cn(styles.input, touched.email && errors.email && styles.inputError)}
                />
                {touched.email && errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="company" className={styles.label}>Company</label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                  onBlur={() => handleBlur('company')}
                  placeholder="Your company"
                  className={cn(styles.input, touched.company && errors.company && styles.inputError)}
                />
                {touched.company && errors.company && (
                  <span className={styles.error}>{errors.company}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  Phone <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className={styles.input}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {submitError && (
        <div style={{ color: 'var(--color-error)', fontSize: '0.875rem', textAlign: 'right', margin: '0 0 var(--space-2)' }}>
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className={styles.navigation}>
        {currentStep > 1 && (
          <button onClick={back} className={styles.backButton}>
            Back
          </button>
        )}
        <div className={styles.navSpacer} />
        {currentStep < 3 ? (
          <button onClick={next} className={styles.nextButton}>
            Continue
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={isSubmitting}
            className={cn(styles.submitButton, isSubmitting && styles.submitting)}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        )}
      </div>
    </div>
  );
}