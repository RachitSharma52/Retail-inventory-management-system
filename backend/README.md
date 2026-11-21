# Spring Boot + MySQL Backend for Retail Inventory Management

This backend replaces the previous Node.js server with **Spring Boot 3 (Java 21)** and connects directly to **MySQL**.

---

## Database Configuration

- **Database Server:** MySQL 8.0 on `localhost:3306`
- **Database Name:** `inventory` (auto-created if not exists)
- **Username:** `root`
- **Password:** `root123`

The configuration is located in [application.properties](file:///c:/Users/RAJ/Downloads/retail-inventory-warehouse-with-backend/backend/src/main/resources/application.properties).

---

## Tables Auto-Created & Seeded

Spring Data JPA / Hibernate automatically creates and synchronizes tables with MySQL:
1. `products`
2. `warehouses`
3. `orders`
4. `suppliers`
5. `customers`
6. `categories`
7. `transfers`

On initial launch, [DatabaseSeeder.java](file:///c:/Users/RAJ/Downloads/retail-inventory-warehouse-with-backend/backend/src/main/java/com/retail/inventory/config/DatabaseSeeder.java) populates initial seed records into MySQL.

---

## How to Run

### Option 1: Run with Maven
```bash
cd backend
mvn spring-boot:run
```

### Option 2: Run the Packaged JAR
```bash
cd backend
java -jar target/retail-inventory-backend-1.0.0.jar
```

The server runs on `http://localhost:8080`.

---

## API Endpoints

- `GET /api/health` - Service health status
- `GET /api/inventory` - List products (supports query params: `search`, `category`, `warehouse`)
- `POST /api/inventory` - Create product
- `GET /api/inventory/{id}` - Get product by ID
- `PUT /api/inventory/{id}` - Update product
- `DELETE /api/inventory/{id}` - Delete product
- `GET /api/warehouses` / `POST /api/warehouses`
- `GET /api/orders` / `POST /api/orders` / `PATCH /api/orders/{id}/status`
- `GET /api/suppliers` / `POST /api/suppliers`
- `GET /api/customers` / `POST /api/customers`
- `GET /api/categories` / `POST /api/categories`
- `GET /api/transfers` / `POST /api/transfers` / `PATCH /api/transfers/{id}/status`
- `GET /api/reports/summary` - Metrics summary for the dashboard
