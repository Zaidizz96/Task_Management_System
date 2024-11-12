package com.izziddine.taskManagmentSystem.dto;

import com.izziddine.taskManagmentSystem.entities.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CommentDto implements Serializable {

    private Long id;
    private String commentText;
    private Long userId;
    private Long taskId;
    private LocalDate timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "id=" + id +
                ", commentText='" + commentText + '\'' +
                ", userId=" + userId +
                ", taskId=" + taskId +
                ", timestamp=" + timestamp +
                '}';
    }
}
