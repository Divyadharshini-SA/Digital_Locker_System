package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.ActivityLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long>{
    
}
