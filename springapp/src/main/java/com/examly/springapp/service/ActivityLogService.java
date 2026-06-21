package com.examly.springapp.service;

import com.examly.springapp.model.ActivityLog;
import com.examly.springapp.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ActivityLogService {
    private final ActivityLogRepository activityLogRepository;
    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }
    public ActivityLog log(Long userId, Long documentId, String action) {
        ActivityLog log = new ActivityLog(userId, documentId, action);
        return activityLogRepository.save(log);
    }
    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAll();
    }
}

