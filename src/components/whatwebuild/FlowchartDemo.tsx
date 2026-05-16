import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';
import styles from './FlowchartDemo.module.css';

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  connectedTo: string[];
}

const initialNodes: NodeData[] = [
  { id: 'new-client', label: 'New Client', x: 50, y: 15, connectedTo: [] },
  { id: 'send-contract', label: 'Send Contract', x: 50, y: 35, connectedTo: [] },
  { id: 'create-folder', label: 'Create Folder', x: 50, y: 55, connectedTo: [] },
  { id: 'notify-team', label: 'Notify Team', x: 50, y: 75, connectedTo: [] },
  { id: 'send-welcome', label: 'Send Welcome', x: 50, y: 95, connectedTo: [] },
];

type Stage = 'idle' | 'running' | 'done';

export function FlowchartDemo() {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (nodeId: string) => {
    if (stage !== 'idle') return;

    if (selectedNode === null) {
      setSelectedNode(nodeId);
      return;
    }

    if (selectedNode === nodeId) {
      setSelectedNode(null);
      return;
    }

    setNodes(prev => prev.map(n => {
      if (n.id === selectedNode) {
        const alreadyConnected = n.connectedTo.includes(nodeId);
        return {
          ...n,
          connectedTo: alreadyConnected
            ? n.connectedTo.filter(id => id !== nodeId)
            : [...n.connectedTo, nodeId],
        };
      }
      return n;
    }));
    setSelectedNode(null);
  };

  const runFlow = () => {
    const sorted = getSortedNodes();
    if (sorted.length < 2) return;

    setStage('running');
    let delay = 0;
    const stepDelay = reducedMotion ? 0 : 600;

    sorted.forEach((nodeId, i) => {
      setTimeout(() => {
        setActiveNodeId(nodeId);
      }, delay + i * stepDelay);
    });

    setTimeout(() => {
      setActiveNodeId(null);
      setStage('done');
    }, delay + sorted.length * stepDelay);
  };

  const getSortedNodes = useCallback(() => {
    if (nodes.length === 0) return [];

    const startNode = nodes.find(n => n.label === 'New Client');
    const endNode = nodes.find(n => n.label === 'Send Welcome');

    if (!startNode || !endNode) return nodes.map(n => n.id);

    const visited = new Set<string>();
    const result: string[] = [];
    let current: NodeData | null = startNode;

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      result.push(current.id);

      if (current.connectedTo.length > 0) {
        const nextNode = nodes.find(n => n.id === current!.connectedTo[0]);
        current = nextNode ?? null;
      } else {
        break;
      }
    }

    return result;
  }, [nodes]);

  const reset = () => {
    setNodes(initialNodes);
    setSelectedNode(null);
    setStage('idle');
    setActiveNodeId(null);
  };

  const isValidFlow = getSortedNodes().includes('new-client') &&
                      getSortedNodes().includes('send-welcome');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>See it work</h4>
        <p className={styles.subtitle}>Connect the nodes, then run the flow.</p>
      </div>

      <div ref={containerRef} className={styles.canvas}>
        {/* Connection lines */}
        <svg className={styles.connections}>
          {nodes.map(node =>
            node.connectedTo.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              const isActive = activeNodeId === node.id || activeNodeId === targetId;
              return (
                <motion.line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  className={cn(styles.connection, isActive && styles.active)}
                  strokeDasharray="4 2"
                  initial={false}
                  animate={isActive ? { strokeDashoffset: 20 } : {}}
                  transition={{ duration: reducedMotion ? 0 : 0.5, repeat: Infinity }}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <motion.button
            key={node.id}
            className={cn(
              styles.node,
              selectedNode === node.id && styles.selected,
              node.connectedTo.length > 0 && styles.connected,
              activeNodeId === node.id && styles.active
            )}
            style={{ '--x': `${node.x}%`, '--y': `${node.y}%` } as React.CSSProperties}
            onClick={() => handleNodeClick(node.id)}
            disabled={stage !== 'idle'}
            whileHover={stage === 'idle' ? { scale: 1.05 } : undefined}
            whileTap={stage === 'idle' ? { scale: 0.95 } : undefined}
          >
            <span className={styles.nodeLabel}>{node.label}</span>
          </motion.button>
        ))}
      </div>

      <div className={styles.instructions}>
        {stage === 'idle' && !selectedNode && (
          <p>Click a node to select it, then click another to connect them in order.</p>
        )}
        {stage === 'idle' && selectedNode && (
          <p>Now click another node to connect "{selectedNode.replace('-', ' ')}" to it.</p>
        )}
        {stage === 'running' && (
          <p>Running the workflow...</p>
        )}
        {stage === 'done' && (
          <p>Workflow complete. The system ran automatically from start to finish.</p>
        )}
      </div>

      <div className={styles.actions}>
        {stage === 'idle' && (
          <button
            onClick={runFlow}
            disabled={!isValidFlow}
            className={cn(styles.runButton, !isValidFlow && styles.disabled)}
          >
            Run Flow
          </button>
        )}
        {(stage === 'done' || stage === 'running') && (
          <button onClick={reset} className={styles.resetButton}>
            Reset
          </button>
        )}
      </div>

      <p className={styles.note}>
        This is a simplified demo — real workflows can have unlimited branching and conditions.
      </p>
    </div>
  );
}