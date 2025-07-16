package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "core_utilities")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CoreUtilities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "utility_name", nullable = false, length = 100, unique = true)
    private String utilityName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "last_modified_at")
    private Instant lastModifiedAt;

    @Column(name = "configuration_json", columnDefinition = "TEXT")
    private String configurationJson;

    @Version
    private Long version;

    // Custom getter for Optional description
    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    // Custom getter for Optional lastModifiedAt
    public Optional<Instant> getLastModifiedAt() {
        return Optional.ofNullable(lastModifiedAt);
    }

    // Custom getter for Optional configurationJson
    public Optional<String> getConfigurationJson() {
        return Optional.ofNullable(configurationJson);
    }
}