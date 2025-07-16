package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.coreTemplate.repository.CoreUtilitiesRepository;
import com.java.coreTemplate.model.dto.CoreUtilities;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CoreUtilitiesService {

    private final CoreUtilitiesRepository repository;

    public CoreUtilitiesService(CoreUtilitiesRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "coreUtilities", allEntries = true)
    public CoreUtilities save(CoreUtilities entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "coreUtilities", key = "#id")
    public Optional<CoreUtilities> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "coreUtilities", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<CoreUtilities> findAll() {
        return repository.findAll();
    }

    public Page<CoreUtilities> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<CoreUtilities> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "coreUtilities", key = "#id")
    public CoreUtilities update(Long id, CoreUtilities updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    // Example: existingEntity.setName(updatedEntity.getName());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("CoreUtilities not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}