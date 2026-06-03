import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './AiVoiceAgentDemo.module.css';

type Stage = 'idle' | 'ringing' | 'call' | 'done';

interface CallMessage {
  id: string;
  speaker: 'agent' | 'caller';
  text: string;
}

interface CallScenario {
  id: string;
  label: string;
  emoji: string;
  description: string;
  callerName: string;
  callerNumber: string;
  messages: CallMessage[];
  outcome: {
    title: string;
    duration: string;
    action: string;
    summary: string;
  };
}

const callScenarios: CallScenario[] = [
  {
    id: 'inbound-scheduling',
    label: 'Inbound Scheduling',
    emoji: '📞',
    description: 'Caller booking a consultation appointment',
    callerName: 'Marcus Rivera',
    callerNumber: '(312) 555-0147',
    messages: [
      { id: '1', speaker: 'agent', text: 'Thank you for calling Strohm Partners. This is your AI assistant. How can I help you today?' },
      { id: '2', speaker: 'caller', text: 'Hi, I\'d like to schedule a consultation about automating our client onboarding process.' },
      { id: '3', speaker: 'agent', text: 'I\'d be happy to help you book that. May I have your name and company?' },
      { id: '4', speaker: 'caller', text: 'Marcus Rivera. I run Rivera Consulting — we do financial advisory for small businesses.' },
      { id: '5', speaker: 'agent', text: 'Great, Marcus. And how many clients do you currently onboard per month?' },
      { id: '6', speaker: 'caller', text: 'About 15 to 20 new clients. The paperwork and setup takes forever.' },
      { id: '7', speaker: 'agent', text: 'That sounds like a strong fit for our workflow automation. I have availability this Wednesday at 10am or Thursday at 2pm with our automation specialist.' },
      { id: '8', speaker: 'caller', text: 'Thursday at 2pm works perfectly.' },
      { id: '9', speaker: 'agent', text: 'You\'re confirmed for Thursday at 2pm. I\'m sending a confirmation text to this number with a brief pre-call questionnaire. Is there anything else I can help with?' },
      { id: '10', speaker: 'caller', text: 'No, that\'s everything. Thanks!' },
      { id: '11', speaker: 'agent', text: 'You\'re welcome, Marcus. Have a great day. Goodbye.' },
    ],
    outcome: {
      title: 'Appointment Booked',
      duration: '1m 42s',
      action: 'Thursday 2pm — Automation Specialist',
      summary: 'Marcus Rivera (Rivera Consulting) booked for workflow automation consultation. 15-20 clients/mo onboarding volume, strong fit confirmed.',
    },
  },
  {
    id: 'after-hours-lead',
    label: 'After-Hours Lead Capture',
    emoji: '🌙',
    description: 'Late-night caller captured as qualified lead',
    callerName: 'Jennifer Walsh',
    callerNumber: '(617) 555-0293',
    messages: [
      { id: '1', speaker: 'agent', text: 'Thank you for calling Strohm Partners. Our office is currently closed, but I\'m here to help. What can I do for you?' },
      { id: '2', speaker: 'caller', text: 'Oh, I didn\'t realize it was after hours. I was hoping to talk to someone about AI chatbots for our e-commerce site.' },
      { id: '3', speaker: 'agent', text: 'No problem at all — I can absolutely help with that. I\'ll make sure our team follows up first thing tomorrow. What\'s your name?' },
      { id: '4', speaker: 'caller', text: 'Jennifer Walsh. I\'m the VP of Digital at NorthPeak Retail.' },
      { id: '5', speaker: 'agent', text: 'Nice to meet you, Jennifer. What kind of volume are you handling on your site right now?' },
      { id: '6', speaker: 'caller', text: 'We get about 2,000 support chats a month. Most are order status and return questions.' },
      { id: '7', speaker: 'agent', text: 'That\'s a great use case. Our AI chatbots typically handle 60 to 70 percent of those inquiries automatically. What\'s your annual revenue range?' },
      { id: '8', speaker: 'caller', text: 'We\'re doing about $12 million a year online.' },
      { id: '9', speaker: 'agent', text: 'Excellent. I\'ve captured all the key details. Our AI chatbot specialist will call you tomorrow morning at this number. Would 9am work?' },
      { id: '10', speaker: 'caller', text: '9am is perfect. Thank you so much.' },
      { id: '11', speaker: 'agent', text: 'You\'re welcome, Jennifer. We\'ll be in touch tomorrow. Have a great evening.' },
    ],
    outcome: {
      title: 'Lead Captured After Hours',
      duration: '2m 08s',
      action: 'Callback Scheduled — 9am Next Day',
      summary: 'Jennifer Walsh (NorthPeak Retail, $12M revenue) captured as high-value lead. 2K chats/mo, 9am callback confirmed with AI chatbot specialist.',
    },
  },
  {
    id: 'call-routing',
    label: 'Call Routing & Qualification',
    emoji: '🔀',
    description: 'Inbound call intelligently routed to the right team',
    callerName: 'David Park',
    callerNumber: '(415) 555-0182',
    messages: [
      { id: '1', speaker: 'agent', text: 'Thank you for calling Strohm Partners. How can I direct your call today?' },
      { id: '2', speaker: 'caller', text: 'Hi, I\'m not sure who I need to talk to. We have a few different needs — our website isn\'t generating leads and our content is all over the place.' },
      { id: '3', speaker: 'agent', text: 'I can help figure out the best path. Let me ask a couple of quick questions. What\'s your name and company?' },
      { id: '4', speaker: 'caller', text: 'David Park. I\'m the CEO of TechBridge Solutions.' },
      { id: '5', speaker: 'agent', text: 'Great, David. When you say your website isn\'t generating leads — are you getting traffic but no conversions, or is traffic also low?' },
      { id: '6', speaker: 'caller', text: 'We get traffic, but nobody fills out our forms. We\'re losing people somewhere.' },
      { id: '7', speaker: 'agent', text: 'That points to our Intelligent Websites service. And for the content issue — is it more about consistency or quality?' },
      { id: '8', speaker: 'caller', text: 'Both, honestly. We post sporadically and it never sounds like us.' },
      { id: '9', speaker: 'agent', text: 'Based on what you\'ve described, I recommend starting with a comprehensive strategy call that covers both your lead funnel and content systems. I\'m connecting you with our senior strategist who handles multi-service engagements. Please hold for just a moment.' },
      { id: '10', speaker: 'caller', text: 'Sounds perfect, thank you.' },
      { id: '11', speaker: 'agent', text: 'Connecting you now. Thanks for calling, David.' },
    ],
    outcome: {
      title: 'Call Qualified & Routed',
      duration: '1m 55s',
      action: 'Transferred — Senior Strategist (Multi-Service)',
      summary: 'David Park (TechBridge Solutions) qualified for dual engagement: lead funnel optimization + content systems. Routed to senior strategist.',
    },
  },
];

