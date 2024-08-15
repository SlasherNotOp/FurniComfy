package com.furnitures.Request;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class PaymentCartRequest {
    private int id;
    private int quantity;
}
