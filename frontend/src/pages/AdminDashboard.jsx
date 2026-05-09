import { Boxes, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Page from '../components/ui/Page';
import { products } from '../data/products';

const revenue = [
  { month: 'Jan', value: 24000, orders: 310 },
  { month: 'Feb', value: 31000, orders: 390 },
  { month: 'Mar', value: 42000, orders: 520 },
  { month: 'Apr', value: 38000, orders: 470 },
  { month: 'May', value: 59000, orders: 690 },
  { month: 'Jun', value: 74000, orders: 820 }
];

const segments = [
  { name: 'Tech', value: 42, color: '#06b6d4' },
  { name: 'Style', value: 28, color: '#ec4899' },
  { name: 'Wellness', value: 18, color: '#8b5cf6' },
  { name: 'Studio', value: 12, color: '#22c55e' }
];

export default function AdminDashboard() {
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-500">Admin</p><h1 className="mt-2 text-4xl font-black sm:text-6xl">Commerce command center</h1></div>
          <button className="rounded-full bg-slate-950 px-5 py-3 font-black text-white dark:bg-white dark:text-slate-950">Export report</button>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {[
            [DollarSign, '$284K', 'Revenue', 'from-indigo-600 to-cyan-500'],
            [ShoppingCart, '4,890', 'Orders', 'from-fuchsia-600 to-pink-500'],
            [Users, '24.8K', 'Users', 'from-emerald-500 to-cyan-500'],
            [Boxes, '91%', 'Stock health', 'from-violet-600 to-indigo-500']
          ].map(([Icon, value, label, color]) => (
            <div key={label} className={`rounded-[2rem] bg-gradient-to-br ${color} p-6 text-white shadow-premium`}>
              <Icon /><p className="mt-6 text-3xl font-black">{value}</p><p className="text-sm text-white/75">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
          <ChartCard title="Revenue overview">
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={revenue}>
                <defs><linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#06b6d4" stopOpacity={0.7} /><stop offset="1" stopColor="#06b6d4" stopOpacity={0.05} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="url(#revenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Category split">
            <ResponsiveContainer width="100%" height={330}>
              <PieChart>
                <Pie data={segments} innerRadius={70} outerRadius={110} paddingAngle={6} dataKey="value">
                  {segments.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <ChartCard title="Orders">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenue}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" /><XAxis dataKey="month" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="orders" fill="#8b5cf6" radius={[12, 12, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="rounded-[2rem] bg-white p-6 shadow-premium dark:bg-white/[0.06]">
            <h2 className="text-2xl font-black">Inventory system</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="text-slate-500"><tr><th className="py-3">Product</th><th>Stock</th><th>Rating</th><th>Revenue</th><th>Status</th></tr></thead>
                <tbody>
                  {products.map((product) => <tr key={product.id} className="border-t border-slate-100 dark:border-white/10"><td className="py-3 font-bold">{product.name}</td><td>{product.stock}</td><td>{product.rating}</td><td>${(product.price * product.stock).toLocaleString()}</td><td><span className="rounded-full bg-emerald-100 px-3 py-1 font-black text-emerald-700">Active</span></td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ChartCard({ title, children }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-premium dark:bg-white/[0.06]"><h2 className="mb-5 text-2xl font-black">{title}</h2>{children}</div>;
}
