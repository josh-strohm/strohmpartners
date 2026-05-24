import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './ContentVoiceDemo.module.css';

type Stage = 'idle' | 'processing' | 'results';

interface ConceptOption {
  id: string;
  label: string;
  rawInput: string;
  authorityOutput: string;
  technicalOutput: string;
  casualOutput: string;
}

const concepts: ConceptOption[] = [
  {
    id: 'ai-opportunity',
    label: 'AI Strategy Thoughts',
    rawInput: 'had a thought about AI in business... people focus too much on cheap software tools. actually it\'s about custom systems. build custom integrations rather than cheap templates. need to write about this.',
    authorityOutput: 'Cheap AI templates are an operational trap. The true value of AI isn\'t in deploying a flashy off-the-shelf chatbot; it\'s in engineering custom, secure systems that permanently eliminate backend friction.\n\nStop chasing templates. Invest in custom architecture that you own. That is where operational leverage lives.',
    technicalOutput: 'Systems design matters more than tool selection.\n\nDeploying isolated SaaS wrapper scripts results in brittle API configurations and disjointed data records. The high-ROI path requires mapping your local data workflows, building robust webhooks, and establishing dedicated custom integrations. Build systems, not templates.',
    casualOutput: 'Hot take: most businesses are using AI completely wrong. They buy a bunch of pre-made templates and wonder why they\'re still stuck copy-pasting data all day.\n\nThe real win? Building simple, custom connections that link your tools together in the background. It\'s not fancy, but it actually works.'
  },
  {
    id: 'voice-scaling',
    label: 'Scaling Brand Content',
    rawInput: 'why is scaling content so hard... experts don\'t have time. need a way to take 5 mins of voice memo and make 10 good posts. brand voice must sound like them, not generic ChatGPT.',
    authorityOutput: 'Subject matter experts shouldn\'t spend hours formatting social posts and newsletters. Their value is in their unique insights, not in copywriting.\n\nWe build content pipelines that translate five minutes of expert raw voice inputs into structured campaigns. Scale your output while protecting your voice.',
    technicalOutput: 'Expert knowledge is a company\'s highest-leverage asset. However, manual content distribution processes suffer from severe operational friction.\n\nOur scaling systems parse raw transcript vectors, match authentic tone parameters, and format publication-ready assets for multiple APIs, keeping editors in full control.',
    casualOutput: 'Writing content is exhausting, and your experts are too busy actually running your business to write blog posts all day.\n\nImagine recording a quick 5-minute voice memo on your phone, and a system automatically drafts all your weekly newsletters and posts in your exact voice. No robotic AI fluff, just pure you.'
  },
  {
    id: 'operational-sanity',
    label: 'Value of Automation',
    rawInput: 'automation isn\'t just about saving money. it\'s about sanity. not having to copy paste invoices or manually email clients means team focuses on real work.',
    authorityOutput: 'Automation isn\'t merely a cost-reduction strategy—it is a sanity preservation strategy.\n\nWhen your team is freed from copying invoices, sending calendar invites, and manually sorting attachments, they focus entirely on core business outcomes. Reclaim your focus.',
    technicalOutput: 'Manual spreadsheet transfer and invoice matching are high-latency procedures prone to data loss.\n\nBy establishing automated database triggers and clean multi-platform webhook synchronizations, we drive administrative latency to zero and maximize operational focus.',
    casualOutput: 'Yes, automation saves your business money. But honestly? The best part is the sheer peace of mind.\n\nNot having to worry about manual checklists, invoice typing, or sending identical welcome emails means your team can finally focus on work they actually enjoy.'
  }
];

const transformSteps = [
  { id: 'ingest', label: 'Analyzing Raw Semantic Core Concepts...' },
  { id: 'voice-mapping', label: 'Matching Tone Parameters to Style Profiles...' },
  { id: 'draft-generation', label: 'Refining Sentence Cadence & Hook Mechanics...' },
  { id: 'human-review', label: 'Finalizing Editor Approval Ready Draft...' },
];

