package com.furnitures.Service;

import com.furnitures.Entity.Order;
import com.furnitures.Entity.Product;
import com.furnitures.Entity.User;
import com.furnitures.Repository.OrderRepository;
import com.furnitures.Request.PaymentCartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    ProductService productService;

    @Autowired
    OrderRepository orderRepository;

    public int getTotalPrice(List<PaymentCartRequest> paymentCartRequest){
        double subTotal=5;


        for(PaymentCartRequest payment:paymentCartRequest){

            Product product=productService.getProductById((long)payment.getId());
            double amount=product.getAttributes().getPrice();
            amount/=100;
            System.out.println(amount);
            amount *= payment.getQuantity();
            subTotal+=amount;

        }
        subTotal+=subTotal/10;


        return (int)subTotal;
    }

    public void saveOrder(User user, String address, int totolAmount, List<PaymentCartRequest> paymentCartRequest) throws Exception{

        Order order=new Order();

        order.setAddress(address);
        order.setUser(user);
        order.setPrice(totolAmount);
        order.setProductId(paymentCartRequest);
        Order save= orderRepository.save(order);



    }



    
}
