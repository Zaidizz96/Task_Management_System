package com.izziddine.taskManagmentSystem.controller;


import com.izziddine.taskManagmentSystem.errors.ApiErrorResponse;
import com.izziddine.taskManagmentSystem.errors.exceptions.InvalidCredentialException;
import com.izziddine.taskManagmentSystem.errors.exceptions.ResourseNotFoundException;
import com.izziddine.taskManagmentSystem.errors.exceptions.UserAlreadyExistsException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandling {


    @ExceptionHandler(ResourseNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourseNotFoundException(ResourseNotFoundException e , WebRequest request) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
        apiErrorResponse.setTimestamp(LocalDateTime.now());
        apiErrorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        apiErrorResponse.setMessage(e.getMessage());
        apiErrorResponse.setError("Resourse Not Found");
        request.getDescription(false);

        return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidCredentialException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidCredentialException(InvalidCredentialException e , WebRequest request) {

        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
        apiErrorResponse.setTimestamp(LocalDateTime.now());
        apiErrorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        apiErrorResponse.setMessage(e.getMessage());
        apiErrorResponse.setError("Invalid Credential");
        request.getDescription(false);

        return new ResponseEntity<>(apiErrorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleConstraintViolationException(ConstraintViolationException e , WebRequest request) {

        List<String> errors = e.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .toList();

        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
        apiErrorResponse.setTimestamp(LocalDateTime.now());
        apiErrorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        apiErrorResponse.setMessage(String.join(", ", errors));
        apiErrorResponse.setError("Invalid Constraint");
        request.getDescription(false);

        return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(Exception e , WebRequest request) {

        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
        apiErrorResponse.setTimestamp(LocalDateTime.now());
        apiErrorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiErrorResponse.setMessage(e.getMessage());
        apiErrorResponse.setError("Internal Server Error");
        request.getDescription(false);

        return new ResponseEntity<>(apiErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e , WebRequest request) {

        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();

        apiErrorResponse.setTimestamp(LocalDateTime.now());
        apiErrorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        apiErrorResponse.setMessage(e.getMessage());
        apiErrorResponse.setError("User Already Exists");
        request.getDescription(false);

        return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
    }


}
