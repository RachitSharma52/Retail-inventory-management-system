package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String contact;
    private String email;
    private String phone;
    private String city;
    private Integer products = 0;
    private String rating = "4.5";
    private String status = "Active";

    public Supplier() {}

    public Supplier(String name, String contact, String email, String phone, String city, Integer products, String rating, String status) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.products = products;
        this.rating = rating;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getProducts() { return products; }
    public void setProducts(Integer products) { this.products = products; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
