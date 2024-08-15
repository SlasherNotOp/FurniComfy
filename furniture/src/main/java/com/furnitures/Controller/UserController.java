package com.furnitures.Controller;

import com.furnitures.Entity.Order;
import com.furnitures.Entity.User;
import com.furnitures.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("get/order")
    public ResponseEntity<List<Order>>getAllOrders(@RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        user.getOrders();

        return new ResponseEntity<>(user.getOrders(), HttpStatus.OK);
    }

}
