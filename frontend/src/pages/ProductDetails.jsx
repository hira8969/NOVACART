import { Heart, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../features/cartSlice';
import { toggleWishlist } from '../features/wishlistSlice';
import { products } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [image, setImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  const buy = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Added to cart');
  };

  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-premium dark:bg-white/[0.06]">
            <img src={image} alt={product.name} className="h-[520px] w-full object-cover transition duration-500 hover:scale-105" />
          </div>
          <div className="mt-4 flex gap-3">
            {product.gallery.map((item) => <button key={item} onClick={() => setImage(item)} className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-transparent focus:border-cyan-400"><img src={item} alt="" className="h-full w-full object-cover" /></button>)}
          </div>
        </div>
        <div className="lg:pt-8">
          <p className="font-black text-cyan-500">{product.category}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-center gap-3"><span className="flex items-center gap-1 text-amber-400"><Star fill="currentColor" /> {product.rating}</span><span className="text-slate-500">128 verified reviews</span></div>
          <p className="mt-6 text-lg leading-9 text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="mt-6 flex items-end gap-3"><span className="text-5xl font-black">${product.price}</span><span className="pb-2 text-xl font-bold text-slate-400 line-through">${product.oldPrice}</span></div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full bg-slate-100 p-1 dark:bg-white/10">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-full p-3"><Minus size={18} /></button>
              <span className="w-10 text-center font-black">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="rounded-full p-3"><Plus size={18} /></button>
            </div>
            <Button onClick={buy}>Add to cart</Button>
            <Button variant="secondary" onClick={() => dispatch(toggleWishlist(product))}><Heart size={18} /> Wishlist</Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-white/[0.06]"><Truck className="text-cyan-500" /><p className="mt-3 font-black">Fast tracked shipping</p><p className="mt-1 text-sm text-slate-500">Free over $300</p></div>
            <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-white/[0.06]"><ShieldCheck className="text-pink-500" /><p className="mt-3 font-black">Secure checkout</p><p className="mt-1 text-sm text-slate-500">HTTP-only cookie auth ready</p></div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl">
        <h2 className="mb-6 text-3xl font-black">Related products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </div>
    </Page>
  );
}
