import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import maisonAureleHero from './assets/maison-aurele-hero.jpg';
import maisonInterior from './assets/maison-aurele/interior.jpg';
import maisonChef from './assets/maison-aurele/chef.jpg';
import maisonDish1 from './assets/maison-aurele/dish1.jpg';
import maisonDish2 from './assets/maison-aurele/dish2.jpg';
import maisonDish3 from './assets/maison-aurele/dish3.jpg';
import maisonWine from './assets/maison-aurele/wine.jpg';
import maisonAmuse from './assets/maison-aurele/amuse.jpg';
import {
  ArrowRight, ArrowUpRight, BarChart3, Bell, Building2, Check, ChevronDown, CircleHelp,
  Clock3, Code2, Compass, Copy, Crown, Download, ExternalLink, Eye, FileText, Filter,
  Heart, Home as HomeIcon, LayoutDashboard, LifeBuoy, Menu, MessageCircle, Monitor, Palette,
  PanelLeft, Plus, Rocket, Search, ShieldCheck, Sparkles, Smartphone, SlidersHorizontal,
  RotateCcw, Star, Store, Tablet, WandSparkles, X, Zap
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918446079635';

const demoTemplates = [
  { id: 11, category_name: 'Restaurants', category_slug: 'restaurants', name: 'Maison Aurele', description: 'A cinematic one-page restaurant website with menu storytelling and reservations.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: maisonAureleHero, palette: 'ivory', features: ['9+ editable sections', 'Reservation form', 'Seasonal menu sections'] },
  { id: 12, category_name: 'Salons & Beauty', category_slug: 'salons', name: 'Mira Studio', description: 'A polished one-page salon website for services, stylists and appointments.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', palette: 'rose', features: ['9+ editable sections', 'Service menu', 'Appointment CTA'] },
  { id: 13, category_name: 'Construction', category_slug: 'construction', name: 'Form & Foundation', description: 'A confident one-page construction website for projects, services and enquiries.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85', palette: 'cobalt', features: ['9+ editable sections', 'Project showcase', 'Enquiry form'] },
  { id: 14, category_name: 'Clinics', category_slug: 'clinics', name: 'Mediwell Clinic', description: 'A calm one-page clinic website for treatments, doctors and appointments.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85', palette: 'mint', features: ['9+ editable sections', 'Treatment cards', 'Appointment form'] },
  { id: 15, category_name: 'Real Estate', category_slug: 'real-estate', name: 'Cedar & Co.', description: 'A property-first one-page website for listings, trust and enquiries.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', palette: 'violet', features: ['9+ editable sections', 'Property cards', 'Lead capture form'] },
  { id: 16, category_name: 'Professional Services', category_slug: 'professional-services', name: 'Northstar Advisory', description: 'A sharp one-page professional website for expertise, proof and enquiries.', pages: 1, type: 'Static', price: 1000, featured: 1, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85', palette: 'slate', features: ['9+ editable sections', 'Capability cards', 'Contact form'] },
  { id: 21, category_name: 'Restaurants', category_slug: 'restaurants', name: 'Saffron Table', description: 'A three-page restaurant website for menu, story and reservations.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85', palette: 'saffron', features: ['3 editable pages', 'Menu and reservations', 'Gallery and contact form'] },
  { id: 22, category_name: 'Salons & Beauty', category_slug: 'salons', name: 'Atelier Mira', description: 'A three-page salon website for services, team and appointments.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', palette: 'blush', features: ['3 editable pages', 'Service menu', 'Appointment enquiry form'] },
  { id: 23, category_name: 'Construction', category_slug: 'construction', name: 'Builtline Studio', description: 'A three-page construction website for work, capabilities and enquiries.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85', palette: 'steel', features: ['3 editable pages', 'Project showcase', 'Lead capture form'] },
  { id: 24, category_name: 'Clinics', category_slug: 'clinics', name: 'Harbor Health', description: 'A three-page clinic website for care, specialists and appointments.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85', palette: 'sky', features: ['3 editable pages', 'Treatment details', 'Appointment form'] },
  { id: 25, category_name: 'Real Estate', category_slug: 'real-estate', name: 'Hearth & Key', description: 'A three-page property website for listings, advice and enquiries.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', palette: 'sand', features: ['3 editable pages', 'Property showcase', 'Buyer enquiry form'] },
  { id: 26, category_name: 'Professional Services', category_slug: 'professional-services', name: 'Fieldnote Partners', description: 'A three-page advisory website for expertise, proof and contact.', pages: 3, type: 'Dynamic', price: 1500, featured: 0, demo: true, thumbnail_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', palette: 'graphite', features: ['3 editable pages', 'Case study showcase', 'Contact form'] }
];

const categories = [
  { name: 'Restaurants', slug: 'restaurants', icon: '◒', description: 'Menus, bookings and neighbourhood love.', color: '#F28C28' },
  { name: 'Salons', slug: 'salons', icon: '✦', description: 'Service-led spaces with a softer edge.', color: '#D94680' },
  { name: 'Construction', slug: 'construction', icon: '▦', description: 'Show the work behind the work.', color: '#2563EB' },
  { name: 'Clinics', slug: 'clinics', icon: '+', description: 'Clear, calm and easy to trust.', color: '#0F766E' },
  { name: 'Real Estate', slug: 'real-estate', icon: '⌂', description: 'Put the right properties forward.', color: '#7C3AED' },
  { name: 'Professional', slug: 'professional-services', icon: '↗', description: 'A sharp home for your expertise.', color: '#475569' }
];

const categoryPreviewConfig = {
  restaurants: { label: 'CONTEMPORARY FRENCH RESTAURANT', defaultBusinessName: 'Maison Aurele', defaultTagline: 'An experience beyond taste.', defaultAbout: 'A contemporary fine-dining restaurant offering seasonal tasting menus, a curated cellar and intimate evenings.', aboutTitle: 'A considered table for memorable evenings.', servicesTitle: 'Everything is prepared with intention.', serviceLabel: 'Menu & hospitality', services: ['Seasonal tasting menus', 'Curated private dining', 'Reservations made easy'], showcaseTitle: 'A closer look at the table.', testimonial: '“Every detail felt personal, warm and beautifully considered.”', faqTitle: 'Good to know before you visit.', footerTagline: 'Contemporary French fine dining' },
  salons: { label: 'MODERN BEAUTY & WELLNESS STUDIO', defaultBusinessName: 'Mira Studio', defaultTagline: 'Your time, beautifully considered.', defaultAbout: 'A thoughtful beauty studio offering considered cuts, colour, skin rituals and a slower kind of self-care.', aboutTitle: 'A studio designed around your time.', servicesTitle: 'Small rituals. Visible results.', serviceLabel: 'Our services', services: ['Cuts and colour', 'Skin and beauty rituals', 'Bridal and event styling'], showcaseTitle: 'The details make the difference.', testimonial: '“I left feeling lighter, more confident, and completely looked after.”', faqTitle: 'Your visit, made simple.', footerTagline: 'Beauty, care and confidence' },
  construction: { label: 'ARCHITECTURE · BUILD · CRAFT', defaultBusinessName: 'Form & Foundation', defaultTagline: 'Built for the way you live.', defaultAbout: 'A project-led construction studio delivering thoughtful spaces, dependable execution and work that lasts.', aboutTitle: 'Strong ideas, carefully built.', servicesTitle: 'From first line to final detail.', serviceLabel: 'Capabilities', services: ['Residential construction', 'Commercial fit-outs', 'Renovation and restoration'], showcaseTitle: 'Work with a point of view.', testimonial: '“Clear communication, exceptional craft, and a result we are proud to live with.”', faqTitle: 'Planning your next project.', footerTagline: 'Crafted spaces. Considered work.' },
  clinics: { label: 'CALM, CLEAR, HUMAN CARE', defaultBusinessName: 'Mediwell Clinic', defaultTagline: 'Care that starts with listening.', defaultAbout: 'A calm healthcare practice helping families make confident decisions with clear guidance and human attention.', aboutTitle: 'A clearer way to feel looked after.', servicesTitle: 'Care built around real life.', serviceLabel: 'Treatments & care', services: ['Consultations and diagnosis', 'Preventive health plans', 'Follow-up and family care'], showcaseTitle: 'A practice you can trust.', testimonial: '“The team explained everything clearly and made the whole visit feel manageable.”', faqTitle: 'Questions before your appointment.', footerTagline: 'Clear care, close to home' },
  'real-estate': { label: 'PROPERTY · PLACE · POSSIBILITY', defaultBusinessName: 'Cedar & Co.', defaultTagline: 'Find a place that feels like yours.', defaultAbout: 'A local property team pairing deep neighbourhood knowledge with a more considered way to buy, sell and move.', aboutTitle: 'Property advice with a human point of view.', servicesTitle: 'Make your next move with confidence.', serviceLabel: 'How we help', services: ['Buy and sell guidance', 'Curated property search', 'Valuation and market advice'], showcaseTitle: 'Places worth looking closer at.', testimonial: '“They understood what we needed before we knew how to describe it.”', faqTitle: 'Start with the right questions.', footerTagline: 'Local knowledge. Better moves.' },
  'professional-services': { label: 'STRATEGY · EXPERTISE · MOMENTUM', defaultBusinessName: 'Northstar Advisory', defaultTagline: 'Clarity for your next chapter.', defaultAbout: 'An independent advisory practice helping ambitious teams make better decisions, communicate clearly and move forward.', aboutTitle: 'A sharper point of view for complex work.', servicesTitle: 'Useful thinking, made actionable.', serviceLabel: 'What we do', services: ['Strategy and positioning', 'Research and insight', 'Workshops and advisory'], showcaseTitle: 'Proof in the process.', testimonial: '“They brought structure to the uncertainty and helped us act with confidence.”', faqTitle: 'A useful first conversation.', footerTagline: 'Independent thinking for ambitious teams.' }
};

function categoryEditorDefaults(slug) {
  const config = categoryPreviewConfig[slug] || categoryPreviewConfig['professional-services'];
  return { aboutTitle: config.aboutTitle, aboutBody: config.defaultAbout, servicesTitle: config.servicesTitle, services: [...config.services], showcaseTitle: config.showcaseTitle, testimonial: config.testimonial, faqTitle: config.faqTitle, faqBody: 'Tell us what you need and we will guide you through the next step.', footerTagline: config.footerTagline };
}

const plans = [
  { id: 'static', name: 'Static Website', price: '₹1,000', eyebrow: 'Start simple', description: 'A focused one-page presence for getting online quickly.', items: ['One responsive page', 'Business content and images', 'Preview before purchase', 'Source-code delivery'], icon: Zap },
  { id: 'dynamic-3', name: 'Dynamic Website', price: '₹1,500', eyebrow: 'Most flexible', description: 'A three-page foundation for businesses ready to grow.', items: ['Three configured pages', 'Reusable sections', 'Enquiry-ready structure', 'Basic SEO fields'], icon: WandSparkles, recommended: true },
  { id: 'dynamic-5', name: 'Dynamic Website', price: '₹2,000', eyebrow: 'Tell the full story', description: 'More room for your work, services, and credibility.', items: ['Five configured pages', 'Data-driven content', 'Expanded navigation', 'Basic SEO fields'], icon: Crown }
];

function App() {
  const [templates, setTemplates] = useState(demoTemplates);
  const [categoriesData, setCategoriesData] = useState(categories);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    Promise.all([fetch(`${API}/templates`).then((r) => r.ok ? r.json() : Promise.reject()), fetch(`${API}/categories`).then((r) => r.ok ? r.json() : Promise.reject())])
      .then(([templateRows, categoryRows]) => { if (templateRows.length) setTemplates(templateRows); if (categoryRows.length) setCategoriesData(categoryRows); })
      .catch(() => undefined);
  }, []);

  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 3400); };
  return <>
    <SiteChrome onAccount={() => setAccountOpen(true)} />
    <Routes>
      <Route path="/" element={<Home templates={templates} categories={categoriesData} onToast={showToast} />} />
      <Route path="/templates" element={<Marketplace templates={templates} categories={categoriesData} />} />
      <Route path="/pricing" element={<Pricing onToast={showToast} />} />
      <Route path="/builder/:templateId" element={<BuilderV4 templates={templates} onToast={showToast} />} />
      <Route path="/dashboard" element={<DashboardV2 />} />
      <Route path="/admin" element={<AdminV2 />} />
      <Route path="*" element={<Home templates={templates} categories={categoriesData} onToast={showToast} />} />
    </Routes>
    <WhatsAppFloat />
    <SiteFooterV2 />
    <AnimatePresence>{accountOpen && <AuthModal onClose={() => setAccountOpen(false)} onToast={showToast} />}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="toast"><Check size={16} /> {toast}</motion.div>}</AnimatePresence>
  </>;
}

