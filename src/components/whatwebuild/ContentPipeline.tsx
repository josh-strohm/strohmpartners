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
    content: 'The most successful businesses we work with share one trait: they identify exactly where AI fits in their workflows. Strategic touchpoints, lead sorting, and data mapping are all custom-integrated. The question isn\'t whether to use AI, it\'s where it drives the highest ROI.\n\nWe help businesses audit workflows and engineer the custom systems that scale operations.',
  },
  casual: {
    platform: 'twitter',
    handle: '@strohmpartners',
    content: 'Hot take: most growing companies spend far too much time on manual friction that custom AI could resolve.\n\nRaw leads sitting in inbox backlogs. Content drafted without voice alignment. Friction bottlenecks in operations.\n\nWe audit your workflows and integrate custom AI solutions to eliminate the friction.',
  },
  technical: {
    platform: 'linkedin',
    handle: 'strohm_partners',
    content: 'Systems design matters more than tool selection.\n\nThe businesses that benefit most from AI integration are not the ones chasing flashy hype; they are the ones who have audited their workflows and mapped data paths.\n\nBefore you deploy an AI model, perform a diagnostic audit to find where it fits.',
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
        <p className={styles.subtitle}>This is what a custom-trained brand voice pipeline looks like, turning a raw topic into a strategic post.</p>
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
                placeholder="e.g., how AI integration drives operational ROI"
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
            <p className={styles.processingText}>Drafting voice-aligned content on: "{topic}"</p>
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
        No content is actually generated; this is a simulation to demonstrate the workflow shape.
      </p>
    </div>
  );
}