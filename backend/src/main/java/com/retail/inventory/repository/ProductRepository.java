package com.retail.inventory.repository;

import com.retail.inventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);
    boolean existsBySku(String sku);

    @Query("SELECT p FROM Product p WHERE " +
           "(:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:warehouse IS NULL OR p.warehouse = :warehouse)")
    List<Product> searchProducts(@Param("search") String search,
                                 @Param("category") String category,
                                 @Param("warehouse") String warehouse);
}