export function AiVoiceAgentDemo() {
  const [stage, setStage] = useState<Stage>('idle');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<CallMessage[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const reducedMotion = useReducedMotion();

  const selectedScenario = callScenarios.find(s => s.id === selectedId);

  useEffect(() => {
    if (stage !== 'call' && stage !== 'ringing') return;
    const interval = setInterval(() => {
      setCallTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'call' || !selectedScenario) return;

    if (messageIndex >= selectedScenario.messages.length) {
      setTimeout(() => {
        setIsSpeaking(false);
        setStage('done');
      }, reducedMotion ? 0 : 800);
      return;
    }

    const currentMsg = selectedScenario.messages[messageIndex];
    const speakDelay = reducedMotion ? 0 : currentMsg.speaker === 'agent' ? 1600 : 1200;

    setIsSpeaking(true);

    const timer = setTimeout(() => {
      setIsSpeaking(false);
      setVisibleMessages(prev => [...prev, currentMsg]);
      setMessageIndex(prev => prev + 1);
    }, speakDelay);

    return () => clearTimeout(timer);
  }, [stage, messageIndex, selectedScenario, reducedMotion]);

  const startCall = () => {
    if (!selectedId) return;
    setStage('ringing');
    setVisibleMessages([]);
    setMessageIndex(0);
    setCallTimer(0);
    setIsSpeaking(false);

    setTimeout(() => {
      setStage('call');
    }, reducedMotion ? 0 : 1500);
  };

  const reset = () => {
    setStage('idle');
    setSelectedId(null);
    setVisibleMessages([]);
    setMessageIndex(0);
    setCallTimer(0);
    setIsSpeaking(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>
          Select a scenario to hear how our AI voice agent handles inbound calls, captures leads, and routes conversations.
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
            <span className={styles.selectLabel}>Select a call scenario:</span>
            <div className={styles.scenarioButtons} role="radiogroup" aria-label="Call scenario selection">
              {callScenarios.map(s => (
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
              onClick={startCall}
              disabled={!selectedId}
              className={cn(styles.callButton, !selectedId && styles.disabled)}
            >
              Simulate Inbound Call
            </button>
          </motion.div>
        )}

        {stage === 'ringing' && selectedScenario && (
          <motion.div
            key="ringing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.callSection}
          >
            <div className={styles.phoneInterface}>
              <div className={styles.phoneHeader}>
                <span className={styles.phoneStatus}>Incoming Call</span>
                <span className={styles.phoneTimer}>{formatTime(callTimer)}</span>
              </div>
              <div className={styles.callerInfo}>
                <div className={styles.callerAvatar} aria-hidden="true">
                  {selectedScenario.callerName.split(' ').map(n => n[0]).join('')}
                </div>
                <span className={styles.callerName}>{selectedScenario.callerName}</span>
                <span className={styles.callerNumber}>{selectedScenario.callerNumber}</span>
              </div>
              <div className={styles.waveform} aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.waveformBar}
                    animate={reducedMotion ? { height: 8 } : {
                      height: [8, Math.random() * 28 + 8, 8],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
              <span className={styles.ringingText}>Connecting...</span>
            </div>
          </motion.div>
        )}

        {(stage === 'call' || stage === 'done') && selectedScenario && (
          <motion.div
            key="call"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.callSection}
          >
            <div className={styles.phoneInterface}>
              <div className={styles.phoneHeader}>
                <div className={styles.phoneHeaderLeft}>
                  <span className={styles.callActiveDot} aria-hidden="true" />
                  <span className={styles.phoneStatus}>
                    {stage === 'call' ? 'Call In Progress' : 'Call Complete'}
                  </span>
                </div>
                <span className={styles.phoneTimer}>{formatTime(callTimer)}</span>
              </div>

              <div className={styles.callerInfoCompact}>
                <div className={styles.callerAvatarSmall} aria-hidden="true">
                  {selectedScenario.callerName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className={styles.callerNameSmall}>{selectedScenario.callerName}</span>
                  <span className={styles.callerNumberSmall}>{selectedScenario.callerNumber}</span>
                </div>
              </div>

              {stage === 'call' && (
                <div className={styles.waveformSmall} aria-hidden="true">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn(styles.waveformBarSmall, isSpeaking && styles.waveformBarActive)}
                      animate={reducedMotion ? { height: 4 } : isSpeaking ? {
                        height: [4, Math.random() * 16 + 4, 4],
                      } : { height: 4 }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        delay: i * 0.04,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              )}

              <div className={styles.transcript}>
                <AnimatePresence>
                  {visibleMessages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                      className={cn(
                        styles.transcriptRow,
                        msg.speaker === 'agent' ? styles.transcriptRowAgent : styles.transcriptRowCaller
                      )}
                    >
                      <span className={styles.transcriptSpeaker}>
                        {msg.speaker === 'agent' ? 'AI Agent' : selectedScenario.callerName.split(' ')[0]}
                      </span>
                      <span className={styles.transcriptText}>{msg.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isSpeaking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.transcriptRow}
                  >
                    <span className={styles.transcriptSpeaker}>
                      {selectedScenario.messages[messageIndex]?.speaker === 'agent' ? 'AI Agent' : selectedScenario.callerName.split(' ')[0]}
                    </span>
                    <span className={styles.transcriptSpeaking}>speaking...</span>
                  </motion.div>
                )}
              </div>
            </div>

            {stage === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}
                className={styles.outcomePanel}
              >
                <span className={styles.outcomeTitle}>{selectedScenario.outcome.title}</span>
                <div className={styles.outcomeMetrics}>
                  <div className={styles.outcomeMetric}>
                    <span className={styles.outcomeMetricLabel}>Call Duration</span>
                    <span className={styles.outcomeMetricValue}>{selectedScenario.outcome.duration}</span>
                  </div>
                  <div className={styles.outcomeMetric}>
                    <span className={styles.outcomeMetricLabel}>Action Taken</span>
                    <span className={styles.outcomeMetricValue}>{selectedScenario.outcome.action}</span>
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
        No calls are placed; this is a simulated voice agent conversation.
      </p>
    </div>
  );
}
