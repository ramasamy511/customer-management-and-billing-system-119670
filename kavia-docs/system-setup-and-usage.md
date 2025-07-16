# Customer Management and Billing System – Comprehensive Setup & Usage Guide

This document provides a complete overview and practical guide for setting up, running, and using all components (PostgreSQL database, FastAPI backend, React frontend) in the Customer Management & Billing System.

---

## 1. Container Overview

| Container         | Type       | Major Technologies | Directory                                                      | Role & Highlights                                                              |
|-------------------|------------|--------------------|----------------------------------------------------------------|--------------------------------------------------------------------------------|
| database_postgresql | Database   | PostgreSQL         | `customer-management-and-billing-system-119669/database_postgresql` | Stores all persistent data: customers, products, invoices, payments, analytics |
| backend_fastapi     | Backend    | Python, FastAPI, SQLAlchemy | `customer-management-and-billing-system-119668/backend_fastapi`         | API layer: business logic, DB migrations, CRUD, analytics, exports, reminders  |
| frontend_react_js   | Frontend   | React (JS)         | `customer-management-and-billing-system-119670/frontend_react_js`       | Web UI for customer, invoice, payment, reporting, dashboards, and navigation   |

---

## 2. Setup & Running Instructions

### 2.1. Database: PostgreSQL

**Requirements:** PostgreSQL server (locally or container), `psql` client.

**To initialize and set up the database:**
1. `cd customer-management-and-billing-system-119669/database_postgresql`
2. Review and (optional) edit the provided default environment:  
   - `db_visualizer/postgres.env` (contains `POSTGRES_URL`, user, password, db name)
3. Run the provided setup script (creates database, user, and imports schema):  
   ```
   ./startup_postgres.sh
   ```
   This will:
   - Create the DB user and database (if not exists)
   - Import the schema from `core_schema_postgresql.sql`
   - Output a connection string, e.g.:  
     ```
     psql postgresql://appuser:dbuser123@localhost:5432/myapp
     ```

4. _Optional:_ You may use the included Node.js-based DB visualizer (`db_visualizer/server.js`) by running:
   ```
   cd db_visualizer
   source postgres.env
   npm install
   npm start
   ```
   Then navigate to `http://localhost:3000` (default) for a web UI to inspect your database.

**To migrate database changes:**  
- Make edits to `core_schema_postgresql.sql`.
- Re-run the schema with:
  ```
  psql postgresql://appuser:dbuser123@localhost:5432/myapp -f core_schema_postgresql.sql
  ```

### 2.2. Backend: FastAPI

**Requirements:** Python 3.9+ (recommended), pip, virtualenv (optional).

**Setup and run:**
1. `cd customer-management-and-billing-system-119668/backend_fastapi`
2. Install dependencies:  
   ```
   pip install -r requirements.txt
   ```
3. Ensure your environment variables for PostgreSQL DB are set (see `.env` or `db_visualizer/postgres.env` for reference).  
   Minimal example for `.env`:
   ```
   POSTGRES_URL=postgresql://appuser:dbuser123@localhost:5432/myapp
   ```
   Alternatively, set the following individually:  
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT`
4. **Start the API server:**
   ```
   uvicorn src.api.main:app --reload --port 8000
   ```
5. When started, this will automatically check that tables exist (creating them if needed).

**Database migration/initialization:**
- The backend performs automatic table creation on boot via SQLAlchemy models.
- To reset or upgrade the schema to match models, drop DB/tables and restart.
- For ‘manual’ schema migrations, apply your changes to the database as described above for the SQL file.

### 2.3. Frontend: React JS

**Requirements:** Node.js 16+/18+, npm

**Setup and run:**
1. `cd customer-management-and-billing-system-119670/frontend_react_js`
2. Install dependencies:
   ```
   npm install
   ```
3. **Start in development mode:**
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
4. The app defaults to using API base `http://localhost:8000` for backend.  
   To override (e.g., for deployment), create `.env`:
   ```
   REACT_APP_API_URL=http://your-backend-domain:8000
   ```

**Build for production:**  
```
npm run build
```

---

## 3. Database Migrations & Schema Initialization

### Database bootstrap (SQL scripts)
- All core tables, constraints, and audit tables are defined in  
  `database_postgresql/core_schema_postgresql.sql`
- Use the setup script for first-time startup (`startup_postgres.sh`).
- To re-initialize a fresh schema or apply batch migrations:
  ```
  psql postgresql://appuser:dbuser123@localhost:5432/myapp -f core_schema_postgresql.sql
  ```

**Note:** Some columns or tables (e.g. `products`, `analytics_snapshot`, `data_change_log`) may be present for extensibility or audit purposes.

---

## 4. Major Backend API Endpoints (Usage & Examples)

The FastAPI backend exposes a RESTful interface. Below are the main endpoints, with brief descriptions and typical request/response shapes.

All endpoints default to `http://localhost:8000`.

