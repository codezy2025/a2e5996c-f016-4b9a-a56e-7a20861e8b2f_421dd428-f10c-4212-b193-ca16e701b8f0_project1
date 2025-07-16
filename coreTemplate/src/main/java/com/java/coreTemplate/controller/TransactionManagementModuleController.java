package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.TransactionManagementModuleService;
import com.java.coreTemplate.model.dto.TransactionManagementModule;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionManagementModuleController {
    
    private final TransactionManagementModuleService service;
    
    public TransactionManagementModuleController(TransactionManagementModuleService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<TransactionManagementModule> create(@RequestBody TransactionManagementModule entity) {
        TransactionManagementModule savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TransactionManagementModule> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<TransactionManagementModule>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<TransactionManagementModule> transactions = service.findAll(pageable);
        return ResponseEntity.ok(transactions);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TransactionManagementModule> update(
            @PathVariable Long id, 
            @RequestBody TransactionManagementModule entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        TransactionManagementModule updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<TransactionManagementModule>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TransactionManagementModule> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}