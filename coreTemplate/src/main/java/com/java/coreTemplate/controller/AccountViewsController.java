package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.AccountViewsService;
import com.java.coreTemplate.model.dto.AccountViews;

@RestController
@RequestMapping("/api/v1/account-views")  // Using hyphen instead of space for URL compliance
public class AccountViewsController {
    private final AccountViewsService service;

    public AccountViewsController(AccountViewsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AccountViews> create(@RequestBody AccountViews entity) {
        AccountViews savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/account-views/" + savedEntity.getId())
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountViews> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<AccountViews>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<AccountViews> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountViews> update(
            @PathVariable Long id, 
            @RequestBody AccountViews entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        AccountViews updatedEntity = service.save(entity);
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
    public ResponseEntity<Page<AccountViews>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<AccountViews> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}