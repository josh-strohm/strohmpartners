import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './LeadCaptureDemo.module.css';

type Stage = 'form' | 'qualifying' | 'routing' | 'acknowledging' | 'done';

interface FormData {
  name: string;
  email: string;
  company: string;
}

export function LeadCaptureDemo() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', company: '' });
  const [stage, setStage] = useState<Stage>('form');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const reducedMotion = useReducedMotion();

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStage('qualifying');
    setTimeout(() => setStage('routing'), reducedMotion ? 0 : 1200);
    setTimeout(() => setStage('acknowledging'), reducedMotion ? 0 : 2400);
    setTimeout(() => setStage('done'), reducedMotion ? 0 : 3600);
  };

  const reset = () => {
    setStage('form');
    setFormData({ name: '', email: '', company: '' });
    setErrors({});
  };

  const stages = [
    { id: 'qualifying', label: 'AI Intent & Scoring', icon: '🔍' },
    { id: 'routing', label: 'Mapping Playbook', icon: '📥' },
    { id: 'acknowledging', label: 'Tailoring Roadmap', icon: '✉️' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>This is what lead capture looks like with custom AI qualification built in.</p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'form' && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.field}>
              <label htmlFor="lead-name" className={styles.label}>Name</label>
              <input
                id="lead-name"
                type="text"
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                onBlur={validate}
                className={cn(styles.input, errors.name && styles.inputError)}
                placeholder="Your name"
                aria-describedby={errors.name ? 'lead-name-error' : undefined}
              />
              {errors.name && <span id="lead-name-error" className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="lead-email" className={styles.label}>Email</label>
              <input
                id="lead-email"
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                onBlur={validate}
                className={cn(styles.input, errors.email && styles.inputError)}
                placeholder="you@company.com"
                aria-describedby={errors.email ? 'lead-email-error' : undefined}
              />
              {errors.email && <span id="lead-email-error" className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="lead-company" className={styles.label}>Company</label>
              <input
                id="lead-company"
                type="text"
                value={formData.company}
                onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                onBlur={validate}
                className={cn(styles.input, errors.company && styles.inputError)}
                placeholder="Your company"
                aria-describedby={errors.company ? 'lead-company-error' : undefined}
              />
              {errors.company && <span id="lead-company-error" className={styles.error}>{errors.company}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </motion.form>
        )}

        {stage !== 'form' && stage !== 'done' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.processing}
          >
            <div className={styles.processingSteps}>
              {stages.map((s, i) => {
                const stageIndex = stages.findIndex(x => x.id === stage);
                const isComplete = i < stageIndex;
                const isActive = i === stageIndex;
                return (
                  <motion.div
                    key={s.id}
                    className={cn(styles.processingStep, isComplete && styles.complete, isActive && styles.active)}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isComplete || isActive ? 1 : 0.3 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <span className={styles.stepIcon}>{isComplete ? '✓' : s.icon}</span>
                    <span className={styles.stepLabel}>{s.label}</span>
                    {isActive && !reducedMotion && (
                      <motion.span
                        className={styles.stepPulse}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <p className={styles.processingText}>
              {stage === 'qualifying' && 'AI agent scoring intent, company size, and budget alignment...'}
              {stage === 'routing' && 'Mapping lead challenges to custom integration playbooks...'}
              {stage === 'acknowledging' && 'Generating hyper-personalized tailored roadmap email...'}
            </p>
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className={styles.done}
          >
            <motion.div
              className={styles.doneIcon}
              initial={reducedMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: reducedMotion ? 0 : 0.2, type: 'spring', stiffness: 200 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            <h4 className={styles.doneTitle}>Lead captured</h4>
            <p className={styles.doneText}>
              {formData.name} from {formData.company} has been analyzed, scored, and mapped to a custom AI integration playbook by our system.
            </p>
            <button onClick={reset} className={styles.resetButton}>
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.note}>
        No data is sent anywhere; this is a simulation.
      </p>
    </div>
  );
}