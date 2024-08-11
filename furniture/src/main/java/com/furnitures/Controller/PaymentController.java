package com.furnitures.Controller;

import com.furnitures.Request.PaymentCartRequest;
import com.furnitures.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping("get")
    public ResponseEntity<Integer> paymentMethod(
            @RequestHeader("Authorization") String jwt,
            @RequestBody List<PaymentCartRequest> paymentCartRequest
    ){
        int totolAmount= paymentService.getTotalPrice(paymentCartRequest);


        

        return new ResponseEntity<>(totolAmount, HttpStatus.OK);

    }

}
