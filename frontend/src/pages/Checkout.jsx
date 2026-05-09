import { CreditCard, LockKeyhole } from 'lucide-react';
import { useSelector } from 'react-redux';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';
import { selectCartTotals } from '../features/cartSlice';

export default function Checkout() {
  const totals = useSelector(selectCartTotals);
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
        <form className="rounded-[2rem] bg-white p-6 shadow-premium dark:bg-white/[0.06]">
          <h1 className="text-3xl font-black">Checkout</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {['First name', 'Last name', 'Email', 'Phone', 'Address', 'City'].map((label) => <Input key={label} label={label} />)}
          </div>
          <h2 className="mt-8 flex items-center gap-2 text-2xl font-black"><CreditCard /> Payment UI</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Card number" placeholder="4242 4242 4242 4242" />
            <Input label="Name on card" />
            <Input label="Expiry" placeholder="12/29" />
            <Input label="CVC" placeholder="123" />
          </div>
          <Button className="mt-8 w-full"><LockKeyhole size={18} /> Place secure order</Button>
        </form>
        <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-premium">
          <h2 className="text-2xl font-black">Payable total</h2>
          <p className="mt-4 text-5xl font-black">${totals.total.toFixed(2)}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">Payment integration-ready screen with tax, shipping, coupon, and order summary state.</p>
        </aside>
      </div>
    </Page>
  );
}

function Input({ label, placeholder }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">{label}<input placeholder={placeholder || label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white" /></label>;
}
