package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "user_views")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserViews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "viewed_entity_id", nullable = false)
    private Long viewedEntityId;

    @Column(name = "viewed_entity_type", nullable = false, length = 50)
    private String viewedEntityType;

    @Column(name = "view_count", nullable = false)
    private Integer viewCount = 0;

    @Column(name = "first_viewed_at", nullable = false)
    private Instant firstViewedAt;

    @Column(name = "last_viewed_at")
    private Instant lastViewedAt;

    @Column(name = "is_anonymous")
    private boolean isAnonymous;

    @Column(name = "is_bot")
    private boolean isBot;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;

    @Version
    private Long version;

    // Custom getter for Optional field
    public Optional<Instant> getLastViewedAt() {
        return Optional.ofNullable(lastViewedAt);
    }

    // Custom getter for Optional field
    public Optional<String> getMetadata() {
        return Optional.ofNullable(metadata);
    }
}