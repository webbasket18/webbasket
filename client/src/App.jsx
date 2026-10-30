import { useEffect, useMemo, useRef, useState } from 'react';
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

const categoryImagePool = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=82'
];

const extendedCategories = [
  ['Restaurants', 'restaurants', 'Menus, bookings and neighbourhood love.', '#F28C28'],
  ['Cafes & Coffee', 'cafes-coffee', 'Warm spaces for daily rituals and good coffee.', '#B45309'],
  ['Bakeries', 'bakeries', 'Fresh bakes, custom cakes and local orders.', '#D97706'],
  ['Food Trucks', 'food-trucks', 'A bold mobile home for your street-food brand.', '#EA580C'],
  ['Catering', 'catering', 'Turn menus and enquiries into booked events.', '#C2410C'],
  ['Bars & Nightlife', 'bars-nightlife', 'Drinks, events and late-night energy.', '#7C3AED'],
  ['Hotels & Resorts', 'hotels-resorts', 'Show rooms, amenities and direct bookings.', '#0369A1'],
  ['Homestays', 'homestays', 'A welcoming digital front door for your stay.', '#0F766E'],
  ['Travel Agencies', 'travel-agencies', 'Sell journeys with clarity and confidence.', '#0284C7'],
  ['Tour Guides', 'tour-guides', 'Local knowledge packaged for the next adventure.', '#15803D'],
  ['Salons & Beauty', 'salons', 'Service-led spaces with a softer edge.', '#D94680'],
  ['Spas', 'spas', 'Slow down, book easily and feel looked after.', '#BE185D'],
  ['Barbershops', 'barbershops', 'A sharp booking experience for your chair.', '#334155'],
  ['Makeup Artists', 'makeup-artists', 'Portfolio, packages and enquiries in one place.', '#DB2777'],
  ['Gyms & Fitness', 'gyms-fitness', 'Motivate members and fill your classes.', '#DC2626'],
  ['Yoga Studios', 'yoga-studios', 'A calm space for classes, teachers and bookings.', '#0F766E'],
  ['Dance Studios', 'dance-studios', 'Make your classes easy to discover and join.', '#9333EA'],
  ['Photographers', 'photographers', 'Let the work lead and make booking simple.', '#475569'],
  ['Portfolios', 'portfolios', 'Motion-rich homes for designers, artists and makers.', '#575ECF'],
  ['Videographers', 'videographers', 'Showreels, services and production enquiries.', '#1D4ED8'],
  ['Wedding Planners', 'wedding-planners', 'A beautiful home for your celebrations.', '#BE123C'],
  ['Event Management', 'event-management', 'Make every event detail feel considered.', '#7E22CE'],
  ['Florists', 'florists', 'Seasonal arrangements with an easy order flow.', '#16A34A'],
  ['Fashion Boutiques', 'fashion-boutiques', 'Curated collections with a strong point of view.', '#A21CAF'],
  ['Jewellery', 'jewellery', 'Let your pieces shine with a premium storefront.', '#A16207'],
  ['Retail Stores', 'retail-stores', 'A clear digital shelf for products and visits.', '#2563EB'],
  ['E-commerce', 'ecommerce', 'Sell products with a focused, trustworthy shop.', '#1D4ED8'],
  ['Furniture Stores', 'furniture-stores', 'Help customers imagine the piece at home.', '#92400E'],
  ['Interior Design', 'interior-design', 'Case studies and a refined project enquiry path.', '#57534E'],
  ['Architects', 'architects', 'A thoughtful portfolio for spaces and ideas.', '#334155'],
  ['Construction', 'construction', 'Show the work behind the work.', '#2563EB'],
  ['Manufacturing', 'manufacturing', 'Precision-led websites for factories, machinery and engineering teams.', '#0F4C81'],
  ['Plumbers', 'plumbers', 'Get urgent service enquiries to the right place.', '#0369A1'],
  ['Electricians', 'electricians', 'Reliable local service with clear next steps.', '#CA8A04'],
  ['Solar Energy', 'solar-energy', 'Explain clean energy and convert new enquiries.', '#16A34A'],
  ['Landscapers', 'landscapers', 'Outdoor spaces, before-and-afters and quotes.', '#15803D'],
  ['Auto Services', 'auto-services', 'Bookings, services and trust for your garage.', '#475569'],
  ['Car Dealers', 'car-dealers', 'Put the right vehicles in front of buyers.', '#1E40AF'],
  ['Real Estate', 'real-estate', 'Put the right properties forward.', '#7C3AED'],
  ['Property Management', 'property-management', 'A dependable home for owners and residents.', '#4338CA'],
  ['Legal Services', 'legal-services', 'Make specialist guidance easier to understand.', '#1E3A8A'],
  ['Accounting & Tax', 'accounting-tax', 'Clear expertise for confident business decisions.', '#047857'],
  ['Consultants', 'consultants', 'A sharp home for your expertise.', '#475569'],
  ['Marketing Agencies', 'marketing-agencies', 'Turn proof and ideas into better leads.', '#C026D3'],
  ['IT Services', 'it-services', 'Make technical capability easy to trust.', '#2563EB'],
  ['Software Startups', 'software-startups', 'Explain the product and move visitors to action.', '#4F46E5'],
  ['Education & Coaching', 'education-coaching', 'Teach clearly, build trust and fill programmes.', '#0F766E'],
  ['Schools', 'schools', 'A helpful digital welcome for students and families.', '#1D4ED8'],
  ['Childcare', 'childcare', 'A warm, reassuring presence for growing families.', '#EA580C'],
  ['Clinics', 'clinics', 'Clear, calm and easy to trust.', '#0F766E'],
  ['Dentists', 'dentists', 'Appointments and care information without friction.', '#0891B2'],
  ['Hospitals', 'hospitals', 'Important care information with a clear structure.', '#0369A1'],
  ['Physiotherapy', 'physiotherapy', 'Help people understand recovery and book care.', '#16A34A'],
  ['Mental Health', 'mental-health', 'A calm, respectful path to support.', '#7C3AED'],
  ['Veterinary', 'veterinary', 'A friendly home for pets, care and appointments.', '#65A30D'],
  ['Pharmacies', 'pharmacies', 'Helpful services, hours and local access.', '#059669'],
  ['NGOs & Nonprofits', 'ngos', 'Share your mission and make support easy.', '#EA580C'],
  ['Religious Organisations', 'religious-organizations', 'A welcoming hub for community and events.', '#92400E'],
  ['Coworking Spaces', 'coworking', 'Sell the atmosphere, desks and community.', '#7C3AED'],
  ['Logistics', 'logistics', 'A dependable online presence for moving goods.', '#334155'],
  ['Cleaning Services', 'cleaning-services', 'Turn local intent into service enquiries.', '#0284C7'],
  ['Professional Services', 'professional-services', 'A sharp home for your expertise.', '#475569']
].map(([name, slug, description, color], index) => ({ name, slug, icon: String(index + 1).padStart(2, '0'), description, color, image: categoryImagePool[index % categoryImagePool.length] }));

// The expanded catalog keeps every business type discoverable, while each group
// also supplies a distinct visual language and enquiry flow for its template.
const businessCategoryGroups = [
  { name: 'Small & Home-Based Businesses', variant: 'warm', label: 'MADE LOCALLY · PERSONAL SERVICE', formTitle: 'Tell us what you are building.', services: ['Custom orders', 'Local delivery', 'Personal service'], names: 'Home-Based Business|Freelancers|Tailoring & Boutique|Home Bakery|Homemade Food|Tiffin Services|Candle Making|Handmade Crafts|Soap Making|Art & Painting|Gift Shop|Flower Shop|Pickle & Papad Business|Small Grocery Store|Stationery Shop|Mobile Accessories|Beauty Services at Home|Home Cleaning Services|Repair Services|Small Online Store' },
  { name: 'Shops & Retail Businesses', variant: 'retail', label: 'SHOP · DISCOVER · BUY', formTitle: 'Help customers find the right product.', services: ['Featured products', 'Store visits', 'Order enquiries'], names: 'Grocery Store|Supermarket|Departmental Store|Clothing Store|Footwear Store|Electronics Shop|Mobile Shop|Computer Shop|Furniture Store|Hardware Store|Paint Shop|Medical Store|Cosmetics Store|Jewellery Shop|Watch Shop|Toy Shop|Gift Shop|Sports Shop|Book Store|Stationery Store|Home Decor Shop|Kitchenware Store|Automobile Accessories|Pet Shop|Organic Products Store' },
  { name: 'Food & Restaurant Businesses', variant: 'culinary', label: 'FRESH · LOCAL · MADE WITH CARE', formTitle: 'Take a table or order enquiry.', services: ['Signature menu', 'Bookings and orders', 'Private dining'], names: 'Restaurant|Cafe|Coffee Shop|Bakery|Cake Shop|Sweet Shop|Fast Food Shop|Pizza Shop|Burger Shop|Ice Cream Parlour|Juice Centre|Food Truck|Dhaba|Family Restaurant|Fine Dining|Cloud Kitchen|Catering Services|Tiffin Centre|Street Food|Bar & Lounge' },
  { name: 'Beauty, Fashion & Lifestyle', variant: 'editorial', label: 'STYLE · CARE · CONFIDENCE', formTitle: 'Make an appointment or enquiry.', services: ['Signature services', 'Appointments', 'Lookbook and gallery'], names: 'Beauty Salon|Hair Salon|Unisex Salon|Spa|Makeup Artist|Bridal Makeup|Nail Studio|Tattoo Studio|Fashion Boutique|Designer Clothing|Men\'s Grooming|Beauty Academy|Fashion Designer|Mehendi Artist|Skincare Clinic|Wellness Centre' },
  { name: 'Professional & Personal Services', variant: 'blueprint', label: 'EXPERTISE · CLARITY · MOMENTUM', formTitle: 'Start a focused conversation.', services: ['Services and expertise', 'Case studies', 'Discovery call'], names: 'Digital Marketing Agency|Web Design Agency|Graphic Design Studio|SEO Agency|Advertising Agency|IT Services|Software Development|Consultancy|Business Consultant|Chartered Accountant|Tax Consultant|Legal Services|Architect|Interior Designer|Photography Studio|Videography|Event Management|Printing Services|Travel Agency|Recruitment Agency|Real Estate Consultant' },
  { name: 'Education & Training', variant: 'learn', label: 'LEARN · PRACTISE · GROW', formTitle: 'Ask about the next batch.', services: ['Courses and programmes', 'Faculty and outcomes', 'Admissions enquiry'], names: 'School|College|Preschool|Coaching Classes|Tuition Classes|Online Classes|Computer Institute|IT Training Institute|Language Institute|Dance Academy|Music Academy|Art Classes|Yoga Classes|Skill Development Centre|Competitive Exam Coaching|Corporate Training' },
  { name: 'Healthcare & Medical', variant: 'care', label: 'CALM · CLEAR · HUMAN CARE', formTitle: 'Request an appointment.', services: ['Treatments and care', 'Doctors and specialists', 'Appointment booking'], names: 'Hospital|Clinic|Dental Clinic|Eye Clinic|Diagnostic Centre|Pathology Lab|Physiotherapy Centre|Veterinary Clinic|Medical Store|Nursing Home|Healthcare Consultancy|Ambulance Services|Rehabilitation Centre|Dental Hospital|Multispeciality Hospital' },
  { name: 'Construction & Industrial Businesses', variant: 'industrial', label: 'BUILD · SUPPLY · DELIVER', formTitle: 'Send your project requirement.', services: ['Capabilities', 'Projects and supply', 'Quote request'], names: 'Construction Company|Civil Contractor|Interior Contractor|Architecture Firm|Real Estate Developer|Building Material Supplier|Cement Dealer|Steel Supplier|Electrical Contractor|Plumbing Services|Manufacturing Company|Industrial Supplier|Factory|Machinery Manufacturer|Automobile Manufacturer|Packaging Company|Logistics Company|Warehouse|Engineering Company|Infrastructure Company' },
  { name: 'Automobile & Transportation', variant: 'mobility', label: 'MOVE · MAINTAIN · GO FURTHER', formTitle: 'Book a service or ask for a quote.', services: ['Vehicle services', 'Parts and inventory', 'Booking and support'], names: 'Car Dealership|Bike Showroom|Used Car Dealer|Used Bike Dealer|Car Repair Garage|Bike Repair Shop|Car Washing Centre|Car Detailing Studio|Tyre Shop|Automobile Spare Parts|Driving School|Transport Company|Taxi Services|Bus Services|Packers & Movers|Courier Services|Logistics Services' },
  { name: 'Agriculture & Rural Businesses', variant: 'earth', label: 'GROW · HARVEST · SUSTAIN', formTitle: 'Ask about supply and availability.', services: ['Products and produce', 'Seasonal availability', 'Farm enquiry'], names: 'Agriculture Farm|Dairy Farm|Poultry Farm|Fishery|Organic Farming|Plant Nursery|Fertilizer Shop|Seeds Store|Pesticide Shop|Tractor Dealership|Agricultural Equipment|Farm Machinery|Animal Feed Store|Food Processing|Agro Export Business' },
  { name: 'Hospitality & Tourism', variant: 'travel', label: 'STAY · EXPLORE · REMEMBER', formTitle: 'Plan your stay or journey.', services: ['Rooms and experiences', 'Packages and tours', 'Booking enquiry'], names: 'Hotel|Resort|Guest House|Homestay|Hostel|Lodge|Travel Agency|Tour Operator|Adventure Tourism|Holiday Packages|Wedding Resort|Banquet Hall|Convention Centre|Luxury Hotel|Hospitality Group' },
  { name: 'Entertainment, Sports & Events', variant: 'energy', label: 'PLAY · PERFORM · CELEBRATE', formTitle: 'Reserve a place or plan an event.', services: ['Classes and activities', 'Events and bookings', 'Gallery and moments'], names: 'Gym|Fitness Centre|Yoga Studio|Sports Academy|Cricket Academy|Football Academy|Dance Studio|Gaming Zone|Cinema|Event Planner|Wedding Planner|Banquet Hall|Music Studio|Production House|Amusement Park' },
  { name: 'Large Businesses & Enterprises', variant: 'enterprise', label: 'SCALE · OPERATE · LEAD', formTitle: 'Connect with the right team.', services: ['Business divisions', 'Investor and partner relations', 'Corporate enquiry'], names: 'Corporate Company|Multinational Company|Private Limited Company|Public Limited Company|Holding Company|Franchise Business|Retail Chain|Restaurant Chain|Hospital Group|Educational Group|Real Estate Group|Manufacturing Group|Export & Import Company|Financial Services Company|Insurance Company|Banking Institution|Telecom Company|E-commerce Company|Technology Enterprise|Corporate Consulting Firm' },
  { name: 'Online & Digital Businesses', variant: 'digital', label: 'IDEAS · PRODUCTS · EVERYWHERE', formTitle: 'Start your digital journey.', services: ['Product and platform', 'Plans and features', 'Talk to the team'], names: 'E-commerce Store|Dropshipping Business|Online Marketplace|Subscription Business|SaaS Company|Mobile App Company|Digital Products Store|Online Course Platform|Affiliate Marketing|Content Creator|Influencer Brand|YouTube Channel|Online Book Store|Digital Agency|Software Company' },
  { name: 'Other Business Categories', variant: 'community', label: 'PEOPLE · PURPOSE · PROGRESS', formTitle: 'Tell us about your organisation.', services: ['Mission and impact', 'Programs and community', 'Contact and support'], names: 'NGO|Charity Organisation|Religious Organisation|Community Organisation|Government Services|Public Services|Clubs & Associations|Social Enterprises|Non-Profit Organisation|Other Businesses' }
];

