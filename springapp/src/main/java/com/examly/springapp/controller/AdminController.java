package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.model.ActivityLog;
import com.examly.springapp.model.Document;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.ActivityLogService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final ActivityLogService activityLogService;
    public AdminController(UserRepository userRepository, DocumentRepository documentRepository,
            ActivityLogService activityLogService) {
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.activityLogService = activityLogService;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        long userCount = userRepository.count();
        long docCount = documentRepository.count();
        return Map.of("users", userCount, "documents", docCount);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/documents")
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/logs")
    public List<ActivityLog> getAllLogs() {
        return activityLogService.getAllLogs();
    }

}
