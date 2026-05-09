import Page from '../components/ui/Page';
import Button from '../components/ui/Button';

export default function Contact() {
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-premium">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">Contact</p>
          <h1 className="mt-4 text-5xl font-black">Let’s build better commerce.</h1>
          <p className="mt-5 leading-8 text-slate-300">Support, partnerships, order help, and marketplace inquiries are routed through this responsive contact surface.</p>
        </div>
        <form className="rounded-[2.5rem] bg-white p-8 shadow-premium dark:bg-white/[0.06]">
          {['Name', 'Email', 'Subject'].map((label) => <input key={label} placeholder={label} className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-white/10" />)}
          <textarea placeholder="Message" rows="6" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-white/10" />
          <Button className="mt-5">Send message</Button>
        </form>
      </div>
    </Page>
  );
}