export function ContentVoiceDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [voiceProfile, setVoiceProfile] = useState<'authority' | 'technical' | 'casual'>('authority');
  const [stage, setStage] = useState<Stage>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const reducedMotion = useReducedMotion();

  const selectedConcept = concepts.find(c => c.id === selectedId);

  const handleTransform = () => {
    if (!selectedId) return;

    setStage('processing');
    setActiveStepIndex(0);

    const stepDelay = reducedMotion ? 0 : 800;

    transformSteps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
      }, idx * stepDelay);
    });

    setTimeout(() => {
      setStage('results');
    }, transformSteps.length * stepDelay);
  };

  const reset = () => {
    setStage('idle');
    setSelectedId(null);
    setActiveStepIndex(-1);
  };

  const getOutputText = () => {
    if (!selectedConcept) return '';
    if (voiceProfile === 'authority') return selectedConcept.authorityOutput;
    if (voiceProfile === 'technical') return selectedConcept.technicalOutput;
    return selectedConcept.casualOutput;
  };

  const getVoiceLabel = () => {
    if (voiceProfile === 'authority') return 'Authority Founder';
    if (voiceProfile === 'technical') return 'Technical Builder';
    return 'Casual Connector';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>
          Select a messy, raw business concept, choose an authentic voice profile, and watch our content pipeline transform it on-brand.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.playground}
          >
            <div>
              <span className={styles.label}>1. Select raw ideas / voice notes:</span>
              <div className={styles.draftSelector} role="radiogroup" aria-label="Raw draft ideas selection">
                {concepts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={cn(styles.draftButton, selectedId === c.id && styles.selected)}
                    role="radio"
                    aria-checked={selectedId === c.id}
                  >
                    <strong style={{ display: 'block', fontSize: '0.75rem', marginBottom: '2px', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                      {c.label}
                    </strong>
                    <span>"{c.rawInput.slice(0, 100)}..."</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={styles.label}>2. Choose your brand voice profile:</span>
              <div className={styles.voiceSelector} role="radiogroup" aria-label="Brand voice profile selection">
                {(['authority', 'technical', 'casual'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVoiceProfile(v)}
                    className={cn(styles.voiceButton, voiceProfile === v && styles.selected)}
                    role="radio"
                    aria-checked={voiceProfile === v}
                  >
                    <span>
                      {v === 'authority' && '💼 Authority'}
                      {v === 'technical' && '⚙️ Technical'}
                      {v === 'casual' && '👋 Casual'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTransform}
              disabled={!selectedId}
              className={cn(styles.transformButton, !selectedId && styles.disabled)}
            >
              Transform Concept
            </button>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.processing}
          >
            <div className={styles.pulseIndicator} aria-hidden="true">
              <motion.span
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                🎙️
              </motion.span>
            </div>
            <div className={styles.progressSteps}>
              {transformSteps.map((step, idx) => {
                const isComplete = idx < activeStepIndex;
                const isActive = idx === activeStepIndex;
                return (
                  <motion.div
                    key={step.id}
                    className={cn(styles.progressStep, isComplete && styles.complete, isActive && styles.active)}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isComplete || isActive ? 1 : 0.3 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <span className={styles.stepIcon}>{isComplete ? '✓' : '•'}</span>
                    <span className={styles.stepLabel}>{step.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === 'results' && selectedConcept && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className={styles.results}
          >
            <div className={styles.comparisonGrid}>
              <div className={styles.comparePanel}>
                <span className={styles.comparePanelTitle}>Raw Concept Input</span>
                <p className={styles.compareContent}>"{selectedConcept.rawInput}"</p>
              </div>

              <div className={cn(styles.comparePanel, styles.comparePanelOptimized)}>
                <div className={styles.postHeader}>
                  <div className={styles.postAvatar} aria-hidden="true">SP</div>
                  <div className={styles.postUser}>
                    <span className={styles.postName}>Strohm Partners Engine</span>
                    <span className={styles.postHandle}>Profile: {getVoiceLabel()}</span>
                  </div>
                </div>
                <p className={styles.compareContent} style={{ whiteSpace: 'pre-wrap' }}>
                  {getOutputText()}
                </p>
              </div>
            </div>

            <div className={styles.metricsPanel}>
              <span className={styles.metricsTitle}>Voice Authenticity Metrics</span>
              {[
                { name: 'Authentic Tone Correlation', value: 98 },
                { name: 'Semantic Density hook', value: 94 },
                { name: 'Multi-platform Adaptation Score', value: 96 }
              ].map((metric, i) => (
                <div key={metric.name} className={styles.metricRow}>
                  <div className={styles.metricHeader}>
                    <span style={{ color: 'var(--color-text)', fontSize: '0.75rem', fontWeight: 600 }}>{metric.name}</span>
                    <span style={{ color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: 600 }}>{metric.value}%</span>
                  </div>
                  <div className={styles.metricBarContainer}>
                    <motion.div
                      className={styles.metricBar}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: reducedMotion ? 0 : 0.6, delay: i * 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button onClick={reset} className={styles.resetButton}>
                Try Another Concept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.note}>
        No data is sent; this is a local simulated diagnostic showing voice transformation logic.
      </p>
    </div>
  );
}
