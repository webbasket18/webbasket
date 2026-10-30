CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  accent VARCHAR(20) NOT NULL DEFAULT '#F28C28',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(140) NOT NULL,
  slug VARCHAR(160) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  pages TINYINT NOT NULL DEFAULT 1,
  type ENUM('Static','Dynamic') NOT NULL DEFAULT 'Static',
  price DECIMAL(10,2) NOT NULL DEFAULT 1000,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  demo BOOLEAN NOT NULL DEFAULT TRUE,
  thumbnail_url TEXT NOT NULL,
  palette VARCHAR(120) NOT NULL,
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_template_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30),
  message TEXT NOT NULL,
  source VARCHAR(60) NOT NULL DEFAULT 'website',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS website_projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  template_id INT NOT NULL,
  project_name VARCHAR(140) NOT NULL,
  business_name VARCHAR(140) NULL,
  status ENUM('draft','awaiting_payment','paid','ready') NOT NULL DEFAULT 'draft',
  content JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_project_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_project_template FOREIGN KEY (template_id) REFERENCES templates(id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id CHAR(64) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sessions_expiry (expires_at)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  project_id INT NOT NULL,
  package_id VARCHAR(40) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  razorpay_order_id VARCHAR(120) NULL UNIQUE,
  razorpay_payment_id VARCHAR(120) NULL,
  razorpay_signature VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_order_project FOREIGN KEY (project_id) REFERENCES website_projects(id),
  INDEX idx_orders_status (status)
);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id VARCHAR(190) NOT NULL UNIQUE,
  event_type VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deployment_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  project_id INT NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(190) NOT NULL,
  domain_status VARCHAR(60) NOT NULL DEFAULT 'Not decided',
  hosting_status VARCHAR(60) NOT NULL DEFAULT 'Not decided',
  requirements TEXT,
  status ENUM('new','contacted','quotation_sent','awaiting_payment','in_progress','awaiting_information','ready_for_deployment','live','completed','cancelled') NOT NULL DEFAULT 'new',
  quotation DECIMAL(10,2) NULL,
  live_url VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_deployment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_deployment_project FOREIGN KEY (project_id) REFERENCES website_projects(id)
);

CREATE TABLE IF NOT EXISTS source_code_artifacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  project_id INT NOT NULL,
  user_id INT NOT NULL,
  filename VARCHAR(180) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  sha256 CHAR(64) NOT NULL,
  size_bytes BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_artifact_order FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_artifact_project FOREIGN KEY (project_id) REFERENCES website_projects(id),
  CONSTRAINT fk_artifact_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS download_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  artifact_id INT NOT NULL,
  user_id INT NOT NULL,
  ip_address VARCHAR(80),
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_download_artifact FOREIGN KEY (artifact_id) REFERENCES source_code_artifacts(id),
  CONSTRAINT fk_download_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS website_media (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  original_name VARCHAR(190) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  size_bytes BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_media_project FOREIGN KEY (project_id) REFERENCES website_projects(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  message VARCHAR(500) NOT NULL,
  read_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ticket_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