function slugifyBusinessName(value) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const businessCategoryCatalog = businessCategoryGroups.flatMap((group, groupIndex) => group.names.split('|').map((name) => ({ ...group, name: name.trim(), slug: slugifyBusinessName(name), groupIndex })));
const uniqueBusinessCategoryCatalog = Array.from(new Map(businessCategoryCatalog.map((item) => [item.slug, item])).values());
const businessCategoryRows = uniqueBusinessCategoryCatalog.map((item, index) => ({ name: item.name, slug: item.slug, icon: String(index + 1).padStart(2, '0'), description: `${item.name} website with focused sections, clear enquiries and WhatsApp contact.`, color: ['#B45309', '#2563EB', '#C2410C', '#D94680', '#0F766E', '#7C3AED', '#0F766E', '#0F4C81', '#475569', '#15803D', '#0369A1', '#DC2626', '#1D4ED8', '#4F46E5', '#92400E'][item.groupIndex], image: categoryImagePool[(index + item.groupIndex) % categoryImagePool.length] }));
const expandedCategories = Array.from(new Map([...extendedCategories, ...businessCategoryRows].map((category) => [category.slug, category])).values());

const portfolioTemplate = {
  id: 70,
  category_name: 'Portfolios',
  category_slug: 'portfolios',
  name: 'Aria Kapoor · Animated Portfolio',
  description: 'A motion-rich designer portfolio with a dark indigo canvas, editorial case studies and animated interactions.',
  pages: 1,
  type: 'Static',
  price: 1000,
  featured: 1,
  demo: true,
  thumbnail_url: 'https://animated-artist-canvas.lovable.app/assets/portrait-CygGq_Uj.jpg',
  palette: 'midnight',
  features: ['Animated hero canvas', 'Selected work gallery', 'Services and contact sections']
};

const manufacturingTemplate = {
  id: 71,
  category_name: 'Manufacturing',
  category_slug: 'manufacturing',
  name: 'Shree Gurukrupa Enterprises',
  description: 'A precision-led industrial website for agricultural machinery components, capabilities and quote enquiries.',
  pages: 3,
  type: 'Dynamic',
  price: 1500,
  featured: 1,
  demo: true,
  thumbnail_url: 'https://forge-field-machinery.lovable.app/assets/factory-wide-banner-Cm8cxQHX.png',
  palette: 'steel',
  features: ['Industrial product catalogue', 'Capabilities and quality story', 'Request-a-quote WhatsApp form']
};

const generatedCategoryTemplates = expandedCategories
  .filter((category) => !demoTemplates.some((template) => template.category_slug === category.slug) && !uniqueBusinessCategoryCatalog.some((item) => item.slug === category.slug) && !['portfolios', 'manufacturing'].includes(category.slug))
  .map((category, index) => ({
    id: 1000 + index,
    category_name: category.name,
    category_slug: category.slug,
    name: `${category.name} Studio`,
    description: `A polished one-page ${category.name.toLowerCase()} website for services, enquiries and growth.`,
    pages: 1,
    type: 'Static',
    price: 1000,
    featured: 0,
    demo: true,
    thumbnail_url: category.image,
    palette: ['cobalt', 'sand', 'mint', 'rose', 'slate'][index % 5],
    features: ['9+ editable sections', 'Responsive layout', 'WhatsApp enquiry form']
  }));

const businessVariantExtras = {
  warm: { title: 'Made with a personal touch.', copy: 'Show the person, process and care behind every order.', items: ['Custom work', 'Local pickup', 'Personal support'] },
  retail: { title: 'A clearer way to browse.', copy: 'Put featured products, offers and store information in one useful place.', items: ['Featured collection', 'New arrivals', 'Visit the store'] },
  culinary: { title: 'A table worth planning for.', copy: 'Turn the menu, atmosphere and booking journey into one appetite-building story.', items: ['Seasonal menu', 'Chef story', 'Reservations'] },
  editorial: { title: 'Style with a point of view.', copy: 'Use editorial imagery, services and appointments to make the brand feel unmistakable.', items: ['Lookbook', 'Signature service', 'Book a visit'] },
  blueprint: { title: 'Proof before promises.', copy: 'Make expertise easier to understand with selected work, method and measurable outcomes.', items: ['Case studies', 'Capabilities', 'Discovery call'] },
  learn: { title: 'A better way to begin learning.', copy: 'Give families and learners the context they need before they enquire or enrol.', items: ['Programmes', 'Faculty', 'Admissions'] },
  care: { title: 'Care that feels considered.', copy: 'Keep important information calm, clear and easy to act on.', items: ['Treatments', 'Specialists', 'Appointments'] },
  industrial: { title: 'Built for the next requirement.', copy: 'Show capability, equipment, output and a direct route to a quote.', items: ['Capabilities', 'Projects', 'Request a quote'] },
  mobility: { title: 'Keep moving with confidence.', copy: 'Bring services, inventory and bookings together for customers on the go.', items: ['Services', 'Parts', 'Book now'] },
  earth: { title: 'From the land to the customer.', copy: 'Tell the growing story with seasonal products, availability and trust.', items: ['What is available', 'Our farm', 'Ask about supply'] },
  travel: { title: 'The next stay starts here.', copy: 'Let guests move from inspiration to itinerary without losing the feeling of place.', items: ['Stay', 'Experiences', 'Book a journey'] },
  energy: { title: 'Make room for the moment.', copy: 'Bring energy, schedules, tickets and memories into a single destination.', items: ['What is on', 'Book a place', 'See the moments'] },
  enterprise: { title: 'One system for many teams.', copy: 'Organise business divisions, proof and corporate contact paths with clarity.', items: ['Our network', 'Leadership', 'Partner with us'] },
  digital: { title: 'Turn attention into action.', copy: 'Explain the product, show the value and move users toward the right next step.', items: ['Product', 'Plans', 'Start building'] },
  community: { title: 'A place for people to gather.', copy: 'Make mission, programs, events and support easy to discover.', items: ['Our mission', 'Programs', 'Get involved'] }
};

const businessCategoryTemplates = uniqueBusinessCategoryCatalog
  .filter((category) => !demoTemplates.some((template) => template.category_slug === category.slug) && !['portfolios', 'manufacturing'].includes(category.slug))
  .map((category, index) => ({
    id: 2000 + index,
    category_name: category.name,
    category_slug: category.slug,
    name: `${category.name} · ${category.variant === 'digital' ? 'Digital Launch' : category.variant === 'industrial' ? 'Works' : category.variant === 'care' ? 'Care' : 'Studio'}`,
    description: `${category.name} website template with a ${category.variant} visual system, business-specific sections and a WhatsApp-first enquiry journey.`,
    pages: 1,
    type: ['enterprise', 'digital', 'blueprint', 'industrial'].includes(category.variant) ? 'Dynamic' : 'Static',
    price: 1000,
    featured: index < 12 ? 1 : 0,
    demo: true,
    thumbnail_url: categoryImagePool[(index + category.groupIndex) % categoryImagePool.length],
    palette: category.variant,
    designVariant: category.variant,
    variantLabel: category.label,
    heroTitle: `${category.name} made clear, memorable and ready to grow.`,
    aboutTitle: `A better digital front door for ${category.name.toLowerCase()}.`,
    formTitle: category.formTitle,
    serviceItems: category.services,
    extraSection: businessVariantExtras[category.variant] || businessVariantExtras.blueprint,
    processSteps: ['Understand the requirement', 'Shape the right plan', 'Deliver with care'],
    features: ['9+ business-specific sections', `${category.formTitle}`, 'Official WhatsApp enquiry form']
  }));

const allDemoTemplates = [...demoTemplates, portfolioTemplate, manufacturingTemplate, ...generatedCategoryTemplates, ...businessCategoryTemplates];

function mergeCatalogCategories(remoteRows = []) {
  const merged = new Map(expandedCategories.map((category) => [category.slug, category]));
  remoteRows.forEach((category) => {
    const slug = category.slug || category.category_slug;
    if (!slug) return;
    merged.set(slug, { ...merged.get(slug), ...category, slug, name: category.name || merged.get(slug)?.name || slug });
  });
  return [...merged.values()];
}

function mergeCatalogTemplates(remoteRows = []) {
  const remoteIds = new Set(remoteRows.map((template) => String(template.id)));
  return [...remoteRows, ...allDemoTemplates.filter((template) => !remoteIds.has(String(template.id)))];
}

