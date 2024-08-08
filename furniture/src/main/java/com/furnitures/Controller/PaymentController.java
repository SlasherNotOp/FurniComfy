package com.furnitures.Controller;

import com.furnitures.Request.PaymentCartRequest;
import com.furnitures.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    public ResponseEntity<?> paymentMethod(
            @RequestHeader("Authorization") String jwt,
            @RequestBody PaymentCartRequest paymentCartRequest
    ){
        double totolAmount= paymentService.getTotalPrice(paymentCartRequest);
        

        return null;

    }

}
