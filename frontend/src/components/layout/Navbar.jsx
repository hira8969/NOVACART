import { Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleTheme } from '../../features/uiSlice';

const links = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Wishlist', '/wishlist'],
  ['Orders', '/orders'],
  ['Admin', '/admin']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.ui.theme);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const navClass = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10'}`;

  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-cyan-400 font-black text-white shadow-glow">N</span>
          <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">NovaCart</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => <NavLink key={href} to={href} className={navClass}>{label}</NavLink>)}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center rounded-full bg-slate-100 px-3 py-2 dark:bg-white/10">
            <Search size={17} className="text-slate-400" />
            <input className="w-40 bg-transparent px-2 text-sm outline-none placeholder:text-slate-400" placeholder="Search drops" />
          </div>
          <button onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme" className="focus-ring rounded-full bg-slate-100 p-3 dark:bg-white/10">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <Link to="/profile" className="focus-ring rounded-full bg-slate-100 p-3 dark:bg-white/10"><User size={18} /></Link>
          <Link to="/cart" className="focus-ring relative rounded-full bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-[10px] font-black text-white">{count}</span>}
          </Link>
        </div>
        <button className="rounded-full bg-slate-950 p-3 text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur lg:hidden">
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="ml-auto h-full max-w-sm rounded-[2rem] bg-white p-5 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xl font-black">NovaCart</span>
                <button onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-3 dark:bg-white/10"><X /></button>
              </div>
              <div className="mt-8 grid gap-2">
                {links.map(([label, href]) => <NavLink onClick={() => setOpen(false)} key={href} to={href} className={navClass}>{label}</NavLink>)}
                <NavLink onClick={() => setOpen(false)} to="/cart" className={navClass}>Cart ({count})</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/profile" className={navClass}>Profile</NavLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
