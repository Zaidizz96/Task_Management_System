package com.izziddine.taskManagmentSystem.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityLogService {

    private final List<String> activityLogs = new ArrayList<>();

    public void logAction(String message) {
        String timestampMessage = LocalDateTime.now() + " _ " + message;
        activityLogs.add(timestampMessage);
    }

    public List<String> getActivityLogs() {
        return new ArrayList<>(activityLogs);
    }
}
