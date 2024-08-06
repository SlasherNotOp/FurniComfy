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
import java.util.Set;

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
    public ResponseEntity<List<Product>>GetAllProducts(
                                                       @RequestParam(required = false) String search,
                                                       @RequestParam(required = false) String category,
                                                       @RequestParam(required = false) String company,
                                                       @RequestParam(required = false) String sort,
                                                       @RequestParam(required = false) Integer price,
                                                       @RequestParam(required = false) boolean freeShipping


                                                       ) throws Exception {

        List<Product> products= productService.getAllProducts(search,category, sort ,company,price,freeShipping);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("get/category")
    public ResponseEntity<Set<String>>getListOfCategory() throws Exception{

        Set<String>list= productService.getListOfCategory();

        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("get/company")
    public ResponseEntity<Set<String>>getListOfCompany() throws Exception{

        Set<String>list= productService.getListOfCompany();

        return new ResponseEntity<>(list,HttpStatus.OK);
    }








}
