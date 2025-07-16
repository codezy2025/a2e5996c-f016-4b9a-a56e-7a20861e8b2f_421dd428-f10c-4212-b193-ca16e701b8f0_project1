package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "user_operations_controller")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserOperationsController {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_system_controller")
    private boolean isSystemController;

    @Column(name = "last_modified_at")
    private Instant lastModifiedAt;

    @Column(name = "description", length = 500)
    private String description;

    @Version
    private Long version;

    // Custom getter for Optional description
    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    // Boolean getters with 'is' prefix
    public boolean isActive() {
        return isActive;
    }

    public boolean isSystemController() {
        return isSystemController;
    }
}