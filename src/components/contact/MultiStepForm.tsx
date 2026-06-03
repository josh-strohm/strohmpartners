import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './MultiStepForm.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
}

type ErrorField = keyof FormData;
type Errors = Partial<Record<ErrorField, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/i;

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  website: '',
};

export function MultiStepForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<ErrorField, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    businessName: false,
    website: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const validateField = (field: ErrorField, data: FormData): string | undefined => {
    switch (field) {
      case 'firstName':
        if (!data.firstName.trim()) return 'First name is required';
        return undefined;
      case 'lastName':
        if (!data.lastName.trim()) return 'Last name is required';
        return undefined;
      case 'email':
        if (!data.email.trim()) return 'Email is required';
        if (!emailRegex.test(data.email.trim())) return 'Enter a valid email';
        return undefined;
      case 'phone':
        if (!data.phone.trim()) return 'Phone is required';
        if (data.phone.trim().replace(/\D/g, '').length < 7) return 'Enter a valid phone number';
        return undefined;
      case 'businessName':
        if (!data.businessName.trim()) return 'Business name is required';
        return undefined;
      case 'website':
        if (!data.website.trim()) return 'Website is required';
        if (!urlRegex.test(data.website.trim())) return 'Enter a valid website (e.g. example.com)';
        return undefined;
    }
  };

  const validateAll = (data: FormData): Errors => {
    const errs: Errors = {};
    (Object.keys(data) as ErrorField[]).forEach(field => {
      const err = validateField(field, data);
      if (err) errs[field] = err;
    });
    return errs;
  };

  const handleBlur = (field: ErrorField) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData) }));
  };

  const handleChange = (field: ErrorField, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error live as soon as the user fixes it
    if (touched[field] && errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        const nextData = { ...formData, [field]: value };
        const err = validateField(field, nextData);
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allErrors = validateAll(formData);
    setErrors(allErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      businessName: true,
      website: true,
    });

    if (Object.keys(allErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(
        'https://n8n.srv945929.hstgr.cloud/webhook/96daf806-3a1c-4dc3-a43a-c655bef78f13',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      setTouched({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        businessName: false,
        website: false,
      });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Thanks, {formData.firstName || 'there'}. We'll review what you've shared and be in touch within 1–2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form className={styles.container} onSubmit={submit} noValidate>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Get in touch</h3>
        <p className={styles.formDescription}>
          Share a few details and we'll get back to you within 1–2 business days.
        </p>
      </div>

      <div className={styles.fields}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              placeholder="Jane"
              className={cn(styles.input, touched.firstName && errors.firstName && styles.inputError)}
            />
            {touched.firstName && errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>Last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              placeholder="Doe"
              className={cn(styles.input, touched.lastName && errors.lastName && styles.inputError)}
            />
            {touched.lastName && errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="you@company.com"
            className={cn(styles.input, touched.email && errors.email && styles.inputError)}
          />
          {touched.email && errors.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+1 (555) 000-0000"
            className={cn(styles.input, touched.phone && errors.phone && styles.inputError)}
          />
          {touched.phone && errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="businessName" className={styles.label}>Business name</label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={formData.businessName}
            onChange={e => handleChange('businessName', e.target.value)}
            onBlur={() => handleBlur('businessName')}
            placeholder="Acme Inc."
            className={cn(styles.input, touched.businessName && errors.businessName && styles.inputError)}
          />
          {touched.businessName && errors.businessName && (
            <span className={styles.error}>{errors.businessName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="website" className={styles.label}>Website</label>
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="url"
            inputMode="url"
            value={formData.website}
            onChange={e => handleChange('website', e.target.value)}
            onBlur={() => handleBlur('website')}
            placeholder="https://example.com"
            className={cn(styles.input, touched.website && errors.website && styles.inputError)}
          />
          {touched.website && errors.website && (
            <span className={styles.error}>{errors.website}</span>
          )}
        </div>
      </div>

      {submitError && (
        <div className={styles.submitError}>{submitError}</div>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(styles.submitButton, isSubmitting && styles.submitting)}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
