import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './AiChatbotDemo.module.css';

type Stage = 'idle' | 'chatting' | 'done';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'visitor';
  text: string;
}

interface Scenario {
  id: string;
  label: string;
  emoji: string;
  description: string;
  messages: ChatMessage[];
  outcome: {
    title: string;
    score: number;
    route: string;
    summary: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 'lead-qualification',
    label: 'Lead Qualification',
    emoji: '🎯',
    description: 'Website visitor inquiring about services',
    messages: [
      { id: '1', sender: 'bot', text: 'Hi there! Welcome to Strohm Partners. How can I help you today?' },
      { id: '2', sender: 'visitor', text: 'Hi, I\'m interested in automating some of our business processes.' },
      { id: '3', sender: 'bot', text: 'Great! I\'d love to help you explore that. What\'s your name and company?' },
      { id: '4', sender: 'visitor', text: 'Sarah Chen, I\'m the Operations Director at Meridian Logistics.' },
      { id: '5', sender: 'bot', text: 'Nice to meet you, Sarah! What tools are you currently using for your operations?' },
      { id: '6', sender: 'visitor', text: 'We use HubSpot, Slack, and a bunch of spreadsheets. Everything is manual.' },
      { id: '7', sender: 'bot', text: 'I understand — that\'s a common pain point. Roughly how many hours per week does your team spend on manual data entry?' },
      { id: '8', sender: 'visitor', text: 'Probably 20+ hours across the team. It\'s unsustainable.' },
      { id: '9', sender: 'bot', text: 'That\'s significant. Based on what you\'ve shared, I think our Workflow Automation service would be a perfect fit. Let me connect you with our team for a detailed consultation.' },
    ],
    outcome: {
      title: 'Lead Qualified & Routed',
      score: 92,
      route: 'Sales Team — High Priority',
      summary: 'Sarah Chen from Meridian Logistics identified as high-value prospect. 20+ hrs/week manual work, existing HubSpot stack, strong automation fit.',
    },
  },
  {
    id: 'support-faq',
    label: 'Support FAQ',
    emoji: '💬',
    description: 'Customer asking about service details',
    messages: [
      { id: '1', sender: 'bot', text: 'Hello! I\'m here to help answer any questions about our services.' },
      { id: '2', sender: 'visitor', text: 'What exactly does your AI Search Optimization service include?' },
      { id: '3', sender: 'bot', text: 'Great question! Our AEO/GEO service optimizes your brand\'s digital presence so AI search engines like ChatGPT and Perplexity recommend you first.' },
      { id: '4', sender: 'visitor', text: 'How long does it typically take to see results?' },
      { id: '5', sender: 'bot', text: 'Most clients see measurable improvements in AI citation frequency within 4-6 weeks. Full optimization typically takes 8-12 weeks depending on your current digital footprint.' },
      { id: '6', sender: 'visitor', text: 'What\'s the investment range for this service?' },
      { id: '7', sender: 'bot', text: 'Pricing varies based on scope and industry. I\'d recommend booking a consultation to get a custom quote tailored to your specific needs. Would you like me to schedule that for you?' },
      { id: '8', sender: 'visitor', text: 'Yes, that would be helpful.' },
      { id: '9', sender: 'bot', text: 'Perfect! I\'ll route you to our scheduling system. One of our AEO specialists will reach out within 24 hours to confirm your consultation.' },
    ],
    outcome: {
      title: 'Inquiry Resolved & Booked',
      score: 78,
      route: 'AEO Specialist — Consultation Scheduled',
      summary: 'Visitor converted to consultation booking. High intent signals: asked about timeline, pricing, and requested scheduling.',
    },
  },
  {
    id: 'appointment-booking',
    label: 'Appointment Booking',
    emoji: '📅',
    description: 'Prospect scheduling a strategy call',
    messages: [
      { id: '1', sender: 'bot', text: 'Welcome! I can help you book a strategy call with our team. What brings you here today?' },
      { id: '2', sender: 'visitor', text: 'We need help building an AI chatbot for our customer service.' },
      { id: '3', sender: 'bot', text: 'Excellent — that\'s right in our wheelhouse. What industry are you in?' },
      { id: '4', sender: 'visitor', text: 'We\'re a mid-size e-commerce company doing about $5M in annual revenue.' },
      { id: '5', sender: 'bot', text: 'Perfect. How many customer support inquiries do you handle per month?' },
      { id: '6', sender: 'visitor', text: 'Around 3,000 tickets. Our team of 5 is overwhelmed.' },
      { id: '7', sender: 'bot', text: 'That volume is ideal for AI automation. We typically see 60-70% deflection rates for e-commerce support. I have availability this Thursday at 2pm or Friday at 10am — which works better?' },
      { id: '8', sender: 'visitor', text: 'Thursday at 2pm works great.' },
      { id: '9', sender: 'bot', text: 'You\'re all set! I\'ve booked you for Thursday at 2pm with our AI Chatbot specialist. You\'ll receive a confirmation email shortly with a pre-call questionnaire.' },
    ],
    outcome: {
      title: 'Appointment Booked',
      score: 95,
      route: 'AI Chatbot Specialist — Thursday 2pm',
      summary: 'E-commerce company ($5M revenue, 3K tickets/mo) booked for AI chatbot consultation. High-value prospect with clear automation ROI.',
    },
  },
];

