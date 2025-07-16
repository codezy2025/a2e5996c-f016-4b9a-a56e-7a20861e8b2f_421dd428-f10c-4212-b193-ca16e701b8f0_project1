package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.TransactionViewsRepository;
import com.java.coreTemplate.model.dto.TransactionViews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class TransactionViewsService {

    private final TransactionViewsRepository repository;

    public TransactionViewsService(TransactionViewsRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "transactionViews", allEntries = true)
    public TransactionViews save(TransactionViews entity) {
        return repository.save(entity);
    }

    @Cacheable("transactionViews")
    public Optional<TransactionViews> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("transactionViews")
    public List<TransactionViews> findAll() {
        return repository.findAll();
    }

    @Cacheable("transactionViews")
    public Page<TransactionViews> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "transactionViews", allEntries = true)
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<TransactionViews> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public List<TransactionViews> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    @Cacheable(value = "transactionViews", key = "#userId")
    public List<TransactionViews> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Transactional
    @CacheEvict(value = "transactionViews", key = "#entity.id")
    public TransactionViews update(TransactionViews entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}