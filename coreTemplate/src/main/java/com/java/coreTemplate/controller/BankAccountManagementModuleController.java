package com.java.coreTemplate.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.java.coreTemplate.service.BankAccountManagementModuleService;
import com.java.coreTemplate.model.dto.BankAccountManagementModule;

@RestController
@RequestMapping("/api/v1/bank-accounts")
public class BankAccountManagementModuleController {
    private final BankAccountManagementModuleService service;

    public BankAccountManagementModuleController(BankAccountManagementModuleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BankAccountManagementModule> create(@RequestBody BankAccountManagementModule entity) {
        BankAccountManagementModule savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BankAccountManagementModule> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<BankAccountManagementModule>> getAll(Pageable pageable) {
        Page<BankAccountManagementModule> accounts = service.findAll(pageable);
        return ResponseEntity.ok(accounts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BankAccountManagementModule> update(
            @PathVariable Long id, 
            @RequestBody BankAccountManagementModule entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        BankAccountManagementModule updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BankAccountManagementModule> partialUpdate(
            @PathVariable Long id,
            @RequestBody BankAccountManagementModule partialEntity) {
        return service.findById(id)
            .map(existingEntity -> {
                if (partialEntity.getAccountNumber() != null) {
                    existingEntity.setAccountNumber(partialEntity.getAccountNumber());
                }
                // Add other fields to update as needed
                BankAccountManagementModule updatedEntity = service.save(existingEntity);
                return ResponseEntity.ok(updatedEntity);
            })
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
    public ResponseEntity<Page<BankAccountManagementModule>> search(
            @RequestParam(required = false) String accountNumber,
            @RequestParam(required = false) String accountType,
            Pageable pageable) {
        Page<BankAccountManagementModule> results = service.search(accountNumber, accountType, pageable);
        return ResponseEntity.ok(results);
    }
}