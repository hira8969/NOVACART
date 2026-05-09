import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Button({ children, className, variant = 'primary', as: Component = motion.button, ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 text-white shadow-glow hover:brightness-110',
    secondary: 'glass text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/10',
    ghost: 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10'
  };

  return (
    <Component
      whileTap={{ scale: 0.97 }}
      className={clsx('focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition', variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
