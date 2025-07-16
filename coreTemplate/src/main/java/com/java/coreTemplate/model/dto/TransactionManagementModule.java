package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "transaction_management_module")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TransactionManagementModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_reference", nullable = false, unique = true, length = 36)
    private String transactionReference;

    @Column(name = "amount", nullable = false, precision = 19, scale = 4)
    private Double amount;

    @Column(name = "currency_code", nullable = false, length = 3)
    private String currencyCode;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_successful")
    private boolean isSuccessful;

    @Column(name = "is_processed")
    private boolean isProcessed;

    @Column(name = "requires_approval")
    private boolean requiresApproval;

    @Column(name = "approval_status", length = 20)
    private String approvalStatus;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt;

    @Version
    private Long version;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.transactionDate == null) {
            this.transactionDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.lastModifiedAt = LocalDateTime.now();
    }

    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    public Optional<LocalDateTime> getLastModifiedAt() {
        return Optional.ofNullable(lastModifiedAt);
    }

    public Optional<String> getApprovalStatus() {
        return Optional.ofNullable(approvalStatus);
    }
}