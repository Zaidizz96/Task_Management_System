package com.izziddine.taskManagmentSystem.mapper;

import com.izziddine.taskManagmentSystem.dto.CommentDto;
import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.entities.Comment;
import com.izziddine.taskManagmentSystem.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.IterableMapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TaskMapper {

    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "comments", target = "comments")
    TaskDto toDto(Task task);

    @Mapping(source = "userId", target = "user.id")
    Task toEntity(TaskDto taskDto);

    List<CommentDto> mapCommentsToDto(List<Comment> comments);
    List<Comment> mapCommentsToEntity(List<CommentDto> commentDtos);
}
