package com.furnitures.Controller;

import com.furnitures.Entity.User;
import com.furnitures.Request.PaymentCartRequest;
import com.furnitures.Response.PaymentLinkResponse;
import com.furnitures.Service.PaymentService;
import com.furnitures.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import com.razorpay.*;

import java.util.List;

@RestController
@RequestMapping("api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @Value("${razorpay.api.key}")
    private String keyId;

    @Value("${razorpay.api.secret}")
    private String keySecret;

    @Autowired
    UserService userService;


    @PostMapping("get/{address}")
    public ResponseEntity<PaymentLinkResponse> paymentMethod(
            @RequestHeader("Authorization") String jwt,
            @RequestBody List<PaymentCartRequest> paymentCartRequest,
            @PathVariable String address
    ) throws Exception {

        System.out.println(address);

        int totolAmount= paymentService.getTotalPrice(paymentCartRequest);
        totolAmount*=100;
        User user=userService.findUserByJwtToken(jwt);

        paymentService.saveOrder(user,address,totolAmount,paymentCartRequest);

        RazorpayClient razorpayClient=new RazorpayClient(keyId,keySecret);

        JSONObject paymentLinkRequest=new JSONObject();

        paymentLinkRequest.put("amount",totolAmount);
        paymentLinkRequest.put("currency","USD");

        JSONObject customer=new JSONObject();
        customer.put("name",user.getFullName());
        customer.put("email",user.getEmail());

        paymentLinkRequest.put("customer",customer);

        JSONObject notify=new JSONObject();
        notify.put("email",true);

        paymentLinkRequest.put("notify",notify);

        paymentLinkRequest.put("callback_url","https://furni-comfy-frontend.vercel.app/payment/success/"+user.getId());

        PaymentLink payment=razorpayClient.paymentLink.create(paymentLinkRequest);




        String paymentLinkId=payment.get("id");
        String paymentLinkUrl=payment.get("short_url");

        PaymentLinkResponse res=new PaymentLinkResponse();

        res.setId(paymentLinkId);
        res.setPaymentLinkUrl(paymentLinkUrl);

        return new ResponseEntity<>(res, HttpStatus.OK);

    }

}