const categoryPreviewConfig = {
  manufacturing: { label: 'PRECISION MANUFACTURING · MACHINERY · SUPPLY', defaultBusinessName: 'Shree Gurukrupa Enterprises', defaultTagline: 'Engineered for Performance. Built for the Field.', defaultAbout: 'Precision agricultural machinery components, tractor parts and machined engineering components from Shiroli MIDC, Kolhapur.', aboutTitle: 'Manufacturing discipline from Shiroli MIDC.', servicesTitle: 'Machining capability for working components.', serviceLabel: 'Capabilities', services: ['CNC turning and shafts', 'Milling, drilling and flanges', 'Batch staging and inspection'], showcaseTitle: 'Agricultural machinery components.', testimonial: 'Clear scope, honest specifications and a practical component focus.', faqTitle: 'Need a component built to requirement?', footerTagline: 'PRECISION · STRENGTH · RELIABILITY' },
  portfolios: { label: 'PRODUCT DESIGN · MOTION · CRAFT', defaultBusinessName: 'Aria Kapoor', defaultTagline: 'Designing interfaces that feel alive.', defaultAbout: 'A product designer and design engineer crafting premium digital experiences, from first sketch to shipped product.', aboutTitle: 'Behind the pixels.', servicesTitle: 'What I can do for you.', serviceLabel: 'Services', services: ['Product Design', 'Design Systems', 'UX Research & Strategy'], showcaseTitle: 'Projects with a pulse.', testimonial: 'Design is how it works, not just how it looks.', faqTitle: 'A thoughtful process for complex work.', footerTagline: 'Designed and built with care.' },
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

const SEO_BASE_URL = 'https://webbasket.org';

function setMetaTag(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function SEOManager({ templates }) {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const templateId = path.startsWith('/builder/') ? path.split('/').pop() : '';
    const template = templates.find((item) => String(item.id) === templateId);
    const categoryKeywords = {
      restaurants: 'restaurant website template, restaurant website design India, online menu website, restaurant booking website',
      salons: 'salon website template, beauty salon website design India, appointment website',
      construction: 'construction website template, builder website design India, contractor portfolio website',
      clinics: 'clinic website template, healthcare website design India, doctor appointment website',
      'real-estate': 'real estate website template, property website design India, real estate lead website',
      portfolios: 'portfolio website template, designer portfolio website, creative portfolio website India, animated portfolio website',
      manufacturing: 'manufacturing website template, industrial website design India, machinery components website, factory website',
      'professional-services': 'consulting website template, professional services website India, business portfolio website'
    };
    const page = path === '/' ? {
      title: 'WebBasket | Affordable Business Websites in India',
      description: 'Build an affordable, professional business website in India with WebBasket templates, live preview, WhatsApp enquiries and source-code delivery.',
      keywords: 'business website builder India, website templates India, affordable website design, one page website, responsive business website'
    } : path === '/templates' ? {
      title: 'Business Website Templates for India | WebBasket',
      description: 'Browse responsive website templates for restaurants, salons, clinics, construction companies, real estate and professional services.',
      keywords: 'business website templates India, responsive website templates, restaurant website template, salon website template, clinic website template'
    } : path === '/pricing' ? {
      title: 'Affordable Website Design Packages in India | WebBasket',
      description: 'Compare transparent WebBasket website packages starting at ₹1,000, with live preview, responsive layouts and source-code delivery.',
      keywords: 'affordable website design India, website price India, one page website price, website packages for small business'
    } : path === '/services' ? {
      title: 'Website Services for Small Businesses in India | WebBasket',
      description: 'Explore WebBasket website services including hosting, domain setup, admin panels, SEO setup and monthly maintenance for Indian businesses.',
      keywords: 'website services India, website hosting setup, admin panel development, SEO services for small business, website maintenance India'
    } : template ? {
      title: `${template.name} | ${template.category_name} Website Template | WebBasket`,
      description: `${template.description} Customize this responsive ${template.category_name.toLowerCase()} website template with your business content and preview it live.`,
      keywords: `${categoryKeywords[template.category_slug] || 'business website template India'}, WebBasket ${template.name} template`
    } : path === '/admin' ? {
      title: 'WebBasket Admin',
      description: 'WebBasket administration dashboard.',
      keywords: 'WebBasket admin'
    } : path === '/dashboard' ? {
      title: 'Customer Website Dashboard | WebBasket',
      description: 'Manage your WebBasket website projects, orders and downloads.',
      keywords: 'website project dashboard, WebBasket customer dashboard'
    } : {
      title: 'WebBasket | Business Website Builder India',
      description: 'Create a professional, responsive business website with WebBasket.',
      keywords: 'business website builder India, professional website design'
    };
    const noIndex = path === '/admin' || path === '/dashboard' || path.startsWith('/builder/');
    const canonicalPath = path === '/' ? '/' : path;
    const canonicalUrl = `${SEO_BASE_URL}${canonicalPath}`;
    document.title = page.title;
    setMetaTag('name', 'description', page.description);
    setMetaTag('name', 'keywords', page.keywords);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMetaTag('property', 'og:title', page.title);
    setMetaTag('property', 'og:description', page.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', path === '/' ? 'website' : 'article');
    setMetaTag('name', 'twitter:title', page.title);
    setMetaTag('name', 'twitter:description', page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'WebBasket', url: SEO_BASE_URL, description: 'Affordable business website templates and website design for Indian businesses.' };
    const schema = path === '/' ? [organization, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'WebBasket', url: SEO_BASE_URL, potentialAction: { '@type': 'SearchAction', target: `${SEO_BASE_URL}/templates?search={search_term_string}`, 'query-input': 'required name=search_term_string' } }] : path === '/templates' ? { '@context': 'https://schema.org', '@type': 'CollectionPage', name: page.title, description: page.description, url: canonicalUrl, mainEntity: { '@type': 'ItemList', itemListElement: templates.slice(0, 12).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `${SEO_BASE_URL}/builder/${item.id}` })) } } : template ? { '@context': 'https://schema.org', '@type': 'Product', name: template.name, description: page.description, brand: { '@type': 'Brand', name: 'WebBasket' }, category: template.category_name, offers: { '@type': 'Offer', price: Number(template.price) || 1000, priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: canonicalUrl } } : organization;
    let structuredData = document.getElementById('webbasket-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'webbasket-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
    if (typeof window.gtag === 'function') window.gtag('event', 'page_view', { page_title: page.title, page_location: `${window.location.origin}${location.pathname}${location.search}`, page_path: `${location.pathname}${location.search}` });
  }, [location.pathname, location.search, templates]);
  return null;
}

function openServiceWhatsApp(serviceName) {
  const message = `Hi WebBasket, I would like to know more about ${serviceName}.`;
  const href = `https://wa.me/918446079635?text=${encodeURIComponent(message)}`;
  window.open(href, '_blank', 'noopener,noreferrer');
}

function App() {
  const [templates, setTemplates] = useState(allDemoTemplates);
  const [categoriesData, setCategoriesData] = useState(expandedCategories);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    Promise.all([fetch(`${API}/templates`).then((r) => r.ok ? r.json() : Promise.reject()), fetch(`${API}/categories`).then((r) => r.ok ? r.json() : Promise.reject())])
      .then(([templateRows, categoryRows]) => { if (templateRows.length) setTemplates(mergeCatalogTemplates(templateRows)); if (categoryRows.length) setCategoriesData(mergeCatalogCategories(categoryRows)); })
      .catch(() => undefined);
  }, []);

  const showToast = (message) => { if (message.endsWith(' enquiry started')) return openServiceWhatsApp(message.replace(' enquiry started', '')); setToast(message); window.setTimeout(() => setToast(''), 3400); };
  return <>
    <SiteChrome onAccount={() => setAccountOpen(true)} language={language} onLanguageChange={setLanguage} />
    <MarathiTranslator language={language} />
    <SEOManager templates={templates} />
    <Routes>
      <Route path="/" element={<Home templates={templates} categories={categoriesData} onToast={showToast} />} />
      <Route path="/templates" element={<MarketplaceEnhanced templates={templates} categories={categoriesData} />} />
      <Route path="/pricing" element={<Pricing onToast={showToast} />} />
      <Route path="/services" element={<ServicesPage />} />
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

function SiteChrome({ onAccount, language, onLanguageChange }) {
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
          <button className={location.pathname === '/' ? 'active' : ''} onClick={() => go('/')}>Home</button>
          <a href="/#features" onClick={() => setMobileOpen(false)}>Features</a>
          <button className={location.pathname === '/templates' ? 'active' : ''} onClick={() => go('/templates')}>Templates</button>
          <button className={location.pathname === '/pricing' ? 'active' : ''} onClick={() => go('/pricing')}>Pricing</button>
          <a href="/#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          <button className="mobile-language" onClick={() => onLanguageChange(language === 'mr' ? 'en' : 'mr')}>{language === 'mr' ? 'English' : 'मराठी'}</button>
          <button className="mobile-login" onClick={() => { onAccount(); setMobileOpen(false); }}>Log in</button>
        </nav>
        <div className="nav-actions"><button className="language-switcher" onClick={() => onLanguageChange(language === 'mr' ? 'en' : 'mr')} aria-label="Change website language">{language === 'mr' ? 'English' : 'मराठी'}</button><button className="login-link" onClick={onAccount}>Log in</button><button className="button button-orange button-small" onClick={() => go('/templates')}>Get started free <ArrowRight size={15} /></button></div>
        <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
  </>;
}

