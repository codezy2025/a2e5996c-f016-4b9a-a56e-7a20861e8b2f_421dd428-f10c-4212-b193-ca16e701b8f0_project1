package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UserManagementModule;

import java.util.List;
import java.util.Optional;

public interface UserManagementModuleRepository extends 
    JpaRepository<UserManagementModule, Long> {
    
    // Find by username using derived query method
    Optional<UserManagementModule> findByUsername(String username);

    // Find by email ignoring case
    Optional<UserManagementModule> findByEmailIgnoreCase(String email);

    // Find active users
    List<UserManagementModule> findByActiveTrue();

    // Find users by role name using JPQL
    @Query("SELECT u FROM UserManagementModule u JOIN u.roles r WHERE r.name = :roleName")
    List<UserManagementModule> findByRoleName(@Param("roleName") String roleName);

    // Find users created after a specific date
    List<UserManagementModule> findByCreatedAtAfter(LocalDateTime date);

    // Check if username exists (returns boolean)
    boolean existsByUsername(String username);

    // Find users with email containing a string (case insensitive)
    List<UserManagementModule> findByEmailContainingIgnoreCase(String emailPart);

    // Custom update method using @Modifying
    @Modifying
    @Query("UPDATE UserManagementModule u SET u.active = :active WHERE u.id = :id")
    int updateUserStatus(@Param("id") Long id, @Param("active") boolean active);

    // Find users with pagination support
    @Query("SELECT u FROM UserManagementModule u WHERE u.department = :department")
    Page<UserManagementModule> findByDepartment(@Param("department") String department, Pageable pageable);

    // Projection query for limited fields
    @Query("SELECT new com.java.coreTemplate.model.dto.UserSummary(u.id, u.username, u.email) FROM UserManagementModule u WHERE u.active = true")
    List<UserSummary> findActiveUserSummaries();
}