import { Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import Page from '../components/ui/Page';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <h1 className="flex items-center gap-3 text-4xl font-black"><Heart className="text-pink-500" /> Wishlist</h1>
        {items.length === 0 ? <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-premium dark:bg-white/[0.06]">Save products you love and they will appear here.</div> : <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </Page>
  );
}