export function AiChatbotDemo() {
  const [stage, setStage] = useState<Stage>('idle');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const selectedScenario = scenarios.find(s => s.id === selectedId);

  useEffect(() => {
    const container = chatMessagesRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      userScrolledRef.current = scrollHeight - scrollTop - clientHeight > 50;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (userScrolledRef.current) return;

    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [visibleMessages, isTyping, reducedMotion]);

  useEffect(() => {
    if (stage !== 'chatting' || !selectedScenario) return;

    if (messageIndex >= selectedScenario.messages.length) {
      setTimeout(() => {
        setIsTyping(false);
        setStage('done');
      }, reducedMotion ? 0 : 800);
      return;
    }

    const currentMsg = selectedScenario.messages[messageIndex];
    const typingDelay = reducedMotion ? 0 : currentMsg.sender === 'bot' ? 1000 : 600;

    setIsTyping(true);

    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, currentMsg]);
      setMessageIndex(prev => prev + 1);
    }, typingDelay);

    return () => clearTimeout(typingTimer);
  }, [stage, messageIndex, selectedScenario, reducedMotion]);

  const startChat = () => {
    if (!selectedId) return;
    setStage('chatting');
    setVisibleMessages([]);
    setMessageIndex(0);
    setIsTyping(false);
    userScrolledRef.current = false;
  };

  const reset = () => {
    setStage('idle');
    setSelectedId(null);
    setVisibleMessages([]);
    setMessageIndex(0);
    setIsTyping(false);
    userScrolledRef.current = false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>
          Select a scenario to watch our AI chatbot qualify leads, answer questions, and book appointments in real time.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.selectorSection}
          >
            <span className={styles.selectLabel}>Select a chat scenario:</span>
            <div className={styles.scenarioButtons} role="radiogroup" aria-label="Chat scenario selection">
              {scenarios.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={cn(styles.scenarioButton, selectedId === s.id && styles.selected)}
                  role="radio"
                  aria-checked={selectedId === s.id}
                >
                  <span className={styles.scenarioEmoji} aria-hidden="true">{s.emoji}</span>
                  <div className={styles.scenarioText}>
                    <strong>{s.label}</strong>
                    <span>{s.description}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={startChat}
              disabled={!selectedId}
              className={cn(styles.startButton, !selectedId && styles.disabled)}
            >
              Start Conversation
            </button>
          </motion.div>
        )}

        {(stage === 'chatting' || stage === 'done') && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.chatSection}
          >
            <div className={styles.chatWindow}>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderBot}>
                  <span className={styles.chatAvatar} aria-hidden="true">🤖</span>
                  <div>
                    <span className={styles.chatBotName}>AI Assistant</span>
                    <span className={styles.chatBotStatus}>Online</span>
                  </div>
                </div>
              </div>

              <div ref={chatMessagesRef} className={styles.chatMessages}>
                <AnimatePresence>
                  {visibleMessages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                      className={cn(
                        styles.messageRow,
                        msg.sender === 'bot' ? styles.messageRowBot : styles.messageRowVisitor
                      )}
                    >
                      <div
                        className={cn(
                          styles.messageBubble,
                          msg.sender === 'bot' ? styles.messageBubbleBot : styles.messageBubbleVisitor
                        )}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(styles.messageRow, styles.messageRowBot)}
                  >
                    <div className={cn(styles.messageBubble, styles.messageBubbleBot, styles.typingBubble)}>
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {stage === 'done' && selectedScenario && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}
                className={styles.outcomePanel}
              >
                <span className={styles.outcomeTitle}>{selectedScenario.outcome.title}</span>
                <div className={styles.outcomeMetrics}>
                  <div className={styles.outcomeMetric}>
                    <span className={styles.outcomeMetricLabel}>Lead Score</span>
                    <span className={styles.outcomeMetricValue}>{selectedScenario.outcome.score}/100</span>
                  </div>
                  <div className={styles.outcomeMetric}>
                    <span className={styles.outcomeMetricLabel}>Routed To</span>
                    <span className={styles.outcomeMetricValue}>{selectedScenario.outcome.route}</span>
                  </div>
                </div>
                <p className={styles.outcomeSummary}>{selectedScenario.outcome.summary}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.actions}>
        {stage === 'done' && (
          <button onClick={reset} className={styles.resetButton}>
            Try Another Scenario
          </button>
        )}
      </div>

      <p className={styles.note}>
        No data is sent anywhere; this is a simulated chatbot conversation.
      </p>
    </div>
  );
}
