export const initialProducts = [
  { id: 'SKU-1048', name: 'Wireless Barcode Scanner', category: 'Electronics', warehouse: 'North Hub', stock: 124, reorder: 40, price: 2499, status: 'In stock', sku: 'WBS-1048' },
  { id: 'SKU-1049', name: 'Thermal Label Roll', category: 'Packaging', warehouse: 'Central Depot', stock: 18, reorder: 50, price: 320, status: 'Low stock', sku: 'TLR-1049' },
  { id: 'SKU-1050', name: 'Heavy Duty Storage Bin', category: 'Storage', warehouse: 'West Warehouse', stock: 86, reorder: 25, price: 890, status: 'In stock', sku: 'HDS-1050' },
  { id: 'SKU-1051', name: 'Industrial Safety Gloves', category: 'Safety', warehouse: 'North Hub', stock: 0, reorder: 30, price: 180, status: 'Out of stock', sku: 'ISG-1051' },
  { id: 'SKU-1052', name: 'Packing Tape - 48mm', category: 'Packaging', warehouse: 'Central Depot', stock: 210, reorder: 60, price: 95, status: 'In stock', sku: 'PT-1052' },
  { id: 'SKU-1053', name: 'Handheld RFID Reader', category: 'Electronics', warehouse: 'West Warehouse', stock: 12, reorder: 15, price: 6799, status: 'Low stock', sku: 'HRR-1053' },
  { id: 'SKU-1054', name: 'Pallet Wrap Film', category: 'Packaging', warehouse: 'North Hub', stock: 74, reorder: 20, price: 560, status: 'In stock', sku: 'PWF-1054' },
  { id: 'SKU-1055', name: 'Steel Platform Trolley', category: 'Equipment', warehouse: 'Central Depot', stock: 9, reorder: 10, price: 4250, status: 'Low stock', sku: 'SPT-1055' }
]

export const warehouses = [
  { name: 'North Hub', code: 'WH-N01', city: 'New Delhi', manager: 'Aarav Mehta', capacity: 82, items: 1840, status: 'Operational' },
  { name: 'Central Depot', code: 'WH-C02', city: 'Noida', manager: 'Priya Sharma', capacity: 64, items: 1260, status: 'Operational' },
  { name: 'West Warehouse', code: 'WH-W03', city: 'Gurugram', manager: 'Rohan Kapoor', capacity: 91, items: 2150, status: 'Near capacity' }
]

export const initialOrders = [
  { id: 'ORD-2481', customer: 'Apex Retail Pvt. Ltd.', date: '21 Nov 2026', items: 8, amount: 42850, status: 'Processing', type: 'Sales' },
  { id: 'ORD-2480', customer: 'Metro Supplies', date: '21 Nov 2026', items: 4, amount: 18700, status: 'Shipped', type: 'Sales' },
  { id: 'ORD-2479', customer: 'Northstar Components', date: '20 Nov 2026', items: 12, amount: 76200, status: 'Delivered', type: 'Sales' },
  { id: 'PO-0918', customer: 'Prime Industrial Traders', date: '20 Nov 2026', items: 6, amount: 93500, status: 'Pending', type: 'Purchase' },
  { id: 'ORD-2478', customer: 'Urban Home Store', date: '19 Nov 2026', items: 3, amount: 12600, status: 'Cancelled', type: 'Sales' }
]

export const suppliers = [
  { name: 'Prime Industrial Traders', contact: 'Ankit Verma', email: 'orders@primeindustrial.in', phone: '+91 98710 44218', products: 32, rating: '4.8', status: 'Active' },
  { name: 'Vertex Packaging Co.', contact: 'Neha Bansal', email: 'sales@vertexpack.in', phone: '+91 98102 77341', products: 18, rating: '4.6', status: 'Active' },
  { name: 'TechLine Distribution', contact: 'Karan Sethi', email: 'support@techline.in', phone: '+91 98990 11820', products: 24, rating: '4.5', status: 'Active' },
  { name: 'SafeWork Essentials', contact: 'Ishita Rao', email: 'hello@safework.in', phone: '+91 99584 60213', products: 12, rating: '4.2', status: 'On hold' }
]

export const activities = [
  { title: 'Stock received', detail: 'Thermal Label Roll · Central Depot', time: '10:42 AM', tone: 'blue' },
  { title: 'Sales order dispatched', detail: 'ORD-2480 · Metro Supplies', time: '09:58 AM', tone: 'green' },
  { title: 'Low stock alert', detail: 'Handheld RFID Reader · 12 units left', time: '09:24 AM', tone: 'amber' },
  { title: 'Purchase order created', detail: 'PO-0918 · Prime Industrial Traders', time: 'Yesterday', tone: 'violet' }
]