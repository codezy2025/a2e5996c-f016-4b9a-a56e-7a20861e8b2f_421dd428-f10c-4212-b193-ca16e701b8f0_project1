package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.AccountOperationsControllerService;
import com.java.coreTemplate.model.dto.AccountOperationsController;

@RestController
@RequestMapping("/api/v1/accounts/operations")
public class AccountOperationsController {
    private final AccountOperationsControllerService service;

    public AccountOperationsController(AccountOperationsControllerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AccountOperationsController> create(@RequestBody AccountOperationsController entity) {
        AccountOperationsController savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountOperationsController> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<AccountOperationsController>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<AccountOperationsController> operations = service.findAll(pageable);
        return ResponseEntity.ok(operations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountOperationsController> update(
            @PathVariable Long id, 
            @RequestBody AccountOperationsController entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure ID matches path variable
        AccountOperationsController updatedEntity = service.save(entity);
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
    public ResponseEntity<Page<AccountOperationsController>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<AccountOperationsController> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}