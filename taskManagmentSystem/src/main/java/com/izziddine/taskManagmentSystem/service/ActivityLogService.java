package com.izziddine.taskManagmentSystem.service;

import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityLogService {

    private final List<ActivityLog> activityLogs = new ArrayList<>();

    public void logAction(String action) {

        ActivityLog log = new ActivityLog();
        log.setAction(action);
        log.setTimeStamp(LocalDate.now());
        activityLogs.add(log);
    }

    public List<ActivityLog> getActivities(){
        return new ArrayList<>(activityLogs);
    }

}
