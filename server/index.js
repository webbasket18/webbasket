import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Razorpay from 'razorpay';
import multer from 'multer';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4000);
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root'
};
const database = process.env.DB_NAME || 'webguruji';
const storageDir = path.join(__dirname, 'storage');
let pool;

const packageCatalog = {
  static: { id: 'static', name: 'Static Website', pages: 1, price: 1000 },
  'dynamic-3': { id: 'dynamic-3', name: 'Dynamic Website', pages: 3, price: 1500 },
  'dynamic-5': { id: 'dynamic-5', name: 'Dynamic Website', pages: 5, price: 2000 }
};

const categorySeeds = [
  ['Restaurants', 'restaurants', 'Menus, reservations and neighbourhood favourites.', '#F28C28'],
  ['Salons & Beauty', 'salons', 'Elegant service menus that make bookings feel easy.', '#D94680'],
  ['Construction', 'construction', 'Credible project stories for teams that build.', '#2563EB'],
  ['Clinics', 'clinics', 'Calm, accessible pages for trusted care.', '#0F766E'],
  ['Real Estate', 'real-estate', 'Property-first experiences for local agents.', '#7C3AED'],
  ['Professional Services', 'professional-services', 'A sharp digital presence for experts.', '#475569']
];

const templateSeeds = [
  ['restaurants', 'Maison Aurele', 'A cinematic one-page restaurant website with menu storytelling and table reservations.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85', 'ivory'],
  ['salons', 'Mira Studio', 'A polished one-page salon website for services, stylists and appointments.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', 'rose'],
  ['construction', 'Form & Foundation', 'A confident one-page construction website for projects, services and enquiries.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85', 'cobalt'],
  ['clinics', 'Mediwell Clinic', 'A calm one-page clinic website for treatments, doctors and appointments.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85', 'mint'],
  ['real-estate', 'Cedar & Co.', 'A property-first one-page website for listings, trust and enquiries.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', 'violet'],
  ['professional-services', 'Northstar Advisory', 'A sharp one-page professional website for expertise, proof and enquiries.', 1, 'Static', 1000, 1, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85', 'slate'],
  ['restaurants', 'Saffron Table', 'A three-page restaurant website for menu, story and reservations.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85', 'saffron'],
  ['salons', 'Atelier Mira', 'A three-page salon website for services, team and appointments.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', 'blush'],
  ['construction', 'Builtline Studio', 'A three-page construction website for work, capabilities and enquiries.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85', 'steel'],
  ['clinics', 'Harbor Health', 'A three-page clinic website for care, specialists and appointments.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85', 'sky'],
  ['real-estate', 'Hearth & Key', 'A three-page property website for listings, advice and enquiries.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', 'sand'],
  ['professional-services', 'Fieldnote Partners', 'A three-page advisory website for expertise, proof and contact.', 3, 'Dynamic', 1500, 0, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', 'graphite'],
];

const publishedTemplateSlugs = ['maison-aurele', 'mira-studio', 'form-foundation', 'mediwell-clinic', 'cedar-co', 'cedar-co-', 'northstar-advisory', 'saffron-table', 'atelier-mira', 'builtline-studio', 'harbor-health', 'hearth-key', 'fieldnote-partners'];

async function initializeDatabase() {
  const adminConnection = await mysql.createConnection(dbConfig);
  await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await adminConnection.end();
  pool = mysql.createPool({ ...dbConfig, database, waitForConnections: true, connectionLimit: 8, namedPlaceholders: true });
  await fs.mkdir(storageDir, { recursive: true });
  await fs.mkdir(path.join(storageDir, 'artifacts'), { recursive: true });
  await fs.mkdir(path.join(storageDir, 'uploads'), { recursive: true });
  await fs.mkdir(path.join(storageDir, 'templates'), { recursive: true });
  const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
  for (const statement of schema.split(';').map((part) => part.trim()).filter(Boolean)) await pool.query(statement);
  const [templateColumns] = await pool.query('SHOW COLUMNS FROM templates');
  const existingTemplateColumns = new Set(templateColumns.map((column) => column.Field));
  if (!existingTemplateColumns.has('template_path')) await pool.query('ALTER TABLE templates ADD COLUMN template_path VARCHAR(500) NULL');
  if (!existingTemplateColumns.has('form_schema')) await pool.query('ALTER TABLE templates ADD COLUMN form_schema JSON NULL');
  await seedDatabase();
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name);
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data);
    const checksum = crc32(data);
    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0, 6); local.writeUInt16LE(0, 8); local.writeUInt16LE(0, 10); local.writeUInt16LE(0, 12); local.writeUInt32LE(checksum, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28); name.copy(local, 30);
    localParts.push(local, data);
    const central = Buffer.alloc(46 + name.length);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0, 8); central.writeUInt16LE(0, 10); central.writeUInt16LE(0, 12); central.writeUInt16LE(0, 14); central.writeUInt32LE(checksum, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(name.length, 28); central.writeUInt16LE(0, 30); central.writeUInt16LE(0, 32); central.writeUInt16LE(0, 34); central.writeUInt16LE(0, 36); central.writeUInt32LE(0, 38); central.writeUInt32LE(offset, 42); name.copy(central, 46);
    centralParts.push(central); offset += local.length + data.length;
  }
  const central = Buffer.concat(centralParts); const locals = Buffer.concat(localParts); const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(central.length, 12); end.writeUInt32LE(locals.length, 16); end.writeUInt16LE(0, 20);
  return Buffer.concat([locals, central, end]);
}

