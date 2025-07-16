package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.TransactionManagementModule;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionManagementModuleRepository extends 
    JpaRepository<TransactionManagementModule, Long> {
    
    // Find by transaction reference with optional result
    Optional<TransactionManagementModule> findByTransactionReference(String reference);

    // Find transactions by status using modern collection parameter
    List<TransactionManagementModule> findByStatusIn(List<String> statuses);

    // Find transactions within a date range
    List<TransactionManagementModule> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Custom JPQL query with named parameters
    @Query("SELECT t FROM TransactionManagementModule t WHERE t.amount >= :minAmount AND t.status = :status")
    List<TransactionManagementModule> findHighValueTransactions(
        @Param("minAmount") double minAmount, 
        @Param("status") String status);

    // Native query for complex operations
    @Query(value = """
        SELECT * FROM transaction_management 
        WHERE created_at >= :since 
        ORDER BY amount DESC 
        LIMIT :limit
        """, nativeQuery = true)
    List<TransactionManagementModule> findRecentHighValueTransactions(
        @Param("since") LocalDateTime since, 
        @Param("limit") int limit);

    // Projection interface for partial data retrieval
    @Query("SELECT t.transactionReference as transactionReference, t.amount as amount FROM TransactionManagementModule t WHERE t.userId = :userId")
    List<TransactionSummary> findTransactionSummariesByUserId(@Param("userId") Long userId);

    // Dynamic sorting with method name
    List<TransactionManagementModule> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Count transactions by status
    long countByStatus(String status);

    // Check if transaction exists by reference
    boolean existsByTransactionReference(String reference);

    // Delete transactions older than specified date
    void deleteByCreatedAtBefore(LocalDateTime cutoffDate);

    // Interface for projection
    interface TransactionSummary {
        String getTransactionReference();
        Double getAmount();
    }
}