function SiteChrome({ onAccount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const go = (path) => { navigate(path); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <>
    <div className="announcement"><Sparkles size={14} /> Build your business website with transparent pricing. <button onClick={() => go('/pricing')}>Compare packages <ArrowUpRight size={13} /></button></div>
    <header className="site-header">
      <div className="container nav-shell">
        <button className="brand" onClick={() => go('/')} aria-label="WebBasket home"><span className="brand-mark">WebBasket</span><span>web<span>basket</span></span></button>
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <button className={location.pathname === '/templates' ? 'active' : ''} onClick={() => go('/templates')}>Templates</button>
          <a href="/#categories" onClick={() => setMobileOpen(false)}>Categories</a>
          <button className={location.pathname === '/pricing' ? 'active' : ''} onClick={() => go('/pricing')}>Pricing</button>
          <a href="/#how-it-works" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="/#services" onClick={() => setMobileOpen(false)}>Services</a>
          <button className="mobile-login" onClick={() => { onAccount(); setMobileOpen(false); }}>Log in</button>
        </nav>
        <div className="nav-actions"><button className="login-link" onClick={onAccount}>Log in</button><button className="button button-dark button-small" onClick={() => go('/templates')}>Build my website <ArrowRight size={15} /></button></div>
        <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
  </>;
}

function Home({ templates, categories: categoryRows, onToast }) {
  const navigate = useNavigate();
  const featured = templates.filter((template) => template.featured).slice(0, 4);
  return <main>
    <section className="hero section-pad"><div className="container hero-grid">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> For local businesses with big plans</div><h1>Your business deserves a <em>better</em> website.</h1><p>Choose a professional template, add your business details, preview your website, and get your own website without the complexity or high development costs.</p><div className="hero-actions"><button className="button button-orange" onClick={() => navigate('/templates')}>Explore templates <ArrowRight size={17} /></button><a className="text-link" href="#how-it-works">See how it works <ArrowUpRight size={16} /></a></div><div className="trust-row"><div className="trust-item"><ShieldCheck size={17} /> Transparent pricing</div><div className="trust-item"><Monitor size={17} /> Responsive by default</div><div className="trust-item"><Eye size={17} /> Preview before you pay</div></div></div>
      <HeroVisual onOpen={() => navigate('/builder/11')} />
    </div></section>
    <section className="logo-strip"><div className="container logo-row"><span>BUILT FOR THE EVERYDAY ENTREPRENEUR</span><i /><span>NO AGENCY JARGON</span><i /><span>YOUR CONTENT, YOUR WEBSITE</span></div></section>
    <section className="section-pad" id="categories"><div className="container"><SectionHeading eyebrow="Start with your world" title="What kind of website do you need?" copy="A considered starting point for the businesses that keep local India moving." action={<Link className="text-link" to="/templates">View all templates <ArrowRight size={15} /></Link>} /><div className="category-grid">{(categoryRows.length ? categoryRows : categories).slice(0, 6).map((category, index) => <CategoryCard key={category.slug || category.id} category={category} index={index} />)}</div></div></section>
    <section className="section-pad section-tint"><div className="container"><SectionHeading eyebrow="The template shelf" title="Find your perfect starting point" copy="Real layouts for real businesses. Every template is responsive, editable, and ready for your story." action={<Link className="text-link" to="/templates">Browse marketplace <ArrowRight size={15} /></Link>} /><div className="template-grid">{featured.map((template, index) => <TemplateCard key={template.id} template={template} index={index} />)}</div></div></section>
    <section className="section-pad" id="how-it-works"><div className="container"><SectionHeading eyebrow="A simpler way to start" title="From blank page to business-ready." copy="No long briefs. No mysterious quotes. Just a clear path to a website you can feel proud of." /><div className="steps-grid">{[[Store, '01', 'Choose a template', 'Start with a design that already understands your kind of business.'], [FileText, '02', 'Add your details', 'Tell us your story, services, hours, images, and the small details that matter.'], [Eye, '03', 'Preview your website', 'See it on desktop, tablet, and mobile before you make a decision.'], [Rocket, '04', 'Get your website', 'Purchase the source code or let our team help you take it live.']].map(([Icon, number, title, copy]) => <div className="step" key={number}><div className="step-number">{number}</div><div className="step-icon"><Icon size={22} /></div><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="section-pad section-navy"><div className="container pricing-banner"><div><div className="eyebrow eyebrow-light">Straightforward packages</div><h2>A clear price for a clear beginning.</h2><p>Start with the scope that fits today. Add pages and services only when you need them.</p></div><div className="mini-plans">{plans.map((plan) => <button key={plan.id} className={plan.recommended ? 'mini-plan selected' : 'mini-plan'} onClick={() => navigate('/pricing')}><span>{plan.name}</span><strong>{plan.price}</strong><small>{plan.pages} {plan.pages === 1 ? 'page' : 'pages'}</small></button>)}</div></div></section>
    <section className="section-pad" id="services"><div className="container"><SectionHeading eyebrow="When you need a little more" title="Useful services, clearly scoped." copy="From launch support to custom functionality, choose the help that fits your next step." action={<Link className="text-link" to="/pricing">Explore services <ArrowRight size={15} /></Link>} /><div className="service-grid">{[[Rocket, 'Hosting & deployment', 'Get your finished website live with a domain and hosting setup.'], [PanelLeft, 'Custom admin panel', 'Manage enquiries, products, bookings, or content independently.'], [BarChart3, 'SEO setup', 'A considered search foundation for the people trying to find you.'], [LifeBuoy, 'Monthly maintenance', 'Keep content, security, and backups in good shape.']].map(([Icon, title, copy]) => <div className="service-card" key={title}><Icon size={23} /><h3>{title}</h3><p>{copy}</p><span>Quotation required <ArrowUpRight size={13} /></span></div>)}</div></div></section>
    <section className="section-pad cta-section"><div className="container cta-card"><div className="cta-orb orb-one" /><div className="cta-orb orb-two" /><div className="eyebrow eyebrow-light">Ready when you are</div><h2>Ready to take your business online?</h2><p>Start with a template. Leave the technical overwhelm to us.</p><button className="button button-orange" onClick={() => navigate('/templates')}>Explore website templates <ArrowRight size={17} /></button></div></section>
  </main>;
}

function HeroVisual({ onOpen }) {
  const [doorOpen, setDoorOpen] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setDoorOpen(true), 360);
    return () => window.clearTimeout(timer);
  }, []);

  const replayReveal = () => {
    setDoorOpen(false);
    window.setTimeout(() => setDoorOpen(true), 80);
  };

  return <div className="hero-visual"><div className="visual-glow" /><div className="browser-card browser-main"><div className="browser-bar"><span /><span /><span /><small>preview / saffron-table</small><Monitor size={14} /></div><div className="preview-site"><div className="preview-nav"><b>SAFFRON <i>TABLE</i></b><span>Menu</span><span>Story</span><span>Visit us</span><button>Book a table</button></div><div className="preview-hero"><div><small>EST. 2014 · PUNE</small><h3>A little<br /><em>extraordinary.</em></h3><p>Seasonal plates, warm tables, good conversation.</p><button onClick={onOpen}>Explore the menu <ArrowRight size={11} /></button></div></div><div className="preview-bottom"><span>Open today <b>11:30 — 23:00</b></span><span>4.9 <Star size={11} fill="currentColor" /></span></div></div></div><div className={`hero-door-reveal ${doorOpen ? 'is-open' : ''}`} aria-hidden="true"><div className="door-light" /><div className="hero-door-panel hero-door-left"><span className="door-handle" /></div><div className="hero-door-panel hero-door-right"><span className="door-handle" /></div><div className="door-caption"><span>OPEN YOUR ONLINE PRESENCE</span><b>Step into better.</b></div></div><button className="hero-replay" onClick={replayReveal} aria-label="Replay hero door animation"><RotateCcw size={12} /> Replay reveal</button><div className="floating-card floating-phone"><div className="phone-top"><span>9:41</span><span>●●●</span></div><div className="phone-image" /><div className="phone-copy"><small>SAFFRON TABLE</small><strong>Seasonal plates.<br />Always a reason.</strong><span className="phone-line" /></div></div><div className="floating-card edit-chip"><WandSparkles size={14} /><span>Easy to customize</span><Check size={14} /></div><div className="floating-card draft-card"><span className="draft-icon"><Check size={13} /></span><div><b>Preview ready</b><small>Looks good on mobile too</small></div></div></div>;
}

function SectionHeading({ eyebrow, title, copy, action }) { return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action}</div>; }

function CategoryCard({ category, index }) { const navigate = useNavigate(); return <button className="category-card" onClick={() => navigate(`/templates?category=${category.slug}`)}><span className="category-symbol" style={{ color: category.color || category.accent }}>{category.icon || ['◒', '✦', '▦', '+', '⌂', '↗'][index]}</span><span><b>{category.name}</b><small>{category.slug === 'restaurants' ? 'One-page restaurant websites for menus, bookings and local customers.' : category.description}</small></span><ArrowUpRight size={17} /></button>; }

