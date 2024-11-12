package com.izziddine.taskManagmentSystem.dto;

public class CommentRequest {

    String commentText;

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    @Override
    public String toString() {
        return "CommentRequest{" +
                "commentText='" + commentText + '\'' +
                '}';
    }
}
