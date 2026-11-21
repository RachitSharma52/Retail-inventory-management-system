package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @Column(nullable = false)
    private String party;

    private String date;
    private Integer items = 1;
    private Double amount = 0.0;
    private String status = "Pending";
    private String type = "Sales";

    public Order() {}

    public Order(String id, String party, String date, Integer items, Double amount, String status, String type) {
        this.id = id;
        this.party = party;
        this.date = date;
        this.items = items;
        this.amount = amount;
        this.status = status;
        this.type = type;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getParty() { return party; }
    public void setParty(String party) { this.party = party; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Integer getItems() { return items; }
    public void setItems(Integer items) { this.items = items; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
