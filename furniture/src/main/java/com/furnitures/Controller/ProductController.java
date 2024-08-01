package com.furnitures.Controller;

import com.furnitures.Entity.Product;
import com.furnitures.Entity.User;
import com.furnitures.Repository.ProductRepository;
import com.furnitures.Service.ProductService;
import com.furnitures.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    UserService userService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;


    @PostMapping("/add")
    public ResponseEntity<String>addProduct(@RequestBody Product product, @RequestHeader("Authorization") String jwt) throws Exception {

        User user= userService.findUserByJwtToken(jwt);

        if(user==null){
            throw new Exception("jwt token is incorrect");
        }

         productRepository.save(product);
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

    @PostMapping("/addAll")
    public ResponseEntity<String>addAllProducts(@RequestBody List<Product> products, @RequestHeader("Authorization") String jwt) throws Exception {

        User user= userService.findUserByJwtToken(jwt);

        if(user==null){
            throw new Exception("jwt token is incorrect");
        }

        productService.addAllPrduct(products);

        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Product>>GetAllProducts() throws Exception {

        List<Product> products= productService.getAllProducts();

        return new ResponseEntity<>(products, HttpStatus.OK);
    }





}
