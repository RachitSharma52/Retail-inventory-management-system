package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private Integer productCount = 0;
    private Integer units = 0;
    private Double value = 0.0;
    private String status = "Active";
    private String color = "blue";

    public Category() {}

    public Category(String code, String name, Integer productCount, Integer units, Double value, String status, String color) {
        this.code = code;
        this.name = name;
        this.productCount = productCount;
        this.units = units;
        this.value = value;
        this.status = status;
        this.color = color;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getProductCount() { return productCount; }
    public void setProductCount(Integer productCount) { this.productCount = productCount; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