function MarketplaceEnhanced({ templates, categories: categoryRows }) {
  const availableCategories = categoryRows?.length ? categoryRows : expandedCategories;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [mobileFilters, setMobileFilters] = useState(false);
  const location = useLocation();
  const selectedCategory = availableCategories.find((item) => item.slug === category);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('category');
    if (query && availableCategories.some((item) => item.slug === query)) setCategory(query);
  }, [location.search, availableCategories]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = templates.filter((template) => {
      const haystack = `${template.name} ${template.description} ${template.category_name} ${template.category_slug}`.toLowerCase();
      return (!query || haystack.includes(query)) && (category === 'All' || template.category_slug === category) && (type === 'All' || template.type === type);
    });
    return [...matches].sort((a, b) => sort === 'Price: low to high' ? Number(a.price) - Number(b.price) : sort === 'Price: high to low' ? Number(b.price) - Number(a.price) : sort === 'Newest' ? Number(b.id) - Number(a.id) : Number(b.featured || 0) - Number(a.featured || 0));
  }, [templates, search, category, type, sort]);

  const visibleCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return availableCategories.filter((item) => !query || `${item.name} ${item.description} ${item.slug}`.toLowerCase().includes(query));
  }, [availableCategories, search]);

  const selectCategory = (slug) => {
    setCategory(slug);
    setMobileFilters(false);
    window.requestAnimationFrame(() => document.querySelector('.marketplace-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const resetFilters = () => { setCategory('All'); setType('All'); setSort('Featured'); setSearch(''); };

  return <main className="marketplace-page section-pad"><div className="container">
    <nav className="marketplace-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronDown size={13} /><span>Templates</span>{selectedCategory && <><ChevronDown size={13} /><b>{selectedCategory.name}</b></>}</nav>
    <div className="marketplace-hero"><div><div className="eyebrow">The marketplace · 200+ business categories</div><h1>Find a better starting point<br /><em>for your website.</em></h1><p>Explore polished templates for restaurants, professionals, local services, healthcare, retail and more. Search by category, compare layouts, and open a live preview before you decide.</p></div><div className="marketplace-note"><Sparkles size={16} /><span><b>Built for Indian businesses.</b><br />Every category includes a responsive starter with WhatsApp-ready enquiries.</span></div></div>
    <section className="category-directory"><div className="category-directory-heading"><div><div className="eyebrow">Browse by business</div><h2>One useful home for every kind of work.</h2></div><span>{availableCategories.length} categories</span></div><div className="category-directory-grid">{visibleCategories.map((item) => { const count = templates.filter((template) => template.category_slug === item.slug).length; return <button key={item.slug} className={`category-directory-card ${category === item.slug ? 'selected' : ''}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(9,25,57,.9), rgba(9,25,57,.28)), url(${item.image || categoryImagePool[0]})` }} onClick={() => selectCategory(item.slug)}><span>{item.icon}</span><strong>{item.name}</strong><small>{count} template{count === 1 ? '' : 's'}</small></button>; })}</div>{!visibleCategories.length && <div className="category-directory-empty">No categories match “{search}”. Try another business type.</div>}</section>
    <div className="marketplace-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 60 categories or templates..." aria-label="Search categories and templates" /></div><button className="filter-toggle" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal size={16} /> Filters</button><div className="result-count">{filtered.length} templates · {visibleCategories.length} categories</div></div>
    <div className="marketplace-layout"><aside className={`filter-panel ${mobileFilters ? 'visible' : ''}`}><div className="filter-header"><b>Filter templates</b><button onClick={resetFilters}>Reset</button></div><label>Business category</label><div className="filter-list"><button className={category === 'All' ? 'selected' : ''} onClick={() => selectCategory('All')}>All categories <span>{templates.length}</span></button>{availableCategories.map((item) => { const count = templates.filter((template) => template.category_slug === item.slug).length; return <button key={item.slug} className={category === item.slug ? 'selected' : ''} onClick={() => selectCategory(item.slug)}>{item.name}<span>{count}</span></button>; })}</div><label>Website type</label><div className="segmented"><button className={type === 'All' ? 'selected' : ''} onClick={() => setType('All')}>All</button><button className={type === 'Static' ? 'selected' : ''} onClick={() => setType('Static')}>Static</button><button className={type === 'Dynamic' ? 'selected' : ''} onClick={() => setType('Dynamic')}>Dynamic</button></div><div className="filter-help"><CircleHelp size={16} /><span>Every starter is responsive, editable, and priced in rupees. Custom functionality can be added after the preview.</span></div></aside><div className="marketplace-results"><div className="results-top"><span>Showing {filtered.length} of {templates.length} templates{selectedCategory ? ` · ${selectedCategory.name}` : ''}</span><label className="sort-control">Sort<select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={13} /></label></div>{filtered.length ? <div className="template-grid">{filtered.map((template, index) => <TemplateCard key={template.id} template={template} index={index} />)}</div> : <div className="empty-state"><Search size={24} /><h3>No templates found</h3><p>Try a different category or clear your search.</p><button className="button button-dark" onClick={resetFilters}>Clear filters</button></div>}</div></div>
  </div></main>;
}

const MARATHI_TRANSLATIONS = {
  'Build your business website with transparent pricing.': 'पारदर्शक किमतीत तुमची व्यवसाय वेबसाइट तयार करा.',
  'Compare packages': 'पॅकेजची तुलना करा',
  Home: 'मुख्यपृष्ठ',
  Features: 'वैशिष्ट्ये',
  Templates: 'टेम्पलेट्स',
  Pricing: 'किंमत',
  About: 'आमच्याबद्दल',
  Contact: 'संपर्क',
  'Log in': 'लॉग इन',
  'Get started free': 'मोफत सुरू करा',
  'All-in-one website builder': 'सर्व सुविधा असलेला वेबसाइट बिल्डर',
  'Your business': 'तुमचा व्यवसाय',
  'deserves a': 'यासाठी योग्य आहे',
  'better website.': 'उत्तम वेबसाइट.',
  'Create a polished website, grow your brand, and get more customers with WebBasket—the easy, powerful, and affordable website builder for Indian businesses.': 'WebBasket सोबत आकर्षक वेबसाइट तयार करा, तुमचा ब्रँड वाढवा आणि अधिक ग्राहक मिळवा—भारतीय व्यवसायांसाठी सोपा, शक्तिशाली आणि परवडणारा वेबसाइट बिल्डर.',
  'Drag & drop builder': 'ड्रॅग आणि ड्रॉप बिल्डर',
  '100+ modern templates': '१००+ आधुनिक टेम्पलेट्स',
  'Lightning-fast performance': 'अतिशय जलद परफॉर्मन्स',
  'Mobile-friendly design': 'मोबाइलसाठी योग्य डिझाइन',
  'SEO-ready for growth': 'वाढीसाठी SEO तयार',
  'Secure & reliable': 'सुरक्षित आणि विश्वासार्ह',
  'Start building free': 'मोफत तयार करायला सुरुवात करा',
  'See how it works': 'हे कसे काम करते ते पहा',
  Build: 'तयार करा',
  Grow: 'वाढवा',
  Succeed: 'यशस्वी व्हा',
  'Trusted by': 'विश्वास ठेवणारे',
  '10,000+ businesses': '१०,०००+ व्यवसाय',
  'Launch in': 'लॉन्च करा',
  'minutes, not weeks': 'आठवडे नाही, काही मिनिटांत',
  '24/7 expert support': '२४/७ तज्ज्ञ मदत',
  '99.9% reliable': '९९.९% विश्वासार्ह',
  'LAUNCH WITHOUT THE WAIT': 'प्रतीक्षा न करता लॉन्च करा',
  'A premium first impression, ready today.': 'आजच तयार होणारी प्रीमियम पहिली छाप.',
  'Choose a polished starting point, add your story, and preview every detail before you pay.': 'सुंदर सुरुवातीचे टेम्पलेट निवडा, तुमची माहिती जोडा आणि पेमेंटपूर्वी प्रत्येक तपशील पहा.',
  'Explore templates': 'टेम्पलेट्स पहा',
  'MADE FOR LOCAL BUSINESS': 'स्थानिक व्यवसायांसाठी तयार',
  'Your best work deserves a better home.': 'तुमच्या उत्तम कामासाठी उत्तम डिजिटल घर.',
  'See categories': 'श्रेणी पहा',
  'SIMPLE. TRANSPARENT. YOURS.': 'सोपे. पारदर्शक. तुमचे.',
  'Good design without the agency drama.': 'एजन्सीच्या गुंतागुंतीशिवाय उत्तम डिझाइन.',
  'Start with your world': 'तुमच्या व्यवसायापासून सुरुवात करा',
  'What kind of website do you need?': 'तुम्हाला कोणत्या प्रकारची वेबसाइट हवी आहे?',
  'View all templates': 'सर्व टेम्पलेट्स पहा',
  'The template shelf': 'टेम्पलेट्सचा संग्रह',
  'Find your perfect starting point': 'तुमची योग्य सुरुवात शोधा',
  'Browse marketplace': 'मार्केटप्लेस पहा',
  'A simpler way to start': 'सुरुवात करण्याचा सोपा मार्ग',
  'From blank page to business-ready.': 'रिकाम्या पानापासून व्यवसायासाठी तयार वेबसाइटपर्यंत.',
  'Choose a template': 'टेम्पलेट निवडा',
  'Add your details': 'तुमची माहिती जोडा',
  'Preview your website': 'तुमच्या वेबसाइटचा प्रिव्ह्यू पहा',
  'Get your website': 'तुमची वेबसाइट मिळवा',
  'Straightforward packages': 'सोपे आणि स्पष्ट पॅकेज',
  'A clear price for a clear beginning.': 'स्पष्ट सुरुवातीसाठी स्पष्ट किंमत.',
  'When you need a little more': 'जेव्हा तुम्हाला अधिक मदत हवी असेल',
  'Useful services, clearly scoped.': 'स्पष्ट व्याप्ती असलेल्या उपयुक्त सेवा.',
  'Ready when you are': 'तुम्ही तयार असाल तेव्हा आम्ही तयार आहोत',
  'Ready to take your business online?': 'तुमचा व्यवसाय ऑनलाइन आणण्यासाठी तयार आहात?',
  'Explore website templates': 'वेबसाइट टेम्पलेट्स पहा',
  'The marketplace': 'मार्केटप्लेस',
  'A better starting point': 'तुमच्या वेबसाइटसाठी',
  'for your website.': 'एक उत्तम सुरुवात.',
  'Filter templates': 'टेम्पलेट्स फिल्टर करा',
  Reset: 'रीसेट',
  'All categories': 'सर्व श्रेणी',
  'Website type': 'वेबसाइटचा प्रकार',
  All: 'सर्व',
  Static: 'स्टॅटिक',
  Dynamic: 'डायनॅमिक',
  'No templates found': 'टेम्पलेट्स सापडले नाहीत',
  'Clear filters': 'फिल्टर काढा',
  'Clear scope, fair starting points': 'स्पष्ट व्याप्ती, योग्य सुरुवातीची किंमत',
  'Pick the pace that fits': 'तुमच्यासाठी योग्य पॅकेज निवडा',
  'your next chapter.': 'तुमच्या पुढील टप्प्यासाठी.',
  'Recommended': 'शिफारस केलेले',
  'starting': 'सुरुवातीपासून',
  'Choose this package': 'हे पॅकेज निवडा',
  'No surprise charges.': 'अचानक अतिरिक्त शुल्क नाही.',
  'Optional services': 'ऐच्छिक सेवा',
  'Bring in help when you need it.': 'गरज असेल तेव्हा मदत घ्या.',
  'Website services for growing businesses': 'वाढणाऱ्या व्यवसायांसाठी वेबसाइट सेवा',
  'Bring in help': 'गरज असेल तेव्हा',
  'when you need it.': 'मदत घ्या.',
  'Ask about it': 'याबद्दल विचारा',
  'Get a recommendation': 'शिफारस मिळवा',
  'Your website workspace': 'तुमचे वेबसाइट वर्कस्पेस',
  'Welcome back.': 'पुन्हा स्वागत आहे.',
  'Start building.': 'तयार करायला सुरुवात करा.',
  'Email address': 'ईमेल पत्ता',
  'Continue with email': 'ईमेलने पुढे जा',
  'Create workspace': 'वर्कस्पेस तयार करा',
  'New here? Create an account': 'नवीन आहात? खाते तयार करा',
  'Already have an account? Log in': 'आधीच खाते आहे? लॉग इन करा',
  'Your business. Your website.': 'तुमचा व्यवसाय. तुमची वेबसाइट.',
  'Made simple.': 'सोपे केले आहे.',
  Explore: 'एक्सप्लोर',
  'For businesses': 'व्यवसायांसाठी',
  'Need help?': 'मदत हवी आहे?',
  'WhatsApp us': 'WhatsApp वर संपर्क करा',
  'Deployment support': 'डिप्लॉयमेंट मदत',
  FAQs: 'वारंवार विचारले जाणारे प्रश्न',
  'Talk to us on WhatsApp': 'WhatsApp वर आमच्याशी बोला',
  'Usually the fastest way to start': 'सुरुवात करण्याचा सर्वात जलद मार्ग',
  'Chat on WhatsApp': 'WhatsApp वर चॅट करा',
  'One form, full website': 'एक फॉर्म, पूर्ण वेबसाइट',
  'Every section starts here.': 'प्रत्येक सेक्शनची सुरुवात इथून होते.',
  'Business name': 'व्यवसायाचे नाव',
  'Logo image': 'लोगो इमेज',
  'Tagline': 'टॅगलाइन',
  'Hero image': 'हिरो इमेज',
  'About / story': 'आमच्याबद्दल / गोष्ट',
  Phone: 'फोन',
  Email: 'ईमेल',
  'WhatsApp number': 'WhatsApp नंबर',
  City: 'शहर',
  'Opening hours': 'कामकाजाची वेळ',
  Address: 'पत्ता',
  'Map embed/link': 'नकाशा लिंक',
  'Primary button text': 'मुख्य बटणाचा मजकूर',
  Package: 'पॅकेज',
  'Pay and get website': 'पेमेंट करा आणि वेबसाइट मिळवा',
  'Live preview': 'लाइव्ह प्रिव्ह्यू',
  Desktop: 'डेस्कटॉप',
  Tablet: 'टॅबलेट',
  Mobile: 'मोबाइल',
  'Preview ready': 'प्रिव्ह्यू तयार आहे',
  'Payment cancelled. Your order is still pending.': 'पेमेंट रद्द झाले. तुमची ऑर्डर अद्याप प्रलंबित आहे.',
  'Payment verified. Your source code is being prepared.': 'पेमेंट पडताळले आहे. तुमचा सोर्स कोड तयार केला जात आहे.',
  'Admin authentication required.': 'अॅडमिन प्रमाणीकरण आवश्यक आहे.',
  'Protected console': 'सुरक्षित कन्सोल'
};

function translateToMarathi(value) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (MARATHI_TRANSLATIONS[normalized]) return MARATHI_TRANSLATIONS[normalized];
  if (/^Showing \d+ of \d+$/.test(normalized)) return normalized.replace('Showing', 'दाखवत आहे').replace('of', 'पैकी');
  if (/^\d+ templates$/.test(normalized)) return normalized.replace('templates', 'टेम्पलेट्स');
  if (/^from ₹/.test(normalized)) return normalized.replace('from', 'पासून');
  return null;
}

