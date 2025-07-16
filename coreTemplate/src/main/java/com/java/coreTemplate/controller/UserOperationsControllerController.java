package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.UserOperationsControllerService;
import com.java.coreTemplate.model.dto.UserOperationsController;

@RestController
@RequestMapping("/api/v1/users/operations")
public class UserOperationsController {
    private final UserOperationsControllerService service;

    public UserOperationsController(UserOperationsControllerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UserOperationsController> create(@RequestBody UserOperationsController entity) {
        UserOperationsController savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/users/operations/" + savedEntity.getId())
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserOperationsController> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<UserOperationsController>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<UserOperationsController> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserOperationsController> update(
            @PathVariable Long id,
            @RequestBody UserOperationsController entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserOperationsController> partialUpdate(
            @PathVariable Long id,
            @RequestBody UserOperationsController partialEntity) {
        return service.partialUpdate(id, partialEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    public ResponseEntity<Page<UserOperationsController>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserOperationsController> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}