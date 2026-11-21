package com.retail.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "transfers")
public class Transfer {

    @Id
    private String id;

    @Column(name = "from_location", nullable = false)
    private String from;

    @Column(name = "to_location", nullable = false)
    private String to;

    private Integer items = 1;
    private Integer units = 0;
    private String date;
    private String status = "Pending";

    public Transfer() {}

    public Transfer(String id, String from, String to, Integer items, Integer units, String date, String status) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.items = items;
        this.units = units;
        this.date = date;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public Integer getItems() { return items; }
    public void setItems(Integer items) { this.items = items; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
