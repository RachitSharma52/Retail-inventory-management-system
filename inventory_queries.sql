-- ======================================================
-- Retail Inventory & Warehouse Database Script
-- Host: localhost:3306
-- Database: inventory
-- User: root | Password: root123
-- ======================================================

CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

-- 1. Tables Dekhein
SHOW TABLES;

-- 2. Products (Inventory Items) Dekhein
SELECT id, sku, name, category, warehouse, stock, unit_price, status 
FROM products;

-- 3. Warehouses Dekhein
SELECT id, code, name, city, manager, capacity, item_count, status 
FROM warehouses;

-- 4. Orders (Sales & Purchase) Dekhein
SELECT id, party, date, items, amount, type, status 
FROM orders;

-- 5. Suppliers Dekhein
SELECT id, name, contact, email, phone, city, rating, status 
FROM suppliers;

-- 6. Customers Dekhein
SELECT id, code, name, contact, email, city, orders, spend, status 
FROM customers;

-- 7. Categories Dekhein
SELECT id, code, name, product_count, units, value, status 
FROM categories;

-- 8. Stock Transfers Dekhein
SELECT id, from_location, to_location, items, units, date, status 
FROM transfers;

-- ======================================================
-- Sample Test Queries:
-- ======================================================

-- Low Stock Alert Query (Reorder level se kam stock wale items)
SELECT name, sku, stock, reorder_level, warehouse 
FROM products 
WHERE stock <= reorder_level;

-- Total Inventory Value Query
SELECT COUNT(*) AS total_products, 
       SUM(stock) AS total_units, 
       SUM(stock * unit_price) AS total_inventory_value 
FROM products;
