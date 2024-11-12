package com.izziddine.taskManagmentSystem.service;

import com.izziddine.taskManagmentSystem.dto.CommentDto;

import java.util.List;

public interface CommentService {

    CommentDto addComment( CommentDto commentDto);

    List<CommentDto> getAllComments();

    CommentDto getCommentById(Long id);

    List<CommentDto> getCommentsByTaskId(Long taskId);

    void deleteCommentById(Long id);


}
