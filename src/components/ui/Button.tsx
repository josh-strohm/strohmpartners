import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  onClick,
  type = 'button',
  disabled = false,
  as: Component = 'button',
  href,
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  const buttonContent = (
    <span className={cn(styles.content, disabled && styles.disabled)}>
      {children}
    </span>
  );

  if (Component === 'a' && href) {
    return (
      <Link
        to={href}
        className={cn(styles.button, styles[variant], styles[size], magnetic && styles.magnetic, className)}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={cn(styles.button, styles[variant], styles[size], magnetic && styles.magnetic, disabled && styles.disabled, className)}
      onClick={onClick}
      disabled={disabled}
      whileHover={magnetic && !reducedMotion ? { scale: 1.02 } : undefined}
      whileTap={magnetic && !reducedMotion ? { scale: 0.98 } : undefined}
    >
      {buttonContent}
    </motion.button>
  );
}