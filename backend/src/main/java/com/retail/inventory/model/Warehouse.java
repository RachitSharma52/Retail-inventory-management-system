package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private String city;
    private String manager;
    private Integer capacity = 0;
    private Integer itemCount = 0;
    private String status = "Operational";

    public Warehouse() {}

    public Warehouse(String code, String name, String city, String manager, Integer capacity, Integer itemCount, String status) {
        this.code = code;
        this.name = name;
        this.city = city;
        this.manager = manager;
        this.capacity = capacity;
        this.itemCount = itemCount;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getManager() { return manager; }
    public void setManager(String manager) { this.manager = manager; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Integer getItemCount() { return itemCount; }
    public void setItemCount(Integer itemCount) { this.itemCount = itemCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