async function createSourceArtifact(orderId, userId) {
  const [[order]] = await pool.query('SELECT o.*, p.project_name, p.business_name, p.content, t.name AS template_name, t.template_path FROM orders o JOIN website_projects p ON p.id = o.project_id JOIN templates t ON t.id = p.template_id WHERE o.id = ? AND o.user_id = ? AND o.status = "paid"', [orderId, userId]);
  if (!order) return null;
  const content = typeof order.content === 'string' ? JSON.parse(order.content) : order.content || {};
  const safeName = (order.business_name || order.project_name || 'web-guruji-site').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const files = [
    { name: 'README.md', data: `# ${order.project_name}\n\nGenerated by WebBasket.\n\nTemplate: ${order.template_name}\nPackage: ${order.package_id}\n\n## Run\nOpen site/index.html or serve this folder with any static web server.\n` },
    { name: 'site/index.html', data: `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${order.business_name || order.project_name}</title><link rel="stylesheet" href="./styles.css"></head><body><main class="hero"><small>WEBSITE BY WEBBASKET</small><h1>${order.business_name || order.project_name}</h1><p>${content.tagline || 'Your business. Your website.'}</p><section>${content.about || 'A thoughtful digital home for your business.'}</section><p>${content.address || ''}<br>${content.city || ''}<br>${content.hours || ''}</p><a href="tel:${content.phone || ''}">${content.phone || 'Call the business'}</a> <a href="mailto:${content.email || 'hello@example.com'}">Email us</a></main></body></html>` },
    { name: 'site/styles.css', data: `:root{font-family:Inter,Arial,sans-serif;color:#14213d;background:#f8fafc}body{margin:0}.hero{max-width:760px;margin:18vh auto;padding:48px;background:#fff;border-radius:22px;box-shadow:0 20px 60px #14213d18}small{letter-spacing:.15em;color:#d97010}h1{font-size:clamp(40px,8vw,82px);line-height:.95;margin:18px 0}p{font-size:20px;color:#667085}.hero section{margin:30px 0;line-height:1.7}.hero a{display:inline-block;padding:13px 18px;color:#fff;background:#f28c28;border-radius:8px;text-decoration:none}` },
    { name: 'content.json', data: JSON.stringify({ businessName: order.business_name, content }, null, 2) }
  ];
  const uploadedMatch = String(order.template_path || '').match(/^\/template-assets\/([^/]+)\//);
  if (uploadedMatch) {
    const uploadedRoot = path.join(storageDir, 'templates', uploadedMatch[1]);
    const uploadedFiles = [];
    const collectFiles = async (directory, relative = '') => {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        const entryRelative = path.join(relative, entry.name);
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) await collectFiles(entryPath, entryRelative);
        else uploadedFiles.push({ name: `site/${entryRelative.replace(/\\/g, '/')}`, data: await fs.readFile(entryPath) });
      }
    };
    try { await collectFiles(uploadedRoot); if (uploadedFiles.length) files.splice(1, files.length - 1, ...uploadedFiles); } catch { /* keep the generated fallback if the uploaded folder is unavailable */ }
  }
  const [mediaRows] = await pool.query('SELECT original_name, mime_type, storage_path FROM website_media WHERE project_id = ? ORDER BY created_at', [order.project_id]);
  for (const media of mediaRows) {
    try { files.push({ name: `site/assets/${path.basename(media.storage_path)}`, data: await fs.readFile(media.storage_path) }); } catch { /* a missing optional upload must not block the paid archive */ }
  }
  const archive = makeZip(files); const checksum = crypto.createHash('sha256').update(archive).digest('hex'); const filename = `${safeName || 'web-guruji-site'}-source.zip`; const storagePath = path.join(storageDir, 'artifacts', `${checksum}.zip`);
  await fs.writeFile(storagePath, archive);
  const [result] = await pool.query('INSERT INTO source_code_artifacts (order_id, project_id, user_id, filename, storage_path, sha256, size_bytes) VALUES (?, ?, ?, ?, ?, ?, ?)', [order.id, order.project_id, userId, filename, storagePath, checksum, archive.length]);
  await pool.query('INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)', [userId, 'Source code ready', `${filename} is ready for secure download.`]);
  return { id: result.insertId, filename, sizeBytes: archive.length, sha256: checksum };
}

function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character])); }

function renderProjectPreview(project) {
  const content = typeof project.content === 'string' ? JSON.parse(project.content) : project.content || {};
  const title = escapeHtml(project.business_name || project.project_name);
  const tagline = escapeHtml(content.tagline || 'Your business. Your website.');
  const about = escapeHtml(content.about || 'A thoughtful digital home for your business.');
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} — Preview</title><style>:root{font-family:Inter,Arial,sans-serif;color:#073b91;background:#f5f9ff}body{margin:0}.bar{padding:10px 20px;color:#fff;background:#073b91;text-align:center;font-size:12px}.hero{max-width:900px;margin:8vh auto;padding:70px 8%;background:#fff;border-radius:24px;box-shadow:0 24px 70px #073b9122}.eyebrow{color:#df5d00;letter-spacing:.16em;font-size:11px;font-weight:bold}h1{font-size:clamp(44px,8vw,90px);line-height:.95;margin:20px 0}p{font-size:20px;color:#667085;line-height:1.6}.about{max-width:650px;margin:34px 0;padding-top:25px;border-top:1px solid #dce6f5;line-height:1.8;color:#475569}.cta{display:inline-block;padding:14px 20px;color:#fff;background:#ff7a00;border-radius:8px;text-decoration:none;font-weight:bold}</style></head><body><div class="bar">Private preview generated by WebBasket</div><main class="hero"><div class="eyebrow">${escapeHtml(project.template_name || 'CUSTOM WEBSITE')}</div><h1>${title}</h1><p>${tagline}</p><div class="about">${about}</div><a class="cta" href="mailto:hello@example.com">Get in touch</a></main></body></html>`;
}

