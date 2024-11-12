//package com.izziddine.taskManagmentSystem.dto;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.time.LocalDate;
//
//
//public class UserWithTasksAndCommentsDto {
//
//    private Long id;
//    private String name;
//    private String email;
//    private Boolean active;
//    private List<TaskCommentDto> tasks;
//
//    public UserWithTasksAndCommentsDto() {
//    }
//
//    public UserWithTasksAndCommentsDto(Long id, String name, String email, Boolean active, List<TaskCommentDto> tasks) {
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.active = active;
//        this.tasks = tasks;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public Boolean getActive() {
//        return active;
//    }
//
//    public void setActive(Boolean active) {
//        this.active = active;
//    }
//
//    public List<TaskCommentDto> getTasks() {
//        return tasks;
//    }
//
//    public void setTasks(List<TaskCommentDto> tasks) {
//        this.tasks = tasks;
//    }
//
//    @Override
//    public String toString() {
//        return "UserWithTasksAndCommentsDto{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", email='" + email + '\'' +
//                ", active=" + active +
//                ", tasks=" + tasks +
//                '}';
//    }
//
//    public static class TaskCommentDto {
//        private Long taskId;
//        private String title;
//        private String description;
//        private String status;
//        private LocalDate dueDate;
//        private List<CommentDto> comments;
//
//        public TaskCommentDto() {
//        }
//
//        public TaskCommentDto(Long taskId, String title, String description, String status, LocalDate dueDate, List<CommentDto> comments) {
//            this.taskId = taskId;
//            this.title = title;
//            this.description = description;
//            this.status = status;
//            this.dueDate = dueDate;
//            this.comments = comments;
//        }
//
//        public Long getTaskId() {
//            return taskId;
//        }
//
//        public void setTaskId(Long taskId) {
//            this.taskId = taskId;
//        }
//
//        public String getTitle() {
//            return title;
//        }
//
//        public void setTitle(String title) {
//            this.title = title;
//        }
//
//        public String getDescription() {
//            return description;
//        }
//
//        public void setDescription(String description) {
//            this.description = description;
//        }
//
//        public String getStatus() {
//            return status;
//        }
//
//        public void setStatus(String status) {
//            this.status = status;
//        }
//
//        public LocalDate getDueDate() {
//            return dueDate;
//        }
//
//        public void setDueDate(LocalDate dueDate) {
//            this.dueDate = dueDate;
//        }
//
//        public List<CommentDto> getComments() {
//            return comments;
//        }
//
//        public void setComments(List<CommentDto> comments) {
//            this.comments = comments;
//        }
//
//        @Override
//        public String toString() {
//            return "TaskCommentDto{" +
//                    "taskId=" + taskId +
//                    ", title='" + title + '\'' +
//                    ", description='" + description + '\'' +
//                    ", status='" + status + '\'' +
//                    ", dueDate=" + dueDate +
//                    ", comments=" + comments +
//                    '}';
//        }
//    }
//
//    public static class CommentDto {
//        private Long commentId;
//        private String content;
//        private LocalDate timestamp;
//
//        public CommentDto() {
//        }
//
//        public CommentDto(Long commentId, String content, LocalDate timestamp) {
//            this.commentId = commentId;
//            this.content = content;
//            this.timestamp = timestamp;
//        }
//
//        public LocalDate getTimestamp() {
//            return timestamp;
//        }
//
//        public void setTimestamp(LocalDate timestamp) {
//            this.timestamp = timestamp;
//        }
//
//        public Long getCommentId() {
//            return commentId;
//        }
//
//        public void setCommentId(Long commentId) {
//            this.commentId = commentId;
//        }
//
//        public String getContent() {
//            return content;
//        }
//
//        public void setContent(String content) {
//            this.content = content;
//        }
//
//        @Override
//        public String toString() {
//            return "CommentDto{" +
//                    "commentId=" + commentId +
//                    ", content='" + content + '\'' +
//                    ", timestamp=" + timestamp +
//                    '}';
//        }
//    }
//}
