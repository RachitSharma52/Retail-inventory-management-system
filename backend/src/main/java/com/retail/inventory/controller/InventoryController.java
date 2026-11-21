package com.retail.inventory.controller;

import com.retail.inventory.dto.ApiResponse;
import com.retail.inventory.model.Product;
import com.retail.inventory.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final ProductRepository productRepository;

    public InventoryController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllInventory(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String warehouse) {

        String trimmedSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String trimmedCat = (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) ? category.trim() : null;
        String trimmedWh = (warehouse != null && !warehouse.trim().isEmpty()) ? warehouse.trim() : null;

        List<Product> products = productRepository.searchProducts(trimmedSearch, trimmedCat, trimmedWh);
        return ResponseEntity.ok(new ApiResponse<>(true, products.size(), products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getInventoryItem(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(p -> ResponseEntity.ok(new ApiResponse<>(true, p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Inventory item not found", null)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Product>> createInventoryItem(@RequestBody Product product) {
        if (product.getSku() == null || product.getSku().trim().isEmpty() ||
            product.getName() == null || product.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "SKU and Name are required", null));
        }

        if (productRepository.existsBySku(product.getSku())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse<>(false, "SKU already exists", null));
        }

        if (product.getStock() == null) product.setStock(0);
        if (product.getReorderLevel() == null) product.setReorderLevel(10);
        if (product.getUnitPrice() == null) product.setUnitPrice(0.0);

        if (product.getStatus() == null || product.getStatus().isEmpty()) {
            product.setStatus(product.getStock() == 0 ? "Out of stock" : (product.getStock() <= product.getReorderLevel() ? "Low stock" : "In stock"));
        }

        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Inventory item created", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> updateInventoryItem(@PathVariable Long id, @RequestBody Product product) {
        return productRepository.findById(id).map(existing -> {
            if (product.getName() != null) existing.setName(product.getName());
            if (product.getCategory() != null) existing.setCategory(product.getCategory());
            if (product.getWarehouse() != null) existing.setWarehouse(product.getWarehouse());
            if (product.getStock() != null) existing.setStock(product.getStock());
            if (product.getReorderLevel() != null) existing.setReorderLevel(product.getReorderLevel());
            if (product.getUnitPrice() != null) existing.setUnitPrice(product.getUnitPrice());
            if (product.getStatus() != null) existing.setStatus(product.getStatus());
            else {
                existing.setStatus(existing.getStock() == 0 ? "Out of stock" : (existing.getStock() <= existing.getReorderLevel() ? "Low stock" : "In stock"));
            }

            Product updated = productRepository.save(existing);
            return ResponseEntity.ok(new ApiResponse<>(true, "Inventory item updated", updated));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Inventory item not found", null)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> deleteInventoryItem(@PathVariable Long id) {
        return productRepository.findById(id).map(p -> {
            productRepository.delete(p);
            return ResponseEntity.ok(new ApiResponse<>(true, "Inventory item removed", p));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Inventory item not found", null)));
    }
}