async function seedDatabase() {
  const [categoryRows] = await pool.query('SELECT COUNT(*) AS total FROM categories');
  if (categoryRows[0].total === 0) {
    for (const [name, slug, description, accent] of categorySeeds) await pool.query('INSERT INTO categories (name, slug, description, accent) VALUES (?, ?, ?, ?)', [name, slug, description, accent]);
  }
  for (const [categorySlug, name, description, pages, type, price, featured, thumbnail, palette] of templateSeeds) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const [[existing]] = await pool.query('SELECT id FROM templates WHERE slug = ?', [slug]);
    if (existing) continue;
    const [[category]] = await pool.query('SELECT id FROM categories WHERE slug = ?', [categorySlug]);
    await pool.query('INSERT INTO templates (category_id, name, slug, description, pages, type, price, featured, demo, thumbnail_url, palette, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?)', [category.id, name, slug, description, pages, type, price, Boolean(featured), thumbnail, palette, JSON.stringify(['Responsive layout', 'Content editor', 'Preview before purchase'])]);
  }
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, "admin") ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), role = "admin"', ['WebBasket Admin', process.env.ADMIN_EMAIL, hashPassword(process.env.ADMIN_PASSWORD)]);
  }
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, expected] = stored.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

async function issueSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  await pool.query('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))', [tokenHash, userId]);
  return token;
}

async function currentUser(req) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : (req.query.token || '');
  if (!token) return null;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const [[user]] = await pool.query('SELECT u.id, u.name, u.email, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ? AND s.expires_at > NOW()', [tokenHash]);
  return user || null;
}

async function requireAuth(req, res, next) {
  try {
    req.user = await currentUser(req);
    if (!req.user) return res.status(401).json({ message: 'Authentication required.' });
    next();
  } catch (error) { next(error); }
}

async function requireAdmin(req, res, next) {
  try {
    req.user = await currentUser(req);
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
    next();
  } catch (error) { next(error); }
}

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    const error = new Error('Razorpay credentials are not configured.');
    error.code = 'RAZORPAY_NOT_CONFIGURED';
    throw error;
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

function normalizeRazorpayAmount(amount) {
  const parsedAmount = typeof amount === 'string' && amount.trim() !== '' ? Number(amount) : amount;
  if (!Number.isInteger(parsedAmount) || parsedAmount < 100) return null;
  return parsedAmount;
}

async function createRazorpayOrder({ amount, currency = 'INR', receipt, notes }) {
  const normalizedAmount = normalizeRazorpayAmount(amount);
  if (normalizedAmount === null) {
    const error = new Error('Amount must be an integer of at least 100 paise.');
    error.code = 'INVALID_AMOUNT';
    throw error;
  }
  if (!currency || typeof currency !== 'string') {
    const error = new Error('Currency is required.');
    error.code = 'INVALID_CURRENCY';
    throw error;
  }
  return getRazorpayClient().orders.create({
    amount: normalizedAmount,
    currency: currency.toUpperCase(),
    receipt: String(receipt || `wg_${Date.now()}`).slice(0, 40),
    ...(notes ? { notes } : {})
  });
}

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !orderId || !paymentId || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
  const received = Buffer.from(String(signature), 'utf8');
  const generated = Buffer.from(expected, 'utf8');
  return received.length === generated.length && crypto.timingSafeEqual(received, generated);
}

