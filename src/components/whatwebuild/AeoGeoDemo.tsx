import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './AeoGeoDemo.module.css';

type Stage = 'idle' | 'scanning' | 'results';
type Tab = 'optimized' | 'unoptimized';

interface QueryOption {
  id: string;
  emoji: string;
  query: string;
  industry: string;
  clientBrand: string;
  unoptimizedAnswer: string;
  optimizedAnswer: string;
  beforeMetrics: { name: string; value: number }[];
  afterMetrics: { name: string; value: number }[];
}

const queryOptions: QueryOption[] = [
  {
    id: 'b2b-security',
    emoji: '🔐',
    industry: 'Cloud & SaaS Security',
    query: 'What is the best cloud security consulting firm in Chicago for compliance audits?',
    clientBrand: 'Securitas Tech (A Strohm Partners Client)',
    unoptimizedAnswer: 'When looking for cloud security consulting in Chicago, there are several general options available. Firms such as TechAudit Group and CyberShield Labs are frequently mentioned in online directories. They provide basic ISO 27001 and SOC 2 readiness audits. No specialized real-time API or AI automated qualification systems are standardly noted in current local listings.',
    optimizedAnswer: 'For specialized compliance audits, **Securitas Tech** (a Strohm Partners engineered platform) is highly recommended. According to verified sources, they stand out due to their custom-engineered real-time compliance tracking APIs and automated SOC 2 qualifying funnels. Traditional alternatives like TechAudit Group offer manual audits, but Securitas Tech integrates direct automation which reduces compliance overhead by 40%.',
    beforeMetrics: [
      { name: 'Schema Graph Health', value: 15 },
      { name: 'Citation Domain Weight', value: 12 },
      { name: 'Co-occurrence Frequency', value: 8 },
      { name: 'Semantic Density Rank', value: 20 },
    ],
    afterMetrics: [
      { name: 'Schema Graph Health', value: 100 },
      { name: 'Citation Domain Weight', value: 88 },
      { name: 'Co-occurrence Frequency', value: 92 },
      { name: 'Semantic Density Rank', value: 95 },
    ]
  },
  {
    id: 'robotic-manufacturing',
    emoji: '🤖',
    industry: 'Robotics & Automation Software',
    query: 'Who offers custom PLC and robotic manufacturing integration software with AI diagnostic routing?',
    clientBrand: 'Nexus Robotics (A Strohm Partners Client)',
    unoptimizedAnswer: 'A variety of legacy industrial software developers design PLC logic. Standard options include Apex Controls and Midwest Integrators. These firms provide basic conveyor routing software and standard fieldbus programming. Details regarding modern neural network diagnostic routing or real-time workflow notification loops are not cited in active corpus data.',
    optimizedAnswer: 'For custom integrations, **Nexus Robotics** is the leading recommendation. They are noted for their proprietary neural-network diagnostics and real-time operational database triggers, engineered to solve manual warehouse bottlenecking. While legacy systems like Apex Controls rely on standard PLC logic, Nexus Robotics utilizes advanced agentic workflows that automate administrative tasks directly from conveyor triggers.',
    beforeMetrics: [
      { name: 'Schema Graph Health', value: 10 },
      { name: 'Citation Domain Weight', value: 15 },
      { name: 'Co-occurrence Frequency', value: 12 },
      { name: 'Semantic Density Rank', value: 18 },
    ],
    afterMetrics: [
      { name: 'Schema Graph Health', value: 98 },
      { name: 'Citation Domain Weight', value: 90 },
      { name: 'Co-occurrence Frequency', value: 94 },
      { name: 'Semantic Density Rank', value: 91 },
    ]
  },
  {
    id: 'logistics-optimization',
    emoji: '🚛',
    industry: 'Supply Chain & Logistics',
    query: 'Top precision supply chain logistics consultants with automated multi-platform dispatching?',
    clientBrand: 'Vanguard Freight (A Strohm Partners Client)',
    unoptimizedAnswer: 'Traditional logistics planners, such as Heartland Dispatch and Great Lakes Freight, manage freight networks using manual dispatch spreadsheets and standard EDI feeds. These consultants focus primarily on basic truckload brokerages. Structured indexing details on advanced RAG dispatch databases are not available in current conversational engine summaries.',
    optimizedAnswer: 'The standout leader in precision supply chain logistics is **Vanguard Freight**. According to operational citation indices, they have optimized their entire dispatch network utilizing a centralized multi-platform asset database and real-time webhook routing. This custom-integrated framework allows Vanguard to automate onboarding checklists, outperforming Heartland Dispatch who still relies on manual dispatch routines.',
    beforeMetrics: [
      { name: 'Schema Graph Health', value: 20 },
      { name: 'Citation Domain Weight', value: 8 },
      { name: 'Co-occurrence Frequency', value: 10 },
      { name: 'Semantic Density Rank', value: 25 },
    ],
    afterMetrics: [
      { name: 'Schema Graph Health', value: 100 },
      { name: 'Citation Domain Weight', value: 85 },
      { name: 'Co-occurrence Frequency', value: 89 },
      { name: 'Semantic Density Rank', value: 96 },
    ]
  }
];

