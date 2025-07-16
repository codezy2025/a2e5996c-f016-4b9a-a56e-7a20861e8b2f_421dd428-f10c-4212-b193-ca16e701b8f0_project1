package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.UserViewsRepository;
import com.java.coreTemplate.model.dto.UserViews;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserViewsService {

    private final UserViewsRepository repository;

    public UserViewsService(UserViewsRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "userViews", allEntries = true)
    public UserViews save(UserViews entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "userViews", key = "#id")
    public Optional<UserViews> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "userViews", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<UserViews> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<UserViews> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "userViews", key = "'all-active'")
    public List<UserViews> findAllActiveCached() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "userViews", key = "#id")
    public UserViews update(Long id, UserViews updatedEntity) {
        return repository.findById(id)
                .map(existing -> {
                    // Update fields here
                    existing.setViews(updatedEntity.getViews());
                    // Add other fields to update
                    return repository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("UserViews not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}