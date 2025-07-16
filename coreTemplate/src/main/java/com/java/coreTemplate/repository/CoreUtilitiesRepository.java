package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.CoreUtilities;

import java.util.List;
import java.util.Optional;

public interface CoreUtilitiesRepository extends JpaRepository<CoreUtilities, Long> {

    // Find by utility name (case-insensitive)
    Optional<CoreUtilities> findByNameIgnoreCase(String name);

    // Find all active utilities
    List<CoreUtilities> findByIsActiveTrue();

    // Find utilities by type using JPQL
    @Query("SELECT cu FROM CoreUtilities cu WHERE cu.type = :type ORDER BY cu.name")
    List<CoreUtilities> findByType(@Param("type") String type);

    // Find utilities created after a specific date
    List<CoreUtilities> findByCreatedAtAfter(LocalDateTime date);

    // Find utilities where description contains a string (case-insensitive)
    List<CoreUtilities> findByDescriptionContainingIgnoreCase(String searchTerm);

    // Custom projection with only name and type
    @Query("SELECT new com.java.coreTemplate.model.dto.CoreUtilities(cu.name, cu.type) FROM CoreUtilities cu WHERE cu.type = :type")
    List<CoreUtilities> findNameAndTypeByType(@Param("type") String type);

    // Native query for complex operations
    @Query(value = "SELECT * FROM core_utilities WHERE version > :minVersion AND is_active = true", nativeQuery = true)
    List<CoreUtilities> findActiveUtilitiesWithMinVersion(@Param("minVersion") int minVersion);

    // Update utility status by ID
    @Modifying
    @Query("UPDATE CoreUtilities cu SET cu.isActive = :status WHERE cu.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") boolean status);

    // Check if a utility with given name exists
    boolean existsByName(String name);

    // Count utilities by type
    long countByType(String type);

    // Delete utilities by type
    @Modifying
    int deleteByType(String type);
}