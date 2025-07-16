package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "account_operations_controller")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AccountOperationsController {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "operation_name", nullable = false, length = 100)
    private String operationName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_system_operation")
    private boolean isSystemOperation;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "last_modified_at")
    private Instant lastModifiedAt;

    @Column(name = "max_retry_attempts")
    private Integer maxRetryAttempts;

    @Column(name = "requires_approval")
    private boolean requiresApproval;

    @Version
    private Long version;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        this.lastModifiedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.lastModifiedAt = Instant.now();
    }
}