function TemplateCard({ template, index = 0 }) { const navigate = useNavigate(); return <motion.article className="template-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><div className="template-image"><img src={template.thumbnail_url} alt={`${template.name} demo template`} /><div className="template-image-overlay"><span className="demo-label">Demo template</span><button className="round-button" aria-label="Save template"><Heart size={15} /></button></div><span className="template-type">{template.type} · {template.pages} {template.pages === 1 ? 'page' : 'pages'}</span></div><div className="template-card-body"><div><span className="template-category">{template.category_name}</span><h3>{template.name}</h3><p>{template.description}</p></div><div className="template-card-footer"><span>from <strong>₹{Number(template.price).toLocaleString('en-IN')}</strong></span><button className="card-link" onClick={() => navigate(`/builder/${template.id}`)}>Customize <ArrowUpRight size={15} /></button></div></div></motion.article>; }

function Marketplace({ templates, categories: categoryRows }) { const [search, setSearch] = useState(''); const [category, setCategory] = useState('All'); const [type, setType] = useState('All'); const [mobileFilters, setMobileFilters] = useState(false); const location = useLocation(); useEffect(() => { const query = new URLSearchParams(location.search).get('category'); if (query) setCategory(query); }, [location.search]); const filtered = useMemo(() => templates.filter((template) => (!search || `${template.name} ${template.description} ${template.category_name}`.toLowerCase().includes(search.toLowerCase())) && (category === 'All' || template.category_slug === category) && (type === 'All' || template.type === type)), [templates, search, category, type]); return <main className="marketplace-page section-pad"><div className="container"><div className="marketplace-hero"><div><div className="eyebrow">The marketplace</div><h1>A better starting point<br /><em>for your website.</em></h1><p>Browse purposeful templates made for local businesses, independent professionals, and teams building their next chapter.</p></div><div className="marketplace-note"><Sparkles size={16} /><span><b>Every demo is honest.</b><br />Templates marked demo are examples, not customer claims.</span></div></div><div className="marketplace-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates, categories..." /></div><button className="filter-toggle" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal size={16} /> Filters</button><div className="result-count">{filtered.length} templates</div></div><div className="marketplace-layout"><aside className={`filter-panel ${mobileFilters ? 'visible' : ''}`}><div className="filter-header"><b>Filter templates</b><button onClick={() => { setCategory('All'); setType('All'); setSearch(''); }}>Reset</button></div><label>Business category</label><div className="filter-list"><button className={category === 'All' ? 'selected' : ''} onClick={() => setCategory('All')}>All categories <span>{templates.length}</span></button>{categoryRows.map((item) => <button key={item.slug} className={category === item.slug ? 'selected' : ''} onClick={() => setCategory(item.slug)}>{item.name}<span>{templates.filter((template) => template.category_slug === item.slug).length}</span></button>)}</div><label>Website type</label><div className="segmented"><button className={type === 'All' ? 'selected' : ''} onClick={() => setType('All')}>All</button><button className={type === 'Static' ? 'selected' : ''} onClick={() => setType('Static')}>Static</button><button className={type === 'Dynamic' ? 'selected' : ''} onClick={() => setType('Dynamic')}>Dynamic</button></div><div className="filter-help"><CircleHelp size={16} /><span>All prices are starting prices. Hosting, domains, and custom functionality are separate.</span></div></aside><div className="marketplace-results"><div className="results-top"><span>Showing {filtered.length} of {templates.length}</span><button><SlidersHorizontal size={14} /> Sort: Featured <ChevronDown size={14} /></button></div>{filtered.length ? <div className="template-grid">{filtered.map((template, index) => <TemplateCard key={template.id} template={template} index={index} />)}</div> : <div className="empty-state"><Search size={24} /><h3>No templates found</h3><p>Try a different search or clear your filters.</p><button className="button button-dark" onClick={() => { setCategory('All'); setType('All'); setSearch(''); }}>Clear filters</button></div>}</div></div></div></main>; }

function Pricing({ onToast }) { const navigate = useNavigate(); return <main className="pricing-page section-pad"><div className="container"><div className="center-heading"><div className="eyebrow">Clear scope, fair starting points</div><h1>Pick the pace that fits<br /><em>your next chapter.</em></h1><p>Every package includes a responsive website, a preview before purchase, and a clear handover. Add-ons are always listed separately.</p></div><div className="plans-grid">{plans.map((plan) => <PlanCard key={plan.id} plan={plan} onSelect={() => navigate('/templates')} />)}</div><div className="price-disclosure"><ShieldCheck size={19} /><div><b>No surprise charges.</b><span>Hosting, domain registration, custom CMS, ecommerce, advanced booking, and third-party subscriptions are not included unless explicitly shown in your order.</span></div></div><div className="services-table"><div className="eyebrow">Optional services</div><h2>Bring in help when you need it.</h2>{[['Hosting & domain setup', 'Quotation', 'We help connect the pieces and take your site live.'], ['Independent admin panel', 'Quotation', 'Manage products, bookings, or enquiries after launch.'], ['SEO foundation', 'From ₹2,500', 'Metadata, indexing, analytics, and a considered launch checklist.'], ['Monthly maintenance', 'Recurring', 'Security, backups, content changes, and small improvements.']].map(([name, price, copy]) => <div className="service-row" key={name}><div><b>{name}</b><span>{copy}</span></div><strong>{price}</strong><button className="text-link" onClick={() => onToast(`${name} enquiry started`)}>Ask about it <ArrowUpRight size={14} /></button></div>)}</div></div></main>; }

function PlanCard({ plan, onSelect }) { const Icon = plan.icon; return <article className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>{plan.recommended && <div className="recommended-tag">Recommended</div>}<div className="plan-icon"><Icon size={20} /></div><div className="plan-eyebrow">{plan.eyebrow}</div><h2>{plan.name}</h2><div className="plan-price">{plan.price}<small>starting</small></div><p>{plan.description}</p><div className="plan-divider" />{plan.items.map((item) => <div className="plan-item" key={item}><Check size={15} />{item}</div>)}<button className={plan.recommended ? 'button button-orange full-width' : 'button button-outline full-width'} onClick={onSelect}>Choose this package <ArrowRight size={15} /></button></article>; }

function Builder({ templates, onToast }) { const { templateId } = useParams(); const navigate = useNavigate(); const template = templates.find((item) => String(item.id) === String(templateId)) || templates[0]; const [businessName, setBusinessName] = useState('Saffron Table'); const [tagline, setTagline] = useState('Seasonal plates. Always a reason.'); const [about, setAbout] = useState('A neighbourhood table built around seasonal produce, honest cooking, and the joy of lingering a little longer.'); const [saved, setSaved] = useState(false); const saveProject = async () => { try { const response = await fetch(`${API}/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ templateId: template.id, projectName: `${businessName} website`, businessName, content: { tagline, about } }) }); if (!response.ok) throw new Error(); setSaved(true); onToast('Draft saved to your project workspace'); } catch { setSaved(true); onToast('Draft saved locally. Start the API to persist it in MySQL.'); } }; return <main className="builder-page"><div className="builder-shell"><aside className="builder-sidebar"><div className="builder-brand"><button className="brand" onClick={() => navigate('/')}><span className="brand-mark">wg</span><span>web<span>guruji</span></span></button><span className="builder-tag">Website builder</span></div><div className="builder-template-mini"><img src={template.thumbnail_url} alt="Selected template" /><div><span>Selected template</span><b>{template.name}</b><button onClick={() => navigate('/templates')}>Change template</button></div></div><div className="builder-step active"><span>01</span><div><b>Your story</b><small>Business details</small></div><Check size={16} /></div><div className="builder-step"><span>02</span><div><b>Style</b><small>Colours and type</small></div></div><div className="builder-step"><span>03</span><div><b>Preview</b><small>Check every screen</small></div></div><div className="builder-help"><LifeBuoy size={17} /><b>Need a hand?</b><p>Talk to a website specialist at any point.</p><button onClick={() => onToast('A specialist will be in touch soon')}>Talk to the team <ArrowRight size={13} /></button></div></aside><section className="builder-main"><div className="builder-toolbar"><div><span className="crumb">Templates / {template.name}</span><h1>Make it yours.</h1></div><div className="builder-toolbar-actions"><span className={`save-status ${saved ? 'saved' : ''}`}><span />{saved ? 'Saved just now' : 'Unsaved changes'}</span><button className="button button-outline button-small" onClick={saveProject}><Copy size={14} /> Save draft</button><button className="button button-dark button-small" onClick={() => onToast('Preview link copied')}>Share preview <ExternalLink size={14} /></button></div></div><div className="builder-workspace"><div className="builder-form"><div className="form-heading"><div className="eyebrow">Your business</div><h2>Start with the essentials.</h2><p>These details will shape your first preview. You can always come back and edit them.</p></div><label>Business name<input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Saffron Table" /></label><label>Short tagline<input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="A line your customers will remember" /></label><label>About your business<textarea value={about} onChange={(e) => setAbout(e.target.value)} rows="5" /></label><div className="form-row"><label>Phone number<input placeholder="+91 98765 43210" /></label><label>City<input placeholder="Pune, Maharashtra" /></label></div><div className="upload-field"><div className="upload-icon"><Plus size={17} /></div><div><b>Add your logo or photos</b><span>PNG, JPG up to 5MB each</span></div><button onClick={() => onToast('Image upload is ready for the next step')}>Browse files</button></div><button className="button button-orange full-width" onClick={saveProject}>Save and continue <ArrowRight size={16} /></button></div><div className="builder-preview"><div className="preview-toolbar"><span>Live preview</span><div><button className="active"><Monitor size={14} /></button><button><Tablet size={14} /></button><button><Smartphone size={14} /></button></div><button className="preview-expand"><ExternalLink size={14} /></button></div><div className="preview-frame"><div className="website-preview"><div className="website-preview-nav"><b>{businessName.toUpperCase()}</b><div><span>Menu</span><span>Our story</span><span>Visit</span><button>Book a table</button></div></div><div className="website-preview-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(14,21,35,.78), rgba(14,21,35,.18)), url(${template.thumbnail_url})` }}><div><small>EST. 2014 · {businessName.toUpperCase()}</small><h2>{tagline.split('. ')[0] || tagline}</h2><p>{about}</p><button>Discover more <ArrowRight size={13} /></button></div></div><div className="website-preview-content"><div><small>THE GOOD STUFF</small><h3>Made with care,<br /><em>served with feeling.</em></h3></div><div className="preview-lines"><span /><span /><span /></div></div></div></div></div></div></section></div></main>; }

function Dashboard() { const navigate = useNavigate(); return <main className="app-page section-pad"><div className="container app-shell"><aside className="app-sidebar"><div className="app-user"><div className="avatar">A</div><div><b>Arjun Mehta</b><span>Customer workspace</span></div></div>{[[LayoutDashboard, 'Overview'], [Monitor, 'My websites'], [FileText, 'Orders'], [Download, 'Downloads'], [Rocket, 'Deployments'], [LifeBuoy, 'Support']].map(([Icon, label], i) => <button className={i === 0 ? 'active' : ''} key={label}><Icon size={16} />{label}</button>)}<div className="app-sidebar-bottom"><button onClick={() => navigate('/')}><HomeIcon size={16} />Back to marketplace</button></div></aside><section className="app-content"><div className="app-topbar"><div><span className="crumb">Customer workspace</span><h1>Good morning, Arjun.</h1></div><div className="app-top-actions"><button className="icon-button"><Bell size={18} /></button><button className="button button-dark button-small" onClick={() => navigate('/templates')}><Plus size={15} /> New website</button></div></div><div className="dashboard-banner"><div><div className="eyebrow eyebrow-light">Keep going</div><h2>Your next website is closer than you think.</h2><p>Finish your draft to see it across desktop, tablet, and mobile.</p><button className="button button-orange button-small" onClick={() => navigate('/builder/1')}>Continue draft <ArrowRight size={14} /></button></div><div className="progress-ring"><strong>40%</strong><span>complete</span></div></div><div className="stats-grid"><StatCard label="Active websites" value="1" icon={Monitor} detail="1 draft in progress" /><StatCard label="Orders" value="0" icon={FileText} detail="Nothing paid yet" /><StatCard label="Downloads" value="0" icon={Download} detail="Available after purchase" /><StatCard label="Support" value="Open" icon={LifeBuoy} detail="We’re here when you need us" /></div><div className="dashboard-columns"><div className="dashboard-panel"><div className="panel-heading"><div><span className="eyebrow">Your websites</span><h2>Project workspace</h2></div><button className="text-link" onClick={() => navigate('/builder/1')}>Open draft <ArrowRight size={14} /></button></div><div className="project-row"><div className="project-thumb" style={{ backgroundImage: `url(${demoTemplates[0].thumbnail_url})` }}><span>Draft</span></div><div className="project-info"><b>Saffron Table website</b><span>Saffron Table · Static Website</span><div className="progress-line"><i style={{ width: '40%' }} /></div><small>Last edited just now</small></div><button className="icon-button" onClick={() => navigate('/builder/1')}><ArrowUpRight size={17} /></button></div></div><div className="dashboard-panel quick-panel"><div className="panel-heading"><div><span className="eyebrow">Next steps</span><h2>Make it launch-ready.</h2></div></div><div className="next-step"><span>01</span><div><b>Add your business photos</b><small>Show people what makes you different.</small></div><ArrowRight size={15} /></div><div className="next-step"><span>02</span><div><b>Review your mobile preview</b><small>Most of your customers will see this first.</small></div><ArrowRight size={15} /></div></div></div></section></div></main>; }

function StatCard({ label, value, icon: Icon, detail }) { return <div className="stat-card"><div className="stat-icon"><Icon size={17} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }

function Admin() { const [overview, setOverview] = useState({ customers: 0, templates: 6, projects: 0, enquiries: 0 }); useEffect(() => { fetch(`${API}/admin/overview`).then((r) => r.ok ? r.json() : Promise.reject()).then(setOverview).catch(() => undefined); }, []); return <main className="app-page section-pad"><div className="container app-shell"><aside className="app-sidebar admin-sidebar"><div className="admin-lock"><span className="brand-mark">wg</span><div><b>Web Guruji</b><span>Admin console</span></div></div>{[[LayoutDashboard, 'Overview'], [Store, 'Templates'], [Building2, 'Categories'], [FileText, 'Orders'], [Rocket, 'Deployments'], [BarChart3, 'Reports'], [ShieldCheck, 'Settings']].map(([Icon, label], i) => <button className={i === 0 ? 'active' : ''} key={label}><Icon size={16} />{label}</button>)}</aside><section className="app-content"><div className="app-topbar"><div><span className="crumb">Admin / Overview</span><h1>Good morning, team.</h1></div><span className="admin-badge"><ShieldCheck size={14} /> Protected console</span></div><div className="admin-stats stats-grid"><StatCard label="Customers" value={overview.customers} icon={Building2} detail="Registered accounts" /><StatCard label="Templates" value={overview.templates} icon={Store} detail="Published and demo" /><StatCard label="Projects" value={overview.projects} icon={Monitor} detail="Website drafts" /><StatCard label="Enquiries" value={overview.enquiries} icon={MessageCircle} detail="Needs a response" /></div><div className="admin-content-grid"><div className="dashboard-panel"><div className="panel-heading"><div><span className="eyebrow">Marketplace health</span><h2>Keep the shelf useful.</h2></div><button className="button button-outline button-small">Manage templates <ArrowRight size={14} /></button></div><div className="chart-placeholder"><div className="chart-axis"><span>12</span><span>9</span><span>6</span><span>3</span><span>0</span></div><div className="bars">{[38, 56, 47, 72, 61, 84, 68, 92, 78, 87, 74, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div></div></div><div className="dashboard-panel admin-list"><div className="panel-heading"><div><span className="eyebrow">Review queue</span><h2>Nothing waiting.</h2></div><Clock3 size={18} /></div><div className="empty-mini"><Check size={19} /><p>New enquiries and deployment requests will appear here.</p></div></div></div></section></div></main>; }

function AccountModal({ onClose, onToast }) { const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [mode, setMode] = useState('login'); const submit = async (event) => { event.preventDefault(); try { const response = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name || 'Web Guruji customer', email }) }); if (!response.ok) throw new Error(); onToast('Workspace created — welcome to Web Guruji'); onClose(); } catch { onToast('Connect the API to create your workspace'); } }; return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="account-modal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="modal-mark"><span className="brand-mark">wg</span></div><div className="eyebrow">Your website workspace</div><h2>{mode === 'login' ? 'Welcome back.' : 'Start building.'}</h2><p>{mode === 'login' ? 'Log in to pick up where you left off.' : 'Create a workspace for your first website.'}</p><form onSubmit={submit}>{mode === 'register' && <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Mehta" required /></label>}<label>Email address<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@business.com" required /></label><button className="button button-orange full-width">{mode === 'login' ? 'Continue with email' : 'Create workspace'} <ArrowRight size={15} /></button></form><button className="modal-switch" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Log in'}</button></motion.div></motion.div>; }

function SiteFooter() { const navigate = useNavigate(); return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><button className="brand brand-light" onClick={() => navigate('/')}><span className="brand-mark">wg</span><span>web<span>guruji</span></span></button><p>Your business. Your website.<br />Made simple.</p><div className="footer-social"><button>in</button><button>ig</button><button>wa</button></div></div><div><b>Explore</b><a href="/templates">Templates</a><a href="/pricing">Pricing</a><a href="/#how-it-works">How it works</a><a href="/#services">Services</a></div><div><b>For businesses</b><a href="/templates?category=restaurants">Restaurants</a><a href="/templates?category=salons">Salons & beauty</a><a href="/templates?category=construction">Construction</a><a href="/templates?category=clinics">Clinics</a></div><div><b>Need help?</b><a href="mailto:hello@webguruji.in">hello@webguruji.in</a><a href="https://wa.me/919876543210">WhatsApp us</a><a href="/#services">Deployment support</a><a href="/#faqs">FAQs</a></div></div><div className="container footer-bottom"><span>© 2026 Web Guruji. Demo templates are labelled clearly.</span><span>Privacy · Terms · Refund policy</span></div></footer>; }

export default App;

function WhatsAppFloat() {
  const location = useLocation();
  const pageMessage = location.pathname.startsWith('/builder')
    ? 'Hi Web Guruji, I am customizing a website and need help choosing the right package.'
    : location.pathname === '/pricing'
      ? 'Hi Web Guruji, I want help choosing the right website package for my business.'
      : 'Hi Web Guruji, I want to build a professional website for my business.';
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pageMessage)}`;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer"><span className="whatsapp-pulse" /><MessageCircle size={19} /><span><b>Talk to us on WhatsApp</b><small>Usually the fastest way to start</small></span><ArrowUpRight size={15} /></a>;
}

function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits || WHATSAPP_NUMBER;
}

function PreviewWhatsAppFloat({ number }) {
  const normalized = normalizeWhatsAppNumber(number);
  const href = `https://wa.me/${normalized}?text=${encodeURIComponent('Hi, I would like to know more about this business.')}`;
  return <a className="preview-whatsapp-float" href={href} target="_blank" rel="noreferrer"><span className="whatsapp-pulse" /><MessageCircle size={16} /><span><b>Chat on WhatsApp</b><small>Usually the fastest way to start</small></span><ArrowUpRight size={13} /></a>;
}

