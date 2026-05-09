import { PackageCheck, Settings, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
import Page from '../components/ui/Page';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-premium md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <img src={user?.avatar} alt={user?.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-cyan-300/40" />
            <div><p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">Profile</p><h1 className="mt-2 text-4xl font-black">{user?.name}</h1><p className="mt-2 text-slate-300">{user?.email} · {user?.role}</p></div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[PackageCheck, Shield, Settings].map((Icon, index) => <div key={index} className="rounded-[2rem] bg-white p-6 shadow-lg dark:bg-white/[0.06]"><Icon className="text-cyan-500" /><p className="mt-4 text-xl font-black">{['Order history', 'Security', 'Preferences'][index]}</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{['Track shipments, returns, and invoices.', 'Password, sessions, and verification.', 'Theme, address, and notification settings.'][index]}</p></div>)}
        </div>
      </div>
    </Page>
  );
}