function MarathiTranslator({ language }) {
  const textRecords = useRef(new WeakMap());
  const attributeRecords = useRef(new WeakMap());
  useEffect(() => {
    const translateNode = (node) => {
      const current = node.nodeValue || '';
      const trimmed = current.replace(/\s+/g, ' ').trim();
      if (!trimmed) return;
      let record = textRecords.current.get(node);
      if (!record) { record = { english: current, marathi: '' }; textRecords.current.set(node, record); }
      else if (current !== record.marathi && current !== record.english) record.english = current;
      const translated = language === 'mr' ? translateToMarathi(record.english) : null;
      const next = translated || record.english;
      record.marathi = translated || '';
      const leading = (record.english.match(/^\s*/) || [''])[0];
      const trailing = (record.english.match(/\s*$/) || [''])[0];
      node.nodeValue = `${leading}${next.trim()}${trailing}`;
    };
    const translateAttributes = (element) => {
      ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        let records = attributeRecords.current.get(element);
        if (!records) { records = {}; attributeRecords.current.set(element, records); }
        const current = element.getAttribute(attribute) || '';
        if (!records[attribute]) records[attribute] = { english: current, marathi: '' };
        else if (current !== records[attribute].marathi && current !== records[attribute].english) records[attribute].english = current;
        const translated = language === 'mr' ? translateToMarathi(records[attribute].english) : null;
        element.setAttribute(attribute, translated || records[attribute].english);
        records[attribute].marathi = translated || '';
      });
    };
    const apply = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement?.closest('script,style,noscript,textarea')) continue;
        translateNode(node);
      }
      document.body.querySelectorAll('input,button,a,[title],[aria-label]').forEach(translateAttributes);
    };
    let observer;
    const observe = () => {
      apply();
      observer = new MutationObserver(() => { observer.disconnect(); apply(); observe(); });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
    };
    observe();
    return () => observer?.disconnect();
  }, [language]);
  return null;
}

