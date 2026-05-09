import Page from '../components/ui/Page';

export default function About() {
  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 shadow-premium dark:bg-white/[0.06] md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-500">About</p>
        <h1 className="mt-4 text-5xl font-black">NovaCart turns online shopping into a premium product experience.</h1>
        <p className="mt-6 text-lg leading-9 text-slate-600 dark:text-slate-300">Built with React, Redux Toolkit, Framer Motion, Express, MongoDB, JWT auth, and a scalable MVC backend. The project is designed to showcase real-world full-stack architecture with polished UI craft.</p>
      </div>
    </Page>
  );
}
