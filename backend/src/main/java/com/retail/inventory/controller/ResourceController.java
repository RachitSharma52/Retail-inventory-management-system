package com.retail.inventory.controller;

import com.retail.inventory.dto.ApiResponse;
import com.retail.inventory.model.*;
import com.retail.inventory.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ResourceController {

    private final WarehouseRepository warehouseRepository;
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final CustomerRepository customerRepository;
    private final CategoryRepository categoryRepository;
    private final TransferRepository transferRepository;
    private final ProductRepository productRepository;

    public ResourceController(
            WarehouseRepository warehouseRepository,
            OrderRepository orderRepository,
            SupplierRepository supplierRepository,
            CustomerRepository customerRepository,
            CategoryRepository categoryRepository,
            TransferRepository transferRepository,
            ProductRepository productRepository) {
        this.warehouseRepository = warehouseRepository;
        this.orderRepository = orderRepository;
        this.supplierRepository = supplierRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
        this.transferRepository = transferRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "Spring Boot Retail Inventory API is running with MySQL");
        resp.put("timestamp", new Date());
        return ResponseEntity.ok(resp);
    }

    // Warehouses
    @GetMapping("/warehouses")
    public ResponseEntity<ApiResponse<List<Warehouse>>> getWarehouses() {
        List<Warehouse> list = warehouseRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/warehouses")
    public ResponseEntity<ApiResponse<Warehouse>> createWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse saved = warehouseRepository.save(warehouse);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Warehouse created", saved));
    }

    // Orders
    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<Order>>> getOrders(@RequestParam(required = false) String type) {
        List<Order> list = (type != null && !type.trim().isEmpty() && !type.equalsIgnoreCase("All"))
                ? orderRepository.findByTypeIgnoreCase(type.trim())
                : orderRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/orders")
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Order order) {
        if (order.getParty() == null || order.getParty().trim().isEmpty() || order.getAmount() == null) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Party and amount are required", null));
        }

        if (order.getType() == null || order.getType().isEmpty()) {
            order.setType("Sales");
        }

        if (order.getId() == null || order.getId().isEmpty()) {
            String prefix = order.getType().equalsIgnoreCase("Purchase") ? "PO" : "ORD";
            order.setId(prefix + "-" + (System.currentTimeMillis() % 100000));
        }

        if (order.getDate() == null || order.getDate().isEmpty()) {
            order.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy")));
        }

        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("Pending");
        }

        if (order.getItems() == null) order.setItems(1);

        Order saved = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Order created", saved));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        return orderRepository.findById(id).map(order -> {
            String status = body.get("status");
            if (status != null) {
                order.setStatus(status);
                orderRepository.save(order);
            }
            return ResponseEntity.ok(new ApiResponse<>(true, "Order status updated", order));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Order not found", null)));
    }

    // Suppliers
    @GetMapping("/suppliers")
    public ResponseEntity<ApiResponse<List<Supplier>>> getSuppliers() {
        List<Supplier> list = supplierRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/suppliers")
    public ResponseEntity<ApiResponse<Supplier>> createSupplier(@RequestBody Supplier supplier) {
        Supplier saved = supplierRepository.save(supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Supplier created", saved));
    }

    // Customers
    @GetMapping("/customers")
    public ResponseEntity<ApiResponse<List<Customer>>> getCustomers() {
        List<Customer> list = customerRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/customers")
    public ResponseEntity<ApiResponse<Customer>> createCustomer(@RequestBody Customer customer) {
        if (customer.getCode() == null || customer.getCode().isEmpty()) {
            customer.setCode("CUS-" + (1000 + customerRepository.count() + 1));
        }
        Customer saved = customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Customer created", saved));
    }

    // Categories
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        List<Category> list = categoryRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        if (category.getCode() == null || category.getCode().isEmpty()) {
            category.setCode("CAT-" + String.format("%03d", categoryRepository.count() + 1));
        }
        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Category created", saved));
    }

    // Transfers
    @GetMapping("/transfers")
    public ResponseEntity<ApiResponse<List<Transfer>>> getTransfers() {
        List<Transfer> list = transferRepository.findAll();
        return ResponseEntity.ok(new ApiResponse<>(true, list.size(), list));
    }

    @PostMapping("/transfers")
    public ResponseEntity<ApiResponse<Transfer>> createTransfer(@RequestBody Transfer transfer) {
        if (transfer.getId() == null || transfer.getId().isEmpty()) {
            transfer.setId("TRF-" + (3200 + transferRepository.count() + 1));
        }
        if (transfer.getDate() == null || transfer.getDate().isEmpty()) {
            transfer.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy")));
        }
        if (transfer.getStatus() == null) transfer.setStatus("Pending");

        Transfer saved = transferRepository.save(transfer);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Transfer created", saved));
    }

    @PatchMapping("/transfers/{id}/status")
    public ResponseEntity<ApiResponse<Transfer>> updateTransferStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        return transferRepository.findById(id).map(transfer -> {
            String status = body.get("status");
            if (status != null) {
                transfer.setStatus(status);
                transferRepository.save(transfer);
            }
            return ResponseEntity.ok(new ApiResponse<>(true, "Transfer updated", transfer));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Transfer not found", null)));
    }

    // Reports summary
    @GetMapping("/reports/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getReportSummary() {
        List<Product> products = productRepository.findAll();
        long totalProducts = products.size();
        long totalUnits = products.stream().mapToLong(p -> p.getStock() != null ? p.getStock() : 0).sum();
        double inventoryValue = products.stream().mapToDouble(p -> (p.getStock() != null ? p.getStock() : 0) * (p.getUnitPrice() != null ? p.getUnitPrice() : 0.0)).sum();
        long lowStock = products.stream().filter(p -> p.getStock() != null && p.getReorderLevel() != null && p.getStock() <= p.getReorderLevel()).count();

        List<Order> orders = orderRepository.findAll();
        long openOrders = orders.stream().filter(o -> "Pending".equalsIgnoreCase(o.getStatus()) || "Processing".equalsIgnoreCase(o.getStatus())).count();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", totalProducts);
        summary.put("totalUnits", totalUnits);
        summary.put("inventoryValue", inventoryValue);
        summary.put("lowStockItems", lowStock);
        summary.put("warehouseCount", warehouseRepository.count());
        summary.put("openOrders", openOrders);

        return ResponseEntity.ok(new ApiResponse<>(true, summary));
    }
}
