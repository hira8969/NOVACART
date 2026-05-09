import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '../features/cartSlice';
import { toggleWishlist } from '../features/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wished = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id));

  const handleCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-premium transition dark:border-white/10 dark:bg-white/[0.06]"
    >
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <img className="h-full w-full object-cover transition duration-700 group-hover:scale-110" src={product.image} alt={product.name} loading="lazy" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-indigo-700 shadow-lg">{product.badge}</span>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-cyan-500">{product.category}</p>
            <Link to={`/products/${product.id}`} className="mt-1 block text-lg font-black text-slate-950 transition hover:text-indigo-600 dark:text-white">
              {product.name}
            </Link>
          </div>
          <button
            aria-label="Toggle wishlist"
            onClick={() => dispatch(toggleWishlist(product))}
            className={`focus-ring rounded-full p-3 transition ${wished ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-white'}`}
          >
            <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-400"><Star size={16} fill="currentColor" /><span className="text-sm font-bold text-slate-600 dark:text-slate-300">{product.rating}</span></div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black">${product.price}</span>
              <span className="text-sm font-bold text-slate-400 line-through">${product.oldPrice}</span>
            </div>
          </div>
          <button onClick={handleCart} aria-label="Add to cart" className="focus-ring rounded-full bg-slate-950 p-4 text-white shadow-lg transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
