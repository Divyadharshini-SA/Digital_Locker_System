package com.examly.springapp.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
// @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "UserName is required")
    private String username;
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email is required")
    @Email
    private String email;
    @NotBlank(message = "password is required")
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    private Long storageUsed = 0L;
    private Long storageQuota = 500 * 1024 * 1024L; // 500 MB default
    private LocalDateTime createdAt = LocalDateTime.now();
    public enum Role {
        USER,
        ADMIN
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public Long getStorageUsed() {
        return storageUsed;
    }
    public void setStorageUsed(Long storageUsed) {
        this.storageUsed = storageUsed;
    }
    public Long getStorageQuota() {
        return storageQuota;
    }
    public void setStorageQuota(Long storageQuota) {
        this.storageQuota = storageQuota;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public User() {
    }
}

