import { ArrowRight, BadgeCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ProductCard';
import { categories, products, testimonials } from '../data/products';

export default function Home() {
  return (
    <Page>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,.28),transparent_34%),radial-gradient(circle_at_75%_25%,rgba(236,72,153,.22),transparent_30%),radial-gradient(circle_at_50%_95%,rgba(34,211,238,.20),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-500">
              <Sparkles size={17} /> AI-curated premium commerce
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
              NovaCart
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-6 max-w-2xl text-lg leading-9 text-slate-600 dark:text-slate-300">
              Discover beautiful tech, style, wellness, and studio essentials through a fast, animated, startup-grade shopping experience.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} to="/shop">Shop collection <ArrowRight size={18} /></Button>
              <Button as={Link} to="/admin" variant="secondary">View dashboard</Button>
            </motion.div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[['24K+', 'Happy shoppers'], ['$2.4M', 'Monthly GMV'], ['98%', 'On-time delivery']].map(([value, label]) => (
                <div key={label} className="glass rounded-[1.5rem] p-4">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 7, repeat: Infinity }} className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/20 shadow-premium">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80" alt="Premium shopping desk setup" className="h-[520px] w-full object-cover" />
            </div>
            <div className="glass absolute -bottom-6 left-4 right-4 rounded-[1.5rem] p-4 sm:left-auto sm:w-80">
              <p className="font-black">Flash sale live</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Use NOVA20 for 20% off curated drops.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Featured" title="Products that feel future-ready" text="High-converting cards, hover motion, quick actions, wishlist state, and real image-led product discovery." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Categories" title="Shop by mood, not menu fatigue" />
          <div className="grid gap-5 md:grid-cols-4">
            {categories.map((category) => (
              <Link to="/shop" key={category.name} className="group relative min-h-72 overflow-hidden rounded-[2rem]">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-75`} />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-2xl font-black">{category.name}</p>
                  <p className="mt-2 text-sm text-white/80">Explore curated drops</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-premium md:grid-cols-[1fr_.9fr] md:p-12">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-cyan-300">Recommendation engine</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">AI-style picks tuned to your cart, wishlists, and order history.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[BadgeCheck, Truck, Sparkles].map((Icon, index) => <div key={index} className="rounded-3xl bg-white/10 p-5"><Icon className="text-cyan-300" /><p className="mt-4 font-bold">{['Verified quality', 'Fast shipping', 'Smart matching'][index]}</p></div>)}
            </div>
          </div>
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 2200 }} pagination={{ clickable: true }} className="w-full">
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="flex min-h-80 flex-col justify-end rounded-[2rem] bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 p-8">
                  <p className="text-2xl font-black leading-tight">“{item.quote}”</p>
                  <p className="mt-6 font-bold">{item.name}</p>
                  <p className="text-sm text-white/75">{item.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-premium dark:bg-white/[0.06] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-500">Newsletter</p>
          <h2 className="mt-3 text-4xl font-black">Get drops before they sell out</h2>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full bg-slate-100 p-2 dark:bg-white/10 sm:flex-row">
            <input className="min-w-0 flex-1 bg-transparent px-5 py-3 outline-none" placeholder="you@company.com" />
            <Button>Join list</Button>
          </div>
        </div>
      </section>
    </Page>
  );
}