function SiteFooterV2() {
  const navigate = useNavigate();
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><button className="brand brand-light" onClick={() => navigate('/')}><span className="brand-mark">wg</span><span>web<span>guruji</span></span></button><p>Your business. Your website.<br />Made simple.</p><div className="footer-social"><button>in</button><button>ig</button><a href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="WhatsApp">wa</a></div></div><div><b>Explore</b><a href="/templates">Templates</a><a href="/pricing">Pricing</a><a href="/#how-it-works">How it works</a><a href="/#services">Services</a></div><div><b>For businesses</b><a href="/templates?category=restaurants">Restaurants</a><a href="/templates?category=salons">Salons & beauty</a><a href="/templates?category=construction">Construction</a><a href="/templates?category=clinics">Clinics</a></div><div><b>Need help?</b><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Web Guruji, I would like help with my business website.')}`}>WhatsApp us</a><a href="mailto:hello@webguruji.in">hello@webguruji.in</a><a href="/#services">Deployment support</a><a href="/#faqs">FAQs</a></div></div><div className="container footer-bottom"><span>© 2026 Web Guruji. Demo templates are labelled clearly.</span><span>Privacy · Terms · Refund policy</span></div></footer>;
}

async function launchRazorpayCheckout(order, token, onToast) {
  try {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      await new Promise((resolve, reject) => { script.onload = resolve; script.onerror = reject; });
    }
    const checkout = new window.Razorpay({
      key: order.razorpayKeyId,
      amount: order.amount * 100,
      currency: order.currency,
      name: 'Web Guruji',
      description: 'Website source code',
      order_id: order.razorpayOrderId,
      handler: async (payment) => {
        const response = await fetch(`${API}/payments/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ orderId: order.id, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature }) });
        onToast(response.ok ? 'Payment verified. Your source code is being prepared.' : 'Payment verification failed.');
      },
      theme: { color: '#F28C28' }
    });
    checkout.open();
  } catch { onToast('Could not load Razorpay checkout. Try again or contact support.'); }
}

function AuthModal({ onClose, onToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'login' ? { email, password } : { name, email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not authenticate');
      localStorage.setItem('webguruji_token', data.token);
      localStorage.setItem('webguruji_user', JSON.stringify(data.user));
      onToast(mode === 'login' ? 'Welcome back to your workspace' : 'Workspace created — welcome to Web Guruji');
      onClose();
    } catch (error) { onToast(error.message || 'Could not connect to the API'); }
  };
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="account-modal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="modal-mark"><span className="brand-mark">wg</span></div><div className="eyebrow">Your website workspace</div><h2>{mode === 'login' ? 'Welcome back.' : 'Start building.'}</h2><p>{mode === 'login' ? 'Log in to pick up where you left off.' : 'Create a workspace for your first website.'}</p><form onSubmit={submit}>{mode === 'register' && <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Arjun Mehta" required /></label>}<label>Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@business.com" required /></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="At least 8 characters" minLength="8" required /></label><button className="button button-orange full-width">{mode === 'login' ? 'Continue with email' : 'Create workspace'} <ArrowRight size={15} /></button></form><button className="modal-switch" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Log in'}</button></motion.div></motion.div>;
}

function BuilderV2({ templates, onToast }) {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const template = templates.find((item) => String(item.id) === String(templateId)) || templates[0];
  const [businessName, setBusinessName] = useState('Saffron Table');
  const [tagline, setTagline] = useState('Seasonal plates. Always a reason.');
  const [about, setAbout] = useState('A neighbourhood table built around seasonal produce, honest cooking, and the joy of lingering a little longer.');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Book a table');
  const [mediaIds, setMediaIds] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const packageId = template.pages >= 3 ? 'dynamic-3' : 'static';
  const [projectId, setProjectId] = useState(null);
  const [saved, setSaved] = useState(false);
  const token = localStorage.getItem('webguruji_token');
  const saveProject = async (silent = false) => {
    try {
      const response = await fetch(`${API}/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ templateId: template.id, projectName: `${businessName} website`, businessName, content: { tagline, about, phone, email, city, address, hours, ctaLabel, mediaIds } }) });
      if (!response.ok) throw new Error();
      const data = await response.json(); setProjectId(data.id); setSaved(true); if (!silent) onToast('Draft saved to your project workspace'); return data.id;
    } catch { setSaved(true); if (!silent) onToast('Draft saved locally. Start the API to persist it in MySQL.'); return null; }
  };
  useEffect(() => { if (!token) return undefined; const timer = setTimeout(() => { saveProject(true); }, 900); return () => clearTimeout(timer); }, [businessName, tagline, about, phone, email, city, address, hours, ctaLabel, mediaIds, token]);
  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    if (!token) return onToast('Log in before uploading your logo or images.');
    const currentProjectId = projectId || await saveProject(true);
    if (!currentProjectId) return onToast('Save your draft before uploading images.');
    try {
      for (const file of files) {
        const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
        const response = await fetch(`${API}/uploads`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, filename: file.name, mimeType: file.type, dataBase64: dataUrl }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Upload failed');
        setMediaIds((current) => [...current, data.id]); setMediaPreviews((current) => [...current, { id: data.id, url: dataUrl, name: file.name }]);
      }
      onToast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded to your website`);
    } catch (error) { onToast(error.message || 'Could not upload the image.'); }
    event.target.value = '';
  };
  const removeMedia = async (media) => {
    try {
      const response = await fetch(`${API}/uploads/${media.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Could not remove image');
      setMediaIds((items) => items.filter((id) => String(id) !== String(media.id)));
      setMediaPreviews((items) => items.filter((item) => String(item.id) !== String(media.id)));
      onToast('Image removed from your website');
    } catch (error) { onToast(error.message || 'Could not remove image'); }
  };
  useEffect(() => {
    const row = document.querySelector('.builder-form .media-preview-row');
    if (!row || !mediaPreviews.length) return undefined;
    const images = Array.from(row.querySelectorAll(':scope > img'));
    images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'media-delete';
      button.title = 'Delete image';
      button.setAttribute('aria-label', `Delete ${mediaPreviews[index]?.name || 'image'}`);
      button.innerHTML = '<span aria-hidden="true">x</span>';
      button.addEventListener('click', () => removeMedia(mediaPreviews[index]));
      row.insertBefore(button, image.nextSibling);
    });
    return () => row.querySelectorAll('.media-delete').forEach((button) => button.remove());
  }, [mediaPreviews]);
  const startCheckout = async () => {
    if (!token) return onToast('Log in before starting checkout.');
    let currentProjectId = projectId;
    if (!currentProjectId) currentProjectId = await saveProject();
    if (!currentProjectId) return onToast('Save the draft first, then try checkout again.');
    try {
      const response = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, packageId }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.message);
      onToast(data.razorpayConfigured ? 'Secure checkout is ready.' : 'Order created. Add Razorpay keys to enable checkout.');
    } catch (error) { onToast(error.message || 'Could not create the order.'); }
  };
  return <main className="builder-page"><div className="builder-shell"><aside className="builder-sidebar"><div className="builder-brand"><button className="brand" onClick={() => navigate('/')}><span className="brand-mark">wg</span><span>web<span>guruji</span></span></button><span className="builder-tag">Website builder</span></div><div className="builder-template-mini"><img src={template.thumbnail_url} alt="Selected template" /><div><span>Selected template</span><b>{template.name}</b><button onClick={() => navigate('/templates')}>Change template</button></div></div><div className="builder-step active"><span>01</span><div><b>Your story</b><small>Business details</small></div><Check size={16} /></div><div className="builder-step"><span>02</span><div><b>Style</b><small>Colours and type</small></div></div><div className="builder-step"><span>03</span><div><b>Preview</b><small>Check every screen</small></div></div><div className="builder-help"><LifeBuoy size={17} /><b>Need a hand?</b><p>Talk to a website specialist at any point.</p><button onClick={() => onToast('A specialist will be in touch soon')}>Talk to the team <ArrowRight size={13} /></button></div></aside><section className="builder-main"><div className="builder-toolbar"><div><span className="crumb">Templates / {template.name}</span><h1>Make it yours.</h1></div><div className="builder-toolbar-actions"><span className={`save-status ${saved ? 'saved' : ''}`}><span />{saved ? 'Saved just now' : 'Unsaved changes'}</span><button className="button button-outline button-small" onClick={saveProject}><Copy size={14} /> Save draft</button><button className="button button-dark button-small" onClick={() => onToast('Preview link copied')}>Share preview <ExternalLink size={14} /></button></div></div><div className="builder-workspace"><div className="builder-form"><div className="form-heading"><div className="eyebrow">Your business</div><h2>Start with the essentials.</h2><p>These details will shape your first preview. You can always come back and edit them.</p></div><label>Business name<input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="e.g. Saffron Table" /></label><label>Short tagline<input value={tagline} onChange={(event) => setTagline(event.target.value)} placeholder="A line your customers will remember" /></label><label>About your business<textarea value={about} onChange={(event) => setAbout(event.target.value)} rows="5" /></label><div className="form-row"><label>Phone number<input placeholder="+91 98765 43210" /></label><label>City<input placeholder="Pune, Maharashtra" /></label></div><label>Choose a package<select value={packageId} onChange={(event) => setPackageId(event.target.value)}><option value="static">1 page — ₹1,000</option><option value="dynamic-3">3 pages — ₹1,500</option><option value="dynamic-5">5 pages — ₹2,000</option></select></label><div className="upload-field"><div className="upload-icon"><Plus size={17} /></div><div><b>Add your logo or photos</b><span>PNG, JPG up to 5MB each</span></div><button onClick={() => onToast('Image upload is ready for the next step')}>Browse files</button></div><div className="builder-purchase"><div><b>Ready to move forward?</b><span>Server validates the package price before creating an order.</span></div><button className="button button-orange" onClick={startCheckout}>Start checkout <ArrowRight size={15} /></button></div><button className="button button-outline full-width" onClick={saveProject}>Save draft <Copy size={15} /></button></div><div className="builder-preview"><div className="preview-toolbar"><span>Live preview</span><div><button className="active"><Monitor size={14} /></button><button><Tablet size={14} /></button><button><Smartphone size={14} /></button></div><button className="preview-expand"><ExternalLink size={14} /></button></div><div className="preview-frame"><div className="website-preview"><div className="website-preview-nav"><b>{businessName.toUpperCase()}</b><div><span>Menu</span><span>Our story</span><span>Visit</span><button>Book a table</button></div></div><div className="website-preview-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(14,21,35,.78), rgba(14,21,35,.18)), url(${template.thumbnail_url})` }}><div><small>EST. 2014 · {businessName.toUpperCase()}</small><h2>{tagline.split('. ')[0] || tagline}</h2><p>{about}</p><button>Discover more <ArrowRight size={13} /></button></div></div><div className="website-preview-content"><div><small>THE GOOD STUFF</small><h3>Made with care,<br /><em>served with feeling.</em></h3></div><div className="preview-lines"><span /><span /><span /></div></div></div></div></div></div></section></div></main>;
}

