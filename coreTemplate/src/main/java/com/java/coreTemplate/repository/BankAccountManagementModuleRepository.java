package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.BankAccountManagementModule;

import java.util.List;
import java.util.Optional;

public interface BankAccountManagementModuleRepository extends 
    JpaRepository<BankAccountManagementModule, Long> {
    
    // Find by account number using derived query method
    Optional<BankAccountManagementModule> findByAccountNumber(String accountNumber);
    
    // Find all active accounts
    List<BankAccountManagementModule> findByIsActiveTrue();
    
    // Find accounts with balance greater than specified amount
    List<BankAccountManagementModule> findByBalanceGreaterThan(Double amount);
    
    // Find accounts by account type using JPQL with modern parameter binding
    @Query("SELECT a FROM BankAccountManagementModule a WHERE a.accountType = :accountType")
    List<BankAccountManagementModule> findByAccountType(@Param("accountType") String accountType);
    
    // Find accounts with balance between two values using method name derivation
    List<BankAccountManagementModule> findByBalanceBetween(Double minBalance, Double maxBalance);
    
    // Custom query to find accounts by customer ID with join (assuming relationship exists)
    @Query("SELECT a FROM BankAccountManagementModule a JOIN a.customer c WHERE c.id = :customerId")
    List<BankAccountManagementModule> findByCustomerId(@Param("customerId") Long customerId);
    
    // Native query for complex operations if needed
    @Query(
        value = "SELECT * FROM bank_accounts WHERE status = 'ACTIVE' AND created_date > CURRENT_DATE - INTERVAL '30 days'",
        nativeQuery = true
    )
    List<BankAccountManagementModule> findRecentActiveAccounts();
    
    // Update account status by account number using @Modifying
    @Modifying
    @Query("UPDATE BankAccountManagementModule a SET a.status = :status WHERE a.accountNumber = :accountNumber")
    int updateAccountStatus(@Param("accountNumber") String accountNumber, @Param("status") String status);
    
    // Check if account exists with given number and status
    boolean existsByAccountNumberAndStatus(String accountNumber, String status);
}