function sendRazorpayError(error, res) {
  if (error.code === 'INVALID_AMOUNT' || error.code === 'INVALID_CURRENCY') return res.status(400).json({ message: error.message });
  if (error.code === 'RAZORPAY_NOT_CONFIGURED') return res.status(503).json({ message: error.message });
  if (error.statusCode === 401 || error.status === 401 || (error.error?.code === 'BAD_REQUEST_ERROR' && error.error?.description?.toLowerCase().includes('authentication'))) {
    return res.status(401).json({ message: 'Razorpay authentication failed. Check the server credentials.' });
  }
  console.error('Razorpay API error:', error.error?.description || error.message || error);
  return res.status(500).json({ message: 'Razorpay order creation failed.' });
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
const templateUpload = multer({ storage: multer.memoryStorage(), limits: { files: 300, fileSize: 15 * 1024 * 1024, fieldSize: 250 * 1024 } });
app.use('/template-assets', express.static(path.join(storageDir, 'templates'), { extensions: ['html'] }));

async function readStoredTemplateAsset(slug, relativePath) {
  const safeSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const safePath = sanitizeTemplatePath(relativePath);
  if (!safeSlug || !safePath) return null;
  const templateDirectory = path.join(storageDir, 'templates', safeSlug);
  const diskPath = path.join(templateDirectory, safePath);
  if (diskPath.startsWith(`${templateDirectory}${path.sep}`)) {
    try { return { content: await fs.readFile(diskPath), mimeType: null }; } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const [[asset]] = await pool.query('SELECT content, mime_type AS mimeType FROM template_assets ta JOIN templates t ON t.id = ta.template_id WHERE t.slug = ? AND ta.asset_path = ? LIMIT 1', [safeSlug, safePath]);
  return asset || null;
}

app.get('/template-assets/:slug/*', async (req, res) => {
  try {
    const asset = await readStoredTemplateAsset(req.params.slug, req.params[0]);
    if (!asset) return res.status(404).send('Template asset not found.');
    if (asset.mimeType) res.type(asset.mimeType);
    res.set('Cache-Control', 'public, max-age=300').send(asset.content);
  } catch (error) {
    console.error('Template asset error:', error.message);
    res.status(500).send('Could not load template asset.');
  }
});

app.get('/api/v1/template-pages/:slug', async (req, res) => {
  const slug = String(req.params.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const requestedPath = sanitizeTemplatePath(String(req.query.path || 'index.html')) || 'index.html';
  if (!slug || !requestedPath.toLowerCase().endsWith('.html')) return res.status(400).send('Invalid template page.');
  const templateDirectory = path.join(storageDir, 'templates', slug);
  try {
    const storedPage = await readStoredTemplateAsset(slug, requestedPath);
    if (!storedPage) return res.status(404).send('Template page not found.');
    const html = storedPage.content.toString('utf8');
    const pageDirectory = path.posix.dirname(requestedPath) === '.' ? '' : `${path.posix.dirname(requestedPath)}/`;
    const assetBase = `/template-assets/${slug}/${pageDirectory}`;
    const pageEndpoint = (pagePath, hash = '') => `/api/v1/template-pages/${slug}?path=${encodeURIComponent(pagePath)}${hash ? `#${hash}` : ''}`;
    const rewrittenLinks = html.replace(/(\bhref\s*=\s*["'])(?!https?:\/\/|mailto:|tel:|javascript:|#)([^"']+\.html(?:#[^"']*)?)(["'])/gi, (_match, prefix, value, suffix) => {
      const [relativePath, hash = ''] = value.split('#');
      const resolvedPath = path.posix.normalize(path.posix.join(path.posix.dirname(requestedPath), relativePath)).replace(/^\.\//, '');
      return `${prefix}${pageEndpoint(resolvedPath, hash)}${suffix}`;
    });
    const withBase = /<head[\s>]/i.test(rewrittenLinks) ? rewrittenLinks.replace(/<head([^>]*)>/i, `<head$1><base href="${assetBase}">`) : `<base href="${assetBase}">${rewrittenLinks}`;
    res.type('html').set('Cache-Control', 'public, max-age=300').send(withBase);
  } catch (error) {
    if (error.code === 'ENOENT') return res.status(404).send('Template page not found.');
    res.status(500).send('Could not load template page.');
  }
});

app.get('/api/v1/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, database }); }
  catch { res.status(503).json({ ok: false, message: 'Database unavailable' }); }
});

app.get('/api/v1/categories', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
  res.json(rows.map((row) => row.slug === 'restaurants' ? { ...row, description: 'One-page restaurant websites for menus, bookings and local customers.' } : row));
});

app.get('/api/v1/templates', async (req, res) => {
  const values = [publishedTemplateSlugs];
  let where = 'WHERE (t.demo = TRUE OR t.slug IN (?))';
  if (req.query.category && req.query.category !== 'All') { where += ' AND c.slug = ?'; values.push(req.query.category); }
  if (req.query.type && req.query.type !== 'All') { where += ' AND t.type = ?'; values.push(req.query.type); }
  if (req.query.search) { where += ' AND (t.name LIKE ? OR t.description LIKE ? OR c.name LIKE ?)'; values.push(`%${req.query.search}%`, `%${req.query.search}%`, `%${req.query.search}%`); }
  const [rows] = await pool.query(`SELECT t.*, c.name AS category_name, c.slug AS category_slug FROM templates t JOIN categories c ON c.id = t.category_id ${where} ORDER BY t.featured DESC, t.created_at DESC`, values);
  res.json(rows.map((row) => ({ ...row, features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features, form_schema: typeof row.form_schema === 'string' ? JSON.parse(row.form_schema) : (row.form_schema || []), preview_url: row.template_path || null })));
});

app.get('/api/v1/packages', (_req, res) => res.json([
  { ...packageCatalog.static, description: 'A focused one-page presence for getting online quickly.', includes: ['One responsive page', 'Business content and images', 'Source-code delivery after payment'] },
  { ...packageCatalog['dynamic-3'], description: 'A flexible three-page website for growing businesses.', includes: ['Three configured pages', 'Reusable sections', 'Enquiry-ready structure'] },
  { ...packageCatalog['dynamic-5'], description: 'A fuller story for brands that need room to grow.', includes: ['Five configured pages', 'Data-driven content', 'Expanded navigation'] }
]));

app.post('/api/v1/enquiries', async (req, res) => {
  const { name, email, phone = '', message, source = 'website' } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required.' });
  const [result] = await pool.query('INSERT INTO enquiries (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)', [name, email, phone, message, source]);
  res.status(201).json({ id: result.insertId, message: 'Thanks — the WebBasket team will get back to you.' });
});

app.post('/api/v1/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Name, email, and a password of at least 8 characters are required.' });
  try {
    const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashPassword(password)]);
    const token = await issueSession(result.insertId);
    res.status(201).json({ user: { id: result.insertId, name, email, role: 'customer' }, token });
  } catch (error) { res.status(409).json({ message: error.code === 'ER_DUP_ENTRY' ? 'An account with that email already exists.' : 'Could not create account.' }); }
});

app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
  const [[user]] = await pool.query('SELECT id, name, email, role, password_hash FROM users WHERE email = ?', [email]);
  if (!user || !verifyPassword(password, user.password_hash)) return res.status(401).json({ message: 'Invalid email or password.' });
  const token = await issueSession(user.id);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});

app.get('/api/v1/auth/me', requireAuth, async (req, res) => res.json({ user: req.user }));

app.post('/api/v1/auth/logout', requireAuth, async (req, res) => {
  const token = (req.headers.authorization || '').slice(7);
  await pool.query('DELETE FROM sessions WHERE id = ?', [crypto.createHash('sha256').update(token).digest('hex')]);
  res.json({ ok: true });
});

