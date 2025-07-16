package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.TransactionViews;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionViewsRepository extends JpaRepository<TransactionViews, Long> {

    // Find by transaction ID with Optional return
    Optional<TransactionViews> findByTransactionId(String transactionId);

    // Find all views for a specific user
    List<TransactionViews> findByUserId(String userId);

    // Find recent views within a date range
    List<TransactionViews> findByViewTimestampBetween(LocalDateTime start, LocalDateTime end);

    // Find views with specific status using modern collection parameter
    List<TransactionViews> findByStatusIn(List<String> statuses);

    // Custom query with JOIN and projection
    @Query("""
           SELECT new com.java.coreTemplate.model.dto.TransactionViewSummary(
               tv.transactionId, tv.userId, COUNT(tv.id))
           FROM TransactionViews tv
           WHERE tv.userId = :userId
           GROUP BY tv.transactionId, tv.userId
           """)
    List<TransactionViewSummary> findViewSummariesByUser(@Param("userId") String userId);

    // Find using a complex condition with SpEL
    @Query("""
           SELECT tv FROM TransactionViews tv
           WHERE (:status IS NULL OR tv.status = :status)
           AND (:minAmount IS NULL OR tv.amount >= :minAmount)
           AND (:maxAmount IS NULL OR tv.amount <= :maxAmount)
           """)
    List<TransactionViews> findWithFilters(
            @Param("status") String status,
            @Param("minAmount") Double minAmount,
            @Param("maxAmount") Double maxAmount);

    // Native query with pagination support
    @Query(value = """
                   SELECT * FROM transaction_views
                   WHERE user_id = :userId
                   ORDER BY view_timestamp DESC
                   """,
           nativeQuery = true)
    List<TransactionViews> findRecentViewsByUserNative(@Param("userId") String userId);

    // Exists check with modern method name
    boolean existsByTransactionIdAndUserId(String transactionId, String userId);

    // Count by status
    long countByStatus(String status);

    // Delete in batch
    void deleteByTransactionId(String transactionId);
}