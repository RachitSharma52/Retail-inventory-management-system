# Retail Inventory & Warehouse Management

## Run locally
1. Install Node.js 18 or later.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
Run `npm run build`. The generated site is placed in `dist/`.

## Workspace pages
1. Dashboard
2. Inventory
3. Categories
4. Warehouses
5. Stock Transfers
6. Purchase Orders
7. Sales Orders
8. Suppliers
9. Customers
10. Reports & Analytics

The workspace includes pre-populated business records, charts, search, filters, forms and interactive status updates.

## Backend service
A separate Express API project is included in `backend/`, with route, controller, middleware and sample data files.

To start it:
1. Open a second terminal in `backend/`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Run `npm run dev`.

The API uses in-memory records and is not connected to the frontend by default.
