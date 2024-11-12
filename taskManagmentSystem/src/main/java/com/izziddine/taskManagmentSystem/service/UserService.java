package com.izziddine.taskManagmentSystem.service;


import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.dto.UserDto;


import java.util.List;
import java.util.Optional;


public interface UserService {

    UserDto save(UserDto userDto);
    List<TaskDto> getAllTasksByUserId(Long userId);


    List<UserDto> findAll();

    List<UserDto> getAllUsersWithRoleUser();

    boolean existsByEmail(String email);

    UserDto updateUser(UserDto userDto);

    UserDto findUserById(Long id);

    void deleteUserById(Long id);

    List<String> findAllEmails();

//    UserWithTasksAndCommentsDto getUserWithTasksAndComments(Long userId);

    UserDto updateUserStatus(Long id, boolean status);
}
