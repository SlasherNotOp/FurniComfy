package com.furnitures.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.furnitures.Request.PaymentCartRequest;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @ElementCollection
    private List<PaymentCartRequest>productId;

    private String address;

    private double price;

    @ManyToOne
    private User user;

}
