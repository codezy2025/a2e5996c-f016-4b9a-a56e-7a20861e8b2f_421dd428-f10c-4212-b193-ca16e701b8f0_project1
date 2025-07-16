package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.UserOperationsControllerRepository;
import com.java.coreTemplate.model.dto.UserOperationsController;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserOperationsControllerService {

    private final UserOperationsControllerRepository repository;

    public UserOperationsControllerService(UserOperationsControllerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "users", allEntries = true)
    public UserOperationsController save(UserOperationsController entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "users", key = "#id")
    public Optional<UserOperationsController> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "users")
    public List<UserOperationsController> findAll() {
        return repository.findAll();
    }

    public Page<UserOperationsController> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable(value = "activeUsers")
    public List<UserOperationsController> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = {"users", "activeUsers"}, key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = {"users", "activeUsers"}, allEntries = true)
    public List<UserOperationsController> saveAll(List<UserOperationsController> entities) {
        return repository.saveAll(entities);
    }

    @Cacheable(value = "users", key = "#email")
    public Optional<UserOperationsController> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}