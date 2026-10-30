# Web Guruji — MySQL Configuration Addendum

Integrate the following database configuration into the complete Web Guruji full-stack development master prompt. Use it for local development and testing.

## Local MySQL Connection

- Database engine: MySQL 8+
- Host: `localhost`
- Port: `3306`
- Database name: `webguruji`
- Username: `root`
- Password: `root`

Use this connection through environment variables, never hardcode credentials in React code, generated source-code archives, logs, API responses, or committed source files.

Recommended local `.env` values:

```env
DATABASE_URL="mysql://root:root@localhost:3306/webguruji"
DB_HOST=localhost
DB_PORT=3306
DB_NAME=webguruji
DB_USER=root
DB_PASSWORD=root
```

The backend must:

1. Connect to the `webguruji` MySQL database through Prisma.
2. Create and run migrations against this database.
3. Seed the initial roles, permissions, categories, packages, settings, and demo templates only when explicitly enabled for development.
4. Use transactions for orders, payments, webhook fulfilment, project versioning, and source-code delivery.
5. Fail safely with a clear startup error if the database is unavailable; do not silently fall back to mock data.
6. Keep `.env` and all real credentials out of Git using `.gitignore`.
7. Provide `.env.example` with placeholder values rather than real production secrets.

## Environment Separation

The `root/root` credentials are for the local development database only. Before staging or production deployment, use a dedicated least-privilege MySQL user and a strong secret stored in the deployment environment. Never expose the local or production database password in frontend bundles or generated customer websites.

## Required Database Verification

Before declaring the project functional, verify:

- MySQL is reachable at `localhost:3306`.
- The `webguruji` database exists or is created through the documented setup process.
- Prisma migrations complete successfully.
- Seed data persists and can be read through real REST APIs.
- Customer, order, payment, preview, download, deployment, review, and admin workflows persist correctly after a server restart.
