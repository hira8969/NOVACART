import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  [Instagram, 'https://www.instagram.com/', 'Instagram'],
  [Linkedin, 'https://www.linkedin.com/', 'LinkedIn'],
  [Github, 'https://github.com/', 'GitHub'],
  [Mail, 'mailto:support@novacart.dev', 'Email support']
];

const footerSections = [
  ['Shop', [
    ['New arrivals', '/shop?collection=new'],
    ['Trending', '/shop?sort=rating'],
    ['Flash sale', '/shop?collection=sale'],
    ['Gift cards', '/gift-cards']
  ]],
  ['Company', [
    ['About', '/about'],
    ['Careers', '/careers'],
    ['Press', '/press'],
    ['Contact', '/contact']
  ]],
  ['Support', [
    ['Help center', '/help-center'],
    ['Tracking', '/orders'],
    ['Returns', '/returns'],
    ['Privacy', '/privacy']
  ]]
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-cyan-400 font-black">N</span><span className="text-2xl font-black">NovaCart</span></div>
          <p className="mt-5 max-w-sm leading-7 text-slate-300">Premium commerce for curated products, intelligent discovery, and polished checkout experiences.</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(([Icon, href, label]) => (
              <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={label} className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        {footerSections.map(([title, items]) => (
          <div key={title}>
            <h3 className="font-black">{title}</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {items.map(([item, href]) => <Link key={item} to={href} className="transition hover:text-cyan-300">{item}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-400">&copy; 2026 NovaCart. Built for portfolio-ready full-stack commerce.</div>
    </footer>
  );
}
