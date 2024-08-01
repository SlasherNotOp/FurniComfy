package com.furnitures.Service;

import com.furnitures.Entity.Product;
import com.furnitures.Entity.ProductAttributes;
import com.furnitures.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

     public void addPrduct(Product products){

         productRepository.save(products);

     }

    public void addAllPrduct(List<Product> products){

         for(Product product:products){
             productRepository.save(product);
         }
    }

    public List<Product>getAllProducts(){
         List<Product> products= productRepository.findAll();

         return products;

    }



}
