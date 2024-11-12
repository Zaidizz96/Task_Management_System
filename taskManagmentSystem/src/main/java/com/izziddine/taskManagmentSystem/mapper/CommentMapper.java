package com.izziddine.taskManagmentSystem.mapper;


import com.izziddine.taskManagmentSystem.dto.CommentDto;
import com.izziddine.taskManagmentSystem.entities.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

        @Mapping(source = "task.id", target = "taskId")
        @Mapping(source = "user.id" , target = "userId")
        @Mapping(source = "commentText", target = "commentText")
        CommentDto toDto(Comment comment);

        Comment toEntity(CommentDto commentDto);


}
