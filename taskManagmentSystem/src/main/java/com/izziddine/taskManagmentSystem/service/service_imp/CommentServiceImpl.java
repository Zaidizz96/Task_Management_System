package com.izziddine.taskManagmentSystem.service.service_imp;

import com.izziddine.taskManagmentSystem.dto.CommentDto;
import com.izziddine.taskManagmentSystem.entities.Comment;
import com.izziddine.taskManagmentSystem.entities.Task;
import com.izziddine.taskManagmentSystem.entities.User;
import com.izziddine.taskManagmentSystem.mapper.CommentMapper;
import com.izziddine.taskManagmentSystem.repository.CommentRepository;
import com.izziddine.taskManagmentSystem.repository.TaskRepository;
import com.izziddine.taskManagmentSystem.repository.UserRepository;
import com.izziddine.taskManagmentSystem.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper, TaskRepository taskRepository, TaskRepository taskRepository1, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.taskRepository = taskRepository1;
        this.userRepository = userRepository;
    }

    @Override
    public CommentDto addComment(CommentDto commentDto) {
        Task task = taskRepository.findById(commentDto.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setCommentText(commentDto.getCommentText());
        comment.setTask(task); // Set the task association
        comment.setUser(user); // Set the user association

        Comment savedComment = commentRepository.save(comment);

        return commentMapper.toDto(savedComment);
    }


    @Override
    public List<CommentDto> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream().map(CommentMapper.INSTANCE :: toDto).collect(Collectors.toList());
    }

    @Override
    public CommentDto getCommentById(Long taskId) {
        Comment comment = commentRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Comment not found"));
        return commentMapper.toDto(comment);
    }

    @Override
    public List<CommentDto> getCommentsByTaskId(Long taskId) {
        List<Comment> comments = commentRepository.findByTaskId(taskId);
        return comments.stream().map(CommentMapper.INSTANCE :: toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }


}