function BuilderV3({ templates, onToast }) {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const template = templates.find((item) => String(item.id) === String(templateId)) || templates[0];
  const token = localStorage.getItem('webguruji_token');
  const [businessName, setBusinessName] = useState('Saffron Table');
  const [tagline, setTagline] = useState('Seasonal plates. Always a reason.');
  const [about, setAbout] = useState('A neighbourhood table built around seasonal produce, honest cooking, and the joy of lingering a little longer.');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Book a table');
  const [packageId, setPackageId] = useState(template.pages >= 5 ? 'dynamic-5' : template.pages >= 3 ? 'dynamic-3' : 'static');
  const [projectId, setProjectId] = useState(null);
  const [mediaIds, setMediaIds] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [saved, setSaved] = useState(false);
  const saveProject = async (silent = false) => {
    try {
      const body = { templateId: template.id, projectName: `${businessName} website`, businessName, content: { tagline, about, phone, email, city, address, hours, ctaLabel, mediaIds } };
      const response = await fetch(projectId ? `${API}/projects/${projectId}` : `${API}/projects`, { method: projectId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
      if (!response.ok) throw new Error();
      const data = await response.json(); setProjectId(data.id); setSaved(true); if (!silent) onToast('All website content saved'); return data.id;
    } catch { if (!silent) onToast('Connect the API to save website content'); return null; }
  };
  useEffect(() => { if (!token) return undefined; const timer = setTimeout(() => saveProject(true), 900); return () => clearTimeout(timer); }, [businessName, tagline, about, phone, email, city, address, hours, ctaLabel, mediaIds, token]);
  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []); if (!files.length) return;
    if (!token) return onToast('Log in before uploading your logo or images.');
    const currentProjectId = projectId || await saveProject(true); if (!currentProjectId) return onToast('Save your draft before uploading images.');
    try {
      for (const file of files) {
        const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
        const response = await fetch(`${API}/uploads`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, filename: file.name, mimeType: file.type, dataBase64: dataUrl }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Upload failed');
        setMediaIds((items) => [...items, data.id]); setMediaPreviews((items) => [...items, { id: data.id, url: dataUrl, name: file.name }]);
      }
      onToast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded`);
    } catch (error) { onToast(error.message || 'Could not upload image'); }
    event.target.value = '';
  };
  const startCheckout = async () => {
    if (!token) return onToast('Log in before starting checkout.');
    const currentProjectId = projectId || await saveProject(true); if (!currentProjectId) return onToast('Save your content before checkout.');
    const response = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, packageId }) });
    const data = await response.json(); if (!response.ok) return onToast(data.message || 'Could not create order.');
    if (data.razorpayConfigured) await launchRazorpayCheckout(data, token, onToast); else onToast('Order saved. Add Razorpay keys to enable live payment.');
  };
  const heroImage = mediaPreviews[0]?.url || template.thumbnail_url;
}

function SectionEditorFields({ content, setContent, onUpload, mediaPreviews, onRemove }) {
  const update = (field, value) => setContent((current) => ({ ...current, [field]: value }));
  const updateMenu = (index, field, value) => setContent((current) => ({ ...current, menuItems: current.menuItems.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) }));
  const addMenuItem = () => setContent((current) => ({ ...current, menuItems: [...current.menuItems, { name: 'New dish ' + (current.menuItems.length + 1), description: 'Describe this dish', price: '₹0' }] }));
  return <div className="section-editor-fields"><div className="section-editor-heading"><span className="eyebrow">Maison Aurele sections</span><b>Edit every section</b><small>Changes appear in the preview instantly.</small></div><div className="section-editor-group"><b>About / story section</b><label>Story heading<input value={content.storyTitle} onChange={(event) => update('storyTitle', event.target.value)} /></label><label>Story paragraph<textarea value={content.storyBody} onChange={(event) => update('storyBody', event.target.value)} rows="3" /></label><InlineSectionUpload label="About image" description="Story section image" section="about" onUpload={onUpload} mediaPreviews={mediaPreviews} onRemove={onRemove} /><label>Second story paragraph<textarea value={content.storySecond} onChange={(event) => update('storySecond', event.target.value)} rows="3" /></label></div><div className="section-editor-group"><b>Menu / product section</b><label>Menu introduction<textarea value={content.menuIntro} onChange={(event) => update('menuIntro', event.target.value)} rows="2" /></label>{content.menuItems.map((item, index) => <div className="section-editor-menu-item" key={item.name}><span>Dish {index + 1}</span><label>Name<input value={item.name} onChange={(event) => updateMenu(index, 'name', event.target.value)} /></label><label>Description<input value={item.description} onChange={(event) => updateMenu(index, 'description', event.target.value)} /></label><label>Price<input value={item.price} onChange={(event) => updateMenu(index, 'price', event.target.value)} /></label><InlineSectionUpload label="Dish photo" description="Photo for this dish" section={`dish-${index}`} onUpload={onUpload} mediaPreviews={mediaPreviews} onRemove={onRemove} /></div>)}<button type="button" className="section-editor-add" onClick={addMenuItem}>+ Add new dish</button></div><div className="section-editor-group"><b>Chef section</b><label>Chef quote<input value={content.chefQuote} onChange={(event) => update('chefQuote', event.target.value)} /></label><label>Chef description<textarea value={content.chefBody} onChange={(event) => update('chefBody', event.target.value)} rows="3" /></label></div><div className="section-editor-group"><b>Reservations section</b><label>Reservation heading<input value={content.reservationTitle} onChange={(event) => update('reservationTitle', event.target.value)} /></label><label>Reservation description<textarea value={content.reservationBody} onChange={(event) => update('reservationBody', event.target.value)} rows="3" /></label></div><div className="section-editor-group"><b>Gallery section</b><InlineSectionUpload label="Gallery images" description="Upload one or more gallery images" section="gallery" multiple onUpload={onUpload} mediaPreviews={mediaPreviews} onRemove={onRemove} /></div><div className="section-editor-group"><b>Footer section</b><label>Footer brand name<input value={content.footerTitle} onChange={(event) => update('footerTitle', event.target.value)} /></label><label>Footer description<input value={content.footerTagline} onChange={(event) => update('footerTagline', event.target.value)} /></label></div></div>;
}

function SectionUploadFields({ onUpload }) {
  const fields = [{ id: 'logo', title: 'Logo image', description: 'Your brand mark', multiple: false }, { id: 'hero', title: 'Hero image', description: 'Main opening image', multiple: false }, { id: 'about', title: 'About us image', description: 'Story section image', multiple: false }, { id: 'gallery', title: 'Gallery images', description: 'Upload one or more', multiple: true }];
  return <div className="section-upload-fields"><div className="section-upload-heading"><span className="eyebrow">Website media</span><b>Upload images by section</b><small>Each image appears in its selected section preview.</small></div>{fields.map((field) => <div className="section-upload-row" key={field.id}><div><b>{field.title}</b><small>{field.description}</small></div><label className="upload-button">Choose files<input type="file" accept="image/png,image/jpeg,image/webp" multiple={field.multiple} onChange={(event) => onUpload(event, field.id)} /></label></div>)}</div>;
}

function InlineSectionUpload({ label, description, section, onUpload, onRemove, mediaPreviews = [], multiple = false }) {
  const sectionMedia = mediaPreviews.filter((media) => media.section === section);
  const actionLabel = sectionMedia.length && !multiple ? 'Update image' : sectionMedia.length ? 'Add more' : 'Choose files';
  return <div className={`inline-section-upload ${sectionMedia.length ? 'has-upload' : ''}`}><div className="inline-section-upload-copy"><b>{label}</b><small>{description}</small></div>{sectionMedia.length > 0 && <div className="inline-section-media">{sectionMedia.map((media) => <div className="inline-section-media-item" key={media.id}><img src={media.url} alt={media.name} /><button type="button" className="inline-section-delete" onClick={() => onRemove?.(media)}>Delete</button></div>)}</div>}<label className="upload-button">{actionLabel}<input type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} onChange={(event) => onUpload(event, section)} /></label></div>;
}

function CategorySectionFields({ content, setContent, config, onUpload, mediaPreviews, onRemove }) {
  const update = (field, value) => setContent((current) => ({ ...current, [field]: value }));
  return <div className="section-editor-fields category-section-fields"><div className="section-editor-heading"><span className="eyebrow">{config.serviceLabel}</span><b>Edit your {config.defaultBusinessName} sections</b><small>These fields control the 9+ section one-page preview.</small></div><div className="section-editor-group"><b>About section</b><label>About heading<input value={content.aboutTitle} onChange={(event) => update('aboutTitle', event.target.value)} /></label><label>About paragraph<textarea value={content.aboutBody} onChange={(event) => update('aboutBody', event.target.value)} rows="3" /></label><InlineSectionUpload label="About image" description="Story section image" section="about" onUpload={onUpload} mediaPreviews={mediaPreviews} onRemove={onRemove} /></div><div className="section-editor-group"><b>{config.serviceLabel} section</b><label>Section heading<input value={content.servicesTitle} onChange={(event) => update('servicesTitle', event.target.value)} /></label>{content.services.map((service, index) => <label key={index}>{config.serviceLabel} {index + 1}<input value={service} onChange={(event) => update('services', content.services.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} /></label>)}</div><div className="section-editor-group"><b>Showcase section</b><label>Showcase heading<input value={content.showcaseTitle} onChange={(event) => update('showcaseTitle', event.target.value)} /></label><InlineSectionUpload label="Gallery images" description="Upload one or more showcase images" section="gallery" multiple onUpload={onUpload} mediaPreviews={mediaPreviews} onRemove={onRemove} /></div><div className="section-editor-group"><b>Testimonial section</b><label>Customer quote<textarea value={content.testimonial} onChange={(event) => update('testimonial', event.target.value)} rows="3" /></label></div><div className="section-editor-group"><b>FAQ section</b><label>FAQ heading<input value={content.faqTitle} onChange={(event) => update('faqTitle', event.target.value)} /></label><label>FAQ answer<textarea value={content.faqBody} onChange={(event) => update('faqBody', event.target.value)} rows="3" /></label></div><div className="section-editor-group"><b>Footer section</b><label>Footer tagline<input value={content.footerTagline} onChange={(event) => update('footerTagline', event.target.value)} /></label></div></div>;
}

function BuilderV4({ templates, onToast }) {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const template = templates.find((item) => String(item.id) === String(templateId)) || templates[0];
  const isRestaurantTemplate = template.category_slug === 'restaurants';
  const isMaisonAurele = template.name === 'Maison Aurele';
  const previewConfig = categoryPreviewConfig[template.category_slug] || categoryPreviewConfig['professional-services'];
  const token = localStorage.getItem('webguruji_token');
  const [businessName, setBusinessName] = useState(isMaisonAurele ? 'Maison Aurele' : previewConfig.defaultBusinessName);
  const [tagline, setTagline] = useState(isMaisonAurele ? 'An experience beyond taste.' : previewConfig.defaultTagline);
  const [about, setAbout] = useState(isMaisonAurele ? 'A contemporary fine-dining restaurant offering seasonal tasting menus, a curated cellar and intimate evenings.' : previewConfig.defaultAbout);
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [hours, setHours] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Book a table');
  const packageId = template.pages >= 3 ? 'dynamic-3' : 'static';
  const [projectId, setProjectId] = useState(null);
  const [mediaIds, setMediaIds] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [categoryContent, setCategoryContent] = useState(() => categoryEditorDefaults(template.category_slug));
  const [sectionContent, setSectionContent] = useState({ storyTitle: 'A house built on quiet obsession.', storyBody: 'Founded by Chef Julien Aurele in a former 19th-century atelier, our dining room was conceived as a place where time slows and every detail is considered.', storySecond: 'We cook with what the season gives - line-caught fish from Brittany, herbs from our own garden in the Loire - and serve it with the warmth of a private home.', menuIntro: 'A glimpse of our autumn tasting menu - nine courses, each a small story.', menuItems: [{ name: 'Hokkaido Scallop', description: 'Beurre blanc, Oscietra caviar, garden herbs', price: '₹3,800' }, { name: 'Brittany Lobster', description: 'Butter-poached tail, saffron emulsion, amaranth', price: '₹6,400' }, { name: 'Grand Cru Sphere', description: 'Valrhona chocolate, cocoa soil, 24k gold leaf', price: '₹2,400' }], chefQuote: '“Simplicity is the final refinement.”', chefBody: "Chef Julien's philosophy is restraint: three elements on a plate, each allowed to speak clearly.", reservationTitle: 'Reserve your evening.', reservationBody: 'Tables are released thirty days in advance. For parties larger than eight or private dining, please call us directly.', footerTitle: 'Maison Aurele', footerTagline: 'Contemporary French fine dining' });
  const [saved, setSaved] = useState(false);
  const saveProject = async (silent = false) => {
    try {
      const body = { templateId: template.id, projectName: `${businessName} website`, businessName, content: { tagline, about, phone, whatsappNumber, email, city, address, mapUrl, hours, ctaLabel, mediaIds, mediaAssets: mediaPreviews.map(({ id, name, section }) => ({ id, name, section })), sectionContent, categoryContent } };
      const response = await fetch(projectId ? `${API}/projects/${projectId}` : `${API}/projects`, { method: projectId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
      if (!response.ok) throw new Error(); const data = await response.json(); setProjectId(data.id); setSaved(true); if (!silent) onToast('Full website draft saved'); return data.id;
    } catch { if (!silent) onToast('Connect the API to save your website'); return null; }
  };
  useEffect(() => { if (!token) return undefined; const timer = setTimeout(() => saveProject(true), 900); return () => clearTimeout(timer); }, [businessName, tagline, about, phone, whatsappNumber, email, city, address, mapUrl, hours, ctaLabel, mediaIds, mediaPreviews, sectionContent, categoryContent, token]);
  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []); if (!files.length) return;
    if (!token) return onToast('Log in before uploading your logo or images.');
    const currentProjectId = projectId || await saveProject(true); if (!currentProjectId) return onToast('Save your draft before uploading images.');
    try {
      for (const file of files) {
        const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
        const response = await fetch(`${API}/uploads`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, filename: file.name, mimeType: file.type, dataBase64: dataUrl }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Upload failed'); setMediaIds((items) => [...items, data.id]); setMediaPreviews((items) => [...items, { id: data.id, url: dataUrl, name: file.name }]);
      }
      onToast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded to the full website`);
    } catch (error) { onToast(error.message || 'Could not upload image'); }
    event.target.value = '';
  };
  const handleSectionUpload = async (event, section) => {
    const files = Array.from(event.target.files || []); if (!files.length) return;
    if (!token) return onToast('Log in before uploading your logo or images.');
    const currentProjectId = projectId || await saveProject(true); if (!currentProjectId) return onToast('Save your draft before uploading images.');
    const uploaded = [];
    try {
      for (const file of files) {
        const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
        const response = await fetch(`${API}/uploads`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, filename: file.name, mimeType: file.type, dataBase64: dataUrl }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Upload failed'); uploaded.push({ id: data.id, url: dataUrl, name: file.name, section });
      }
      const previous = mediaPreviews.filter((media) => media.section === section && section !== 'gallery');
      await Promise.all(previous.map((media) => fetch(`${API}/uploads/${media.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })));
      const next = section === 'gallery' ? uploaded : uploaded.slice(-1);
      setMediaIds((items) => { const previousIds = new Set(previous.map((media) => String(media.id))); const kept = items.filter((id) => !previousIds.has(String(id))); return [...kept, ...next.map((media) => media.id)]; });
      setMediaPreviews((items) => { const kept = section === 'gallery' ? items : items.filter((media) => media.section !== section); return [...kept, ...next]; });
      onToast(`${files.length} image${files.length > 1 ? 's' : ''} added to the ${section} section`);
    } catch (error) { onToast(error.message || 'Could not upload image'); }
    event.target.value = '';
  };
  const removeMedia = async (media) => {
    try {
      const response = await fetch(`${API}/uploads/${media.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Could not remove image');
      setMediaIds((items) => items.filter((id) => String(id) !== String(media.id)));
      setMediaPreviews((items) => items.filter((item) => String(item.id) !== String(media.id)));
      onToast('Image removed from your website');
    } catch (error) { onToast(error.message || 'Could not remove image'); }
  };
  const startCheckout = async () => {
    if (!token) return onToast('Log in before starting checkout.');
    const currentProjectId = projectId || await saveProject(true); if (!currentProjectId) return onToast('Save your website content before checkout.');
    const response = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ projectId: currentProjectId, packageId }) });
    const data = await response.json(); if (!response.ok) return onToast(data.message || 'Could not create order.');
    if (data.razorpayConfigured) await launchRazorpayCheckout(data, token, onToast); else onToast('Order saved. Add Razorpay keys to enable live payment.');
  };
  return <main className="builder-page"><div className="builder-shell"><aside className="builder-sidebar"><div className="builder-brand"><button className="brand" onClick={() => navigate('/')}><span className="brand-mark">wg</span><span>web<span>guruji</span></span></button><span className="builder-tag">Full website builder</span></div><div className="builder-template-mini"><img src={template.thumbnail_url} alt="Selected template" /><div><span>Selected template</span><b>{template.name}</b><button onClick={() => navigate('/templates')}>Change template</button></div></div><div className="builder-step active"><span>01</span><div><b>Full website content</b><small>Text, contact and media</small></div><Check size={16} /></div><div className="builder-step"><span>02</span><div><b>{isRestaurantTemplate ? 'Menu and reservations' : '8-section homepage'}</b><small>{isRestaurantTemplate ? 'Customer-ready booking form' : '6-section About page'}</small></div></div><div className="builder-step"><span>03</span><div><b>Automatic delivery</b><small>Preview, pay, download</small></div></div><div className="builder-help"><LifeBuoy size={17} /><b>Need a hand?</b><p>Ask a specialist while you build.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Web Guruji, I need help building my full website.')}`}>Talk to the team <ArrowRight size={13} /></a></div></aside><section className="builder-main"><div className="builder-toolbar"><div><span className="crumb">Templates / {template.name}</span><h1>Build the complete story.</h1></div><div className="builder-toolbar-actions"><span className={`save-status ${saved ? 'saved' : ''}`}><span />{saved ? 'Auto-saved' : 'Live draft'}</span><button className="button button-outline button-small" onClick={() => saveProject()}><Copy size={14} /> Save now</button></div></div><div className="builder-workspace full-builder-workspace"><div className="builder-form"><div className="form-heading"><div className="eyebrow">One form, full website</div><h2>Every section starts here.</h2><p>{isRestaurantTemplate ? 'Add your restaurant details, menu story and customer booking information.' : 'Homepage, About, contact, services, gallery and CTA content are connected to the preview and source code.'}</p></div><label>Business name<input value={businessName} onChange={(event) => setBusinessName(event.target.value)} /></label><InlineSectionUpload label="Logo image" description="Your brand mark" section="logo" onUpload={handleSectionUpload} mediaPreviews={mediaPreviews} onRemove={removeMedia} /><label>Tagline<input value={tagline} onChange={(event) => setTagline(event.target.value)} /></label><InlineSectionUpload label="Hero image" description="Main opening image" section="hero" onUpload={handleSectionUpload} mediaPreviews={mediaPreviews} onRemove={removeMedia} /><label>About / story<textarea value={about} onChange={(event) => setAbout(event.target.value)} rows="4" /></label><div className="form-row"><label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 84460 79635" /></label><label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="hello@business.com" /></label></div><label>WhatsApp number<input value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value)} placeholder="+91 84460 79635" /><small className="form-hint">This number powers the floating WhatsApp button in the live preview.</small></label><div className="form-row"><label>City<input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Pune" /></label><label>Opening hours<input value={hours} onChange={(event) => setHours(event.target.value)} placeholder="Mon-Sat · 10:00-20:00" /></label></div><label>Address<input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Complete business address" /></label><label>Map embed/link<input value={mapUrl} onChange={(event) => setMapUrl(event.target.value)} placeholder="https://www.google.com/maps/embed?..." /><small className="form-hint">Paste a Google Maps embed URL. A map is generated from your address if left empty.</small></label><label>Primary button text<input value={ctaLabel} onChange={(event) => setCtaLabel(event.target.value)} placeholder="Book a table" /></label>{isMaisonAurele ? <SectionEditorFields content={sectionContent} setContent={setSectionContent} onUpload={handleSectionUpload} mediaPreviews={mediaPreviews} onRemove={removeMedia} /> : <CategorySectionFields content={categoryContent} setContent={setCategoryContent} config={previewConfig} onUpload={handleSectionUpload} mediaPreviews={mediaPreviews} onRemove={removeMedia} />}<div className="fixed-package-note"><span>Package</span><b>{template.pages >= 3 ? 'Three-page website — ₹1,500' : 'One-page website — ₹1,000'}</b><small>{template.pages >= 3 ? 'Full three-page website with editable sections' : 'Full one-page website with all sections'}</small></div><div className="builder-purchase"><div><b>Full website, automatic handover</b><span>Source code is generated after verified payment.</span></div><button className="button button-orange" onClick={startCheckout}>Pay and get website <ArrowRight size={15} /></button></div></div><FullWebsitePreview categoryContent={categoryContent} sectionContent={sectionContent} template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} whatsappNumber={whatsappNumber} email={email} city={city} address={address} mapUrl={mapUrl} hours={hours} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} packageId={packageId} /></div></section></div></main>;
}

