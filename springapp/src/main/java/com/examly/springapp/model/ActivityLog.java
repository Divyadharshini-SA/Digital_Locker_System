package com.examly.springapp.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Data
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long documentId;
    private String action;
    @JsonFormat(pattern = "yyyy-MM-DD HH:MM")
    private LocalDateTime timestamp = LocalDateTime.now();
    public ActivityLog() {
    }
    public ActivityLog(Long userId, Long documentId, String action) {
        this.userId = userId;
        this.documentId = documentId;
        this.action = action;
    }
    
}

