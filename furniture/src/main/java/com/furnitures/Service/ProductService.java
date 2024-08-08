package com.furnitures.Service;

import com.furnitures.Entity.Product;
import com.furnitures.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
             //System.out.println(search);
             Streamable<Product>productStreamable=Streamable.empty();

             if(sort.equals("a-z")){
                 Sort newSort=Sort.by(Sort.Direction.ASC,"attributesTitle");
                 productStreamable=productRepository.findByAttributesTitleContaining(search,newSort);

             }
             if (sort.equals("low")) {
                 Sort newSort=Sort.by(Sort.Direction.ASC,"attributesPrice");
                 productStreamable=productRepository.findByAttributesTitleContaining(search,newSort);
             }
             if (sort.equals("high")) {
                 Sort newSort=Sort.by(Sort.Direction.DESC,"attributesPrice");
                 productStreamable=productRepository.findByAttributesTitleContaining(search,newSort);
             }


             products= productStreamable.toList();

         }
         else {
             if(sort==null){
                 products=productRepository.findAll();
             }
             else if (sort.equals("a-z")) {
                 products = productRepository.findAllByOrderByAttributesTitleAsc();
             } else if (sort.equals("low")) {
                 products = productRepository.findAllByOrderByAttributesPriceAsc();
             } else if (sort.equals("high")) {
                 products = productRepository.findAllByOrderByAttributesPriceDesc();
             }
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
            // System.out.println(company);
             List<Product>companyList=new ArrayList<>();
             for(Product product1:products){
                 if(product1.getAttributes().getCompany().equals(company)) {
                     companyList.add(product1);
                 }

             }
             products=null;
             products=companyList;

         }

         if(price!=null){

             List<Product> collect = products.stream().filter(pr -> (pr.getAttributes().getPrice()/100) <= price).collect(Collectors.toList());
//             System.out.println(price);
//             System.out.println(collect);
             products=collect;
         }
         System.out.println(freeShipping);
         if(freeShipping){


            products=products.stream().filter(free->free.getAttributes().isShipping()).collect(Collectors.toList());
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


    public Product getProductById(Long id) {

       return productRepository.findById(id).get();

    }
}
