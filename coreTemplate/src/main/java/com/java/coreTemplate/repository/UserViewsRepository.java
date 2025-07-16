package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UserViews;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserViewsRepository extends JpaRepository<UserViews, Long> {

    // Find by user ID with Optional return
    Optional<UserViews> findByUserId(Long userId);

    // Find all views after a specific timestamp
    List<UserViews> findByViewTimestampAfter(LocalDateTime timestamp);

    // Find views by user ID and page URL
    List<UserViews> findByUserIdAndPageUrl(Long userId, String pageUrl);

    // Count views by page URL
    long countByPageUrl(String pageUrl);

    // Find distinct users who viewed a specific page
    @Query("SELECT DISTINCT uv.userId FROM UserViews uv WHERE uv.pageUrl = :pageUrl")
    List<Long> findDistinctUsersByPageUrl(@Param("pageUrl") String pageUrl);

    // Find top N most viewed pages
    @Query("SELECT uv.pageUrl, COUNT(uv) as viewCount FROM UserViews uv GROUP BY uv.pageUrl ORDER BY viewCount DESC")
    List<Object[]> findTopViewedPages(int limit);

    // Custom query with projection interface
    @Query("SELECT uv.userId as userId, uv.pageUrl as pageUrl, uv.viewTimestamp as viewTime FROM UserViews uv WHERE uv.userId = :userId")
    List<UserViewProjection> findUserViewsProjection(@Param("userId") Long userId);

    // Delete all views older than specified timestamp
    void deleteByViewTimestampBefore(LocalDateTime cutoff);

    // Check if a view exists for user and page within time range
    boolean existsByUserIdAndPageUrlAndViewTimestampBetween(
            Long userId, 
            String pageUrl, 
            LocalDateTime start, 
            LocalDateTime end);

    // Interface for projection
    interface UserViewProjection {
        Long getUserId();
        String getPageUrl();
        LocalDateTime getViewTime();
    }
}