package com.java.coreTemplate.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.java.coreTemplate.service.CoreUtilitiesService;
import com.java.coreTemplate.model.dto.CoreUtilities;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/core-utilities")  // Using hyphen instead of space for URL
public class CoreUtilitiesController {
    private final CoreUtilitiesService service;

    public CoreUtilitiesController(CoreUtilitiesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CoreUtilities> create(@RequestBody CoreUtilities entity) {
        CoreUtilities savedEntity = service.save(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedEntity.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreUtilities> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<CoreUtilities>> getAll(Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoreUtilities> update(@PathVariable Long id, @RequestBody CoreUtilities entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CoreUtilities> partialUpdate(@PathVariable Long id, @RequestBody CoreUtilities partialEntity) {
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
    public ResponseEntity<Page<CoreUtilities>> search(
            @RequestParam(required = false) String query,
            Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}