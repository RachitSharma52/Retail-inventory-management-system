const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    })
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.message || `HTTP ${res.status}`)
    }
    return json
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err)
    throw err
  }
}

export const api = {
  // Inventory
  getInventory: (params = {}) => {
    const query = new URLSearchParams()
    if (params.search) query.append('search', params.search)
    if (params.category && params.category !== 'All') query.append('category', params.category)
    if (params.warehouse) query.append('warehouse', params.warehouse)
    const qs = query.toString() ? `?${query.toString()}` : ''
    return request(`/inventory${qs}`)
  },
  createProduct: (product) => request('/inventory', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id, product) => request(`/inventory/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  deleteProduct: (id) => request(`/inventory/${id}`, { method: 'DELETE' }),

  // Warehouses
  getWarehouses: () => request('/warehouses'),
  createWarehouse: (warehouse) => request('/warehouses', { method: 'POST', body: JSON.stringify(warehouse) }),

  // Orders
  getOrders: (type) => request(`/orders${type && type !== 'All' ? `?type=${type}` : ''}`),
  createOrder: (order) => request('/orders', { method: 'POST', body: JSON.stringify(order) }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Suppliers
  getSuppliers: () => request('/suppliers'),
  createSupplier: (supplier) => request('/suppliers', { method: 'POST', body: JSON.stringify(supplier) }),

  // Customers
  getCustomers: () => request('/customers'),
  createCustomer: (customer) => request('/customers', { method: 'POST', body: JSON.stringify(customer) }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (category) => request('/categories', { method: 'POST', body: JSON.stringify(category) }),

  // Transfers
  getTransfers: () => request('/transfers'),
  createTransfer: (transfer) => request('/transfers', { method: 'POST', body: JSON.stringify(transfer) }),
  updateTransferStatus: (id, status) => request(`/transfers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Reports
  getReportSummary: () => request('/reports/summary')
}
