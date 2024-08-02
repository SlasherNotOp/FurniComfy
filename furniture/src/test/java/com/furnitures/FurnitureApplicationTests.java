package com.furnitures;

import com.furnitures.Entity.Product;
import com.furnitures.Entity.ProductAttributes;
import com.furnitures.Repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class FurnitureApplicationTests {

	@Autowired
	ProductRepository productRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void temp(){

		List<Product> productList=productRepository.findAll();

		for(Product product:productList){
			product.setQuantity(1);
			productRepository.save(product);

		}


	}



}
