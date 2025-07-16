package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UserOperationsController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserOperationsControllerRepository extends 
    JpaRepository<UserOperationsController, Long> {
    
    // Find by exact username using derived query
    Optional<UserOperationsController> findByUsername(String username);

    // Find by username containing a string (case-insensitive)
    List<UserOperationsController> findByUsernameContainingIgnoreCase(String usernamePart);

    // Find by email using JPQL with named parameter
    @Query("SELECT u FROM UserOperationsController u WHERE u.email = :email")
    Optional<UserOperationsController> findByEmail(@Param("email") String email);

    // Find active users created after a certain date
    @Query("SELECT u FROM UserOperationsController u WHERE u.isActive = true AND u.createdAt > :date")
    List<UserOperationsController> findActiveUsersCreatedAfter(@Param("date") LocalDateTime date);

    // Find users by role using a native query
    @Query(value = "SELECT * FROM user_operations WHERE role = :role", nativeQuery = true)
    List<UserOperationsController> findByRoleNative(@Param("role") String role);

    // Check if a username exists
    boolean existsByUsername(String username);

    // Count users by status
    long countByStatus(String status);

    // Delete users by status
    void deleteByStatus(String status);

    // Find top 5 recently created active users
    List<UserOperationsController> findTop5ByIsActiveTrueOrderByCreatedAtDesc();
}