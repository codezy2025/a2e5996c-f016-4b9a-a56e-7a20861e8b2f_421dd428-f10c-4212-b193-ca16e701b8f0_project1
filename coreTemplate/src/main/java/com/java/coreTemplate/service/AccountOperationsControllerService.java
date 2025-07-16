package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.AccountOperationsControllerRepository;
import com.java.coreTemplate.model.dto.AccountOperationsController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AccountOperationsControllerService {

    private final AccountOperationsControllerRepository repository;

    public AccountOperationsControllerService(AccountOperationsControllerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "accounts", allEntries = true)
    public AccountOperationsController save(AccountOperationsController entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "accounts", key = "#id")
    public Optional<AccountOperationsController> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "accounts")
    public Page<AccountOperationsController> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<AccountOperationsController> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "accounts", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "accounts", key = "#entity.id")
    public AccountOperationsController update(AccountOperationsController entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Cacheable(value = "accounts", key = "'active-count'")
    public long countActiveAccounts() {
        return repository.countByIsActiveTrue();
    }
}