function Home({ templates, categories: categoryRows, onToast }) {
  const navigate = useNavigate();
  const featured = templates.filter((template) => template.featured).slice(0, 4);
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerSlides = [
    { eyebrow: 'LAUNCH WITHOUT THE WAIT', title: 'A premium first impression, ready today.', copy: 'Choose a polished starting point, add your story, and preview every detail before you pay.', action: 'Explore templates', href: '/templates', accent: '01' },
    { eyebrow: 'MADE FOR LOCAL BUSINESS', title: 'Your best work deserves a better home.', copy: 'Restaurants, salons, clinics, builders and experts can start with a site that feels unmistakably theirs.', action: 'See categories', href: '#about', accent: '02' },
    { eyebrow: 'SIMPLE. TRANSPARENT. YOURS.', title: 'Good design without the agency drama.', copy: 'Clear packages, editable sections, mobile-ready layouts and source code after payment.', action: 'Compare packages', href: '/pricing', accent: '03' }
  ];
  useEffect(() => {
    const timer = window.setInterval(() => setActiveBanner((current) => (current + 1) % bannerSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, [bannerSlides.length]);
  const banner = bannerSlides[activeBanner];
  return <main>
    <section className="hero section-pad"><div className="container hero-grid">
       <div className="hero-copy"><div className="hero-badge"><Sparkles size={14} /> All-in-one website builder</div><h1>Your business<br />deserves a <em>better website.</em></h1><p>Create a polished website, grow your brand, and get more customers with WebBasket—the easy, powerful, and affordable website builder for Indian businesses.</p><div className="hero-feature-grid">{[[Monitor, 'Drag & drop builder'], [LayoutDashboard, '100+ modern templates'], [Zap, 'Lightning-fast performance'], [Smartphone, 'Mobile-friendly design'], [BarChart3, 'SEO-ready for growth'], [ShieldCheck, 'Secure & reliable']].map(([Icon, label]) => <span key={label}><Icon size={17} />{label}</span>)}</div><div className="hero-actions"><button className="button button-orange" onClick={() => navigate('/templates')}>Start building free <ArrowRight size={17} /></button><a className="hero-demo-link" href="#features"><span><Eye size={15} /></span> See how it works</a></div><div className="hero-signature">Build <i /> Grow <i /> Succeed</div></div>
      <HeroVisual onOpen={() => navigate('/builder/11')} />
    </div></section>
     <section className="logo-strip hero-trust-strip"><div className="container logo-row"><span><ShieldCheck size={19} /> Trusted by <b>10,000+ businesses</b></span><i /><span><Rocket size={19} /> Launch in <b>minutes, not weeks</b></span><i /><span><LifeBuoy size={19} /> <b>24/7 expert support</b></span><i /><span><Zap size={19} /> <b>99.9% reliable</b></span></div></section>
    <section className="premium-banner-section"><div className="container premium-banner"><div className="premium-banner-glow premium-banner-glow-one" /><div className="premium-banner-glow premium-banner-glow-two" /><div className="premium-banner-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> {banner.eyebrow}</div><motion.div key={activeBanner} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><h2>{banner.title}</h2><p>{banner.copy}</p><button className="button button-orange" onClick={() => banner.href.startsWith('#') ? document.querySelector(banner.href)?.scrollIntoView({ behavior: 'smooth' }) : navigate(banner.href)}>{banner.action} <ArrowRight size={15} /></button></motion.div><div className="premium-banner-dots" aria-label="Homepage banner slides">{bannerSlides.map((slide, index) => <button key={slide.accent} className={activeBanner === index ? 'active' : ''} onClick={() => setActiveBanner(index)} aria-label={`Show banner ${index + 1}`}><span /></button>)}</div></div><div className="premium-banner-art"><div className="banner-art-ring ring-one" /><div className="banner-art-ring ring-two" /><div className="banner-art-card banner-art-main"><span className="banner-art-number">{banner.accent}</span><div><small>WEBBASKET / STUDIO</small><b>Make it<br /><em>memorable.</em></b></div><span className="banner-art-arrow"><ArrowUpRight size={17} /></span></div><div className="banner-art-card banner-art-note"><Sparkles size={13} /><span>Curated<br />starting points</span></div><div className="banner-art-card banner-art-stat"><strong>₹1,000</strong><span>one-page launch</span></div></div></div></section>
     <section className="section-pad" id="about"><div className="container"><SectionHeading eyebrow="Start with your world" title="What kind of website do you need?" copy="A considered starting point for the businesses that keep local India moving." action={<Link className="text-link" to="/templates">View all templates <ArrowRight size={15} /></Link>} /><div className="category-grid">{(categoryRows.length ? categoryRows : categories).slice(0, 6).map((category, index) => <CategoryCard key={category.slug || category.id} category={category} index={index} />)}</div></div></section>
    <section className="section-pad section-tint"><div className="container"><SectionHeading eyebrow="The template shelf" title="Find your perfect starting point" copy="Real layouts for real businesses. Every template is responsive, editable, and ready for your story." action={<Link className="text-link" to="/templates">Browse marketplace <ArrowRight size={15} /></Link>} /><div className="template-grid">{featured.map((template, index) => <TemplateCard key={template.id} template={template} index={index} />)}</div></div></section>
     <section className="section-pad" id="features"><div className="container"><SectionHeading eyebrow="A simpler way to start" title="From blank page to business-ready." copy="No long briefs. No mysterious quotes. Just a clear path to a website you can feel proud of." /><div className="steps-grid">{[[Store, '01', 'Choose a template', 'Start with a design that already understands your kind of business.'], [FileText, '02', 'Add your details', 'Tell us your story, services, hours, images, and the small details that matter.'], [Eye, '03', 'Preview your website', 'See it on desktop, tablet, and mobile before you make a decision.'], [Rocket, '04', 'Get your website', 'Purchase the source code or let our team help you take it live.']].map(([Icon, number, title, copy]) => <div className="step" key={number}><div className="step-number">{number}</div><div className="step-icon"><Icon size={22} /></div><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="section-pad section-navy"><div className="container pricing-banner"><div><div className="eyebrow eyebrow-light">Straightforward packages</div><h2>A clear price for a clear beginning.</h2><p>Start with the scope that fits today. Add pages and services only when you need them.</p></div><div className="mini-plans">{plans.map((plan) => <button key={plan.id} className={plan.recommended ? 'mini-plan selected' : 'mini-plan'} onClick={() => navigate('/pricing')}><span>{plan.name}</span><strong>{plan.price}</strong><small>{plan.pages} {plan.pages === 1 ? 'page' : 'pages'}</small></button>)}</div></div></section>
    <section className="section-pad" id="services"><div className="container"><SectionHeading eyebrow="When you need a little more" title="Useful services, clearly scoped." copy="From launch support to custom functionality, choose the help that fits your next step." action={<Link className="text-link" to="/pricing">Explore services <ArrowRight size={15} /></Link>} /><div className="service-grid">{[[Rocket, 'Hosting & deployment', 'Get your finished website live with a domain and hosting setup.'], [PanelLeft, 'Custom admin panel', 'Manage enquiries, products, bookings, or content independently.'], [BarChart3, 'SEO setup', 'A considered search foundation for the people trying to find you.'], [LifeBuoy, 'Monthly maintenance', 'Keep content, security, and backups in good shape.']].map(([Icon, title, copy]) => <div className="service-card" key={title}><Icon size={23} /><h3>{title}</h3><p>{copy}</p><span>Quotation required <ArrowUpRight size={13} /></span></div>)}</div></div></section>
     <section className="section-pad cta-section" id="contact"><div className="container cta-card"><div className="cta-orb orb-one" /><div className="cta-orb orb-two" /><div className="eyebrow eyebrow-light">Ready when you are</div><h2>Ready to take your business online?</h2><p>Start with a template. Leave the technical overwhelm to us.</p><button className="button button-orange" onClick={() => navigate('/templates')}>Explore website templates <ArrowRight size={17} /></button></div></section>
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
  return <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" title="Open WhatsApp chat"><span className="whatsapp-pulse" /><WhatsAppIcon size={22} /><span><b>Talk to us on WhatsApp</b><small>Usually the fastest way to start</small></span><ArrowUpRight size={15} /></a>;
}

function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits || WHATSAPP_NUMBER;
}

function WhatsAppIcon({ size = 19 }) {
  return <svg className="whatsapp-icon" width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339.2 55.4 283.4 32 223.9 32 101.5 32 2 131.5 2 253.9c0 44.3 11.6 87.6 33.7 125.5L0 480l103.4-34.1c36.1 19.7 77 30 120.5 30h.1C346.4 475.9 446 376.4 446 254c0-59.5-23.3-115.2-65.1-156.9zM223.9 441.6c-37.7 0-74.6-10.1-106.8-29.2l-7.7-4.6-61.4 20.2 20.6-59.8-5-7.8c-20.5-32.6-31.3-70.3-31.3-109.3C32.3 153.1 118.5 66.9 224 66.9c51.1 0 99.2 19.9 135.3 56.1 36.1 36.1 56 84.2 56 135.3-.1 105.6-86.3 191.8-191.4 191.8zm105.2-143.8c-5.7-2.8-33.7-16.6-38.9-18.5-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.5-18 22.3-3.3 3.8-6.6 4.3-12.3 1.4-5.7-2.8-24.5-9-46.6-28.7-17.2-15.3-28.8-34.2-32.1-40-3.3-5.7-.4-8.8 2.5-11.6 2.5-2.5 5.7-6.6 8.5-9.9 2.8-3.3 3.8-5.7 5.7-9.5 1.9-3.8 1-7.1-.5-9.9-1.4-2.8-12.8-30.9-17.5-42.3-4.6-11.1-9.3-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2s-9.9 1.4-15.1 7.1c-5.2 5.7-19.8 19.4-19.8 47.4 0 28 20.3 55.1 23.1 58.9 2.8 3.8 39.9 60.9 96.7 85.4 35.9 15.5 50 16.8 67.9 14.1 10.9-1.6 33.7-13.8 38.4-27.1 4.7-13.3 4.7-24.7 3.3-27.1-1.3-2.5-5.1-3.9-10.8-6.7z" /></svg>;
}

function PreviewWhatsAppFloat({ number }) {
  const normalized = normalizeWhatsAppNumber(number);
  const href = `https://wa.me/${normalized}?text=${encodeURIComponent('Hi, I would like to know more about this business.')}`;
  return <a className="preview-whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Chat with this business on WhatsApp" title="Chat with this business on WhatsApp"><span className="whatsapp-pulse" /><WhatsAppIcon size={22} /><span><b>Chat on WhatsApp</b><small>Usually the fastest way to start</small></span><ArrowUpRight size={13} /></a>;
}

function submitTemplateFormToWhatsApp(event, { number, businessName, subject }) {
  event.preventDefault();
  const form = event.target?.tagName === 'FORM' ? event.target : event.currentTarget;
  const fallbackKeys = ['name', 'email', 'message'];
  const fields = Array.from(form.querySelectorAll('input, textarea, select'))
    .map((field, index) => [field.name || fallbackKeys[index] || 'field', String(field.value || '').trim()])
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`);
  const message = [`Hi ${businessName || 'there'},`, subject, ...fields].join('\n');
  const href = `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;
  window.open(href, '_blank', 'noopener,noreferrer');
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
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || order.razorpayKeyId,
      amount: order.amount * 100,
      currency: order.currency,
      name: 'Web Guruji',
      description: 'Website source code',
      order_id: order.razorpayOrderId,
      handler: async (payment) => {
        try {
          const response = await fetch(`${API}/payments/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ orderId: order.id, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature }) });
          const result = await response.json().catch(() => ({}));
          onToast(response.ok ? 'Payment verified. Your source code is being prepared.' : result.message || 'Payment verification failed.');
        } catch { onToast('Could not verify the payment. Please contact support.'); }
      },
      modal: { ondismiss: () => onToast('Payment cancelled. Your order is still pending.') },
      theme: { color: '#F28C28' }
    });
    checkout.on('payment.failed', (payment) => onToast(payment?.error?.description || 'Payment failed. Please try again.'));
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
  const isPortfolioTemplate = template.category_slug === 'portfolios';
  const isManufacturingTemplate = template.category_slug === 'manufacturing';
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
  const [ctaLabel, setCtaLabel] = useState(isPortfolioTemplate ? "Let's collaborate" : isManufacturingTemplate ? 'Request a Quote' : 'Book a table');
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

function BusinessVariantPreview({ template, businessName, tagline, about, phone, email, city, address, whatsappNumber, ctaLabel, mediaPreviews = [], categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [sent, setSent] = useState(false);
  const rootRef = useRef(null);
  const variant = template.designVariant || 'editorial';
  const config = categoryPreviewConfig[template.category_slug] || categoryPreviewConfig['professional-services'];
  const services = template.serviceItems?.length ? template.serviceItems : config.services;
  const extra = template.extraSection || businessVariantExtras.blueprint;
  const images = mediaPreviews.length ? mediaPreviews.map((item) => item.url) : [template.thumbnail_url, categoryImagePool[template.id % categoryImagePool.length], categoryImagePool[(template.id + 3) % categoryImagePool.length]];
  const goTo = (selector) => rootRef.current?.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const submit = (event) => { submitTemplateFormToWhatsApp(event, { number: whatsappNumber, businessName, subject: `New ${template.category_name} enquiry.` }); setSent(true); };
  return <div ref={rootRef} className={`builder-preview full-site-preview-panel category-template-preview business-variant-preview category-design-${variant}`}><div className="preview-toolbar"><span>{template.name} template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-frame full-preview-frame viewport-${viewport}`}><div className={`business-variant-site variant-${variant}`}>
    <header className="business-variant-nav"><button className="business-variant-brand" onClick={() => goTo('.business-variant-site')}><span>{String(businessName || template.category_name).slice(0, 2).toUpperCase()}</span><b>{businessName || template.category_name}</b></button><nav><button onClick={() => goTo('#variant-about')}>About</button><button onClick={() => goTo('#variant-services')}>Services</button><button onClick={() => goTo('#variant-work')}>Work</button><button onClick={() => goTo('#variant-contact')}>Contact</button></nav><button className="business-variant-cta" onClick={() => goTo('#variant-contact')}>{ctaLabel || 'Get started'} <ArrowUpRight size={13} /></button></header>
    <section className="business-variant-hero"><div className="business-variant-hero-copy"><small>{template.variantLabel || config.label}</small><h2>{template.heroTitle || tagline || config.defaultTagline}</h2><p>{about || config.defaultAbout}</p><div className="business-variant-actions"><button className="business-variant-primary" onClick={() => goTo('#variant-contact')}>{ctaLabel || 'Get started'} <ArrowRight size={13} /></button><button className="business-variant-secondary" onClick={() => goTo('#variant-services')}>Explore <ArrowRight size={13} /></button></div></div><div className="business-variant-hero-art"><img src={images[0]} alt={`${businessName} hero`} /><span>{template.category_name}</span><i /></div></section>
    <div className="business-variant-ribbon"><span>01 · CLEAR POSITIONING</span><span>02 · BUSINESS-SPECIFIC SECTIONS</span><span>03 · WHATSAPP-FIRST ENQUIRIES</span></div>
    <section id="variant-about" className="business-variant-about"><div><small>01 · ABOUT</small><h3>{template.aboutTitle || categoryContent.aboutTitle}</h3><p>{categoryContent.aboutBody || about || config.defaultAbout}</p><button onClick={() => goTo('#variant-contact')}>Start a conversation <ArrowUpRight size={13} /></button></div><img src={images[1]} alt={`${businessName} story`} /></section>
    <section id="variant-services" className="business-variant-services"><div className="business-variant-heading"><small>02 · {config.serviceLabel || 'WHAT WE DO'}</small><h3>{categoryContent.servicesTitle || 'Useful services, made easy to choose.'}</h3><p>{template.description}</p></div><div className="business-variant-service-grid">{services.slice(0, 6).map((service, index) => <article key={`${service}-${index}`}><b>0{index + 1}</b><h4>{service}</h4><p>{config.defaultAbout}</p><button onClick={() => goTo('#variant-contact')}>Ask about it <ArrowUpRight size={12} /></button></article>)}</div></section>
    <section className="business-variant-extra"><small>03 · {extra.title.toUpperCase()}</small><h3>{extra.title}</h3><p>{extra.copy}</p><div>{extra.items.map((item, index) => <article key={item}><span>0{index + 1}</span><b>{item}</b><button onClick={() => goTo('#variant-contact')}>Explore <ArrowUpRight size={12} /></button></article>)}</div></section><section id="variant-work" className="business-variant-work"><div className="business-variant-heading"><small>04 · SHOWCASE</small><h3>Details that make the difference.</h3><p>Build trust with real work, products, people and moments from the business.</p></div><div className="business-variant-gallery">{images.concat(images).slice(0, 4).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${businessName} showcase ${index + 1}`} />)}</div></section>
    <section className="business-variant-process"><small>04 · HOW IT WORKS</small><h3>A clear path from first question to next step.</h3><div>{['Understand your need', 'Recommend the right option', 'Confirm details', 'Stay connected'].map((step, index) => <article key={step}><span>0{index + 1}</span><b>{step}</b><p>Simple communication designed around your {template.category_name.toLowerCase()}.</p></article>)}</div></section>
    <section className="business-variant-proof"><small>05 · WHY PEOPLE CHOOSE US</small><h3>{categoryContent.testimonial || 'Thoughtful service, clear communication and a better experience from the first click.'}</h3><span>{businessName} · trusted by customers</span></section>
    <section className="business-variant-faq"><div><small>06 · FAQ</small><h3>{categoryContent.faqTitle || 'Good to know before you begin.'}</h3></div><div><details open><summary>How do I get started?</summary><p>{categoryContent.faqBody || config.defaultAbout}</p></details><details><summary>Can I ask for a custom requirement?</summary><p>Yes. Share your requirement in the form and continue the conversation on WhatsApp.</p></details><details><summary>Does this work on mobile?</summary><p>Yes. The template is responsive across desktop, tablet and mobile preview modes.</p></details></div></section>
    <section id="variant-contact" className="business-variant-contact"><div><small>07 · {template.formTitle || 'CONTACT'}</small><h3>{template.formTitle || 'Ready for the next step?'}</h3><p>{address || city || 'Your business location'}<br />{phone || 'WhatsApp enquiries welcome'}<br />{email || 'Share your requirement directly'}</p></div>{sent ? <div className="business-variant-success"><Check size={20} /><b>WhatsApp enquiry prepared.</b><span>Continue in WhatsApp to send your details.</span><button onClick={() => setSent(false)}>Send another</button></div> : <form onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required placeholder="WhatsApp number" /></label><label>Requirement<select name="requirement">{services.map((service) => <option key={service}>{service}</option>)}</select></label><label className="business-variant-wide">Message<textarea name="message" required rows="4" placeholder="Tell us what you need" /></label><button type="submit" className="business-variant-primary">Send to WhatsApp <ArrowRight size={13} /></button></form>}</section>
    <section className="business-variant-final"><small>08 · LET'S BEGIN</small><h3>Make the next step feel easy.</h3><button onClick={() => goTo('#variant-contact')}>{ctaLabel || 'Get started'} <ArrowRight size={13} /></button></section><footer className="business-variant-footer"><b>{businessName || template.category_name}</b><span>{categoryContent.footerTagline || 'Built around your business.'}</span><button onClick={() => goTo('.business-variant-site')}>Back to top ↑</button></footer>
  </div><PreviewWhatsAppFloat number={whatsappNumber} /></div></div>;
}

function CategoryWebsitePreview({ template, businessName, tagline, about, phone, email, city, address, hours, whatsappNumber, ctaLabel, mediaPreviews, categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [sent, setSent] = useState(false);
  const config = categoryPreviewConfig[template.category_slug] || categoryPreviewConfig['professional-services'];
  const designVariant = template.designVariant || 'editorial';
  const serviceItems = template.serviceItems?.length ? template.serviceItems : categoryContent.services;
  const processSteps = template.processSteps?.length ? template.processSteps : ['Understand the brief', 'Shape the right direction', 'Deliver with care'];
  const formTitle = template.formTitle || 'Ready for the next step?';
  useEffect(() => {
    const root = document.querySelector('.category-template-preview:not(.category-three-page-preview)');
    if (!root) return undefined;
    const handleSubmit = (event) => {
      if (event.target?.tagName !== 'FORM') return;
      submitTemplateFormToWhatsApp(event, { number: whatsappNumber, businessName, subject: 'I would like to make an enquiry.' });
    };
    root.addEventListener('submit', handleSubmit, true);
    return () => root.removeEventListener('submit', handleSubmit, true);
  }, [businessName, whatsappNumber]);
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
  useEffect(() => {
    const root = document.querySelector('.category-three-page-preview');
    if (!root) return undefined;
    const handleSubmit = (event) => {
      if (event.target?.tagName !== 'FORM') return;
      submitTemplateFormToWhatsApp(event, { number: whatsappNumber, businessName, subject: 'I would like to make an enquiry.' });
    };
    root.addEventListener('submit', handleSubmit, true);
    return () => root.removeEventListener('submit', handleSubmit, true);
  }, [businessName, whatsappNumber]);
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
function PortfolioPreview({ businessName, about, email, whatsappNumber, mediaPreviews = [], template }) {
  const [viewport, setViewport] = useState('desktop');
  const rootRef = useRef(null);
  const assets = {
    portrait: 'https://animated-artist-canvas.lovable.app/assets/portrait-CygGq_Uj.jpg',
    work1: 'https://animated-artist-canvas.lovable.app/assets/work-1-DD4hmFsf.jpg',
    work2: 'https://animated-artist-canvas.lovable.app/assets/work-2-B735z13N.jpg',
    work3: 'https://animated-artist-canvas.lovable.app/assets/work-3-Cmuh3zjK.jpg',
    work4: 'https://animated-artist-canvas.lovable.app/assets/work-4-CNkfgwoR.jpg',
    work5: 'https://animated-artist-canvas.lovable.app/assets/work-5-DOBtQJYk.jpg',
    work6: 'https://animated-artist-canvas.lovable.app/assets/work-6-B1zThbev.jpg'
  };
  const heroImage = mediaPreviews.find((media) => media.section === 'hero')?.url || assets.portrait;
  const uploadedGallery = mediaPreviews.filter((media) => media.section === 'gallery').map((media) => media.url);
  const workImages = uploadedGallery.length ? [...uploadedGallery, assets.work1, assets.work2, assets.work3, assets.work4, assets.work5].slice(0, 6) : [assets.work1, assets.work2, assets.work3, assets.work4, assets.work5, assets.work6];
  const goTo = (selector) => rootRef.current?.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const work = [
    ['Nexora Finance', 'Analytics dashboard for a next-gen fintech — 40+ screens, dark-first design language.', 'Product Design', 'Web App', '2026'],
    ['Indigo Atelier', 'Full brand identity for an artisanal luxury house, from wordmark to packaging.', 'Branding', 'Art Direction', '2025'],
    ['Stillpoint', 'Meditation app with a generative, breathing interface — 4.9★ on the App Store.', 'Mobile', 'UI/UX', '2025'],
    ['Chrome Flow', 'A 3D and motion exploration for a launch film — liquid chrome, rendered in real time.', 'Motion', '3D', '2026'],
    ['Velmora', 'Editorial e-commerce experience for a fashion label — 2.3× conversion after launch.', 'Web Design', 'E-commerce', '2024'],
    ['Nova UI', 'A 120-component design system with tokens, docs and automated accessibility checks.', 'Design Systems', 'Figma', '2026']
  ];
  return <div ref={rootRef} className="builder-preview full-site-preview-panel portfolio-preview-panel"><div className="preview-toolbar"><span>{template?.name || 'Animated portfolio'} template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-frame full-preview-frame viewport-${viewport}`}><div className="portfolio-preview-site"><header className="portfolio-preview-nav"><button className="portfolio-wordmark" onClick={() => goTo('.portfolio-preview-site')}>{businessName || 'Aria'}<span>.</span></button><nav><button onClick={() => goTo('.portfolio-preview-work')}>Work</button><button onClick={() => goTo('.portfolio-preview-about')}>About</button><button onClick={() => goTo('.portfolio-preview-services')}>Services</button><button onClick={() => goTo('.portfolio-preview-contact')}>Contact</button><button className="portfolio-nav-cta" onClick={() => goTo('.portfolio-preview-contact')}>Let's talk <ArrowUpRight size={12} /></button></nav></header><section className="portfolio-preview-hero"><div className="portfolio-aurora portfolio-aurora-one" /><div className="portfolio-aurora portfolio-aurora-two" /><div className="portfolio-aurora portfolio-aurora-three" /><div className="portfolio-preview-hero-grid"><div className="portfolio-preview-copy"><div className="portfolio-availability"><i /> Available for new projects</div><h2>Designing interfaces that <em>feel alive</em>.</h2><p>{about || 'I’m Aria — a product designer & design engineer crafting premium digital experiences, from first sketch to shipped product. I turn complex problems into interfaces people love to use.'}</p><div className="portfolio-preview-actions"><button className="portfolio-primary-button" onClick={() => goTo('.portfolio-preview-work')}>View my work <ArrowRight size={14} /></button><button className="portfolio-secondary-button" onClick={() => goTo('.portfolio-preview-contact')}><Sparkles size={14} /> Let's collaborate</button></div><dl className="portfolio-stats"><div><dt>Years of experience</dt><dd>8+</dd><small>Years of experience</small></div><div><dt>Projects shipped</dt><dd>60+</dd><small>Projects shipped</small></div><div><dt>Design awards</dt><dd>12</dd><small>Design awards</small></div></dl></div><div className="portfolio-portrait-wrap"><div className="portfolio-portrait-glow" /><div className="portfolio-portrait-card"><img src={heroImage} alt={`${businessName || 'Aria'} portrait`} /></div><div className="portfolio-float portfolio-float-focus"><small>Focus</small><b>Design Systems</b></div><div className="portfolio-float portfolio-float-ai"><Sparkles size={14} /><b>AI Prototyping</b></div><div className="portfolio-float portfolio-float-current"><small>Currently</small><b>Freelance · Worldwide</b></div></div></div></section><div className="portfolio-marquee"><div className="portfolio-marquee-track">{['Product Design', 'Design Systems', 'UX Research', 'Prototyping', 'Motion Design', 'Brand Identity', 'Design Engineering', 'Interaction Design', 'Product Design', 'Design Systems'].map((item, index) => <span key={`${item}-${index}`}>{item}<Sparkles size={13} /></span>)}</div></div><section id="work" className="portfolio-preview-work"><div className="portfolio-section-heading"><div><small>Selected Work</small><h3>Projects with a pulse</h3></div><p>A few favorites from the last few years — products, brands and experiments that shipped and made a dent.</p></div><div className="portfolio-work-grid">{work.map(([name, description, tagOne, tagTwo, year], index) => <article key={name} className="portfolio-work-card"><div className="portfolio-work-image"><img src={workImages[index]} alt={name} /><span>{year}</span></div><div className="portfolio-work-copy"><div><h4>{name}</h4><ArrowUpRight size={15} /></div><p>{description}</p><div className="portfolio-tags"><span>{tagOne}</span><span>{tagTwo}</span></div></div></article>)}</div></section><section id="about" className="portfolio-preview-about"><div><small>About</small><h3>Behind the pixels</h3></div><div><p>I'm a product designer and design engineer with 8+ years shaping digital products for startups and global brands. I live where design meets code — sketching in the morning, prototyping in the afternoon, and arguing about easing curves by evening.</p><p>My work spans fintech, wellness, fashion and developer tools, and it's always built on the same foundation: clarity, systems thinking, and a healthy obsession with detail.</p><ul><li>Design is how it works, not just how it looks.</li><li>Ship small, learn fast, polish relentlessly.</li><li>Systems over screens — build once, reuse everywhere.</li></ul></div></section><section id="services" className="portfolio-preview-services"><div className="portfolio-section-heading"><div><small>Services</small><h3>What I can do for you</h3></div></div><div className="portfolio-service-grid">{[[Palette, 'Product Design', 'End-to-end design of web and mobile products — flows, wireframes, polished UI and handoff-ready specs.'], [LayoutDashboard, 'Design Systems', 'Scalable token-based systems with component libraries, documentation and governance your team will actually use.'], [Compass, 'UX Research & Strategy', 'Interviews, testing and journey mapping that de-risk decisions before a single pixel gets pushed.'], [WandSparkles, 'Motion & Interaction', 'Micro-interactions, animated prototypes and launch visuals that make products feel alive.']].map(([Icon, name, description]) => <article key={name}><span><Icon size={17} /></span><h4>{name}</h4><p>{description}</p></article>)}</div></section><footer id="contact" className="portfolio-preview-contact"><div className="portfolio-contact-aurora" /><div><small>Contact</small><h3>Let's make something <em>extraordinary</em></h3><p>Have a product to build, a brand to shape, or just a wild idea? My inbox is always open — I reply within a day.</p><a href={`mailto:${email || 'hello@ariakapoor.design'}`}>{email || 'hello@ariakapoor.design'} <ArrowUpRight size={13} /></a></div><div className="portfolio-socials"><button onClick={() => goTo('.portfolio-preview-work')}>View work</button><a href={`https://wa.me/${normalizeWhatsAppNumber(whatsappNumber)}`} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="portfolio-preview-footer"><b>{businessName || 'Aria Kapoor'}</b><span>Designed & built with care · 2026</span></div></footer></div><PreviewWhatsAppFloat number={whatsappNumber} /></div></div>;
}

function ManufacturingPreview({ template, businessName, tagline, about, phone, email, city, address, mapUrl, whatsappNumber, ctaLabel, mediaPreviews = [] }) {
  const [viewport, setViewport] = useState('desktop');
  const rootRef = useRef(null);
  const assets = {
    hero: 'https://forge-field-machinery.lovable.app/assets/hero-cnc-B7Fq_wXF.jpg',
    banner: 'https://forge-field-machinery.lovable.app/assets/factory-wide-banner-Cm8cxQHX.png',
    about: 'https://forge-field-machinery.lovable.app/assets/about-factory-D8WDdhAp.jpg',
    inspection: 'https://forge-field-machinery.lovable.app/assets/inspection-quality-DDxvtax3.png',
    workshop: 'https://forge-field-machinery.lovable.app/assets/workshop-process-Dt9buoCO.png',
    batch: 'https://forge-field-machinery.lovable.app/assets/component-batch-CNAGSF6H.png',
    shaft: 'https://forge-field-machinery.lovable.app/assets/shaft-closeup-BIH9IddR.jpg',
    industries: ['https://forge-field-machinery.lovable.app/assets/industry-agri-machinery-BtV-3hqt.jpg', 'https://forge-field-machinery.lovable.app/assets/industry-tractor-DNA1yTB5.jpg', 'https://forge-field-machinery.lovable.app/assets/industry-engineering-C03c8Tz6.jpg'],
    products: ['https://forge-field-machinery.lovable.app/assets/product-stub-axle-DJrHctUK.jpg', 'https://forge-field-machinery.lovable.app/assets/product-rotavator-shaft-BP4Zim18.jpg', 'https://forge-field-machinery.lovable.app/assets/product-input-shaft-0Z5yomk6.jpg', 'https://forge-field-machinery.lovable.app/assets/product-pipe-flange-CnPRzqJc.jpg', 'https://forge-field-machinery.lovable.app/assets/product-tractor-components-CCQIUWEb.jpg', 'https://forge-field-machinery.lovable.app/assets/product-agri-tools-BY_WZpGT.jpg']
  };
  const custom = (section) => mediaPreviews.find((media) => media.section === section)?.url;
  const goTo = (selector) => rootRef.current?.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const products = [
    ['Trailer Stub Axles', 'Axle Components', 'Precision-engineered axle components designed for agricultural trailers and heavy-duty applications.'],
    ['Rotavator Shafts', 'Power Transmission', 'Durable shafts manufactured for reliable power transmission in rotavator systems.'],
    ['Input Shafts', 'Power Transmission', 'Precision-machined input shafts designed for accurate fitment and dependable operation.'],
    ['Pipe Flanges', 'Machined Components', 'Industrial-grade machined flanges for mechanical and engineering applications.'],
    ['Tractor Components', 'Tractor Parts', 'Precision parts for tractor assemblies, replacement supply and custom requirements.'],
    ['Agricultural Tools & Components', 'Field Equipment', 'Practical components for agricultural equipment, built to supplied requirements.']
  ];
  const capabilities = [
    ['CNC Turning', 'Shafts, journals, shoulders and stepped components machined for repeatable fitment.'],
    ['Milling & Drilling', 'Flanges, brackets, mounting faces and bolt-hole patterns produced to drawing.'],
    ['Spline & Profile Work', 'Power-transmission profiles and mating features prepared for assembly requirements.'],
    ['Batch Staging', 'Components organized, checked and prepared for reliable dispatch cycles.'],
    ['Custom Components', 'Manufacturing support for OEM, replacement and requirement-specific agricultural parts.']
  ];
  return <div ref={rootRef} className="builder-preview full-site-preview-panel manufacturing-preview-panel"><div className="preview-toolbar"><span>{template?.name || 'Manufacturing'} template preview</span><div className="preview-viewports"><button className={viewport === 'desktop' ? 'active' : ''} onClick={() => setViewport('desktop')}><Monitor size={14} /> Desktop</button><button className={viewport === 'tablet' ? 'active' : ''} onClick={() => setViewport('tablet')}><Tablet size={14} /> Tablet</button><button className={viewport === 'mobile' ? 'active' : ''} onClick={() => setViewport('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-frame full-preview-frame viewport-${viewport}`}><div className="manufacturing-preview-site">
    <header className="manufacturing-nav"><button className="manufacturing-brand" onClick={() => goTo('.manufacturing-preview-site')}><span className="manufacturing-monogram">SG</span><span><b>{businessName || 'Shree Gurukrupa'}</b><small>ENTERPRISES · PRECISION MANUFACTURING</small></span></button><nav><button onClick={() => goTo('#manufacturing-about')}>About</button><button onClick={() => goTo('#manufacturing-products')}>Products</button><button onClick={() => goTo('#manufacturing-capabilities')}>Capabilities</button><button onClick={() => goTo('#manufacturing-quality')}>Quality</button><button onClick={() => goTo('#manufacturing-contact')}>Contact</button></nav><button className="manufacturing-nav-cta" onClick={() => goTo('#manufacturing-contact')}>{ctaLabel || 'Request a Quote'} <ArrowUpRight size={14} /></button></header>
    <section className="manufacturing-hero"><img src={custom('hero') || assets.hero} alt="CNC manufacturing workshop" /><div className="manufacturing-hero-overlay" /><div className="manufacturing-hero-copy"><span className="manufacturing-eyebrow">AGRICULTURAL MACHINERY COMPONENTS · KOLHAPUR</span><h2>Engineered for <em>performance.</em><br />Built for the field.</h2><p>{tagline || 'Precision agricultural machinery components, tractor parts and machined engineering components.'}</p><div className="manufacturing-actions"><button className="manufacturing-primary" onClick={() => goTo('#manufacturing-contact')}>{ctaLabel || 'Request a Quote'} <ArrowRight size={15} /></button><button className="manufacturing-ghost" onClick={() => goTo('#manufacturing-products')}>Explore products <ArrowRight size={15} /></button></div></div><div className="manufacturing-hero-stamp"><span>SG</span><b>PRECISION<br />STRENGTH<br />RELIABILITY</b></div></section>
    <div className="manufacturing-trust-strip"><span><b>01</b> Machined parts</span><span><b>02</b> Checked output</span><span><b>03</b> Kolhapur base</span><span><b>04</b> Requirement-led supply</span></div>
    <section id="manufacturing-about" className="manufacturing-about manufacturing-section"><div className="manufacturing-section-label">01 · ABOUT</div><div className="manufacturing-about-grid"><div><h3>Manufacturing discipline from <em>Shiroli MIDC.</em></h3><p>{about || 'Precision agricultural machinery components, tractor parts and machined engineering components from Shiroli MIDC, Kolhapur.'}</p><button className="manufacturing-text-link" onClick={() => goTo('#manufacturing-capabilities')}>How we work <ArrowUpRight size={14} /></button></div><div className="manufacturing-about-image"><img src={custom('about') || assets.about} alt="Manufacturing facility" /><span>01 / FACILITY</span></div></div></section>
    <section id="manufacturing-products" className="manufacturing-products manufacturing-section"><div className="manufacturing-section-label">02 · PRODUCT RANGE</div><div className="manufacturing-heading-row"><div><h3>Agricultural machinery <em>components.</em></h3><p>A focused range of shafts, axles, flanges, tractor parts and custom engineering components manufactured to supplied requirements.</p></div><span className="manufacturing-outline-number">06</span></div><div className="manufacturing-product-grid">{products.map(([name, category, description], index) => <article className="manufacturing-product-card" key={name}><div className="manufacturing-product-image"><img src={assets.products[index]} alt={name} /><span>0{index + 1}</span></div><div className="manufacturing-product-copy"><small>{category}</small><h4>{name}</h4><p>{description}</p><button onClick={() => goTo('#manufacturing-contact')}>Ask about it <ArrowUpRight size={14} /></button></div></article>)}</div></section>
    <section id="manufacturing-capabilities" className="manufacturing-capabilities manufacturing-section"><div className="manufacturing-section-label">03 · CAPABILITIES</div><div className="manufacturing-heading-row"><div><h3>Machining capability for <em>working components.</em></h3><p>Turning, milling, drilling, staging and custom component support for agricultural machinery and engineering requirements.</p></div></div><div className="manufacturing-capability-grid">{capabilities.map(([name, description], index) => <article key={name}><span>0{index + 1}</span><div><h4>{name}</h4><p>{description}</p></div><ArrowUpRight size={16} /></article>)}</div></section>
    <section className="manufacturing-process manufacturing-section"><div className="manufacturing-section-label">04 · PROCESS</div><div className="manufacturing-process-grid"><div><h3>A compact process from requirement to <em>dispatch.</em></h3><p>The production story is kept simple and verifiable: review, plan, machine, inspect and dispatch.</p></div><div className="manufacturing-process-steps">{[['01', 'Review', 'Drawing, sample or requirement notes.'], ['02', 'Machine', 'Turning, milling and profile work.'], ['03', 'Inspect', 'Fitment-focused output checks.'], ['04', 'Dispatch', 'Batch staged for dependable supply.']].map(([number, title, copy]) => <div key={number}><b>{number}</b><h4>{title}</h4><p>{copy}</p></div>)}</div></div></section>
    <section id="manufacturing-quality" className="manufacturing-quality manufacturing-section"><div className="manufacturing-quality-image"><img src={custom('quality') || assets.inspection} alt="Quality inspection" /></div><div className="manufacturing-quality-copy"><div className="manufacturing-section-label">05 · QUALITY</div><h3>Measured where <em>fitment matters.</em></h3><p>Inspection is presented honestly: no invented certifications, only the checks and discipline that support dependable machined components.</p><div className="manufacturing-quality-points"><span><Check size={15} /> No invented dimensions</span><span><Check size={15} /> Honest specifications</span><span><Check size={15} /> Requirement-linked output</span></div></div></section>
    <section className="manufacturing-industries manufacturing-section"><div className="manufacturing-section-label">06 · INDUSTRIES</div><div className="manufacturing-heading-row"><div><h3>Built around agricultural <em>machinery supply.</em></h3><p>Serving machinery builders, tractor part networks, trailer applications and engineering buyers with requirement-led components.</p></div></div><div className="manufacturing-industry-grid">{[['Agricultural machinery', 'Field-ready assemblies and equipment.', assets.industries[0]], ['Tractor parts', 'Replacement and fitment-focused supply.', assets.industries[1]], ['Engineering buyers', 'Custom components and repeat batches.', assets.industries[2]]].map(([name, copy, image]) => <article key={name}><img src={image} alt={name} /><div><small>INDUSTRY</small><h4>{name}</h4><p>{copy}</p><button onClick={() => goTo('#manufacturing-contact')}>Discuss a requirement <ArrowUpRight size={13} /></button></div></article>)}</div></section>
    <section className="manufacturing-gallery manufacturing-section"><div className="manufacturing-section-label">07 · WORKSHOP</div><div className="manufacturing-gallery-grid"><img src={assets.banner} alt="Factory floor" /><img src={custom('gallery') || assets.workshop} alt="Workshop process" /><img src={assets.batch} alt="Component batch" /></div></section>
    <section id="manufacturing-contact" className="manufacturing-rfq manufacturing-section"><div><div className="manufacturing-section-label">08 · REQUEST FOR QUOTE</div><h3>Send the drawing, sample or <em>requirement.</em></h3><p>Use the quote form for product enquiries, custom components and recurring batch requirements.</p><div className="manufacturing-contact-details"><span>{city || 'Kolhapur'}, Maharashtra</span><span>{phone || 'WhatsApp enquiry available'}</span><span>{email || 'Specification-led supply'}</span></div></div><form onSubmit={(event) => submitTemplateFormToWhatsApp(event, { number: whatsappNumber, businessName, subject: 'I would like a manufacturing quote.' })}><label>Name<input name="name" placeholder="Your name" required /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Phone<input name="phone" placeholder="+91" /></label><label>Product interest<select name="product"><option>Trailer Stub Axles</option><option>Rotavator Shafts</option><option>Input Shafts</option><option>Custom component</option></select></label><label className="manufacturing-form-wide">Requirement<textarea name="requirement" rows="4" placeholder="Share drawing, sample or requirement notes" /></label><button type="submit" className="manufacturing-primary">Send requirement <ArrowRight size={15} /></button></form></section>
    <footer className="manufacturing-footer"><div className="manufacturing-footer-outline">GURUKRUPA</div><div className="manufacturing-footer-row"><div><b>SG · SHREE GURUKRUPA</b><small>ENTERPRISES</small></div><p>Precision-manufactured agricultural machinery and tractor components from Shiroli MIDC, Kolhapur — engineered for strength, accuracy and dependable performance.</p><button onClick={() => goTo('.manufacturing-preview-site')}>Back to top <ArrowUpRight size={13} /></button></div><div className="manufacturing-footer-bottom"><span>PRECISION · STRENGTH · RELIABILITY</span><span>{address || 'Shiroli MIDC, Kolhapur, Maharashtra 416122'}</span></div></footer>
  </div></div><PreviewWhatsAppFloat number={whatsappNumber} /></div>;
}

function FullWebsitePreview({ template, businessName, tagline, about, phone, whatsappNumber, email, city, address, mapUrl, hours, ctaLabel, mediaPreviews, packageId, sectionContent, categoryContent }) {
  const [viewport, setViewport] = useState('desktop');
  const [page, setPage] = useState('home');
  const images = mediaPreviews.length ? mediaPreviews.map((item) => item.url) : [template.thumbnail_url, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'];
  const pageTabs = packageId === 'static' ? [{ id: 'home', label: 'One-page site' }] : [{ id: 'home', label: 'Homepage' }, { id: 'about', label: 'About page' }];
  if (template.designVariant) return <BusinessVariantPreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} categoryContent={categoryContent} />;
  if (template.category_slug === 'portfolios') return <PortfolioPreview template={template} businessName={businessName} about={about} email={email} whatsappNumber={whatsappNumber} mediaPreviews={mediaPreviews} />;
  if (template.category_slug === 'manufacturing') return <ManufacturingPreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} mapUrl={mapUrl} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} />;
  if (template.name === 'Maison Aurele') return <MaisonAurelePreview businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} hours={hours} ctaLabel={ctaLabel} whatsappNumber={whatsappNumber} mediaPreviews={mediaPreviews} sectionContent={sectionContent} viewport={viewport} setViewport={setViewport} />;
  if (template.pages >= 3) return <CategoryThreePagePreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} mapUrl={mapUrl} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} categoryContent={categoryContent} />;
  return <CategoryWebsitePreview template={template} businessName={businessName} tagline={tagline} about={about} phone={phone} email={email} city={city} address={address} hours={hours} whatsappNumber={whatsappNumber} ctaLabel={ctaLabel} mediaPreviews={mediaPreviews} categoryContent={categoryContent} />;
}

function MaisonAurelePreviewStatic({ businessName, tagline, about, phone, email, city, address, hours, ctaLabel, whatsappNumber, viewport, setViewport }) {
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const root = document.querySelector('.maison-preview-panel');
    if (!root) return undefined;
    const handleSubmit = (event) => {
      if (event.target?.tagName !== 'FORM') return;
      submitTemplateFormToWhatsApp(event, { number: whatsappNumber, businessName, subject: 'I would like to request a table reservation.' });
    };
    root.addEventListener('submit', handleSubmit, true);
    return () => root.removeEventListener('submit', handleSubmit, true);
  }, [businessName, whatsappNumber]);
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

function ServicesPage() {
  const services = [
    { icon: Rocket, label: '01 · LAUNCH', title: 'Hosting & domain setup', copy: 'Connect your domain, hosting and production deployment so your website is live and ready for customers.', price: 'Quotation' },
    { icon: PanelLeft, label: '02 · CONTROL', title: 'Independent admin panel', copy: 'Manage enquiries, products, bookings or business content from a simple admin workspace after launch.', price: 'Quotation' },
    { icon: BarChart3, label: '03 · DISCOVERY', title: 'SEO foundation', copy: 'Get metadata, sitemap, indexing setup, analytics and a practical launch checklist for search visibility.', price: 'From ₹2,500' },
    { icon: LifeBuoy, label: '04 · CARE', title: 'Monthly maintenance', copy: 'Keep your website secure, backed up, updated and supported with regular content improvements.', price: 'Recurring' }
  ];
  return <main className="services-page section-pad"><div className="container"><div className="services-page-hero"><div><div className="eyebrow"><span className="eyebrow-dot" /> Website services for growing businesses</div><h1>Bring in help<br /><em>when you need it.</em></h1><p>Start with a strong website and add the right support as your business grows. Every service is scoped clearly and connected to your next practical step.</p><button className="button button-orange" onClick={() => openServiceWhatsApp('website services')}>Talk to us on WhatsApp <ArrowRight size={16} /></button></div><div className="services-page-hero-card"><span>WEBBASKET / SERVICES</span><strong>Good websites<br /><em>keep moving.</em></strong><div><b>4</b><small>ways we can help<br />after launch</small></div></div></div><div className="services-page-list">{services.map(({ icon: Icon, label, title, copy, price }) => <article className="service-page-row" key={title}><div className="service-page-icon"><Icon size={22} /></div><div className="service-page-copy"><small>{label}</small><h2>{title}</h2><p>{copy}</p></div><strong className="service-page-price">{price}</strong><button className="text-link service-page-action" onClick={() => openServiceWhatsApp(title)}>Ask about it <ArrowUpRight size={15} /></button></article>)}</div><section className="services-page-note"><div><div className="eyebrow eyebrow-light">A clear next step</div><h2>Not sure what you need yet?</h2><p>Tell us about your business and we will recommend the right service for your website.</p></div><button className="button button-orange" onClick={() => openServiceWhatsApp('a website service recommendation')}>Get a recommendation <ArrowRight size={15} /></button></section></div></main>;
}

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
