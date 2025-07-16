package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.AccountOperationsController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AccountOperationsControllerRepository extends 
    JpaRepository<AccountOperationsController, Long> {
    
    // Find by operation type using derived query
    List<AccountOperationsController> findByOperationType(String operationType);
    
    // Find operations within a date range
    List<AccountOperationsController> findByOperationDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find by account ID with custom JPQL query
    @Query("SELECT a FROM AccountOperationsController a WHERE a.accountId = :accountId")
    List<AccountOperationsController> findByAccountId(@Param("accountId") Long accountId);
    
    // Find by operation type and status using derived query
    List<AccountOperationsController> findByOperationTypeAndStatus(String operationType, String status);
    
    // Find top 5 recent operations
    List<AccountOperationsController> findTop5ByOrderByOperationDateDesc();
    
    // Find by amount greater than
    List<AccountOperationsController> findByAmountGreaterThan(Double amount);
    
    // Find by operation reference with case-insensitive search
    List<AccountOperationsController> findByOperationReferenceContainingIgnoreCase(String reference);
    
    // Find by status with pagination support
    @Query("SELECT a FROM AccountOperationsController a WHERE a.status = :status")
    List<AccountOperationsController> findByStatus(@Param("status") String status, org.springframework.data.domain.Pageable pageable);
    
    // Custom projection to get only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.AccountOperationSummary(a.id, a.operationType, a.amount, a.operationDate) " +
           "FROM AccountOperationsController a WHERE a.accountId = :accountId")
    List<AccountOperationSummary> findOperationSummariesByAccountId(@Param("accountId") Long accountId);
    
    // Find using native SQL query
    @Query(value = "SELECT * FROM account_operations WHERE amount > :minAmount ORDER BY operation_date DESC", nativeQuery = true)
    List<AccountOperationsController> findOperationsAboveAmount(@Param("minAmount") Double minAmount);
    
    // Find using EXISTS subquery
    @Query("SELECT a FROM AccountOperationsController a WHERE EXISTS " +
           "(SELECT 1 FROM Account a2 WHERE a2.id = a.accountId AND a2.status = 'ACTIVE')")
    List<AccountOperationsController> findOperationsForActiveAccounts();
    
    // Update status using @Modifying
    @Modifying
    @Query("UPDATE AccountOperationsController a SET a.status = :status WHERE a.id = :id")
    int updateOperationStatus(@Param("id") Long id, @Param("status") String status);
}