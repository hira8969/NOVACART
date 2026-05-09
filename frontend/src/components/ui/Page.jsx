import { motion } from 'framer-motion';

export default function Page({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`min-h-screen bg-cloud text-ink dark:bg-[#050814] dark:text-white ${className}`}
    >
      {children}
    </motion.main>
  );
}
