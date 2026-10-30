# Web Guruji

Web Guruji is a full-stack template marketplace and website builder for Indian local businesses. This first working slice includes the premium marketplace experience, dynamic template discovery, a content-driven website builder preview, customer dashboard shell, admin overview, Express REST APIs, and MySQL persistence.

## Run locally

1. Install MySQL 8 and make sure it is running on `localhost:3306`.
2. Create a local `.env` in `server/` using the values in `server/.env.example` (the requested development credentials are `root` / `root`).
3. Install dependencies from the repository root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

4. Start both apps:

```bash
npm run dev
```

The frontend runs at http://localhost:5173 and the API runs at http://localhost:4000.

On first startup the API creates the `webguruji` database, tables, and clearly labelled demo template data. It does not create fake customer reviews or customer projects.

## Structure

- `client/` — React + Vite frontend and responsive design system.
- `server/` — Express API, MySQL connection, schema initialization, and seed data.
- `WEB_GURUJI_MYSQL_CONFIGURATION.md` — database configuration addendum.

The `root/root` database credentials are for local development only. Use a dedicated least-privilege user and deployment secrets in staging or production.

## Phase 2 API capabilities

- Password-based customer registration, login, bearer sessions, current-user lookup, and logout.
- Server-side package price validation and pending orders.
- Razorpay webhook endpoint with HMAC verification and idempotent event storage. Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` before enabling live checkout; without them the API deliberately does not report a successful payment.
- Authenticated deployment requests with domain, hosting, requirements, and lifecycle status.
- Admin-only enquiry, deployment, category, and template management endpoints.
- Paid source-code artifact generation as a real ZIP archive, ownership-checked downloads, download audit events, and notifications.
- Authenticated image upload API with MIME and 5MB size validation.
- Customer workspace APIs for projects, orders, source artifacts, deployment requests, notifications, and support tickets.

Important endpoints include `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/orders`, `POST /api/v1/payments/webhook`, and `POST /api/v1/deployment-requests`.

For a local admin account, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` before starting the API. The startup seed promotes that email to the `admin` role. Admin overview and management endpoints return `403` without an authenticated admin session.

Source-code generation is intentionally payment-gated. A pending order cannot generate or download an archive. In local QA, use the payment verification/webhook flow with real Razorpay credentials rather than manually changing order state.
