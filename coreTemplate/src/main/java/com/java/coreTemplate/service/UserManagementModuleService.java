package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.UserManagementModuleRepository;
import com.java.coreTemplate.model.dto.UserManagementModule;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserManagementModuleService {

    private final UserManagementModuleRepository repository;

    public UserManagementModuleService(UserManagementModuleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "users", allEntries = true)
    public UserManagementModule save(UserManagementModule entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "users", key = "#id")
    public Optional<UserManagementModule> findById(Long id) {
        return repository.findById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserManagementModule> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "users")
    public Page<UserManagementModule> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "users", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "users", key = "#id")
    public UserManagementModule update(Long id, UserManagementModule updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    existingEntity.setName(updatedEntity.getName());
                    existingEntity.setEmail(updatedEntity.getEmail());
                    // Add other fields as needed
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Transactional
    @CacheEvict(value = "users", key = "#id")
    public void deactivateUser(Long id) {
        repository.findById(id).ifPresent(user -> {
            user.setActive(false);
            repository.save(user);
        });
    }
}