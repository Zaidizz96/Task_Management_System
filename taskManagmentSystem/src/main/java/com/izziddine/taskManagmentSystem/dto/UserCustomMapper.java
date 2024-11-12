//package com.izziddine.taskManagmentSystem.dto;
//
//
//import com.izziddine.taskManagmentSystem.entities.Comment;
//import com.izziddine.taskManagmentSystem.entities.Task;
//import com.izziddine.taskManagmentSystem.entities.User;
//import org.springframework.stereotype.Component;
//
//import java.util.stream.Collectors;
//
//@Component
//public class UserCustomMapper {
//
//    public static UserWithTasksAndCommentsDto toUserWithTasksAndCommentsDto(User user) {
//
//        if (user == null) return null;
//
//        UserWithTasksAndCommentsDto dto = new UserWithTasksAndCommentsDto();
//        dto.setId(user.getId());
//        dto.setName(user.getName());
//        dto.setEmail(user.getEmail());
//        dto.setActive(user.isActive());
//
//        dto.setTasks(user.getTasks().stream().map(UserCustomMapper :: toTaskCommentDto).collect(Collectors.toList()));
//
//        return dto;
//    }
//
//    public UserCustomMapper() {
//    }
//
//    public static UserWithTasksAndCommentsDto.TaskCommentDto toTaskCommentDto(Task task) {
//
//        if (task == null) return null;
//
//
//
//
//
//        UserWithTasksAndCommentsDto.TaskCommentDto dto = new UserWithTasksAndCommentsDto.TaskCommentDto();
//
//        dto.setTaskId(task.getId());
//        dto.setTitle(task.getTitle());
//        dto.setDescription(task.getDescription());
//        dto.setStatus(task.getStatus().toString());
//        dto.setDueDate(task.getDueDate());
//
//        dto.setComments(task.getComments().stream().map(UserCustomMapper :: toCommentDto).collect(Collectors.toList()));
//
//        return dto;
//    }
//
//    public static UserWithTasksAndCommentsDto.CommentDto toCommentDto(Comment comment) {
//
//
//
//        UserWithTasksAndCommentsDto.CommentDto dto = new UserWithTasksAndCommentsDto.CommentDto();
//
//        dto.setCommentId(comment.getId());
//        dto.setContent(comment.getCommentText());
//        dto.setTimestamp(comment.getTimestamp());
//
//        return dto;
//    }
//}
