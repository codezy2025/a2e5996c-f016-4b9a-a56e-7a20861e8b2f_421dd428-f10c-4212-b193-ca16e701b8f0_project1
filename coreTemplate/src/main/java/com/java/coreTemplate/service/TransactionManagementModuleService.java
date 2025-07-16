package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.TransactionManagementModuleRepository;
import com.java.coreTemplate.model.dto.TransactionManagementModule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class TransactionManagementModuleService {

    private final TransactionManagementModuleRepository repository;

    public TransactionManagementModuleService(TransactionManagementModuleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public TransactionManagementModule save(TransactionManagementModule entity) {
        return repository.save(entity);
    }

    @Transactional
    public List<TransactionManagementModule> saveAll(List<TransactionManagementModule> entities) {
        return repository.saveAll(entities);
    }

    public Optional<TransactionManagementModule> findById(Long id) {
        return repository.findById(id);
    }

    public List<TransactionManagementModule> findAll() {
        return repository.findAll();
    }

    public Page<TransactionManagementModule> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<TransactionManagementModule> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public TransactionManagementModule update(Long id, TransactionManagementModule updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields as needed
                    // Example: existingEntity.setField(updatedEntity.getField());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}