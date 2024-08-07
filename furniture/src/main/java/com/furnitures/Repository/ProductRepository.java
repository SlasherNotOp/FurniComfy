package com.furnitures.Repository;

import com.furnitures.Entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByAttributesTitleAsc();
    List<Product>findAllByOrderByAttributesPriceAsc();
    List<Product> findAllByOrderByAttributesPriceDesc();

    Streamable<Product> findByAttributesTitleContaining(String str, Sort sort);

}
