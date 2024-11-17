package com.izziddine.taskManagmentSystem.controller;

import com.izziddine.taskManagmentSystem.service.ActivityLog;
import com.izziddine.taskManagmentSystem.service.ActivityLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminLoggingController {

    private final ActivityLogService activityLogService;


    public AdminLoggingController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping("/admin/activity-logs")
    public ResponseEntity<List<ActivityLog>> getActivityLogs(){

        return ResponseEntity.ok(activityLogService.getActivities());
    }
}
