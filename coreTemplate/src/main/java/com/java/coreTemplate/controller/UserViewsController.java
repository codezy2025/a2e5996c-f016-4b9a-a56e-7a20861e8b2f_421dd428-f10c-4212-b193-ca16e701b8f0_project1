package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.UserViewsService;
import com.java.coreTemplate.model.dto.UserViews;

@RestController
@RequestMapping("/api/v1/user-views")  // Changed to use hyphen instead of space
public class UserViewsController {
    private final UserViewsService service;
    
    public UserViewsController(UserViewsService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<UserViews> create(@RequestBody UserViews entity) {
        UserViews savedEntity = service.save(entity);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserViews> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<UserViews>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserViews> update(
            @PathVariable Long id, 
            @RequestBody UserViews entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
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
    public ResponseEntity<Page<UserViews>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}