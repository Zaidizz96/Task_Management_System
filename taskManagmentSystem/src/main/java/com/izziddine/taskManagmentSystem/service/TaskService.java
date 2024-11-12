package com.izziddine.taskManagmentSystem.service;

import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.enums.Status;

import java.util.List;

public interface TaskService {


    TaskDto save (TaskDto taskDto);

    TaskDto findById(Long id);

    void deleteTask(Long id);

    List<TaskDto> findAll();

    TaskDto updateTaskStatus(Long taskId , Status status);

    TaskDto updateTask(TaskDto taskDto);

}
