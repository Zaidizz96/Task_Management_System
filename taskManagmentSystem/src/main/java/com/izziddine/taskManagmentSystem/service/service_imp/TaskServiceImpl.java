package com.izziddine.taskManagmentSystem.service.service_imp;

import com.izziddine.taskManagmentSystem.annotations.LogTaskCreation;
import com.izziddine.taskManagmentSystem.annotations.LogTaskUpdates;
import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.entities.Task;
import com.izziddine.taskManagmentSystem.enums.Status;
import com.izziddine.taskManagmentSystem.errors.exceptions.ResourseNotFoundException;
import com.izziddine.taskManagmentSystem.mapper.TaskMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.izziddine.taskManagmentSystem.repository.TaskRepository;
import com.izziddine.taskManagmentSystem.service.TaskService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @LogTaskCreation
    @Override
    public TaskDto save(TaskDto taskDto) {
        Task task = taskMapper.toEntity(taskDto);
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public List<TaskDto> findAll() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(TaskMapper.INSTANCE :: toDto).collect(Collectors.toList());
    }

    @Override
    public TaskDto findById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourseNotFoundException("task not found"));
        return taskMapper.toDto(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDto updateTaskStatus(Long taskId, Status status) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourseNotFoundException("task not found"));
        task.setStatus(status);
        return taskMapper.toDto(taskRepository.save(task));
    }

    @LogTaskUpdates
    @Override
    public TaskDto updateTask(TaskDto taskDto) {
        Task task = taskRepository.findById(taskDto.getId()).orElseThrow(() -> new ResourseNotFoundException("task not found"));
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setDueDate(taskDto.getDueDate());

        return taskMapper.toDto(taskRepository.save(task));
    }

}
