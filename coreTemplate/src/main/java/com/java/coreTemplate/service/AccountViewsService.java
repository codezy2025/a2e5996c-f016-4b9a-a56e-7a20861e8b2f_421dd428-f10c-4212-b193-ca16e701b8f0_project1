package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.AccountViewsRepository;
import com.java.coreTemplate.model.dto.AccountViews;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AccountViewsService {
    private final AccountViewsRepository repository;

    public AccountViewsService(AccountViewsRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "accountViews", allEntries = true)
    public AccountViews save(AccountViews entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "accountViews", key = "#id")
    public Optional<AccountViews> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "accountViews", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<AccountViews> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public Page<AccountViews> findAllPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<AccountViews> searchByAccountName(String name) {
        return repository.findByAccountNameContainingIgnoreCase(name);
    }

    @Transactional
    @CacheEvict(value = "accountViews", key = "#id")
    public AccountViews updateAccountViews(Long id, AccountViews updatedViews) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setViewsCount(updatedViews.getViewsCount());
                    existing.setLastViewed(updatedViews.getLastViewed());
                    // Add other fields to update as needed
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("AccountViews not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long countActiveAccounts() {
        return repository.countByIsActiveTrue();
    }
}