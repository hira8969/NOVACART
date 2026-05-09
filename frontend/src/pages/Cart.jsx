import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';
import { applyCoupon, removeFromCart, selectCartTotals, updateQuantity } from '../features/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totals = useSelector(selectCartTotals);

  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_390px]">
        <div>
          <h1 className="text-4xl font-black">Shopping cart</h1>
          <div className="mt-8 grid gap-4">
            {items.length === 0 && <div className="rounded-[2rem] bg-white p-8 text-center shadow-premium dark:bg-white/[0.06]"><p className="font-bold">Your cart is empty.</p><Button as={Link} to="/shop" className="mt-5">Start shopping</Button></div>}
            {items.map((item) => (
              <div key={item.id} className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-lg dark:bg-white/[0.06] sm:grid-cols-[120px_1fr_auto]">
                <img src={item.image} alt={item.name} className="h-32 w-full rounded-3xl object-cover sm:w-32" />
                <div>
                  <p className="font-black">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                  <p className="mt-4 text-xl font-black">${item.price}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full bg-slate-100 p-1 dark:bg-white/10">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-2"><Minus size={16} /></button>
                    <span className="w-8 text-center font-black">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-2"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="rounded-full bg-rose-50 p-3 text-rose-500 dark:bg-rose-500/10"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-premium">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="mt-5 flex gap-2 rounded-full bg-white/10 p-2">
            <input id="coupon" className="min-w-0 flex-1 bg-transparent px-3 outline-none" placeholder="Coupon NOVA20" />
            <button onClick={() => dispatch(applyCoupon(document.getElementById('coupon').value))} className="rounded-full bg-white px-4 py-2 font-black text-slate-950">Apply</button>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            <Row label="Subtotal" value={totals.subtotal} />
            <Row label="Discount" value={-totals.discount} />
            <Row label="Tax" value={totals.tax} />
            <Row label="Shipping" value={totals.shipping} />
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-2xl font-black"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
          <Button as={Link} to="/checkout" className="mt-6 w-full">Checkout</Button>
        </aside>
      </div>
    </Page>
  );
}

function Row({ label, value }) {
  return <div className="flex justify-between text-slate-300"><span>{label}</span><span>${value.toFixed(2)}</span></div>;
}
