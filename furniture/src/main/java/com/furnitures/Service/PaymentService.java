package com.furnitures.Service;

import com.furnitures.Entity.Product;
import com.furnitures.Request.PaymentCartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    ProductService productService;

    public int getTotalPrice(List<PaymentCartRequest> paymentCartRequest){
        double subTotal=5;


        for(PaymentCartRequest payment:paymentCartRequest){

            Product product=productService.getProductById(payment.getId());
            double amount=product.getAttributes().getPrice();
            amount/=100;
            System.out.println(amount);
            amount *= payment.getQuantity();
            subTotal+=amount;

        }
        subTotal+=subTotal/10;


        return (int)subTotal;
    }

}
