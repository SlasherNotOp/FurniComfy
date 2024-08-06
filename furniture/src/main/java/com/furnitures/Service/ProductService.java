package com.furnitures.Service;

import com.furnitures.Entity.Product;
import com.furnitures.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public List<Product>getAllProducts(String search, String category, String sort , String company, Integer price, boolean freeShipping){




         List<Product>products=new ArrayList<>();

         //pending work
         if(search!=null){
             System.out.println(search);
             Streamable<Product>productStreamable=productRepository.findByAttributesTitleContaining(search);
             products= productStreamable.toList();
         }


         if(sort==null||sort.equals("a-z")){
            products= productRepository.findAllByOrderByAttributesTitleAsc();
         } else if (sort.equals("low")) {
             products=productRepository.findAllByOrderByAttributesPriceAsc();
         }else if (sort.equals("high")) {
             products=productRepository.findAllByOrderByAttributesPriceDesc();
         }




        if(category!=null&&!category.equals("all")){

             List<Product>categoryList=new ArrayList<>();
             for(Product product1:products){
                 if(product1.getAttributes().getCategory().equals(category)) {
                     categoryList.add(product1);
                 }

             }
            products=null;
             products=categoryList;

         }
         if(company!=null&&!company.equals("all")){
             System.out.println(company);
             List<Product>companyList=new ArrayList<>();
             for(Product product1:products){
                 if(product1.getAttributes().getCompany().equals(company)) {
                     companyList.add(product1);
                 }

             }
             products=null;
             products=companyList;

         }

         return products;

    }


    public Set<String> getListOfCategory() {
         List<Product>products=productRepository.findAll();

        Set<String>newSet=new HashSet<>();

        for(Product product:products){
            newSet.add(product.getAttributes().getCategory());
        }

        return newSet;


    }

    public Set<String> getListOfCompany() {
        List<Product>products=productRepository.findAll();

        Set<String>newSet=new HashSet<>();

        for(Product product:products){
            newSet.add(product.getAttributes().getCompany());
        }
        return newSet;

    }


}
