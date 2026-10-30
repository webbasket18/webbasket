-- WebGuruji / WebBasket seed data for Hostinger MySQL.
-- Import database.sql first, then import this file.
-- This file is safe to re-run: categories and templates are upserted by slug.
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO categories (name, slug, description, accent) VALUES
  ('Restaurants', 'restaurants', 'One-page restaurant websites for menus, bookings and local customers.', '#F28C28'),
  ('Salons & Beauty', 'salons', 'Elegant service menus that make bookings feel easy.', '#D94680'),
  ('Construction', 'construction', 'Credible project stories for teams that build.', '#2563EB'),
  ('Clinics', 'clinics', 'Calm, accessible pages for trusted care.', '#0F766E'),
  ('Real Estate', 'real-estate', 'Property-first experiences for local agents.', '#7C3AED'),
  ('Professional Services', 'professional-services', 'A sharp digital presence for experts.', '#475569')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  accent = VALUES(accent);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Maison Aurele', 'maison-aurele',
  'A cinematic one-page restaurant website with menu storytelling and table reservations.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
  'ivory', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'restaurants'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Mira Studio', 'mira-studio',
  'A polished one-page salon website for services, stylists and appointments.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  'rose', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'salons'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Form & Foundation', 'form-foundation',
  'A confident one-page construction website for projects, services and enquiries.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
  'cobalt', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'construction'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Mediwell Clinic', 'mediwell-clinic',
  'A calm one-page clinic website for treatments, doctors and appointments.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
  'mint', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'clinics'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Cedar & Co.', 'cedar-co-',
  'A property-first one-page website for listings, trust and enquiries.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  'violet', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'real-estate'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Northstar Advisory', 'northstar-advisory',
  'A sharp one-page professional website for expertise, proof and enquiries.',
  1, 'Static', 1000.00, 1, 1,
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
  'slate', JSON_ARRAY('Responsive layout', 'Content editor', 'Preview before purchase')
FROM categories WHERE slug = 'professional-services'
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description),
  pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price),
  featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url),
  palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Saffron Table', 'saffron-table', 'A three-page restaurant website for menu, story and reservations.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85', 'saffron', JSON_ARRAY('3 editable pages', 'Menu and reservations', 'Gallery and contact form')
FROM categories WHERE slug = 'restaurants'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Atelier Mira', 'atelier-mira', 'A three-page salon website for services, team and appointments.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', 'blush', JSON_ARRAY('3 editable pages', 'Service menu', 'Appointment enquiry form')
FROM categories WHERE slug = 'salons'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Builtline Studio', 'builtline-studio', 'A three-page construction website for work, capabilities and enquiries.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85', 'steel', JSON_ARRAY('3 editable pages', 'Project showcase', 'Lead capture form')
FROM categories WHERE slug = 'construction'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Harbor Health', 'harbor-health', 'A three-page clinic website for care, specialists and appointments.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85', 'sky', JSON_ARRAY('3 editable pages', 'Treatment details', 'Appointment form')
FROM categories WHERE slug = 'clinics'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Hearth & Key', 'hearth-key', 'A three-page property website for listings, advice and enquiries.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', 'sand', JSON_ARRAY('3 editable pages', 'Property showcase', 'Buyer enquiry form')
FROM categories WHERE slug = 'real-estate'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

INSERT INTO templates
  (category_id, name, slug, description, pages, `type`, price, featured, demo, thumbnail_url, palette, features)
SELECT id, 'Fieldnote Partners', 'fieldnote-partners', 'A three-page advisory website for expertise, proof and contact.', 3, 'Dynamic', 1500.00, 0, 1,
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', 'graphite', JSON_ARRAY('3 editable pages', 'Case study showcase', 'Contact form')
FROM categories WHERE slug = 'professional-services'
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), pages = VALUES(pages), `type` = VALUES(`type`), price = VALUES(price), featured = VALUES(featured), demo = VALUES(demo), thumbnail_url = VALUES(thumbnail_url), palette = VALUES(palette), features = VALUES(features);

SET FOREIGN_KEY_CHECKS = 1;

