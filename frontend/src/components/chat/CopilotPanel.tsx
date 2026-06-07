'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'agent', content: 'Hi, I am the NEXUS Copilot. You can ask me to assemble project teams or query the organizational capability map.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/chat/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'agent', 
        content: data.reply || 'Sorry, I could not process that request.' 
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'agent', 
        content: 'Error: Connection to Semantic Kernel failed.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ rotate: 15 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Sliding Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-96 h-screen bg-[var(--color-parchment)] border-l border-[var(--color-border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-linen)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-sienna-surface)] flex items-center justify-center text-[var(--color-sienna)]">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--color-obsidian)] text-sm">NEXUS Copilot</h3>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-[var(--color-forest)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] p-2">
                <X size={18} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-tr-none' 
                      : 'bg-[var(--color-linen)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-linen)] border border-[var(--color-border)] p-3 rounded-lg rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-linen)]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask NEXUS to find talent..."
                  className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[var(--color-sienna)] transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--color-secondary)] hover:text-[var(--color-sienna)] disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
