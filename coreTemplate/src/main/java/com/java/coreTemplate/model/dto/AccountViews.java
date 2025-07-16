package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "account_views")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AccountViews {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "account_id", nullable = false)
    private UUID accountId;

    @Column(name = "viewer_id")
    private UUID viewerId;

    @Column(name = "viewed_at", nullable = false)
    private Instant viewedAt;

    @Column(name = "is_anonymous", nullable = false)
    private boolean isAnonymous;

    @Column(name = "is_mobile", nullable = false)
    private boolean isMobile;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 512)
    private String userAgent;

    @Version
    private Long version;
}