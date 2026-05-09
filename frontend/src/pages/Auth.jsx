import { Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';
import { login, register } from '../features/authSlice';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    dispatch(mode === 'login' ? login(data) : register(data));
    navigate('/profile');
  };

  return (
    <Page className="grid place-items-center px-4 py-32">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-premium dark:bg-white/[0.06] lg:grid-cols-2">
        <div className="bg-slate-950 p-8 text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">Secure auth</p>
          <h1 className="mt-4 text-5xl font-black">{mode === 'login' ? 'Welcome back.' : 'Create your Nova ID.'}</h1>
          <p className="mt-5 leading-8 text-slate-300">JWT, role-based auth, protected routes, forgot password, reset password, and email verification flows are backend-ready.</p>
          <div className="mt-8 rounded-3xl bg-white/10 p-5"><ShieldCheck className="text-cyan-300" /><p className="mt-3 font-bold">HTTP-only cookie architecture with secure production flags.</p></div>
        </div>
        <form onSubmit={submit} className="p-8 md:p-12">
          <div className="mb-6 flex rounded-full bg-slate-100 p-1 dark:bg-white/10">
            {['login', 'register'].map((item) => <button type="button" onClick={() => setMode(item)} key={item} className={`flex-1 rounded-full px-4 py-3 font-black capitalize ${mode === item ? 'bg-white text-indigo-600 shadow dark:bg-slate-950' : 'text-slate-500'}`}>{item}</button>)}
          </div>
          {mode === 'register' && <Input name="name" label="Full name" />}
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
          {mode === 'register' && <Input name="confirmPassword" label="Confirm password" type="password" />}
          <button type="button" className="mt-2 text-sm font-bold text-indigo-500">Forgot password?</button>
          <Button className="mt-6 w-full">{mode === 'login' ? 'Login' : 'Create account'}</Button>
          <div className="mt-6 rounded-3xl border border-dashed border-cyan-300/50 p-4 text-sm text-slate-500 dark:text-slate-300"><Mail className="mb-2 text-cyan-500" /> Email verification UI appears after registration.</div>
        </form>
      </div>
    </Page>
  );
}

function Input({ label, ...props }) {
  return <label className="mb-4 grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">{label}<input required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white" placeholder={label} {...props} /></label>;
}
