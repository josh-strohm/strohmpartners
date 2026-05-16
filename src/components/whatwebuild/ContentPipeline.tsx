import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './ContentPipeline.module.css';

type Stage = 'idle' | 'researching' | 'drafting' | 'formatting' | 'scheduling' | 'publishing' | 'done';

interface Output {
  platform: 'linkedin' | 'twitter';
  content: string;
  handle: string;
}

const voices = [
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'casual', label: 'Casual', emoji: '👋' },
  { id: 'technical', label: 'Technical', emoji: '⚙️' },
];

const cannedOutputs: Record<string, Output> = {
  professional: {
    platform: 'linkedin',
    handle: 'strohm_partners',
    content: 'The most successful businesses we work with share one trait: their systems run while they sleep. Lead capture, content publishing, task routing — all automatic. The question isn\'t whether to automate, it\'s where to start.\n\nWe help businesses build the systems that scale without proportionally scaling headcount.',
  },
  casual: {
    platform: 'twitter',
    handle: '@strohmpartners',
    content: 'Hot take: most small businesses are spending way too much time on work that should be automatic.\n\nLeads sitting in forms. Content nobody sees. Tasks that nobody remembers.\n\nWe fix that. One system at a time.',
  },
  technical: {
    platform: 'linkedin',
    handle: 'strohm_partners',
    content: 'Systems design matters more than tool selection.\n\nThe businesses that benefit most from automation aren\'t the ones using the most tools — they\'re the ones who\'ve mapped their workflows correctly.\n\nBefore you add another automation, map what you have. You might find you need less than you think.',
  },
};

const stages: { id: Stage; label: string }[] = [
  { id: 'researching', label: 'Researching' },
  { id: 'drafting', label: 'Drafting' },
  { id: 'formatting', label: 'Formatting' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'publishing', label: 'Publishing' },
];

export function ContentPipeline() {
  const [topic, setTopic] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('professional');
  const [stage, setStage] = useState<Stage>('idle');
  const [output, setOutput] = useState<Output | null>(null);
  const reducedMotion = useReducedMotion();

  const runPipeline = () => {
    if (!topic.trim()) return;

    let delay = 0;
    const stageDelay = reducedMotion ? 0 : 800;

    stages.forEach((s, i) => {
      setTimeout(() => setStage(s.id), delay + i * stageDelay);
    });

    setTimeout(() => {
      setOutput(cannedOutputs[selectedVoice]);
      setStage('done');
    }, delay + stages.length * stageDelay);
  };

  const reset = () => {
    setStage('idle');
    setOutput(null);
    setTopic('');
  };

  const getCurrentStageIndex = () => stages.findIndex(s => s.id === stage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>This is what content automation looks like — topic in, published post out.</p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.inputSection}
          >
            <div className={styles.field}>
              <label htmlFor="topic-input" className={styles.label}>Topic</label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g., why small businesses should automate"
                className={styles.input}
              />
            </div>

            <div className={styles.voiceSection}>
              <span className={styles.voiceLabel}>Brand voice:</span>
              <div className={styles.voiceOptions}>
                {voices.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVoice(v.id)}
                    className={cn(styles.voiceButton, selectedVoice === v.id && styles.selected)}
                    aria-pressed={selectedVoice === v.id}
                  >
                    <span className={styles.voiceEmoji}>{v.emoji}</span>
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runPipeline}
              disabled={!topic.trim()}
              className={cn(styles.generateButton, !topic.trim() && styles.disabled)}
            >
              Generate
            </button>
          </motion.div>
        )}

        {(stage !== 'idle' && stage !== 'done') && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.processing}
          >
            <div className={styles.progressBar}>
              {stages.map((s, i) => {
                const currentIndex = getCurrentStageIndex();
                const isComplete = i < currentIndex;
                const isActive = i === currentIndex;
                return (
                  <motion.div
                    key={s.id}
                    className={cn(styles.progressStep, isComplete && styles.complete, isActive && styles.active)}
                    initial={false}
                    animate={{
                      backgroundColor: isComplete || isActive ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                      opacity: isComplete || isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <span className={styles.stepNumber}>{i + 1}</span>
                  </motion.div>
                );
              })}
            </div>
            <p className={styles.processingLabel}>
              {stages[getCurrentStageIndex()]?.label}...
            </p>
            <p className={styles.processingText}>Building content on: "{topic}"</p>
          </motion.div>
        )}

        {stage === 'done' && output && (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className={styles.output}
          >
            <div className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="16" fill="var(--color-accent)" />
                    <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="white" fontFamily="Georgia, serif" fontSize="12" fontWeight="600">SP</text>
                  </svg>
                </div>
                <div className={styles.postMeta}>
                  <span className={styles.handle}>@{output.handle}</span>
                  <span className={styles.platform}>
                    {output.platform === 'linkedin' ? 'LinkedIn' : 'Twitter'}
                  </span>
                </div>
              </div>
              <p className={styles.postContent}>{output.content}</p>
              <div className={styles.postFooter}>
                <span className={styles.timestamp}>Scheduled for optimal engagement time</span>
              </div>
            </div>
            <button onClick={reset} className={styles.resetButton}>
              Try another topic
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.note}>
        No content is actually generated — this demonstrates the workflow shape.
      </p>
    </div>
  );
}