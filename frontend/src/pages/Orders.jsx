import { MapPin, Package, Truck } from 'lucide-react';
import Page from '../components/ui/Page';

const orders = [
  { id: 'NC-1048', status: 'Shipped', total: 428, progress: 78 },
  { id: 'NC-1039', status: 'Delivered', total: 188, progress: 100 },
  { id: 'NC-1025', status: 'Processing', total: 96, progress: 34 }
];

export default function Orders() {
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black">Orders & tracking</h1>
        <div className="mt-8 grid gap-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[2rem] bg-white p-6 shadow-lg dark:bg-white/[0.06]">
              <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-slate-500">Order {order.id}</p><p className="text-2xl font-black">${order.total}</p></div><span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-cyan-700">{order.status}</span></div>
              <div className="mt-6 h-3 rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400" style={{ width: `${order.progress}%` }} /></div>
              <div className="mt-5 grid gap-3 text-sm text-slate-500 sm:grid-cols-3">{[Package, Truck, MapPin].map((Icon, index) => <span key={index} className="flex items-center gap-2"><Icon size={17} /> {['Packed', 'In transit', 'Arriving soon'][index]}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