### Customers

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/customers`            | List all customers       |
| POST   | `/customers`            | Create new customer      |
| GET    | `/customers/{id}`       | Get customer details     |
| PUT    | `/customers/{id}`       | Update customer          |
| DELETE | `/customers/{id}`       | Delete customer          |

Example create:
```json
POST /customers
{
  "name": "Acme Corp",
  "email": "info@acme.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "gst_number": "GST-1111"
}
```

### Invoices

| Method | Endpoint                  | Description                   |
|--------|---------------------------|-------------------------------|
| GET    | `/invoices`               | List all invoices             |
| POST   | `/invoices`               | Create new invoice (w/items)  |
| GET    | `/invoices/{id}`          | Get invoice details           |
| PUT    | `/invoices/{id}`          | Update invoice and items      |
| DELETE | `/invoices/{id}`          | Delete invoice                |

Example create:
```json
POST /invoices
{
  "customer_id": 1,
  "invoice_date": "2024-06-29",
  "due_date": "2024-07-10",
  "status": "unpaid",
  "total_amount": 950.0,
  "remark": "Premium service",
  "items": [
    { "product_name": "Widget", "quantity": 5, "unit_price": 100, "amount": 500 },
    { "product_name": "Service Fee", "quantity": 1, "unit_price": 450, "amount": 450 }
  ]
}
```

### Payments

| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| GET    | `/payments`             | List all payments         |
| POST   | `/payments`             | Record a payment          |
| GET    | `/payments/{id}`        | Get payment details       |
| PUT    | `/payments/{id}`        | Update payment            |
| DELETE | `/payments/{id}`        | Delete payment            |

Example create:
```json
POST /payments
{
  "customer_id": 1,
  "invoice_id": 10,
  "payment_date": "2024-06-30",
  "mode": "bank",
  "amount": 950.0,
  "remark": "Cleared in full"
}
```

### Reminders

| Method | Endpoint                   | Description            |
|--------|----------------------------|------------------------|
| GET    | `/reminders`               | List reminders         |
| POST   | `/reminders`               | Create a reminder      |
| PUT    | `/reminders/{id}`          | Update reminder        |
| DELETE | `/reminders/{id}`          | Delete reminder        |

### Analytics & Reporting

| Method | Endpoint                     | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | `/analytics/frequent-purchases` | Frequent purchase analytics     |
| GET    | `/balance-sheet`             | Returns customer balances          |
| GET    | `/exports/balance-sheet`     | Export balance sheet as CSV (download) |
| GET    | `/`                          | Health check                       |

Refer to `customer-management-and-billing-system-119668/backend_fastapi/interfaces/openapi.json` for the OpenAPI specification with detailed request/response schemas.

---

## 5. Frontend Feature Overview & Navigation

### Layout

- **Sidebar:** Navigation menu for all modules (Dashboard, Customers, Invoices, Payments, Analytics, Reports, Exports, Reminders)
- **Top Bar:** Theme toggle, sidebar menu toggle, quick actions
- **Main Content:** Dynamically displays views/pages for each feature

### Main Features

- **Dashboard:** Quick stats: customers, invoices, total receivables, top product
- **Customers:** List, filter, add new, edit, delete customers
- **Invoices:** Create, edit, and list invoices with line items and status
- **Payments:** Record and track payments (by customer/invoice/mode)
- **Reminders:** Track and manage reminders for due/overdue invoices
- **Analytics:** Data-driven dashboards for frequent purchases and sales trends
- **Reports:** View balance sheet, export as CSV
- **Exports:** One-click export for balance sheet, extensible for other formats

### Navigation Flow

- Sidebar and links are always visible for fast module switching
- Forms adapt for create/edit modes; after submit, redirect to listing view
- All tables are filterable by search/query inputs

---

## 6. Fullstack Integration Summary

1. **Frontend → Backend:**  
   The React app communicates with FastAPI via REST endpoints. The API URL defaults to `http://localhost:8000/` but can be configured via the `REACT_APP_API_URL` environment variable.  
   All CRUD actions, analytics, and exports use these APIs.

2. **Backend → Database:**  
   FastAPI uses SQLAlchemy ORM and environment-driven connection to PostgreSQL database.  
   Tables are automatically created on first run based on SQLAlchemy models and synchronized with the core schema in the SQL file.

3. **Database:**  
   Persistent storage for all entities.  
   Admins may directly inspect/manipulate data using the command line (`psql`) or the included Node.js DB visualizer.

### Complete Data Flow

```mermaid
graph TD
  subgraph Frontend (React)
    F1[User Actions] --> F2[API Requests]
  end
  subgraph FastAPI Backend
    F2 -.-> B1[CRUD, Business Logic]
    B1 --> B2[SQLAlchemy ORM]
  end
  subgraph PostgreSQL DB
    B2 --> D1[customers, invoices,<br/>payments, reminders,...]
  end
  F1 -. "browser" .-> F2
  F2 -- REST --> B1
  B1 -- SQL --> B2
  B2 -- Transactions --> D1
  F2 <-- Results -- B1
  B1 <-- Queries -- B2
```

---

### See Also

- [React App README](../frontend_react_js/README.md)
- [Backend README](../backend_fastapi/README.md)
- [Database SQL Schema](../../customer-management-and-billing-system-119669/database_postgresql/core_schema_postgresql.sql)
- [Backend OpenAPI JSON](../backend_fastapi/interfaces/openapi.json)

---

## Support/FAQ

- If you have connection errors, verify all containers/services are running and ports are set correctly.
- Adjust environment files as needed for containerized or remote deployment.

---

**End of Guide.**