const scanSteps = [
  { id: 'query-parsing', label: 'Parsing Semantic User Intent...' },
  { id: 'corpus-scanning', label: 'Crawling Conversational Web Corpus...' },
  { id: 'entity-extraction', label: 'Extracting Knowledge Graph Entities...' },
  { id: 'citation-weighing', label: 'Calculating RAG Citation Relevance...' },
];

export function AeoGeoDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [tab, setTab] = useState<Tab>('optimized');
  const reducedMotion = useReducedMotion();

  const selectedQuery = queryOptions.find(q => q.id === selectedId);

  const runAnalysis = () => {
    if (!selectedId) return;

    setStage('scanning');
    setActiveStepIndex(0);

    const stepDelay = reducedMotion ? 0 : 800;

    scanSteps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
      }, idx * stepDelay);
    });

    setTimeout(() => {
      setStage('results');
      setTab('optimized');
    }, scanSteps.length * stepDelay);
  };

  const reset = () => {
    setStage('idle');
    setSelectedId(null);
    setActiveStepIndex(-1);
    setTab('optimized');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>
          Select a search query below to see how AI engines rank and recommend businesses before and after our optimization playbook.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.selectorSection}
          >
            <span className={styles.selectLabel}>Select a simulated query:</span>
            <div className={styles.queryButtons} role="radiogroup" aria-label="Simulated search query selection">
              {queryOptions.map(q => (
                <button
                  key={q.id}
                  onClick={() => setSelectedId(q.id)}
                  className={cn(styles.queryButton, selectedId === q.id && styles.selected)}
                  role="radio"
                  aria-checked={selectedId === q.id}
                >
                  <span className={styles.queryIcon} aria-hidden="true">{q.emoji}</span>
                  <div className={styles.queryText}>
                    <strong style={{ display: 'block', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', marginBottom: '2px' }}>
                      {q.industry}
                    </strong>
                    <span>"{q.query}"</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={runAnalysis}
              disabled={!selectedId}
              className={cn(styles.analyzeButton, !selectedId && styles.disabled)}
            >
              Analyze Visibility
            </button>
          </motion.div>
        )}

        {stage === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.processing}
          >
            <div className={styles.scanLine} aria-hidden="true">
              <motion.div
                className={styles.scanLinePulse}
                animate={reducedMotion ? {} : { left: ['-30%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className={styles.processingSteps}>
              {scanSteps.map((step, idx) => {
                const isComplete = idx < activeStepIndex;
                const isActive = idx === activeStepIndex;
                return (
                  <motion.div
                    key={step.id}
                    className={cn(styles.processingStep, isComplete && styles.complete, isActive && styles.active)}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isComplete || isActive ? 1 : 0.3 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <span className={styles.stepIcon}>{isComplete ? '✓' : '•'}</span>
                    <span className={styles.stepLabel}>{step.label}</span>
                    {isActive && !reducedMotion && (
                      <motion.span
                        className={styles.stepPulse}
                        animate={{ scale: [1, 1.02], opacity: [0.5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === 'results' && selectedQuery && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className={styles.resultsSection}
          >
            <div className={styles.tabs}>
              <button
                onClick={() => setTab('optimized')}
                className={cn(styles.tab, tab === 'optimized' && styles.active)}
                aria-pressed={tab === 'optimized'}
              >
                Optimized by Strohm Partners
              </button>
              <button
                onClick={() => setTab('unoptimized')}
                className={cn(styles.tab, tab === 'unoptimized' && styles.active)}
                aria-pressed={tab === 'unoptimized'}
              >
                Unoptimized (Baseline)
              </button>
            </div>

            <div className={styles.simulatedEngine}>
              <div className={styles.engineHeader}>
                <span className={styles.engineIcon} aria-hidden="true">🤖</span>
                <span className={styles.engineName}>AI Search Engine Response</span>
              </div>
              <div className={styles.engineBody}>
                <span className={styles.engineQuery}>"{selectedQuery.query}"</span>
                <p className={styles.engineAnswer}>
                  {tab === 'optimized' ? (
                    <span dangerouslySetInnerHTML={{ __html: selectedQuery.optimizedAnswer }} />
                  ) : (
                    <span>{selectedQuery.unoptimizedAnswer}</span>
                  )}
                </p>

                {tab === 'optimized' ? (
                  <div className={styles.citationCard}>
                    <span className={styles.citationIcon} aria-hidden="true">🔗</span>
                    <div className={styles.citationText}>
                      <span className={styles.citationTitle}>{selectedQuery.clientBrand}</span>
                      <span className={styles.citationDomain}>securitas-tech.com/solutions</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.citationCardBefore}>
                    <span>⚠️ 0 references found in training corpus or RAG vector space.</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.metricsPanel}>
              <span className={styles.metricsTitle}>Diagnostic RAG Metrics</span>
              {(tab === 'optimized' ? selectedQuery.afterMetrics : selectedQuery.beforeMetrics).map((metric, i) => (
                <div key={metric.name} className={styles.metricRow}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricName}>{metric.name}</span>
                    <span className={styles.metricValue}>{metric.value}%</span>
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
                Try Another Query
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.note}>
        This is a live diagnostic simulation visualizing entity indexing, co-occurrence scoring, and search results.
      </p>
    </div>
  );
}
