package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.AccountViews;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AccountViewsRepository extends JpaRepository<AccountViews, Long> {

    // Find by account ID using derived query method
    List<AccountViews> findByAccountId(Long accountId);

    // Find by viewer ID using derived query method
    List<AccountViews> findByViewerId(Long viewerId);

    // Find by account ID and viewer ID combination
    Optional<AccountViews> findByAccountIdAndViewerId(Long accountId, Long viewerId);

    // Count views for a specific account
    long countByAccountId(Long accountId);

    // Find views within a date range using JPQL
    @Query("SELECT av FROM AccountViews av WHERE av.viewedAt BETWEEN :start AND :end")
    List<AccountViews> findBetweenDates(@Param("start") LocalDateTime start, 
                                       @Param("end") LocalDateTime end);

    // Find distinct viewers for an account
    @Query("SELECT DISTINCT av.viewerId FROM AccountViews av WHERE av.accountId = :accountId")
    List<Long> findDistinctViewersByAccountId(@Param("accountId") Long accountId);

    // Find most recent views for an account with limit
    @Query("SELECT av FROM AccountViews av WHERE av.accountId = :accountId ORDER BY av.viewedAt DESC")
    List<AccountViews> findRecentViewsByAccountId(@Param("accountId") Long accountId, 
                                                 org.springframework.data.domain.Pageable pageable);

    // Check if a specific viewer has viewed an account
    boolean existsByAccountIdAndViewerId(Long accountId, Long viewerId);

    // Delete all views for a specific account
    void deleteByAccountId(Long accountId);
}