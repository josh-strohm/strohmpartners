import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './WorkflowAutomationDemo.module.css';

type Stage = 'idle' | 'running' | 'done';

interface LogEntry {
  app: string;
  action: string;
}

const apps = [
  { id: 'hubspot', name: 'HubSpot', icon: '👤' },
  { id: 'stripe', name: 'Stripe', icon: '💳' },
  { id: 'drive', name: 'Drive', icon: '📁' },
  { id: 'slack', name: 'Slack', icon: '💬' },
  { id: 'gmail', name: 'Gmail', icon: '✉️' },
];

const logs: Record<string, LogEntry> = {
  hubspot: { app: 'HubSpot CRM', action: 'Ingested signed deal Vanguard Freight ($7,500/mo). Updated status to WON.' },
  stripe: { app: 'Stripe Invoicing', action: 'Customer profile compiled. Created Invoice INV-092 & generated checkout link.' },
  drive: { app: 'Google Drive', action: 'Created folder "/Clients/Vanguard Freight" & copied standard project assets.' },
  slack: { app: 'Slack Chat', action: 'Dispatched alert to #sales: "🎉 Vanguard Freight successfully onboarded!"' },
  gmail: { app: 'Gmail Inbox', action: 'SMTP server trigger complete. Welcoming email queued with Stripe billing link.' },
};

export function WorkflowAutomationDemo() {
  const [stage, setStage] = useState<Stage>('idle');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [completedApps, setCompletedApps] = useState<string[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<LogEntry[]>([]);
  const reducedMotion = useReducedMotion();

  const runAutomation = () => {
    setStage('running');
    setConsoleLogs([]);
    setCompletedApps([]);

    const stepDelay = reducedMotion ? 0 : 1200;

    apps.forEach((app, idx) => {
      // Step activation
      setTimeout(() => {
        setActiveApp(app.id);
        setConsoleLogs(prev => [...prev, logs[app.id]]);
      }, idx * stepDelay);

      // Step completion
      setTimeout(() => {
        setCompletedApps(prev => [...prev, app.id]);
      }, (idx + 1) * stepDelay - 100);
    });

    setTimeout(() => {
      setActiveApp(null);
      setStage('done');
    }, apps.length * stepDelay);
  };

  const reset = () => {
    setStage('idle');
    setActiveApp(null);
    setCompletedApps([]);
    setConsoleLogs([]);
  };

  const getConnectorWidth = () => {
    if (stage === 'idle') return '0%';
    if (stage === 'done') return '100%';
    const idx = apps.findIndex(a => a.id === activeApp);
    if (idx === -1) return '0%';
    return `${(idx / (apps.length - 1)) * 100}%`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>
          Trigger our simulated onboarding automation to see how data flows instantly across HubSpot, Stripe, Google Drive, Slack, and Gmail.
        </p>
      </div>

      <div className={styles.playground}>
        {/* App Pipeline Grid */}
        <div className={styles.appGrid}>
          {/* Connector Line Background */}
          <div className={styles.connectorLine} aria-hidden="true">
            <div
              className={styles.connectorLineProgress}
              style={{ width: getConnectorWidth() }}
            />
          </div>

          {apps.map(app => {
            const isActive = activeApp === app.id;
            const isComplete = completedApps.includes(app.id);
            return (
              <div
                key={app.id}
                className={cn(
                  styles.appCard,
                  isActive && styles.active,
                  isComplete && styles.complete
                )}
              >
                <span className={styles.appIcon} aria-hidden="true">{app.icon}</span>
                <span className={styles.appName}>{app.name}</span>
                {isActive && !reducedMotion && (
                  <motion.span
                    style={{
                      position: 'absolute',
                      inset: -2,
                      border: '2px solid var(--color-accent)',
                      borderRadius: 'inherit',
                      zIndex: -1,
                    }}
                    animate={{ scale: [1, 1.1], opacity: [0.5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Real-time System Console Log */}
        <div className={styles.console} role="log" aria-live="polite" aria-label="System automation console log">
          <div className={styles.consoleHeader}>
            <span className={styles.consoleTitle}>System Action Console</span>
            <span className={styles.consoleStatus}>
              {stage === 'idle' && 'READY'}
              {stage === 'running' && 'PROCESSING PIPELINE...'}
              {stage === 'done' && 'SYNCHRONIZED'}
            </span>
          </div>

          <AnimatePresence>
            {consoleLogs.length === 0 && (
              <div className={styles.consolePlaceholder}>
                Click "Trigger Onboarding" below to execute the background integration loops.
              </div>
            )}
            {consoleLogs.map((log) => (
              <motion.div
                key={log.app}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className={styles.consoleLog}
              >
                <span className={styles.consoleLogApp}>[{log.app}]</span>
                <span className={styles.consoleLogAction}>{log.action}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion Panel with ROI Math */}
        <AnimatePresence>
          {stage === 'done' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.4 }}
              className={styles.resultsPanel}
            >
              <span className={styles.resultsTitle}>🎉 Pipeline Completed Automatically</span>
              <div className={styles.resultsGrid}>
                <div className={styles.resultCard}>
                  <span className={styles.resultVal}>90 mins</span>
                  <span className={styles.resultLbl}>Manual Work Reclaimed</span>
                </div>
                <div className={styles.resultCard}>
                  <span className={styles.resultVal}>100%</span>
                  <span className={styles.resultLbl}>Human Errors Prevented</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.actions}>
        {stage === 'idle' && (
          <button
            onClick={runAutomation}
            className={styles.triggerButton}
          >
            Trigger Onboarding Automation
          </button>
        )}
        {(stage === 'done' || stage === 'running') && (
          <button
            onClick={reset}
            disabled={stage === 'running'}
            className={cn(styles.resetButton, stage === 'running' && styles.disabled)}
          >
            Reset Simulator
          </button>
        )}
      </div>

      <p className={styles.note}>
        All app interactions are secured local API calls simulating live background synchronization.
      </p>
    </div>
  );
}
