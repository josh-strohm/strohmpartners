import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { formatCurrency } from '@/utils/formatters';
import styles from './CostCalculator.module.css';

export function CostCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [hourlyCost, setHourlyCost] = useState('');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const reducedMotion = useReducedMotion();

  const h = parseFloat(hoursPerWeek) || 0;
  const r = parseFloat(hourlyCost) || 0;
  const w = parseFloat(weeksPerYear) || 52;

  const annualCost = h * r * w;

  const springValue = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, val => formatCurrency(Math.round(val)));

  useEffect(() => {
    springValue.set(annualCost);
  }, [annualCost, springValue]);

  const isValid = h > 0 && r > 0 && w > 0;

  return (
    <div className={styles.container}>
      <div className={styles.inputGrid}>
        <div className={styles.field}>
          <label htmlFor="calc-hours" className={styles.label}>Hours per week</label>
          <input
            id="calc-hours"
            type="number"
            min="0"
            step="0.5"
            value={hoursPerWeek}
            onChange={e => setHoursPerWeek(e.target.value)}
            placeholder="5"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="calc-rate" className={styles.label}>Hourly cost ($)</label>
          <input
            id="calc-rate"
            type="number"
            min="0"
            step="1"
            value={hourlyCost}
            onChange={e => setHourlyCost(e.target.value)}
            placeholder="50"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="calc-weeks" className={styles.label}>Weeks per year</label>
          <input
            id="calc-weeks"
            type="number"
            min="1"
            max="52"
            step="1"
            value={weeksPerYear}
            onChange={e => setWeeksPerYear(e.target.value)}
            placeholder="52"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.result}>
        <span className={styles.resultLabel}>Annual cost of manual work:</span>
        <motion.span className={styles.resultValue}>
          {isValid ? (reducedMotion ? formatCurrency(annualCost) : displayValue) : '$0'}
        </motion.span>
      </div>

      {isValid && annualCost > 10000 && (
        <motion.p
          className={styles.insight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          That's likely enough to fund a meaningful automation project — and reclaim those hours permanently.
        </motion.p>
      )}
    </div>
  );
}