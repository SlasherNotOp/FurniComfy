package com.furnitures.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Embeddable
@Data
public class ProductAttributes {
    private String title;
    private String company;

    @Column(length = 1000)
    private String description;

    private boolean featured;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date publishedAt;

    private String category;

    private String image;

    private int price;


    private boolean shipping;

    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "color")
    private List<String> colors;
}
