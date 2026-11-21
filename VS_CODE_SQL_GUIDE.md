# Retail Inventory Project - VS Code & SQL Guide

## 📁 Banaye Gaye Files (Created Files):
1. **[inventory_queries.sql](file:///c:/Users/RAJ/Downloads/retail-inventory-warehouse-with-backend/inventory_queries.sql)**: VS Code ya MySQL Workbench me open karne ke liye ready-made SQL file.
2. **[START_PROJECT.bat](file:///c:/Users/RAJ/Downloads/retail-inventory-warehouse-with-backend/START_PROJECT.bat)**: Double-click karte hi Backend aur Frontend dono ko start karne wala script.
3. **[.vscode/tasks.json](file:///c:/Users/RAJ/Downloads/retail-inventory-warehouse-with-backend/.vscode/tasks.json)**: VS Code menu se 1-click me run karne ke liye tasks.

---

## 1. VS Code me Frontend & Backend kaise chalaayein:

### Tarika A (Direct 1-Click File):
Folder me jaakar **`START_PROJECT.bat`** par double click karein. Yeh dono servers start kar dega:
- **Backend:** http://localhost:8080/
- **Frontend:** http://localhost:5173/

### Tarika B (VS Code ke Terminal se):
VS Code me do terminal open karein:
- **Terminal 1 (Backend):**
  ```powershell
  cd backend
  java -jar target\retail-inventory-backend-1.0.0.jar
  ```
- **Terminal 2 (Frontend):**
  ```powershell
  npm run dev
  ```

---

## 2. SQL App (MySQL Workbench) me Database kaise dekhein:

Aapke paas jo MySQL App (MySQL Workbench) hai:
1. **MySQL Workbench** open karein.
2. `Local instance MySQL80` par click karein.
3. Password daalein: **`root123`** (Username: **`root`**).
4. File menu me jaakar **Open SQL Script** karein aur select karein:
   👉 **`inventory_queries.sql`**
5. Top par **⚡ (Lightning Bolt)** icon dabayein.
   - Saari tables (`products`, `warehouses`, `orders`, `suppliers`, etc.) ka data live niche result grid me dikhega!