app.post('/api/v1/projects', async (req, res) => {
  const { templateId, projectName, businessName, content = {}, templateName, templateSlug, templateDescription = '', categorySlug = 'professional-services', categoryName = 'Professional Services', templatePages = 1, templateType = 'Static', templatePrice = 1000, thumbnailUrl = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85' } = req.body || {};
  if (!templateId || !projectName) return res.status(400).json({ message: 'Template and project name are required.' });
  let resolvedTemplateId = Number(templateId);
  const [[existingTemplate]] = await pool.query('SELECT id FROM templates WHERE id = ?', [resolvedTemplateId]);
  if (!existingTemplate) {
    const safeCategorySlug = String(categorySlug || 'professional-services').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120) || 'professional-services';
    let [[category]] = await pool.query('SELECT id, name FROM categories WHERE slug = ?', [safeCategorySlug]);
    if (!category) {
      try {
        const [categoryResult] = await pool.query('INSERT INTO categories (name, slug, description, accent) VALUES (?, ?, ?, ?)', [String(categoryName || safeCategorySlug).slice(0, 100), safeCategorySlug, `${categoryName || 'Business'} website templates.`, '#2563EB']);
        category = { id: categoryResult.insertId, name: categoryName || safeCategorySlug };
      } catch (error) {
        if (error.code !== 'ER_DUP_ENTRY') throw error;
        [[category]] = await pool.query('SELECT id, name FROM categories WHERE slug = ?', [safeCategorySlug]);
      }
    }
    const baseSlug = String(templateSlug || templateName || `template-${resolvedTemplateId}`).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 140) || `template-${resolvedTemplateId}`;
    const templateRecordSlug = `${baseSlug}-${resolvedTemplateId}`.slice(0, 159);
    const [[existingBySlug]] = await pool.query('SELECT id FROM templates WHERE slug = ?', [templateRecordSlug]);
    if (existingBySlug) resolvedTemplateId = existingBySlug.id;
    else {
      const [templateResult] = await pool.query('INSERT INTO templates (category_id, name, slug, description, pages, type, price, featured, demo, thumbnail_url, palette, features) VALUES (?, ?, ?, ?, ?, ?, ?, FALSE, TRUE, ?, ?, ?)', [category.id, String(templateName || projectName).slice(0, 140), templateRecordSlug, String(templateDescription || 'Customer-ready business website template.'), Math.max(1, Number(templatePages) || 1), templateType === 'Dynamic' ? 'Dynamic' : 'Static', Math.max(0, Number(templatePrice) || 0), thumbnailUrl, 'custom', JSON.stringify(['Responsive layout', 'Live preview', 'WhatsApp enquiry form'])]);
      resolvedTemplateId = templateResult.insertId;
    }
  }
  const user = await currentUser(req);
  const [result] = await pool.query('INSERT INTO website_projects (user_id, template_id, project_name, business_name, content) VALUES (?, ?, ?, ?, ?)', [user?.id || null, resolvedTemplateId, projectName, businessName || null, JSON.stringify(content)]);
  res.status(201).json({ id: result.insertId, status: 'draft' });
});

app.get('/api/v1/projects', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT p.*, t.name AS template_name, t.thumbnail_url FROM website_projects p JOIN templates t ON t.id = p.template_id WHERE p.user_id = ? ORDER BY p.updated_at DESC', [req.user.id]);
  res.json(rows.map((row) => ({ ...row, content: typeof row.content === 'string' ? JSON.parse(row.content) : row.content })));
});

app.put('/api/v1/projects/:id', requireAuth, async (req, res) => {
  const { projectName, businessName, content = {} } = req.body || {};
  const [result] = await pool.query('UPDATE website_projects SET project_name = COALESCE(?, project_name), business_name = COALESCE(?, business_name), content = ? WHERE id = ? AND user_id = ?', [projectName || null, businessName || null, JSON.stringify(content), req.params.id, req.user.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Project not found.' });
  res.json({ id: Number(req.params.id), status: 'draft' });
});

app.get('/api/v1/projects/:id/preview', requireAuth, async (req, res) => {
  const [[project]] = await pool.query('SELECT p.*, t.name AS template_name FROM website_projects p JOIN templates t ON t.id = p.template_id WHERE p.id = ? AND p.user_id = ?', [req.params.id, req.user.id]);
  if (!project) return res.status(404).send('Preview not found');
  res.type('html').send(renderProjectPreview(project));
});

app.post('/api/v1/orders', requireAuth, async (req, res) => {
  const { projectId, packageId } = req.body || {};
  const selectedPackage = packageCatalog[packageId];
  if (!projectId || !selectedPackage) return res.status(400).json({ message: 'A valid project and package are required.' });
  const [[project]] = await pool.query('SELECT id FROM website_projects WHERE id = ? AND user_id = ?', [projectId, req.user.id]);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  const [result] = await pool.query('INSERT INTO orders (user_id, project_id, package_id, amount) VALUES (?, ?, ?, ?)', [req.user.id, projectId, selectedPackage.id, selectedPackage.price]);
  let razorpayOrderId = null;
  const razorpayConfigured = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
  if (razorpayConfigured) {
    try {
      const razorpayOrder = await createRazorpayOrder({ amount: Math.round(selectedPackage.price * 100), currency: 'INR', receipt: `wg_${result.insertId}`, notes: { projectId: String(projectId), userId: String(req.user.id) } });
      razorpayOrderId = razorpayOrder.id;
      await pool.query('UPDATE orders SET razorpay_order_id = ? WHERE id = ?', [razorpayOrderId, result.insertId]);
    } catch (error) {
      return sendRazorpayError(error, res);
    }
  }
  res.status(201).json({ id: result.insertId, amount: selectedPackage.price, currency: 'INR', status: 'pending', razorpayConfigured, razorpayOrderId, razorpayKeyId: razorpayConfigured ? process.env.RAZORPAY_KEY_ID : null, message: razorpayConfigured ? 'Razorpay checkout order created.' : 'Order created. Add Razorpay keys to enable checkout.' });
});

app.post(['/api/create-order', '/api/v1/create-order'], async (req, res) => {
  const { amount, currency = 'INR', receipt, notes } = req.body || {};
  if (normalizeRazorpayAmount(amount) === null) return res.status(400).json({ message: 'Amount must be an integer of at least 100 paise.' });
  try {
    const order = await createRazorpayOrder({ amount, currency, receipt, notes });
    res.status(201).json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    sendRazorpayError(error, res);
  }
});

app.get('/api/v1/orders', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT o.*, p.project_name FROM orders o JOIN website_projects p ON p.id = o.project_id WHERE o.user_id = ? ORDER BY o.created_at DESC', [req.user.id]);
  res.json(rows);
});

app.post('/api/v1/payments/verify', requireAuth, async (req, res) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body || {};
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return res.status(503).json({ message: 'Razorpay secret is not configured.' });
  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return res.status(400).json({ message: 'Payment verification fields are required.' });
  const [[order]] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, req.user.id]);
  if (!order || order.razorpay_order_id !== razorpayOrderId) return res.status(404).json({ message: 'Order not found.' });
  if (!verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) return res.status(400).json({ message: 'Payment signature verification failed.' });
  await pool.query('UPDATE orders SET status = "paid", razorpay_payment_id = ?, razorpay_signature = ? WHERE id = ?', [razorpayPaymentId, razorpaySignature, orderId]);
  await pool.query('UPDATE website_projects SET status = "paid" WHERE id = ?', [order.project_id]);
  const [[existingArtifact]] = await pool.query('SELECT id, filename, size_bytes AS sizeBytes, sha256 FROM source_code_artifacts WHERE order_id = ?', [orderId]);
  const artifact = existingArtifact || await createSourceArtifact(orderId, req.user.id);
  res.json({ ok: true, status: 'paid', artifact });
});

