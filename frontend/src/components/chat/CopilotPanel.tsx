'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

const STARTER_PROMPTS = [
  'Find experts in Agentic AI',
  'Assemble a team for LLM work',
  'What are our top capability gaps?',
];

export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'agent', content: 'Hi! I\'m the NEXUS Copilot powered by Groq. Ask me to assemble teams, find internal experts, or analyze capability gaps.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message?: string) => {
    const userMsg = (message ?? input).trim();
    if (!userMsg) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const data = await api.post<{ reply: string }>('/chat/ask', { message: userMsg });
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.reply || 'I couldn\'t process that. Please try again.'
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: 'Connection to backend failed. Please ensure the server is running.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[var(--color-sienna)] to-[var(--color-prussian)] text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={22} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-40 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sliding Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 w-96 h-screen bg-[var(--color-parchment)] border-l border-[var(--color-border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-linen)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-sienna)] to-[var(--color-prussian)] flex items-center justify-center shadow-sm">
                  <Bot size={17} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-obsidian)] text-sm">NEXUS Copilot</h3>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono text-[var(--color-forest)] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
                    Groq · Llama 3
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] hover:bg-[var(--color-stone)] transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'agent' && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--color-sienna)] to-[var(--color-prussian)] flex items-center justify-center mr-2 mt-0.5 shrink-0">
                      <Sparkles size={10} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-tr-sm'
                      : 'bg-[var(--color-linen)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--color-sienna)] to-[var(--color-prussian)] flex items-center justify-center shrink-0">
                    <Sparkles size={10} className="text-white animate-pulse" />
                  </div>
                  <div className="bg-[var(--color-linen)] border border-[var(--color-border)] p-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-bounce" style={{ animationDelay: `${i * 75}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Starter prompts — shown when only the welcome message exists */}
              {messages.length === 1 && (
                <div className="space-y-2 mt-2">
                  <p className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest px-1">Try asking…</p>
                  {STARTER_PROMPTS.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left text-xs text-[var(--color-secondary)] bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 hover:border-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-stone)] transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-linen)]">
              <div className="flex items-center gap-2 bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-2xl pl-4 pr-2 py-2 focus-within:border-[var(--color-sienna)] transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask NEXUS Copilot…"
                  className="flex-1 text-sm bg-transparent focus:outline-none text-[var(--color-primary)] placeholder:text-[var(--color-muted)]"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl bg-[var(--color-obsidian)] text-[var(--color-parchment)] flex items-center justify-center disabled:opacity-40 hover:bg-black transition-all shrink-0"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
