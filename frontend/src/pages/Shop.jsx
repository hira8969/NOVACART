import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import Page from '../components/ui/Page';
import ProductCard from '../components/ProductCard';
import SkeletonGrid from '../components/ui/SkeletonGrid';
import { categories, products } from '../data/products';

export default function Shop() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(false);
  const categoryNames = ['All', ...categories.map((item) => item.name)];

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const matchCategory = category === 'All' || product.category === category;
      const matchQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, query, sort]);

  const refresh = (nextCategory) => {
    setLoading(true);
    setCategory(nextCategory);
    window.setTimeout(() => setLoading(false), 450);
  };

  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] bg-slate-950 p-8 text-white shadow-premium md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">Shop</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Find your next favorite product.</h1>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center rounded-full bg-white/10 px-4 py-3">
              <Search className="text-cyan-300" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-white/50" placeholder="Search products" />
            </label>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full bg-white/10 px-5 py-3 font-bold outline-none">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-black text-slate-950"><SlidersHorizontal size={18} /> Filters</button>
          </div>
        </div>
        <div className="mb-8 flex gap-3 overflow-auto pb-2">
          {categoryNames.map((name) => (
            <button key={name} onClick={() => refresh(name)} className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${category === name ? 'bg-indigo-600 text-white shadow-glow' : 'bg-white text-slate-700 dark:bg-white/10 dark:text-slate-200'}`}>{name}</button>
          ))}
        </div>
        {loading ? <SkeletonGrid /> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </Page>
  );
}