app.post(['/api/verify-payment', '/api/v1/verify-payment'], async (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
  if (!orderId || !paymentId || !signature) return res.status(400).json({ message: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.' });
  if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ message: 'Razorpay secret is not configured.' });
  if (!verifyRazorpaySignature(orderId, paymentId, signature)) return res.status(400).json({ success: false, message: 'Payment signature verification failed.' });
  res.json({ success: true, razorpay_order_id: orderId, razorpay_payment_id: paymentId });
});

app.post('/api/v1/source-code/generate', requireAuth, async (req, res) => {
  const { orderId } = req.body || {};
  const [[order]] = await pool.query('SELECT id FROM orders WHERE id = ? AND user_id = ? AND status = "paid"', [orderId, req.user.id]);
  if (!order) return res.status(403).json({ message: 'Only paid orders can generate source code.' });
  const [[existing]] = await pool.query('SELECT id, filename, size_bytes AS sizeBytes, sha256 FROM source_code_artifacts WHERE order_id = ?', [orderId]);
  const artifact = existing || await createSourceArtifact(orderId, req.user.id);
  res.status(existing ? 200 : 201).json({ artifact });
});

app.get('/api/v1/source-code', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT id, order_id AS orderId, filename, size_bytes AS sizeBytes, sha256, created_at AS createdAt FROM source_code_artifacts WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json(rows);
});

