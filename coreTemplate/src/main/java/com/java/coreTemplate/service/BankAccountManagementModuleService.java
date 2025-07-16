package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.BankAccountManagementModuleRepository;
import com.java.coreTemplate.model.dto.BankAccountManagementModule;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BankAccountManagementModuleService {

    private final BankAccountManagementModuleRepository repository;

    public BankAccountManagementModuleService(BankAccountManagementModuleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "bankAccounts", allEntries = true)
    public BankAccountManagementModule save(BankAccountManagementModule entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "bankAccounts", key = "#id")
    public Optional<BankAccountManagementModule> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("bankAccounts")
    public List<BankAccountManagementModule> findAll() {
        return repository.findAll();
    }

    public Page<BankAccountManagementModule> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable(value = "bankAccounts", key = "'active'")
    public List<BankAccountManagementModule> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "bankAccounts", key = "#id")
    public void deactivateAccount(Long id) {
        repository.findById(id).ifPresent(account -> {
            account.setActive(false);
            repository.save(account);
        });
    }

    @Transactional
    @CacheEvict(value = "bankAccounts", allEntries = true)
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Cacheable(value = "bankAccounts", key = "'type-' + #type")
    public List<BankAccountManagementModule> findByAccountType(String type) {
        return repository.findByAccountType(type);
    }

    @Cacheable(value = "bankAccounts", key = "'balance-greater-' + #amount")
    public List<BankAccountManagementModule> findByBalanceGreaterThan(Double amount) {
        return repository.findByBalanceGreaterThan(amount);
    }

    @Cacheable(value = "bankAccounts", key = "'customer-' + #customerId")
    public List<BankAccountManagementModule> findByCustomerId(Long customerId) {
        return repository.findByCustomerId(customerId);
    }
}