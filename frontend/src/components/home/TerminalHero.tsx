'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootSequence = [
  "> Initializing Semantic Kernel...",
  "> Loading AutoGen memory states...",
  "> Connecting to Microsoft 365 Graph API...",
  "> Ingesting 12,042 employee capability profiles...",
  "> Linking Azure AI Search vectors...",
  "> Nexus Engine Online."
];

export function TerminalHero() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  useEffect(() => {
    if (currentLineIdx < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentLineIdx]]);
        setCurrentLineIdx(prev => prev + 1);
      }, currentLineIdx === 0 ? 500 : 800 + Math.random() * 400);
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-12 bg-black/80 backdrop-blur-md border border-[var(--color-border)] rounded-lg p-4 w-full max-w-lg text-left shadow-2xl font-mono text-xs md:text-sm text-[var(--color-forest)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-forest)] to-transparent opacity-50" />
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="space-y-1.5 h-32 flex flex-col justify-end">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {line}
          </motion.div>
        ))}
        {currentLineIdx < bootSequence.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[var(--color-forest)] inline-block ml-1 align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}