app.get('/api/v1/source-code/:id/download', requireAuth, async (req, res) => {
  const [[artifact]] = await pool.query('SELECT * FROM source_code_artifacts WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  if (!artifact) return res.status(404).json({ message: 'Artifact not found.' });
  await pool.query('INSERT INTO download_events (artifact_id, user_id, ip_address, user_agent) VALUES (?, ?, ?, ?)', [artifact.id, req.user.id, req.ip, req.headers['user-agent'] || '']);
  res.download(artifact.storage_path, artifact.filename);
});

app.post('/api/v1/uploads', requireAuth, async (req, res) => {
  const { projectId, filename, mimeType, dataBase64 } = req.body || {};
  if (!projectId || !filename || !mimeType || !dataBase64) return res.status(400).json({ message: 'Project, filename, mime type, and base64 data are required.' });
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(mimeType)) return res.status(400).json({ message: 'Only PNG, JPEG, and WebP images are supported.' });
  const data = Buffer.from(dataBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
  if (data.length > 5 * 1024 * 1024) return res.status(413).json({ message: 'Images must be 5MB or smaller.' });
  const [[project]] = await pool.query('SELECT id FROM website_projects WHERE id = ? AND user_id = ?', [projectId, req.user.id]);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '-'); const storagePath = path.join(storageDir, 'uploads', `${crypto.randomUUID()}-${safeFilename}`); await fs.writeFile(storagePath, data);
  const [result] = await pool.query('INSERT INTO website_media (user_id, project_id, original_name, mime_type, storage_path, size_bytes) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, projectId, filename, mimeType, storagePath, data.length]);
  res.status(201).json({ id: result.insertId, filename, mimeType, sizeBytes: data.length });
});

app.delete('/api/v1/uploads/:id', requireAuth, async (req, res) => {
  const [[media]] = await pool.query('SELECT id, storage_path AS storagePath FROM website_media WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  if (!media) return res.status(404).json({ message: 'Image not found.' });
  await pool.query('DELETE FROM website_media WHERE id = ? AND user_id = ?', [media.id, req.user.id]);
  try { await fs.unlink(media.storagePath); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  res.json({ ok: true, id: media.id });
});

app.get('/api/v1/notifications', requireAuth, async (req, res) => { const [rows] = await pool.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 30', [req.user.id]); res.json(rows); });

app.post('/api/v1/support-tickets', requireAuth, async (req, res) => { const { subject, message } = req.body || {}; if (!subject || !message) return res.status(400).json({ message: 'Subject and message are required.' }); const [result] = await pool.query('INSERT INTO support_tickets (user_id, subject, message) VALUES (?, ?, ?)', [req.user.id, subject, message]); res.status(201).json({ id: result.insertId, status: 'open' }); });

app.post('/api/v1/payments/webhook', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const eventId = req.headers['x-razorpay-event-id'] || req.body?.id;
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return res.status(503).json({ message: 'Razorpay webhook secret is not configured.' });
  const rawPayload = JSON.stringify(req.body);
  const expected = crypto.createHmac('sha256', secret).update(rawPayload).digest('hex');
  if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return res.status(401).json({ message: 'Invalid webhook signature.' });
  if (!eventId) return res.status(400).json({ message: 'Webhook event id is required.' });
  try {
    await pool.query('INSERT INTO payment_webhook_events (event_id, event_type, payload) VALUES (?, ?, ?)', [eventId, req.body.event, JSON.stringify(req.body)]);
  } catch (error) { if (error.code === 'ER_DUP_ENTRY') return res.json({ ok: true, duplicate: true }); throw error; }
  const paymentEntity = req.body?.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id;
  if (orderId) {
    const status = req.body.event === 'payment.captured' ? 'paid' : 'failed';
    await pool.query('UPDATE orders SET status = ?, razorpay_payment_id = ? WHERE razorpay_order_id = ?', [status, paymentEntity.id || null, orderId]);
    if (status === 'paid') {
      const [[paidOrder]] = await pool.query('SELECT id, project_id, user_id FROM orders WHERE razorpay_order_id = ?', [orderId]);
      if (paidOrder) { await pool.query('UPDATE website_projects SET status = "paid" WHERE id = ?', [paidOrder.project_id]); const [[existingArtifact]] = await pool.query('SELECT id FROM source_code_artifacts WHERE order_id = ?', [paidOrder.id]); if (!existingArtifact) await createSourceArtifact(paidOrder.id, paidOrder.user_id); }
    }
  }
  res.json({ ok: true });
});

app.post('/api/v1/deployment-requests', requireAuth, async (req, res) => {
  const { projectId, customerName, phone, email, domainStatus = 'Not decided', hostingStatus = 'Not decided', requirements = '' } = req.body || {};
  if (!projectId || !customerName || !phone || !email) return res.status(400).json({ message: 'Project, name, phone, and email are required.' });
  const [[project]] = await pool.query('SELECT id FROM website_projects WHERE id = ? AND user_id = ?', [projectId, req.user.id]);
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  const [result] = await pool.query('INSERT INTO deployment_requests (user_id, project_id, customer_name, phone, email, domain_status, hosting_status, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.user.id, projectId, customerName, phone, email, domainStatus, hostingStatus, requirements]);
  res.status(201).json({ id: result.insertId, status: 'new' });
});

app.get('/api/v1/deployment-requests', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT d.*, p.project_name FROM deployment_requests d JOIN website_projects p ON p.id = d.project_id WHERE d.user_id = ? ORDER BY d.created_at DESC', [req.user.id]);
  res.json(rows);
});

app.get('/api/v1/admin/enquiries', requireAdmin, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
  res.json(rows);
});

app.get('/api/v1/admin/deployment-requests', requireAdmin, async (_req, res) => {
  const [rows] = await pool.query('SELECT d.*, p.project_name FROM deployment_requests d JOIN website_projects p ON p.id = d.project_id ORDER BY d.created_at DESC');
  res.json(rows);
});

app.get('/api/v1/admin/orders', requireAdmin, async (_req, res) => {
  const [rows] = await pool.query('SELECT o.*, p.project_name, u.name AS customer_name, u.email AS customer_email FROM orders o JOIN website_projects p ON p.id = o.project_id LEFT JOIN users u ON u.id = o.user_id ORDER BY o.created_at DESC');
  res.json(rows);
});

app.patch('/api/v1/admin/deployment-requests/:id', requireAdmin, async (req, res) => {
  const allowedStatuses = ['new', 'contacted', 'quotation_sent', 'awaiting_payment', 'in_progress', 'awaiting_information', 'ready_for_deployment', 'live', 'completed', 'cancelled'];
  const { status, quotation = null, liveUrl = null } = req.body || {};
  if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Invalid deployment status.' });
  await pool.query('UPDATE deployment_requests SET status = ?, quotation = ?, live_url = ? WHERE id = ?', [status, quotation, liveUrl, req.params.id]);
  res.json({ ok: true });
});

app.post('/api/v1/admin/categories', requireAdmin, async (req, res) => {
  const { name, slug, description, accent = '#F28C28' } = req.body || {};
  if (!name || !slug || !description) return res.status(400).json({ message: 'Name, slug, and description are required.' });
  const [result] = await pool.query('INSERT INTO categories (name, slug, description, accent) VALUES (?, ?, ?, ?)', [name, slug, description, accent]);
  res.status(201).json({ id: result.insertId, name, slug, description, accent });
});

function sanitizeTemplatePath(value = '') {
  const parts = String(value).replace(/\\/g, '/').split('/').filter((part) => part && part !== '.' && part !== '..');
  return parts.map((part) => part.replace(/[^a-zA-Z0-9._-]/g, '-')).join('/');
}

app.post('/api/v1/admin/templates/upload', requireAdmin, templateUpload.array('files', 300), async (req, res) => {
  const { name, slug: requestedSlug, description, categoryId, price = 1000, pages = 1, type = 'Static', featured = 'false', replaceExisting = 'false', formSchema = '[]', filePaths = '[]' } = req.body || {};
  if (!name || !description || !categoryId) return res.status(400).json({ message: 'Name, description, category and template folder are required.' });
  if (!req.files?.length) return res.status(400).json({ message: 'Choose a template folder containing index.html.' });
  if (!req.files.some((file) => path.basename(sanitizeTemplatePath(file.originalname)).toLowerCase() === 'index.html')) return res.status(400).json({ message: 'The uploaded folder must contain index.html.' });
  let parsedFormSchema;
  try { parsedFormSchema = JSON.parse(formSchema); } catch { return res.status(400).json({ message: 'Form fields must be valid JSON.' }); }
  if (!Array.isArray(parsedFormSchema)) return res.status(400).json({ message: 'Form fields must be an array.' });
  const slug = String(requestedSlug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 150);
  if (!slug) return res.status(400).json({ message: 'A valid template name or slug is required.' });
  const [[existing]] = await pool.query('SELECT id FROM templates WHERE slug = ?', [slug]);
  const shouldReplace = ['true', '1', 'on'].includes(String(replaceExisting).toLowerCase());
  if (existing && !shouldReplace) return res.status(409).json({ message: 'A template with this slug already exists. Select replace existing template to update it.' });
  const [[category]] = await pool.query('SELECT id, name, slug FROM categories WHERE id = ?', [categoryId]);
  if (!category) return res.status(400).json({ message: 'Selected category was not found.' });
  let parsedFilePaths;
  try { parsedFilePaths = JSON.parse(filePaths); } catch { parsedFilePaths = []; }
  const submittedPaths = Array.isArray(parsedFilePaths) && parsedFilePaths.length === req.files.length ? parsedFilePaths : req.files.map((file) => file.originalname);
  const rawPaths = submittedPaths.map((filePath, index) => sanitizeTemplatePath(filePath || req.files[index].originalname));
  const indexPath = rawPaths.find((filePath) => path.basename(filePath).toLowerCase() === 'index.html');
  const firstSegment = indexPath.includes('/') ? indexPath.split('/')[0] : '';
  const hasCommonRoot = firstSegment && rawPaths.every((filePath) => filePath === firstSegment || filePath.startsWith(`${firstSegment}/`));
  const relativePaths = rawPaths.map((filePath) => hasCommonRoot ? filePath.slice(firstSegment.length + 1) : filePath);
  const entryPath = hasCommonRoot ? indexPath.slice(firstSegment.length + 1) : indexPath;
  const templateDirectory = path.join(storageDir, 'templates', slug);
  await fs.rm(templateDirectory, { recursive: true, force: true });
  await fs.mkdir(templateDirectory, { recursive: true });
  for (const [index, file] of req.files.entries()) {
    const relativePath = relativePaths[index];
    if (!relativePath || relativePath.length > 300) continue;
    const destination = path.join(templateDirectory, relativePath);
    if (!destination.startsWith(`${templateDirectory}${path.sep}`)) return res.status(400).json({ message: 'Invalid file path.' });
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, file.buffer);
  }
  const thumbnailFile = relativePaths.find((filePath) => /\.(png|jpe?g|webp|gif)$/i.test(filePath));
  const thumbnailUrl = thumbnailFile ? `/template-assets/${slug}/${thumbnailFile}` : 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85';
  const templatePath = `/template-assets/${slug}/${entryPath}`;
  const values = [category.id, name, description, Math.max(1, Number(pages) || 1), type === 'Dynamic' ? 'Dynamic' : 'Static', Math.max(0, Number(price) || 0), ['true', '1', 'on'].includes(String(featured).toLowerCase()), thumbnailUrl, 'custom', JSON.stringify(['Uploaded HTML template', 'Customer form fields', 'Live preview']), templatePath, JSON.stringify(parsedFormSchema)];
  const templateId = existing?.id;
  let savedTemplateId = templateId;
  if (savedTemplateId) await pool.query('UPDATE templates SET category_id = ?, name = ?, description = ?, pages = ?, type = ?, price = ?, featured = ?, demo = TRUE, thumbnail_url = ?, palette = ?, features = ?, template_path = ?, form_schema = ? WHERE id = ?', [...values, savedTemplateId]);
  else {
    const [result] = await pool.query('INSERT INTO templates (category_id, name, slug, description, pages, type, price, featured, demo, thumbnail_url, palette, features, template_path, form_schema) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?, ?, ?)', [category.id, name, slug, ...values.slice(2)]);
    savedTemplateId = result.insertId;
  }
  await pool.query('DELETE FROM template_assets WHERE template_id = ?', [savedTemplateId]);
  for (const [index, file] of req.files.entries()) {
    const assetPath = relativePaths[index];
    if (!assetPath || assetPath.length > 500) continue;
    await pool.query('INSERT INTO template_assets (template_id, asset_path, mime_type, content, size_bytes) VALUES (?, ?, ?, ?, ?)', [savedTemplateId, assetPath, file.mimetype || 'application/octet-stream', file.buffer, file.size || file.buffer.length]);
  }
  res.status(existing ? 200 : 201).json({ id: savedTemplateId, name, slug, category_name: category.name, category_slug: category.slug, template_path: templatePath, preview_url: templatePath, form_schema: parsedFormSchema, thumbnail_url: thumbnailUrl, replaced: Boolean(existing) });
});

app.patch('/api/v1/admin/templates/:id', requireAdmin, async (req, res) => {
  const { name, description, price, featured, pages, type, categoryId, published = true } = req.body || {};
  if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
    const [[category]] = await pool.query('SELECT id FROM categories WHERE id = ?', [categoryId]);
    if (!category) return res.status(400).json({ message: 'Selected category was not found.' });
  }
  await pool.query('UPDATE templates SET category_id = COALESCE(?, category_id), name = COALESCE(?, name), description = COALESCE(?, description), price = COALESCE(?, price), featured = COALESCE(?, featured), pages = COALESCE(?, pages), type = COALESCE(?, type), demo = ? WHERE id = ?', [categoryId || null, name, description, price, featured, pages, type, Boolean(!published), req.params.id]);
  res.json({ ok: true });
});

app.delete('/api/v1/admin/templates/:id', requireAdmin, async (req, res) => {
  const [[template]] = await pool.query('SELECT id, slug FROM templates WHERE id = ?', [req.params.id]);
  if (!template) return res.status(404).json({ message: 'Template not found.' });
  const [[usage]] = await pool.query('SELECT COUNT(*) AS total FROM website_projects WHERE template_id = ?', [template.id]);
  if (Number(usage.total) > 0) return res.status(409).json({ message: 'This template is used by an existing customer project, so it cannot be deleted.' });
  await pool.query('DELETE FROM templates WHERE id = ?', [template.id]);
  await fs.rm(path.join(storageDir, 'templates', template.slug), { recursive: true, force: true });
  res.json({ ok: true });
});

app.get('/api/v1/admin/overview', requireAdmin, async (_req, res) => {
  const [[customers]] = await pool.query('SELECT COUNT(*) AS total FROM users WHERE role = "customer"');
  const [[templates]] = await pool.query('SELECT COUNT(*) AS total FROM templates WHERE slug IN (?)', [publishedTemplateSlugs]);
  const [[projects]] = await pool.query('SELECT COUNT(*) AS total FROM website_projects');
  const [[enquiries]] = await pool.query('SELECT COUNT(*) AS total FROM enquiries');
  res.json({ customers: customers.total, templates: templates.total, projects: projects.total, enquiries: enquiries.total });
});

const clientDist = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (error) => error ? next(error) : undefined);
});

app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Unexpected server error.' }); });

initializeDatabase().then(() => app.listen(port, () => console.log(`Web Guruji API running on http://localhost:${port}`))).catch((error) => { console.error('Database startup failed:', error.message); process.exitCode = 1; });
