package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;

    private String category;
    private String warehouse;
    private Integer stock = 0;
    private Integer reorderLevel = 10;
    private Double unitPrice = 0.0;
    private String status = "In stock";

    public Product() {}

    public Product(String sku, String name, String category, String warehouse, Integer stock, Integer reorderLevel, Double unitPrice, String status) {
        this.sku = sku;
        this.name = name;
        this.category = category;
        this.warehouse = warehouse;
        this.stock = stock;
        this.reorderLevel = reorderLevel;
        this.unitPrice = unitPrice;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getWarehouse() { return warehouse; }
    public void setWarehouse(String warehouse) { this.warehouse = warehouse; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }

    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
