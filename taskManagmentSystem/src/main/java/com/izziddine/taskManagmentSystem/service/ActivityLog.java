package com.izziddine.taskManagmentSystem.service;

import java.time.LocalDate;

public class ActivityLog {

    private String action;
    private LocalDate timeStamp;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }


    public LocalDate getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDate timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "ActivityLog{" +
                "action='" + action + '\'' +
                ", timeStamp=" + timeStamp +
                '}';
    }
}
