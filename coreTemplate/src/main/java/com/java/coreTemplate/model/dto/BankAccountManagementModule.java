package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Currency;
import java.util.Optional;

@Entity
@Table(name = "bank_account_management_module")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountManagementModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", nullable = false, unique = true, length = 34)
    private String accountNumber;

    @Column(name = "account_holder_name", nullable = false, length = 100)
    private String accountHolderName;

    @Column(name = "balance", nullable = false, precision = 19, scale = 4)
    private BigDecimal balance;

    @Column(name = "currency", nullable = false, length = 3)
    private Currency currency;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_joint_account")
    private boolean isJointAccount;

    @Column(name = "overdraft_limit", precision = 19, scale = 4)
    private BigDecimal overdraftLimit;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;

    @Column(name = "minimum_balance", precision = 19, scale = 4)
    private Optional<BigDecimal> minimumBalance;

    @Version
    private Long version;
}