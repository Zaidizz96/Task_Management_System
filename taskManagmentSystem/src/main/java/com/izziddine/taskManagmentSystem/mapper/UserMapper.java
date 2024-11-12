package com.izziddine.taskManagmentSystem.mapper;

import com.izziddine.taskManagmentSystem.dto.UserDto;
import com.izziddine.taskManagmentSystem.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto toDTO(User user);
    User toEntity(UserDto userDto);

}
