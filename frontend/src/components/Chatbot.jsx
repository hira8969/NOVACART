import { Bot, Send, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleChatbot } from '../features/uiSlice';

export default function Chatbot() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.chatbotOpen);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-[1.75rem] border border-white/20 bg-white shadow-2xl dark:bg-slate-950"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-cyan-500 p-4 text-white">
              <div className="flex items-center gap-3"><Bot /><div><p className="font-black">Nova Assist</p><p className="text-xs text-white/80">AI-style shopping concierge</p></div></div>
              <button onClick={() => dispatch(toggleChatbot())} aria-label="Close chat"><X /></button>
            </div>
            <div className="space-y-3 p-4 text-sm">
              <p className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-white/10 dark:text-slate-200">Tell me what vibe, budget, or category you want. I can recommend a setup instantly.</p>
              <p className="ml-auto w-fit rounded-2xl bg-indigo-600 p-3 text-white">Find me premium tech under $200.</p>
              <p className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-white/10 dark:text-slate-200">Try Orbit Keyboard or PulseFit Pro. Both are trending and ship fast.</p>
            </div>
            <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-white/10">
              <input className="min-w-0 flex-1 rounded-full bg-slate-100 px-4 py-3 text-sm outline-none dark:bg-white/10" placeholder="Ask Nova..." />
              <button className="rounded-full bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => dispatch(toggleChatbot())} aria-label="Open chat" className="focus-ring rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-4 text-white shadow-glow">
        <Bot />
      </button>
    </div>
  );
}
