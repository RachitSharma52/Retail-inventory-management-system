package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private String contact;
    private String email;
    private String city;
    private Integer orders = 0;
    private Double spend = 0.0;
    private String status = "Active";

    public Customer() {}

    public Customer(String code, String name, String contact, String email, String city, Integer orders, Double spend, String status) {
        this.code = code;
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.city = city;
        this.orders = orders;
        this.spend = spend;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getOrders() { return orders; }
    public void setOrders(Integer orders) { this.orders = orders; }

    public Double getSpend() { return spend; }
    public void setSpend(Double spend) { this.spend = spend; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
