export default function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-cyan-500">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{text}</p>}
    </div>
  );
}
