package com.izziddine.taskManagmentSystem.service.service_imp;

import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.dto.UserDto;
import com.izziddine.taskManagmentSystem.entities.Task;
import com.izziddine.taskManagmentSystem.entities.User;
import com.izziddine.taskManagmentSystem.errors.exceptions.ResourseNotFoundException;
import com.izziddine.taskManagmentSystem.mapper.TaskMapper;
import com.izziddine.taskManagmentSystem.mapper.UserMapper;
import com.izziddine.taskManagmentSystem.repository.TaskRepository;
import com.izziddine.taskManagmentSystem.repository.UserRepository;
import com.izziddine.taskManagmentSystem.service.TaskService;
import com.izziddine.taskManagmentSystem.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, TaskRepository taskRepository, TaskMapper taskMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        user = userRepository.save(user);
        return userMapper.toDTO(user);
    }

    @Override
    public List<TaskDto> getAllTasksByUserId(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream().map(TaskMapper.INSTANCE::toDto).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDto findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("user not found"));
        return userMapper.toDTO(user);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<String> findAllEmails() {
        return userRepository.findAllEmails();
    }

//    @Override
//    public UserWithTasksAndCommentsDto getUserWithTasksAndComments(Long userId) {
//        Optional<User> userWithTasksAndComments = userRepository.findWithTasksAndCommentsById(userId);
//
//        if (userWithTasksAndComments.isPresent()) {
//            User user = userWithTasksAndComments.get();
//            List<UserWithTasksAndCommentsDto.TaskCommentDto> taskDtos = user.getTasks().stream()
//                    .map(task -> new UserWithTasksAndCommentsDto.TaskCommentDto(task.getId(), task.getTitle(), task.getDescription(), task.getStatus().toString(), task.getDueDate(),
//                            task.getComments().stream()
//                                    .map(comment -> new UserWithTasksAndCommentsDto.CommentDto(comment.getId(), comment.getCommentText(), comment.getTimestamp()))
//                                    .collect(Collectors.toList())))
//                    .collect(Collectors.toList());
//
//            return new UserWithTasksAndCommentsDto(user.getId(), user.getName(), user.getEmail(), user.isActive(), taskDtos);
//        } else {
//            throw new ResourseNotFoundException("User not found with ID: " + userId);
//        }
//
//    }


    public List<UserDto> getAllUsersWithRoleUser() {
        List<User> users = userRepository.findUsersWithRoleUser();
        return users.stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    @Override
    public UserDto updateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new ResourseNotFoundException("user not found"));

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        if (userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        }
        if (userDto.getActive() != null) {
            user.setActive(userDto.isActive());
        }

        return userMapper.toDTO(user);
    }

    @Override
    public UserDto updateUserStatus(Long id, boolean status) {
        if (userRepository.findById(id).isPresent()) {
            User user = userRepository.findById(id).get();
            user.setActive(status);
            userRepository.save(user);
            return userMapper.toDTO(user);
        }
        return null;
    }


}
