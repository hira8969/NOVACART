import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Page from '../components/ui/Page';
import Button from '../components/ui/Button';

const pages = {
  '/gift-cards': {
    eyebrow: 'Gift cards',
    title: 'Send a flexible NovaCart gift.',
    copy: 'Choose a gift amount, add a note, and let your recipient pick from curated tech, wellness, style, and studio essentials.',
    points: ['Digital delivery ready', 'Works across all product categories', 'Perfect for last-minute gifting'],
    cta: ['Start shopping', '/shop']
  },
  '/careers': {
    eyebrow: 'Careers',
    title: 'Build polished commerce with us.',
    copy: 'NovaCart teams work across product, design, engineering, support, and operations to create a sharper shopping experience.',
    points: ['Frontend and backend roles', 'Remote-friendly collaboration', 'Customer-first product culture'],
    cta: ['Contact hiring team', '/contact']
  },
  '/press': {
    eyebrow: 'Press',
    title: 'NovaCart news and media kit.',
    copy: 'Find brand notes, company updates, product launch details, and contact paths for media and partnership requests.',
    points: ['Launch announcements', 'Brand assets and story notes', 'Partnership contact support'],
    cta: ['Contact press', '/contact']
  },
  '/help-center': {
    eyebrow: 'Help center',
    title: 'Get help with orders and shopping.',
    copy: 'Find answers for account access, checkout, payment, order updates, shipping, and product questions.',
    points: ['Account and checkout support', 'Shipping and tracking guidance', 'Product recommendation help'],
    cta: ['Contact support', '/contact']
  },
  '/returns': {
    eyebrow: 'Returns',
    title: 'Simple returns for eligible orders.',
    copy: 'Start a return request, review eligibility, and keep your order history tidy from your NovaCart account.',
    points: ['Easy return request flow', 'Status updates from support', 'Refund guidance for eligible items'],
    cta: ['View orders', '/orders']
  },
  '/privacy': {
    eyebrow: 'Privacy',
    title: 'Your data stays handled with care.',
    copy: 'NovaCart uses account, order, and preference data to run the shopping experience and protect customer sessions.',
    points: ['Secure cookie-based auth', 'Minimal data for checkout', 'Clear support path for data questions'],
    cta: ['Ask a question', '/contact']
  }
};

export default function InfoPage() {
  const { pathname } = useLocation();
  const page = pages[pathname] || pages['/help-center'];

  return (
    <Page className="px-4 pb-20 pt-32">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[2rem] bg-white p-8 shadow-premium dark:bg-white/[0.06] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-500">{page.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{page.copy}</p>
          <Button as={Link} to={page.cta[1]} className="mt-8">
            {page.cta[0]} <ArrowRight size={18} />
          </Button>
        </section>
        <aside className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-premium">
          <h2 className="text-2xl font-black">Quick notes</h2>
          <div className="mt-5 grid gap-4">
            {page.points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={20} />
                <span className="text-sm leading-6 text-slate-200">{point}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Page>
  );
}