function CategoryWebsitePreview({ template, businessName, tagline, about, phone, email, city, address, hours, whatsappNumber, ctaLabel, mediaPreviews, categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [sent, setSent] = useState(false);
  const config = categoryPreviewConfig[template.category_slug] || categoryPreviewConfig['professional-services'];
  const logo = mediaPreviews.find((media) => media.section === 'logo')?.url;
  const hero = mediaPreviews.find((media) => media.section === 'hero')?.url || template.thumbnail_url;
  const aboutImage = mediaPreviews.find((media) => media.section === 'about')?.url || mediaPreviews.find((media) => !media.section)?.url || template.thumbnail_url;
  const gallery = mediaPreviews.filter((media) => media.section === 'gallery').map((media) => media.url);
  const galleryImages = gallery.length ? gallery : [template.thumbnail_url, template.thumbnail_url, template.thumbnail_url];
  const goTo = (selector) => document.querySelector(`.category-template-preview ${selector}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return <div className="builder-preview full-site-preview-panel category-template-preview"><div className="preview-toolbar"><span>{template.name} template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-frame full-preview-frame viewport-${viewport}`}><div className="category-template-site"><header className="category-template-nav"><div className="category-template-brand">{logo && <img src={logo} alt="Business logo" />}<b>{businessName}</b></div><nav><button onClick={() => goTo('.category-template-hero')}>Home</button><button onClick={() => goTo('.category-template-about')}>About</button><button onClick={() => goTo('.category-template-services')}>Services</button><button onClick={() => goTo('.category-template-contact')}>Contact</button><button className="category-template-nav-cta" onClick={() => goTo('.category-template-contact')}>{ctaLabel}</button></nav></header><section className="category-template-hero template-animate" style={{ backgroundImage: `linear-gradient(90deg, rgba(14,21,35,.86), rgba(14,21,35,.14)), url(${hero})` }}><small>{config.label}</small><h2>{tagline || config.defaultTagline}</h2><p>{about || config.defaultAbout}</p><div><button onClick={() => goTo('.category-template-contact')}>{ctaLabel} <ArrowRight size={12} /></button><button className="category-template-ghost" onClick={() => goTo('.category-template-services')}>Explore more <ArrowRight size={12} /></button></div></section><section className="category-template-about template-animate"><img src={aboutImage} alt={`${businessName} about`} /><div><small>01 · ABOUT US</small><h3>{categoryContent.aboutTitle}</h3><p>{categoryContent.aboutBody || about}</p><button className="category-template-text-button" onClick={() => goTo('.category-template-contact')}>Start a conversation <ArrowRight size={12} /></button></div></section><section className="category-template-services template-animate"><small>02 · {config.serviceLabel.toUpperCase()}</small><h3>{categoryContent.servicesTitle}</h3><div className="category-template-service-grid">{categoryContent.services.map((service, index) => <article key={`${service}-${index}`}><span>0{index + 1}</span><h4>{service}</h4><p>{config.defaultAbout}</p></article>)}</div></section><section className="category-template-showcase template-animate"><div><small>03 · SHOWCASE</small><h3>{categoryContent.showcaseTitle}</h3><p>See the quality, care and thinking behind the work.</p></div><div className="category-template-gallery">{galleryImages.slice(0, 3).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${businessName} showcase ${index + 1}`} />)}</div></section><section className="category-template-process template-animate"><div><small>04 · OUR APPROACH</small><h3>A clear process from first step to finish.</h3></div><div className="category-template-process-list"><span><b>01</b> Understand the brief</span><span><b>02</b> Shape the right direction</span><span><b>03</b> Deliver with care</span></div></section><section className="category-template-testimonial template-animate"><small>05 · CLIENT NOTE</small><h3>{categoryContent.testimonial}</h3><span>{businessName} customer story</span></section><section className="category-template-faq template-animate"><div><small>06 · FAQ</small><h3>{categoryContent.faqTitle}</h3></div><div><details open><summary>How do we get started?</summary><p>{categoryContent.faqBody}</p></details><details><summary>Can you tailor the experience?</summary><p>Yes. Add your content, images, services and contact details in the form.</p></details><details><summary>Will it work on mobile?</summary><p>Every one-page template is responsive across desktop, tablet and mobile.</p></details></div></section><section className="category-template-contact template-animate"><div><small>07 · CONTACT</small><h3>Ready for the next step?</h3><p>{address || city || 'Tell us where to reach you'}<br />{phone || 'Your phone number'}<br />{email || 'your@email.com'}</p></div><div>{sent ? <div className="category-template-success"><b>Thank you.</b><span>Your enquiry has been received.</span><button onClick={() => setSent(false)}>Send another</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@email.com" /></label><label>Message<textarea required rows="3" placeholder="How can we help?" /></label><button type="submit">Send enquiry <ArrowRight size={12} /></button></form>}</div></section><section className="category-template-cta template-animate"><small>08 · LET'S BEGIN</small><h3>Make your next move feel considered.</h3><button onClick={() => goTo('.category-template-contact')}>{ctaLabel} <ArrowRight size={13} /></button></section><footer className="category-template-footer"><b>{businessName}</b><span>{categoryContent.footerTagline}</span><button onClick={() => goTo('.category-template-hero')}>Back to top ↑</button></footer></div><PreviewWhatsAppFloat number={whatsappNumber} /></div></div>;
}

function CategoryThreePagePreview({ template, businessName, tagline, about, phone, email, city, address, mapUrl, whatsappNumber, ctaLabel, mediaPreviews, categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [page, setPage] = useState('home');
  const [sent, setSent] = useState(false);
  const config = categoryPreviewConfig[template.category_slug] || categoryPreviewConfig['professional-services'];
  const content = categoryContent || {};
  const logo = mediaPreviews.find((media) => media.section === 'logo')?.url;
  const hero = mediaPreviews.find((media) => media.section === 'hero')?.url || template.thumbnail_url;
  const aboutImage = mediaPreviews.find((media) => media.section === 'about')?.url || template.thumbnail_url;
  const gallery = mediaPreviews.filter((media) => media.section === 'gallery').map((media) => media.url);
  const galleryImages = gallery.length ? gallery : [template.thumbnail_url, template.thumbnail_url, template.thumbnail_url];
  const tabs = [{ id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }];
  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.setTimeout(() => document.querySelector('.category-three-page-preview .full-preview-frame')?.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };
  const goToContact = () => goToPage('contact');
  const services = content.services || ['Strategy', 'Design', 'Delivery'];
  const mapQuery = [address, city].filter(Boolean).join(', ') || businessName;
  const fallbackMapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&output=embed';
  const safeMapUrl = /^https?:\/\//i.test(mapUrl || '') ? mapUrl : '';
  const mapSrc = safeMapUrl && (/google\.com\/maps\/embed|[?&]output=embed/i.test(safeMapUrl) || /openstreetmap\.org/i.test(safeMapUrl)) ? safeMapUrl : fallbackMapEmbed;
  const mapLink = safeMapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapQuery);
  const nav = <nav><button onClick={() => goToPage('home')}>Home</button><button onClick={() => goToPage('about')}>About</button><button onClick={() => goToPage('contact')}>Contact</button><button className="category-template-nav-cta" onClick={goToContact}>{ctaLabel}</button></nav>;

  return <div className="builder-preview full-site-preview-panel category-template-preview category-three-page-preview">
    <div className="preview-toolbar"><span>{template.name} · 3-page template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div>
    <div className="preview-page-tabs">{tabs.map((tab) => <button key={tab.id} className={page === tab.id ? 'active' : ''} onClick={() => goToPage(tab.id)}>{tab.label}</button>)}</div>
    <div className={'preview-frame full-preview-frame viewport-' + viewport}>
      <div className="category-template-site">
        <header className="category-template-nav"><div className="category-template-brand">{logo && <img src={logo} alt="Business logo" />}<b>{businessName}</b></div>{nav}</header>

        {page === 'home' && <>
          <section className="category-template-hero template-animate" style={{ backgroundImage: 'linear-gradient(90deg, rgba(14,21,35,.86), rgba(14,21,35,.14)), url(' + hero + ')' }}><small>{config.label}</small><h2>{tagline || config.defaultTagline}</h2><p>{about || config.defaultAbout}</p><div><button onClick={goToContact}>{ctaLabel} <ArrowRight size={12} /></button><button className="category-template-ghost" onClick={() => goToPage('about')}>Our story <ArrowRight size={12} /></button></div></section>
          <section className="category-template-proof template-animate"><div><small>01 · A CLEAR START</small><h3>A better first impression, built around your business.</h3><p>{config.defaultAbout}</p></div><div className="category-template-proof-grid"><article><b>01</b><strong>Clear direction</strong><span>Content and structure that make the next step obvious.</span></article><article><b>02</b><strong>Responsive by default</strong><span>A considered experience on every screen size.</span></article><article><b>03</b><strong>Ready to enquire</strong><span>Simple calls to action that help people reach you.</span></article></div></section>
          <section className="category-template-services template-animate"><small>02 · {(config.serviceLabel || 'SERVICES').toUpperCase()}</small><h3>{content.servicesTitle || 'What we do best.'}</h3><div className="category-template-service-grid">{services.map((service, index) => <article key={service + index}><span>0{index + 1}</span><h4>{service}</h4><p>{config.defaultAbout}</p></article>)}</div></section>
          <section className="category-template-showcase template-animate"><div><small>03 · SHOWCASE</small><h3>{content.showcaseTitle || 'A closer look at the work.'}</h3><p>Explore the work, details and thinking behind the business.</p></div><div className="category-template-gallery">{galleryImages.slice(0, 3).map((image, index) => <img key={image + index} src={image} alt={businessName + ' showcase ' + (index + 1)} />)}</div></section>
          <section className="category-template-process template-animate"><div><small>04 · OUR APPROACH</small><h3>A clear process from first step to finish.</h3></div><div className="category-template-process-list"><span><b>01</b> Understand the brief</span><span><b>02</b> Shape the right direction</span><span><b>03</b> Deliver with care</span></div></section>
          <section className="category-template-testimonial template-animate"><small>05 · CLIENT NOTE</small><h3>{content.testimonial || 'The experience felt clear, thoughtful and made for real people.'}</h3><span>{businessName} customer story</span></section>
          <section className="category-template-faq template-animate"><div><small>06 · FAQ</small><h3>{content.faqTitle || 'A few useful answers.'}</h3></div><div><details open><summary>How do we get started?</summary><p>{content.faqBody || config.defaultAbout}</p></details><details><summary>Can you tailor the experience?</summary><p>Yes. Add your content, images, services and contact details in the form.</p></details></div></section>
          <section className="category-template-cta template-animate"><small>07 · LET'S BEGIN</small><h3>Make your next move feel considered.</h3><p>Tell us what you are building and we will help you take the next step.</p><button onClick={goToContact}>{ctaLabel} <ArrowRight size={13} /></button></section>
        </>}

        {page === 'about' && <>
          <section className="category-template-about template-animate"><img src={aboutImage} alt={businessName + ' about'} /><div><small>01 · ABOUT US</small><h3>{content.aboutTitle || 'Built with care and a clear point of view.'}</h3><p>{content.aboutBody || about || config.defaultAbout}</p><button className="category-template-text-button" onClick={goToContact}>Start a conversation <ArrowRight size={12} /></button></div></section>
          <section className="category-template-values template-animate"><small>02 · WHAT WE VALUE</small><h3>Good work is built on good principles.</h3><div className="category-template-value-grid"><article><b>01</b><h4>Thoughtful details</h4><p>Every choice should make the experience clearer and more useful.</p></article><article><b>02</b><h4>Human connection</h4><p>Technology should support the relationship, not get in its way.</p></article><article><b>03</b><h4>Long-term thinking</h4><p>Build a foundation that can grow with the business.</p></article></div></section>
          <section className="category-template-process template-animate"><div><small>03 · OUR APPROACH</small><h3>A clear process from first step to finish.</h3></div><div className="category-template-process-list"><span><b>01</b> Understand the brief</span><span><b>02</b> Shape the right direction</span><span><b>03</b> Deliver with care</span></div></section>
          <section className="category-template-team template-animate"><div><small>04 · THE PEOPLE</small><h3>People who care about the outcome.</h3><p>{config.defaultAbout}</p></div><div className="category-template-team-list"><span><b>Founder</b> Your name and point of view</span><span><b>Team</b> The people behind the work</span><span><b>Craft</b> The standard you hold</span></div></section>
          <section className="category-template-testimonial template-animate"><small>05 · CLIENT NOTE</small><h3>{content.testimonial || 'The experience felt clear, thoughtful and made for real people.'}</h3><span>{businessName} customer story</span></section>
          <section className="category-template-cta template-animate"><small>06 · COME SAY HELLO</small><h3>Ready to start a useful conversation?</h3><button onClick={goToContact}>{ctaLabel} <ArrowRight size={13} /></button></section>
        </>}

        {page === 'contact' && <>
          <section className="category-template-contact-details template-animate"><div><small>01 · CONTACT</small><h3>Let’s make the next step simple.</h3><p>{content.faqBody || config.defaultAbout}</p></div><div className="category-template-contact-meta"><span><b>Phone</b>{phone || 'Your phone number'}</span><span><b>Email</b>{email || 'your@email.com'}</span><span><b>Location</b>{address || city || 'Your business address'}</span></div><div className="category-template-map-wrap"><iframe title={businessName + ' location map'} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><a className="category-template-map-link" href={mapLink} target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={12} /></a></section>
          <section className="category-template-faq template-animate"><div><small>02 · FAQ</small><h3>{content.faqTitle || 'A few useful answers.'}</h3></div><div><details open><summary>How do we get started?</summary><p>{content.faqBody || config.defaultAbout}</p></details><details><summary>Can you tailor the experience?</summary><p>Yes. Add your content, images, services and contact details in the form.</p></details><details><summary>Will it work on mobile?</summary><p>Every template is responsive across desktop, tablet and mobile.</p></details></div></section>
          <section className="category-template-contact template-animate"><div><small>03 · SEND AN ENQUIRY</small><h3>Ready for the next step?</h3><p>{address || city || 'Tell us where to reach you'}<br />{phone || 'Your phone number'}<br />{email || 'your@email.com'}</p></div><div>{sent ? <div className="category-template-success"><b>Thank you.</b><span>Your enquiry has been received.</span><button onClick={() => setSent(false)}>Send another</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@email.com" /></label><label>Message<textarea required rows="3" placeholder="How can we help?" /></label><button type="submit">Send enquiry <ArrowRight size={12} /></button></form>}</div></section>
          <section className="category-template-cta template-animate"><small>04 · LET'S BEGIN</small><h3>We are ready when you are.</h3><button onClick={() => goToPage('home')}>Back to home <ArrowRight size={13} /></button></section>
        </>}

        <footer className="category-template-footer"><b>{businessName}</b><span>{content.footerTagline || 'A considered digital home for your business.'}</span><button onClick={() => goToPage('home')}>Back to home ↑</button></footer>
      </div>
      <PreviewWhatsAppFloat number={whatsappNumber} />
    </div>
  </div>;
}
function FullWebsitePreview({ template, businessName, tagline, about, phone, whatsappNumber, email, city, address, mapUrl, hours, ctaLabel, mediaPreviews, packageId, sectionContent, categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [page, setPage] = useState('home');
  const images = mediaPreviews.length ? mediaPreviews.map((item) => item.url) : [template.thumbnail_url, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'];
  const pageTabs = packageId === 'static' ? [{ id: 'home', label: 'One-page site' }] : [{ id: 'home', label: 'Homepage' }, { id: 'about', label: 'About page' }];
  if (template.name === 'Maison Aurele') return <MaisonAurelePreview businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} hours={hours} ctaLabel={ctaLabel} whatsappNumber={whatsappNumber} mediaPreviews={mediaPreviews} sectionContent={sectionContent} viewport={viewport} setViewport={setViewport} />;
  if (template.pages >= 3) return <CategoryThreePagePreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} mapUrl={mapUrl} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} categoryContent={categoryContent} />;
  return <CategoryWebsitePreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} hours={hours} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} categoryContent={categoryContent} />;
}

function MaisonAurelePreviewStatic({ businessName, tagline, about, phone, email, city, address, hours, ctaLabel, whatsappNumber, viewport, setViewport }) {
  const [booked, setBooked] = useState(false);
  const submitReservation = (event) => { event.preventDefault(); setBooked(true); };
  return <div className="builder-preview full-site-preview-panel maison-preview-panel"><div className="preview-toolbar"><span>Maison Aurele template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-frame full-preview-frame viewport-${viewport}`}><div className="maison-preview-site"><header className="maison-preview-nav"><div><b>{businessName}</b><small>Paris · Est. 2014</small></div><nav><span>Home</span><span>About</span><span>Menu</span><span>Gallery</span><button>{ctaLabel}</button></nav></header><section className="maison-preview-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(12,16,13,.18), rgba(12,16,13,.84)), url(${maisonAureleHero})` }}><div><small>MICHELIN-STARRED · CONTEMPORARY FRENCH</small><h2>An Experience <em>Beyond</em> Taste.</h2><p>{about || 'Twelve tables. One seasonal tasting menu. An evening composed with patience, precision and the finest produce of France.'}</p><div><button>{ctaLabel} <ArrowRight size={11} /></button><button className="maison-preview-ghost">Explore menu <ArrowRight size={11} /></button></div></div></section><section className="maison-preview-about"><div><img src={maisonInterior} alt="Candlelit dining room" /></div><div><small>OUR STORY</small><h3>A house built on <em>quiet</em> obsession.</h3><p>Founded by Chef Julien Aurele in a former 19th-century atelier, our dining room was conceived as a place where time slows and every detail is considered.</p><p>We cook with what the season gives - line-caught fish from Brittany, herbs from our own garden in the Loire - and serve it with the warmth of a private home.</p></div></section><section className="maison-preview-menu"><div className="maison-preview-heading"><div><small>SIGNATURE MENU</small><h3>Plates of the season.</h3></div><p>A glimpse of our autumn tasting menu - nine courses, each a small story.</p></div><div className="maison-dish-grid">{[[maisonDish1, 'Hokkaido Scallop', 'Beurre blanc, Oscietra caviar, garden herbs', '€38'], [maisonDish3, 'Brittany Lobster', 'Butter-poached tail, saffron emulsion, amaranth', '€64'], [maisonDish2, 'Grand Cru Sphere', 'Valrhona chocolate, cocoa soil, 24k gold leaf', '€24']].map(([image, name, description, price]) => <article key={name}><img src={image} alt={name} /><div><h4>{name}</h4><b>{price}</b></div><p>{description}</p></article>)}</div></section><section className="maison-preview-chef"><img src={maisonChef} alt="Chef plating a dish" /><div><small>CHEF'S SPECIAL</small><h3>“Simplicity is the <em>final</em> refinement.”</h3><p>Chef Julien's philosophy is restraint: three elements on a plate, each allowed to speak clearly.</p><span>- Julien Aurele, Chef Patron</span><img src={maisonAmuse} alt="Amuse bouche" /></div></section><section className="maison-preview-gallery"><small>GALLERY</small><h3>Moments at the table.</h3><div>{[[maisonWine, 'Wine being poured'], [maisonDish1, 'Scallop dish'], [maisonInterior, 'Dining room'], [maisonDish2, 'Chocolate dessert'], [maisonAmuse, 'Amuse bouche'], [maisonDish3, 'Lobster dish']].map(([image, alt]) => <img key={alt} src={image} alt={alt} />)}</div></section><section className="maison-preview-reserve"><div><small>RESERVATIONS</small><h3>Reserve your <em>evening.</em></h3><p>Tables are released thirty days in advance. For parties larger than eight or private dining, please call us directly.</p></div><div>{booked ? <div className="maison-preview-success"><small>REQUEST RECEIVED</small><h4>Merci, your table request is on its way.</h4><button onClick={() => setBooked(false)}>Make another booking</button></div> : <form onSubmit={submitReservation}><label>Name<input name="name" required placeholder="Full name" /></label><label>Email<input name="email" type="email" required placeholder="you@email.com" /></label><div><label>Date<input name="date" type="date" required /></label><label>Time<select name="time" defaultValue="" required><option value="" disabled>Select</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option></select></label></div><div><label>Guests<select name="guests" defaultValue="2"><option>2 guests</option><option>4 guests</option><option>6 guests</option><option>8 guests</option></select></label><label>Phone<input name="phone" required placeholder="+33" /></label></div><label>Special requests<textarea name="specialRequests" rows="3" placeholder="Allergies, celebrations or seating preferences" /></label><button type="submit">Reserve now <ArrowRight size={12} /></button></form>}</div></section><section className="maison-preview-contact"><div><small>VISIT US</small><h3>Find your way to us.</h3><p>{address || '14 Rue du Faubourg Saint-Honore'}<br />{city || '75008 Paris, France'}</p></div><div><small>CONTACT</small><p>{phone || '+33 1 42 00 00 00'}<br />{email || 'bonsoir@maisonaurele.com'}</p><p>{hours || 'Tuesday - Saturday · Dinner 18:30 - 23:00'}</p></div></section><footer className="maison-preview-footer"><b>{businessName}</b><span>Contemporary French fine dining</span></footer></div><PreviewWhatsAppFloat number={whatsappNumber} /></div></div>;
}

function MaisonAurelePreview(props) {
  const { tagline, about, mediaPreviews = [], sectionContent = {} } = props;
  useEffect(() => {
    const root = document.querySelector('.maison-preview-panel');
    const title = document.querySelector('.maison-preview-panel .maison-preview-hero h2');
    const story = document.querySelector('.maison-preview-panel .maison-preview-about p');
    const hero = document.querySelector('.maison-preview-panel .maison-preview-hero');
    const galleryImages = document.querySelectorAll('.maison-preview-panel .maison-preview-gallery img');
    const legacyMedia = mediaPreviews.filter((media) => !media.section);
    const heroMedia = mediaPreviews.find((media) => media.section === 'hero') || legacyMedia[0];
    const aboutMedia = mediaPreviews.find((media) => media.section === 'about');
    const galleryMedia = mediaPreviews.filter((media) => media.section === 'gallery');
    const logoMedia = mediaPreviews.find((media) => media.section === 'logo');
    const setText = (selector, value) => { const element = root?.querySelector(selector); if (element && value) element.textContent = value; };
    if (title) title.textContent = tagline || 'An Experience Beyond Taste.';
    if (story) story.textContent = about || 'Founded by Chef Julien Aurele in a former 19th-century atelier, our dining room was conceived as a place where time slows and every detail is considered.';
    setText('.maison-preview-about h3', sectionContent.storyTitle);
    const storyParagraphs = root?.querySelectorAll('.maison-preview-about p');
    if (storyParagraphs?.[1] && sectionContent.storySecond) storyParagraphs[1].textContent = sectionContent.storySecond;
    setText('.maison-preview-heading > p', sectionContent.menuIntro);
    const menuCards = root?.querySelectorAll('.maison-dish-grid article');
    sectionContent.menuItems?.forEach((item, index) => { const card = menuCards?.[index]; if (!card) return; const name = card.querySelector('h4'); const price = card.querySelector('b'); const description = card.querySelector('p'); if (name) name.textContent = item.name; if (price) price.textContent = item.price; if (description) description.textContent = item.description; });
    setText('.maison-preview-chef h3', sectionContent.chefQuote);
    setText('.maison-preview-chef p', sectionContent.chefBody);
    setText('.maison-preview-reserve h3', sectionContent.reservationTitle);
    setText('.maison-preview-reserve > div:first-child p', sectionContent.reservationBody);
    setText('.maison-preview-footer b', sectionContent.footerTitle);
    setText('.maison-preview-footer span', sectionContent.footerTagline);
    if (heroMedia && hero) hero.style.backgroundImage = `linear-gradient(180deg, rgba(12,16,13,.18), rgba(12,16,13,.84)), url(${heroMedia.url})`;
    const aboutImage = root?.querySelector('.maison-preview-about img');
    if (aboutMedia && aboutImage) aboutImage.src = aboutMedia.url;
    const brand = root?.querySelector('.maison-preview-nav > div');
    let logo = brand?.querySelector('.maison-preview-logo');
    if (logoMedia && brand) { if (!logo) { logo = document.createElement('img'); logo.className = 'maison-preview-logo'; brand.prepend(logo); } logo.src = logoMedia.url; logo.alt = 'Business logo'; }
    if (!logoMedia && logo) logo.remove();
    const selectedGallery = galleryMedia.length ? galleryMedia : legacyMedia.slice(1, 7);
    selectedGallery.forEach((media, index) => { if (galleryImages[index]) galleryImages[index].src = media.url; });
  }, [tagline, about, mediaPreviews, sectionContent]);
  useEffect(() => {
    const root = document.querySelector('.maison-preview-panel');
    if (!root) return undefined;
    const goTo = (selector) => (event) => {
      event.preventDefault();
      root.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const bindings = [
      [root.querySelectorAll('.maison-preview-nav nav span')[0], '.maison-preview-site'],
      [root.querySelectorAll('.maison-preview-nav nav span')[1], '.maison-preview-about'],
      [root.querySelectorAll('.maison-preview-nav nav span')[2], '.maison-preview-menu'],
      [root.querySelectorAll('.maison-preview-nav nav span')[3], '.maison-preview-gallery'],
      [root.querySelector('.maison-preview-nav nav button'), '.maison-preview-reserve'],
      [root.querySelectorAll('.maison-preview-hero button')[0], '.maison-preview-reserve'],
      [root.querySelectorAll('.maison-preview-hero button')[1], '.maison-preview-menu'],
    ];
    const listeners = bindings.filter(([button]) => button).map(([button, selector]) => {
      const listener = goTo(selector);
      button.addEventListener('click', listener);
      return [button, listener];
    });
    return () => listeners.forEach(([button, listener]) => button.removeEventListener('click', listener));
  }, []);
  useEffect(() => {
    const root = document.querySelector('.maison-preview-panel');
    const track = root?.querySelector('.maison-dish-grid');
    const items = sectionContent.menuItems || [];
    if (!track) return undefined;
    track.querySelectorAll(':scope > article[aria-hidden="true"]').forEach((card) => card.remove());
    let cards = Array.from(track.querySelectorAll(':scope > article:not([aria-hidden="true"])'));
    if (cards[0]) while (cards.length < items.length) {
      const card = cards[0].cloneNode(true);
      track.appendChild(card);
      cards = Array.from(track.querySelectorAll(':scope > article:not([aria-hidden="true"])'));
    }
    while (cards.length > items.length) {
      cards[cards.length - 1].remove();
      cards = Array.from(track.querySelectorAll(':scope > article:not([aria-hidden="true"])'));
    }
    cards.forEach((card, index) => {
      const item = items[index];
      const name = card.querySelector('h4');
      const price = card.querySelector('b');
      const description = card.querySelector('p');
      if (name) name.textContent = item?.name || '';
      if (price) price.textContent = item?.price || '';
      if (description) description.textContent = item?.description || '';
    });
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.dataset.carouselReady = 'true';
    return undefined;
  }, [sectionContent.menuItems]);
  useEffect(() => {
    const root = document.querySelector('.maison-preview-panel');
    const cards = root?.querySelectorAll('.maison-dish-grid article');
    const itemCount = sectionContent.menuItems?.length || 0;
    if (!cards || !itemCount) return undefined;
    cards.forEach((card, index) => {
      const dish = mediaPreviews.find((media) => media.section === `dish-${index % itemCount}`);
      const image = card.querySelector('img');
      if (dish && image) image.src = dish.url;
    });
    return undefined;
  }, [mediaPreviews, sectionContent.menuItems]);
  return <MaisonAurelePreviewStatic {...props} />;
}

function FullNav({ businessName, ctaLabel, logo }) { return <div className="full-site-nav">{logo ? <img className="preview-logo" src={logo} alt="Logo" /> : <b>{businessName.toUpperCase()}</b>}<div><span>Home</span><span>About</span><span>Services</span><span>Contact</span><button>{ctaLabel}</button></div></div>; }

function AboutPreview({ businessName, about, city, images, ctaLabel }) { return <><FullNav businessName={businessName} ctaLabel={ctaLabel} logo={images[0]} /><section className="about-preview-hero"><small>ABOUT {businessName.toUpperCase()}</small><h2>A business with<br /><em>a reason to exist.</em></h2><p>{about}</p></section><section className="full-section about-story"><small>01 · OUR STORY</small><h3>Built around the people<br />we are here to serve.</h3><p>{about}</p></section><section className="full-section about-values"><small>02 · OUR VALUES</small><div className="about-value-grid"><div><b>01</b><h4>Care in the details</h4><p>Every interaction should feel considered.</p></div><div><b>02</b><h4>Useful by default</h4><p>Make it simple for people to say yes.</p></div><div><b>03</b><h4>Always human</h4><p>Technology should keep the relationship warm.</p></div></div></section><section className="full-section about-image"><img src={images[1]} alt="Business story" /><div><small>03 · THE PLACE</small><h3>A space for the next chapter.</h3><p>{city || 'Your city'} and the people who make it feel like home.</p></div></section><section className="full-section about-team"><small>04 · THE PEOPLE</small><h3>Small team.<br /><em>Big attention.</em></h3><div className="team-lines"><span>Founder / your name</span><span>Team / your people</span><span>Craft / your speciality</span></div></section><section className="full-section about-cta"><small>05 · COME SAY HELLO</small><h3>Ready to make something<br />worth remembering?</h3><button>{ctaLabel}</button></section><footer className="preview-site-footer"><b>{businessName}</b><span>{city || 'Your city'} · Full About page</span></footer></>; }

function AdminV2() {
  const [overview, setOverview] = useState({ customers: 0, templates: 0, projects: 0, enquiries: 0 });
  const [locked, setLocked] = useState(false);
  useEffect(() => { fetch(`${API}/admin/overview`, { headers: { Authorization: `Bearer ${localStorage.getItem('webguruji_token') || ''}` } }).then(async (response) => { if (response.status === 401 || response.status === 403) { setLocked(true); return null; } if (!response.ok) throw new Error(); return response.json(); }).then((data) => data && setOverview(data)).catch(() => setLocked(true)); }, []);
  return <main className="app-page section-pad"><div className="container app-shell"><aside className="app-sidebar admin-sidebar"><div className="admin-lock"><span className="brand-mark">wg</span><div><b>Web Guruji</b><span>Admin console</span></div></div>{[[LayoutDashboard, 'Overview'], [Store, 'Templates'], [Building2, 'Categories'], [FileText, 'Orders'], [Rocket, 'Deployments'], [BarChart3, 'Reports'], [ShieldCheck, 'Settings']].map(([Icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><Icon size={16} />{label}</button>)}</aside><section className="app-content"><div className="app-topbar"><div><span className="crumb">Admin / Overview</span><h1>Good morning, team.</h1></div><span className="admin-badge"><ShieldCheck size={14} /> Protected console</span></div>{locked && <div className="price-disclosure"><ShieldCheck size={19} /><div><b>Admin authentication required.</b><span>Sign in with a user whose database role is <code>admin</code> before viewing live overview data.</span></div></div>}<div className="admin-stats stats-grid"><StatCard label="Customers" value={overview.customers} icon={Building2} detail="Registered accounts" /><StatCard label="Templates" value={overview.templates} icon={Store} detail="Published and demo" /><StatCard label="Projects" value={overview.projects} icon={Monitor} detail="Website drafts" /><StatCard label="Enquiries" value={overview.enquiries} icon={MessageCircle} detail="Needs a response" /></div><div className="admin-content-grid"><div className="dashboard-panel"><div className="panel-heading"><div><span className="eyebrow">Marketplace health</span><h2>Keep the shelf useful.</h2></div><button className="button button-outline button-small">Manage templates <ArrowRight size={14} /></button></div><div className="chart-placeholder"><div className="chart-axis"><span>12</span><span>9</span><span>6</span><span>3</span><span>0</span></div><div className="bars">{[38, 56, 47, 72, 61, 84, 68, 92, 78, 87, 74, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div></div></div><div className="dashboard-panel admin-list"><div className="panel-heading"><div><span className="eyebrow">Review queue</span><h2>{locked ? 'Locked for safety.' : 'Nothing waiting.'}</h2></div><Clock3 size={18} /></div><div className="empty-mini"><Check size={19} /><p>{locked ? 'Live admin records are hidden until authentication succeeds.' : 'New enquiries and deployment requests will appear here.'}</p></div></div></div></section></div></main>;
}

function DashboardV2() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [locked, setLocked] = useState(false);
  const token = localStorage.getItem('webguruji_token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const load = () => { if (!token) return setLocked(true); Promise.all([fetch(`${API}/projects`, { headers }).then((response) => response.ok ? response.json() : Promise.reject()), fetch(`${API}/orders`, { headers }).then((response) => response.ok ? response.json() : Promise.reject()), fetch(`${API}/source-code`, { headers }).then((response) => response.ok ? response.json() : Promise.reject()), fetch(`${API}/deployment-requests`, { headers }).then((response) => response.ok ? response.json() : Promise.reject())]).then(([projectRows, orderRows, artifactRows, deploymentRows]) => { setProjects(projectRows); setOrders(orderRows); setArtifacts(artifactRows); setDeployments(deploymentRows); }).catch(() => setLocked(true)); };
  useEffect(load, []);
  const requestDeployment = async (projectId) => { const response = await fetch(`${API}/deployment-requests`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId, customerName: JSON.parse(localStorage.getItem('webguruji_user') || '{}').name || 'Web Guruji customer', phone: '+91', email: JSON.parse(localStorage.getItem('webguruji_user') || '{}').email || 'customer@example.com', requirements: 'Please contact me about hosting and deployment.' }) }); if (response.ok) load(); };
  return <main className="app-page section-pad"><div className="container app-shell"><aside className="app-sidebar"><div className="app-user"><div className="avatar">A</div><div><b>{JSON.parse(localStorage.getItem('webguruji_user') || '{"name":"Customer"}').name}</b><span>Customer workspace</span></div></div>{[[LayoutDashboard, 'Overview'], [Monitor, 'My websites'], [FileText, 'Orders'], [Download, 'Downloads'], [Rocket, 'Deployments'], [LifeBuoy, 'Support']].map(([Icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><Icon size={16} />{label}</button>)}<div className="app-sidebar-bottom"><button onClick={() => navigate('/')}><HomeIcon size={16} />Back to marketplace</button></div></aside><section className="app-content"><div className="app-topbar"><div><span className="crumb">Customer workspace</span><h1>Your website desk.</h1></div><button className="button button-dark button-small" onClick={() => navigate('/templates')}><Plus size={15} /> New website</button></div>{locked ? <div className="price-disclosure"><ShieldCheck size={19} /><div><b>Log in to see your workspace.</b><span>Your projects, orders, secure downloads, and deployment requests are private.</span></div></div> : <><div className="stats-grid"><StatCard label="Websites" value={projects.length} icon={Monitor} detail="Your private projects" /><StatCard label="Orders" value={orders.length} icon={FileText} detail="Payment history" /><StatCard label="Downloads" value={artifacts.length} icon={Download} detail="Paid source code" /><StatCard label="Deployments" value={deployments.length} icon={Rocket} detail="Launch requests" /></div><div className="dashboard-columns"><div className="dashboard-panel"><div className="panel-heading"><div><span className="eyebrow">Your websites</span><h2>Project workspace</h2></div><button className="text-link" onClick={() => navigate('/builder/1')}>New draft <ArrowRight size={14} /></button></div>{projects.length ? projects.map((project) => <div className="project-row" key={project.id}><div className="project-thumb" style={{ backgroundImage: `url(${project.thumbnail_url})` }}><span>{project.status}</span></div><div className="project-info"><b>{project.project_name}</b><span>{project.template_name}</span><small>{new Date(project.updated_at).toLocaleDateString()}</small></div><button className="button button-outline button-small" onClick={() => requestDeployment(project.id)}>Get live <Rocket size={13} /></button></div>) : <div className="empty-mini"><Monitor size={18} /><p>Your saved builder projects will appear here.</p></div>}</div><div className="dashboard-panel quick-panel"><div className="panel-heading"><div><span className="eyebrow">Secure delivery</span><h2>Your handover.</h2></div><Download size={18} /></div>{artifacts.length ? artifacts.map((artifact) => <div className="next-step" key={artifact.id}><span><Check size={13} /></span><div><b>{artifact.filename}</b><small>{Math.round(artifact.sizeBytes / 1024)} KB · verified artifact</small></div><a className="text-link" href={`${API}/source-code/${artifact.id}/download`} onClick={(event) => { if (!token) event.preventDefault(); }}><Download size={14} /></a></div>) : <div className="empty-mini"><ShieldCheck size={18} /><p>Source-code downloads unlock after verified payment.</p></div>}{deployments.map((deployment) => <div className="next-step" key={deployment.id}><span><Rocket size={13} /></span><div><b>Deployment request</b><small>{deployment.status.replaceAll('_', ' ')}</small></div></div>)}</div></div></>}</section></div></main>;
}
