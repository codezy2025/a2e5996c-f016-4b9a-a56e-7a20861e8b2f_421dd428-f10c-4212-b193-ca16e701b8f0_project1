package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.TransactionViewsService;
import com.java.coreTemplate.model.dto.TransactionViews;

@RestController
@RequestMapping("/api/v1/transaction-views")  // Using hyphen instead of space for URL compliance
public class TransactionViewsController {
    private final TransactionViewsService service;

    public TransactionViewsController(TransactionViewsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TransactionViews> create(@RequestBody TransactionViews entity) {
        TransactionViews savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionViews> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<TransactionViews>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<TransactionViews> transactionViews = service.findAll(pageable);
        return ResponseEntity.ok(transactionViews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionViews> update(
            @PathVariable Long id, 
            @RequestBody TransactionViews entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);  // Ensure the ID matches the path variable
        TransactionViews updatedEntity = service.save(entity);
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
    public ResponseEntity<Page<TransactionViews>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TransactionViews> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}