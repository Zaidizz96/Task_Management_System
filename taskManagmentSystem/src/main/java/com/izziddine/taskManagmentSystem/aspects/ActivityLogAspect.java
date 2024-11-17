package com.izziddine.taskManagmentSystem.aspects;


import com.izziddine.taskManagmentSystem.auth.AuthenticationRequest;
import com.izziddine.taskManagmentSystem.auth.RegisterRequest;
import com.izziddine.taskManagmentSystem.dto.TaskDto;
import com.izziddine.taskManagmentSystem.service.ActivityLogService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ActivityLogAspect {

    private final ActivityLogService activityLogService;

    public ActivityLogAspect(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @Before("@annotation(com.izziddine.taskManagmentSystem.annotations.LogLogin)")
    public void logLoginActionStart(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof AuthenticationRequest authenticationRequest){
            activityLogService.logAction("User with email : " + authenticationRequest.getUsername() + " attempt to login" );
        }else {
            activityLogService.logAction("User attempted login");
        }
    }

    @AfterReturning("@annotation(com.izziddine.taskManagmentSystem.annotations.LogLogin)")
    public void logLoginActionSuccess(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof AuthenticationRequest authenticationRequest){
            activityLogService.logAction("User with email : " + authenticationRequest.getUsername() + " Successfully login" );
        }else {
            activityLogService.logAction("User Successfully login");
        }
    }

    @Before("@annotation(com.izziddine.taskManagmentSystem.annotations.LogAddUser)")
    public void logUserRegesterationStart(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof RegisterRequest registerRequest){
            activityLogService.logAction("User with email : " + registerRequest.getEmail() + "registration start" );
        }else {
            activityLogService.logAction("User registration start");
        }
    }

    @AfterReturning("@annotation(com.izziddine.taskManagmentSystem.annotations.LogAddUser)")
    public void logUserRegisterationSuccsess(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof RegisterRequest registerRequest){
            activityLogService.logAction("User with email : " + registerRequest.getEmail() + "registration successful" );
        }else {
            activityLogService.logAction("User registration successful");
        }
    }

    @Before("@annotation(com.izziddine.taskManagmentSystem.annotations.LogTaskCreation)")
    public void logTaskCreationStart(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof TaskDto taskDto){
            activityLogService.logAction("User with id: " + taskDto.getUserId() + " attempt to add a task: " +taskDto.getTitle());
        }else {
            activityLogService.logAction("User attempt to add a task");
        }
    }

    @AfterReturning("@annotation(com.izziddine.taskManagmentSystem.annotations.LogTaskCreation)")
    public void logTaskCreationSuccesess(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof TaskDto taskDto){
            activityLogService.logAction("User with id: " + taskDto.getUserId() + " Successfully add a task: " +taskDto.getTitle());
        }else {
            activityLogService.logAction("User successfully add a task");
        }
    }

    @Before("@annotation(com.izziddine.taskManagmentSystem.annotations.LogTaskUpdates)")
    public void logTaskUpdateStart(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof TaskDto taskDto){
            activityLogService.logAction("User with id: " + taskDto.getUserId() + " attempt to update a task: " +taskDto.getTitle());
        }else {
            activityLogService.logAction("User attempt to update a task");
        }
    }

    @AfterReturning("@annotation(com.izziddine.taskManagmentSystem.annotations.LogTaskUpdates)")
    public void logTaskUpdatesSuccesfull(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0 && args[0] instanceof TaskDto taskDto){
            activityLogService.logAction("User with id: " + taskDto.getUserId() + " update a task: " +taskDto.getTitle() + " successfully");
        }else {
            activityLogService.logAction("User update a task successfully");
        }
    }





}
